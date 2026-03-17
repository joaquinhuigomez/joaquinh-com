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
    eyebrow: "AI infrastructure | evaluation | agent orchestration",
    lead: "I fix",
    title: "the quiet failures behind AI products.",
    description:
      "Concurrency bugs, evaluation noise, and agent-integration edge cases that decide whether AI systems actually work.",
    proofLine:
      "Amazon PM | 6 fluent languages | published judge benchmark | fixes across LiteLLM, Vercel AI SDK, MCP, and CrewAI",
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
        value: "6 fluent | PT + DE at B2"
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
      title: "Amazon Program Manager",
      location: "London, United Kingdom",
      blurb:
        "Working across SDE and research teams on experimentation, orchestration, and AI-driven operational systems."
    },
    intro:
      "Fluent: Cantonese, Mandarin, Taiwanese, English, Spanish, and French. Also Portuguese (B2) and German (B2).",
    credentials: [
      "St. Gallen magna cum laude",
      "HKU LLB + BBA",
      "Ex-Accenture | Ex-PwC"
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
      },
      {
        icon: "spark",
        label: "Builder DNA",
        detail:
          "Built and ran a 3K+ user forum at age 9. The instinct to build systems early has stayed constant."
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
      "Amazon PM work with technical scope, partnering with SDEs and research scientists to make optimization and experimentation systems easier to operate and learn from.",
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
    details: [
      "Built a simulation and experiment layer that combined deterministic analysis with LLM-assisted planning and summaries.",
      "Used actual production metrics, not only backtests, because the network changes continuously."
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
