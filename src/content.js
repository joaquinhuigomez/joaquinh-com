export const siteContent = {
  meta: {
    title: "Joaquin Hui Gomez | AI Infrastructure Reliability",
    description:
      "AI infrastructure reliability across serving, evaluation, and agent orchestration, with Amazon work and open-source contributions across MCP and adjacent agent ecosystems.",
    url: "https://joaquinh.com"
  },
  nav: [
    { label: "Profile", href: "#proof" },
    { label: "Projects", href: "#projects" },
    { label: "Open source", href: "#open-source" },
    { label: "Amazon", href: "#case-study" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    eyebrow: "AI infrastructure | MLOps | agent orchestration",
    lead: "I fix",
    title: "the quiet failures behind AI products.",
    description:
      "Concurrency leaks, noisy evals, and orchestration edge cases that decide whether enterprise AI systems actually work.",
    proofLine:
      "Skip-level L5 return offer during hiring freeze · consistently rated Exceeds · $140MM+ cumulative savings delivered",
    proofTags: [
      {
        icon: "analytics",
        label: "#MLOps",
        title: "MLOps with live-metric validation",
        summary:
          "Decision systems that balance optimization, simulation, and actual production metrics rather than trusting backtests alone.",
        bullets: [
          "Node-level optimization across 200 delivery stations",
          "$100MM+ annual network-speed upside",
          "Live-metric validation because the network changes continuously"
        ],
        href: "#case-study",
        cta: "See Amazon impact"
      },
      {
        icon: "workflow",
        label: "#Serverless",
        title: "AWS-native serverless orchestration",
        summary:
          "Async experiment workflows built around deterministic preprocessing, queue-driven execution, and faster time-to-insight.",
        bullets: [
          "LLM-assisted intake with deterministic 1-5 GB input preparation",
          "AWS-native orchestration for long-running experiment runs",
          "1,440 hours / year of repetitive work removed"
        ],
        href: "#case-study",
        cta: "Inspect the case study"
      },
      {
        icon: "bridge",
        label: "#CloudMigration",
        title: "Cloud migration with business ownership",
        summary:
          "Moved operational tooling toward AWS-backed workflows while translating ambiguous business rules into production systems.",
        bullets: [
          "Owned automation and cloud-migration recommendations in Amazon middle-mile operations",
          "Launched dashboards, scripts, and ETL-backed analytics into production",
          "Bridged business stakeholders, SDEs, and research scientists"
        ],
        href: "#proof",
        cta: "See broader background"
      },
      {
        icon: "network",
        label: "#AIInfra",
        title: "AI infrastructure reliability",
        summary:
          "Public work focused on the quality layer underneath AI products: serving, evaluation, and tool integration.",
        bullets: [
          "Fixed TOCTOU rate-limiter race conditions in LiteLLM",
          "Patched SSRF DNS-rebinding exposure in the Vercel AI SDK",
          "Improved MCP and agent-SDK protocol reliability"
        ],
        href: "#open-source",
        cta: "Open OSS work"
      },
      {
        icon: "judge",
        label: "#LLMEval",
        title: "Evaluation before claims",
        summary:
          "Judge reliability work grounded in calibration, bias detection, and reproducible benchmarking.",
        bullets: [
          "Published a 6-model judge benchmark with Cohen's kappa",
          "Measured position bias in cost-optimized eval judges",
          "Built tooling before upstream contributions"
        ],
        href: "#open-source",
        cta: "View benchmark work"
      },
      {
        icon: "agent",
        label: "#AgentOrchestration",
        title: "Agent orchestration with deterministic guardrails",
        summary:
          "Hybrid workflows where LLMs help with planning and summarization while deterministic steps own schemas, files, and metrics.",
        bullets: [
          "LLM-assisted intake and recommendations around deterministic pipelines",
          "Schema-disciplined experiment setup and post-run analysis",
          "Protocol-level fixes across MCP and agent SDKs"
        ],
        href: "#projects",
        cta: "See key projects"
      }
    ],
    buttons: [
      {
        label: "View GitHub",
        href: "https://github.com/joaquinhuigomez",
        external: true,
        style: "primary",
        icon: "github"
      },
      {
        label: "Open-source contributions",
        href: "#open-source",
        external: false,
        style: "secondary",
        icon: "spark"
      },
      {
        label: "Contact",
        href: "#contact",
        external: false,
        style: "secondary",
        icon: "mail"
      }
    ],
    quickFacts: [
      {
        icon: "briefcase",
        label: "Current role",
        value: "Amazon PM | $100MM+/yr",
        popover: {
          kind: "role",
          title: "Amazon PM with technical scope",
          summary:
            "Program management across SDE and research partnerships, focused on production decision systems in logistics and experimentation.",
          metrics: [
            { value: "$100MM+/yr", label: "Node-level speed impact" },
            { value: "$14MM", label: "Finance-validated savings" },
            { value: "1,440 hrs/yr", label: "Manual work removed" }
          ],
          bullets: [
            "Received a skip-level return offer from L4 to L5 during the hiring-freeze period",
            "Consistently rated Exceeds and delivered cumulative $140MM+ savings over my career",
            "Led node-level optimization across 200 delivery stations under hard cost, labor, and promise constraints",
            "Built AWS-native experiment orchestration for 1-5 GB deterministic bundles and async simulation runs",
            "Automated planning and audit workflows for roughly 1,000 trucks and 4-5MM packages per week"
          ],
          tags: ["Program management", "MLOps", "Simulation", "Serverless", "SDE partnership"]
        }
      },
      {
        icon: "globe",
        label: "Footprint",
        value: "Across 3 continents",
        popover: {
          kind: "map",
          title: "Built and studied across 3 continents",
          summary:
            "Operational range shaped by academic, internship, and work footprints across Asia, Latin America, and Europe.",
          regions: [
            {
              id: "asia",
              label: "Asia",
              subtitle: "Hong Kong and Beijing",
              items: ["HKU undergrad", "First internships in Hong Kong and Beijing"]
            },
            {
              id: "latam",
              label: "LatAm",
              subtitle: "Chile and Colombia",
              items: ["Pontificia Universidad Catolica de Chile", "Universidad de los Andes, Colombia"]
            },
            {
              id: "europe",
              label: "Europe",
              subtitle: "London, Luxembourg, St. Gallen",
              items: ["London now", "Amazon internship in Luxembourg", "Master's at St. Gallen"]
            }
          ]
        }
      },
      {
        icon: "languages",
        label: "Languages",
        value: "6 fluent + PT/DE",
        popover: {
          kind: "languages",
          title: "Languages I work in",
          summary:
            "Fluent across six spoken languages, with two additional working-proficiency languages.",
          items: [
            { flag: "🇭🇰", label: "Cantonese", level: "Fluent" },
            { flag: "🇨🇳", label: "Mandarin", level: "Fluent" },
            { flag: "🇹🇼", label: "Taiwanese", level: "Fluent" },
            { flag: "🇬🇧", label: "English", level: "Fluent" },
            { flag: "🇪🇸", label: "Spanish", level: "Fluent" },
            { flag: "🇫🇷", label: "French", level: "Fluent" },
            { flag: "🇵🇹", label: "Portuguese", level: "B2" },
            { flag: "🇩🇪", label: "German", level: "B2" }
          ]
        }
      },
      {
        icon: "certificate",
        label: "Technical scope",
        value: "AWS, MLOps, eval",
        popover: {
          kind: "technical",
          title: "Hands-on technical scope",
          summary:
            "Beyond a PM title: AWS-native orchestration, public AI infra tooling, LLM evaluation, and protocol-level debugging.",
          certs: [
            {
              name: "AWS Certified AI Practitioner",
              meta: "Issued Mar 2025 · Expires Mar 2028"
            },
            {
              name: "AWS Certified Cloud Practitioner",
              meta: "Certified Oct 2022"
            },
            {
              name: "Third AWS qualification",
              meta: "Part of the current 3x AWS-certified stack referenced in profile materials"
            }
          ],
          bullets: [
            "Built AWS-native orchestration for long-running business experiments and simulation workflows",
            "Shipped Python and TypeScript tools for rate limiting, judge calibration, and agent evaluation",
            "Contributed reliability fixes across Vercel AI SDK, LiteLLM, MCP servers, CrewAI, and Anthropic's agent SDK"
          ],
          tags: ["AWS", "Serverless", "Python", "TypeScript", "LLM eval", "AI infra"]
        }
      }
    ],
    snapshot: {
      imageSrc: "/portrait-night.png",
      imageAlt: "Portrait of Joaquin Hui Gomez",
      title: "Amazon Program Manager",
      location: "London, United Kingdom",
      blurb:
        "Program management with hands-on technical scope across MLOps, experimentation, serverless orchestration, and AI-enabled operations."
    },
    credentials: [
      "St. Gallen magna cum laude",
      "HKU LLB + BBA",
      "Amazon · Accenture · PwC"
    ]
  },
  stats: {
    verifiedOn: "Last verified March 17, 2026 from GitHub profile and open PR search.",
    items: [
      { value: "17+", label: "Contributions", detail: "public OSS and benchmark work" },
      { value: "20", label: "Public repos", detail: "live GitHub profile count" },
      { value: "15", label: "Open PRs", detail: "active upstream contributions" },
      { value: "1440", label: "Hours / year", detail: "estimated internal ops impact" }
    ]
  },
  profile: {
    title: "About",
    body:
      "I care about the unglamorous AI infrastructure problems that decide whether a product actually works: concurrency, evaluation noise, protocol correctness, and operator usability.",
    chips: ["Amazon", "Accenture", "PwC", "St. Gallen", "HKU", "London"],
    notes: [
      {
        icon: "building",
        label: "Experience",
        detail:
          "Amazon PM with technical scope, plus earlier cloud, automation, and transformation work at Accenture and PwC."
      },
      {
        icon: "cap",
        label: "Education",
        detail:
          "St. Gallen M.A. in Strategy and International Management, magna cum laude, and HKU dual degrees in Law and Business."
      }
    ]
  },
  thesis: {
    eyebrow: "Research highlight",
    title: "St. Gallen thesis: generative AI for no-code and low-code systems",
    summary:
      "A systems view of generative AI in no-code and low-code development, built around LLMs, agents, and governance rather than prompt theater.",
    bullets: [
      "Proposed a triangle of LLMs, agents, and governance so speed does not come at the expense of rigor.",
      "Built a chained pipeline over 50K+ Reddit entries using summarization, encoder-style analysis, and a Pydantic-coordinated agent."
    ],
    stats: [
      { value: "50K+", label: "Reddit entries analyzed" },
      { value: "LLMs + agents + governance", label: "Core thesis architecture" },
      { value: "Magna cum laude", label: "SIM at St. Gallen" }
    ]
  },
  projects: [
    {
      icon: "rate",
      title: "Token-Aware Rate Limiter",
      href: "https://github.com/joaquinhuigomez/token-aware-rate-limiter",
      description:
        "Multi-tenant LLM rate limiting with atomic Redis token buckets, fairness metrics, and a real-time dashboard.",
      highlights: [
        "atomic Redis Lua token bucket",
        "Jain's fairness index",
        "real-time dashboard"
      ]
    },
    {
      icon: "judge",
      title: "LLM Judge Calibrator",
      href: "https://github.com/joaquinhuigomez/llm-judge-calibrator",
      description:
        "Judge reliability tooling with position-swap evaluation, bias detection, and inter-rater consistency metrics.",
      highlights: [
        "position bias detection",
        "verbosity analysis",
        "Cohen's kappa"
      ]
    },
    {
      icon: "agent",
      title: "Agent Eval",
      href: "https://github.com/joaquinhuigomez/agent-eval",
      description:
        "A harness for comparing coding agents head-to-head on custom tasks with pass rate, cost, time, and consistency reporting.",
      highlights: [
        "YAML task definitions",
        "isolated execution",
        "report generation"
      ]
    }
  ],
  openSource: {
    intro:
      "Open-source work focused on the AI infrastructure quality layer: serving, evaluation, and integration reliability.",
    statusNote:
      "Status checked March 17, 2026. Public tools and benchmark artifacts are shipped; upstream PRs below are submitted and pending maintainer review.",
    narrative: {
      title: "Why this work matters",
      body:
        "AI companies are scaling routing, eval, and tool-use stacks faster than they are hardening them. I focus on the failure modes that quietly hit cost, quality, and debuggability.",
      commercial:
        "If the rate limiter leaks, you cannot price predictably. If the eval judge is noisy, you cannot trust model decisions. If tool integrations drop data, agents fail in ways users cannot debug.",
      failureModes: [
        {
          title: "Serving layer",
          detail:
            "Concurrency bugs turn configured limits into unpredictable spend and provider-throttling cascades."
        },
        {
          title: "Evaluation layer",
          detail:
            "LLM-as-judge pipelines look objective until you measure bias and consistency directly."
        },
        {
          title: "Integration layer",
          detail:
            "Protocol bugs create silent data loss, validator crashes, and hard-to-debug agent behavior."
        }
      ]
    },
    githubPanel: {
      title: "GitHub is the live proof layer",
      body:
        "The fastest way to inspect current work is GitHub: public repos, upstream PRs, benchmark artifacts, and protocol-level fixes that show how I think about reliability.",
      metrics: [
        { value: "20", label: "Public repos" },
        { value: "15", label: "Open PRs" },
        { value: "17+", label: "Contributions" }
      ],
      links: [
        {
          label: "Profile",
          href: "https://github.com/joaquinhuigomez",
          icon: "github"
        },
        {
          label: "Rate limiter repo",
          href: "https://github.com/joaquinhuigomez/token-aware-rate-limiter",
          icon: "rate"
        }
      ]
    },
    shipped: {
      title: "Published and shipped",
      note: "Live today in public repos or benchmark artifacts.",
      items: [
        {
          target: "Published benchmark",
          title: "6-model judge reliability benchmark with Cohen's kappa",
          status: "Published",
          href: "https://github.com/joaquinhuigomez/llm-judge-calibrator/blob/master/benchmark/RESULTS.md",
          summary:
            "Cross-vendor judge calibration with position-swap evaluation and Cohen's kappa.",
          tags: ["LLM eval", "Benchmarking", "Cohen's kappa", "Bias detection"]
        },
        {
          target: "Public tools",
          title: "Three standalone reliability tools shipped in public",
          status: "Shipped",
          href: "#projects",
          summary:
            "Built token-aware-rate-limiter, llm-judge-calibrator, and agent-eval before touching upstream infra code.",
          tags: ["Python", "TypeScript", "Redis", "Agent evaluation"]
        }
      ]
    },
    pending: {
      title: "Submitted upstream PRs",
      note: "Open upstream on March 17, 2026 and separated from shipped work intentionally.",
      items: [
        {
          target: "Vercel AI SDK",
          title: "Prevent SSRF bypass via DNS rebinding",
          status: "Open PR",
          href: "https://github.com/vercel/ai/pull/13512",
          summary:
            "Found and patched a DNS rebinding SSRF path in validateDownloadUrl.",
          stars: "22.7k",
          tags: ["Security", "SSRF", "DNS rebinding", "TypeScript"]
        },
        {
          target: "LiteLLM",
          title: "Fix TOCTOU race in LiteLLM's token-per-minute limiter",
          status: "Open PR",
          href: "https://github.com/BerriAI/litellm/pull/23775",
          summary:
            "Reserves estimated tokens pre-call so concurrent requests cannot bypass the configured token ceiling under load.",
          stars: "39.4k",
          tags: ["Concurrency", "Rate limiting", "TOCTOU", "Python"]
        },
        {
          target: "MCP servers",
          title: "Guard GitLab enterprise repository search against crashes",
          status: "Open PR",
          href: "https://github.com/modelcontextprotocol/servers/pull/3611",
          summary:
            "Fixes an edge-case server response that can crash repository search on enterprise setups.",
          stars: "81.3k",
          tags: ["MCP", "GitLab", "Protocol reliability", "TypeScript"]
        },
        {
          target: "Anthropic Claude Agent SDK",
          title: "Route debug output away from the JSON protocol stream",
          status: "Open PR",
          href: "https://github.com/anthropics/claude-agent-sdk-typescript/pull/235",
          summary:
            "Moves debug output to stderr so stdout remains valid JSON during debugging.",
          tags: ["Agent SDK", "JSON protocol", "Debugging", "TypeScript"]
        },
        {
          target: "CrewAI",
          title: "Provider-agnostic tool schema for Bedrock and Gemini MCP tools",
          status: "Open PR",
          href: "https://github.com/crewAIInc/crewAI/pull/4912",
          summary:
            "Improves provider portability for Bedrock and Gemini MCP tools.",
          stars: "46.3k",
          tags: ["Bedrock", "Gemini", "MCP", "Schema design"]
        }
      ]
    },
    extended: [
      {
        target: "MCP TypeScript SDK",
        title: "Skip structured content validation on error payloads",
        status: "Open PR",
        href: "https://github.com/modelcontextprotocol/typescript-sdk/pull/1690",
        summary: "Avoids client-side validation failures when tools correctly return error payloads."
      },
      {
        target: "FastChat",
        title: "Add judge consistency and position-bias metrics",
        status: "Open PR",
        href: "https://github.com/lm-sys/FastChat/pull/3810",
        summary: "Adds position-bias reporting and Cohen's kappa so llm_judge outputs are easier to trust."
      },
      {
        target: "Mastra",
        title: "Extract content from MCP tool responses without outputSchema",
        status: "Open PR",
        href: "https://github.com/mastra-ai/mastra/pull/14372",
        summary: "Improves interoperability for MCP tools that omit explicit output schema definitions."
      },
      {
        target: "Vercel AI SDK",
        title: "Include full error object in chat SSE stream error chunks",
        status: "Open PR",
        href: "https://github.com/vercel/ai/pull/13511",
        summary: "Improves observability when providers return structured error details in streaming responses."
      },
      {
        target: "LangChain.js",
        title: "Route Anthropic HumanMessage contentBlocks through the standard formatter",
        status: "Open PR",
        href: "https://github.com/langchain-ai/langchainjs/pull/10435",
        summary: "Keeps Anthropic content blocks aligned with the framework's standard message formatting path."
      },
      {
        target: "token-aware-rate-limiter",
        title: "Public reference implementation",
        status: "Public repo",
        href: "https://github.com/joaquinhuigomez/token-aware-rate-limiter",
        summary: "Standalone LLM rate limiting system with fairness metrics and live observability."
      },
      {
        target: "llm-judge-calibrator",
        title: "Public judge calibration framework",
        status: "Public repo",
        href: "https://github.com/joaquinhuigomez/llm-judge-calibrator",
        summary: "Bias detection and judge-reliability reporting packaged as a lightweight tool."
      },
      {
        target: "agent-eval",
        title: "Public coding-agent comparison harness",
        status: "Public repo",
        href: "https://github.com/joaquinhuigomez/agent-eval",
        summary: "Compares coding agents on custom tasks with pass rate, cost, time, and consistency."
      },
      {
        target: "LiteLLM",
        title: "Propose Jain's fairness index for team-level rate limiting",
        status: "Proposal",
        href: "https://github.com/BerriAI/litellm/issues/20996#issuecomment-4070259346",
        summary: "Suggested a fairness metric grounded in the token-aware rate-limiting work."
      },
      {
        target: "Awesome-LLMOps",
        title: "Add token-aware-rate-limiter to curated list",
        status: "Open PR",
        href: "https://github.com/tensorchord/Awesome-LLMOps/pull/299",
        summary: "Placed the project in a larger LLMOps discovery ecosystem."
      },
      {
        target: "everything-claude-code",
        title: "Add agent-eval skill",
        status: "Open PR",
        href: "https://github.com/affaan-m/everything-claude-code/pull/540",
        summary: "Brought the evaluation harness into the Claude Code skills ecosystem."
      },
      {
        target: "crewAI",
        title: "Provider-agnostic schema for Bedrock and Gemini MCP tools",
        status: "Open PR",
        href: "https://github.com/crewAIInc/crewAI/pull/4912",
        summary: "Improves cross-provider tool compatibility in agent workflows."
      },
      {
        target: "Hive",
        title: "Execution-time evaluation hook for agent nodes",
        status: "Open PR",
        href: "https://github.com/aden-hive/hive/pull/6543",
        summary: "Adds multidimensional evaluation at node-execution time for agent systems."
      },
      {
        target: "Mastra",
        title: "Extract content from MCP tool responses without outputSchema",
        status: "Open PR",
        href: "https://github.com/mastra-ai/mastra/pull/14372",
        summary: "Improves interoperability for MCP tools that omit explicit output schema definitions."
      },
      {
        target: "Chroma",
        title: "Use idiomatic Jest assertions in JS client tests",
        status: "Open PR",
        href: "https://github.com/chroma-core/chroma/pull/6673",
        summary: "A smaller TypeScript contribution to improve test clarity and maintainability."
      },
      {
        target: "6-Judge Benchmark",
        title: "Publish cross-vendor judge calibration results",
        status: "Published benchmark",
        href: "https://github.com/joaquinhuigomez/llm-judge-calibrator/blob/master/benchmark/RESULTS.md",
        summary: "Published comparative calibration results across major model providers."
      },
      {
        target: "awesome-ai-agents",
        title: "Submit agent-eval to curated ecosystem list",
        status: "Submitted",
        href: "https://github.com/e2b-dev/awesome-ai-agents",
        summary: "Extended the project's distribution into the agent tooling discovery ecosystem."
      }
    ]
  },
  caseStudy: {
    title: "'26 Amazon ATS Program AI Hackathon Most Innovative Solution",
    subtitle: "Amazon PM | applied AI and production operations",
    summary:
      "Amazon PM work with technical scope, partnering with SDEs and research scientists to turn optimization and experimentation systems into faster business decisions.",
    award: "Most Innovative",
    impact: "1440 hours / year estimated savings",
    metrics: [
      {
        value: "$100M / year",
        label: "Network-speed upside",
        detail: "annualized value from node-level speed policy tuning"
      },
      {
        value: "$14M",
        label: "Validated savings",
        detail: "finance-validated impact from optimization algorithms"
      },
      {
        value: "1,440 hrs / year",
        label: "Ops time removed",
        detail: "manual experiment setup and analysis reduced through orchestration"
      }
    ],
    details: [
      "Built a simulation and experiment layer that combined deterministic analysis, LLM-assisted planning, and async AWS-native orchestration.",
      "Used actual production metrics rather than backtests alone, because the network changes continuously and backward-looking wins do not always hold."
    ]
  },
  whyAi: {
    title: "How I think about AI systems",
    body:
      "Less model theater, more systems that can be trusted, measured, and owned by a real team.",
    principles: [
      {
        icon: "shield",
        title: "Reliability over novelty",
        detail: "If a system cannot be trusted under constraints, it is not ready for real work."
      },
      {
        icon: "ruler",
        title: "Evaluation before claims",
        detail: "I prefer tools and benchmarks that make model behavior measurable instead of anecdotal."
      },
      {
        icon: "nodes",
        title: "Orchestration for outcomes",
        detail: "The useful AI work is often in the glue: routing, validation, fallback logic, and operational fit."
      }
    ]
  },
  contact: {
    title: "Contact, code, and outside work",
    body:
      "GitHub is the best place to inspect current repos and PRs. LinkedIn gives the broader background. X and Instagram stay lighter.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/joaquinhuigomez",
        note: "Repos, PRs, and project history",
        icon: "github"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/joaquin-h-352927a9/",
        note: "Professional profile and background",
        icon: "linkedin"
      },
      {
        label: "X",
        href: "https://x.com/ViajaryTragar",
        note: "Main profile feed",
        icon: "x"
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/kinaventurero",
        note: "Travel and photography",
        icon: "instagram"
      }
    ]
  },
  social: {
    x: {
      title: "On X",
      body:
        "Travel, food, and a less formal side of me outside work.",
      href: "https://twitter.com/ViajaryTragar",
      handle: "@ViajaryTragar",
      tags: ["Travel", "Food", "Languages"]
    },
    instagram: {
      title: "Outside work",
      body:
        "Travel and photography are where I reset.",
      items: [
        {
          imageSrc: "/ig-vinicunca.jpg",
          title: "Vinicunca",
          likes: "309 likes",
          meta: "Peru | Rainbow Mountain",
          href: "https://www.instagram.com/p/B0tqsMjAf3P/"
        },
        {
          imageSrc: "/ig-rigi.jpg",
          title: "Rigi",
          likes: "277 likes",
          meta: "Switzerland",
          href: "https://www.instagram.com/p/BrdtMgaAIZ5/"
        }
      ]
    }
  }
};
