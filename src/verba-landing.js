import "./verba-landing.css";
import { getVerbaIcon, getVerbaVisual } from "./verba-graphics.js";

const root = document.querySelector("#app");
const founderPortrait = {
  src: "/portrait-night.png",
  alt: "Portrait of Joaquin Hui Gomez"
};

const supportLanguages = [
  { flag: "🇬🇧", label: "English" },
  { flag: "🇨🇳", label: "Mandarin" },
  { flag: "🇪🇸", label: "Spanish" },
  { flag: "🇩🇪", label: "German" },
  { flag: "🇫🇷", label: "French" },
  { flag: "🇵🇹", label: "Portuguese" },
  { flag: "🇭🇰", label: "Cantonese" }
];

const steps = [
  {
    step: "01",
    icon: "capture",
    title: "Capture the speech itself",
    copy: "Upload audio or record from the mic. The first transcript stays visible from the start."
  },
  {
    step: "02",
    icon: "review",
    title: "Review weak spots early",
    copy: "Low-confidence spans surface immediately, which helps with multilingual, accented, or code-switched speech."
  },
  {
    step: "03",
    icon: "transform",
    title: "Shape it into something useful",
    copy: "Generate a cleaner draft, a translation, or a prompt while keeping the source and output clearly separated."
  }
];

const principles = [
  {
    icon: "truth",
    title: "Raw and revised stay separate",
    copy: "You can compare the first transcript with the drafted output at any point."
  },
  {
    icon: "review",
    title: "Uncertainty stays in view",
    copy: "Flagged spans appear in the workflow while the transcript is still easy to correct."
  },
  {
    icon: "multilingual",
    title: "Built for multilingual workflows",
    copy: "The public language list stays narrow on purpose, and code-switching remains part of the design brief."
  }
];

document.title = "Verba | Multilingual speech, made publishable.";
init();

async function init() {
  let scorecard = null;

  try {
    const response = await fetch("/verba-support-scorecard.json", { cache: "no-store" });
    if (response.ok) {
      const payload = await response.json();
      scorecard = Array.isArray(payload.supportScorecard) ? payload.supportScorecard : null;
    }
  } catch {}

  render(scorecard);
}

function render(scorecard) {
  const supportEntries = mergeSupportEntries(scorecard);

  root.innerHTML = `
    <div class="verba-page-shell verba-landing">
      <header class="verba-topbar">
        <div class="verba-container verba-topbar-inner">
          <a class="verba-brand" href="/labs/verba/">
            <span class="verba-brand-mark">${getVerbaIcon("mark")}</span>
            <span class="verba-brand-copy">
              <span class="verba-brand-name">Verba</span>
              <span class="verba-brand-tag">Multilingual speech, made publishable.</span>
            </span>
          </a>
          <a class="verba-back-link" href="/">Back to portfolio</a>
        </div>
      </header>

      <main class="verba-container">
        <section class="verba-hero">
          <div class="verba-hero-shell verba-surface">
            <div class="verba-hero-copy">
              <p class="verba-kicker">Speech-to-draft workspace</p>
              <h1 class="verba-heading-xl">Multilingual speech, made publishable.</h1>
              <p class="verba-copy verba-hero-subcopy">
                Capture speech, review weak spots, and turn it into a usable draft.
              </p>
              <div class="verba-button-row">
                <a class="verba-button" href="/labs/verba/workspace/">Open workspace</a>
                <a class="verba-button-secondary" href="/labs/verba/workspace/?sample=1">Try sample session</a>
                <a class="verba-button-secondary" href="/labs/verba/case-study/">Read case study</a>
                <a class="verba-button-secondary" href="#how-it-works">See how it works</a>
              </div>
              <div class="verba-chip-row">
                <span class="verba-chip">${getVerbaIcon("truth")} Source preserved</span>
                <span class="verba-chip">${getVerbaIcon("review")} Weak spots flagged</span>
                <span class="verba-chip">${getVerbaIcon("multilingual")} Multilingual routes</span>
              </div>
              <div class="verba-proof-strip">
                <article class="verba-badge-stat">
                  <p class="verba-meta">Use case</p>
                  <strong>Speech to draft</strong>
                </article>
                <article class="verba-badge-stat">
                  <p class="verba-meta">Promise</p>
                  <strong>Source stays visible</strong>
                </article>
                <article class="verba-badge-stat">
                  <p class="verba-meta">Fit</p>
                  <strong>Desktop-first</strong>
                </article>
              </div>
            </div>

            <div class="verba-hero-visual">
              ${getVerbaVisual("hero")}
            </div>
          </div>
        </section>

        <section class="verba-section">
          <article class="verba-founder-card">
            <div class="verba-founder-layout">
              <div class="verba-founder-media">
                <img class="verba-founder-portrait" src="${founderPortrait.src}" alt="${founderPortrait.alt}" />
                <span class="verba-founder-badge">London · 6 languages</span>
              </div>
              <div class="verba-founder-copy">
                <p class="verba-kicker">Why I built this</p>
                <h2 class="verba-heading-md">I speak 6 languages, learn fast, and code-switch so often that most voice tools flatten how I actually think.</h2>
                <p class="verba-soft-copy">
                  I move between languages all day, often inside one conversation. Verba came from that friction. I wanted a workspace that could keep the source intact long enough to shape it into something worth sending.
                </p>
                <div class="verba-chip-row">
                  <span class="verba-chip">6 spoken languages</span>
                  <span class="verba-chip">Daily code-switching</span>
                  <span class="verba-chip">Built from lived workflow</span>
                </div>
              </div>
            </div>
          </article>
        </section>

        <section id="how-it-works" class="verba-section">
          <div class="verba-section-shell">
            <div class="verba-section-head">
              <p class="verba-kicker">How it works</p>
              <h2 class="verba-heading-lg">A compact flow for capture, review, and rewrite.</h2>
              <p class="verba-soft-copy">
                One main artifact per step keeps the flow readable from start to finish.
              </p>
            </div>

            <div class="verba-story-grid">
              ${steps.map(renderStepCard).join("")}
            </div>
          </div>
        </section>

        <section class="verba-section">
          <div class="verba-section-shell">
            <div class="verba-section-head">
              <p class="verba-kicker">Demo kit</p>
              <h2 class="verba-heading-lg">Open the product and the evidence side by side.</h2>
              <p class="verba-soft-copy">This is the portfolio-facing layer: product flow, benchmark summary, and the current support scorecard in one place.</p>
            </div>

            <div class="verba-story-grid verba-demo-grid">
              <article class="verba-story-card">
                <div class="verba-story-card-head">
                  <span class="verba-icon-box">${getVerbaIcon("transform")}</span>
                  <span class="verba-story-card-step">Live</span>
                </div>
                <h3 class="verba-heading-md">Guided workspace demo</h3>
                <p class="verba-soft-copy">Use the seeded sample or upload your own audio.</p>
                <div class="verba-button-row">
                  <a class="verba-button-secondary" href="/labs/verba/workspace/?sample=1">Open sample</a>
                </div>
              </article>

              <article class="verba-story-card">
                <div class="verba-story-card-head">
                  <span class="verba-icon-box">${getVerbaIcon("stack")}</span>
                  <span class="verba-story-card-step">Eval</span>
                </div>
                <h3 class="verba-heading-md">Benchmark report</h3>
                <p class="verba-soft-copy">Latest local benchmark run with case outputs and check results.</p>
                <div class="verba-button-row">
                  <a class="verba-button-secondary" href="/verba-benchmark-report.md">Open report</a>
                </div>
              </article>

              <article class="verba-story-card">
                <div class="verba-story-card-head">
                  <span class="verba-icon-box">${getVerbaIcon("truth")}</span>
                  <span class="verba-story-card-step">Data</span>
                </div>
                <h3 class="verba-heading-md">Support scorecard JSON</h3>
                <p class="verba-soft-copy">Machine-readable support summary for the current benchmark set.</p>
                <div class="verba-button-row">
                  <a class="verba-button-secondary" href="/verba-support-scorecard.json">Open scorecard</a>
                  <a class="verba-button-secondary" href="/labs/verba/case-study/">Case study</a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section class="verba-section">
          <div class="verba-section-shell">
            <div class="verba-section-head">
              <p class="verba-kicker">Before / after</p>
              <h2 class="verba-heading-lg">Keep the source in view.</h2>
            </div>

            <div class="verba-comparison-grid">
              <article class="verba-comparison-card">
                <p class="verba-kicker">Raw transcript</p>
                <h3 class="verba-heading-md">Unedited truth layer</h3>
                <div class="verba-comparison-artifact">
                  <p class="verba-soft-copy">Estoy muy cansado, tengo muchísimo trabajo y todavía no tengo claro cómo explicar esto al equipo.</p>
                  <span class="verba-chip">${getVerbaIcon("review")} One span needs review</span>
                  <p class="verba-soft-copy">Speech-derived source text. Keep this layer first.</p>
                </div>
              </article>

              <div class="verba-compare-arrow">
                ${getVerbaIcon("transform")}
              </div>

              <article class="verba-comparison-card">
                <p class="verba-kicker">Processed draft</p>
                <h3 class="verba-heading-md">Edited output with deliberate tone</h3>
                <div class="verba-comparison-artifact verba-comparison-artifact-processed">
                  <p class="verba-soft-copy">Me encuentro sumamente fatigado y con una carga laboral considerable, por lo que aún no he definido la mejor manera de comunicar esta situación al equipo.</p>
                  <span class="verba-chip">${getVerbaIcon("polish")} Legal / austere rewrite</span>
                  <p class="verba-soft-copy">The draft sits on its own layer with the style settings that produced it.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section class="verba-section">
          <div class="verba-principle-grid">
            <div class="verba-principle-stack">
              <div class="verba-section-head">
                <p class="verba-kicker">Why Verba exists</p>
                <h2 class="verba-heading-lg">Fast enough to use. Clear enough to trust.</h2>
              </div>
              ${principles.map(renderPrincipleCard).join("")}
            </div>

            <div class="verba-principle-visual">
              <article class="verba-principle-visual-card">
                <p class="verba-kicker">Trust layer</p>
                ${getVerbaVisual("trust")}
                <p class="verba-soft-copy">The source stays visible throughout the workflow.</p>
              </article>
              <article class="verba-principle-visual-card">
                <p class="verba-kicker">Ambiguity layer</p>
                ${getVerbaVisual("ambiguity")}
                <p class="verba-soft-copy">Flags appear early, while the transcript is still easy to fix.</p>
              </article>
              <article class="verba-principle-visual-card">
                <p class="verba-kicker">Multilingual layer</p>
                ${getVerbaVisual("multilingual")}
                <p class="verba-soft-copy">Supported languages are listed plainly, with no padding.</p>
              </article>
              <article class="verba-support-panel">
                <p class="verba-kicker">Support matrix</p>
                <h3 class="verba-heading-md">${scorecard?.length ? "Benchmark-backed support" : "Current language support"}</h3>
                <div class="verba-support-grid">
                  ${supportEntries.map(renderSupportChip).join("")}
                </div>
                <p class="verba-soft-copy">${scorecard?.length ? "Support labels now come from the benchmark output, not hand-written copy." : "Cantonese still needs a human pass."}</p>
              </article>
            </div>
          </div>
        </section>

        <section class="verba-section">
          <div class="verba-cta-band">
            <div>
              <p class="verba-kicker">Workspace</p>
              <h2 class="verba-heading-lg">Open the workspace.</h2>
              <p class="verba-soft-copy">Best on desktop. Upload a clip, inspect uncertain spans, then turn the result into something you can send.</p>
            </div>
            <div class="verba-button-row">
              <a class="verba-button" href="/labs/verba/workspace/">Launch Verba</a>
            </div>
          </div>
        </section>

        <footer class="verba-landing-footer">
          <div class="verba-inline-logo">
            <span class="verba-brand-mark">${getVerbaIcon("mark")}</span>
            <span>Verba</span>
          </div>
        </footer>
      </main>
    </div>
  `;
}

function renderStepCard(step) {
  return `
    <article class="verba-story-card">
      <div class="verba-story-card-head">
        <span class="verba-icon-box">${getVerbaIcon(step.icon)}</span>
        <span class="verba-story-card-step">${step.step}</span>
      </div>
      <h3 class="verba-heading-md">${escapeHtml(step.title)}</h3>
      <p class="verba-soft-copy">${escapeHtml(step.copy)}</p>
    </article>
  `;
}

function renderPrincipleCard(item) {
  return `
    <article class="verba-principle-card">
      <div class="verba-principle-card-head">
        <span class="verba-icon-box">${getVerbaIcon(item.icon)}</span>
        <h3 class="verba-heading-md">${escapeHtml(item.title)}</h3>
      </div>
      <p class="verba-soft-copy">${escapeHtml(item.copy)}</p>
    </article>
  `;
}

function renderSupportChip(language) {
  const flag = language.flag || getFlagForLanguage(language.language || language.label);
  const label = language.label || language.language;
  const score = typeof language.passRate === "number" ? `${Math.round(language.passRate * 100)}% pass` : "";
  const rating = language.rating ? titleCase(language.rating) : "";
  const fallbackMeta = !rating && !score && language.scorecardMode ? "No benchmark yet" : "";

  return `
    <div class="verba-support-chip">
      <span class="verba-support-flag">${escapeHtml(flag)}</span>
      <span class="verba-support-name">${escapeHtml(label)}</span>
      ${rating ? `<span class="verba-support-meta">${escapeHtml(rating)}</span>` : ""}
      ${score ? `<span class="verba-support-meta">${escapeHtml(score)}</span>` : ""}
      ${fallbackMeta ? `<span class="verba-support-meta">${escapeHtml(fallbackMeta)}</span>` : ""}
    </div>
  `;
}

function getFlagForLanguage(label = "") {
  const normalized = String(label).toLowerCase();

  if (normalized.includes("english")) return "🇬🇧";
  if (normalized.includes("mandarin")) return "🇨🇳";
  if (normalized.includes("spanish")) return "🇪🇸";
  if (normalized.includes("german")) return "🇩🇪";
  if (normalized.includes("french")) return "🇫🇷";
  if (normalized.includes("portuguese")) return "🇵🇹";
  if (normalized.includes("cantonese")) return "🇭🇰";
  return "🌐";
}

function mergeSupportEntries(scorecard) {
  if (!Array.isArray(scorecard) || !scorecard.length) {
    return supportLanguages;
  }

  const byLabel = new Map(scorecard.map((entry) => [String(entry.language || entry.label), entry]));

  return supportLanguages.map((language) => {
    const match = byLabel.get(language.label);
    return match
      ? {
          ...language,
          language: language.label,
          scorecardMode: true,
          rating: match.rating,
          passRate: match.passRate
        }
      : {
          ...language,
          scorecardMode: true
        };
  });
}

function titleCase(value = "") {
  return String(value || "")
    .split(/[\s-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
