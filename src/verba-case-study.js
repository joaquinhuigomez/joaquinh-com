import "./verba-case-study.css";
import { getVerbaIcon, getVerbaVisual } from "./verba-graphics.js";

const root = document.querySelector("#app");

document.title = "Verba Case Study | Multilingual speech, made publishable.";

const scenarioCards = [
  {
    id: "script-preservation",
    icon: "truth",
    eyebrow: "Mandarin",
    title: "Script preservation without accidental normalization",
    copy: "The same-language draft should polish wording, not flip the writing system or erase source intent."
  },
  {
    id: "code-switching",
    icon: "multilingual",
    eyebrow: "Code-switching",
    title: "Mixed-language speech stays readable",
    copy: "Verba keeps the source transcript visible while the review layer surfaces the exact spans that need human judgment."
  },
  {
    id: "colloquial",
    icon: "review",
    eyebrow: "Colloquial speech",
    title: "Slang and compressed phrasing are treated as real inputs",
    copy: "The product is built around the kind of speech people actually use when they are moving quickly."
  },
  {
    id: "prompting",
    icon: "prompt",
    eyebrow: "Prompt generation",
    title: "Spoken intent can become a usable prompt",
    copy: "The output layer can become a brief, a draft, or a prompt without collapsing the source layer."
  }
];

const methodologySteps = [
  {
    step: "01",
    title: "Capture a real clip",
    copy: "Upload audio or record from the mic. The raw transcript is always the first artifact."
  },
  {
    step: "02",
    title: "Flag uncertainty",
    copy: "Segment scoring and review gates surface risk before anything gets rewritten."
  },
  {
    step: "03",
    title: "Run the draft layer",
    copy: "The same reviewed transcript can be compared across providers or presets."
  },
  {
    step: "04",
    title: "Log human corrections",
    copy: "Ratings, tags, and notes become reusable evaluation data rather than hidden browser state."
  }
];

const differentiators = [
  {
    icon: "truth",
    title: "Raw speech stays first-class",
    copy: "Verba never hides the source behind the polished layer."
  },
  {
    icon: "review",
    title: "Uncertainty is visible before drafting",
    copy: "Weak spans are a workflow object, not a footnote."
  },
  {
    icon: "stack",
    title: "Human labeling becomes an asset",
    copy: "The review loop is designed so your corrections can power benchmarks and provider comparisons."
  }
];

async function init() {
  const scorecard = await loadScorecard();
  render(scorecard);
}

async function loadScorecard() {
  try {
    const response = await fetch("/verba-support-scorecard.json", { cache: "no-store" });
    if (!response.ok) {
      return null;
    }

    const payload = await response.json();
    return Array.isArray(payload.supportScorecard) ? payload.supportScorecard : null;
  } catch {
    return null;
  }
}

function render(scorecard) {
  root.innerHTML = `
    <div class="verba-page-shell verba-case-study-page">
      <header class="verba-topbar">
        <div class="verba-container verba-topbar-inner">
          <a class="verba-brand" href="/labs/verba/">
            <span class="verba-brand-mark">${getVerbaIcon("mark")}</span>
            <span class="verba-brand-copy">
              <span class="verba-brand-name">Verba</span>
              <span class="verba-brand-tag">Multilingual speech, made publishable.</span>
            </span>
          </a>
          <div class="verba-case-nav">
            <a class="verba-back-link" href="/labs/verba/">Landing</a>
            <a class="verba-back-link" href="/labs/verba/workspace/">Workspace</a>
          </div>
        </div>
      </header>

      <main class="verba-container verba-case-main">
        <section class="verba-case-hero verba-surface">
          <div class="verba-case-hero-copy">
            <p class="verba-kicker">Case study</p>
            <h1 class="verba-heading-xl">A multilingual speech product built around trust, not just transcription.</h1>
            <p class="verba-copy verba-case-hero-copytext">
              Verba is designed for people who speak across languages and need a draft they can actually trust. The product keeps raw speech visible, flags uncertainty, and turns the reviewed transcript into a deliberate output.
            </p>
            <div class="verba-button-row">
              <a class="verba-button" href="/labs/verba/workspace/">Open workspace</a>
              <a class="verba-button-secondary" href="/labs/verba/workspace/?sample=1">Try the sample</a>
              <a class="verba-button-secondary" href="/verba-benchmark-report.md">Read benchmark report</a>
            </div>
            <div class="verba-chip-row">
              <span class="verba-chip">${getVerbaIcon("truth")} Raw preserved</span>
              <span class="verba-chip">${getVerbaIcon("review")} Review gate</span>
              <span class="verba-chip">${getVerbaIcon("stack")} Eval asset</span>
            </div>
            <div class="verba-proof-strip verba-case-proof-strip">
              <article class="verba-badge-stat">
                <p class="verba-meta">Focus</p>
                <strong>Multilingual draft quality</strong>
              </article>
              <article class="verba-badge-stat">
                <p class="verba-meta">Method</p>
                <strong>Human review + provider compare</strong>
              </article>
              <article class="verba-badge-stat">
                <p class="verba-meta">Positioning</p>
                <strong>Product plus benchmark story</strong>
              </article>
            </div>
          </div>

          <div class="verba-case-hero-visual">
            ${renderCaseVisual()}
          </div>
        </section>

        <section class="verba-case-section">
          <div class="verba-case-grid verba-case-grid-two">
            <article class="verba-card verba-case-panel">
              <p class="verba-kicker">Why it matters</p>
              <h2 class="verba-heading-md">The common tools are commodity. The workflow is the product.</h2>
              <p class="verba-soft-copy">
                Simple upload, simple transcript, and simple rewrite are easy to copy. Verba differentiates on the layer that usually gets ignored: uncertainty, script preservation, and the correction loop.
              </p>
              <div class="verba-divider"></div>
              <ul class="verba-mini-list verba-case-list">
                ${differentiators
                  .map(
                    (item) => `
                      <li>
                        <strong>${escapeHtml(item.title)}</strong>
                        <span>${escapeHtml(item.copy)}</span>
                      </li>
                    `
                  )
                  .join("")}
              </ul>
            </article>

            <article class="verba-card verba-case-panel">
              <p class="verba-kicker">What is benchmarked</p>
              <h2 class="verba-heading-md">Evidence over claims.</h2>
              <p class="verba-soft-copy">
                The current benchmark set is small on purpose. It is meant to prove the product loop, expose failure modes, and create a reproducible label set you can grow over time.
              </p>
              <div class="verba-case-metric-grid">
                <article class="verba-badge-stat">
                  <p class="verba-meta">Dataset</p>
                  <strong>verba-benchmark.sample</strong>
                </article>
                <article class="verba-badge-stat">
                  <p class="verba-meta">Published</p>
                  <strong>Scorecard JSON + report</strong>
                </article>
                <article class="verba-badge-stat">
                  <p class="verba-meta">Loop</p>
                  <strong>Human ratings + tags</strong>
                </article>
              </div>
            </article>
          </div>
        </section>

        <section class="verba-case-section">
          <div class="verba-section-head verba-case-head">
            <p class="verba-kicker">Methodology</p>
            <h2 class="verba-heading-lg">How the evaluation loop works.</h2>
          </div>
          <div class="verba-case-method-grid">
            ${methodologySteps.map(renderMethodologyCard).join("")}
          </div>
        </section>

        <section class="verba-case-section">
          <div class="verba-section-head verba-case-head">
            <p class="verba-kicker">Sample scenarios</p>
            <h2 class="verba-heading-lg">The cases that shaped the product.</h2>
          </div>
          <div class="verba-case-scenario-grid">
            ${scenarioCards.map(renderScenarioCard).join("")}
          </div>
        </section>

        <section class="verba-case-section">
          <div class="verba-section-head verba-case-head">
            <p class="verba-kicker">Current scorecard</p>
            <h2 class="verba-heading-lg">Published support data, not hand-written claims.</h2>
          </div>
          <div class="verba-case-scorecard">
            ${renderScorecard(scorecard)}
          </div>
        </section>

        <section class="verba-case-section">
          <article class="verba-case-cta verba-card">
            <div>
              <p class="verba-kicker">Next step</p>
              <h2 class="verba-heading-md">Open the workspace and test the trust layer yourself.</h2>
              <p class="verba-soft-copy">
                The case study is the evidence layer. The workspace is where the actual workflow lives.
              </p>
            </div>
            <div class="verba-button-row">
              <a class="verba-button" href="/labs/verba/workspace/">Open workspace</a>
              <a class="verba-button-secondary" href="/labs/verba/">Back to landing</a>
            </div>
          </article>
        </section>
      </main>
    </div>
  `;
}

function renderCaseVisual() {
  return `
    <svg class="verba-case-visual-svg" viewBox="0 0 640 420" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="22" y="36" width="596" height="348" rx="32" fill="rgba(255, 249, 241, 0.96)" stroke="rgba(22, 36, 49, 0.12)"/>
      <rect x="64" y="80" width="138" height="240" rx="26" fill="#FFFDFC" stroke="rgba(22,36,49,0.10)"/>
      <rect x="250" y="80" width="138" height="240" rx="26" fill="rgba(17,93,101,0.08)" stroke="rgba(17,93,101,0.10)"/>
      <rect x="436" y="80" width="138" height="240" rx="26" fill="#FFFDFC" stroke="rgba(22,36,49,0.10)"/>

      <path class="verba-case-flow" d="M202 200H250" stroke="#115D65" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 10"/>
      <path class="verba-case-flow" d="M388 200H436" stroke="#115D65" stroke-width="4" stroke-linecap="round" stroke-dasharray="4 10"/>
      <circle class="verba-case-runner" cx="206" cy="200" r="8" fill="#115D65"/>

      <rect x="88" y="108" width="82" height="82" rx="20" fill="rgba(17,93,101,0.08)"/>
      <path d="M106 144h18" stroke="#115D65" stroke-width="6" stroke-linecap="round"/>
      <path d="M106 160h26" stroke="#115D65" stroke-width="6" stroke-linecap="round"/>
      <path d="M142 134v38" stroke="#115D65" stroke-width="6" stroke-linecap="round"/>

      <rect x="274" y="108" width="82" height="82" rx="20" fill="rgba(200,108,65,0.10)"/>
      <path d="M292 142h18" stroke="#C86C41" stroke-width="6" stroke-linecap="round"/>
      <path d="M292 158h30" stroke="#C86C41" stroke-width="6" stroke-linecap="round"/>
      <path d="M324 132c4 4 6 9 6 16s-2 12-6 16" stroke="#C86C41" stroke-width="6" stroke-linecap="round"/>

      <rect x="460" y="108" width="82" height="82" rx="20" fill="rgba(17,93,101,0.08)"/>
      <path d="M478 142h16" stroke="#115D65" stroke-width="6" stroke-linecap="round"/>
      <path d="M478 158h28" stroke="#115D65" stroke-width="6" stroke-linecap="round"/>
      <path d="M511 130v40" stroke="#115D65" stroke-width="6" stroke-linecap="round"/>

      <rect x="86" y="228" width="86" height="18" rx="9" fill="rgba(22,36,49,0.12)"/>
      <rect x="86" y="256" width="68" height="12" rx="6" fill="rgba(22,36,49,0.08)"/>
      <rect x="272" y="228" width="86" height="18" rx="9" fill="rgba(22,36,49,0.12)"/>
      <rect x="272" y="256" width="68" height="12" rx="6" fill="rgba(22,36,49,0.08)"/>
      <rect x="458" y="228" width="86" height="18" rx="9" fill="rgba(22,36,49,0.12)"/>
      <rect x="458" y="256" width="68" height="12" rx="6" fill="rgba(22,36,49,0.08)"/>
    </svg>
  `;
}

function renderMethodologyCard(step) {
  return `
    <article class="verba-card verba-case-method-card">
      <span class="verba-story-card-step">${escapeHtml(step.step)}</span>
      <h3 class="verba-heading-md">${escapeHtml(step.title)}</h3>
      <p class="verba-soft-copy">${escapeHtml(step.copy)}</p>
    </article>
  `;
}

function renderScenarioCard(scenario) {
  return `
    <article class="verba-card verba-case-scenario-card">
      <div class="verba-story-card-head">
        <span class="verba-icon-box">${getVerbaIcon(scenario.icon)}</span>
        <span class="verba-story-card-step">${escapeHtml(scenario.eyebrow)}</span>
      </div>
      <h3 class="verba-heading-md">${escapeHtml(scenario.title)}</h3>
      <p class="verba-soft-copy">${escapeHtml(scenario.copy)}</p>
    </article>
  `;
}

function renderScorecard(scorecard) {
  if (!scorecard?.length) {
    return `
      <article class="verba-card verba-case-scorecard-empty">
        <p class="verba-soft-copy">No scorecard data could be loaded. Open the published JSON artifact directly to inspect the latest benchmark run.</p>
        <div class="verba-button-row">
          <a class="verba-button-secondary" href="/verba-support-scorecard.json">Open scorecard JSON</a>
        </div>
      </article>
    `;
  }

  return `
    <div class="verba-case-scorecard-table">
      <div class="verba-case-scorecard-head">
        <span>Language</span>
        <span>Cases</span>
        <span>Pass rate</span>
        <span>Rating</span>
      </div>
      ${scorecard
        .map(
          (entry) => `
            <div class="verba-case-scorecard-row">
              <strong>${escapeHtml(entry.language)}</strong>
              <span>${escapeHtml(String(entry.totalCases))}</span>
              <span>${escapeHtml(formatPercent(entry.passRate))}</span>
              <span>${escapeHtml(entry.rating)}</span>
            </div>
          `
        )
        .join("")}
    </div>
  `;
}

function formatPercent(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return "n/a";
  }

  return `${Math.round(n * 100)}%`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

init();
