export const siteContent = {
  meta: {
    title: "Joaquin Hui Gomez | Reliable AI Systems",
    description:
      "AI infrastructure, evaluation, and agent orchestration - from production impact to open-source contributions across MCP and Anthropic's agent ecosystem.",
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
      "AI infrastructure, evaluation, and agent orchestration - from production impact to open-source contributions across MCP and Anthropic's agent ecosystem.",
    proofLine:
      "Internal AI hackathon winner | OSS contributor across MCP and Anthropic agent tooling | Amazon | Accenture | PwC",
    intro:
      "I am Joaquin Hui Gomez. I care about making AI systems more reliable, measurable, and useful in practice. My background combines practical automation work, consulting and digital transformation experience at Accenture and PwC, and a strategy-and-law foundation shaped by the University of St. Gallen and the University of Hong Kong.",
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
    credentials: [
      "Amazon hackathon winner",
      "Accenture + PwC digital transformation",
      "University of St. Gallen + HKU"
    ]
  },
  stats: {
    verifiedOn: "Last verified March 17, 2026",
    items: [
      { value: "17+", label: "Contributions", detail: "public OSS and benchmark work" },
      { value: "16", label: "Public repos", detail: "live GitHub profile count" },
      { value: "11", label: "Open PRs", detail: "active upstream contributions" },
      { value: "1440", label: "Hours per year", detail: "estimated internal ops impact" }
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
      "I care about the layer where AI stops being impressive in a demo and starts becoming trustworthy in practice. That means reliability under load, evaluation that can survive scrutiny, and orchestration patterns that create measurable outcomes for real teams.",
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
      }
    ]
  },
  contact: {
    title: "Contact and links",
    body:
      "The easiest way to reach me is through GitHub or LinkedIn. Those are also the best places to see current projects, public contributions, and ongoing AI systems work.",
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
