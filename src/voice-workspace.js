import "./voice-workspace.css";

const LANGUAGE_OPTIONS = [
  { id: "auto", label: "Auto-detect", apiLanguage: "", supportLevel: "mixed", note: "Useful for messy clips, but inspect code-switched spans." },
  { id: "english", label: "English", apiLanguage: "en", supportLevel: "reliable", note: "Reliable v1 language." },
  { id: "mandarin", label: "Mandarin", apiLanguage: "zh", supportLevel: "reliable", note: "Reliable v1 language." },
  { id: "spanish", label: "Spanish", apiLanguage: "es", supportLevel: "reliable", note: "Reliable v1 language." },
  { id: "german", label: "German", apiLanguage: "de", supportLevel: "reliable", note: "Reliable v1 language." },
  { id: "french", label: "French", apiLanguage: "fr", supportLevel: "reliable", note: "Reliable v1 language." },
  { id: "portuguese", label: "Portuguese", apiLanguage: "pt", supportLevel: "reliable", note: "Reliable v1 language." },
  { id: "cantonese", label: "Cantonese", apiLanguage: "", supportLevel: "beta", note: "Beta routing. Use auto-detect and manually inspect flagged spans." },
  { id: "hokkien", label: "Taiwanese / Hokkien", apiLanguage: "", supportLevel: "experimental", note: "Experimental only. Do not trust without manual review." }
];

const PROCESS_MODES = [
  {
    id: "clean",
    label: "Optimize grammar",
    title: "Clean draft",
    description: "Preserve meaning, improve clarity, and keep uncertainty explicit."
  },
  {
    id: "translate",
    label: "Translate",
    title: "Cross-language draft",
    description: "Translate into the target language without hiding uncertain spans."
  },
  {
    id: "prompt",
    label: "Generate prompt",
    title: "Prompt-ready",
    description: "Turn the spoken intent into a strong prompt for another model or agent."
  }
];

const REGISTER_OPTIONS = [
  "Business Professional",
  "Government Formal",
  "Public Speaking",
  "Legal",
  "Family Casual",
  "Friendship Informal",
  "Family Intimate",
  "Romantic",
  "Other"
];

const TONE_OPTIONS = ["Composed", "Joyful", "Austere", "Passionate", "Sympathetic"];

const HISTORY_STORAGE_KEY = "voice-workspace-corrections-v1";
const MAX_FILE_SIZE_BYTES = 24 * 1024 * 1024;

const root = document.querySelector("#app");

const state = {
  selectedLanguage: "auto",
  processMode: "clean",
  targetLanguage: "english",
  register: "Business Professional",
  tone: "Composed",
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
  history: loadHistory(),
  error: "",
  notice: ""
};

render();

function render() {
  const selectedLanguage = getLanguageMeta(state.selectedLanguage);
  const currentMode = PROCESS_MODES.find((mode) => mode.id === state.processMode) ?? PROCESS_MODES[0];
  const historyPreview = state.history.slice(0, 5);
  const flaggedSegments = state.session?.segments?.filter((segment) => segment.level !== "low") ?? [];
  const reliableCount = LANGUAGE_OPTIONS.filter((language) => language.supportLevel === "reliable").length;

  root.innerHTML = `
    <div class="voice-page-shell">
      <div class="voice-page-glow voice-page-glow-left"></div>
      <div class="voice-page-glow voice-page-glow-right"></div>

      <header class="voice-header">
        <div class="voice-header-inner">
          <a class="voice-back-link" href="/">
            <span class="voice-back-mark">JH</span>
            <span>Back to portfolio</span>
          </a>
          <div class="voice-header-copy">
            <p class="voice-kicker">Labs / Voice workspace</p>
            <h1>Premium multilingual speech-to-draft.</h1>
            <p class="voice-hero-copy">
              Preserve the raw transcript, surface uncertainty, then choose a deliberate rewrite, translation, or prompt-generation path.
            </p>
          </div>
          <div class="voice-header-card">
            <p class="voice-card-label">Safe claims in this build</p>
            <div class="voice-stat-grid">
              <article class="voice-stat">
                <strong>${reliableCount}</strong>
                <span>reliable languages</span>
              </article>
              <article class="voice-stat">
                <strong>1</strong>
                <span>raw truth layer</span>
              </article>
              <article class="voice-stat">
                <strong>${state.history.length}</strong>
                <span>local corrections</span>
              </article>
            </div>
            <p class="voice-card-note">
              Cantonese is beta. Hokkien is experimental. This UI is intentionally honest about that.
            </p>
          </div>
        </div>
      </header>

      <main class="voice-main">
        <section class="voice-intro-band">
          <article class="voice-band-panel">
            <p class="voice-kicker">What this lab does well</p>
            <div class="voice-badge-row">
              <span class="voice-badge">Raw transcript preserved</span>
              <span class="voice-badge">Segment-level uncertainty</span>
              <span class="voice-badge">Rewrite / translate / prompt</span>
              <span class="voice-badge">Correction logging</span>
            </div>
            <p class="voice-band-copy">
              This first implementation is upload-first and non-live by design. It prioritizes trust, reviewability, and portfolio-grade UX over streaming theatrics.
            </p>
          </article>
          <article class="voice-band-panel voice-band-panel-support">
            <p class="voice-kicker">Language support matrix</p>
            <div class="voice-support-grid">
              ${LANGUAGE_OPTIONS.filter((language) => language.id !== "auto")
                .map(
                  (language) => `
                    <div class="support-chip support-chip-${language.supportLevel}">
                      <strong>${escapeHtml(language.label)}</strong>
                      <span>${escapeHtml(language.supportLevel)}</span>
                    </div>
                  `
                )
                .join("")}
            </div>
            <p class="voice-band-note">Selected input: <strong>${escapeHtml(selectedLanguage.label)}</strong> · ${escapeHtml(selectedLanguage.note)}</p>
          </article>
        </section>

        ${renderBanner()}

        <div class="voice-workspace-grid">
          <section class="voice-panel voice-panel-controls">
            <div class="voice-panel-head">
              <div>
                <p class="voice-kicker">1. Capture</p>
                <h2>Audio intake</h2>
              </div>
              <span class="voice-panel-tag">Upload-first</span>
            </div>

            <div class="voice-control-group">
              <label class="voice-field">
                <span>Source language</span>
                <select id="source-language">
                  ${LANGUAGE_OPTIONS.map(renderLanguageOption).join("")}
                </select>
              </label>

              <div class="voice-capture-grid">
                <label class="voice-upload">
                  <input id="audio-file" type="file" accept="audio/*,video/*" />
                  <span class="voice-upload-eyebrow">Upload audio</span>
                  <strong>${state.audioFile ? escapeHtml(state.audioFile.name) : "Select audio or video"}</strong>
                  <span>${state.audioFile ? `${formatBytes(state.audioFile.size)} · ${escapeHtml(state.audioFile.type || "audio blob")}` : "25 MB max. MP3, WAV, M4A, WebM, MP4."}</span>
                </label>

                <button class="voice-record-button ${state.recording ? "voice-recording" : ""}" id="record-toggle" type="button">
                  <span class="voice-record-indicator"></span>
                  <span>${state.recording ? "Stop recording" : "Record from mic"}</span>
                </button>
              </div>

              <div class="voice-support-note">
                <strong>Routing note</strong>
                <p>${escapeHtml(selectedLanguage.note)}</p>
              </div>

              ${renderAudioPreview()}

              <button class="voice-primary-button" id="transcribe-button" type="button" ${state.audioFile ? "" : "disabled"}>
                ${state.transcribing ? "Transcribing..." : "Transcribe audio"}
              </button>

              <p class="voice-helper-text">
                The raw transcript is stored separately from anything rewritten later. Large files above ${Math.round(
                  MAX_FILE_SIZE_BYTES / (1024 * 1024)
                )} MB are blocked in this build.
              </p>
            </div>

            <div class="voice-metrics-grid">
              ${renderMetricCard("Language route", selectedLanguage.supportLevel, selectedLanguage.label)}
              ${renderMetricCard(
                "Detected output",
                state.session?.languageDetected ?? "pending",
                state.session?.route?.model ?? "no transcript yet"
              )}
              ${renderMetricCard(
                "Flagged spans",
                String(flaggedSegments.length),
                state.session ? `${state.session.summary.segmentCount} total segments` : "transcribe to inspect"
              )}
            </div>
          </section>

          <section class="voice-panel voice-panel-raw">
            <div class="voice-panel-head">
              <div>
                <p class="voice-kicker">2. Inspect</p>
                <h2>Raw transcript</h2>
              </div>
              <span class="voice-panel-tag">Truth layer</span>
            </div>

            ${
              state.session
                ? `
                  <label class="voice-field">
                    <span>Raw transcript</span>
                    <textarea class="voice-textarea voice-textarea-raw" readonly>${escapeForTextarea(state.session.transcript)}</textarea>
                  </label>

                  <div class="voice-segment-stack">
                    ${state.session.segments.map(renderSegmentCard).join("")}
                  </div>

                  <label class="voice-field">
                    <span>Corrected transcript</span>
                    <textarea id="corrected-text" class="voice-textarea" placeholder="Edit the transcript here when you want to log a correction.">${escapeForTextarea(
                      state.correctedText
                    )}</textarea>
                  </label>

                  <label class="voice-field">
                    <span>Correction note</span>
                    <input id="correction-note" class="voice-input" type="text" value="${escapeAttribute(
                      state.correctionNote
                    )}" placeholder="Optional note about why the correction was needed." />
                  </label>

                  <div class="voice-inline-actions">
                    <button class="voice-secondary-button" id="save-correction" type="button">Save correction</button>
                    <span class="voice-helper-text">Corrections are stored locally in this build so you can export an eval bundle later.</span>
                  </div>
                `
                : `
                  <div class="voice-empty-state">
                    <h3>No transcript yet</h3>
                    <p>Upload or record audio, then transcribe it. The segment list will show uncertainty hotspots here.</p>
                  </div>
                `
            }
          </section>

          <section class="voice-panel voice-panel-output">
            <div class="voice-panel-head">
              <div>
                <p class="voice-kicker">3. Transform</p>
                <h2>${escapeHtml(currentMode.title)}</h2>
              </div>
              <span class="voice-panel-tag">Processed layer</span>
            </div>

            <div class="voice-mode-grid">
              ${PROCESS_MODES.map(renderModeCard).join("")}
            </div>

            <div class="voice-form-grid">
              <label class="voice-field">
                <span>Output register</span>
                <select id="register-select">
                  ${REGISTER_OPTIONS.map(
                    (option) => `<option value="${escapeAttribute(option)}" ${state.register === option ? "selected" : ""}>${escapeHtml(option)}</option>`
                  ).join("")}
                </select>
              </label>

              <label class="voice-field">
                <span>Output tone</span>
                <select id="tone-select">
                  ${TONE_OPTIONS.map(
                    (option) => `<option value="${escapeAttribute(option)}" ${state.tone === option ? "selected" : ""}>${escapeHtml(option)}</option>`
                  ).join("")}
                </select>
              </label>

              <label class="voice-field">
                <span>Target language</span>
                <select id="target-language">
                  ${LANGUAGE_OPTIONS.filter((language) => language.id !== "auto")
                    .map(
                      (language) => `
                        <option value="${language.id}" ${state.targetLanguage === language.id ? "selected" : ""}>
                          ${escapeHtml(language.label)}
                        </option>
                      `
                    )
                    .join("")}
                </select>
                <small class="voice-field-note">Used by the Translate mode. You can set it now and switch modes freely.</small>
              </label>
            </div>

            <button class="voice-primary-button" id="process-button" type="button" ${state.session ? "" : "disabled"}>
              ${state.processing ? "Processing..." : currentMode.label}
            </button>

            ${
              state.processed
                ? `
                  <article class="voice-output-card">
                    <div class="voice-output-head">
                      <div>
                        <p class="voice-kicker">Processed output</p>
                        <h3>${escapeHtml(state.processed.headline || currentMode.title)}</h3>
                      </div>
                      <div class="voice-mini-stack">
                        <span>${escapeHtml(state.processed.model?.model || "text model")}</span>
                        <span>${escapeHtml(state.processed.mode)}</span>
                      </div>
                    </div>
                    <div class="voice-output-copy">${nl2br(state.processed.output)}</div>
                    ${renderNoticeList("Notes", state.processed.notes)}
                    ${renderNoticeList("Warnings", state.processed.warnings, "warning")}
                  </article>
                `
                : `
                  <div class="voice-empty-state voice-empty-state-tight">
                    <h3>No processed output yet</h3>
                    <p>Choose a mode, then create a cleaned draft, a translation, or a prompt-ready version of the speech.</p>
                  </div>
                `
            }

            <div class="voice-inline-actions voice-export-row">
              <button class="voice-secondary-button" data-export-format="txt" type="button" ${state.session ? "" : "disabled"}>Export txt</button>
              <button class="voice-secondary-button" data-export-format="md" type="button" ${state.session ? "" : "disabled"}>Export md</button>
              <button class="voice-secondary-button" data-export-format="json" type="button" ${state.session ? "" : "disabled"}>Export json</button>
            </div>
          </section>

          <aside class="voice-panel voice-panel-history">
            <div class="voice-panel-head">
              <div>
                <p class="voice-kicker">4. Evaluate</p>
                <h2>Correction log</h2>
              </div>
              <span class="voice-panel-tag">Local eval hook</span>
            </div>

            <div class="voice-history-summary">
              <article class="voice-history-stat">
                <strong>${state.history.length}</strong>
                <span>saved corrections</span>
              </article>
              <article class="voice-history-stat">
                <strong>${state.session ? flaggedSegments.length : 0}</strong>
                <span>flagged spans in current session</span>
              </article>
              <article class="voice-history-stat">
                <strong>${state.session?.sourceFile?.name ? "1" : "0"}</strong>
                <span>active audio file</span>
              </article>
            </div>

            <div class="voice-history-list">
              ${
                historyPreview.length
                  ? historyPreview
                      .map(
                        (entry) => `
                          <article class="voice-history-card">
                            <div class="voice-history-head">
                              <strong>${escapeHtml(entry.languageLabel)}</strong>
                              <span>${escapeHtml(formatTimestamp(entry.savedAt))}</span>
                            </div>
                            <p>${escapeHtml(entry.audioName)}</p>
                            <p class="voice-history-note">${escapeHtml(entry.note || "No note added.")}</p>
                            <div class="voice-history-meta">
                              <span>${entry.deltaChars >= 0 ? "+" : ""}${entry.deltaChars} chars</span>
                              <span>${entry.flaggedSegments} flagged</span>
                            </div>
                          </article>
                        `
                      )
                      .join("")
                  : `
                    <div class="voice-empty-state voice-empty-state-tight">
                      <h3>No correction history yet</h3>
                      <p>Save a correction after reviewing a transcript and it will appear here.</p>
                    </div>
                  `
              }
            </div>

            <div class="voice-inline-actions voice-export-row">
              <button class="voice-secondary-button" id="export-history" type="button" ${state.history.length ? "" : "disabled"}>Export eval bundle</button>
            </div>
          </aside>
        </div>
      </main>
    </div>
  `;

  bindEvents();
}

function bindEvents() {
  const sourceLanguage = document.querySelector("#source-language");
  const audioFile = document.querySelector("#audio-file");
  const recordToggle = document.querySelector("#record-toggle");
  const transcribeButton = document.querySelector("#transcribe-button");
  const correctedText = document.querySelector("#corrected-text");
  const correctionNote = document.querySelector("#correction-note");
  const saveCorrection = document.querySelector("#save-correction");
  const registerSelect = document.querySelector("#register-select");
  const toneSelect = document.querySelector("#tone-select");
  const targetLanguage = document.querySelector("#target-language");
  const processButton = document.querySelector("#process-button");
  const exportHistory = document.querySelector("#export-history");

  sourceLanguage?.addEventListener("change", (event) => {
    state.selectedLanguage = event.currentTarget.value;
    render();
  });

  audioFile?.addEventListener("change", async (event) => {
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

  recordToggle?.addEventListener("click", handleRecordToggle);

  transcribeButton?.addEventListener("click", handleTranscribe);

  correctedText?.addEventListener("input", (event) => {
    state.correctedText = event.currentTarget.value;
  });

  correctionNote?.addEventListener("input", (event) => {
    state.correctionNote = event.currentTarget.value;
  });

  registerSelect?.addEventListener("change", (event) => {
    state.register = event.currentTarget.value;
  });

  toneSelect?.addEventListener("change", (event) => {
    state.tone = event.currentTarget.value;
  });

  targetLanguage?.addEventListener("change", (event) => {
    state.targetLanguage = event.currentTarget.value;
  });

  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.processMode = button.dataset.mode;
      render();
    });
  });

  processButton?.addEventListener("click", handleProcess);
  saveCorrection?.addEventListener("click", handleSaveCorrection);
  exportHistory?.addEventListener("click", () => exportHistoryBundle());

  document.querySelectorAll("[data-export-format]").forEach((button) => {
    button.addEventListener("click", () => exportSession(button.dataset.exportFormat));
  });
}

function renderBanner() {
  if (!state.error && !state.notice) {
    return "";
  }

  const tone = state.error ? "error" : "notice";
  const message = state.error || state.notice;

  return `
    <div class="voice-banner voice-banner-${tone}">
      <span>${escapeHtml(message)}</span>
      <button id="clear-banner" class="voice-banner-dismiss" type="button" aria-label="Dismiss message">×</button>
    </div>
  `;
}

document.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLElement && target.id === "clear-banner") {
    state.error = "";
    state.notice = "";
    render();
  }
});

function renderLanguageOption(language) {
  return `
    <option value="${language.id}" ${state.selectedLanguage === language.id ? "selected" : ""}>
      ${escapeHtml(language.label)} · ${escapeHtml(language.supportLevel)}
    </option>
  `;
}

function renderModeCard(mode) {
  const selected = mode.id === state.processMode;
  return `
    <button class="voice-mode-card ${selected ? "voice-mode-card-active" : ""}" data-mode="${mode.id}" type="button">
      <strong>${escapeHtml(mode.label)}</strong>
      <span>${escapeHtml(mode.description)}</span>
    </button>
  `;
}

function renderSegmentCard(segment) {
  return `
    <article class="voice-segment-card voice-segment-${segment.level}">
      <div class="voice-segment-head">
        <div class="voice-segment-meta">
          <span>${formatDuration(segment.start)}-${formatDuration(segment.end)}</span>
          <strong>${segment.score}</strong>
        </div>
        <span class="voice-segment-level">${escapeHtml(segment.level)}</span>
      </div>
      <p>${escapeHtml(segment.text)}</p>
      ${
        segment.reasons.length
          ? `<div class="voice-reason-row">${segment.reasons
              .map((reason) => `<span class="voice-reason-chip">${escapeHtml(reason)}</span>`)
              .join("")}</div>`
          : ""
      }
    </article>
  `;
}

function renderNoticeList(title, items = [], tone = "note") {
  if (!items?.length) {
    return "";
  }

  return `
    <section class="voice-note-block voice-note-block-${tone}">
      <p class="voice-kicker">${escapeHtml(title)}</p>
      <ul>
        ${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
    </section>
  `;
}

function renderMetricCard(label, value, detail) {
  return `
    <article class="voice-metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <p>${escapeHtml(detail)}</p>
    </article>
  `;
}

function renderAudioPreview() {
  if (!state.audioFile || !state.audioUrl) {
    return "";
  }

  return `
    <div class="voice-audio-preview">
      <div>
        <span class="voice-kicker">Selected audio</span>
        <strong>${escapeHtml(state.audioFile.name)}</strong>
      </div>
      <audio controls src="${escapeAttribute(state.audioUrl)}"></audio>
    </div>
  `;
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
    state.notice = "Recording from microphone. Press stop when you are done.";
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
      const file = new File([blob], `voice-workspace-${new Date().toISOString().replace(/[:.]/g, "-")}.${extension}`, {
        type
      });

      state.recording = false;
      state.mediaRecorder = null;
      state.recordingChunks = [];
      state.notice = "Recording captured. Review it and then transcribe.";
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
    state.notice = "Transcript ready. Inspect the flagged spans before you rewrite anything.";
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
        rawTranscript: state.session.transcript,
        correctedTranscript: state.correctedText,
        sourceLanguage: getLanguageMeta(state.selectedLanguage).label,
        targetLanguage: getLanguageMeta(state.targetLanguage).label,
        register: state.register,
        tone: state.tone,
        flaggedSegments: (state.session.segments ?? [])
          .filter((segment) => segment.level !== "low")
          .slice(0, 8)
          .map((segment) => ({
            text: segment.text,
            level: segment.level,
            reasons: segment.reasons
        }))
      })
    });

    const payload = await readApiResponse(response, "processing");

    state.processed = payload;
    state.notice = "Processed output ready. Export it or keep iterating from the raw transcript.";
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Processing failed.";
  } finally {
    state.processing = false;
    render();
  }
}

function handleSaveCorrection() {
  if (!state.session) {
    return;
  }

  const originalText = state.session.transcript.trim();
  const correctedText = state.correctedText.trim();

  if (!correctedText) {
    state.error = "Add a corrected transcript before saving.";
    render();
    return;
  }

  const entry = {
    id: createId(),
    savedAt: new Date().toISOString(),
    sessionId: state.session.sessionId,
    languageLabel: getLanguageMeta(state.selectedLanguage).label,
    audioName: state.session.sourceFile?.name ?? state.audioFile?.name ?? "audio clip",
    originalText,
    correctedText,
    note: state.correctionNote.trim(),
    deltaChars: correctedText.length - originalText.length,
    flaggedSegments: (state.session.segments ?? []).filter((segment) => segment.level !== "low").length,
    model: state.session.route?.model ?? "unknown"
  };

  state.history = [entry, ...state.history].slice(0, 50);
  saveHistory(state.history);
  state.notice = "Correction saved locally. Export the eval bundle when you want to move it into a dataset.";
  render();
}

function exportSession(format) {
  if (!state.session) {
    return;
  }

  const baseName = slugify(state.session.sourceFile?.name || `voice-workspace-${state.session.sessionId}`);
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
      `# Voice Workspace Session`,
      ``,
      `- Source file: ${state.session.sourceFile?.name ?? "unknown"}`,
      `- Selected language: ${getLanguageMeta(state.selectedLanguage).label}`,
      `- Detected language: ${state.session.languageDetected}`,
      `- Model: ${state.session.route?.model ?? "unknown"}`,
      ``,
      `## Raw transcript`,
      ``,
      state.session.transcript,
      ``,
      `## Corrected transcript`,
      ``,
      state.correctedText.trim() || "_No correction saved._",
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
  downloadBlob("voice-workspace-eval-bundle.json", JSON.stringify(state.history, null, 2), "application/json");
}

function setAudioFile(file) {
  if (state.audioUrl) {
    URL.revokeObjectURL(state.audioUrl);
  }

  state.audioFile = file;
  state.audioUrl = URL.createObjectURL(file);
  state.session = null;
  state.processed = null;
  state.correctedText = "";
  state.correctionNote = "";
  state.error = "";
  render();
}

function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(history) {
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

function getLanguageMeta(id) {
  return LANGUAGE_OPTIONS.find((language) => language.id === id) ?? LANGUAGE_OPTIONS[0];
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

function slugify(input) {
  return input
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "voice-workspace";
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
