const JSON_HEADERS = {
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store"
};

export function json(data, init = {}) {
  return new Response(JSON.stringify(data), {
    status: init.status ?? 200,
    headers: {
      ...JSON_HEADERS,
      ...(init.headers ?? {})
    }
  });
}

export function errorResponse(message, status = 400, details = undefined) {
  return json(
    {
      error: message,
      ...(details ? { details } : {})
    },
    { status }
  );
}

export function getOpenAiConfig(env) {
  const provider = env.VOICE_WORKSPACE_PROVIDER || (env.OPENAI_API_KEY ? "openai" : env.LOCAL_ASR_URL ? "local" : "demo");
  const textProvider =
    env.VOICE_WORKSPACE_TEXT_PROVIDER ||
    env.VOICE_WORKSPACE_DRAFT_PROVIDER ||
    (env.ANTHROPIC_API_KEY
      ? "anthropic"
      : env.OPENAI_API_KEY
        ? "openai"
        : env.LOCAL_TEXT_URL || provider === "local"
          ? "local"
          : "demo");

  return {
    provider,
    textProvider,
    apiKey: env.OPENAI_API_KEY,
    anthropicApiKey: env.ANTHROPIC_API_KEY,
    localAsrUrl: env.LOCAL_ASR_URL || "http://127.0.0.1:9001/transcribe",
    localTextUrl: env.LOCAL_TEXT_URL || "http://127.0.0.1:11434/api/chat",
    localTextModel: env.LOCAL_TEXT_MODEL || "llama3.2:latest",
    localTextTimeoutMs: Number(env.LOCAL_TEXT_TIMEOUT_MS || 12000),
    transcriptionModel: env.OPENAI_TRANSCRIPTION_MODEL || "whisper-1",
    textModel: env.OPENAI_TEXT_MODEL || "gpt-4.1-mini",
    anthropicTextModel: env.ANTHROPIC_TEXT_MODEL || "claude-sonnet-4-0",
    promptVersion: env.VOICE_WORKSPACE_PROMPT_VERSION || "verba-process-2026-03-18"
  };
}

export async function parseOpenAiResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || "OpenAI request failed.";
    throw new Error(message);
  }

  return data;
}

export async function parseAnthropicResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = data?.error?.message || data?.error?.type || "Anthropic request failed.";
    throw new Error(message);
  }

  return data;
}

export function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function normalizeText(value) {
  return String(value || "").trim();
}

export function titleCaseFromSlug(value) {
  return normalizeText(value)
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function estimateDurationSeconds(fileSizeBytes) {
  const size = Number(fileSizeBytes || 0);

  if (!size) {
    return 0;
  }

  return Math.max(8, Math.min(180, Math.round(size / 16000)));
}

export function splitIntoDemoSegments(text, durationSeconds) {
  const cleaned = normalizeText(text);
  if (!cleaned) {
    return [];
  }

  const clauses = cleaned
    .split(/(?<=[.!?])\s+|\s*[;:]\s+|\n+/)
    .map((item) => normalizeText(item))
    .filter(Boolean);

  const parts = clauses.length ? clauses : [cleaned];
  const step = durationSeconds > 0 ? durationSeconds / parts.length : 6;

  return parts.map((part, index) => ({
    id: index,
    start: roundTwo(index * step),
    end: roundTwo((index + 1) * step),
    text: part
  }));
}

export function scoreDemoSegment(segment, { hasExplicitLanguage = false, forceHighRisk = false } = {}) {
  let score = 18;
  const reasons = [];

  if (!hasExplicitLanguage) {
    score += 8;
  }

  if (segment.text.length < 24) {
    score += 12;
    reasons.push("short span");
  }

  if (/[A-Za-z].*[一-龥]|[一-龥].*[A-Za-z]/.test(segment.text)) {
    score += 18;
    reasons.push("code-switching likely");
  }

  if (forceHighRisk) {
    score += 26;
    reasons.push("demo-mode placeholder");
  }

  const boundedScore = Math.max(10, Math.min(92, Math.round(score)));
  const level = boundedScore >= 70 ? "high" : boundedScore >= 42 ? "medium" : "low";

  return {
    ...segment,
    score: boundedScore,
    level,
    reasons
  };
}

function roundTwo(value) {
  return Math.round(value * 100) / 100;
}

export function extractJsonObject(value) {
  const trimmed = String(value || "").trim();

  try {
    return JSON.parse(trimmed);
  } catch {}

  const match = trimmed.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("Model did not return JSON.");
  }

  return JSON.parse(match[0]);
}
