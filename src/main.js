import "./styles.css";
import { siteContent } from "./content.js";

const app = document.querySelector("#app");
const currentYear = new Date().getFullYear();

const iconMap = {
  github: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-4.5 1.3-4.5-2.2-6-2.7" />
      <path d="M15 22v-3.4a3 3 0 0 0-.9-2.3c3-.3 6.1-1.5 6.1-6.6A5.1 5.1 0 0 0 19 6.1 4.7 4.7 0 0 0 18.9 3S17.8 2.7 15 4.6a10.2 10.2 0 0 0-6 0C6.2 2.7 5.1 3 5.1 3A4.7 4.7 0 0 0 5 6.1 5.1 5.1 0 0 0 3.8 9.7c0 5.1 3.1 6.3 6.1 6.6A3 3 0 0 0 9 18.6V22" />
    </svg>
  `,
  linkedin: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  `,
  x: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m4 4 16 16" />
      <path d="M20 4 9.5 14.5 4 20" />
      <path d="M4 4h5.5l10.5 16H14.5Z" />
    </svg>
  `,
  instagram: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  `,
  star: `
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="m12 3.8 2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4-3.9-3.8 5.4-.8Z" />
    </svg>
  `,
  mail: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  `,
  briefcase: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  `,
  globe: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  `,
  languages: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 7h8" />
      <path d="M9 4v3c0 4-2 7-5 9" />
      <path d="M7 11c1.1 2 2.7 3.7 4.7 5" />
      <path d="M15 5h6" />
      <path d="m18 5 3 12" />
      <path d="m21 17-6-12-3 12" />
    </svg>
  `,
  certificate: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="8" r="4" />
      <path d="m10 12-1 8 3-2 3 2-1-8" />
    </svg>
  `,
  building: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" />
    </svg>
  `,
  cap: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 9 10-5 10 5-10 5Z" />
      <path d="M6 11.5v4.5c0 1.2 2.7 3 6 3s6-1.8 6-3v-4.5" />
    </svg>
  `,
  spark: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7Z" />
      <path d="M19 3v3" />
      <path d="M20.5 4.5h-3" />
    </svg>
  `,
  rate: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 15c1.2-3.3 3.8-5 8-5s6.8 1.7 8 5" />
      <path d="M4 15v4h4" />
      <path d="M20 15v4h-4" />
      <path d="M12 6v8" />
      <path d="m9.5 8.5 2.5-2.5 2.5 2.5" />
    </svg>
  `,
  judge: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3v18" />
      <path d="m6 7 6 4 6-4" />
      <path d="M6 7v4a3 3 0 0 0 6 0" />
      <path d="M18 7v4a3 3 0 0 1-6 0" />
      <path d="M8 21h8" />
    </svg>
  `,
  agent: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="4" y="5" width="16" height="14" rx="3" />
      <path d="M9 10h6" />
      <path d="M9 14h3" />
      <path d="M12 5V3" />
    </svg>
  `,
  shield: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3 5 6v6c0 4.5 3 7.8 7 9 4-1.2 7-4.5 7-9V6Z" />
      <path d="m9.5 12 1.8 1.8 3.7-4.1" />
    </svg>
  `,
  ruler: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m14 4 6 6-10 10H4v-6Z" />
      <path d="M13 5 5 13" />
      <path d="M16 8 8 16" />
    </svg>
  `,
  nodes: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="6" r="2.5" />
      <circle cx="18" cy="18" r="2.5" />
      <path d="M8.2 11 15.7 7.2" />
      <path d="M8.2 13 15.7 16.8" />
    </svg>
  `,
  bridge: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19V9" />
      <path d="M20 19V9" />
      <path d="M4 19h16" />
      <path d="M7 9c1.5-2 3-3 5-3s3.5 1 5 3" />
      <path d="M9 19v-5" />
      <path d="M15 19v-5" />
    </svg>
  `,
  network: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="5" r="2" />
      <circle cx="19" cy="12" r="2" />
      <circle cx="12" cy="19" r="2" />
      <path d="M7 12h10" />
      <path d="m12 7 5 4.2" />
      <path d="m12 7-5 4.2" />
      <path d="m12 17 5-4.2" />
      <path d="m12 17-5-4.2" />
    </svg>
  `,
  workflow: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="4" width="7" height="5" rx="1.5" />
      <rect x="14" y="4" width="7" height="5" rx="1.5" />
      <rect x="8.5" y="15" width="7" height="5" rx="1.5" />
      <path d="M10 6.5h4" />
      <path d="M17.5 9v2a3 3 0 0 1-3 3h-5" />
      <path d="M6.5 9v2a3 3 0 0 0 3 3h5" />
    </svg>
  `,
  analytics: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 19h16" />
      <path d="M7 16V9" />
      <path d="M12 16V5" />
      <path d="M17 16v-4" />
      <path d="m6 7 4-2 4 3 4-2" />
    </svg>
  `,
  arrow: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  `,
  chevronLeft: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6" />
    </svg>
  `,
  chevronRight: `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  `
};

const setMeta = () => {
  document.title = siteContent.meta.title;

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute("content", siteContent.meta.description);
  }

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.append(canonical);
  }
  canonical.href = siteContent.meta.url;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Joaquin Hui Gomez",
    url: siteContent.meta.url,
    image: `${siteContent.meta.url}${siteContent.hero.snapshot.imageSrc}`,
    jobTitle: "Program Manager",
    worksFor: {
      "@type": "Organization",
      name: "Amazon"
    },
    sameAs: siteContent.contact.links.map((link) => link.href),
    alumniOf: ["University of St. Gallen", "The University of Hong Kong"],
    knowsAbout: ["AI infrastructure", "LLM evaluation", "agent orchestration", "reliability engineering"]
  };

  const existingSchema = document.querySelector('script[data-site-schema="person"]');
  if (existingSchema) {
    existingSchema.remove();
  }

  const schemaScript = document.createElement("script");
  schemaScript.type = "application/ld+json";
  schemaScript.dataset.siteSchema = "person";
  schemaScript.textContent = JSON.stringify(personSchema);
  document.head.append(schemaScript);
};

const renderIcon = (name, className = "icon-mark") => `
  <span class="${className}" aria-hidden="true">
    ${iconMap[name] || iconMap.spark}
  </span>
`;

const renderButton = (button) => {
  const classes = button.style === "primary" ? "button button-primary" : "button button-secondary";
  const target = button.external ? ' target="_blank" rel="noreferrer"' : "";

  return `
    <a class="${classes}" href="${button.href}"${target}>
      ${renderIcon(button.icon, "button-icon")}
      <span>${button.label}</span>
    </a>
  `;
};

const renderQuickFact = (item, index) => `
  <button
    class="fact-card fact-trigger"
    type="button"
    data-popover-source="fact"
    data-popover-index="${index}"
    aria-expanded="false"
  >
    <div class="fact-icon-wrap">
      ${renderIcon(item.icon)}
    </div>
    <div class="fact-copy">
      <p class="fact-label">${item.label}</p>
      <p class="fact-value">${item.value}</p>
    </div>
    <span class="fact-open">Inspect</span>
  </button>
`;

const renderProofChip = (item, index) => `
  <button
    class="proof-chip"
    type="button"
    data-popover-source="proof"
    data-popover-index="${index}"
    aria-expanded="false"
  >
    ${renderIcon(item.icon, "proof-chip-icon")}
    <span>${item.label}</span>
  </button>
`;

const renderStatCard = (item) => `
  <article class="stat-card" data-reveal>
    <div class="stat-value">${item.value}</div>
    <div class="stat-label">${item.label}</div>
    <p class="stat-detail">${item.detail}</p>
  </article>
`;

const renderProfileNote = (item) => `
  <article class="profile-note">
    <div class="fact-icon-wrap">
      ${renderIcon(item.icon)}
    </div>
    <div>
      <p class="fact-label">${item.label}</p>
      <p class="profile-note-copy">${item.detail}</p>
    </div>
  </article>
`;

const renderMiniMetric = (item) => `
  <article class="mini-metric">
    <strong>${item.value}</strong>
    <span>${item.label}</span>
  </article>
`;

const renderProject = (project) => `
  <article class="project-card" data-reveal>
    <div class="project-icon-row">
      <div class="project-icon">
        ${renderIcon(project.icon)}
      </div>
      <span class="card-topline">Flagship project</span>
    </div>
    <div class="card-heading-row">
      <h3>${project.title}</h3>
      <a class="inline-link" href="${project.href}" target="_blank" rel="noreferrer">
        View repo
      </a>
    </div>
    <p class="card-description">${project.description}</p>
    <div class="tag-row project-tag-row">
      ${project.highlights.map((highlight) => `<span class="tag-chip">${highlight}</span>`).join("")}
    </div>
  </article>
`;

const renderContribution = (item) => `
  <article class="contribution-card">
    <div class="contribution-meta contribution-meta-top">
      <div class="contribution-source">
        <span class="contribution-target">${item.target}</span>
        ${
          item.stars
            ? `<span class="star-pill">${renderIcon("star", "star-icon")}<span>${item.stars}</span></span>`
            : ""
        }
      </div>
      <span class="contribution-status">${item.status}</span>
    </div>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    ${
      item.tags?.length
        ? `<div class="tag-row contribution-tag-row">${item.tags
            .map((tag) => `<span class="tag-chip">${tag}</span>`)
            .join("")}</div>`
        : ""
    }
    <a class="inline-link" href="${item.href}" target="_blank" rel="noreferrer">
      Open link
    </a>
  </article>
`;

const renderFailureMode = (item) => `
  <article class="failure-card">
    <h4>${item.title}</h4>
    <p>${item.detail}</p>
  </article>
`;

const renderGithubLink = (item) => `
  <a class="mini-link" href="${item.href}" target="_blank" rel="noreferrer">
    ${renderIcon(item.icon)}
    <span>${item.label}</span>
  </a>
`;

const renderCaseMetric = (item) => `
  <article class="case-metric-card" data-reveal>
    <div class="metric-value-small">${item.value}</div>
    <div class="metric-tag">${item.label}</div>
    <p>${item.detail}</p>
  </article>
`;

const renderWorkstream = (item) => `
  <article class="workstream-card" data-reveal>
    <div class="project-icon">
      ${renderIcon(item.icon)}
    </div>
    <h3>${item.title}</h3>
    <p>${item.detail}</p>
  </article>
`;

const renderPrinciple = (item) => `
  <article class="principle-card" data-reveal>
    <div class="project-icon">
      ${renderIcon(item.icon)}
    </div>
    <h3>${item.title}</h3>
    <p>${item.detail}</p>
  </article>
`;

const renderContactLink = (item) => `
  <a class="contact-link" href="${item.href}" target="_blank" rel="noreferrer">
    <div class="contact-icon-wrap">
      ${renderIcon(item.icon)}
    </div>
    <div class="contact-copy-block">
      <span class="contact-label">${item.label}</span>
      <span class="contact-note">${item.note}</span>
    </div>
    ${renderIcon("arrow", "link-arrow")}
  </a>
`;

const renderInstagramItem = (item) => `
  <article class="instagram-card">
    <a class="instagram-media" href="${item.href}" target="_blank" rel="noreferrer">
      <img src="${item.imageSrc}" alt="${item.title}" loading="lazy" />
    </a>
    <div class="instagram-copy">
      <div class="instagram-meta-row">
        <strong>${item.title}</strong>
        <span>${item.likes}</span>
      </div>
      <p>${item.meta}</p>
    </div>
  </article>
`;

const renderPopoverMetric = (item) => `
  <article class="popover-metric">
    <strong>${item.value}</strong>
    <span>${item.label}</span>
  </article>
`;

const renderFlagLanguage = (item) => `
  <article class="flag-card">
    <span class="flag-mark" aria-hidden="true">${item.flag}</span>
    <div>
      <strong>${item.label}</strong>
      <span>${item.level}</span>
    </div>
  </article>
`;

const renderCertItem = (item) => `
  <article class="cert-card">
    <strong>${item.name}</strong>
    <span>${item.meta}</span>
  </article>
`;

const renderRegionPanel = (item) => `
  <article class="region-panel" data-region-block="${item.id}">
    <p class="region-label">${item.label}</p>
    <p class="region-subtitle">${item.subtitle}</p>
    <ul class="popover-list compact-list">
      ${item.items.map((entry) => `<li>${entry}</li>`).join("")}
    </ul>
  </article>
`;

const renderPopoverAction = (payload) =>
  payload.href
    ? `
      <a class="mini-link popover-link" href="${payload.href}">
        ${renderIcon("arrow")}
        <span>${payload.cta || "Open evidence"}</span>
      </a>
    `
    : "";

const renderFootprintMap = () => `
  <div class="map-stage">
    <svg
      class="footprint-map"
      viewBox="0 0 360 190"
      role="img"
      aria-label="Map showing Joaquin Hui Gomez's footprints in Asia, Latin America, and Europe"
    >
      <rect x="0" y="0" width="360" height="190" rx="18" class="map-ocean" />

      <path
        class="map-region"
        data-region="latam"
        d="M60 56c15 0 30 4 37 13 7 10 9 22 7 31-2 10-10 19-15 29-5 11-4 26-13 39-7 10-18 16-25 13-8-4-11-19-8-32 4-17 4-28-3-40-5-8-13-16-12-26 2-15 14-27 32-27Z"
      />
      <path
        class="map-region"
        data-region="europe"
        d="M172 54c10-8 28-10 42-7 12 2 23 9 26 18 3 8-4 15-13 18-10 3-14 8-20 13-7 6-16 9-24 7-9-2-17-9-19-18-2-10 1-22 8-31Z"
      />
      <path
        class="map-region"
        data-region="asia"
        d="M223 43c18-8 44-9 66-3 15 4 31 14 36 28 5 14-5 27-21 31-14 4-26 1-37 3-10 2-17 10-28 11-15 1-30-5-38-17-8-11-9-27-1-39 5-6 12-11 23-14Z"
      />

      <path class="map-route" d="M98 118C126 98 152 85 180 79" />
      <path class="map-route" d="M188 78C214 67 236 65 256 69" />
      <path class="map-route" d="M180 83C164 90 145 99 126 111" />

      <g class="map-marker" data-region="latam" style="--delay: 0s">
        <circle class="marker-pulse" cx="92" cy="110" r="11" />
        <circle class="marker-dot" cx="92" cy="110" r="4" />
      </g>
      <g class="map-marker" data-region="latam" style="--delay: 0.45s">
        <circle class="marker-pulse" cx="111" cy="89" r="10" />
        <circle class="marker-dot" cx="111" cy="89" r="4" />
      </g>
      <g class="map-marker" data-region="europe" style="--delay: 0.2s">
        <circle class="marker-pulse" cx="184" cy="79" r="10" />
        <circle class="marker-dot" cx="184" cy="79" r="4" />
      </g>
      <g class="map-marker" data-region="europe" style="--delay: 0.65s">
        <circle class="marker-pulse" cx="199" cy="71" r="10" />
        <circle class="marker-dot" cx="199" cy="71" r="4" />
      </g>
      <g class="map-marker" data-region="asia" style="--delay: 0.35s">
        <circle class="marker-pulse" cx="269" cy="72" r="11" />
        <circle class="marker-dot" cx="269" cy="72" r="4" />
      </g>
      <g class="map-marker" data-region="asia" style="--delay: 0.75s">
        <circle class="marker-pulse" cx="285" cy="84" r="10" />
        <circle class="marker-dot" cx="285" cy="84" r="4" />
      </g>
    </svg>
  </div>
`;

const renderPopoverBody = (payload) => {
  if (payload.kind === "role") {
    return `
      <div class="popover-metric-grid">
        ${payload.metrics.map(renderPopoverMetric).join("")}
      </div>
      <ul class="popover-list">
        ${payload.bullets.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="tag-row popover-tag-row">
        ${payload.tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
      </div>
    `;
  }

  if (payload.kind === "languages") {
    return `
      <div class="flag-grid">
        ${payload.items.map(renderFlagLanguage).join("")}
      </div>
    `;
  }

  if (payload.kind === "technical") {
    return `
      <div class="cert-grid">
        ${payload.certs.map(renderCertItem).join("")}
      </div>
      <ul class="popover-list">
        ${payload.bullets.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <div class="tag-row popover-tag-row">
        ${payload.tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
      </div>
    `;
  }

  if (payload.kind === "map") {
    return `
      ${renderFootprintMap()}
      <div class="region-chip-row">
        ${payload.regions
          .map(
            (region) => `
              <button class="region-chip" type="button" data-region-chip="${region.id}">
                ${region.label}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="region-grid">
        ${payload.regions.map(renderRegionPanel).join("")}
      </div>
    `;
  }

  return `
    <ul class="popover-list">
      ${payload.bullets.map((item) => `<li>${item}</li>`).join("")}
    </ul>
    ${renderPopoverAction(payload)}
  `;
};

const renderPopover = (payload) => `
  <div class="popover-shell">
    <div class="popover-head">
      <div class="popover-title-row">
        <div class="fact-icon-wrap popover-icon">
          ${renderIcon(payload.icon || "spark")}
        </div>
        <div>
          <p class="fact-label">${payload.badge || "Detail"}</p>
          <h3>${payload.title}</h3>
        </div>
      </div>
    </div>
    <p class="popover-summary">${payload.summary}</p>
    ${renderPopoverBody(payload)}
    ${payload.kind === "map" ? "" : renderPopoverAction(payload)}
  </div>
`;

const render = () => {
  app.innerHTML = `
    <div class="site-shell">
      <div class="page-aurora page-aurora-left"></div>
      <div class="page-aurora page-aurora-right"></div>

      <header class="site-header">
        <div class="container header-inner">
          <a class="brand" href="#hero">
            <span class="brand-mark">JH</span>
            <span class="brand-copy">Joaquin Hui Gomez</span>
          </a>
          <nav class="site-nav" aria-label="Primary">
            ${siteContent.nav
              .map((item) => `<a class="nav-link" href="${item.href}">${item.label}</a>`)
              .join("")}
          </nav>
        </div>
      </header>

      <main id="main">
        <section id="hero" class="hero section">
          <div class="container hero-layout">
            <div class="hero-copy" data-reveal>
              <p class="section-eyebrow">${siteContent.hero.eyebrow}</p>
              <div class="hero-title-lockup">
                <span class="hero-lead">${siteContent.hero.lead}</span>
                <h1>${siteContent.hero.title}</h1>
              </div>
              <p class="hero-description">${siteContent.hero.description}</p>

              <div class="proof-chip-shell">
                <p class="section-eyebrow">Keyword proof</p>
                <div class="proof-chip-row">
                  ${siteContent.hero.proofTags.map(renderProofChip).join("")}
                </div>
              </div>

              <div class="fact-grid">
                ${siteContent.hero.quickFacts.map(renderQuickFact).join("")}
              </div>

              <div class="button-row">
                ${siteContent.hero.buttons.map(renderButton).join("")}
              </div>

              <p class="proof-line">${siteContent.hero.proofLine}</p>
            </div>

            <aside class="hero-profile" data-reveal>
              <div class="portrait-frame">
                <img
                  class="portrait-image"
                  src="${siteContent.hero.snapshot.imageSrc}"
                  alt="${siteContent.hero.snapshot.imageAlt}"
                />
                <div class="portrait-badge">${siteContent.hero.snapshot.location}</div>
              </div>

              <div class="profile-summary">
                <p class="intro-kicker">Profile snapshot</p>
                <h2 class="profile-title">${siteContent.hero.snapshot.title}</h2>
                <p class="profile-blurb">${siteContent.hero.snapshot.blurb}</p>
                <p class="profile-blurb profile-blurb-secondary">${siteContent.hero.snapshot.detail}</p>
                <div class="tag-row profile-tag-row">
                  ${siteContent.hero.snapshot.tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
                </div>
                <div class="credential-row">
                  ${siteContent.hero.credentials
                    .map((credential) => `<span class="credential-chip">${credential}</span>`)
                    .join("")}
                </div>
              </div>
            </aside>
          </div>

          <div class="hero-popover" id="hero-popover" hidden></div>
        </section>

        <section id="proof" class="section">
          <div class="container">
            <div class="section-header section-header-compact" data-reveal>
              <p class="section-eyebrow">Proof strip</p>
              <h2>Public work, measured impact</h2>
              <p class="section-copy">${siteContent.stats.verifiedOn}</p>
            </div>

            <div class="stat-grid">
              ${siteContent.stats.items.map(renderStatCard).join("")}
            </div>

            <div class="profile-grid">
              <article class="bio-panel" data-reveal>
                <div class="panel-head">
                  <div>
                    <p class="section-eyebrow">About</p>
                    <h3>${siteContent.profile.title}</h3>
                  </div>
                  <div class="chip-row">
                    ${siteContent.profile.chips
                      .map((chip) => `<span class="chip">${chip}</span>`)
                      .join("")}
                  </div>
                </div>
                <p class="section-copy">${siteContent.profile.body}</p>
                <div class="profile-note-grid">
                  ${siteContent.profile.notes.map(renderProfileNote).join("")}
                </div>
              </article>

              <article class="thesis-panel" data-reveal>
                <p class="section-eyebrow">${siteContent.thesis.eyebrow}</p>
                <h3>${siteContent.thesis.title}</h3>
                <p class="thesis-meta">${siteContent.thesis.meta}</p>
                <p class="section-copy">${siteContent.thesis.summary}</p>
                <ul class="detail-list">
                  ${siteContent.thesis.bullets.map((detail) => `<li>${detail}</li>`).join("")}
                </ul>
                <div class="mini-metric-grid">
                  ${siteContent.thesis.stats.map(renderMiniMetric).join("")}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" class="section">
          <div class="container">
            <div class="section-header section-header-compact" data-reveal>
              <p class="section-eyebrow">Projects</p>
              <h2>Key Projects</h2>
            </div>

            <div class="project-grid">
              ${siteContent.projects.map(renderProject).join("")}
            </div>
          </div>
        </section>

        <section id="open-source" class="section">
          <div class="container">
            <div class="section-header section-header-compact" data-reveal>
              <p class="section-eyebrow">Open source</p>
              <h2>Git / OpenSource Contributions</h2>
              <p class="section-copy">${siteContent.openSource.intro}</p>
              <p class="section-note">${siteContent.openSource.statusNote}</p>
            </div>

            <div class="open-layout">
              <aside class="github-panel" data-reveal>
                <div class="github-mark">
                  ${renderIcon("github")}
                </div>
                <p class="card-topline">Live proof layer</p>
                <h3>${siteContent.openSource.githubPanel.title}</h3>
                <p>${siteContent.openSource.githubPanel.body}</p>
                <div class="mini-metric-grid">
                  ${siteContent.openSource.githubPanel.metrics.map(renderMiniMetric).join("")}
                </div>
                <div class="mini-link-row">
                  ${siteContent.openSource.githubPanel.links.map(renderGithubLink).join("")}
                </div>
              </aside>

              <div class="open-main">
                <article class="quality-panel" data-reveal>
                  <p class="card-topline">Portfolio narrative</p>
                  <h3>${siteContent.openSource.narrative.title}</h3>
                  <p class="section-copy">${siteContent.openSource.narrative.body}</p>

                  <div class="quality-grid">
                    ${siteContent.openSource.narrative.failureModes.map(renderFailureMode).join("")}
                  </div>

                  <p class="quality-commercial">${siteContent.openSource.narrative.commercial}</p>
                </article>

                <div class="open-subsection" data-reveal>
                  <div class="subsection-head">
                    <div>
                      <p class="section-eyebrow">Published / shipped</p>
                      <h3>${siteContent.openSource.shipped.title}</h3>
                    </div>
                    <p>${siteContent.openSource.shipped.note}</p>
                  </div>

                  <div class="contribution-grid shipped-grid">
                    ${siteContent.openSource.shipped.items.map(renderContribution).join("")}
                  </div>
                </div>

                <div class="open-subsection" data-reveal>
                  <div class="subsection-head">
                    <div>
                      <p class="section-eyebrow">Pending upstream</p>
                      <h3>${siteContent.openSource.pending.title}</h3>
                    </div>
                    <p>${siteContent.openSource.pending.note}</p>
                  </div>

                  <div class="contribution-grid pending-grid">
                    ${siteContent.openSource.pending.items.map(renderContribution).join("")}
                  </div>
                </div>

                <div class="toggle-wrap" data-reveal>
                  <button
                    class="button button-secondary toggle-button"
                    id="contribution-toggle"
                    type="button"
                    aria-expanded="false"
                    aria-controls="more-contributions"
                  >
                    View all contributions
                  </button>
                </div>

                <div class="contribution-grid extended-grid" id="more-contributions" hidden>
                  ${siteContent.openSource.extended.map(renderContribution).join("")}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="case-study" class="section">
          <div class="container">
            <div class="section-header section-header-compact" data-reveal>
              <p class="section-eyebrow">Case study</p>
              <h2>${siteContent.caseStudy.title}</h2>
              <p class="section-copy">${siteContent.caseStudy.summary}</p>
            </div>

            <div class="case-study-layout">
              <article class="impact-panel" data-reveal>
                <p class="case-study-subtitle">${siteContent.caseStudy.subtitle}</p>
                <div class="impact-highlight-row">
                  <span class="highlight-pill">Award: ${siteContent.caseStudy.award}</span>
                  <span class="highlight-pill">Impact: ${siteContent.caseStudy.impact}</span>
                </div>
                <ul class="detail-list">
                  ${siteContent.caseStudy.details.map((detail) => `<li>${detail}</li>`).join("")}
                </ul>
              </article>

              <div class="case-metric-grid">
                ${siteContent.caseStudy.metrics.map(renderCaseMetric).join("")}
              </div>
            </div>
          </div>
        </section>

        <section id="why-ai" class="section">
          <div class="container">
            <div class="section-header section-header-compact" data-reveal>
              <p class="section-eyebrow">Why I care about AI systems</p>
              <h2>${siteContent.whyAi.title}</h2>
              <p class="section-copy">${siteContent.whyAi.body}</p>
            </div>

            <div class="principle-grid">
              ${siteContent.whyAi.principles.map(renderPrinciple).join("")}
            </div>
          </div>
        </section>

        <section id="contact" class="section contact-section">
          <div class="container contact-shell">
            <article class="contact-panel" data-reveal>
              <div class="contact-head">
                <p class="section-eyebrow">Contact / links</p>
                <h2>${siteContent.contact.title}</h2>
                <p class="section-copy">${siteContent.contact.body}</p>
              </div>

              <div class="contact-links">
                ${siteContent.contact.links.map(renderContactLink).join("")}
              </div>
            </article>

            <div class="social-stack">
              <article class="social-panel x-panel" data-reveal>
                <div class="social-head">
                  <div class="social-title-row">
                    ${renderIcon("x")}
                    <div>
                      <h3>${siteContent.social.x.title}</h3>
                      <p>${siteContent.social.x.body}</p>
                    </div>
                  </div>
                  <a class="inline-link" href="${siteContent.social.x.href}" target="_blank" rel="noreferrer">
                    Open profile
                  </a>
                </div>
                <div class="x-profile-card">
                  <strong>${siteContent.social.x.handle}</strong>
                  <p>${siteContent.social.x.body}</p>
                  <div class="tag-row social-tag-row">
                    ${siteContent.social.x.tags.map((tag) => `<span class="tag-chip">${tag}</span>`).join("")}
                  </div>
                </div>
              </article>

              <article class="social-panel instagram-panel" data-reveal>
                <div class="social-head">
                  <div class="social-title-row">
                    ${renderIcon("instagram")}
                    <div>
                      <h3>${siteContent.social.instagram.title}</h3>
                      <p>${siteContent.social.instagram.body}</p>
                    </div>
                  </div>
                  <a class="inline-link" href="https://www.instagram.com/kinaventurero" target="_blank" rel="noreferrer">
                    Open profile
                  </a>
                </div>

                <div class="instagram-track instagram-track-static">
                  ${siteContent.social.instagram.items.map(renderInstagramItem).join("")}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <footer class="site-footer">
        <div class="container footer-inner">
          <p>Joaquin Hui Gomez</p>
          <p>${currentYear} | Built for joaquinh.com</p>
        </div>
      </footer>
    </div>
  `;
};

const initContributionToggle = () => {
  const button = document.querySelector("#contribution-toggle");
  const moreSection = document.querySelector("#more-contributions");

  if (!button || !moreSection) {
    return;
  }

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "View all contributions" : "Hide extra contributions";
    moreSection.hidden = expanded;
  });
};

const initHeroPopover = () => {
  const popover = document.querySelector("#hero-popover");
  const triggers = Array.from(document.querySelectorAll("[data-popover-source]"));

  if (!popover || !triggers.length) {
    return;
  }

  let activeTrigger = null;
  let hideTimer = null;
  let locked = false;

  const clearHideTimer = () => {
    if (hideTimer) {
      window.clearTimeout(hideTimer);
      hideTimer = null;
    }
  };

  const getPayload = (trigger) => {
    const index = Number(trigger.dataset.popoverIndex);
    if (trigger.dataset.popoverSource === "fact") {
      const item = siteContent.hero.quickFacts[index];
      return item?.popover ? { ...item.popover, icon: item.icon, badge: item.label } : null;
    }

    if (trigger.dataset.popoverSource === "proof") {
      const item = siteContent.hero.proofTags[index];
      return item ? { ...item, kind: "proof", badge: item.label } : null;
    }

    return null;
  };

  const positionPopover = (trigger) => {
    if (!trigger || popover.hidden) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();

    if (window.innerWidth <= 640) {
      popover.style.left = "1rem";
      popover.style.top = "auto";
      popover.style.bottom = "1rem";
      popover.style.maxWidth = "calc(100vw - 2rem)";
      return;
    }

    popover.style.bottom = "auto";
    popover.style.maxWidth = "min(28rem, calc(100vw - 1.5rem))";

    const popoverRect = popover.getBoundingClientRect();
    const gap = 14;
    const fitsBelow = triggerRect.bottom + gap + popoverRect.height <= window.innerHeight - 12;
    const top = fitsBelow ? triggerRect.bottom + gap : triggerRect.top - popoverRect.height - gap;
    const left = Math.min(
      Math.max(12, triggerRect.left + triggerRect.width / 2 - popoverRect.width / 2),
      window.innerWidth - popoverRect.width - 12
    );

    popover.style.top = `${Math.max(12, top)}px`;
    popover.style.left = `${left}px`;
  };

  const hide = () => {
    clearHideTimer();
    popover.hidden = true;
    popover.innerHTML = "";
    popover.dataset.region = "";
    popover.dataset.kind = "";
    if (activeTrigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }
    activeTrigger = null;
    locked = false;
  };

  const scheduleHide = () => {
    if (locked) {
      return;
    }
    clearHideTimer();
    hideTimer = window.setTimeout(hide, 120);
  };

  const initMapDetail = () => {
    const regionChips = Array.from(popover.querySelectorAll("[data-region-chip]"));
    if (!regionChips.length) {
      return;
    }

    const activateRegion = (region) => {
      popover.dataset.region = region;
    };

    activateRegion("europe");

    regionChips.forEach((chip) => {
      chip.addEventListener("pointerenter", () => activateRegion(chip.dataset.regionChip));
      chip.addEventListener("focus", () => activateRegion(chip.dataset.regionChip));
      chip.addEventListener("click", () => activateRegion(chip.dataset.regionChip));
    });
  };

  const open = (trigger, shouldLock = false) => {
    const payload = getPayload(trigger);
    if (!payload) {
      return;
    }

    clearHideTimer();
    locked = shouldLock;

    if (activeTrigger && activeTrigger !== trigger) {
      activeTrigger.setAttribute("aria-expanded", "false");
    }

    activeTrigger = trigger;
    activeTrigger.setAttribute("aria-expanded", "true");

    popover.dataset.kind = payload.kind || "proof";
    popover.innerHTML = renderPopover(payload);
    popover.hidden = false;
    positionPopover(trigger);

    if (payload.kind === "map") {
      initMapDetail();
    }
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener("pointerenter", () => open(trigger));
    trigger.addEventListener("pointerleave", scheduleHide);
    trigger.addEventListener("focus", () => open(trigger));
    trigger.addEventListener("blur", (event) => {
      if (popover.contains(event.relatedTarget)) {
        return;
      }
      scheduleHide();
    });
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      if (activeTrigger === trigger && locked && !popover.hidden) {
        hide();
        return;
      }
      open(trigger, true);
    });
  });

  popover.addEventListener("pointerenter", clearHideTimer);
  popover.addEventListener("pointerleave", scheduleHide);

  document.addEventListener("click", (event) => {
    if (popover.hidden) {
      return;
    }
    if (popover.contains(event.target) || event.target.closest("[data-popover-source]")) {
      return;
    }
    hide();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hide();
    }
  });

  window.addEventListener("resize", () => positionPopover(activeTrigger));
  window.addEventListener(
    "scroll",
    () => {
      if (locked) {
        positionPopover(activeTrigger);
        return;
      }
      hide();
    },
    { passive: true }
  );
};

const initReveal = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");
  revealItems.forEach((item) => item.classList.add("is-visible"));
};

setMeta();
render();
initContributionToggle();
initHeroPopover();
initReveal();
