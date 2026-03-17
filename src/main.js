import "./styles.css";
import { siteContent } from "./content.js";

const app = document.querySelector("#app");
const currentYear = new Date().getFullYear();

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
    image: `${siteContent.meta.url}${siteContent.hero.profile.image}`,
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

const renderButton = (button) => {
  const classes = button.style === "primary" ? "button button-primary" : "button button-secondary";
  const target = button.external ? ' target="_blank" rel="noreferrer"' : "";

  return `<a class="${classes}" href="${button.href}"${target}>${button.label}</a>`;
};

const renderProject = (project) => `
  <article class="project-card" data-reveal>
    <div class="card-topline">Flagship project</div>
    <div class="card-heading-row">
      <h3>${project.title}</h3>
      <a class="inline-link" href="${project.href}" target="_blank" rel="noreferrer">View repo</a>
    </div>
    <p class="card-description">${project.description}</p>
    <ul class="highlight-list">
      ${project.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
    </ul>
  </article>
`;

const renderContribution = (item) => `
  <article class="contribution-card">
    <div class="contribution-meta">
      <span class="contribution-target">${item.target}</span>
      <span class="contribution-status">${item.status}</span>
    </div>
    <h3>${item.title}</h3>
    <p>${item.summary}</p>
    <a class="inline-link" href="${item.href}" target="_blank" rel="noreferrer">Open link</a>
  </article>
`;

const renderContactLink = (item) => `
  <a class="contact-link" href="${item.href}" target="_blank" rel="noreferrer">
    <span class="contact-label">${item.label}</span>
    <span class="contact-note">${item.note}</span>
  </a>
`;

const renderHeroFact = (item) => `<span class="hero-fact">${item}</span>`;

const renderIdentityCard = (item) => `
  <article class="identity-card" data-reveal>
    <div class="identity-value">${item.value}</div>
    <div class="identity-label">${item.label}</div>
    <p>${item.detail}</p>
  </article>
`;

const renderBackgroundCard = (card) => `
  <article class="hero-detail-card" data-reveal>
    <p class="card-topline">${card.eyebrow}</p>
    <h3>${card.title}</h3>
    <ul class="mini-list">
      ${card.lines.map((line) => `<li>${line}</li>`).join("")}
    </ul>
  </article>
`;

const render = () => {
  app.innerHTML = `
    <div class="site-frame">
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
          <div class="container hero-grid">
            <div class="hero-copy" data-reveal>
              <p class="section-eyebrow">${siteContent.hero.eyebrow}</p>
              <h1>${siteContent.hero.title}</h1>
              <p class="hero-description">${siteContent.hero.description}</p>

              <div class="hero-fact-row">
                ${siteContent.hero.quickFacts.map(renderHeroFact).join("")}
              </div>

              <div class="button-row">
                ${siteContent.hero.buttons.map(renderButton).join("")}
              </div>

              <p class="proof-line">${siteContent.hero.proofLine}</p>
            </div>

            <aside class="hero-panel">
              <article class="portrait-card" data-reveal>
                <div class="portrait-media">
                  <img src="${siteContent.hero.profile.image}" alt="${siteContent.hero.profile.alt}" />
                  <div class="portrait-overlay">
                    <span class="portrait-pill">${siteContent.hero.profile.role}</span>
                    <span class="portrait-pill portrait-pill-secondary">${siteContent.hero.profile.location}</span>
                  </div>
                </div>
                <div class="portrait-copy">
                  <p class="intro-kicker">Background</p>
                  <p class="intro-copy">${siteContent.hero.profile.summary}</p>
                </div>
              </article>

              <div class="identity-grid">
                ${siteContent.hero.identity.map(renderIdentityCard).join("")}
              </div>

              <div class="hero-detail-grid">
                ${siteContent.hero.backgroundCards.map(renderBackgroundCard).join("")}
              </div>
            </aside>
          </div>
        </section>

        <section id="proof" class="section">
          <div class="container">
            <div class="section-header" data-reveal>
              <p class="section-eyebrow">Proof strip</p>
              <h2>Public work, measured impact</h2>
              <p class="section-copy">${siteContent.stats.verifiedOn}</p>
            </div>
            <div class="stat-grid">
              ${siteContent.stats.items
                .map(
                  (item) => `
                    <article class="stat-card" data-reveal>
                      <div class="stat-value">${item.value}</div>
                      <div class="stat-label">${item.label}</div>
                      <p class="stat-detail">${item.detail}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        </section>

        <section id="projects" class="section">
          <div class="container">
            <div class="section-header" data-reveal>
              <p class="section-eyebrow">Flagship projects</p>
              <h2>Three projects that define the portfolio</h2>
              <p class="section-copy">
                The throughline is consistent: make AI systems fairer, easier to trust, and easier to compare in practice.
              </p>
            </div>
            <div class="project-grid">
              ${siteContent.projects.map(renderProject).join("")}
            </div>
          </div>
        </section>

        <section id="open-source" class="section">
          <div class="container">
            <div class="section-header" data-reveal>
              <p class="section-eyebrow">Open-source contributions</p>
              <h2>Selected contributions</h2>
              <p class="section-copy">${siteContent.openSource.intro}</p>
            </div>

            <div class="contribution-grid featured-grid">
              ${siteContent.openSource.featured.map(renderContribution).join("")}
            </div>

            <div class="toggle-wrap" data-reveal>
              <button class="button button-secondary toggle-button" id="contribution-toggle" type="button" aria-expanded="false" aria-controls="more-contributions">
                View all contributions
              </button>
            </div>

            <div class="contribution-grid extended-grid" id="more-contributions" hidden>
              ${siteContent.openSource.extended.map(renderContribution).join("")}
            </div>
          </div>
        </section>

        <section id="case-study" class="section">
          <div class="container case-study-shell" data-reveal>
            <div class="case-study-copy">
              <p class="section-eyebrow">Case study</p>
              <h2>${siteContent.caseStudy.title}</h2>
              <p class="case-study-subtitle">${siteContent.caseStudy.subtitle}</p>
              <p class="section-copy">${siteContent.caseStudy.summary}</p>
              <ul class="detail-list">
                ${siteContent.caseStudy.details.map((detail) => `<li>${detail}</li>`).join("")}
              </ul>
            </div>
            <aside class="case-study-metrics">
              <div class="case-study-card">
                <div class="metric-tag">Award</div>
                <div class="metric-value-small">${siteContent.caseStudy.award}</div>
              </div>
              <div class="case-study-card">
                <div class="metric-tag">Estimated impact</div>
                <div class="metric-value-small">${siteContent.caseStudy.impact}</div>
              </div>
              <div class="case-study-card">
                <div class="metric-tag">Approach</div>
                <div class="metric-value-small">Agentic plus deterministic orchestration</div>
              </div>
            </aside>
          </div>
        </section>

        <section id="why-ai" class="section">
          <div class="container">
            <div class="section-header" data-reveal>
              <p class="section-eyebrow">Why I care about AI systems</p>
              <h2>${siteContent.whyAi.title}</h2>
              <p class="section-copy">${siteContent.whyAi.body}</p>
            </div>
            <div class="principle-grid">
              ${siteContent.whyAi.principles
                .map(
                  (principle) => `
                    <article class="principle-card" data-reveal>
                      <h3>${principle.title}</h3>
                      <p>${principle.detail}</p>
                    </article>
                  `
                )
                .join("")}
            </div>
          </div>
        </section>

        <section id="contact" class="section contact-section">
          <div class="container">
            <div class="contact-panel" data-reveal>
              <div class="contact-copy">
                <p class="section-eyebrow">Contact / links</p>
                <h2>${siteContent.contact.title}</h2>
                <p class="section-copy">${siteContent.contact.body}</p>
              </div>
              <div class="contact-links">
                ${siteContent.contact.links.map(renderContactLink).join("")}
              </div>
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

const initReveal = () => {
  const revealItems = document.querySelectorAll("[data-reveal]");

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18
    }
  );

  revealItems.forEach((item) => observer.observe(item));
};

setMeta();
render();
initContributionToggle();
initReveal();
