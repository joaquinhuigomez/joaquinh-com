import {
  createId,
  errorResponse,
  estimateDurationSeconds,
  getOpenAiConfig,
  json,
  normalizeText,
  parseOpenAiResponse,
  scoreDemoSegment,
  splitIntoDemoSegments,
  titleCaseFromSlug
} from "./_shared.js";

const MAX_FILE_SIZE_BYTES = 24 * 1024 * 1024;

export const onRequestPost = async ({ request, env }) => {
  const config = getOpenAiConfig(env);

  try {
    const incoming = await request.formData();
    const file = incoming.get("file");

    if (!(file instanceof File)) {
      return errorResponse("Audio file is required.");
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return errorResponse(`File exceeds ${Math.round(MAX_FILE_SIZE_BYTES / (1024 * 1024))} MB limit.`);
    }

    const selectedLanguage = normalizeText(incoming.get("selectedLanguage")) || "auto";
    const apiLanguage = normalizeText(incoming.get("apiLanguage"));
    const supportLevel = normalizeText(incoming.get("supportLevel")) || "mixed";

    if (config.provider === "local") {
      return await proxyLocalTranscription({
        file,
        selectedLanguage,
        apiLanguage,
        supportLevel,
        localAsrUrl: config.localAsrUrl
      });
    }

    if (config.provider !== "openai" || !config.apiKey) {
      return buildDemoTranscriptionResponse({ file, selectedLanguage, apiLanguage, supportLevel, provider: config.provider });
    }

    const formData = new FormData();
    formData.set("file", file, file.name);
    formData.set("model", config.transcriptionModel);
    formData.set("response_format", "verbose_json");
    formData.append("timestamp_granularities[]", "segment");

    if (apiLanguage) {
      formData.set("language", apiLanguage);
    }

    const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`
      },
      body: formData
    });

    const payload = await parseOpenAiResponse(response);
    const transcript = normalizeText(payload.text);
    const segments = buildSegments(payload.segments, transcript, {
      hasExplicitLanguage: Boolean(apiLanguage),
      selectedLanguage,
      apiLanguage
    });
    const flaggedCount = segments.filter((segment) => segment.level !== "low").length;
    const risk = buildRouteRisk({ flaggedCount, supportLevel, selectedLanguage, apiLanguage, segments });
    const warnings = [];

    if (supportLevel === "beta") {
      warnings.push("Selected language is beta in this build. Inspect flagged spans before reusing the transcript.");
    }

    if (supportLevel === "experimental") {
      warnings.push("Selected language is experimental. Treat the transcript as a draft for manual review only.");
    }

    if (!apiLanguage) {
      warnings.push("No explicit language code was sent to the ASR model. This helps code-switching, but it can increase ambiguity.");
    }

    return json({
      sessionId: createId(),
      createdAt: new Date().toISOString(),
      transcript,
      languageDetected: normalizeText(payload.language) || apiLanguage || "unknown",
      durationSeconds: Number(payload.duration || 0),
      route: {
        provider: "openai",
        model: config.transcriptionModel,
        selectedLanguage,
        apiLanguage: apiLanguage || null,
        supportLevel,
        risk
      },
      sourceFile: {
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream"
      },
      summary: {
        segmentCount: segments.length,
        flaggedCount,
        durationSeconds: Number(payload.duration || 0),
        reviewRecommendation: risk.recommendation
      },
      segments,
      warnings
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Transcription failed.", 500);
  }
};

function buildSegments(rawSegments, transcript, context) {
  if (!Array.isArray(rawSegments) || rawSegments.length === 0) {
    return [
      scoreSegment(
        {
          id: 0,
          start: 0,
          end: 0,
          text: transcript
        },
        context
      )
    ];
  }

  return rawSegments.map((segment, index) =>
    scoreSegment(
      {
        id: segment.id ?? index,
        start: Number(segment.start || 0),
        end: Number(segment.end || 0),
        text: normalizeText(segment.text),
        avgLogprob: typeof segment.avg_logprob === "number" ? segment.avg_logprob : null,
        noSpeechProb: typeof segment.no_speech_prob === "number" ? segment.no_speech_prob : null,
        compressionRatio: typeof segment.compression_ratio === "number" ? segment.compression_ratio : null
      },
      context
    )
  );
}

function scoreSegment(segment, context) {
  let score = 12;
  const reasons = [];
  const selectedLanguage = normalizeText(context.selectedLanguage || context.apiLanguage || "").toLowerCase();
  const languageFamily = getLanguageFamily(selectedLanguage);

  if (typeof segment.avgLogprob === "number") {
    if (segment.avgLogprob < -0.75) {
      score += 40;
      reasons.push("low decoder confidence");
    } else if (segment.avgLogprob < -0.45) {
      score += 24;
      reasons.push("soft decoder confidence");
    }
  }

  if (typeof segment.noSpeechProb === "number" && segment.noSpeechProb > 0.42) {
    score += 24;
    reasons.push("speech boundary uncertain");
  }

  if (typeof segment.compressionRatio === "number" && segment.compressionRatio > 2.1) {
    score += 18;
    reasons.push("compression anomaly");
  }

  if (segment.text.length < 10) {
    score += 8;
    reasons.push("very short span");
  }

  if (/(.)\1\1/.test(segment.text)) {
    score += 10;
    reasons.push("repeated characters");
  }

  if (!context.hasExplicitLanguage) {
    score += 6;
  }

  const casingSignals = findCasingSignals(segment.text, languageFamily);
  if (casingSignals.length) {
    score += Math.min(20, 8 + casingSignals.length * 4);
    reasons.push(...casingSignals);
  }

  const boundedScore = Math.max(8, Math.min(96, Math.round(score)));
  const level = boundedScore >= 70 ? "high" : boundedScore >= 42 ? "medium" : "low";

  return {
    id: segment.id,
    start: segment.start,
    end: segment.end,
    text: segment.text,
    score: boundedScore,
    level,
    reasons
  };
}

function findCasingSignals(text, languageFamily) {
  const normalized = normalizeText(text);

  if (!normalized || languageFamily === "german" || languageFamily === "chinese") {
    return [];
  }

  const signals = [];
  const titleCaseWords = normalized.match(/\b[A-ZÁÉÍÓÚÜÑÀÈÌÒÙÇ][a-záéíóúüñàèìòùçäöüß'-]+\b/g) || [];
  const sentenceInitialWord = normalized.match(/^\s*[A-ZÁÉÍÓÚÜÑÀÈÌÒÙÇ][a-záéíóúüñàèìòùçäöüß'-]+\b/);
  const commaCapital = /[,:;]\s+[A-ZÁÉÍÓÚÜÑÀÈÌÒÙÇ]/.test(normalized);
  const casingDensity = titleCaseWords.length >= 3 && normalized.split(/\s+/).length <= 12;

  if (commaCapital) {
    signals.push("suspicious casing after punctuation");
  }

  if (casingDensity) {
    signals.push("title-case density");
  }

  if (sentenceInitialWord && titleCaseWords.length >= 4) {
    signals.push("capitalization pattern looks off");
  }

  return signals;
}

function getLanguageFamily(languageKey) {
  if (!languageKey || languageKey === "auto" || languageKey === "mixed" || languageKey === "unknown") {
    return "unknown";
  }

  if (languageKey.startsWith("de")) {
    return "german";
  }

  if (languageKey.startsWith("zh") || languageKey.includes("cantonese") || languageKey.includes("mandarin") || languageKey.includes("hokkien")) {
    return "chinese";
  }

  if (languageKey.startsWith("es")) {
    return "spanish";
  }

  if (languageKey.startsWith("fr")) {
    return "french";
  }

  if (languageKey.startsWith("pt")) {
    return "portuguese";
  }

  if (languageKey.startsWith("en")) {
    return "english";
  }

  return "other";
}

function buildRouteRisk({ flaggedCount, supportLevel, selectedLanguage, apiLanguage, segments }) {
  const reasons = [];
  const normalizedLanguage = normalizeText(apiLanguage || selectedLanguage).toLowerCase();
  const seriousSegments = segments.filter((segment) => segment.level === "high").length;
  const mediumSegments = segments.filter((segment) => segment.level === "medium").length;

  if (supportLevel === "beta") {
    reasons.push("beta language route");
  }

  if (supportLevel === "experimental") {
    reasons.push("experimental language route");
  }

  if (!apiLanguage && normalizedLanguage !== "auto") {
    reasons.push("no explicit ASR language code");
  }

  if (flaggedCount >= 2 || seriousSegments >= 1) {
    reasons.push("multiple high-risk spans");
  } else if (mediumSegments >= 1) {
    reasons.push("review recommended by segment scores");
  }

  const level =
    supportLevel === "experimental" || flaggedCount >= 2 || seriousSegments >= 1
      ? "high"
      : supportLevel === "beta" || mediumSegments >= 1 || !apiLanguage
        ? "medium"
        : "low";

  return {
    level,
    recommendation: level === "high" ? "review required" : level === "medium" ? "review recommended" : "stable route",
    reasons
  };
}

function buildDemoTranscriptionResponse({ file, selectedLanguage, apiLanguage, supportLevel, provider }) {
  const durationSeconds = estimateDurationSeconds(file.size);
  const languageLabel = selectedLanguage === "auto" ? "the selected language" : selectedLanguage;
  const clipName = titleCaseFromSlug(file.name) || "Voice Workspace Demo";
  const transcript = [
    `Demo transcript for ${clipName}.`,
    `This placeholder transcript is being generated because no live ASR provider is configured in this preview.`,
    `Selected language route: ${languageLabel}.`,
    `Use this mode to test the raw transcript, uncertainty review, export, and correction logging flow before connecting a real transcription backend.`
  ].join(" ");

  const segments = splitIntoDemoSegments(transcript, durationSeconds).map((segment) =>
    scoreDemoSegment(segment, {
      hasExplicitLanguage: Boolean(apiLanguage),
      forceHighRisk: supportLevel === "beta" || supportLevel === "experimental"
    })
  );
  const flaggedCount = segments.filter((segment) => segment.level !== "low").length;
  const risk = buildRouteRisk({ flaggedCount, supportLevel, selectedLanguage, apiLanguage, segments });

  const warnings = [
    "Demo mode is active. This is not a real transcription of your audio.",
    "To enable live transcription, set OPENAI_API_KEY or swap in another ASR provider."
  ];

  if (supportLevel === "beta") {
    warnings.push("Selected language is beta in this build. Inspect flagged spans before reusing the transcript.");
  }

  if (supportLevel === "experimental") {
    warnings.push("Selected language is experimental. Treat output as manual-review-only.");
  }

  return json({
    sessionId: createId(),
    createdAt: new Date().toISOString(),
    transcript,
    languageDetected: apiLanguage || selectedLanguage || "demo",
    durationSeconds,
      route: {
        provider: provider || "demo",
        model: "demo-transcriber",
        selectedLanguage,
        apiLanguage: apiLanguage || null,
        supportLevel,
        risk
      },
    sourceFile: {
      name: file.name,
      size: file.size,
      type: file.type || "application/octet-stream"
    },
    summary: {
      segmentCount: segments.length,
      flaggedCount,
      durationSeconds,
      reviewRecommendation: risk.recommendation
    },
    segments,
    warnings
  });
}

async function proxyLocalTranscription({ file, selectedLanguage, apiLanguage, supportLevel, localAsrUrl }) {
  const formData = new FormData();
  formData.set("file", file, file.name);
  formData.set("selectedLanguage", selectedLanguage);
  formData.set("apiLanguage", apiLanguage);
  formData.set("supportLevel", supportLevel);

  try {
    const response = await fetch(localAsrUrl, {
      method: "POST",
      body: formData
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message =
        payload?.error ||
        "Local ASR server failed. Start it with `npm run asr:local` before using the voice workspace.";
      return errorResponse(message, response.status || 500);
    }

    return json(payload);
  } catch (error) {
    return errorResponse(
      error instanceof Error
        ? `Could not reach the local ASR server at ${localAsrUrl}. Start it with \`npm run asr:local\`. ${error.message}`
        : `Could not reach the local ASR server at ${localAsrUrl}. Start it with \`npm run asr:local\`.`,
      502
    );
  }
}
