import { createId, errorResponse, json, normalizeText } from "./_shared.js";

const DEFAULT_ENTRY_LIMIT = 12;
const DEFAULT_RUN_LIMIT = 24;

export const onRequestGet = async ({ request, env }) => {
  const db = env.VERBA_EVALS;
  if (!db) {
    return json({
      ok: true,
      entries: [],
      runs: [],
      meta: {
        backing: "local"
      }
    });
  }

  try {
    const url = new URL(request.url);
    const entryLimit = clampLimit(url.searchParams.get("entryLimit"), DEFAULT_ENTRY_LIMIT, 100);
    const runLimit = clampLimit(url.searchParams.get("runLimit"), DEFAULT_RUN_LIMIT, 150);

    const [entriesResult, runsResult] = await Promise.all([
      db.prepare(
        `SELECT id, saved_at, session_id, language_label, source_language, output_language, audio_name, original_text,
                corrected_text, processed_output, note, delta_chars, flagged_segments, transcription_model, provider,
                model, inference_preset, prompt_version, latency_ms, ratings_json, error_tags_json
           FROM eval_entries
       ORDER BY saved_at DESC
          LIMIT ?`
      )
        .bind(entryLimit)
        .all(),
      db.prepare(
        `SELECT id, saved_at, session_id, audio_name, source_language, output_language, mode, preset, provider, model,
                prompt_version, latency_ms, usage_estimate_json, register_label, tone_label, transcript,
                corrected_transcript, output_text
           FROM draft_runs
       ORDER BY saved_at DESC
          LIMIT ?`
      )
        .bind(runLimit)
        .all()
    ]);

    return json({
      ok: true,
      entries: (entriesResult.results || []).map(mapEvalEntryRow),
      runs: (runsResult.results || []).map(mapDraftRunRow),
      meta: {
        backing: "d1"
      }
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Could not load eval history.", 500);
  }
};

export const onRequestPost = async ({ request, env }) => {
  const db = env.VERBA_EVALS;
  if (!db) {
    return json({
      ok: true,
      entries: [],
      runs: [],
      meta: {
        backing: "local"
      }
    });
  }

  try {
    const body = await request.json();
    const entries = Array.isArray(body.entries) ? body.entries.map(normalizeEvalEntry) : [];
    const runs = Array.isArray(body.runs) ? body.runs.map(normalizeDraftRun) : [];

    for (const entry of entries) {
      await db
        .prepare(
          `INSERT OR REPLACE INTO eval_entries (
             id, saved_at, session_id, language_label, source_language, output_language, audio_name, original_text,
             corrected_text, processed_output, note, delta_chars, flagged_segments, transcription_model, provider,
             model, inference_preset, prompt_version, latency_ms, ratings_json, error_tags_json
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          entry.id,
          entry.savedAt,
          entry.sessionId,
          entry.languageLabel,
          entry.sourceLanguage,
          entry.outputLanguage,
          entry.audioName,
          entry.originalText,
          entry.correctedText,
          entry.processedOutput,
          entry.note,
          entry.deltaChars,
          entry.flaggedSegments,
          entry.transcriptionModel,
          entry.provider,
          entry.model,
          entry.inferencePreset,
          entry.promptVersion,
          entry.latencyMs,
          JSON.stringify(entry.ratings || {}),
          JSON.stringify(entry.errorTags || [])
        )
        .run();
    }

    for (const run of runs) {
      await db
        .prepare(
          `INSERT OR REPLACE INTO draft_runs (
             id, saved_at, session_id, audio_name, source_language, output_language, mode, preset, provider, model,
             prompt_version, latency_ms, usage_estimate_json, register_label, tone_label, transcript,
             corrected_transcript, output_text
           ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .bind(
          run.id,
          run.savedAt,
          run.sessionId,
          run.audioName,
          run.sourceLanguage,
          run.outputLanguage,
          run.mode,
          run.preset,
          run.provider,
          run.model,
          run.promptVersion,
          run.latencyMs,
          JSON.stringify(run.usageEstimate || {}),
          run.register,
          run.tone,
          run.transcript,
          run.correctedTranscript,
          run.output
        )
        .run();
    }

    return json({
      ok: true,
      entries,
      runs,
      meta: {
        backing: "d1",
        entryCount: entries.length,
        runCount: runs.length
      }
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Could not persist eval record.", 500);
  }
};

function clampLimit(value, fallback, max) {
  const parsed = Number.parseInt(String(value || ""), 10);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }

  return Math.max(1, Math.min(parsed, max));
}

function normalizeEvalEntry(value) {
  const entry = value && typeof value === "object" ? value : {};
  return {
    id: normalizeText(entry.id) || createId(),
    savedAt: normalizeIso(entry.savedAt),
    sessionId: normalizeText(entry.sessionId),
    languageLabel: normalizeText(entry.languageLabel) || "Unknown",
    sourceLanguage: normalizeText(entry.sourceLanguage) || "Unknown",
    outputLanguage: normalizeText(entry.outputLanguage) || "Unknown",
    audioName: normalizeText(entry.audioName) || "audio clip",
    originalText: normalizeText(entry.originalText),
    correctedText: normalizeText(entry.correctedText),
    processedOutput: normalizeText(entry.processedOutput),
    note: normalizeText(entry.note),
    deltaChars: Number(entry.deltaChars || 0),
    flaggedSegments: Number(entry.flaggedSegments || 0),
    transcriptionModel: normalizeText(entry.transcriptionModel) || "unknown",
    provider: normalizeText(entry.provider) || "unknown",
    model: normalizeText(entry.model) || "unknown",
    inferencePreset: normalizeText(entry.inferencePreset) || "fast",
    promptVersion: normalizeText(entry.promptVersion),
    latencyMs: entry.latencyMs == null ? null : Number(entry.latencyMs || 0),
    ratings: isPlainObject(entry.ratings) ? entry.ratings : {},
    errorTags: Array.isArray(entry.errorTags) ? entry.errorTags.map((tag) => normalizeText(tag)).filter(Boolean) : []
  };
}

function normalizeDraftRun(value) {
  const run = value && typeof value === "object" ? value : {};
  return {
    id: normalizeText(run.id) || createId(),
    savedAt: normalizeIso(run.savedAt),
    sessionId: normalizeText(run.sessionId),
    audioName: normalizeText(run.audioName) || "audio clip",
    sourceLanguage: normalizeText(run.sourceLanguage) || "Unknown",
    outputLanguage: normalizeText(run.outputLanguage) || "Unknown",
    mode: normalizeText(run.mode) || "draft",
    preset: normalizeText(run.preset) || "fast",
    provider: normalizeText(run.provider) || "unknown",
    model: normalizeText(run.model) || "unknown",
    promptVersion: normalizeText(run.promptVersion),
    latencyMs: run.latencyMs == null ? null : Number(run.latencyMs || 0),
    usageEstimate: isPlainObject(run.usageEstimate) ? run.usageEstimate : {},
    register: normalizeText(run.register) || "Clear Note",
    tone: normalizeText(run.tone) || "Neutral",
    transcript: normalizeText(run.transcript),
    correctedTranscript: normalizeText(run.correctedTranscript),
    output: normalizeText(run.output)
  };
}

function mapEvalEntryRow(row) {
  return {
    id: row.id,
    savedAt: row.saved_at,
    sessionId: row.session_id,
    languageLabel: row.language_label,
    sourceLanguage: row.source_language,
    outputLanguage: row.output_language,
    audioName: row.audio_name,
    originalText: row.original_text,
    correctedText: row.corrected_text,
    processedOutput: row.processed_output,
    note: row.note,
    deltaChars: Number(row.delta_chars || 0),
    flaggedSegments: Number(row.flagged_segments || 0),
    transcriptionModel: row.transcription_model,
    provider: row.provider,
    model: row.model,
    inferencePreset: row.inference_preset,
    promptVersion: row.prompt_version,
    latencyMs: row.latency_ms == null ? null : Number(row.latency_ms || 0),
    ratings: parseJsonValue(row.ratings_json, {}),
    errorTags: parseJsonValue(row.error_tags_json, [])
  };
}

function mapDraftRunRow(row) {
  return {
    id: row.id,
    savedAt: row.saved_at,
    sessionId: row.session_id,
    audioName: row.audio_name,
    sourceLanguage: row.source_language,
    outputLanguage: row.output_language,
    mode: row.mode,
    preset: row.preset,
    provider: row.provider,
    model: row.model,
    promptVersion: row.prompt_version,
    latencyMs: row.latency_ms == null ? null : Number(row.latency_ms || 0),
    usageEstimate: parseJsonValue(row.usage_estimate_json, {}),
    register: row.register_label,
    tone: row.tone_label,
    transcript: row.transcript,
    correctedTranscript: row.corrected_transcript,
    output: row.output_text
  };
}

function parseJsonValue(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function normalizeIso(value) {
  const text = normalizeText(value);
  if (!text) {
    return new Date().toISOString();
  }

  const date = new Date(text);
  return Number.isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}
