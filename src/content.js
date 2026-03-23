export const siteContent = {
  meta: {
    title: "Joaquin Hui Gomez | AI Infrastructure Reliability",
    description:
      "AI infrastructure reliability across serving, evaluation, and agent orchestration, with Amazon work and open-source contributions across MCP and adjacent agent ecosystems.",
    url: "https://joaquinh.com"
  },
  openSourcePage: {
    meta: {
      title: "Joaquin Hui Gomez | Open-Source Contributions",
      description:
        "Merged upstream fixes, active platform contributions, and public reliability tooling across AI infrastructure, evaluation, and agent ecosystems.",
      url: "https://joaquinh.com/open-source/"
    },
    nav: [
      { label: "Home", href: "/" },
      { label: "Merged wins", href: "#merged" },
      { label: "Current work", href: "#current" },
      { label: "Public tools", href: "#tools" },
      { label: "GitHub", href: "https://github.com/joaquinhuigomez", external: true }
    ],
    intro: {
      eyebrow: "Open source record",
      title: "Shipped fixes, active platform work, and public reliability tooling",
      body:
        "This page is the denser version of the OSS story: what has already shipped upstream, what is currently in flight, and the public tools that sit underneath the contribution work.",
      note:
        "Last verified March 23, 2026 from live GitHub profile and PR history."
    },
    metrics: [
      { value: "45", label: "Public repos" },
      { value: "5", label: "Merged upstream" },
      { value: "24", label: "Open PRs" }
    ],
    merged: {
      title: "Merged upstream outcomes",
      note:
        "These are the highest-signal external wins to highlight first: concrete fixes, shipped into widely used projects.",
      items: [
        {
          target: "OpenAI Agents Python",
          title: "Merged fix preserving MCP and reasoning items during tool cleanup",
          status: "Merged Mar 21",
          href: "https://github.com/openai/openai-agents-python/pull/2700",
          summary:
            "Helps agent teams keep tool-state transitions reliable instead of silently dropping structured context during cleanup flows.",
          stars: "20.2k",
          tags: ["Merged PR", "Agent reliability", "Python", "MCP"]
        },
        {
          target: "Mastra",
          title: "Merged MCP tool-response interoperability fix",
          status: "Merged Mar 18",
          href: "https://github.com/mastra-ai/mastra/pull/14372",
          summary:
            "Prevents tool output from disappearing in agent workflows, which matters directly for operator trust and debugging quality.",
          stars: "22.2k",
          tags: ["Merged PR", "MCP", "Interoperability", "Agent reliability"]
        },
        {
          target: "Docling",
          title: "Merged Windows CLI reliability fix for directory input handling",
          status: "Merged Mar 19",
          href: "https://github.com/docling-project/docling/pull/3149",
          summary:
            "Turns an avoidable CLI failure into a cleaner operator experience for teams processing document workloads across environments.",
          stars: "56.3k",
          tags: ["Merged PR", "CLI reliability", "Documents", "Operator UX"]
        },
        {
          target: "Phoenix",
          title: "Merged tracing export fix for cleaner observability usage",
          status: "Merged Mar 19",
          href: "https://github.com/Arize-ai/phoenix/pull/12201",
          summary:
            "Improves the tracing path teams rely on when they need observability that is easy to integrate instead of fragile at the edges.",
          stars: "9.0k",
          tags: ["Merged PR", "Observability", "Tracing", "JavaScript"]
        },
        {
          target: "everything-claude-code",
          title: "Agent Eval adopted as a Claude Code skill in a 100k+ star repository",
          status: "Merged Mar 20",
          href: "https://github.com/affaan-m/everything-claude-code/pull/540",
          summary:
            "External adoption proof that the agent-evaluation work is useful beyond my own repos and practical enough for other builders to pick up quickly.",
          stars: "100.7k",
          tags: ["Merged PR", "Distribution", "Agent evaluation", "OSS adoption"]
        }
      ]
    },
    current: {
      title: "Selected current upstream work",
      note:
        "A curated set of still-open PRs with clear platform, product, or operator relevance. Closed or lower-signal work stays off the page.",
      items: [
        {
          target: "MCP servers",
          title: "Guard GitLab enterprise repository search against crashes",
          status: "Open PR",
          href: "https://github.com/modelcontextprotocol/servers/pull/3611",
          summary:
            "Improves enterprise reliability by preventing a crash path in GitLab repository search, where one edge case can take out a useful workflow.",
          stars: "81.9k",
          tags: ["Enterprise reliability", "MCP", "GitLab", "TypeScript"]
        },
        {
          target: "Vercel AI SDK",
          title: "Prevent SSRF bypass via DNS rebinding",
          status: "Open PR",
          href: "https://github.com/vercel/ai/pull/13512",
          summary:
            "Targets a security issue that matters directly for platform trust when AI systems fetch and validate external resources.",
          stars: "22.9k",
          tags: ["Security", "Platform trust", "SSRF", "TypeScript"]
        },
        {
          target: "CrewAI",
          title: "Provider-agnostic tool schema for Bedrock and Gemini MCP tools",
          status: "Open PR",
          href: "https://github.com/crewAIInc/crewAI/pull/4912",
          summary:
            "Improves portability across providers so teams do not have to treat tool usage as provider-specific glue code.",
          stars: "47.0k",
          tags: ["Portability", "MCP", "Schema design", "TypeScript"]
        },
        {
          target: "Anthropic Claude Agent SDK",
          title: "Route debug output away from the JSON protocol stream",
          status: "Open PR",
          href: "https://github.com/anthropics/claude-agent-sdk-typescript/pull/235",
          summary:
            "Keeps debugging usable without corrupting the protocol stream, which matters when teams need both traceability and stable execution.",
          stars: "1.0k",
          tags: ["Protocol reliability", "Anthropic", "Debugging", "TypeScript"]
        },
        {
          target: "Ollama",
          title: "Fix streaming timeout during tool-call composition",
          status: "Open PR",
          href: "https://github.com/ollama/ollama/pull/14932",
          summary:
            "Addresses a timeout edge case in tool-call composition that can turn an otherwise healthy workflow into a fragile one under load.",
          stars: "166.0k",
          tags: ["Streaming", "Tool calling", "Reliability", "Go"]
        },
        {
          target: "Microsoft AutoGen",
          title: "Fix extra_body being silently dropped during component loading",
          status: "Open PR",
          href: "https://github.com/microsoft/autogen/pull/7421",
          summary:
            "Preserves structured configuration instead of losing it silently, which is the kind of failure that wastes time because it looks like user error.",
          stars: "56.1k",
          tags: ["Configuration", "Agent platform", "Reliability", "Python"]
        }
      ]
    },
    tools: {
      title: "Public tools and published evidence",
      note:
        "The upstream contribution work is backed by standalone public projects and benchmarks rather than drive-by patches.",
      items: [
        {
          target: "LLM Judge Calibrator",
          title: "Published 6-model judge reliability benchmark with Cohen's kappa",
          status: "Published",
          href: "https://github.com/joaquinhuigomez/llm-judge-calibrator/blob/master/benchmark/RESULTS.md",
          summary:
            "Turns evaluator reliability into something teams can measure before trusting it in model-selection or regression decisions.",
          tags: ["LLM eval", "Benchmarking", "Decision quality", "Reliability"]
        },
        {
          target: "Token-Aware Rate Limiter",
          title: "Reference implementation for multi-tenant LLM rate limiting",
          status: "Shipped",
          href: "https://github.com/joaquinhuigomez/token-aware-rate-limiter",
          summary:
            "A public implementation grounded in fairness metrics, atomic Redis design, and real-time observability for LLM API workloads.",
          tags: ["Rate limiting", "Redis", "Fairness", "Python"]
        },
        {
          target: "Agent Eval",
          title: "Head-to-head coding-agent harness with external distribution proof",
          status: "Shipped",
          href: "https://github.com/joaquinhuigomez/agent-eval",
          summary:
            "Built to compare coding agents on pass rate, cost, time, and consistency, then later adopted externally as a Claude Code skill.",
          tags: ["Agent evaluation", "Execution", "OSS adoption", "Python"]
        },
        {
          target: "GitHub profile",
          title: "Live merged PR record and current contribution pipeline",
          status: "Live",
          href: "https://github.com/joaquinhuigomez",
          summary:
            "The profile remains the fastest way to inspect the full repo history, merged work, and the active contribution pipeline in one place.",
          tags: ["GitHub", "Live record", "Public proof", "History"]
        }
      ]
    }
  },
  nav: [
    { label: "Profile", href: "#proof" },
    { label: "Projects", href: "#projects" },
    { label: "Verba", href: "/labs/verba/" },
    { label: "Open source", href: "#open-source" },
    { label: "Amazon", href: "#case-study" },
    { label: "Contact", href: "#contact" }
  ],
  hero: {
    eyebrow: "AI infrastructure | MLOps | agent orchestration",
    lead: "I lead and build",
    title: "AI systems teams can trust in production.",
    description:
      "I work on the side of AI that survives contact with reality: better decisions, cleaner execution, and systems people can actually run.",
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
        title: "AI infrastructure quality layer",
        summary:
          "Public work focused on the reliability layer underneath AI products: tool integration, evaluation trust, and operator-safe system behavior.",
        bullets: [
          "Merged fixes in OpenAI Agents Python and Mastra",
          "Shipped support across observability and document-tooling workflows in Phoenix and Docling",
          "Current work in Vercel AI SDK, MCP servers, and adjacent agent platforms"
        ],
        href: "/open-source/",
        cta: "Open the OSS record"
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
          "Built tooling before pushing ideas upstream"
        ],
        href: "/open-source/#tools",
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
          "Agent-evaluation work later adopted as a Claude Code skill externally"
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
        label: "Verba",
        href: "/labs/verba/",
        external: false,
        style: "secondary",
        icon: "workflow"
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
              label: "Latin America",
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
        value: "6 NLs + Python / SQL",
        popover: {
          kind: "languages",
          title: "Natural and programming languages I work in",
          summary:
            "Fluent across six spoken languages, plus production Python and SQL with Shell / CLI-based workflows.",
          naturalItems: [
            { flag: "🇭🇰", label: "Cantonese", level: "Fluent" },
            { flag: "🇨🇳", label: "Mandarin", level: "Fluent" },
            { flag: "🇹🇼", label: "Taiwanese", level: "Fluent" },
            { flag: "🇬🇧", label: "English", level: "Fluent" },
            { flag: "🇪🇸", label: "Spanish", level: "Fluent" },
            { flag: "🇫🇷", label: "French", level: "Fluent" },
            { flag: "🇵🇹", label: "Portuguese", level: "B2" },
            { flag: "🇩🇪", label: "German", level: "B2" }
          ],
          programmingItems: [
            {
              label: "Python",
              meta: "~8 years overall | ~5 years in production",
              detail:
                "I use Python across automation, AI integrations, schema validation, and AWS serverless workflows, with particular depth in Pydantic, deterministic tooling, and agent-compatible system design. My edge is translating messy business logic into structured, reliable software.",
              tags: ["Automation", "Pydantic", "Serverless", "AI integrations"]
            },
            {
              label: "SQL / Data",
              meta: "Analytics, pipelines, dashboards, reporting systems",
              detail:
                "Strong hands-on SQL, analytics, and data-engineering experience across large operational datasets. I build pipelines, metrics, dashboards, and reporting systems that turn messy raw data into reliable business signals and decisions, especially in AWS-native environments.",
              tags: ["SQL", "Data engineering", "Dashboards", "AWS-native"]
            }
          ]
        }
      },
      {
        icon: "certificate",
        label: "Technical scope",
        value: "AWS, Python, AI infra",
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
            "Merged fixes in OpenAI Agents Python, Mastra, Phoenix, and Docling; active work continues across adjacent AI platforms"
          ],
          tags: ["AWS", "Serverless", "Python", "TypeScript", "LLM eval", "AI infra"]
        }
      }
    ],
    snapshot: {
      brandIcon: "amazon",
      imageSrc: "/portrait-night.png",
      imageAlt: "Portrait of Joaquin Hui Gomez",
      title: "Amazon Program Manager",
      location: "London, United Kingdom",
      blurb:
        "Amazon PM operating at the intersection of program leadership and technical execution across MLOps, experimentation, serverless orchestration, and AI-enabled operations.",
      detail:
        "I work across operators, business stakeholders, SDEs, and research scientists to turn ambiguous operational problems into production decision systems with measurable financial impact.",
      tags: ["#MLOps", "#Serverless", "#AIInfra", "#ProgramLeadership", "#LLMEval"]
    },
    credentials: [
      "St. Gallen magna cum laude",
      "HKU LLB + BBA",
      "Amazon · Accenture · PwC"
    ]
  },
  stats: {
    verifiedOn: "Last verified March 23, 2026 from GitHub profile and live PR history.",
    items: [
      { value: "5", label: "Merged upstream", detail: "external repos only" },
      { value: "45", label: "Public repos", detail: "live GitHub profile count" },
      { value: "24", label: "Open PRs", detail: "selected work still in review" },
      { value: "1440", label: "Hours / year", detail: "estimated internal ops impact" }
    ]
  },
  profile: {
    title: "Operator profile",
    body:
      "I work where product judgment meets technical execution: taking ambiguous AI opportunities, turning them into operating systems teams can trust, and staying close enough to the stack to know what will break in production.",
    chips: ["Amazon", "Accenture", "PwC", "St. Gallen", "HKU", "London"],
    notes: [
      {
        icon: "amazon",
        label: "Amazon PM",
        detail:
          "Program leadership with technical scope across logistics optimization, orchestration, and AI-enabled operations.",
        popover: {
          kind: "note",
          title: "Amazon PM operating context",
          body:
            "I worked across Amazon's first, middle, and last mile to solve network-level problems across the EU and globally, often on programs tied to SVP strategic goals. I led a team and processes handling 50+ dynamic inputs and 30+ metrics while managing ML parameter changes across 200+ nodes affecting 100,000+ trucks weekly across the EU. That operating context is why I build AI systems with a strong bias toward governance, reliable execution, automated validation, and AI audits that combine agentic workflows with deterministic tools. Under my program leadership, two ML launches before Q4 peak helped deliver record reductions in delivery misses and the fastest network speed from 2024 to 2025."
        }
      },
      {
        icon: "cap",
        label: "Master's",
        detail:
          "University of St. Gallen | M.A. in Strategy and International Management, magna cum laude."
      },
      {
        icon: "scale",
        label: "HKU undergraduate",
        detail:
          "The University of Hong Kong | dual degrees in Law and Business.",
        popover: {
          kind: "note",
          title: "HKU legal and business training",
          body:
            "My legal training influences how I build AI systems: not as unconstrained generation engines, but as systems operating within explicit rules, authorities, and validation layers. I believe a large share of legal and policy-intensive work can be accelerated by AI when supported by strong knowledge infrastructure, retrieval systems, and policy-aware validation. That is why I favor a policy-as-code and strict version-control approach; it is the same rigor and insist-on-the-highest-standard mindset that written laws demand."
        }
      },
      {
        icon: "spark",
        label: "DEI and community",
        detail:
          "Led the Ninos en Xela Guatemala NGO initiative in 2019 to help farmers grow communal income through organic farming and strategic planning; also active in Glamazon and Asian & Latino affinity groups at Amazon."
      }
    ]
  },
  thesis: {
    eyebrow: "Research highlight",
    title: "Master Thesis (University of St. Gallen)",
    meta: "2024 · Supervisor: Dr. Edona Elshan",
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
      icon: "tarot",
      title: "Tarot Truth Teller",
      href: "https://tarot.joaquinh.com/",
      external: true,
      ctaLabel: "Open tarot app",
      topline: "Fun AI project",
      theme: "tarot",
      featured: true,
      description:
        "A multilingual AI tarot miniapp with Telegram-native flows, shareable reading cards, and a voice that is sharp, honest, and a little bit funny.",
      highlights: [
        "multilingual readings",
        "Telegram mini app",
        "shareable reading cards"
      ]
    },
    {
      icon: "workflow",
      title: "Verba",
      href: "/labs/verba/case-study/",
      external: false,
      ctaLabel: "Read case study",
      description:
        "A premium multilingual speech-to-draft product with raw transcript preservation, ambiguity surfacing, and benchmark-backed eval loops.",
      highlights: [
        "raw vs processed separation",
        "uncertainty flags",
        "correction logging"
      ]
    },
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
        "adopted in 100k+ star repo"
      ]
    }
  ],
  openSource: {
    intro:
      "I contribute to the reliability layer underneath AI products: the security, interoperability, evaluation trust, and execution details that decide whether teams can actually ship them.",
    statusNote:
      "Updated March 23, 2026 from live GitHub history. Homepage highlights shipped upstream outcomes first; deeper detail lives on the dedicated OSS page.",
    narrative: {
      title: "Why this matters for product teams",
      body:
        "When AI systems fail, it rarely looks dramatic. It looks like bad decisions, brittle handoffs, unclear ownership, and teams slowing down because they no longer trust the system.",
      commercial:
        "That is the layer I like working on: choosing the failure modes worth fixing, aligning people around them, and pushing changes through shared infrastructure.",
      failureModes: [
        {
          title: "Trust",
          detail: "Silent breakage turns into confused operators, fragile launches, and lost confidence."
        },
        {
          title: "Velocity",
          detail: "Weak evaluation or brittle tooling slows teams because they cannot trust the signal."
        },
        {
          title: "Economics",
          detail: "Reliability gaps show up as wasted time, extra cost, and harder scaling decisions."
        }
      ]
    },
    githubPanel: {
      title: "GitHub is the live proof layer",
      body:
        "GitHub is the clearest public record of how I work: shipped tools, merged upstream fixes, and a still-active contribution pipeline across the AI tooling stack.",
      metrics: [
        { value: "45", label: "Public repos" },
        { value: "5", label: "Merged upstream" },
        { value: "24", label: "Open PRs" }
      ],
      links: [
        {
          label: "Profile",
          href: "https://github.com/joaquinhuigomez",
          icon: "github"
        },
        {
          label: "Full OSS page",
          href: "/open-source/",
          icon: "spark",
          external: false
        }
      ]
    },
    shipped: {
      title: "Selected shipped wins",
      note: "Four homepage cards, each chosen for product consequence and team-level signal.",
      items: [
        {
          target: "OpenAI Agents Python",
          title: "Merged fix preserving MCP and reasoning items during tool cleanup",
          status: "Merged Mar 21",
          href: "https://github.com/openai/openai-agents-python/pull/2700",
          summary:
            "Keeps agent-system state reliable during cleanup flows, so teams do not lose structured context in a place that is hard to debug after the fact.",
          stars: "20.2k",
          tags: ["Merged PR", "Agent reliability", "Python", "MCP"]
        },
        {
          target: "Mastra",
          title: "Merged MCP tool-response interoperability fix",
          status: "Merged Mar 18",
          href: "https://github.com/mastra-ai/mastra/pull/14372",
          summary:
            "Prevents tool output from disappearing in agent workflows, which matters directly for operator trust and debugging quality.",
          stars: "22.2k",
          tags: ["Merged PR", "Interoperability", "MCP", "Agent reliability"]
        },
        {
          target: "Docling",
          title: "Merged Windows CLI reliability fix for directory input handling",
          status: "Merged Mar 19",
          href: "https://github.com/docling-project/docling/pull/3149",
          summary:
            "Turns an avoidable CLI failure into a cleaner operator experience for teams running document-processing workloads across environments.",
          stars: "56.3k",
          tags: ["Merged PR", "CLI reliability", "Operator UX", "Documents"]
        },
        {
          target: "Phoenix",
          title: "Merged tracing export fix for cleaner observability usage",
          status: "Merged Mar 19",
          href: "https://github.com/Arize-ai/phoenix/pull/12201",
          summary:
            "Improves a tracing path teams rely on when they need observability that is easy to wire in instead of fragile at the edges.",
          stars: "9.0k",
          tags: ["Merged PR", "Observability", "Tracing", "JavaScript"]
        }
      ]
    },
    cta: {
      label: "See full OSS record",
      href: "/open-source/"
    }
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
  }
};
