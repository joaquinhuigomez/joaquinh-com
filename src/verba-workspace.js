import "./verba-workspace.css";
import { getVerbaIcon } from "./verba-graphics.js";

const LANGUAGE_OPTIONS = [
  { id: "auto", label: "Auto-detect", apiLanguage: "", supportLevel: "mixed", note: "Useful for code-switching or messy clips, but review flagged spans carefully." },
  { id: "english", label: "English", apiLanguage: "en", supportLevel: "reliable", note: "Reliable v1 route." },
  { id: "mandarin", label: "Mandarin", apiLanguage: "zh", supportLevel: "reliable", note: "Reliable v1 route." },
  { id: "spanish", label: "Spanish", apiLanguage: "es", supportLevel: "reliable", note: "Reliable v1 route." },
  { id: "german", label: "German", apiLanguage: "de", supportLevel: "reliable", note: "Reliable v1 route." },
  { id: "french", label: "French", apiLanguage: "fr", supportLevel: "reliable", note: "Reliable v1 route." },
  { id: "portuguese", label: "Portuguese", apiLanguage: "pt", supportLevel: "reliable", note: "Reliable v1 route." },
  { id: "cantonese", label: "Cantonese", apiLanguage: "", supportLevel: "beta", note: "Beta route. Inspect flagged spans and keep manual review in the loop." }
];

const PROCESS_MODES = [
  {
    id: "draft",
    icon: "polish",
    label: "Draft",
    buttonLabel: "Generate draft",
    title: "Draft output",
    description: "Polish in the source language or translate into the selected output language."
  },
  {
    id: "prompt",
    icon: "prompt",
    label: "Prompt",
    buttonLabel: "Generate prompt",
    title: "Prompt-ready brief",
    description: "Convert spoken intent into a strong prompt for another model or agent."
  }
];

const INFERENCE_PRESETS = [
  {
    id: "fast",
    label: "Fast",
    icon: "spark",
    hint: "Cheapest reasonable route for quick drafting.",
    summary: "Prefers the lowest-friction route so you can iterate quickly."
  },
  {
    id: "premium",
    label: "Premium",
    icon: "seal",
    hint: "Higher-quality route when multilingual nuance matters more than speed.",
    summary: "Prefers the strongest hosted route you have configured, then falls back."
  },
  {
    id: "benchmark",
    label: "Benchmark",
    icon: "stack",
    hint: "Compare outputs across providers on the same reviewed transcript.",
    summary: "Runs multiple routes side by side so you can label outputs and spot model drift."
  }
];

const TEXT_PROVIDER_OPTIONS = [
  { id: "default", label: "Default route", hint: "Use the configured draft provider from env." },
  { id: "local", label: "Local model", hint: "Use your Ollama-backed local draft model." },
  { id: "openai", label: "OpenAI", hint: "Hosted draft quality with your OpenAI API key." },
  { id: "anthropic", label: "Anthropic", hint: "Hosted draft quality with your Anthropic API key." },
  { id: "demo", label: "Demo", hint: "Template-only fallback for UI and export testing." }
];

const REGISTER_OPTIONS = [
  { id: "clear-note", label: "Clear Note", icon: "note", hint: "Plain language for everyday writing." },
  { id: "team-update", label: "Team Update", icon: "briefcase", hint: "Internal work update for teammates." },
  { id: "executive-brief", label: "Executive Brief", icon: "stack", hint: "Short, decision-ready summary." },
  { id: "formal-statement", label: "Formal Statement", icon: "seal", hint: "Official or external-facing wording." },
  { id: "legal-review", label: "Legal Review", icon: "scale", hint: "Careful phrasing with precision." },
  { id: "public-speaking", label: "Public Speaking", icon: "podium", hint: "Built to sound strong when read aloud." },
  { id: "personal-message", label: "Personal Message", icon: "chat", hint: "Natural language for everyday personal use." },
  { id: "romantic-note", label: "Romantic Note", icon: "heart", hint: "Affectionate and intimate." }
];

const TONE_OPTIONS = [
  { id: "neutral", label: "Neutral", icon: "neutral", hint: "Balanced and plainspoken." },
  { id: "warm", label: "Warm", icon: "sun", hint: "Friendly and open." },
  { id: "calm", label: "Calm", icon: "leaf", hint: "Steady and measured." },
  { id: "confident", label: "Confident", icon: "flag", hint: "Direct and assured." },
  { id: "energetic", label: "Energetic", icon: "spark", hint: "Lively and forward-moving." },
  { id: "empathetic", label: "Empathetic", icon: "care", hint: "Gentle and considerate." }
];

const WORKSPACE_STEPS = [
  { id: "capture", title: "Capture", icon: "capture" },
  { id: "inspect", title: "Inspect", icon: "truth" },
  { id: "transform", title: "Transform", icon: "transform" },
  { id: "export", title: "Export", icon: "export" }
];

const HISTORY_STORAGE_KEY = "verba-corrections-v1";
const LEGACY_HISTORY_STORAGE_KEY = "voice-workspace-corrections-v1";
const EVAL_RUN_STORAGE_KEY = "verba-eval-runs-v1";
const MAX_FILE_SIZE_BYTES = 24 * 1024 * 1024;
const SCORE_FIELDS = [
  { id: "fidelity", label: "Fidelity" },
  { id: "naturalness", label: "Naturalness" },
  { id: "scriptPreservation", label: "Script" },
  { id: "registerFit", label: "Register" },
  { id: "toneFit", label: "Tone" },
  { id: "safetyHandling", label: "Safety" }
];
const ERROR_TAG_OPTIONS = [
  { id: "mistranslation", label: "Mistranslation" },
  { id: "hallucinated-meaning", label: "Meaning drift" },
  { id: "script-flip", label: "Script flip" },
  { id: "slang-miss", label: "Slang miss" },
  { id: "tone-miss", label: "Tone miss" },
  { id: "register-miss", label: "Register miss" },
  { id: "code-switch-collapse", label: "Code-switch drop" },
  { id: "euphemization", label: "Euphemized" },
  { id: "refusal", label: "Refusal" }
];
const SAMPLE_QUERY_PARAM = "sample";
const SAMPLE_SCENARIO = {
  title: "Code-switched launch note",
  summary: "A realistic multilingual sample with raw, reviewed, and drafted text already staged.",
  transcript:
    "這週這個 feature 本來 Friday 要 ship, but the backend blocker 還沒完全解掉，所以我現在還不知道要怎麼跟 team 說清楚。",
  reviewedTranscript:
    "這週這個 feature 本來 Friday 要 ship, but the backend blocker 還沒完全解掉，所以我現在還不知道要怎麼跟 team 清楚交代。",
  processedOutput:
    "The feature was originally scheduled to ship on Friday, but the backend blocker is still not fully resolved, so I do not yet have a clear way to explain the delay to the team.",
  note: "Use this to inspect the trust layer and compare raw, reviewed, and drafted outputs without uploading audio."
};
const SAMPLE_SESSION = {
  sessionId: "sample-session",
  createdAt: "2026-03-19T00:00:00.000Z",
  transcript: SAMPLE_SCENARIO.transcript,
  languageDetected: "code-switched zh-en",
  durationSeconds: 37,
  route: {
    provider: "sample",
    model: "verba-sample-session",
    selectedLanguage: "auto",
    apiLanguage: null,
    supportLevel: "mixed",
    risk: {
      level: "high",
      recommendation: "review required",
      reasons: ["mixed-language route", "multiple flagged spans", "seeded walkthrough keeps review visible"]
    }
  },
  sourceFile: {
    name: "sample-code-switch-launch-note.wav",
    size: 0,
    type: "audio/wav"
  },
  summary: {
    segmentCount: 3,
    flaggedCount: 2,
    durationSeconds: 37,
    reviewRecommendation: "review required"
  },
  segments: [
    {
      id: 0,
      start: 0,
      end: 11.6,
      text: "這週這個 feature 本來 Friday 要 ship,",
      score: 58,
      level: "medium",
      reasons: ["code-switching likely", "timeline detail"]
    },
    {
      id: 1,
      start: 11.6,
      end: 24.4,
      text: "but the backend blocker 還沒完全解掉，",
      score: 76,
      level: "high",
      reasons: ["code-switching likely", "critical blocker wording"]
    },
    {
      id: 2,
      start: 24.4,
      end: 37,
      text: "所以我現在還不知道要怎麼跟 team 說清楚。",
      score: 49,
      level: "medium",
      reasons: ["tone may need review"]
    }
  ],
  warnings: ["Sample session loaded. This is a seeded walkthrough, not a live transcription."]
};
const SAMPLE_PROCESSED = {
  mode: "draft",
  headline: "Translated draft",
  output: SAMPLE_SCENARIO.processedOutput,
  notes: ["This seeded sample shows the final drafted layer in English."],
  warnings: ["The sample is intentionally code-switched so the trust layer remains visible."],
  model: {
    provider: "sample",
    model: "verba-sample-draft"
  },
  trace: {
    provider: "sample",
    model: "verba-sample-draft",
    promptVersion: "verba-sample-v1",
    sourceLanguage: "Auto-detect",
    outputLanguage: "English",
    mode: "draft",
    latencyMs: 820,
    usageEstimate: {
      promptTokens: 0,
      outputTokens: 0,
      estimatedCostUsd: null
    }
  }
};

const root = document.querySelector("#app");

const state = {
  selectedLanguage: "auto",
  processMode: "draft",
  inferencePreset: "fast",
  targetLanguage: "english",
  targetLanguageTouched: false,
  register: "clear-note",
  tone: "neutral",
  textProvider: "default",
  modelOverride: "",
  reviewerMode: false,
  activeStep: "capture",
  audioFile: null,
  audioUrl: "",
  transcribing: false,
  processing: false,
  recording: false,
  mediaRecorder: null,
  mediaStream: null,
  recordingChunks: [],
  session: null,
  correctedText: "",
  correctionNote: "",
  processed: null,
  comparisonResults: [],
  comparisonMeta: null,
  history: loadHistory(),
  evalRuns: loadEvalRuns(),
  evalStoreBacking: "local",
  evalStoreHydrated: false,
  evalScores: createEmptyEvalScores(),
  selectedErrorTags: [],
  focusedSegmentId: null,
  sampleLoaded: false,
  error: "",
  notice: ""
};

document.title = "Verba Workspace | Multilingual speech, made publishable.";

maybeLoadSampleFromUrl();
render();
void hydrateEvalStore();

function render() {
  const currentStep = WORKSPACE_STEPS.find((step) => step.id === state.activeStep) ?? WORKSPACE_STEPS[0];
  const flaggedSegments = getFlaggedSegments();

  root.innerHTML = `
    <div class="verba-page-shell verba-workspace-page">
      <header class="verba-topbar">
        <div class="verba-container verba-topbar-inner">
          <a class="verba-brand" href="/labs/verba/">
            <span class="verba-brand-mark">${getVerbaIcon("mark")}</span>
            <span class="verba-brand-copy">
              <span class="verba-brand-name">Verba</span>
              <span class="verba-brand-tag">Multilingual speech, made publishable.</span>
            </span>
          </a>
          <a class="verba-back-link" href="/labs/verba/">Back to product story</a>
        </div>
      </header>

      <main class="verba-container verba-workspace-main">
        ${renderBanner()}

        <section class="verba-workspace-hero verba-surface">
          <div class="verba-workspace-hero-copy">
            <p class="verba-kicker">Workspace</p>
            <h1 class="verba-heading-lg">Start with the transcript. Then shape the draft.</h1>
            <p class="verba-soft-copy">One main artifact per step. The source stays in view the whole time.</p>
          </div>
          <div class="verba-workspace-hero-chips">
            <span class="verba-chip">${getVerbaIcon("truth")} Raw transcript preserved</span>
            <span class="verba-chip">${getVerbaIcon("review")} ${flaggedSegments.length} flagged span${flaggedSegments.length === 1 ? "" : "s"} in current session</span>
            <span class="verba-chip">${getVerbaIcon("multilingual")} ${countReliableLanguages()} public language routes</span>
          </div>
        </section>

        <section class="verba-workspace-shell">
          <aside class="verba-rail verba-rail-left verba-panel">
            <div class="verba-rail-section">
              <p class="verba-kicker">Progress</p>
              <ol class="verba-stepper">
                ${WORKSPACE_STEPS.map((step, index) => renderStepItem(step, index)).join("")}
              </ol>
            </div>

            <div class="verba-rail-section">
              <p class="verba-kicker">Trust meter</p>
              ${renderTrustMeter()}
            </div>
          </aside>

          <div class="verba-workspace-column">
            <section class="verba-canvas verba-panel">
              <div class="verba-canvas-head">
                <div>
                  <p class="verba-kicker">Active step</p>
                  <h2 class="verba-heading-lg">${escapeHtml(currentStep.title)}</h2>
                </div>
                <span class="verba-step-badge">${currentStep.title}</span>
              </div>

              <div class="verba-canvas-body">
                ${renderActiveStep()}
              </div>

              <div class="verba-canvas-footer">
                ${renderStepFooter()}
              </div>
            </section>

            <aside class="verba-rail verba-rail-right verba-panel">
              <div class="verba-rail-section">
                <p class="verba-kicker">Context</p>
                ${renderContextPanel()}
              </div>

              <div class="verba-rail-section">
                <p class="verba-kicker">Session summary</p>
                <div class="verba-summary-list">
                  ${renderSummaryDisclosures()}
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  `;

  bindEvents();
}

function renderBanner() {
  if (!state.error && !state.notice) {
    return "";
  }

  const tone = state.error ? "verba-banner verba-banner-error" : "verba-banner";
  const message = state.error || state.notice;

  return `
    <div class="${tone}">
      <span>${escapeHtml(message)}</span>
      <button id="dismiss-banner" type="button" aria-label="Dismiss message">×</button>
    </div>
  `;
}

function renderStepItem(step, index) {
  const status = getStepStatus(step.id);
  const unlocked = isStepUnlocked(step.id);

  return `
    <li class="verba-step verba-step-${status}">
      <button class="verba-step-button" type="button" data-step="${step.id}" ${unlocked ? "" : "disabled"}>
        <span class="verba-step-index">${String(index + 1).padStart(2, "0")}</span>
        <span class="verba-step-icon">${getVerbaIcon(step.icon)}</span>
        <span class="verba-step-copy">
          <strong>${escapeHtml(step.title)}</strong>
          <span>${status === "complete" ? "Ready" : status === "current" ? "In progress" : "Locked"}</span>
        </span>
      </button>
    </li>
  `;
}

function renderActiveStep() {
  if (state.activeStep === "inspect") {
    return renderInspectStep();
  }

  if (state.activeStep === "transform") {
    return renderTransformStep();
  }

  if (state.activeStep === "export") {
    return renderExportStep();
  }

  return renderCaptureStep();
}

function renderCaptureStep() {
  const selectedLanguage = getLanguageMeta(state.selectedLanguage);

  return `
    <div class="verba-stage-grid verba-stage-capture">
      <div class="verba-stage-column">
        <div class="verba-stage-copy">
          <p class="verba-soft-copy">Pick a language route, add a clip, and create the source transcript.</p>
        </div>

        <div class="verba-card verba-capture-card">
          <div class="verba-field">
            <label for="source-language">Source language</label>
            <select id="source-language" class="verba-select">
              ${LANGUAGE_OPTIONS.map(renderLanguageOption).join("")}
            </select>
          </div>

          <div class="verba-capture-actions">
            <label class="verba-upload-zone">
              <input id="audio-file" type="file" accept="audio/*,video/*" />
              <span class="verba-upload-label">Upload audio</span>
              <strong>${state.audioFile ? escapeHtml(state.audioFile.name) : "Select audio or video"}</strong>
              <span>${state.audioFile ? `${formatBytes(state.audioFile.size)} · ${escapeHtml(state.audioFile.type || "audio blob")}` : "24 MB max. MP3, WAV, M4A, WebM, MP4."}</span>
            </label>

            <button class="verba-pill-button verba-record-button ${state.recording ? "verba-recording" : ""}" id="record-toggle" type="button">
              <span class="verba-record-dot"></span>
              <span>${state.recording ? "Stop recording" : "Record from mic"}</span>
            </button>
          </div>

          <div class="verba-route-note">
            <span class="verba-icon-box">${getVerbaIcon("multilingual")}</span>
            <div>
              <strong>${escapeHtml(selectedLanguage.label)}</strong>
              <p class="verba-soft-copy">${escapeHtml(selectedLanguage.note)}</p>
            </div>
          </div>

          ${renderAudioStrip()}

          ${
            state.transcribing
              ? `
                <article class="verba-card verba-loading-card">
                  <p class="verba-kicker">Transcribing</p>
                  <h3 class="verba-heading-md">Building the source transcript</h3>
                  <p class="verba-soft-copy">Verba is pulling the raw text first so you can inspect it before anything gets rewritten.</p>
                  <div class="verba-skeleton-stack">
                    <span></span>
                    <span></span>
                    <span class="verba-skeleton-short"></span>
                  </div>
                </article>
              `
              : ""
          }
        </div>
      </div>

      <div class="verba-stage-column verba-stage-column-secondary">
        <article class="verba-card verba-stage-aside-card">
          <p class="verba-kicker">What gets preserved</p>
          <h3 class="verba-heading-md">The source transcript stays available.</h3>
          <p class="verba-soft-copy">Verba keeps the first pass separate, so you can revise it before you generate anything new.</p>
          <div class="verba-stage-metrics">
            <article class="verba-badge-stat">
              <p class="verba-meta">Input route</p>
              <strong>${escapeHtml(selectedLanguage.label)}</strong>
            </article>
            <article class="verba-badge-stat">
              <p class="verba-meta">File limit</p>
              <strong>${Math.round(MAX_FILE_SIZE_BYTES / (1024 * 1024))} MB</strong>
            </article>
          </div>
        </article>

        <article class="verba-card verba-stage-aside-card verba-sample-card">
          <p class="verba-kicker">Guided sample</p>
          <h3 class="verba-heading-md">${escapeHtml(SAMPLE_SCENARIO.title)}</h3>
          <p class="verba-soft-copy">${escapeHtml(SAMPLE_SCENARIO.summary)}</p>
          <div class="verba-chip-row">
            <span class="verba-chip">${getVerbaIcon("review")} 2 flagged spans</span>
            <span class="verba-chip">${getVerbaIcon("transform")} Draft already prepared</span>
          </div>
          <button class="verba-button-secondary" id="load-sample-session" type="button">Try sample session</button>
        </article>
      </div>
    </div>
  `;
}

function renderInspectStep() {
  if (!state.session) {
    return renderBlockedState("Transcribe audio first", "Create the raw transcript before entering review mode.", "Return to capture");
  }

  const flaggedSegments = getFlaggedSegments();

  return `
    <div class="verba-stage-grid">
      <div class="verba-stage-column">
        <div class="verba-stage-copy">
          <p class="verba-soft-copy">Review the source transcript first. Click flagged spans to focus the parts most likely to need correction.</p>
        </div>

        <article class="verba-card verba-artifact-card">
          <div class="verba-artifact-head">
            <div>
              <p class="verba-kicker">Truth layer</p>
              <h3 class="verba-heading-md">Raw transcript</h3>
            </div>
            <div class="verba-chip-row">
              <span class="verba-chip">${getVerbaIcon("review")} ${flaggedSegments.length} flagged</span>
              <span class="verba-chip verba-chip-muted">${escapeHtml(getReviewRecommendationLabel())}</span>
            </div>
          </div>
          <div class="verba-inline-transcript">
            ${renderTranscriptSegments()}
          </div>
        </article>

        <article class="verba-card verba-editor-card">
          <div class="verba-artifact-head">
            <div>
              <p class="verba-kicker">Reviewed transcript</p>
              <h3 class="verba-heading-md">Make manual corrections where needed</h3>
            </div>
          </div>
          <textarea id="corrected-text" class="verba-textarea verba-review-editor" placeholder="Refine the transcript here before you transform it.">${escapeForTextarea(
            state.correctedText
          )}</textarea>
        </article>
      </div>

      <div class="verba-stage-column verba-stage-column-secondary">
        <article class="verba-card verba-stage-aside-card">
          <p class="verba-kicker">Review focus</p>
          <h3 class="verba-heading-md">${escapeHtml(getFocusedSegment()?.text ? trimPreview(getFocusedSegment().text, 82) : "Select a flagged span")}</h3>
          <p class="verba-soft-copy">
            ${
              getFocusedSegment()
                ? escapeHtml(getFocusedSegment().reasons?.join(" · ") || "This span deserves another pass before you draft from it.")
                : "The trust layer works best when you inspect the highlighted spans before moving on."
            }
          </p>
        </article>
        <details class="verba-disclosure verba-disclosure-open" open>
          <summary>Review details <span>${flaggedSegments.length} hotspot${flaggedSegments.length === 1 ? "" : "s"}</span></summary>
          <div class="verba-disclosure-body verba-detail-list">
            ${state.session.segments.map(renderSegmentReview).join("")}
          </div>
        </details>
      </div>
    </div>
  `;
}

function renderTransformStep() {
  if (!state.session) {
    return renderBlockedState("No transcript yet", "You need a reviewed transcript before you can transform it.", "Return to capture");
  }

  const currentMode = PROCESS_MODES.find((mode) => mode.id === state.processMode) ?? PROCESS_MODES[0];
  const showProcessedArtifact = state.processing || state.processed;

  return `
    <div class="verba-stage-grid">
      <div class="verba-stage-column">
        <div class="verba-stage-copy">
          <p class="verba-soft-copy">Compare the three layers, then run the output you want. Advanced routing and model controls stay out of the way unless you need them.</p>
        </div>

        <div class="verba-mode-row">
          ${PROCESS_MODES.map(renderModePill).join("")}
        </div>

        ${renderArtifactComparisonStrip()}
        ${renderDraftGuard()}
        ${renderComparisonSection()}

        ${
          showProcessedArtifact
            ? `
              <article class="verba-card verba-artifact-card verba-artifact-card-processed">
                <div class="verba-artifact-head">
                  <div>
                    <p class="verba-kicker">Processed layer</p>
                    <h3 class="verba-heading-md">${escapeHtml(state.processed?.headline || currentMode.title)}</h3>
                  </div>
                  <div class="verba-process-meta">
                    <span>${escapeHtml(state.processed?.model?.provider || getTextProviderMeta().label)}</span>
                    <span>${escapeHtml(state.processed?.model?.model || state.modelOverride.trim() || "default model")}</span>
                    <span>${escapeHtml(currentMode.buttonLabel)}</span>
                  </div>
                </div>
                ${
                  state.processing
                    ? `
                      <div class="verba-processing-card">
                        <p class="verba-soft-copy">Generating the ${escapeHtml(currentMode.title.toLowerCase())}. Verba keeps the reviewed transcript fixed while the draft layer updates.</p>
                        <div class="verba-skeleton-stack">
                          <span></span>
                          <span></span>
                          <span></span>
                          <span class="verba-skeleton-short"></span>
                        </div>
                      </div>
                    `
                    : `
                      <div class="verba-processed-output">${nl2br(state.processed.output)}</div>
                      ${renderNoticeList("Notes", state.processed.notes)}
                      ${renderNoticeList("Warnings", state.processed.warnings, "warning")}
                      ${renderTraceMeta()}
                    `
                }
              </article>
            `
            : `
              <article class="verba-card verba-empty-card">
                <p class="verba-kicker">Processed layer</p>
                <h3 class="verba-heading-md">${escapeHtml(currentMode.title)}</h3>
                <p class="verba-soft-copy">${escapeHtml(currentMode.description)}</p>
              </article>
            `
        }
      </div>

      <div class="verba-stage-column verba-stage-column-secondary">
        <article class="verba-card verba-stage-aside-card">
          <p class="verba-kicker">Working text</p>
          <h3 class="verba-heading-md">Input to transform</h3>
          <p class="verba-soft-copy verba-stage-compact-copy">${escapeHtml(trimPreview(state.correctedText || state.session.transcript, 240))}</p>
        </article>
      </div>
    </div>
  `;
}

function renderExportStep() {
  if (!state.session) {
    return renderBlockedState("No session to export", "Create a transcript first, then return here to package the output.", "Return to capture");
  }

  return `
    <div class="verba-stage-grid">
      <div class="verba-stage-column">
        <article class="verba-card verba-export-card">
          <div class="verba-artifact-head">
            <div>
              <p class="verba-kicker">Finish</p>
              <h3 class="verba-heading-md">Export the artifact you want to keep</h3>
            </div>
            <span class="verba-chip">${getVerbaIcon("export")} Ready to package</span>
          </div>

          <div class="verba-export-grid">
            <button class="verba-button-secondary verba-export-button" data-export-format="txt" type="button">Export txt</button>
            <button class="verba-button-secondary verba-export-button" data-export-format="md" type="button">Export md</button>
            <button class="verba-button-secondary verba-export-button" data-export-format="json" type="button">Export json</button>
          </div>

          <p class="verba-soft-copy"><code>txt</code> exports the best available final text. <code>md</code> keeps the workflow context. <code>json</code> keeps the whole session object.</p>
        </article>

        <details class="verba-disclosure">
          <summary>Builder tools <span>Eval logging and dataset export</span></summary>
          <div class="verba-disclosure-body verba-detail-list">
            <div class="verba-field">
              <label for="correction-note">Correction note</label>
              <input id="correction-note" class="verba-input" type="text" value="${escapeAttribute(
                state.correctionNote
              )}" placeholder="Why did this transcript need manual help?" />
            </div>
            <div class="verba-field">
              <span class="verba-field-title">Human ratings</span>
              <div class="verba-score-grid">
                ${SCORE_FIELDS.map(
                  (field) => `
                    <label class="verba-score-field">
                      <span>${escapeHtml(field.label)}</span>
                      <select class="verba-select verba-score-select" data-score-field="${field.id}">
                        <option value="">-</option>
                        <option value="1" ${state.evalScores[field.id] === "1" ? "selected" : ""}>1</option>
                        <option value="2" ${state.evalScores[field.id] === "2" ? "selected" : ""}>2</option>
                        <option value="3" ${state.evalScores[field.id] === "3" ? "selected" : ""}>3</option>
                        <option value="4" ${state.evalScores[field.id] === "4" ? "selected" : ""}>4</option>
                        <option value="5" ${state.evalScores[field.id] === "5" ? "selected" : ""}>5</option>
                      </select>
                    </label>
                  `
                ).join("")}
              </div>
            </div>
            <div class="verba-field">
              <span class="verba-field-title">Error tags</span>
              <div class="verba-choice-grid verba-choice-grid-tags">
                ${ERROR_TAG_OPTIONS.map(renderErrorTagChoice).join("")}
              </div>
            </div>
            <div class="verba-button-row">
              <button class="verba-button-secondary" id="save-correction" type="button">Save eval entry</button>
              <button class="verba-button-secondary" id="export-history" type="button" ${(state.history.length || state.evalRuns.length) ? "" : "disabled"}>Export eval bundle</button>
            </div>
            ${renderHistoryPreview()}
          </div>
        </details>
      </div>

      <div class="verba-stage-column verba-stage-column-secondary">
        <article class="verba-card verba-stage-aside-card">
          <p class="verba-kicker">What you are exporting</p>
          <h3 class="verba-heading-md">${escapeHtml(state.processed?.headline || "Reviewed transcript")}</h3>
          <p class="verba-soft-copy verba-stage-compact-copy">${escapeHtml(trimPreview(state.processed?.output || state.correctedText || state.session.transcript, 260))}</p>
        </article>
      </div>
    </div>
  `;
}

function renderBlockedState(title, copy, actionLabel) {
  return `
    <article class="verba-card verba-empty-card verba-empty-card-large">
      <p class="verba-kicker">Unavailable</p>
      <h3 class="verba-heading-md">${escapeHtml(title)}</h3>
      <p class="verba-soft-copy">${escapeHtml(copy)}</p>
      <div class="verba-button-row">
        <button class="verba-button-secondary" type="button" data-step="capture">${escapeHtml(actionLabel)}</button>
      </div>
    </article>
  `;
}

function renderContextPanel() {
  if (state.activeStep === "inspect") {
    return renderInspectContext();
  }

  if (state.activeStep === "transform") {
    return renderTransformContext();
  }

  if (state.activeStep === "export") {
    return renderExportContext();
  }

  return renderCaptureContext();
}

function renderCaptureContext() {
  const selectedLanguage = getLanguageMeta(state.selectedLanguage);

  return `
    <article class="verba-card verba-context-card">
      <div class="verba-context-block">
        <p class="verba-kicker">Current route</p>
        <h3 class="verba-heading-md">${escapeHtml(selectedLanguage.label)}</h3>
        <p class="verba-soft-copy">${escapeHtml(selectedLanguage.note)}</p>
      </div>
      <div class="verba-context-block">
        <p class="verba-kicker">First-run option</p>
        <ul class="verba-mini-list">
          <li>Load the sample session if you want to see the trust workflow immediately.</li>
          <li>Upload-first and non-live by design.</li>
          <li>Raw transcript stays separate from the drafted output.</li>
        </ul>
      </div>
    </article>
  `;
}

function renderInspectContext() {
  const trust = getTrustState();

  return `
    <article class="verba-card verba-context-card">
      <div class="verba-context-block">
        <p class="verba-kicker">Review aim</p>
        <h3 class="verba-heading-md">Resolve weak spots first</h3>
        <p class="verba-soft-copy">Flagged spans are easiest to fix here, while the source wording is still front and center.</p>
        <div class="verba-chip-row">
          <span class="verba-chip verba-chip-muted">${escapeHtml(trust.label)}</span>
          <span class="verba-chip verba-chip-muted">${escapeHtml(getReviewRecommendationLabel())}</span>
        </div>
      </div>
      ${renderWarningsBlock(state.session?.warnings)}
    </article>
  `;
}

function renderTransformContext() {
  const selectedRegister = getRegisterMeta();
  const selectedTone = getToneMeta();
  const selectedPreset = getInferencePresetMeta();

  return `
    <article class="verba-card verba-context-card">
      <div class="verba-context-block">
        <p class="verba-kicker">Draft setup</p>
        <div class="verba-field">
          <span class="verba-field-title">Inference preset</span>
          <div class="verba-choice-grid verba-choice-grid-presets">
            ${INFERENCE_PRESETS.map((option) => renderStyleChoice(option, state.inferencePreset, "preset")).join("")}
          </div>
          <p class="verba-soft-copy verba-style-caption">${escapeHtml(selectedPreset.summary)}</p>
        </div>
        <div class="verba-chip-row">
          <span class="verba-chip verba-chip-muted">${escapeHtml(getLanguageMeta(state.targetLanguage).label)}</span>
          <span class="verba-chip verba-chip-muted">${escapeHtml(selectedRegister.label)}</span>
          <span class="verba-chip verba-chip-muted">${escapeHtml(selectedTone.label)}</span>
        </div>
        <p class="verba-soft-copy">Match source and output language for an in-language draft. Change the output language when you want translation.</p>
        <div class="verba-button-row verba-button-row-compact">
          <button class="verba-button-secondary" id="toggle-reviewer-mode" type="button">${state.reviewerMode ? "Exit reviewer mode" : "Open reviewer mode"}</button>
          <button class="verba-button-secondary" id="compare-drafts" type="button" ${state.session ? "" : "disabled"}>Compare routes</button>
        </div>
        ${renderRoutingNote()}
        <details class="verba-disclosure verba-disclosure-compact" open>
          <summary>Adjust style and language <span>Keep the main flow calm</span></summary>
          <div class="verba-disclosure-body verba-detail-list">
            <div class="verba-field">
              <label for="target-language">Output language</label>
              <select id="target-language" class="verba-select">
                ${LANGUAGE_OPTIONS.filter((language) => language.id !== "auto")
                  .map(
                    (language) =>
                      `<option value="${language.id}" ${state.targetLanguage === language.id ? "selected" : ""}>${escapeHtml(language.label)}</option>`
                  )
                  .join("")}
              </select>
            </div>
            <div class="verba-field">
              <span class="verba-field-title">Output register</span>
              <div class="verba-choice-grid">
                ${REGISTER_OPTIONS.map((option) => renderStyleChoice(option, state.register, "register")).join("")}
              </div>
              <p class="verba-soft-copy verba-style-caption">${escapeHtml(selectedRegister.hint)}</p>
            </div>
            <div class="verba-field">
              <span class="verba-field-title">Tone</span>
              <div class="verba-choice-grid verba-choice-grid-tone">
                ${TONE_OPTIONS.map((option) => renderStyleChoice(option, state.tone, "tone")).join("")}
              </div>
              <p class="verba-soft-copy verba-style-caption">${escapeHtml(selectedTone.hint)}</p>
            </div>
          </div>
        </details>
        <details class="verba-disclosure verba-disclosure-compact">
          <summary>Advanced model controls <span>${escapeHtml(getTextProviderMeta().label)}</span></summary>
          <div class="verba-disclosure-body verba-detail-list">
            <div class="verba-field">
              <label for="text-provider">Draft engine</label>
              <select id="text-provider" class="verba-select">
                ${TEXT_PROVIDER_OPTIONS.map(
                  (option) => `<option value="${option.id}" ${state.textProvider === option.id ? "selected" : ""}>${escapeHtml(option.label)}</option>`
                ).join("")}
              </select>
              <p class="verba-soft-copy verba-style-caption">${escapeHtml(getTextProviderMeta().hint)}</p>
            </div>
            <div class="verba-field">
              <label for="model-override">Model override</label>
              <input
                id="model-override"
                class="verba-input"
                type="text"
                value="${escapeAttribute(state.modelOverride)}"
                placeholder="Optional, for example gpt-5-mini or claude-sonnet-4"
              />
            </div>
          </div>
        </details>
      </div>
    </article>
  `;
}

function renderExportContext() {
  return `
    <article class="verba-card verba-context-card">
      <div class="verba-context-block">
        <p class="verba-kicker">Builder signal</p>
        <h3 class="verba-heading-md">${state.history.length} saved eval entr${state.history.length === 1 ? "y" : "ies"}</h3>
        <p class="verba-soft-copy">${state.evalRuns.length} draft run${state.evalRuns.length === 1 ? "" : "s"} logged ${escapeHtml(describeEvalStoreLocation())} for side-by-side benchmarking.</p>
        <div class="verba-chip-row">
          <span class="verba-chip verba-chip-muted">${escapeHtml(getEvalStoreStatusLabel())}</span>
        </div>
      </div>
    </article>
  `;
}

function renderSummaryDisclosures() {
  const reviewSummary = state.session ? getReviewRecommendationLabel() : "No transcript yet";

  return `
    <details class="verba-disclosure" ${state.audioFile ? "open" : ""}>
      <summary>Capture summary <span>${state.audioFile ? escapeHtml(state.audioFile.name) : "No audio yet"}</span></summary>
      <div class="verba-disclosure-body">
        <p class="verba-soft-copy">${state.audioFile ? `${formatBytes(state.audioFile.size)} · ${escapeHtml(getLanguageMeta(state.selectedLanguage).label)}` : "Upload or record audio to begin the flow."}</p>
      </div>
    </details>

    <details class="verba-disclosure" ${state.session ? "open" : ""}>
      <summary>Inspect summary <span>${escapeHtml(reviewSummary)}</span></summary>
      <div class="verba-disclosure-body">
        <p class="verba-soft-copy">${state.session ? `${escapeHtml(state.session.route?.model || "model")} · ${escapeHtml(state.session.languageDetected || "unknown")}` : "The raw transcript will appear here after transcription."}</p>
      </div>
    </details>

    <details class="verba-disclosure" ${state.processed ? "open" : ""}>
      <summary>Transform summary <span>${state.processed ? escapeHtml(state.processed.headline || "Draft ready") : "No draft yet"}</span></summary>
      <div class="verba-disclosure-body">
        <p class="verba-soft-copy">${state.processed ? escapeHtml(trimPreview(state.processed.output, 140)) : "Processed output will appear after you run a transform mode."}</p>
      </div>
    </details>
  `;
}

function renderStepFooter() {
  const previousStep = getAdjacentStep(-1);
  const nextStep = getAdjacentStep(1);
  const nextUnlocked = nextStep ? canMoveToNextStep() : false;

  return `
    <div class="verba-footer-actions">
      <button class="verba-button-secondary" type="button" id="step-back" ${previousStep ? "" : "disabled"}>
        Back
      </button>
      <div class="verba-footer-actions-right">
        ${renderPrimaryAction()}
        <button class="verba-button-secondary" type="button" id="step-next" ${nextStep && nextUnlocked ? "" : "disabled"}>
          ${nextStep ? `Next: ${nextStep.title}` : "Done"}
        </button>
      </div>
    </div>
  `;
}

function renderPrimaryAction() {
  if (state.activeStep === "capture") {
    return `
      <button class="verba-button" id="transcribe-button" type="button" ${state.audioFile ? "" : "disabled"}>
        ${state.transcribing ? "Building transcript..." : "Create raw transcript"}
      </button>
    `;
  }

  if (state.activeStep === "transform") {
    return `
      <button class="verba-button" id="process-button" type="button" ${state.session ? "" : "disabled"}>
        ${state.processing ? `${getCurrentMode().buttonLabel}...` : getCurrentMode().buttonLabel}
      </button>
    `;
  }

  if (state.activeStep === "export") {
    return `
      <a class="verba-button" href="/labs/verba/">Return to landing</a>
    `;
  }

  return "";
}

function renderAudioStrip() {
  if (!state.audioFile) {
    return `
      <article class="verba-card verba-audio-strip verba-audio-strip-empty">
        <div class="verba-audio-copy">
          <p class="verba-kicker">Audio preview</p>
          <h3 class="verba-heading-md">No clip selected yet</h3>
          <p class="verba-soft-copy">Use upload or mic capture to start the flow.</p>
        </div>
      </article>
    `;
  }

  const bars = generateAudioBars(state.audioFile);

  return `
    <article class="verba-card verba-audio-strip">
      <div class="verba-audio-copy">
        <p class="verba-kicker">Audio preview</p>
        <h3 class="verba-heading-md">${escapeHtml(state.audioFile.name)}</h3>
        <p class="verba-soft-copy">${formatBytes(state.audioFile.size)} · ${escapeHtml(state.audioFile.type || "audio blob")}</p>
      </div>
      <div class="verba-wave-strip" aria-hidden="true">
        ${bars.map((height) => `<span style="height:${height}%"></span>`).join("")}
      </div>
      ${state.audioUrl ? `<audio controls src="${escapeAttribute(state.audioUrl)}"></audio>` : ""}
    </article>
  `;
}

function renderSegmentReview(segment) {
  const focused = state.focusedSegmentId === String(segment.id);

  return `
    <article
      class="verba-segment-review verba-segment-${segment.level} ${focused ? "verba-segment-focused" : ""}"
      data-segment-review-id="${segment.id}"
      tabindex="0"
      role="button"
      aria-label="${escapeAttribute(`Focus transcript span ${formatDuration(segment.start)} to ${formatDuration(segment.end)}`)}"
    >
      <div class="verba-segment-review-head">
        <span>${formatDuration(segment.start)}-${formatDuration(segment.end)}</span>
        <strong>${escapeHtml(segment.level)}</strong>
      </div>
      <p>${escapeHtml(segment.text)}</p>
      ${
        segment.reasons?.length
          ? `<div class="verba-chip-row">${segment.reasons.map((reason) => `<span class="verba-chip verba-chip-muted">${escapeHtml(reason)}</span>`).join("")}</div>`
          : ""
      }
    </article>
  `;
}

function renderModePill(mode) {
  const selected = state.processMode === mode.id;

  return `
    <button class="verba-pill-button verba-mode-pill ${selected ? "verba-mode-pill-active" : ""}" type="button" data-mode="${mode.id}">
      <span class="verba-inline-icon">${getVerbaIcon(mode.icon)}</span>
      <span class="verba-mode-pill-copy">
        <strong>${escapeHtml(mode.label)}</strong>
        <span>${escapeHtml(mode.description)}</span>
      </span>
    </button>
  `;
}

function renderStyleChoice(option, selectedValue, dataType) {
  const selected = option.id === selectedValue;

  return `
    <button
      class="verba-pill-button verba-style-choice ${selected ? "verba-style-choice-active" : ""}"
      type="button"
      data-${dataType}="${option.id}"
      title="${escapeAttribute(option.hint)}"
    >
      <span class="verba-inline-icon">${getVerbaIcon(option.icon)}</span>
      <span class="verba-style-choice-copy">${escapeHtml(option.label)}</span>
    </button>
  `;
}

function renderErrorTagChoice(option) {
  const selected = state.selectedErrorTags.includes(option.id);

  return `
    <button
      class="verba-pill-button verba-style-choice verba-style-choice-tag ${selected ? "verba-style-choice-active" : ""}"
      type="button"
      data-error-tag="${option.id}"
    >
      <span class="verba-style-choice-copy">${escapeHtml(option.label)}</span>
    </button>
  `;
}

function renderHistoryPreview() {
  const historyPreview = state.history.slice(0, 4);

  if (!historyPreview.length) {
    return `<p class="verba-soft-copy">No saved eval entries yet. ${escapeHtml(getEvalStoreStatusLabel())}.</p>`;
  }

  return `
    <div class="verba-history-preview">
      <p class="verba-soft-copy">${escapeHtml(getEvalStoreStatusLabel())}</p>
      ${historyPreview
        .map(
          (entry) => `
            <article class="verba-history-card">
              <div class="verba-history-head">
                <strong>${escapeHtml(entry.languageLabel)}</strong>
                <span>${escapeHtml(formatTimestamp(entry.savedAt))}</span>
              </div>
              <p>${escapeHtml(entry.audioName)}</p>
              <p class="verba-soft-copy">${escapeHtml(entry.provider || "provider")} · ${escapeHtml(entry.model || "model")}</p>
              <p class="verba-soft-copy">${escapeHtml(entry.note || "No note added.")}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderWarningsBlock(warnings = []) {
  if (!warnings?.length) {
    return "";
  }

  return `
    <div class="verba-context-block">
      <p class="verba-kicker">Warnings</p>
      <ul class="verba-mini-list">
        ${warnings.map((warning) => `<li>${escapeHtml(warning)}</li>`).join("")}
      </ul>
    </div>
  `;
}

function renderNoticeList(title, items = [], tone = "note") {
  if (!items?.length) {
    return "";
  }

  return `
    <section class="verba-note-block verba-note-block-${tone}">
      <p class="verba-kicker">${escapeHtml(title)}</p>
      <ul class="verba-mini-list">
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderTraceMeta() {
  const trace = state.processed?.trace;

  if (!trace) {
    return "";
  }

  const estimatedCost =
    typeof trace.usageEstimate?.estimatedCostUsd === "number"
      ? `$${trace.usageEstimate.estimatedCostUsd.toFixed(4)} est.`
      : "Cost n/a";

  return `
    <section class="verba-note-block verba-note-block-trace">
      <p class="verba-kicker">Run trace</p>
      <div class="verba-chip-row">
        <span class="verba-chip verba-chip-muted">${escapeHtml(trace.promptVersion || "prompt")}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(trace.outputLanguage || "language")}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(trace.routingPreset || state.inferencePreset)}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml((trace.routeRiskLevel || "low").toUpperCase())} risk</span>
        <span class="verba-chip verba-chip-muted">${Math.max(0, Number(trace.latencyMs || 0))} ms</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(estimatedCost)}</span>
      </div>
      ${trace.routingReason ? `<p class="verba-soft-copy">${escapeHtml(trace.routingReason)}</p>` : ""}
      ${
        trace.routeRiskReasons?.length
          ? `<ul class="verba-mini-list">${trace.routeRiskReasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul>`
          : ""
      }
    </section>
  `;
}

function renderComparisonSection() {
  if (!state.comparisonResults.length && !state.reviewerMode) {
    return "";
  }

  if (!state.comparisonResults.length) {
    return `
      <article class="verba-card verba-empty-card verba-empty-card-reviewer">
        <p class="verba-kicker">Reviewer mode</p>
        <h3 class="verba-heading-md">Run a comparison when you want to label provider differences.</h3>
        <p class="verba-soft-copy">Use reviewer mode to compare routes, score outputs, and build your eval asset without leaving the workspace.</p>
      </article>
    `;
  }

  return `
    <article class="verba-card verba-comparison-panel">
      <div class="verba-artifact-head">
        <div>
          <p class="verba-kicker">Comparison run</p>
          <h3 class="verba-heading-md">Same reviewed transcript, multiple routes</h3>
        </div>
        <div class="verba-chip-row">
          <span class="verba-chip verba-chip-muted">${escapeHtml(getInferencePresetMeta().label)}</span>
          <span class="verba-chip verba-chip-muted">${state.comparisonResults.length} routes</span>
        </div>
      </div>
      <div class="verba-comparison-grid-live">
        ${state.comparisonResults.map(renderComparisonResultCard).join("")}
      </div>
    </article>
  `;
}

function renderComparisonResultCard(result) {
  if (!result.success) {
    return `
      <article class="verba-compare-result verba-compare-result-error">
        <div class="verba-compare-mini-head">
          <span class="verba-chip verba-chip-muted">${escapeHtml(result.provider)} / ${escapeHtml(result.model || "default")}</span>
          <span class="verba-compare-mini-status">Error</span>
        </div>
        <p class="verba-soft-copy">${escapeHtml(result.error || "Comparison route failed.")}</p>
      </article>
    `;
  }

  return `
    <article class="verba-compare-result">
      <div class="verba-compare-mini-head">
        <span class="verba-chip verba-chip-muted">${escapeHtml(result.provider)} / ${escapeHtml(result.model || "default")}</span>
        <span class="verba-compare-mini-status">${Math.max(0, Number(result.trace?.latencyMs || 0))} ms</span>
      </div>
      <p class="verba-soft-copy">${escapeHtml(trimPreview(result.output, 220))}</p>
      <div class="verba-chip-row">
        <span class="verba-chip verba-chip-muted">${escapeHtml(result.trace?.outputLanguage || getLanguageMeta(state.targetLanguage).label)}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(typeof result.trace?.usageEstimate?.estimatedCostUsd === "number" ? `$${result.trace.usageEstimate.estimatedCostUsd.toFixed(4)} est.` : "Cost n/a")}</span>
      </div>
    </article>
  `;
}

function renderRoutingNote() {
  const providerLabel =
    (state.comparisonResults.length ? state.comparisonMeta?.recommendedProvider : "") ||
    state.processed?.trace?.provider ||
    state.comparisonMeta?.recommendedProvider ||
    "auto route";
  const reason =
    (state.comparisonResults.length ? state.comparisonMeta?.reason : "") ||
    state.processed?.trace?.routingReason ||
    state.comparisonMeta?.reason ||
    getInferencePresetMeta().hint;

  return `
    <section class="verba-note-block verba-note-block-routing">
      <p class="verba-kicker">Routing</p>
      <p class="verba-soft-copy">${escapeHtml(reason)}</p>
      <div class="verba-chip-row">
        <span class="verba-chip verba-chip-muted">${escapeHtml(providerLabel)}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(getInferencePresetMeta().label)}</span>
        ${
          state.processed?.trace?.routeRiskLevel
            ? `<span class="verba-chip verba-chip-muted">${escapeHtml(state.processed.trace.routeRiskLevel.toUpperCase())} risk</span>`
            : ""
        }
      </div>
    </section>
  `;
}

function renderArtifactComparisonStrip() {
  return `
    <div class="verba-compare-strip verba-compare-strip-flow">
      ${renderArtifactMiniCard("Raw", state.session?.transcript || "", "truth", getFlaggedSegments().length ? `${getFlaggedSegments().length} flagged` : "No flags yet")}
      ${renderArtifactFlowArrow()}
      ${renderArtifactMiniCard("Reviewed", state.correctedText || state.session?.transcript || "", "review", state.correctedText?.trim() !== state.session?.transcript?.trim() ? "Edited" : "Unchanged")}
      ${renderArtifactFlowArrow()}
      ${renderArtifactMiniCard("Draft", state.processed?.output || "Run the output path you want from the action bar.", "transform", state.processed ? state.processed.headline || "Ready" : "Pending")}
    </div>
  `;
}

function renderArtifactMiniCard(label, text, icon, status) {
  return `
    <article class="verba-compare-mini">
      <div class="verba-compare-mini-head">
        <span class="verba-chip verba-chip-muted">${getVerbaIcon(icon)} ${escapeHtml(label)}</span>
        <span class="verba-compare-mini-status">${escapeHtml(status)}</span>
      </div>
      <p class="verba-soft-copy">${escapeHtml(trimPreview(text, 88))}</p>
    </article>
  `;
}

function renderArtifactFlowArrow() {
  return `
    <div class="verba-flow-arrow" aria-hidden="true">
      <span class="verba-flow-arrow-line"></span>
      <span class="verba-flow-arrow-icon">${getVerbaIcon("transform")}</span>
    </div>
  `;
}

function renderTrustMeter() {
  const trust = getTrustState();

  return `
    <article class="verba-card verba-trust-card verba-trust-card-${trust.level}">
      <div class="verba-trust-head">
        <strong>${escapeHtml(trust.label)}</strong>
        <span class="verba-step-badge">${escapeHtml(trust.providerLabel)}</span>
      </div>
      <div class="verba-trust-meter" aria-hidden="true">
        <span style="width:${trust.meterWidth}%"></span>
      </div>
      <p class="verba-soft-copy">${escapeHtml(trust.summary)}</p>
      <div class="verba-chip-row">
        <span class="verba-chip verba-chip-muted">${escapeHtml(trust.routeLabel)}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(trust.recommendationLabel)}</span>
        <span class="verba-chip verba-chip-muted">${escapeHtml(trust.flagLabel)}</span>
      </div>
      ${
        trust.reasons.length
          ? `<ul class="verba-mini-list">${trust.reasons.map((reason) => `<li>${escapeHtml(reason)}</li>`).join("")}</ul>`
          : ""
      }
    </article>
  `;
}

function getTrustState() {
  const flaggedCount = getFlaggedSegments().length;
  const selectedLanguage = getLanguageMeta(state.selectedLanguage);
  const supportLevel = state.session?.route?.supportLevel || selectedLanguage.supportLevel;
  const routeRisk = state.session?.route?.risk;
  const providerLabel = state.session?.route?.provider || "Route preview";
  const routeLabel = state.session?.languageDetected || selectedLanguage.label;
  const reasons = [];
  let riskScore = 0;

  if (routeRisk?.level === "high") {
    riskScore += 40;
  } else if (routeRisk?.level === "medium") {
    riskScore += 22;
  }

  if (routeRisk?.reasons?.length) {
    reasons.push(...routeRisk.reasons);
  }

  if (supportLevel === "beta") {
    riskScore += 28;
    reasons.push("Beta route. Keep manual review in the loop.");
  } else if (supportLevel === "mixed") {
    riskScore += 16;
    reasons.push("Auto-detect or mixed-language route. Review confidence before drafting.");
  }

  if (flaggedCount >= 2) {
    riskScore += 34;
    reasons.push(`${flaggedCount} spans are already marked for review.`);
  } else if (flaggedCount === 1) {
    riskScore += 18;
    reasons.push("One span is marked for review.");
  }

  if (state.session?.warnings?.length) {
    riskScore += 12;
    reasons.push(state.session.warnings[0]);
  }

  if (looksSuspiciousForLanguage(state.session?.transcript || state.correctedText || "", state.selectedLanguage)) {
    riskScore += 22;
    reasons.push("Transcript casing looks suspicious for the selected language.");
  }

  if (!state.session) {
    reasons.push("No transcript yet. This is a route preview, not a quality verdict.");
  }

  const uniqueReasons = [...new Set(reasons)];
  const recommendationLabel = getReviewRecommendationLabel();

  if (riskScore >= 46) {
    return {
      level: "high",
      label: "Review required",
      summary: "Do not trust the draft blindly. Inspect the transcript first and correct weak spans before reuse.",
      providerLabel,
      routeLabel,
      recommendationLabel,
      flagLabel: flaggedCount ? `${flaggedCount} flagged` : "0 flagged",
      meterWidth: 84,
      reasons: uniqueReasons
    };
  }

  if (riskScore >= 20) {
    return {
      level: "medium",
      label: "Review recommended",
      summary: "The route looks usable, but Verba is seeing enough uncertainty that a quick pass is worth it.",
      providerLabel,
      routeLabel,
      recommendationLabel,
      flagLabel: flaggedCount ? `${flaggedCount} flagged` : "0 flagged",
      meterWidth: 56,
      reasons: uniqueReasons
    };
  }

  return {
    level: "low",
    label: "Stable route",
    summary: "Nothing here looks obviously risky yet, but the source transcript still remains the reference layer.",
    providerLabel,
    routeLabel,
    recommendationLabel,
    flagLabel: flaggedCount ? `${flaggedCount} flagged` : "0 flagged",
    meterWidth: 24,
    reasons: uniqueReasons
  };
}

function looksSuspiciousForLanguage(text, selectedLanguage) {
  const language = getLanguageMeta(selectedLanguage);
  if (!text || !text.trim()) {
    return false;
  }

  if (language.id === "german") {
    return false;
  }

  const latinWords = text.match(/\b[\p{L}][\p{L}'-]*\b/gu) || [];
  if (latinWords.length < 3) {
    return false;
  }

  const titleCased = latinWords.filter((word, index) => {
    if (index === 0) {
      return false;
    }

    return /^[A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+(?:[-'][A-ZÀ-ÖØ-Þ][a-zà-öø-ÿ]+)?$/u.test(word);
  });

  if (titleCased.length >= 2) {
    return true;
  }

  const allCaps = latinWords.filter((word, index) => index > 0 && /^[A-ZÀ-ÖØ-Þ]{3,}$/u.test(word));
  return allCaps.length >= 1;
}

function renderLanguageOption(language) {
  return `<option value="${language.id}" ${state.selectedLanguage === language.id ? "selected" : ""}>${escapeHtml(language.label)}</option>`;
}

function getRegisterMeta(id = state.register) {
  return REGISTER_OPTIONS.find((option) => option.id === id) ?? REGISTER_OPTIONS[0];
}

function getToneMeta(id = state.tone) {
  return TONE_OPTIONS.find((option) => option.id === id) ?? TONE_OPTIONS[0];
}

function getInferencePresetMeta(id = state.inferencePreset) {
  return INFERENCE_PRESETS.find((option) => option.id === id) ?? INFERENCE_PRESETS[0];
}

function getTransformSourceLanguageLabel() {
  if (state.selectedLanguage !== "auto") {
    return getLanguageMeta(state.selectedLanguage).label;
  }

  const detected = normalizeText(state.session?.languageDetected);
  return detected || getLanguageMeta(state.selectedLanguage).label;
}

function renderCompactSupportChip(language) {
  return `
    <div class="verba-support-chip verba-support-chip-${language.supportLevel}">
      <strong>${escapeHtml(language.label)}</strong>
    </div>
  `;
}

function renderTranscriptSegments() {
  if (Array.isArray(state.session?.segments) && state.session.segments.length) {
    return state.session.segments
      .map(
        (segment) => `
          <button
            type="button"
            class="verba-inline-segment verba-inline-segment-${segment.level} ${state.focusedSegmentId === String(segment.id) ? "verba-inline-segment-focused" : ""}"
            data-segment-id="${segment.id}"
            title="${escapeAttribute(
            `${formatDuration(segment.start)}-${formatDuration(segment.end)} · ${segment.level}${segment.reasons?.length ? ` · ${segment.reasons.join(", ")}` : ""}`
          )}"
          >
            ${escapeHtml(segment.text)}
          </button>
        `
      )
      .join(" ");
  }

  return `<span class="verba-inline-segment verba-inline-segment-low">${escapeHtml(state.session?.transcript || "")}</span>`;
}

function bindEvents() {
  document.querySelector("#dismiss-banner")?.addEventListener("click", () => {
    state.error = "";
    state.notice = "";
    render();
  });

  document.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => {
      const stepId = button.dataset.step;
      if (stepId && isStepUnlocked(stepId)) {
        state.activeStep = stepId;
        render();
      }
    });
  });

  document.querySelector("#source-language")?.addEventListener("change", (event) => {
    const previousLanguage = state.selectedLanguage;
    const nextLanguage = event.currentTarget.value;
    state.selectedLanguage = nextLanguage;

    if (
      nextLanguage !== "auto" &&
      (!state.targetLanguageTouched || state.targetLanguage === "english" || state.targetLanguage === previousLanguage)
    ) {
      state.targetLanguage = nextLanguage;
    }

    render();
  });

  document.querySelector("#audio-file")?.addEventListener("change", (event) => {
    const [file] = event.currentTarget.files ?? [];
    if (!file) {
      return;
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      state.error = `File is too large. Keep uploads below ${Math.round(MAX_FILE_SIZE_BYTES / (1024 * 1024))} MB.`;
      render();
      return;
    }

    setAudioFile(file);
  });

  document.querySelector("#record-toggle")?.addEventListener("click", handleRecordToggle);
  document.querySelector("#load-sample-session")?.addEventListener("click", () => loadSampleSession("transform"));
  document.querySelector("#transcribe-button")?.addEventListener("click", handleTranscribe);
  document.querySelector("#process-button")?.addEventListener("click", handleProcess);
  document.querySelector("#step-next")?.addEventListener("click", handleNextStep);
  document.querySelector("#step-back")?.addEventListener("click", handlePreviousStep);
  document.querySelector("#save-correction")?.addEventListener("click", handleSaveCorrection);
  document.querySelector("#export-history")?.addEventListener("click", exportHistoryBundle);

  document.querySelector("#corrected-text")?.addEventListener("input", (event) => {
    state.correctedText = event.currentTarget.value;
    state.processed = null;
    state.comparisonResults = [];
    state.comparisonMeta = null;
  });

  document.querySelector("#correction-note")?.addEventListener("input", (event) => {
    state.correctionNote = event.currentTarget.value;
  });

  document.querySelector("#target-language")?.addEventListener("change", (event) => {
    state.targetLanguage = event.currentTarget.value;
    state.targetLanguageTouched = true;
    state.processed = null;
    state.comparisonResults = [];
    render();
  });

  document.querySelector("#text-provider")?.addEventListener("change", (event) => {
    state.textProvider = event.currentTarget.value;
    state.processed = null;
    state.comparisonResults = [];
    render();
  });

  document.querySelector("#model-override")?.addEventListener("input", (event) => {
    state.modelOverride = event.currentTarget.value;
    state.processed = null;
    state.comparisonResults = [];
  });

  document.querySelectorAll("[data-register]").forEach((button) => {
    button.addEventListener("click", () => {
      state.register = button.dataset.register;
      state.processed = null;
      state.comparisonResults = [];
      state.comparisonMeta = null;
      render();
    });
  });

  document.querySelectorAll("[data-tone]").forEach((button) => {
    button.addEventListener("click", () => {
      state.tone = button.dataset.tone;
      state.processed = null;
      state.comparisonResults = [];
      state.comparisonMeta = null;
      render();
    });
  });

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      state.inferencePreset = button.dataset.preset;
      state.processed = null;
      state.comparisonResults = [];
      state.comparisonMeta = null;
      render();
    });
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.processMode = button.dataset.mode;
      state.processed = null;
      state.comparisonResults = [];
      state.comparisonMeta = null;
      render();
    });
  });

  document.querySelectorAll("[data-score-field]").forEach((select) => {
    select.addEventListener("change", () => {
      state.evalScores[select.dataset.scoreField] = select.value;
    });
  });

  document.querySelectorAll("[data-error-tag]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleErrorTag(button.dataset.errorTag);
      render();
    });
  });

  document.querySelectorAll("[data-segment-id]").forEach((button) => {
    button.addEventListener("click", () => {
      focusSegment(button.dataset.segmentId);
    });
  });

  document.querySelectorAll("[data-segment-review-id]").forEach((card) => {
    const handleSegmentFocus = () => focusSegment(card.dataset.segmentReviewId);
    card.addEventListener("click", handleSegmentFocus);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleSegmentFocus();
      }
    });
  });

  document.querySelectorAll("[data-export-format]").forEach((button) => {
    button.addEventListener("click", () => exportSession(button.dataset.exportFormat));
  });

  document.querySelector("#toggle-reviewer-mode")?.addEventListener("click", () => {
    state.reviewerMode = !state.reviewerMode;
    render();
  });

  document.querySelector("#compare-drafts")?.addEventListener("click", handleCompareDrafts);
}

async function handleRecordToggle() {
  state.error = "";
  state.notice = "";

  if (state.recording && state.mediaRecorder) {
    state.mediaRecorder.stop();
    return;
  }

  if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
    state.error = "This browser cannot record audio. Use file upload instead.";
    render();
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mimeType = getSupportedMimeType();
    const recorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

    state.mediaStream = stream;
    state.mediaRecorder = recorder;
    state.recordingChunks = [];
    state.recording = true;
    state.notice = "Recording from microphone. Stop when you are ready to review the clip.";
    render();

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) {
        state.recordingChunks.push(event.data);
      }
    });

    recorder.addEventListener("stop", () => {
      const type = recorder.mimeType || "audio/webm";
      const extension = type.includes("mp4") ? "m4a" : "webm";
      const blob = new Blob(state.recordingChunks, { type });
      const file = new File([blob], `verba-${new Date().toISOString().replace(/[:.]/g, "-")}.${extension}`, {
        type
      });

      state.recording = false;
      state.mediaRecorder = null;
      state.recordingChunks = [];
      state.notice = "Recording captured. Review it and create the raw transcript when ready.";
      state.mediaStream?.getTracks().forEach((track) => track.stop());
      state.mediaStream = null;
      setAudioFile(file);
    });

    recorder.start();
  } catch (error) {
    state.recording = false;
    state.error = error instanceof Error ? error.message : "Microphone access failed.";
    render();
  }
}

async function handleTranscribe() {
  if (!state.audioFile || state.transcribing) {
    return;
  }

  const language = getLanguageMeta(state.selectedLanguage);
  const formData = new FormData();
  formData.set("file", state.audioFile, state.audioFile.name);
  formData.set("selectedLanguage", language.id);
  formData.set("apiLanguage", language.apiLanguage);
  formData.set("supportLevel", language.supportLevel);

  state.transcribing = true;
  state.error = "";
  state.notice = "";
  render();

  try {
    const response = await fetch("/api/transcribe", {
      method: "POST",
      body: formData
    });

    const payload = await readApiResponse(response, "transcription");

    state.session = payload;
    state.correctedText = payload.transcript;
    state.correctionNote = "";
    state.processed = null;
    state.comparisonResults = [];
    state.comparisonMeta = null;
    state.evalScores = createEmptyEvalScores();
    state.selectedErrorTags = [];
    state.focusedSegmentId = pickInitialFocusedSegmentId(payload.segments);
    state.sampleLoaded = false;
    if (!state.targetLanguageTouched && language.id !== "auto") {
      state.targetLanguage = language.id;
    }
    state.activeStep = "inspect";
    state.notice = "Source transcript ready. Review it, then move on to drafting.";
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Transcription failed.";
  } finally {
    state.transcribing = false;
    render();
  }
}

async function handleProcess() {
  if (!state.session || state.processing) {
    return;
  }

  if (shouldRequireManualReview()) {
    state.activeStep = "inspect";
    state.error = "This route still needs review. Check the flagged spans or make a manual correction before you generate a draft.";
    render();
    return;
  }

  state.processing = true;
  state.error = "";
  state.notice = "";
  render();

  try {
    const response = await fetch("/api/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mode: state.processMode,
        preset: state.inferencePreset,
        rawTranscript: state.session.transcript,
        correctedTranscript: state.correctedText,
        sourceLanguage: getTransformSourceLanguageLabel(),
        targetLanguage: getLanguageMeta(state.targetLanguage).label,
        register: getRegisterMeta(state.register).label,
        tone: getToneMeta(state.tone).label,
        provider: state.textProvider === "default" ? "" : state.textProvider,
        model: state.modelOverride.trim(),
        flaggedSegments: getFlaggedSegments().slice(0, 8).map((segment) => ({
          text: segment.text,
          level: segment.level,
          reasons: segment.reasons
        }))
      })
    });

    const payload = await readApiResponse(response, "processing");

    state.processed = payload;
    state.comparisonMeta = null;
    void pushEvalRun(payload);
    state.notice = "Processed output ready. Compare the layers, then export when you are happy with the draft.";
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Processing failed.";
  } finally {
    state.processing = false;
    render();
  }
}

async function handleCompareDrafts() {
  if (!state.session || state.processing) {
    return;
  }

  state.processing = true;
  state.error = "";
  state.notice = "";
  render();

  try {
    const response = await fetch("/api/compare", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mode: state.processMode,
        preset: state.inferencePreset,
        rawTranscript: state.session.transcript,
        correctedTranscript: state.correctedText,
        sourceLanguage: getTransformSourceLanguageLabel(),
        targetLanguage: getLanguageMeta(state.targetLanguage).label,
        register: getRegisterMeta(state.register).label,
        tone: getToneMeta(state.tone).label,
        flaggedSegments: getFlaggedSegments().slice(0, 8).map((segment) => ({
          text: segment.text,
          level: segment.level,
          reasons: segment.reasons
        }))
      })
    });

    const payload = await readApiResponse(response, "comparison");
    state.comparisonResults = Array.isArray(payload.results) ? payload.results : [];
    state.comparisonMeta = payload.meta || null;
    state.reviewerMode = true;
    state.notice = "Comparison run ready. Review the outputs side by side, then save the one you trust.";
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Comparison failed.";
  } finally {
    state.processing = false;
    render();
  }
}

async function handleSaveCorrection() {
  if (!state.session) {
    return;
  }

  const originalText = state.session.transcript.trim();
  const correctedText = state.correctedText.trim();

  if (!correctedText) {
    state.error = "Add a reviewed transcript before saving a correction.";
    render();
    return;
  }

  const entry = {
    id: createId(),
    savedAt: new Date().toISOString(),
    sessionId: state.session.sessionId,
    languageLabel: getLanguageMeta(state.selectedLanguage).label,
    sourceLanguage: getTransformSourceLanguageLabel(),
    outputLanguage: getLanguageMeta(state.targetLanguage).label,
    audioName: state.session.sourceFile?.name ?? state.audioFile?.name ?? "audio clip",
    originalText,
    correctedText,
    processedOutput: state.processed?.output || "",
    note: state.correctionNote.trim(),
    deltaChars: correctedText.length - originalText.length,
    flaggedSegments: getFlaggedSegments().length,
    transcriptionModel: state.session.route?.model ?? "unknown",
    provider: state.processed?.model?.provider ?? getTextProviderMeta().label,
    model: state.processed?.model?.model || state.modelOverride.trim() || "default",
    inferencePreset: state.inferencePreset,
    promptVersion: state.processed?.trace?.promptVersion ?? "",
    latencyMs: state.processed?.trace?.latencyMs ?? null,
    ratings: normalizeEvalScores(state.evalScores),
    errorTags: [...state.selectedErrorTags]
  };

  state.history = [entry, ...state.history].slice(0, 50);
  saveHistory(state.history);
  const persisted = await persistEvalRecords({ entries: [entry] });
  state.notice = persisted
    ? "Eval entry saved to the shared Verba store."
    : "Eval entry saved locally. The shared store is unavailable right now.";
  render();
}

function handleNextStep() {
  const nextStep = getAdjacentStep(1);
  if (nextStep && canMoveToNextStep()) {
    state.activeStep = nextStep.id;
    render();
  }
}

function handlePreviousStep() {
  const previousStep = getAdjacentStep(-1);
  if (previousStep) {
    state.activeStep = previousStep.id;
    render();
  }
}

function exportSession(format) {
  if (!state.session) {
    return;
  }

  const baseName = slugify(state.session.sourceFile?.name || `verba-${state.session.sessionId}`);
  const exportPayload = {
    session: state.session,
    processed: state.processed,
    correctedTranscript: state.correctedText.trim() || null
  };

  if (format === "json") {
    downloadBlob(`${baseName}.json`, JSON.stringify(exportPayload, null, 2), "application/json");
    return;
  }

  if (format === "md") {
    const markdown = [
      `# Verba Session`,
      ``,
      `- Source file: ${state.session.sourceFile?.name ?? "unknown"}`,
      `- Selected language: ${getLanguageMeta(state.selectedLanguage).label}`,
      `- Detected language: ${state.session.languageDetected}`,
      `- Model: ${state.session.route?.model ?? "unknown"}`,
      `- Draft provider: ${state.processed?.model?.provider ?? "unknown"}`,
      `- Draft model: ${state.processed?.model?.model ?? "unknown"}`,
      `- Prompt version: ${state.processed?.trace?.promptVersion ?? "unknown"}`,
      ``,
      `## Raw transcript`,
      ``,
      state.session.transcript,
      ``,
      `## Reviewed transcript`,
      ``,
      state.correctedText.trim() || "_No manual corrections added._",
      ``,
      `## Processed output`,
      ``,
      state.processed?.output || "_No processed output yet._",
      ``
    ].join("\n");

    downloadBlob(`${baseName}.md`, markdown, "text/markdown");
    return;
  }

  const text = state.processed?.output || state.correctedText.trim() || state.session.transcript;
  downloadBlob(`${baseName}.txt`, text, "text/plain");
}

function exportHistoryBundle() {
  downloadBlob(
    "verba-eval-bundle.json",
    JSON.stringify(
      {
        meta: {
          evalStoreBacking: state.evalStoreBacking
        },
        savedEntries: state.history,
        runLog: state.evalRuns
      },
      null,
      2
    ),
    "application/json"
  );
}

async function hydrateEvalStore() {
  try {
    const response = await fetch("/api/evals?entryLimit=50&runLimit=120", {
      headers: {
        Accept: "application/json"
      }
    });
    const payload = await readApiResponse(response, "eval store");
    const remoteEntries = Array.isArray(payload.entries) ? payload.entries : [];
    const remoteRuns = Array.isArray(payload.runs) ? payload.runs : [];
    const mergedEntries = mergeRecords(remoteEntries, state.history).slice(0, 50);
    const mergedRuns = mergeRecords(remoteRuns, state.evalRuns).slice(0, 120);

    state.history = mergedEntries;
    state.evalRuns = mergedRuns;
    state.evalStoreBacking = payload.meta?.backing || "local";
    state.evalStoreHydrated = true;
    saveHistory(state.history);
    saveEvalRuns(state.evalRuns);
    render();

    const missingEntries = findMissingRecords(state.history, remoteEntries);
    const missingRuns = findMissingRecords(state.evalRuns, remoteRuns);

    if (missingEntries.length || missingRuns.length) {
      await persistEvalRecords({ entries: missingEntries, runs: missingRuns }, { quiet: true });
    }
  } catch {
    state.evalStoreBacking = "local";
    state.evalStoreHydrated = true;
    render();
  }
}

async function persistEvalRecords(payload, { quiet = false } = {}) {
  try {
    const response = await fetch("/api/evals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await readApiResponse(response, "eval store write");
    const backing = result?.meta?.backing;

    if (backing) {
      state.evalStoreBacking = backing;
      state.evalStoreHydrated = true;
    }

    return backing === "d1";
  } catch (error) {
    state.evalStoreBacking = "local";
    if (!quiet) {
      state.error = error instanceof Error ? error.message : "Failed to write to the shared eval store.";
      render();
    }

    return false;
  }
}

function setAudioFile(file) {
  if (state.audioUrl) {
    URL.revokeObjectURL(state.audioUrl);
  }

  state.audioFile = file;
  state.audioUrl = URL.createObjectURL(file);
  state.session = null;
  state.processed = null;
  state.comparisonResults = [];
  state.comparisonMeta = null;
  state.correctedText = "";
  state.correctionNote = "";
  state.evalScores = createEmptyEvalScores();
  state.selectedErrorTags = [];
  state.focusedSegmentId = null;
  state.sampleLoaded = false;
  state.error = "";
  state.activeStep = "capture";
  render();
}

function loadHistory() {
  try {
    const current = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (current) {
      return JSON.parse(current);
    }

    const legacy = localStorage.getItem(LEGACY_HISTORY_STORAGE_KEY);
    return legacy ? JSON.parse(legacy) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

function loadEvalRuns() {
  try {
    const current = localStorage.getItem(EVAL_RUN_STORAGE_KEY);
    return current ? JSON.parse(current) : [];
  } catch {
    return [];
  }
}

function saveEvalRuns(runs) {
  localStorage.setItem(EVAL_RUN_STORAGE_KEY, JSON.stringify(runs));
}

function mergeRecords(primary, secondary) {
  const merged = new Map();

  [...primary, ...secondary].forEach((record) => {
    if (!record?.id) {
      return;
    }

    if (!merged.has(record.id)) {
      merged.set(record.id, record);
    }
  });

  return [...merged.values()].sort((left, right) => String(right.savedAt || "").localeCompare(String(left.savedAt || "")));
}

function findMissingRecords(allRecords, remoteRecords) {
  const remoteIds = new Set(remoteRecords.map((record) => record?.id).filter(Boolean));
  return allRecords.filter((record) => record?.id && !remoteIds.has(record.id));
}

function maybeLoadSampleFromUrl() {
  try {
    const url = new URL(window.location.href);
    if (url.searchParams.get(SAMPLE_QUERY_PARAM) !== "1") {
      return;
    }

    loadSampleSession("transform");
    url.searchParams.delete(SAMPLE_QUERY_PARAM);
    window.history.replaceState({}, "", url.pathname + (url.search ? url.search : "") + url.hash);
  } catch {}
}

function loadSampleSession(activeStep = "transform") {
  state.selectedLanguage = "auto";
  state.targetLanguage = "english";
  state.targetLanguageTouched = true;
  state.audioFile = null;
  state.audioUrl = "";
  state.session = cloneJson(SAMPLE_SESSION);
  state.correctedText = SAMPLE_SCENARIO.reviewedTranscript;
  state.processed = cloneJson(SAMPLE_PROCESSED);
  state.comparisonResults = [];
  state.comparisonMeta = null;
  state.correctionNote = "Sample session loaded for walkthrough.";
  state.evalScores = createEmptyEvalScores();
  state.selectedErrorTags = [];
  state.focusedSegmentId = pickInitialFocusedSegmentId(state.session.segments);
  state.sampleLoaded = true;
  state.error = "";
  state.notice = "Sample session loaded. Use it to inspect the trust layer or jump straight into drafting.";
  state.activeStep = activeStep;
  render();
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function createEmptyEvalScores() {
  return SCORE_FIELDS.reduce((scores, field) => {
    scores[field.id] = "";
    return scores;
  }, {});
}

function normalizeEvalScores(scores) {
  return Object.fromEntries(
    Object.entries(scores)
      .filter(([, value]) => value !== "")
      .map(([key, value]) => [key, Number(value)])
  );
}

function toggleErrorTag(tag) {
  if (!tag) {
    return;
  }

  if (state.selectedErrorTags.includes(tag)) {
    state.selectedErrorTags = state.selectedErrorTags.filter((item) => item !== tag);
    return;
  }

  state.selectedErrorTags = [...state.selectedErrorTags, tag];
}

async function pushEvalRun(payload) {
  if (!payload?.trace) {
    return;
  }

  const entry = {
    id: createId(),
    savedAt: new Date().toISOString(),
    sessionId: state.session?.sessionId || "",
    audioName: state.session?.sourceFile?.name || state.audioFile?.name || "audio clip",
    sourceLanguage: getTransformSourceLanguageLabel(),
    outputLanguage: getLanguageMeta(state.targetLanguage).label,
    mode: state.processMode,
    preset: state.inferencePreset,
    provider: payload.model?.provider || payload.trace.provider || getTextProviderMeta().id,
    model: payload.model?.model || payload.trace.model || state.modelOverride.trim() || "",
    promptVersion: payload.trace.promptVersion || "",
    latencyMs: payload.trace.latencyMs || null,
    usageEstimate: payload.trace.usageEstimate || null,
    register: getRegisterMeta(state.register).label,
    tone: getToneMeta(state.tone).label,
    transcript: state.session?.transcript || "",
    correctedTranscript: state.correctedText,
    output: payload.output || ""
  };

  state.evalRuns = [entry, ...state.evalRuns].slice(0, 120);
  saveEvalRuns(state.evalRuns);
  await persistEvalRecords({ runs: [entry] }, { quiet: true });
}

function getTextProviderMeta(id = state.textProvider) {
  return TEXT_PROVIDER_OPTIONS.find((option) => option.id === id) ?? TEXT_PROVIDER_OPTIONS[0];
}

function getFocusedSegment() {
  if (!state.session?.segments?.length) {
    return null;
  }

  return (
    state.session.segments.find((segment) => String(segment.id) === String(state.focusedSegmentId)) ||
    state.session.segments.find((segment) => segment.level !== "low") ||
    state.session.segments[0]
  );
}

function pickInitialFocusedSegmentId(segments = []) {
  const firstFlagged = segments.find((segment) => segment.level !== "low");
  return firstFlagged ? String(firstFlagged.id) : segments[0] ? String(segments[0].id) : null;
}

function focusSegment(segmentId) {
  if (!segmentId) {
    return;
  }

  state.focusedSegmentId = String(segmentId);
  const segment = getFocusedSegment();
  const seekTime = segment ? Number(segment.start || 0) : null;
  render();

  if (Number.isFinite(seekTime)) {
    window.requestAnimationFrame(() => {
      seekAudioPreview(seekTime);
    });
  }
}

function seekAudioPreview(seconds) {
  const audio = document.querySelector(".verba-audio-strip audio");

  if (!audio || !Number.isFinite(seconds)) {
    return;
  }

  try {
    audio.currentTime = Math.max(0, Number(seconds) - 0.15);
    audio.focus({ preventScroll: true });
  } catch {}
}

function getLanguageMeta(id) {
  return LANGUAGE_OPTIONS.find((language) => language.id === id) ?? LANGUAGE_OPTIONS[0];
}

function getCurrentMode() {
  return PROCESS_MODES.find((mode) => mode.id === state.processMode) ?? PROCESS_MODES[0];
}

function getFlaggedSegments() {
  return (state.session?.segments ?? []).filter((segment) => segment.level !== "low");
}

function getReviewRecommendationLabel() {
  const flaggedCount = getFlaggedSegments().length;
  const transcript = state.session?.transcript || state.correctedText || "";

  let rawRecommendation =
    state.session?.summary?.reviewRecommendation ||
    state.session?.route?.risk?.recommendation ||
    (flaggedCount ? "review recommended" : "stable route");

  if (flaggedCount && looksSuspiciousForLanguage(transcript, state.selectedLanguage)) {
    rawRecommendation = "review required";
  }

  if (flaggedCount >= 2) {
    rawRecommendation = "review required";
  }

  return rawRecommendation
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function shouldRequireManualReview() {
  if (!state.session || state.sampleLoaded) {
    return false;
  }

  const recommendation = getReviewRecommendationLabel().toLowerCase();
  const reviewedText = canonicalizeText(state.correctedText);
  const rawText = canonicalizeText(state.session.transcript);

  return recommendation === "review required" && reviewedText === rawText;
}

function countReliableLanguages() {
  return LANGUAGE_OPTIONS.filter((language) => language.supportLevel === "reliable").length;
}

function describeEvalStoreLocation() {
  if (state.evalStoreBacking === "d1") {
    return "to the shared D1 store";
  }

  if (!state.evalStoreHydrated) {
    return "while the shared store is loading";
  }

  return "locally in this browser";
}

function getEvalStoreStatusLabel() {
  if (state.evalStoreBacking === "d1") {
    return "Shared D1 eval store connected";
  }

  if (!state.evalStoreHydrated) {
    return "Checking for shared eval store";
  }

  return "Shared store unavailable, keeping local fallback";
}

function renderDraftGuard() {
  if (!shouldRequireManualReview()) {
    return "";
  }

  return `
    <section class="verba-note-block verba-note-block-warning verba-draft-guard">
      <p class="verba-kicker">Review before drafting</p>
      <p class="verba-soft-copy">This route is still marked high-risk. Fix the flagged spans or make a manual correction first, then return to draft generation.</p>
    </section>
  `;
}

function getStepStatus(stepId) {
  if (state.activeStep === stepId) {
    return "current";
  }

  const activeIndex = WORKSPACE_STEPS.findIndex((step) => step.id === state.activeStep);
  const targetIndex = WORKSPACE_STEPS.findIndex((step) => step.id === stepId);

  if (targetIndex < activeIndex && isStepUnlocked(stepId)) {
    return "complete";
  }

  return "upcoming";
}

function isStepUnlocked(stepId) {
  if (stepId === "capture") {
    return true;
  }

  if (stepId === "inspect") {
    return Boolean(state.session);
  }

  if (stepId === "transform") {
    return Boolean(state.session);
  }

  if (stepId === "export") {
    return Boolean(state.session);
  }

  return false;
}

function canMoveToNextStep() {
  if (state.activeStep === "capture") {
    return Boolean(state.session);
  }

  if (state.activeStep === "inspect") {
    return Boolean(state.session && state.correctedText.trim());
  }

  if (state.activeStep === "transform") {
    return Boolean(state.processed);
  }

  return false;
}

function getAdjacentStep(direction) {
  const currentIndex = WORKSPACE_STEPS.findIndex((step) => step.id === state.activeStep);
  const target = WORKSPACE_STEPS[currentIndex + direction];
  return target || null;
}

function generateAudioBars(file) {
  const seed = `${file.name}:${file.size}`;
  const bars = [];
  let accumulator = 0;

  for (let index = 0; index < seed.length; index += 1) {
    accumulator = (accumulator + seed.charCodeAt(index) * (index + 3)) % 997;
  }

  for (let index = 0; index < 24; index += 1) {
    accumulator = (accumulator * 73 + 31) % 997;
    bars.push(22 + (accumulator % 62));
  }

  return bars;
}

function formatDuration(seconds = 0) {
  const totalSeconds = Math.max(0, Math.round(Number(seconds) || 0));
  const minutes = Math.floor(totalSeconds / 60);
  const remainder = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${remainder}`;
}

function formatTimestamp(value) {
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatBytes(bytes = 0) {
  if (bytes < 1024 * 1024) {
    return `${Math.round(bytes / 1024)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function createId() {
  return crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function getSupportedMimeType() {
  if (typeof MediaRecorder === "undefined" || typeof MediaRecorder.isTypeSupported !== "function") {
    return "";
  }

  return (
    ["audio/webm;codecs=opus", "audio/mp4", "audio/webm"].find((candidate) =>
      MediaRecorder.isTypeSupported(candidate)
    ) || ""
  );
}

async function readApiResponse(response, operation) {
  const contentType = response.headers.get("content-type") || "";
  const responseText = await response.text();
  let payload = null;

  if (responseText) {
    try {
      payload = JSON.parse(responseText);
    } catch {
      payload = null;
    }
  }

  if (response.ok && payload) {
    return payload;
  }

  const routeMissing =
    response.status === 404 ||
    response.status === 405 ||
    (!contentType.includes("application/json") && responseText.includes("<!doctype html"));

  if (routeMissing) {
    throw new Error(
      `The ${operation} API route is not available in this preview. Run "npm run preview:pages" for the full app, not plain "npm run preview".`
    );
  }

  if (!response.ok) {
    const serverMessage =
      payload?.error ||
      payload?.details ||
      responseText.trim() ||
      `The ${operation} request failed.`;

    throw new Error(serverMessage);
  }

  throw new Error(
    `The ${operation} route returned an empty response. If you are running locally, use "npm run preview:pages" so the API functions are served too.`
  );
}

function trimPreview(text = "", limit = 120) {
  const value = String(text || "").trim().replace(/\s+/g, " ");
  if (value.length <= limit) {
    return value;
  }

  return `${value.slice(0, limit).trimEnd()}...`;
}

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "verba";
}

function downloadBlob(fileName, content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function escapeAttribute(value = "") {
  return escapeHtml(value).replaceAll("`", "&#96;");
}

function escapeForTextarea(value = "") {
  return escapeHtml(value);
}

function nl2br(value = "") {
  return escapeHtml(value).replace(/\n/g, "<br />");
}

function normalizeText(value = "") {
  return String(value || "").trim();
}

function canonicalizeText(value = "") {
  return normalizeText(value).replace(/\s+/g, " ");
}
