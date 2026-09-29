import os
import re
from pathlib import Path
from tempfile import NamedTemporaryFile

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from faster_whisper import WhisperModel


MODEL_NAME = os.getenv("LOCAL_WHISPER_MODEL", "small")
DEVICE = os.getenv("LOCAL_WHISPER_DEVICE", "cpu")
COMPUTE_TYPE = os.getenv("LOCAL_WHISPER_COMPUTE_TYPE", "int8")
HOST = os.getenv("LOCAL_ASR_HOST", "127.0.0.1")
PORT = int(os.getenv("LOCAL_ASR_PORT", "9001"))

app = FastAPI(title="Voice Workspace Local ASR")
model = WhisperModel(MODEL_NAME, device=DEVICE, compute_type=COMPUTE_TYPE)


@app.get("/health")
def health() -> dict:
    return {
        "ok": True,
        "model": MODEL_NAME,
        "device": DEVICE,
        "compute_type": COMPUTE_TYPE,
    }


@app.post("/transcribe")
async def transcribe(
    file: UploadFile = File(...),
    selectedLanguage: str = Form("auto"),
    apiLanguage: str = Form(""),
    supportLevel: str = Form("mixed"),
):
    suffix = Path(file.filename or "audio.bin").suffix or ".bin"

    with NamedTemporaryFile(delete=False, suffix=suffix) as temp_file:
        temp_path = temp_file.name

        while True:
            chunk = await file.read(1024 * 1024)
            if not chunk:
                break
            temp_file.write(chunk)

    try:
        segments_iter, info = model.transcribe(
            temp_path,
            language=apiLanguage or None,
            task="transcribe",
            beam_size=5,
            vad_filter=True,
        )
        raw_segments = list(segments_iter)
        transcript = normalize_text(" ".join(normalize_text(segment.text) for segment in raw_segments))

        if not transcript:
            return JSONResponse({"error": "Local ASR did not return any transcript text."}, status_code=502)

        duration_seconds = float(getattr(info, "duration", 0) or 0)
        if not duration_seconds and raw_segments:
            duration_seconds = float(raw_segments[-1].end)

        segments = [
            score_segment(segment, has_explicit_language=bool(apiLanguage), selected_language=selectedLanguage, api_language=apiLanguage)
            for segment in raw_segments
        ]
        flagged_count = sum(1 for segment in segments if segment["level"] != "low")
        risk = build_route_risk(flagged_count, supportLevel, selectedLanguage, apiLanguage, segments)
        warnings = [
            f"Local ASR provider active: faster-whisper ({MODEL_NAME}).",
        ]

        if supportLevel == "beta":
            warnings.append("Selected language is beta in this build. Inspect flagged spans before reuse.")
        if supportLevel == "experimental":
            warnings.append("Selected language is experimental. Treat output as manual-review-only.")

        return {
            "sessionId": create_id(),
            "createdAt": iso_now(),
            "transcript": transcript,
            "languageDetected": normalize_text(getattr(info, "language", "")) or apiLanguage or selectedLanguage or "unknown",
            "durationSeconds": duration_seconds,
            "route": {
                "provider": "local",
                "model": f"faster-whisper:{MODEL_NAME}",
                "selectedLanguage": selectedLanguage,
                "apiLanguage": apiLanguage or None,
                "supportLevel": supportLevel,
                "risk": risk,
            },
            "sourceFile": {
                "name": file.filename or "audio",
                "size": file.size or 0,
                "type": file.content_type or "application/octet-stream",
            },
            "summary": {
                "segmentCount": len(segments),
                "flaggedCount": flagged_count,
                "durationSeconds": duration_seconds,
                "reviewRecommendation": risk["recommendation"],
            },
            "segments": segments,
            "warnings": warnings,
        }
    except Exception as error:
        return JSONResponse({"error": f"Local ASR failed: {error}"}, status_code=500)
    finally:
        try:
            os.unlink(temp_path)
        except FileNotFoundError:
            pass


def score_segment(segment, has_explicit_language: bool, selected_language: str, api_language: str) -> dict:
    score = 12
    reasons = []

    avg_logprob = getattr(segment, "avg_logprob", None)
    no_speech_prob = getattr(segment, "no_speech_prob", None)
    compression_ratio = getattr(segment, "compression_ratio", None)
    text = normalize_text(getattr(segment, "text", ""))

    if isinstance(avg_logprob, (float, int)):
        if avg_logprob < -0.75:
            score += 40
            reasons.append("low decoder confidence")
        elif avg_logprob < -0.45:
            score += 24
            reasons.append("soft decoder confidence")

    if isinstance(no_speech_prob, (float, int)) and no_speech_prob > 0.42:
        score += 24
        reasons.append("speech boundary uncertain")

    if isinstance(compression_ratio, (float, int)) and compression_ratio > 2.1:
        score += 18
        reasons.append("compression anomaly")

    if len(text) < 10:
        score += 8
        reasons.append("very short span")

    if not has_explicit_language:
        score += 6

    for reason in find_casing_signals(text, selected_language or api_language):
        score += 4 if reason == "title-case density" else 8
        reasons.append(reason)

    bounded_score = max(8, min(96, round(score)))
    level = "high" if bounded_score >= 70 else "medium" if bounded_score >= 42 else "low"

    return {
        "id": getattr(segment, "id", 0),
        "start": float(getattr(segment, "start", 0)),
        "end": float(getattr(segment, "end", 0)),
        "text": text,
        "score": bounded_score,
        "level": level,
        "reasons": reasons,
    }


def find_casing_signals(text: str, language_key: str) -> list[str]:
    normalized = normalize_text(text)
    language_family = get_language_family(language_key)

    if not normalized or language_family in {"german", "chinese"}:
        return []

    title_case_words = re.findall(r"\b[A-ZÁÉÍÓÚÜÑÀÈÌÒÙÇ][a-záéíóúüñàèìòùçäöüß'-]+\b", normalized)
    comma_capital = re.search(r"[,:;]\s+[A-ZÁÉÍÓÚÜÑÀÈÌÒÙÇ]", normalized)
    word_count = len(re.findall(r"\b[\wÀ-ÖØ-öø-ÿ'-]+\b", normalized))

    signals: list[str] = []
    if comma_capital:
        signals.append("suspicious casing after punctuation")

    if len(title_case_words) >= 3 and word_count <= 12:
        signals.append("title-case density")

    if normalized[:1].isupper() and len(title_case_words) >= 4:
        signals.append("capitalization pattern looks off")

    return signals


def get_language_family(language_key: str) -> str:
    key = normalize_text(language_key).lower()

    if not key or key in {"auto", "mixed", "unknown"}:
        return "unknown"
    if key.startswith("de"):
        return "german"
    if key.startswith("zh") or "cantonese" in key or "mandarin" in key or "hokkien" in key:
        return "chinese"
    if key.startswith("es"):
        return "spanish"
    if key.startswith("fr"):
        return "french"
    if key.startswith("pt"):
        return "portuguese"
    if key.startswith("en"):
        return "english"
    return "other"


def build_route_risk(flagged_count: int, support_level: str, selected_language: str, api_language: str, segments: list[dict]) -> dict:
    reasons = []
    serious_segments = sum(1 for segment in segments if segment.get("level") == "high")
    medium_segments = sum(1 for segment in segments if segment.get("level") == "medium")
    normalized_language = normalize_text(api_language or selected_language).lower()

    if support_level == "beta":
        reasons.append("beta language route")
    if support_level == "experimental":
        reasons.append("experimental language route")
    if not api_language and normalized_language != "auto":
        reasons.append("no explicit ASR language code")
    if flagged_count >= 2 or serious_segments >= 1:
        reasons.append("multiple high-risk spans")
    elif medium_segments >= 1:
        reasons.append("review recommended by segment scores")

    if support_level == "experimental" or flagged_count >= 2 or serious_segments >= 1:
        level = "high"
    elif support_level == "beta" or medium_segments >= 1 or not api_language:
        level = "medium"
    else:
        level = "low"

    return {
        "level": level,
        "recommendation": "review required" if level == "high" else "review recommended" if level == "medium" else "stable route",
        "reasons": reasons,
    }


def normalize_text(value: str) -> str:
    return str(value or "").strip()


def create_id() -> str:
    import uuid

    return str(uuid.uuid4())


def iso_now() -> str:
    from datetime import datetime, timezone

    return datetime.now(timezone.utc).isoformat()


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=HOST, port=PORT)
