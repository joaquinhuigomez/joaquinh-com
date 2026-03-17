export const siteContent = {
  meta: {
    title: "Joaquin Hui Gomez | Reliable AI Systems",
    description:
      "Reliable AI systems across production automation, evaluation, and agent orchestration, with Amazon work and open-source contributions across MCP and Anthropic's agent ecosystem.",
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
    eyebrow: "AI infrastructure | evaluation | agent orchestration",
    lead: "I build",
    title: "Reliable AI systems.",
    description:
      "Production-minded AI infrastructure, evaluation, and orchestration grounded in Amazon work and open-source contributions across MCP, Anthropic's agent SDK, and adjacent agent ecosystems.",
    proofLine:
      "Internal AI hackathon winner | OSS contributor across MCP and Anthropic agent tooling | Amazon | Accenture | PwC",
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
        value: "Amazon Program Manager"
      },
      {
        icon: "globe",
        label: "Footprint",
        value: "Lived across 3 continents"
      },
      {
        icon: "languages",
        label: "Languages",
        value: "6 spoken fluently"
      },
      {
        icon: "certificate",
        label: "Technical depth",
        value: "3 AWS certifications"
      }
    ],
    snapshot: {
      imageSrc: "/portrait-night.png",
      imageAlt: "Portrait of Joaquin Hui Gomez",
      title: "Program Manager at Amazon",
      location: "London, United Kingdom",
      blurb:
        "Non-traditional on paper, technical in practice: cloud, analytics, evaluation, orchestration, and production automation."
    },
    intro:
      "I'm Joaquin Hui Gomez, a London-based Program Manager at Amazon focused on making AI systems reliable, measurable, and genuinely useful in practice. My route into this work runs through strategy, law, consulting, operations, and hands-on automation, which is why I care about systems that hold up beyond the demo.",
    credentials: [
      "St. Gallen M.A. | magna cum laude",
      "HKU LLB + BBA",
      "Ex-Accenture and PwC",
      "AI, cloud, and automation builder"
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
      "I'm interested in making AI systems more reliable, measurable, and useful in practice. My work sits at the intersection of AI infrastructure, evaluation, and agent tooling: fair resource allocation, trustworthy judging, and orchestration systems that create measurable outcomes.",
    chips: ["Amazon", "Accenture", "PwC", "St. Gallen", "HKU", "London"],
    notes: [
      {
        icon: "building",
        label: "Experience",
        detail:
          "Amazon program management plus earlier cloud, automation, analytics, and digital transformation work at Accenture and PwC."
      },
      {
        icon: "cap",
        label: "Education",
        detail:
          "St. Gallen M.A. in Strategy and International Management, magna cum laude, and HKU dual degrees in Law and Business."
      },
      {
        icon: "spark",
        label: "Builder DNA",
        detail:
          "Built and ran a 3K+ user forum at age 9. The thread is the same now, just pointed at AI systems instead of early internet communities."
      }
    ]
  },
  thesis: {
    eyebrow: "Research highlight",
    title: "St. Gallen thesis: generative AI for no-code and low-code systems",
    summary:
      "At St. Gallen's SIM program, I focused on how generative AI can move from drafting assistance to governed, scalable system design. The work treated no-code and low-code development as a systems problem, not just a prompting exercise.",
    bullets: [
      "Proposed a triangle of LLMs, agents, and governance so speed does not come at the expense of rigor.",
      "Built a pipeline that combined summary and prompt chaining, encoder-style semantic analysis, and a Pydantic-coordinated agent over 50K+ Reddit entries.",
      "Used GPT-based summarization to surface emergent themes and actionable recommendations, while working well before these workflows became common portfolio boilerplate."
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
        "A reference implementation for multi-tenant LLM rate limiting with atomic Redis token buckets, fairness metrics, and a real-time dashboard.",
      highlights: [
        "atomic Redis Lua token bucket",
        "Jain's fairness index",
        "real-time dashboard",
        "designed for LLM API workloads"
      ]
    },
    {
      icon: "judge",
      title: "LLM Judge Calibrator",
      href: "https://github.com/joaquinhuigomez/llm-judge-calibrator",
      description:
        "A framework for measuring judge reliability with position-swap evaluation, bias detection, and inter-rater consistency metrics.",
      highlights: [
        "position bias detection",
        "verbosity and self-preference analysis",
        "Cohen's kappa",
        "publishable calibration reports"
      ]
    },
    {
      icon: "agent",
      title: "Agent Eval",
      href: "https://github.com/joaquinhuigomez/agent-eval",
      description:
        "A lightweight harness for comparing coding agents head-to-head on custom tasks with pass rate, cost, time, and consistency reporting.",
      highlights: [
        "YAML task definitions",
        "isolated execution",
        "multi-agent comparison",
        "report generation"
      ]
    }
  ],
  openSource: {
    intro:
      "I work on the AI infrastructure quality layer: the serving, evaluation, and integration problems that quietly determine whether AI products are actually reliable in production.",
    statusNote:
      "Status checked March 17, 2026. Public tools and benchmark artifacts are shipped; the upstream fixes below are submitted and pending maintainer review.",
    narrative: {
      title: "Portfolio narrative: AI Infrastructure Quality Layer",
      body:
        "The AI industry is shipping inference infrastructure faster than it can validate it. Teams depend on a shared open-source stack for routing, orchestration, serving, and tool integration, but reliability primitives have not kept pace with adoption.",
      commercial:
        "If the rate limiter leaks, you cannot price predictably. If the eval pipeline carries noisy judges, you cannot trust regressions. If tool integrations silently drop data, agents fail in ways users cannot debug.",
      failureModes: [
        {
          title: "Serving layer",
          detail:
            "Rate limiters can look correct and still fail under concurrency. That turns a configuration ceiling into unpredictable spend and provider-throttling cascades."
        },
        {
          title: "Evaluation layer",
          detail:
            "Teams often treat LLM-as-judge systems as trustworthy by default. My published benchmark focuses on position bias and Cohen's kappa because agreement alone is not enough."
        },
        {
          title: "Integration layer",
          detail:
            "MCP and tool-calling stacks still carry edge-case bugs that produce silent data loss, validator crashes, or protocol corruption at exactly the layer users struggle to inspect."
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
      note: "This work is already live today in public repos or benchmark artifacts.",
      items: [
        {
          target: "Published benchmark",
          title: "6-model judge reliability benchmark with Cohen's kappa",
          status: "Published",
          href: "https://github.com/joaquinhuigomez/llm-judge-calibrator/blob/master/benchmark/RESULTS.md",
          summary:
            "Published cross-vendor calibration results with position-swap evaluation, Cohen's kappa, and a headline finding that GPT-4o-mini is highly order-sensitive as a cost-optimized judge."
        },
        {
          target: "Public tools",
          title: "Three standalone reliability tools shipped in public",
          status: "Shipped",
          href: "#projects",
          summary:
            "Built token-aware-rate-limiter, llm-judge-calibrator, and agent-eval as working reference implementations before touching upstream infra code."
        }
      ]
    },
    pending: {
      title: "Submitted upstream PRs",
      note: "Checked March 17, 2026. These are open upstream and separated from shipped work intentionally.",
      items: [
        {
          target: "Vercel AI SDK · 22.7k stars",
          title: "Prevent SSRF bypass via DNS rebinding",
          status: "Open PR",
          href: "https://github.com/vercel/ai/pull/13512",
          summary:
            "Found and patched a DNS rebinding SSRF path in validateDownloadUrl, turning a quiet serving-layer security risk into a concrete upstream fix proposal."
        },
        {
          target: "LiteLLM · 39.4k stars",
          title: "Fix TOCTOU race in the TPM rate limiter",
          status: "Open PR",
          href: "https://github.com/BerriAI/litellm/pull/23775",
          summary:
            "Reserves estimated tokens pre-call so concurrent requests cannot all read zero and bypass the configured TPM ceiling under load."
        },
        {
          target: "MCP servers · 81.3k stars",
          title: "Guard GitLab enterprise repository search against crashes",
          status: "Open PR",
          href: "https://github.com/modelcontextprotocol/servers/pull/3611",
          summary:
            "Fixes an edge-case server response that can crash repository search and make MCP-backed enterprise integrations feel unreliable."
        },
        {
          target: "Anthropic Claude Agent SDK",
          title: "Route debug output away from the JSON protocol stream",
          status: "Open PR",
          href: "https://github.com/anthropics/claude-agent-sdk-typescript/pull/235",
          summary:
            "Moves ANTHROPIC_LOG=debug output to stderr so stdout remains valid JSON and the agent protocol does not corrupt itself during debugging."
        },
        {
          target: "CrewAI · 46.3k stars",
          title: "Provider-agnostic tool schema for Bedrock and Gemini MCP tools",
          status: "Open PR",
          href: "https://github.com/crewAIInc/crewAI/pull/4912",
          summary:
            "Improves provider portability so Bedrock and Gemini MCP tools behave more consistently instead of depending on provider-specific schema quirks."
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
    title: "Case Study: Internal AI Hackathon Winner",
    subtitle: "Amazon | TPM, applied AI, and production operations",
    summary:
      "My Amazon work is most interesting where TPM, technical systems, and operational decision-making overlap: taking complex optimization workflows and making them easier to tune, safer to operate, and faster for business teams to learn from.",
    award: "Most Innovative",
    impact: "1440 hours / year estimated savings",
    metrics: [
      {
        value: "$100M / year",
        label: "Network-speed upside",
        detail: "annualized value from node-level speed policy tuning"
      },
      {
        value: "200 nodes",
        label: "Weekly tuning scope",
        detail: "delivery-station level policy adjustment"
      },
      {
        value: "99.9%",
        label: "Metric accuracy",
        detail: "deterministic analysis on business-defined schemas"
      }
    ],
    workstreams: [
      {
        icon: "network",
        title: "MLOps-backed network optimization",
        detail:
          "Led SDE and research partners to introduce node-level parameters that trade extra truck expense against speed, while keeping delivery-promise compliance as a hard constraint. The program targeted annualized speed value on the order of $100M."
      },
      {
        icon: "workflow",
        title: "Simulation and experiment engine",
        detail:
          "Built an orchestration layer around Amazon's internal batch-simulation platform, with SQS-backed state handling, serverless analysis steps, deterministic ZIP preparation for 1-5 GB inputs, and LLM-assisted experiment setup."
      },
      {
        icon: "analytics",
        title: "Actuals over backtests",
        detail:
          "I rely on observed production metrics, not only backtest simulation, because the network changes continuously. That principle shaped the engine, the reporting layer, and the recommendation workflow used to shorten time-to-insight."
      }
    ],
    details: [
      "Paired deterministic analysis with probabilistic LLM summaries for recommendations and next-step planning.",
      "Used LLM chat as an interface for experiment intent, while keeping heavy file preparation and evaluation in explicit deterministic tooling.",
      "The work transfers well to TPM / AI platform roles: experiment architecture, metric design, stakeholder alignment, and operator usability."
    ]
  },
  whyAi: {
    title: "Why I care about AI systems",
    body:
      "Coming from strategy, law, consulting, and operations, I care less about model theater and more about whether an AI system can be trusted, measured, and owned by a real team.",
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
      },
      {
        icon: "bridge",
        title: "Technical depth with business context",
        detail: "I like systems rigorous enough for engineers and legible enough for operators and decision-makers."
      }
    ]
  },
  contact: {
    title: "Contact, code, and outside work",
    body:
      "GitHub is the best place to inspect current repos and PRs. LinkedIn gives the broader background. X and Instagram are intentionally lighter: more travel, photography, and life outside shipping systems.",
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
        "A live view of my main page on X. It is deliberately less formal than the rest of the site.",
      href: "https://twitter.com/ViajaryTragar"
    },
    instagram: {
      title: "Outside work",
      body:
        "Travel and photography are where I reset. These are pulled from some of the highest-liked public Instagram posts, kept intentionally secondary to the technical work.",
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
        },
        {
          imageSrc: "/ig-zermatt.jpg",
          title: "Gornergrat",
          likes: "256 likes",
          meta: "Zermatt | Matterhorn",
          href: "https://www.instagram.com/p/Br8YfDrhLJS/"
        }
      ]
    }
  }
};
