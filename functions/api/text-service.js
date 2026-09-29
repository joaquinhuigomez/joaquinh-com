import {
  extractJsonObject,
  normalizeText,
  parseAnthropicResponse,
  parseOpenAiResponse
} from "./_shared.js";

export const PROMPT_VERSION = "verba-process-2026-03-18";

const MODE_INSTRUCTIONS = {
  draft:
    "Create a polished draft. If the output language matches the source language, rewrite in place. If it differs, translate and polish into the requested output language. Preserve meaning, preserve material uncertainty, and do not add new facts.",
  prompt:
    "Turn the transcript into a strong prompt for another LLM or coding agent. Make it specific, actionable, and faithful to the original intent."
};

const ZH_SCRIPT_MARKERS = [
  ["國", "国"], ["體", "体"], ["還", "还"], ["沒", "没"], ["團", "团"], ["隊", "队"], ["與", "与"], ["為", "为"],
  ["這", "这"], ["說", "说"], ["後", "后"], ["開", "开"], ["發", "发"], ["寫", "写"], ["點", "点"], ["嗎", "吗"],
  ["麼", "么"], ["樣", "样"], ["學", "学"], ["習", "习"], ["專", "专"], ["業", "业"], ["務", "务"], ["處", "处"],
  ["裡", "里"], ["龍", "龙"], ["門", "门"], ["畫", "画"], ["號", "号"], ["產", "产"], ["實", "实"], ["現", "现"],
  ["觀", "观"], ["電", "电"], ["腦", "脑"], ["雲", "云"], ["網", "网"], ["線", "线"], ["組", "组"], ["織", "织"],
  ["優", "优"], ["勢", "势"], ["應", "应"], ["變", "变"], ["係", "系"], ["關", "关"], ["釋", "释"], ["經", "经"],
  ["濟", "济"], ["辦", "办"], ["書", "书"], ["資", "资"], ["訊", "讯"], ["簡", "简"], ["顧", "顾"], ["問", "问"],
  ["聽", "听"], ["風", "风"], ["萬", "万"], ["億", "亿"], ["親", "亲"], ["愛", "爱"]
];

const OPENAI_PRICING = [
  { matcher: /^gpt-5(\.4)?$/i, inputPerMillion: 2.5, outputPerMillion: 15 },
  { matcher: /^gpt-5(\.4)?[-_ ]?mini$/i, inputPerMillion: 0.25, outputPerMillion: 2 },
  { matcher: /^gpt-4\.1[-_ ]?mini$/i, inputPerMillion: 0.4, outputPerMillion: 1.6 }
];

const ANTHROPIC_PRICING = [
  { matcher: /claude.*sonnet.*4/i, inputPerMillion: 3, outputPerMillion: 15 }
];

const SAFETY_SENSITIVE_PATTERNS = [
  /恨不得/u,
  /往死裡/u,
  /往死里/u,
  /他媽的/u,
  /他妈的/u,
  /賤貨/u,
  /贱货/u,
  /\bkill\b/i,
  /\bdead\b/i,
  /\bfuck(?:ing)?\b/i,
  /\bbitch\b/i,
  /\bputa\b/i,
  /\bmierda\b/i,
  /\bsalope\b/i
];

export async function createDraft({
  preset,
  provider,
  model,
  sourceLanguage,
  outputLanguage,
  register,
  tone,
  transcript,
  correctedTranscript,
  flags,
  config
}) {
  return createProcessedOutput({
    mode: "draft",
    preset,
    provider,
    model,
    rawTranscript: transcript,
    correctedTranscript,
    sourceLanguage,
    targetLanguage: outputLanguage,
    register,
    tone,
    flaggedSegments: flags,
    config
  });
}

export async function createPrompt({
  preset,
  provider,
  model,
  sourceLanguage,
  outputLanguage,
  register,
  tone,
  transcript,
  correctedTranscript,
  flags,
  config
}) {
  return createProcessedOutput({
    mode: "prompt",
    preset,
    provider,
    model,
    rawTranscript: transcript,
    correctedTranscript,
    sourceLanguage,
    targetLanguage: outputLanguage,
    register,
    tone,
    flaggedSegments: flags,
    config
  });
}

export async function createProcessedOutput({
  mode,
  preset,
  provider,
  model,
  rawTranscript,
  correctedTranscript,
  sourceLanguage,
  targetLanguage,
  register,
  tone,
  flaggedSegments = [],
  config
}) {
  const normalizedMode = normalizeProcessingMode(normalizeText(mode) || "draft");
  const cleanRawTranscript = normalizeText(rawTranscript);
  const cleanCorrectedTranscript = normalizeText(correctedTranscript) || cleanRawTranscript;
  const cleanSourceLanguage = normalizeText(sourceLanguage) || "Unknown";
  const cleanTargetLanguage = normalizeText(targetLanguage) || cleanSourceLanguage;
  const cleanRegister = normalizeText(register) || "Clear Note";
  const cleanTone = normalizeText(tone) || "Neutral";
  const safeFlaggedSegments = Array.isArray(flaggedSegments) ? flaggedSegments : [];
  const routeRisk = assessDraftRisk({
    mode: normalizedMode,
    sourceLanguage: cleanSourceLanguage,
    targetLanguage: cleanTargetLanguage,
    workingText: cleanCorrectedTranscript,
    flaggedSegments: safeFlaggedSegments
  });

  if (!cleanRawTranscript) {
    throw new Error("Transcript is required.");
  }

  if (!MODE_INSTRUCTIONS[normalizedMode]) {
    throw new Error("Unsupported processing mode.");
  }

  const prompts = buildProcessingPrompts({
    mode: normalizedMode,
    rawTranscript: cleanRawTranscript,
    correctedTranscript: cleanCorrectedTranscript,
    sourceLanguage: cleanSourceLanguage,
    targetLanguage: cleanTargetLanguage,
    register: cleanRegister,
    tone: cleanTone,
    flaggedSegments: safeFlaggedSegments
  });

  const routing = resolveTextRoute({
    preset,
    requestedProvider: provider,
    requestedModel: model,
    routeRisk,
    config
  });
  const resolvedProvider = routing.provider;
  const resolvedModel = routing.model;
  const startedAt = Date.now();

  let responsePayload;

  if (resolvedProvider === "local") {
    responsePayload = await buildLocalLlmProcessedResponse({
      mode: normalizedMode,
      correctedTranscript: cleanCorrectedTranscript,
      rawTranscript: cleanRawTranscript,
      sourceLanguage: cleanSourceLanguage,
      targetLanguage: cleanTargetLanguage,
      register: cleanRegister,
      tone: cleanTone,
      flaggedSegments: safeFlaggedSegments,
      prompts,
      localTextUrl: config.localTextUrl,
      localTextModel: resolvedModel,
      localTextTimeoutMs: config.localTextTimeoutMs
    });
  } else if (resolvedProvider === "openai") {
    if (!config.apiKey) {
      throw new Error("OPENAI_API_KEY is not configured for hosted draft mode.");
    }

    responsePayload = await buildOpenAiProcessedResponse({
      mode: normalizedMode,
      correctedTranscript: cleanCorrectedTranscript,
      rawTranscript: cleanRawTranscript,
      sourceLanguage: cleanSourceLanguage,
      targetLanguage: cleanTargetLanguage,
      register: cleanRegister,
      tone: cleanTone,
      prompts,
      apiKey: config.apiKey,
      model: resolvedModel
    });
  } else if (resolvedProvider === "anthropic") {
    if (!config.anthropicApiKey) {
      throw new Error("ANTHROPIC_API_KEY is not configured for hosted draft mode.");
    }

    responsePayload = await buildAnthropicProcessedResponse({
      mode: normalizedMode,
      correctedTranscript: cleanCorrectedTranscript,
      rawTranscript: cleanRawTranscript,
      sourceLanguage: cleanSourceLanguage,
      targetLanguage: cleanTargetLanguage,
      register: cleanRegister,
      tone: cleanTone,
      prompts,
      apiKey: config.anthropicApiKey,
      model: resolvedModel
    });
  } else {
    responsePayload = buildFallbackProcessedResponse({
      mode: normalizedMode,
      correctedTranscript: cleanCorrectedTranscript,
      rawTranscript: cleanRawTranscript,
      sourceLanguage: cleanSourceLanguage,
      targetLanguage: cleanTargetLanguage,
      register: cleanRegister,
      tone: cleanTone,
      flaggedSegments: safeFlaggedSegments,
      provider: "demo"
    });
  }

  const trace = buildTrace({
    provider: responsePayload.model?.provider || resolvedProvider,
    model: responsePayload.model?.model || resolvedModel,
    promptVersion: config.promptVersion || PROMPT_VERSION,
    sourceLanguage: cleanSourceLanguage,
    outputLanguage: prompts.effectiveTargetLanguage,
    mode: normalizedMode,
    systemPrompt: prompts.systemPrompt,
    userPrompt: prompts.userPrompt,
    output: responsePayload.output,
    latencyMs: Date.now() - startedAt,
    routingPreset: routing.preset,
    routingReason: routing.reason,
    routeRisk
  });

  return {
    ...responsePayload,
    warnings: mergeRouteWarnings(responsePayload.warnings, routeRisk, resolvedProvider),
    trace
  };
}

export function normalizeProcessingMode(mode) {
  if (mode === "clean" || mode === "translate") {
    return "draft";
  }

  return mode;
}

function resolveTextProvider(requestedProvider, config) {
  const normalizedRequested = normalizeText(requestedProvider).toLowerCase();
  if (normalizedRequested) {
    return normalizedRequested;
  }

  return normalizeText(config.textProvider || config.provider || "demo").toLowerCase();
}

function resolveTextModel(provider, requestedModel, config) {
  const normalizedRequested = normalizeText(requestedModel);
  if (normalizedRequested) {
    return normalizedRequested;
  }

  if (provider === "openai") {
    return config.textModel;
  }

  if (provider === "anthropic") {
    return config.anthropicTextModel;
  }

  if (provider === "local") {
    return config.localTextModel;
  }

  return provider === "demo" ? "demo-processor" : `${provider}-processor`;
}

function resolveTextRoute({ preset, requestedProvider, requestedModel, routeRisk, config }) {
  const normalizedPreset = normalizeText(preset).toLowerCase() || "fast";
  const normalizedRequestedProvider = normalizeText(requestedProvider).toLowerCase();
  const normalizedRequestedModel = normalizeText(requestedModel);

  if (normalizedRequestedProvider) {
    return {
      preset: normalizedPreset,
      provider: normalizedRequestedProvider,
      model: normalizedRequestedModel || resolveTextModel(normalizedRequestedProvider, normalizedRequestedModel, config),
      reason: buildExplicitRoutingReason(normalizedRequestedProvider, routeRisk)
    };
  }

  const available = getAvailableTextRoutes(config);
  const policyOrder = buildPolicyOrder(normalizedPreset, routeRisk);
  const chosenProvider = policyOrder.find((provider) => available.includes(provider)) || "demo";

  return {
    preset: normalizedPreset,
    provider: chosenProvider,
    model: resolveTextModel(chosenProvider, normalizedRequestedModel, config),
    reason: buildRoutingReason(normalizedPreset, chosenProvider, routeRisk)
  };
}

export function getComparisonCandidates({ preset, config }) {
  const normalizedPreset = normalizeText(preset).toLowerCase() || "benchmark";
  const available = getAvailableTextRoutes(config);
  const order =
    normalizedPreset === "fast"
      ? ["local", "openai", "anthropic", "demo"]
      : normalizedPreset === "premium"
        ? ["anthropic", "openai", "local", "demo"]
        : ["openai", "anthropic", "local", "demo"];

  return order
    .filter((provider, index, list) => available.includes(provider) && list.indexOf(provider) === index)
    .map((provider) => ({
      provider,
      model: resolveTextModel(provider, "", config),
      reason: buildRoutingReason(normalizedPreset, provider)
    }));
}

function getAvailableTextRoutes(config) {
  const available = new Set(["demo"]);

  if (config.localTextUrl) {
    available.add("local");
  }

  if (config.apiKey) {
    available.add("openai");
  }

  if (config.anthropicApiKey) {
    available.add("anthropic");
  }

  return [...available];
}

function buildPolicyOrder(preset, routeRisk) {
  if (preset === "benchmark") {
    return ["openai", "anthropic", "local", "demo"];
  }

  if (preset === "premium") {
    if (routeRisk?.scriptSensitive || routeRisk?.crossLanguageChinese) {
      return ["openai", "anthropic", "local", "demo"];
    }

    return ["anthropic", "openai", "local", "demo"];
  }

  if (routeRisk?.prefersHosted) {
    return ["openai", "anthropic", "local", "demo"];
  }

  return ["local", "openai", "anthropic", "demo"];
}

function buildExplicitRoutingReason(provider, routeRisk) {
  const base = "Explicit provider override from the workspace.";

  if (!routeRisk || routeRisk.level === "low" || !routeRisk.reasons?.length) {
    return base;
  }

  return `${base} Verba still marks this lane as ${routeRisk.level}-risk: ${routeRisk.reasons[0]}.`;
}

function buildRoutingReason(preset, provider, routeRisk) {
  if (preset === "premium") {
    const base =
      provider === "anthropic"
        ? "Premium preset chose Anthropic first for higher-quality multilingual drafting."
        : provider === "openai"
          ? "Premium preset chose OpenAI because Anthropic is not configured or this lane is script-sensitive."
          : provider === "local"
            ? "Premium preset fell back to the local route because no hosted provider is configured."
            : "Premium preset fell back to the demo route because no live provider is configured.";
    return joinRoutingReason(base, routeRisk);
  }

  if (preset === "benchmark") {
    const base =
      provider === "demo"
        ? "Benchmark preset has no live provider, so Verba is using the demo route."
        : `Benchmark preset included ${provider} as one comparison lane.`;
    return joinRoutingReason(base, routeRisk);
  }

  const base =
    provider === "local"
      ? routeRisk?.prefersHosted
        ? "Fast preset stayed on the local route because no hosted draft provider is configured for this higher-risk lane."
        : "Fast preset chose the local route for speed and low marginal cost."
      : provider === "openai"
        ? routeRisk?.prefersHosted
          ? "Fast preset escalated to OpenAI because this lane needs stronger multilingual handling than the local route usually provides."
          : "Fast preset chose OpenAI because no local route is configured."
        : provider === "anthropic"
          ? routeRisk?.prefersHosted
            ? "Fast preset escalated to Anthropic because this lane needs stronger multilingual handling than the local route usually provides."
            : "Fast preset chose Anthropic because it was the only live route available."
          : "Fast preset fell back to the demo route because no live provider is configured.";

  return joinRoutingReason(base, routeRisk);
}

function joinRoutingReason(base, routeRisk) {
  if (!routeRisk || routeRisk.level === "low" || !routeRisk.reasons?.length) {
    return base;
  }

  return `${base} Route risk is ${routeRisk.level}: ${routeRisk.reasons[0]}.`;
}

function buildTrace({
  provider,
  model,
  promptVersion,
  sourceLanguage,
  outputLanguage,
  mode,
  systemPrompt,
  userPrompt,
  output,
  latencyMs,
  routingPreset,
  routingReason,
  routeRisk
}) {
  const promptTokens = estimateTokenCount(`${systemPrompt}\n${userPrompt}`);
  const outputTokens = estimateTokenCount(output);

  return {
    provider,
    model,
    promptVersion,
    sourceLanguage,
    outputLanguage,
    mode,
    latencyMs,
    routingPreset,
    routingReason,
    routeRiskLevel: routeRisk?.level || "low",
    routeRiskReasons: routeRisk?.reasons || [],
    usageEstimate: {
      promptTokens,
      outputTokens,
      estimatedCostUsd: estimateCostUsd(provider, model, promptTokens, outputTokens)
    }
  };
}

function estimateTokenCount(text) {
  const content = normalizeText(text);
  if (!content) {
    return 0;
  }

  return Math.max(1, Math.round(content.length / 4));
}

function estimateCostUsd(provider, model, promptTokens, outputTokens) {
  const normalizedProvider = normalizeText(provider).toLowerCase();
  const normalizedModel = normalizeText(model);
  const table = normalizedProvider === "openai" ? OPENAI_PRICING : normalizedProvider === "anthropic" ? ANTHROPIC_PRICING : [];
  const pricing = table.find((entry) => entry.matcher.test(normalizedModel));

  if (!pricing) {
    return null;
  }

  const inputCost = (promptTokens / 1_000_000) * pricing.inputPerMillion;
  const outputCost = (outputTokens / 1_000_000) * pricing.outputPerMillion;

  return roundUsd(inputCost + outputCost);
}

function roundUsd(value) {
  return Number(value.toFixed(6));
}

function resolveHeadline(mode, sourceLanguage, targetLanguage) {
  if (mode === "draft" && !languagesEquivalent(sourceLanguage, targetLanguage)) {
    return "Translated draft";
  }

  if (mode === "prompt") {
    return "Prompt-ready brief";
  }

  return "Polished draft";
}

function buildProcessingPrompts({
  mode,
  rawTranscript,
  correctedTranscript,
  sourceLanguage,
  targetLanguage,
  register,
  tone,
  flaggedSegments
}) {
  const workingText = normalizeText(correctedTranscript) || normalizeText(rawTranscript);
  const effectiveTargetLanguage = resolveOutputLanguage(mode, sourceLanguage, targetLanguage);
  const sameLanguageDraft = languagesEquivalent(sourceLanguage, effectiveTargetLanguage);
  const chineseScriptInstruction = buildChineseScriptInstruction(sourceLanguage, workingText, effectiveTargetLanguage);
  const flaggedInstruction = flaggedSegments.length
    ? `Flagged transcript spans: ${JSON.stringify(flaggedSegments)}`
    : "Flagged transcript spans: none";

  if (mode === "draft" && sameLanguageDraft) {
    return {
      effectiveTargetLanguage,
      systemPrompt: [
        "You are an exacting editor for speech-derived text inside Verba, a multilingual voice workspace.",
        "You preserve meaning, improve clarity, and never add facts or background context.",
        "For same-language draft mode, you always write in the source language and you never translate.",
        "You preserve the speaker perspective and grammatical person unless the transcript itself makes that impossible.",
        "If uncertain spans exist, you keep the uncertainty visible instead of guessing.",
        chineseScriptInstruction,
        "Return strict JSON with keys: output, notes, warnings.",
        "Notes and warnings must be arrays of short strings."
      ]
        .filter(Boolean)
        .join(" "),
      userPrompt: [
        `Rewrite the ${sourceLanguage} transcript below into more polished written ${sourceLanguage}.`,
        `Output language: ${sourceLanguage} only.`,
        "Do not translate into English or any other language.",
        chineseScriptInstruction,
        "Keep the same meaning and the same speaker perspective.",
        "If the transcript is colloquial, abusive, or emotional, preserve that meaning faithfully unless a safety refusal is required.",
        "Do not repeat the transcript with only punctuation changes.",
        "Make the result noticeably more edited while staying natural and faithful.",
        "Preserve material uncertainty, and do not add facts.",
        `Register: ${register}`,
        `Tone: ${tone}`,
        flaggedInstruction,
        `Transcript:\n${workingText}`,
        'Return JSON only with keys "output", "notes", and "warnings".'
      ]
        .filter(Boolean)
        .join("\n\n")
    };
  }

  if (mode === "draft") {
    return {
      effectiveTargetLanguage,
      systemPrompt: [
        "You are a multilingual drafting layer for Verba, a speech-to-draft workspace.",
        "You preserve meaning, preserve material uncertainty, and never add new facts.",
        "If uncertain spans exist, you keep the uncertainty visible instead of pretending confidence.",
        "You must output in the requested output language only.",
        "Return strict JSON with keys: output, notes, warnings.",
        "Notes and warnings must be arrays of short strings."
      ].join(" "),
      userPrompt: [
        `Task: Turn the transcript from ${sourceLanguage} into a polished draft in ${effectiveTargetLanguage}.`,
        `Output language: ${effectiveTargetLanguage} only.`,
        `Requested register: ${register}`,
        `Requested tone: ${tone}`,
        "If the source is profane, abusive, or violent, preserve the meaning as faithfully as policy allows.",
        "Do not silently sanitize or soften the meaning. If policy forces safer wording, say so in warnings.",
        flaggedInstruction,
        `Raw transcript:\n${rawTranscript}`,
        `Working transcript:\n${workingText}`,
        'Return JSON only with keys "output", "notes", and "warnings".'
      ].join("\n\n")
    };
  }

  return {
    effectiveTargetLanguage,
    systemPrompt: [
      "You convert speech-derived material into a strong prompt for another LLM or coding agent.",
      "You preserve intent, uncertainty, and constraints from the source material.",
      "You never add fictional requirements or unsupported facts.",
      "Return strict JSON with keys: output, notes, warnings.",
      "Notes and warnings must be arrays of short strings."
    ].join(" "),
    userPrompt: [
      "Task: Turn the transcript into a clear, actionable prompt for another model or coding agent.",
      `Prompt language: ${effectiveTargetLanguage}.`,
      `Requested register: ${register}`,
      `Requested tone: ${tone}`,
      flaggedInstruction,
      `Raw transcript:\n${rawTranscript}`,
      `Working transcript:\n${workingText}`,
      'Return JSON only with keys "output", "notes", and "warnings".'
    ].join("\n\n")
  };
}

function resolveOutputLanguage(mode, sourceLanguage, targetLanguage) {
  return normalizeText(targetLanguage) || normalizeText(sourceLanguage) || "English";
}

async function buildOpenAiProcessedResponse({
  mode,
  correctedTranscript,
  rawTranscript,
  sourceLanguage,
  targetLanguage,
  register,
  tone,
  prompts,
  apiKey,
  model
}) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model,
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: prompts.systemPrompt }]
        },
        {
          role: "user",
          content: [{ type: "input_text", text: prompts.userPrompt }]
        }
      ]
    })
  });

  const payload = await parseOpenAiResponse(response);
  const content = extractOpenAiText(payload);

  if (!content) {
    throw new Error("Hosted draft model returned no content.");
  }

  const parsed = extractJsonObject(content);

  return {
    mode,
    headline: resolveHeadline(mode, sourceLanguage, targetLanguage),
    ...mergeScriptSafeOutput({
      mode,
      sourceLanguage,
      targetLanguage,
      workingText: correctedTranscript || rawTranscript,
      output: normalizeText(parsed.output),
      notes: normalizeArray(parsed.notes),
      warnings: normalizeArray(parsed.warnings),
      register,
      tone
    }),
    model: {
      provider: "openai",
      model
    }
  };
}

async function buildAnthropicProcessedResponse({
  mode,
  correctedTranscript,
  rawTranscript,
  sourceLanguage,
  targetLanguage,
  register,
  tone,
  prompts,
  apiKey,
  model
}) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01"
    },
    body: JSON.stringify({
      model,
      max_tokens: 1400,
      temperature: 0.2,
      system: prompts.systemPrompt,
      messages: [{ role: "user", content: prompts.userPrompt }]
    })
  });

  const payload = await parseAnthropicResponse(response);
  const content = extractAnthropicText(payload);

  if (!content) {
    throw new Error("Hosted draft model returned no content.");
  }

  const parsed = extractJsonObject(content);

  return {
    mode,
    headline: resolveHeadline(mode, sourceLanguage, targetLanguage),
    ...mergeScriptSafeOutput({
      mode,
      sourceLanguage,
      targetLanguage,
      workingText: correctedTranscript || rawTranscript,
      output: normalizeText(parsed.output),
      notes: normalizeArray(parsed.notes),
      warnings: normalizeArray(parsed.warnings),
      register,
      tone
    }),
    model: {
      provider: "anthropic",
      model
    }
  };
}

function extractOpenAiText(payload) {
  if (typeof payload.output_text === "string" && payload.output_text.trim()) {
    return payload.output_text;
  }

  const outputItems = Array.isArray(payload.output) ? payload.output : [];
  const textParts = [];

  for (const item of outputItems) {
    const contents = Array.isArray(item?.content) ? item.content : [];
    for (const contentItem of contents) {
      if (contentItem?.type === "output_text" && typeof contentItem.text === "string") {
        textParts.push(contentItem.text);
      }
    }
  }

  return textParts.join("\n").trim();
}

function extractAnthropicText(payload) {
  const contentItems = Array.isArray(payload.content) ? payload.content : [];
  return contentItems
    .filter((item) => item?.type === "text" && typeof item.text === "string")
    .map((item) => item.text)
    .join("\n")
    .trim();
}

function buildFallbackProcessedResponse({
  mode,
  correctedTranscript,
  rawTranscript,
  sourceLanguage,
  targetLanguage,
  register,
  tone,
  flaggedSegments,
  provider
}) {
  const workingText = normalizeText(correctedTranscript) || normalizeText(rawTranscript);
  const cleanDraft = buildDeterministicCleanDraft(workingText, {
    sourceLanguage,
    register,
    tone
  });
  const notes = [
    provider === "local"
      ? "Local text processor active. This mode applies deterministic cleanup and prompt shaping, not full LLM rewriting."
      : "Demo text processor active. This mode is useful for workflow testing, not final-quality writing.",
    `Requested register: ${register}. Requested tone: ${tone}.`
  ];
  const warnings = flaggedSegments.length
    ? ["Flagged transcript spans were carried forward. Review them before reusing the output."]
    : [];

  if (mode === "draft") {
    const sameLanguage = normalizeText(sourceLanguage).toLowerCase() === normalizeText(targetLanguage).toLowerCase();

    return {
      mode,
      headline: sameLanguage ? "Polished draft" : "Translated draft",
      output: [
        sameLanguage
          ? cleanDraft
          : `Translation from ${sourceLanguage} to ${targetLanguage} is configured, but the current ${provider} path does not perform full multilingual translation yet.`,
        "",
        `Source language: ${sourceLanguage}`,
        `Target language: ${targetLanguage}`,
        `Target style: ${register} / ${tone}`,
        "",
        "Working transcript:",
        cleanDraft
      ].join("\n"),
      notes,
      warnings,
      model: {
        provider: provider || "demo",
        model: provider === "local" ? "local-processor" : "demo-processor"
      }
    };
  }

  if (mode === "prompt") {
    return {
      mode,
      headline: "Prompt-ready brief",
      output: [
        "You are an expert assistant working from spoken input.",
        "",
        `Task: Convert the following speech-derived material into a ${register.toLowerCase()} output with a ${tone.toLowerCase()} tone.`,
        `Source language: ${sourceLanguage}.`,
        flaggedSegments.length ? "Review any uncertain spans before finalizing." : "No uncertainty flags were passed in this fallback output.",
        "",
        "Working transcript:",
        cleanDraft
      ].join("\n"),
      notes,
      warnings,
      model: {
        provider: provider || "demo",
        model: provider === "local" ? "local-processor" : "demo-processor"
      }
    };
  }

  return {
    mode,
    headline: resolveHeadline(mode, sourceLanguage, targetLanguage),
    output: cleanDraft,
    notes,
    warnings,
    model: {
      provider: provider || "demo",
      model: provider === "local" ? "local-processor" : "demo-processor"
    }
  };
}

function buildDeterministicCleanDraft(text, context) {
  const normalized = normalizeWhitespace(text);
  const sentenceBroken = breakProfessionalClauses(normalized, context);
  const punctuated = ensureTerminalPunctuation(sentenceBroken);
  return sentenceCase(punctuated);
}

async function buildLocalLlmProcessedResponse({
  mode,
  correctedTranscript,
  rawTranscript,
  sourceLanguage,
  targetLanguage,
  register,
  tone,
  flaggedSegments,
  prompts,
  localTextUrl,
  localTextModel,
  localTextTimeoutMs
}) {
  const workingText = normalizeText(correctedTranscript) || normalizeText(rawTranscript);

  try {
    const parsed = await requestLocalJson({
      localTextUrl,
      localTextModel,
      localTextTimeoutMs,
      systemPrompt: prompts.systemPrompt,
      userPrompt: prompts.userPrompt
    });

    let output = normalizeText(parsed.output) || buildDeterministicCleanDraft(workingText, { sourceLanguage, register, tone });
    let notes = normalizeArray(parsed.notes);
    let warnings = normalizeArray(parsed.warnings);

    if (mode === "draft" && languagesEquivalent(sourceLanguage, targetLanguage) && isTooSimilar(output, workingText)) {
      const retryParsed = await requestLocalJson({
        localTextUrl,
        localTextModel,
        localTextTimeoutMs,
        systemPrompt: [
          "You are an exacting editor for speech-derived text.",
          "Return strict JSON with keys: output, notes, warnings.",
          "Notes and warnings must be arrays of short strings."
        ].join(" "),
        userPrompt: [
          `Rewrite the ${sourceLanguage} sentence below into more polished written ${sourceLanguage}.`,
          `Output language: ${sourceLanguage} only.`,
          "Keep the same meaning.",
          "Keep the same speaker perspective and grammatical person.",
          "Do not translate.",
          "Do not repeat the sentence with only punctuation changes.",
          "Make the result noticeably more formal and edited.",
          `Register: ${register}`,
          `Tone: ${tone}`,
          flaggedSegments.length
            ? `Flagged spans: ${JSON.stringify(flaggedSegments)}`
            : "Flagged spans: none",
          `Sentence:\n${workingText}`,
          'Return JSON only with keys "output", "notes", and "warnings".'
        ].join("\n\n")
      });
      const retriedOutput = normalizeText(retryParsed.output);

      if (retriedOutput && !isTooSimilar(retriedOutput, workingText)) {
        output = retriedOutput;
        notes = normalizeArray(retryParsed.notes);
        warnings = normalizeArray(retryParsed.warnings);
        notes.unshift("A stronger second-pass rewrite was used because the first pass stayed too close to the raw transcript.");
      } else {
        warnings.unshift("The local rewrite stayed very close to the transcript. Edit the reviewed transcript manually if you need a more aggressive rewrite.");
      }
    }

    const scriptSafe = mergeScriptSafeOutput({
      mode,
      sourceLanguage,
      targetLanguage,
      workingText,
      output,
      notes,
      warnings,
      register,
      tone
    });

    return {
      mode,
      headline: resolveHeadline(mode, sourceLanguage, targetLanguage),
      ...scriptSafe,
      model: {
        provider: "local",
        model: localTextModel
      }
    };
  } catch (error) {
    const fallback = buildFallbackProcessedResponse({
      mode,
      correctedTranscript,
      rawTranscript,
      sourceLanguage,
      targetLanguage,
      register,
      tone,
      flaggedSegments,
      provider: "local"
    });

    fallback.warnings = [
      `Local LLM unavailable, so Verba used the deterministic fallback instead. ${error instanceof Error ? error.message : ""}`.trim(),
      ...fallback.warnings
    ];

    return fallback;
  }
}

function normalizeWhitespace(text) {
  return normalizeText(text)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;!?])/g, "$1");
}

function breakProfessionalClauses(text, context) {
  const professionalRegisters = new Set([
    "Team Update",
    "Executive Brief",
    "Formal Statement",
    "Legal Review",
    "Public Speaking"
  ]);

  if (!professionalRegisters.has(context.register)) {
    return text;
  }

  if (/[.!?]/.test(text)) {
    return text;
  }

  const parts = text.split(",").map((item) => item.trim()).filter(Boolean);
  if (parts.length !== 2) {
    return text;
  }

  if (parts[0].split(" ").length < 2 || parts[1].split(" ").length < 2) {
    return text;
  }

  return `${parts[0]}. ${parts[1]}`;
}

function ensureTerminalPunctuation(text) {
  if (!text || /[.!?。！？]$/.test(text)) {
    return text;
  }

  return `${text}.`;
}

function sentenceCase(text) {
  return text.replace(/(^|[.!?]\s+)([a-zà-ÿ])/giu, (match, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
}

function languagesEquivalent(sourceLanguage, targetLanguage) {
  return normalizeText(sourceLanguage).toLowerCase() === normalizeText(targetLanguage).toLowerCase();
}

function buildChineseScriptInstruction(sourceLanguage, workingText, targetLanguage) {
  if (!languagesEquivalent(sourceLanguage, targetLanguage) || !isChineseFamilyLanguage(sourceLanguage, workingText)) {
    return "";
  }

  const script = detectChineseScript(workingText);
  if (script === "unknown") {
    return "";
  }

  return `Preserve the exact Chinese script of the transcript. The input is ${scriptLabel(script)} Chinese, so the output must also remain ${scriptLabel(script)} Chinese. Never convert between Traditional and Simplified Chinese.`;
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value.map((item) => normalizeText(item)).filter(Boolean);
  }

  const single = normalizeText(value);
  return single ? [single] : [];
}

async function requestLocalJson({ localTextUrl, localTextModel, localTextTimeoutMs, systemPrompt, userPrompt }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), Math.max(1000, Number(localTextTimeoutMs || 12000)));

  let response;

  try {
    response = await fetch(localTextUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: localTextModel,
        stream: false,
        format: "json",
        options: {
          temperature: 0.2
        },
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ]
      })
    });
  } catch (error) {
    if (error?.name === "AbortError") {
      throw new Error(`Local text model timed out after ${Math.round(Math.max(1000, Number(localTextTimeoutMs || 12000)) / 1000)}s.`);
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload?.error || `Local text model request failed with status ${response.status}.`);
  }

  const content = payload?.message?.content;
  if (!content) {
    throw new Error("Local text model returned no content.");
  }

  return extractJsonObject(content);
}

function isTooSimilar(candidate, source) {
  const normalizedCandidate = simplifyForComparison(candidate);
  const normalizedSource = simplifyForComparison(source);

  if (!normalizedCandidate || !normalizedSource) {
    return false;
  }

  if (normalizedCandidate === normalizedSource) {
    return true;
  }

  const candidateTokens = normalizedCandidate.split(" ");
  const sourceTokens = normalizedSource.split(" ");
  const overlap = candidateTokens.filter((token, index) => token === sourceTokens[index]).length;
  const longestLength = Math.max(candidateTokens.length, sourceTokens.length);

  return longestLength > 0 && overlap / longestLength >= 0.85;
}

function simplifyForComparison(text) {
  return normalizeText(text)
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mergeScriptSafeOutput({ mode, sourceLanguage, targetLanguage, workingText, output, notes, warnings, register, tone }) {
  if (mode !== "draft") {
    return { output, notes, warnings };
  }

  if (!languagesEquivalent(sourceLanguage, targetLanguage) || !isChineseFamilyLanguage(sourceLanguage, workingText)) {
    return { output, notes, warnings };
  }

  const inputScript = detectChineseScript(workingText);
  const outputScript = detectChineseScript(output);

  if (inputScript === "unknown" || outputScript === "unknown" || inputScript === outputScript) {
    return { output, notes, warnings };
  }

  return {
    output: buildDeterministicCleanDraft(workingText, { sourceLanguage, register, tone }),
    notes: [`Script-preserving cleanup was used so the draft stays in ${scriptLabel(inputScript)} Chinese.`, ...notes],
    warnings: [
      `The model tried to switch the writing system from ${scriptLabel(inputScript)} Chinese to ${scriptLabel(outputScript)} Chinese, so Verba kept the original script instead.`,
      ...warnings
    ]
  };
}

function mergeRouteWarnings(warnings, routeRisk, provider) {
  const merged = [...normalizeArray(warnings)];

  if (routeRisk?.level === "high" && provider === "local") {
    merged.unshift("High-risk draft lane on the local model. Benchmark a hosted route before trusting this output without review.");
  }

  if (routeRisk?.safetySensitive) {
    merged.unshift("Safety-sensitive wording detected. Check whether the draft preserved the original meaning or softened it.");
  }

  if (routeRisk?.scriptSensitive) {
    merged.unshift("Chinese script-sensitive lane detected. Verify that the draft kept the intended writing system.");
  }

  return [...new Set(merged)];
}

function assessDraftRisk({ mode, sourceLanguage, targetLanguage, workingText, flaggedSegments }) {
  const reasons = [];
  const normalizedSource = normalizeText(sourceLanguage);
  const normalizedTarget = normalizeText(targetLanguage);
  const safeText = normalizeText(workingText);
  const flaggedCount = Array.isArray(flaggedSegments) ? flaggedSegments.length : 0;
  const chineseLane = isChineseFamilyLanguage(normalizedSource, safeText);
  const crossLanguage = !languagesEquivalent(normalizedSource, normalizedTarget);
  const crossLanguageChinese = chineseLane && crossLanguage;
  const codeSwitched = /[A-Za-z].*[\u3400-\u9fff]|[\u3400-\u9fff].*[A-Za-z]/u.test(safeText);
  const safetySensitive = SAFETY_SENSITIVE_PATTERNS.some((pattern) => pattern.test(safeText));
  const scriptSensitive = chineseLane && detectChineseScript(safeText) !== "unknown";
  let score = 0;

  if (mode === "prompt") {
    return {
      level: "low",
      reasons: [],
      prefersHosted: false,
      safetySensitive,
      scriptSensitive: false,
      crossLanguageChinese: false
    };
  }

  if (flaggedCount >= 2) {
    score += 16;
    reasons.push("multiple flagged transcript spans need manual review");
  } else if (flaggedCount === 1) {
    score += 8;
    reasons.push("one flagged transcript span still needs review");
  }

  if (crossLanguage) {
    score += 8;
    reasons.push(`draft is being translated into ${normalizedTarget || "another language"}`);
  }

  if (crossLanguageChinese) {
    score += 18;
    reasons.push("Chinese cross-language drafting is a weak lane for local models");
  }

  if (scriptSensitive) {
    score += 8;
    reasons.push("Chinese script preservation matters on this lane");
  }

  if (codeSwitched) {
    score += 12;
    reasons.push("code-switching is present in the reviewed transcript");
  }

  if (safetySensitive) {
    score += 14;
    reasons.push("profane or violent wording may trigger policy-driven drift");
  }

  const level = score >= 28 ? "high" : score >= 12 ? "medium" : "low";

  return {
    level,
    reasons: [...new Set(reasons)],
    prefersHosted: level === "high" || crossLanguageChinese,
    safetySensitive,
    scriptSensitive,
    crossLanguageChinese
  };
}

function isChineseFamilyLanguage(sourceLanguage, text) {
  const normalizedLanguage = normalizeText(sourceLanguage).toLowerCase();

  return (
    normalizedLanguage.includes("mandarin") ||
    normalizedLanguage.includes("chinese") ||
    normalizedLanguage.includes("cantonese") ||
    /[\u3400-\u9fff]/u.test(normalizeText(text))
  );
}

function detectChineseScript(text) {
  const normalized = normalizeText(text);
  let traditional = 0;
  let simplified = 0;

  for (const char of normalized) {
    for (const [traditionalChar, simplifiedChar] of ZH_SCRIPT_MARKERS) {
      if (char === traditionalChar) {
        traditional += 1;
      } else if (char === simplifiedChar) {
        simplified += 1;
      }
    }
  }

  if (!traditional && !simplified) {
    return "unknown";
  }

  if (traditional && simplified) {
    if (traditional >= simplified * 1.35) {
      return "traditional";
    }

    if (simplified >= traditional * 1.35) {
      return "simplified";
    }

    return "mixed";
  }

  return traditional ? "traditional" : "simplified";
}

function scriptLabel(script) {
  if (script === "traditional") {
    return "Traditional";
  }

  if (script === "simplified") {
    return "Simplified";
  }

  return "Chinese";
}
