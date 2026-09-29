import { errorResponse, getOpenAiConfig, json, normalizeText } from "./_shared.js";
import { createDraft, createPrompt, normalizeProcessingMode } from "./text-service.js";

export const onRequestPost = async ({ request, env }) => {
  const config = getOpenAiConfig(env);

  try {
    const body = await request.json();
    const mode = normalizeProcessingMode(normalizeText(body.mode) || "draft");
    const preset = normalizeText(body.preset) || "fast";
    const rawTranscript = normalizeText(body.rawTranscript);
    const correctedTranscript = normalizeText(body.correctedTranscript) || rawTranscript;
    const sourceLanguage = normalizeText(body.sourceLanguage) || "Unknown";
    const targetLanguage = normalizeText(body.targetLanguage) || sourceLanguage;
    const register = normalizeText(body.register) || "Clear Note";
    const tone = normalizeText(body.tone) || "Neutral";
    const flaggedSegments = Array.isArray(body.flaggedSegments) ? body.flaggedSegments : [];
    const provider = normalizeText(body.provider);
    const model = normalizeText(body.model);

    if (!rawTranscript) {
      return errorResponse("Transcript is required.");
    }

    const payload =
      mode === "prompt"
        ? await createPrompt({
            preset,
            provider,
            model,
            sourceLanguage,
            outputLanguage: targetLanguage,
            register,
            tone,
            transcript: rawTranscript,
            correctedTranscript,
            flags: flaggedSegments,
            config
          })
        : await createDraft({
            preset,
            provider,
            model,
            sourceLanguage,
            outputLanguage: targetLanguage,
            register,
            tone,
            transcript: rawTranscript,
            correctedTranscript,
            flags: flaggedSegments,
            config
          });

    return json(payload);
  } catch (error) {
    return errorResponse(error instanceof Error ? error.message : "Processing failed.", 500);
  }
};
