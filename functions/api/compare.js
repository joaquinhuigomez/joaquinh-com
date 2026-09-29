import { errorResponse, getOpenAiConfig, json, normalizeText } from "./_shared.js";
import { createDraft, createPrompt, getComparisonCandidates, normalizeProcessingMode } from "./text-service.js";

export const onRequestPost = async ({ request, env }) => {
  const config = getOpenAiConfig(env);

  try {
    const body = await request.json();
    const mode = normalizeProcessingMode(normalizeText(body.mode) || "draft");
    const preset = normalizeText(body.preset) || "benchmark";
    const rawTranscript = normalizeText(body.rawTranscript);
    const correctedTranscript = normalizeText(body.correctedTranscript) || rawTranscript;
    const sourceLanguage = normalizeText(body.sourceLanguage) || "Unknown";
    const targetLanguage = normalizeText(body.targetLanguage) || sourceLanguage;
    const register = normalizeText(body.register) || "Clear Note";
    const tone = normalizeText(body.tone) || "Neutral";
    const flaggedSegments = Array.isArray(body.flaggedSegments) ? body.flaggedSegments : [];

    if (!rawTranscript) {
      return errorResponse("Transcript is required.");
    }

    const candidates = getComparisonCandidates({ preset, config });
    const results = [];

    for (const candidate of candidates) {
      const input = {
        preset,
        provider: candidate.provider,
        model: candidate.model,
        sourceLanguage,
        outputLanguage: targetLanguage,
        register,
        tone,
        transcript: rawTranscript,
        correctedTranscript,
        flags: flaggedSegments,
        config
      };

      try {
        const payload = mode === "prompt" ? await createPrompt(input) : await createDraft(input);
        results.push({
          success: true,
          provider: payload.model?.provider || candidate.provider,
          model: payload.model?.model || candidate.model,
          output: payload.output,
          notes: payload.notes || [],
          warnings: payload.warnings || [],
          trace: payload.trace || null
        });
      } catch (error) {
        results.push({
          success: false,
          provider: candidate.provider,
          model: candidate.model,
          error: error instanceof Error ? error.message : "Comparison route failed."
        });
      }
    }

    return json({
      results,
      meta: {
        preset,
        recommendedProvider: results.find((result) => result.success)?.provider || candidates[0]?.provider || "demo",
        reason: `Comparison run used the ${preset} preset across ${candidates.length} route${candidates.length === 1 ? "" : "s"}.`
      }
    });
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Comparison failed.", 500);
  }
};
