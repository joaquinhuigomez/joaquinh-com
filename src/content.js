export const siteContent = {
  meta: {
    title: "Joaquin Hui Gomez | Reliable AI Systems",
    description:
      "AI infrastructure, evaluation, and agent orchestration grounded in production work at Amazon and open-source contributions across MCP and Anthropic's agent ecosystem.",
    url: "https://joaquinh.com"
  },
  nav: [
    { label: "Projects", href: "#projects" },
    { label: "Open source", href: "#open-source" },
    { label: "Case study", href: "#case-study" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    eyebrow: "AI infrastructure | evaluation | agent orchestration",
    title: "I build reliable AI systems.",
    description:
      "AI infrastructure, evaluation, and agent orchestration grounded in production work at Amazon and open-source contributions across MCP and Anthropic's agent ecosystem.",
    proofLine:
      "Internal AI hackathon winner | OSS contributor across MCP and Anthropic agent tooling | Amazon | Accenture | PwC",
    intro:
      "I am Joaquin Hui Gomez, a London-based Program Manager at Amazon focused on making AI systems more reliable, measurable, and useful in practice. My route into this work runs through strategy, law, consulting, operations, and hands-on automation, which is why I care about systems that hold up beyond the demo.",
    buttons: [
      {
        label: "View GitHub",
        href: "https://github.com/joaquinhuigomez",
        external: true,
        style: "primary"
      },
      {
        label: "Open-source contributions",
        href: "#open-source",
        external: false,
        style: "secondary"
      },
      {
        label: "Contact",
        href: "#contact",
        external: false,
        style: "secondary"
      }
    ],
    quickFacts: [
      { label: "Current", value: "Amazon Program Manager" },
      { label: "Global", value: "Lived across 3 continents" },
      { label: "Languages", value: "6 fluent languages" },
      { label: "Technical", value: "3 AWS certifications" }
    ],
    snapshot: {
      imageSrc: "/portrait.jpg",
      imageAlt: "Portrait of Joaquin Hui Gomez",
      title: "Program Manager at Amazon",
      location: "London, United Kingdom",
      blurb:
        "Non-traditional on paper, technical in practice: cloud, automation, analytics, evaluation, and agent tooling."
    },
    credentials: [
      "St. Gallen M.A. | magna cum laude",
      "HKU LLB + BBA",
      "Ex-Accenture and PwC",
      "AI, cloud, and automation builder"
    ]
  },
  stats: {
    verifiedOn: "Last verified March 17, 2026 from GitHub profile and PR search",
    items: [
      { value: "17+", label: "Contributions", detail: "public OSS and benchmark work" },
      { value: "20", label: "Public repos", detail: "live GitHub profile count" },
      { value: "15", label: "Open PRs", detail: "active upstream contributions" },
      { value: "1440", label: "Hours / year", detail: "estimated internal ops impact" }
    ]
  },
  background: {
    title: "A non-traditional route into AI systems",
    intro:
      "Strategy, law, consulting, and operations gave me a bias toward systems that are legible, governable, and useful. That now shows up in how I build AI infrastructure, evaluation tooling, and agent workflows.",
    cards: [
      {
        eyebrow: "Experience",
        title: "Amazon, Accenture, PwC",
        detail:
          "Program management, automation, analytics, cloud migrations, and digital transformation in operationally demanding environments."
      },
      {
        eyebrow: "Education",
        title: "St. Gallen and HKU",
        detail:
          "M.A. in Strategy and International Management, magna cum laude, plus dual degrees in Law and Business."
      },
      {
        eyebrow: "Global context",
        title: "3 continents | 6 languages",
        detail:
          "Comfortable operating across cultures, disciplines, and stakeholder groups without losing execution speed."
      },
      {
        eyebrow: "Technical crossover",
        title: "From non-traditional to hands-on",
        detail:
          "Built technical depth through AI, Python, SQL, automation, and 3 AWS certifications despite starting outside a classic engineering track."
      }
    ],
    journey: [
      {
        period: "2023 - Present",
        title: "Amazon | Program Manager",
        detail: "Driving AI, software, and operational automation work in London."
      },
      {
        period: "2022",
        title: "Amazon | Business Analyst Intern",
        detail:
          "Worked across 30M+ rows, AWS-backed automation, and dashboards, then secured a full-time L5 offer before the internship ended."
      },
      {
        period: "2018 - 2021",
        title: "PwC and Accenture",
        detail:
          "Cloud, analytics, automation, and digital strategy work spanning Beijing and major client transformation programs."
      }
    ]
  },
  projects: [
    {
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
      "I contribute targeted fixes and improvements to AI infrastructure and agent ecosystems, especially where reliability, developer ergonomics, or protocol correctness matter.",
    featured: [
      {
        target: "Anthropic Agent SDK",
        title: "Fix debug logging corrupting JSON protocol",
        status: "Open PR",
        href: "https://github.com/anthropics/claude-agent-sdk-typescript/pull/235",
        summary: "Routes ANTHROPIC_LOG=debug output to stderr so JSON protocol traffic is not corrupted."
      },
      {
        target: "MCP servers",
        title: "Fix GitLab enterprise search crash",
        status: "Open PR",
        href: "https://github.com/modelcontextprotocol/servers/pull/3611",
        summary: "Guards GitLab repository search against undefined responses on enterprise instances."
      },
      {
        target: "MCP TypeScript SDK",
        title: "Skip structured content validation on error payloads",
        status: "Open PR",
        href: "https://github.com/modelcontextprotocol/typescript-sdk/pull/1690",
        summary: "Avoids client-side validation failures when MCP tools correctly return error payloads."
      },
      {
        target: "LiteLLM",
        title: "Fix concurrent TPM bypass race condition",
        status: "Open PR",
        href: "https://github.com/BerriAI/litellm/pull/23775",
        summary: "Reserves estimated tokens pre-call so concurrent requests cannot slip past the limiter."
      },
      {
        target: "FastChat",
        title: "Add judge consistency and position-bias metrics",
        status: "Open PR",
        href: "https://github.com/lm-sys/FastChat/pull/3810",
        summary: "Adds position-bias reporting and Cohen's kappa so llm_judge outputs are easier to trust."
      }
    ],
    extended: [
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
        title: "Proposed Jain's fairness index for team-level rate limiting",
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
        title: "Provider-agnostic tool schema for Bedrock and Gemini MCP tools",
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
    subtitle: "Amazon internal AI hackathon",
    award: "Most Innovative",
    impact: "1440 hours per year estimated savings",
    summary:
      "I built an agentic plus deterministic orchestration solution that won the Most Innovative award in Amazon's internal AI hackathon. The system focused on practical automation, structured control points, and measurable operational value rather than a demo-first experience.",
    details: [
      "Combined agentic reasoning with deterministic orchestration so workflows stayed useful under real operational constraints.",
      "Focused on measurable automation outcomes and clear control surfaces instead of opaque autonomous behavior.",
      "Estimated impact was roughly 1,440 hours per year in saved internal operational effort."
    ]
  },
  whyAi: {
    title: "Why I care about AI systems",
    body:
      "Coming from strategy, law, consulting, and operations, I care less about model theater and more about whether an AI system can be trusted, measured, and productively owned by a real team.",
    principles: [
      {
        title: "Reliability over novelty",
        detail: "If a system cannot be trusted under constraints, it is not ready for real work."
      },
      {
        title: "Evaluation before claims",
        detail: "I like tools and benchmarks that make model behavior measurable instead of anecdotal."
      },
      {
        title: "Orchestration for outcomes",
        detail: "The most useful AI work is often in the glue: routing, validation, fallback logic, and operational fit."
      },
      {
        title: "Technical depth with business context",
        detail: "I am most interested in systems that are rigorous enough for engineers and legible enough for operators and decision-makers."
      }
    ]
  },
  contact: {
    title: "Contact and links",
    body:
      "GitHub is the best place to see current repos and PRs. LinkedIn is the fastest way to get the broader background across AI, cloud, consulting, and operations.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/joaquinhuigomez",
        note: "Repos, PRs, and project history"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/joaquin-h-352927a9/",
        note: "Professional profile and background"
      }
    ]
  }
};
