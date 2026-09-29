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
        "28 merged upstream PRs and 40 active PRs across 45 external AI infrastructure repos. First-party contributions to Anthropic, OpenAI, HuggingFace, Microsoft, Meta, Vercel, and Stripe codebases. Coverage spans LLM serving, agent frameworks, RAG, document AI, voice agents, observability, and security — the reliability layer underneath AI products.",
      note:
        "Last verified April 26, 2026 from GitHub profile and live public PR history."
    },
    metrics: [
      { value: "45", label: "Repos contributed to" },
      { value: "28", label: "Merged upstream" },
      { value: "40", label: "Open PRs" }
    ],
    merged: {
      title: "Merged upstream outcomes",
      note:
        "Top-signal merges across the AI infrastructure stack: HuggingFace Transformers (LLM serving), Docling and LlamaIndex (document AI and RAG), LiteLLM and Ray (serving and orchestration), Continue and OpenAI Agents Python and Mastra (agent and tool-calling ecosystems).",
      items: [
        {
          target: "HuggingFace Transformers",
          title: "Merged generation fix removing stale num_return_sequences warning on continuous batching",
          status: "Merged Apr 24",
          href: "https://github.com/huggingface/transformers/pull/45582",
          summary:
            "Cleaned up a generation warning that fired incorrectly on the continuous-batching path, keeping production inference logs honest in the canonical LLM serving library.",
          stars: "159.9k",
          tags: ["Merged PR", "LLM serving", "Continuous batching", "Python"]
        },
        {
          target: "Docling",
          title: "Merged Windows CLI PermissionError fix for document conversion",
          status: "Merged Mar 19",
          href: "https://github.com/docling-project/docling/pull/3149",
          summary:
            "Fixed a Windows CLI failure path that blocked document conversion workflows, making the document-to-data pipeline usable across environments instead of failing on a common local setup.",
          stars: "58.6k",
          tags: ["Merged PR", "Document AI", "Cross-platform", "Python"]
        },
        {
          target: "LlamaIndex",
          title: "Merged input_file serialization fix for the Responses API",
          status: "Merged Mar 27",
          href: "https://github.com/run-llama/llama_index/pull/21172",
          summary:
            "Fixed nested serialization for file-based Responses API inputs, keeping retrieval and document-processing flows stable as teams adopt the newer OpenAI interface.",
          stars: "48.9k",
          tags: ["Merged PR", "RAG", "Serialization", "Python"]
        },
        {
          target: "LiteLLM",
          title: "Merged TTFT capture for /v1/messages across Anthropic, Bedrock, and Vertex",
          status: "Merged Apr 16",
          href: "https://github.com/BerriAI/litellm/pull/25599",
          summary:
            "Added time-to-first-token instrumentation on the Anthropic-style streaming path so multi-provider LLM gateways can report consistent latency metrics across Bedrock, Vertex, and Anthropic backends.",
          stars: "44.7k",
          tags: ["Merged PR", "LLM serving", "Streaming metrics", "Python"]
        },
        {
          target: "Ray",
          title: "Merged Serve autoscaling timing fix for delayed scale-up behavior",
          status: "Merged Apr 3",
          href: "https://github.com/ray-project/ray/pull/62144",
          summary:
            "Corrected Serve autoscaling timing so scale-up decisions happen on the intended wall-clock path instead of drifting under real traffic patterns.",
          stars: "42.3k",
          tags: ["Merged PR", "Distributed compute", "Autoscaling", "Python"]
        },
        {
          target: "Continue",
          title: "Merged Ollama MCP tool-calling fix for Mistral and Gemma3 models",
          status: "Merged Mar 24",
          href: "https://github.com/continuedev/continue/pull/11523",
          summary:
            "Improves tool-calling reliability in a widely used AI coding environment, which matters directly when teams want local-model workflows that behave predictably instead of failing at model-specific edges.",
          stars: "32.8k",
          tags: ["Merged PR", "Tool calling", "Ollama", "Developer workflows"]
        },
        {
          target: "OpenAI Agents Python",
          title: "Merged fix preserving MCP and reasoning items during tool cleanup",
          status: "Merged Mar 21",
          href: "https://github.com/openai/openai-agents-python/pull/2700",
          summary:
            "Helps agent teams keep tool-state transitions reliable instead of silently dropping structured context during cleanup flows.",
          stars: "25.2k",
          tags: ["Merged PR", "Agent reliability", "Python", "MCP"]
        },
        {
          target: "Mastra",
          title: "Merged MCP tool-response interoperability fix",
          status: "Merged Mar 18",
          href: "https://github.com/mastra-ai/mastra/pull/14372",
          summary:
            "Prevents tool output from disappearing in agent workflows, which matters directly for operator trust and debugging quality.",
          stars: "23.3k",
          tags: ["Merged PR", "MCP", "Interoperability", "Agent reliability"]
        }
      ]
    },
    current: {
      title: "Selected current upstream work",
      note:
        "A curated set of 40 still-open upstream PRs as of April 26, 2026, led by two direct contributions to Anthropic codebases (Claude Cookbooks and the Anthropic Go SDK) plus active reliability work in Microsoft, Vercel, Chroma, and major agent platforms.",
      items: [
        {
          target: "Anthropic Cookbooks",
          title: "Update outdated model list and fix typos in citations notebook",
          status: "Open PR",
          href: "https://github.com/anthropics/claude-cookbooks/pull/444",
          summary:
            "Refreshes the canonical Claude cookbook so the citations notebook matches the current model lineup, keeping the entry point teams hit first when building on Anthropic accurate.",
          stars: "41.5k",
          tags: ["Open PR", "Anthropic", "Documentation", "Jupyter Notebook"]
        },
        {
          target: "Anthropic Go SDK",
          title: "Make ToolResultBlockParam accept both string and array content",
          status: "Open PR",
          href: "https://github.com/anthropics/anthropic-sdk-go/pull/297",
          summary:
            "Closes a tool-result content gap in the Go SDK so Anthropic-backed agents in Go ecosystems can pass structured tool output without custom marshaling.",
          stars: "1.0k",
          tags: ["Open PR", "Anthropic", "Tool calling", "Go"]
        },
        {
          target: "Docling",
          title: "Add timeout-specific conversion status for document pipelines",
          status: "Approved",
          href: "https://github.com/docling-project/docling/pull/3211",
          summary:
            "Separates document-level timeouts from page-level failures so downstream systems can distinguish partial output from actual page conversion breakage.",
          stars: "58.6k",
          tags: ["Approved PR", "Document AI", "Reliability", "Python"]
        },
        {
          target: "LlamaIndex",
          title: "Propagate Anthropic thinking_delta through streaming additional_kwargs",
          status: "Approved",
          href: "https://github.com/run-llama/llama_index/pull/21423",
          summary:
            "Bridges Anthropic's reasoning-delta stream into LlamaIndex's standard streaming surface so RAG pipelines can surface model thinking without custom adapters.",
          stars: "48.9k",
          tags: ["Approved PR", "RAG", "Anthropic", "Python"]
        },
        {
          target: "CrewAI",
          title: "Provider-agnostic tool schema for Bedrock and Gemini MCP tools",
          status: "Open PR",
          href: "https://github.com/crewAIInc/crewAI/pull/4912",
          summary:
            "Improves portability across providers so teams do not have to treat tool usage as provider-specific glue code.",
          stars: "49.9k",
          tags: ["Open PR", "Portability", "MCP", "Python"]
        },
        {
          target: "Microsoft Semantic Kernel",
          title: "Fix TextChunker token-count threshold for orphan chunk merging",
          status: "Open PR",
          href: "https://github.com/microsoft/semantic-kernel/pull/13714",
          summary:
            "Switches the TextChunker merge heuristic from word count to token count, keeping RAG ingestion accurate against the embedding model's actual budget rather than an English-shaped approximation.",
          stars: "27.7k",
          tags: ["Open PR", "Microsoft", "RAG", "C#"]
        },
        {
          target: "Chroma",
          title: "Migrate HuggingFace embedding endpoint from deprecated api-inference to router",
          status: "Open PR",
          href: "https://github.com/chroma-core/chroma/pull/6770",
          summary:
            "Updates the HuggingFace embedding integration in Chroma's vector store to the supported router endpoint, keeping a leading vector DB current as upstream deprecates the old route.",
          stars: "27.6k",
          tags: ["Open PR", "Vector DB", "Embeddings", "Rust"]
        },
        {
          target: "Vercel AI SDK",
          title: "Prevent SSRF bypass via DNS rebinding",
          status: "Open PR",
          href: "https://github.com/vercel/ai/pull/13512",
          summary:
            "Targets a security issue that matters directly for platform trust when AI systems fetch and validate external resources.",
          stars: "23.8k",
          tags: ["Open PR", "Security", "SSRF", "TypeScript"]
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
            "Built to compare coding agents on pass rate, cost, time, and consistency, then later adopted externally in a widely used coding-agent resource.",
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
      "Skip-level L5 return offer during hiring freeze · consistently rated Exceeds · $140MM+ cumulative savings · 28 merged PRs across HuggingFace, Docling, LlamaIndex, LiteLLM, Ray, Continue · active PRs in Anthropic, Microsoft, Vercel",
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
        icon: "github",
        label: "#OpenSource",
        title: "Open-source contribution track record",
        summary:
          "Public engineering shipped into first-party AI codebases at Anthropic, OpenAI, HuggingFace, and Microsoft — visible, reviewable, and running in other teams' production paths.",
        bullets: [
          "28 merged upstream PRs across external repositories as of April 26, 2026",
          "68 tracked external public contributions across 45 repositories",
          "Current work in Anthropic Cookbooks, Anthropic Go SDK, Microsoft Semantic Kernel, Chroma, and Vercel AI"
        ],
        href: "/open-source/",
        cta: "Inspect the OSS record"
      },
      {
        icon: "network",
        label: "#AIInfra",
        title: "AI infrastructure quality layer",
        summary:
          "Public work on the reliability layer underneath AI products: LLM serving, agent frameworks, document AI, voice agents, and the integration glue that breaks first.",
        bullets: [
          "Merged fixes in HuggingFace Transformers, Docling, LlamaIndex, LiteLLM, Ray, Continue, OpenAI Agents Python, and Mastra",
          "Coverage across LLM serving, agent frameworks, RAG, document AI, voice agents, observability, and tool calling",
          "Current work in Anthropic, Microsoft, Vercel, Chroma, and adjacent agent platforms"
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
          "Agent-evaluation work later adopted externally in a major coding-agent resource"
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
    accentBadge: {
      icon: "github",
      value: "28",
      label: "Merged upstream",
      href: "https://github.com/pulls?q=is%3Apr+author%3Ajoaquinhuigomez+is%3Amerged+-user%3Ajoaquinhuigomez+sort%3Aupdated-desc",
      external: true
    },
    quickFacts: [
      {
        icon: "briefcase",
        label: "Current role",
        value: "Amazon PM | $100MM+/yr",
        popover: {
          kind: "role",
          title: "Amazon PM with ML product scope",
          summary:
            "Program management across PM, SDE, research, and Ops, focused on defining and launching ML decision systems under real operational constraints.",
          metrics: [
            { value: "$100MM+/yr", label: "Node-level speed impact" },
            { value: "$14MM", label: "Finance-validated savings" },
            { value: "1,440 hrs/yr", label: "Manual work removed" }
          ],
          bullets: [
            "Received a skip-level return offer from L4 to L5 during the hiring-freeze period",
            "Consistently rated Exceeds and delivered cumulative $140MM+ savings over my career",
            "Owned BRD / requirements artifacts and launch alignment for new generations of ML policy and simulation products used by operations",
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
          defaultRegionId: "europe",
          defaultLocationId: "london",
          regions: [
            {
              id: "europe",
              label: "Europe"
            },
            {
              id: "asia",
              label: "Asia"
            },
            {
              id: "latam",
              label: "Latin America"
            }
          ],
          locations: [
            {
              id: "london",
              label: "London",
              flag: "🇬🇧",
              regionId: "europe",
              marker: { x: 181, y: 66 },
              labelAnchor: { x: 108, y: 18, align: "start" },
              isCurrent: true,
              title: "Amazon Program Manager",
              summary:
                "Current base in London, leading AI-enabled operations and ML product execution across planning, orchestration, and launch in Amazon EU."
            },
            {
              id: "luxembourg",
              label: "Luxembourg",
              flag: "🇱🇺",
              regionId: "europe",
              marker: { x: 188, y: 74 },
              labelAnchor: { x: 204, y: 86, align: "start" },
              title: "Amazon Business Analyst Intern",
              summary:
                "Internship footprint where analytics, automation, and cloud planning work led to a skip-level return offer during the hiring freeze."
            },
            {
              id: "switzerland",
              label: "Switzerland",
              flag: "🇨🇭",
              regionId: "europe",
              marker: { x: 176, y: 82 },
              labelAnchor: { x: 92, y: 92, align: "start" },
              title: "University of St. Gallen",
              summary:
                "Master's in Strategy and International Management, magna cum laude, including a GenAI thesis on LLMs, agents, and governance."
            },
            {
              id: "hong-kong",
              label: "Hong Kong",
              flag: "🇭🇰",
              regionId: "asia",
              marker: { x: 288, y: 86 },
              labelAnchor: { x: 246, y: 116, align: "start" },
              title: "The University of Hong Kong",
              summary:
                "LLB + BBA foundation with scholarships, debating-society leadership, and the business-law base that shaped later product judgment."
            },
            {
              id: "beijing",
              label: "Beijing",
              flag: "🇨🇳",
              regionId: "asia",
              marker: { x: 278, y: 62 },
              labelAnchor: { x: 220, y: 18, align: "start" },
              title: "PwC Consultant",
              summary:
                "Worked on China-market entry, HR digitization, and digital strategy projects for major clients while based in Beijing."
            },
            {
              id: "shanghai",
              label: "Shanghai",
              flag: "🇨🇳",
              regionId: "asia",
              marker: { x: 298, y: 73 },
              labelAnchor: { x: 274, y: 54, align: "start" },
              title: "Greater China market footprint",
              summary:
                "Client-facing work tied to China expansion and digital strategy across Greater China, complementing the Beijing consulting base."
            },
            {
              id: "chile",
              label: "Chile",
              flag: "🇨🇱",
              regionId: "latam",
              marker: { x: 73, y: 141 },
              labelAnchor: { x: 36, y: 152, align: "start" },
              title: "Pontificia Universidad Catolica de Chile",
              summary:
                "Exchange experience in Chile that expanded Latin American context and sharpened cross-cultural operating range."
            },
            {
              id: "colombia",
              label: "Colombia",
              flag: "🇨🇴",
              regionId: "latam",
              marker: { x: 86, y: 90 },
              labelAnchor: { x: 34, y: 52, align: "start" },
              title: "Universidad de los Andes",
              summary:
                "Master's exchange focused on Latin American economy, accounting rules, and business context."
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
            "Merged fixes in HuggingFace Transformers, Docling, LlamaIndex, LiteLLM, Ray, Continue, OpenAI Agents Python, and Mastra; active work continues in Anthropic, Microsoft, Vercel, Chroma, and adjacent AI platforms"
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
        "Amazon PM operating at the intersection of product leadership and technical execution across MLOps, experimentation, serverless orchestration, and AI-enabled operations.",
      detail:
        "I define requirements, metrics, and launch paths for operator-facing ML systems, then work across business stakeholders, SDEs, and scientists to get them into production.",
      tags: ["#MLOps", "#Serverless", "#OpenSource", "#AIInfra", "#ProgramLeadership", "#LLMEval"]
    },
    credentials: [
      "St. Gallen magna cum laude",
      "HKU LLB + BBA",
      "Amazon · Accenture · PwC"
    ]
  },
  stats: {
    verifiedOn: "Last verified April 26, 2026 from GitHub profile and live public PR history.",
    items: [
      { value: "28", label: "Merged upstream", detail: "external repos only" },
      { value: "45", label: "Repos contributed to", detail: "across the AI tooling stack" },
      { value: "68", label: "Public contributions", detail: "merged + open external PRs tracked" },
      { value: "1.11M+", label: "Combined repo stars", detail: "across contributed repositories" }
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
          "ML product and program leadership across logistics optimization, orchestration, and AI-enabled operations. Active open-source contributor to AI infrastructure (28 merged PRs).",
        popover: {
          kind: "note",
          title: "Amazon PM operating context",
          body:
            "I worked across Amazon's first, middle, and last mile to solve network-level problems across the EU and globally, often on programs tied to SVP strategic goals. I led a team and processes handling 50+ dynamic inputs and 30+ metrics while managing ML parameter changes across 200+ nodes affecting 100,000+ trucks weekly across the EU. A core part of that role was turning ambiguous operational problems into launched ML products with clear requirements, decision logic, and measurable outcomes. That operating context is why I build AI systems with a strong bias toward governance, reliable execution, automated validation, and AI audits that combine agentic workflows with deterministic tools. Under my program leadership, two ML launches before Q4 peak helped deliver record reductions in delivery misses and the fastest network speed from 2024 to 2025."
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
      "28 PRs merged into the AI infrastructure stack — HuggingFace Transformers, Docling, LlamaIndex, LiteLLM, Ray, Continue, OpenAI Agents Python, and Mastra — plus 40 active PRs across Anthropic Cookbooks, the Anthropic Go SDK, Microsoft Semantic Kernel, Chroma, and Vercel AI. Coverage spans LLM serving, agent frameworks, RAG, document AI, voice agents, observability, and security: the reliability layer underneath AI products.",
    statusNote:
      "Updated April 26, 2026 from live GitHub history. Homepage highlights shipped upstream outcomes first; deeper detail lives on the dedicated OSS page.",
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
        "GitHub is the clearest public record of how I work: 28 merged upstream fixes across HuggingFace Transformers, Docling, LlamaIndex, LiteLLM, Ray, Continue, OpenAI Agents Python, and Mastra, plus 40 active PRs across Anthropic, Microsoft, Vercel, Chroma, and adjacent AI tooling stacks. The record spans 45 external repos, with 3 approved PRs awaiting merge.",
      metrics: [
        { value: "45", label: "Repos contributed to" },
        { value: "28", label: "Merged upstream" },
        { value: "40", label: "Open PRs" }
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
    breadth: {
      title: "Contribution breadth",
      body:
        "Coverage across core implementation languages and the parts of the AI infrastructure stack where execution quality actually matters.",
      groups: [
        {
          label: "Languages",
          items: ["Python", "TypeScript", "Go", "Rust", "C#", "SQL"]
        },
        {
          label: "Verticals",
          items: [
            "Agent frameworks",
            "LLM serving",
            "RAG",
            "Document AI",
            "Voice agents",
            "Observability",
            "Tokenization",
            "Evaluation",
            "MLOps",
            "Training/Fine-tuning",
            "Distributed compute",
            "Vector databases",
            "MCP/Tool calling",
            "Security"
          ]
        }
      ]
    },
    shipped: {
      title: "Selected shipped wins",
      note: "Eight homepage cards chosen for upstream consequence, repo scale, and hiring signal.",
      items: [
        {
          target: "HuggingFace Transformers",
          title: "Merged generation fix removing stale num_return_sequences warning on continuous batching",
          status: "Merged Apr 24",
          href: "https://github.com/huggingface/transformers/pull/45582",
          summary:
            "Cleaned up a generation warning that fired incorrectly on the continuous-batching path, keeping production inference logs honest in the canonical LLM serving library.",
          stars: "159.9k",
          starBar: 100,
          tags: ["Merged PR", "LLM serving", "Continuous batching", "Python"]
        },
        {
          target: "Docling",
          title: "Merged Windows CLI PermissionError fix for document conversion",
          status: "Merged Mar 19",
          href: "https://github.com/docling-project/docling/pull/3149",
          summary:
            "Fixed a Windows CLI failure path that blocked document conversion workflows, making the document-to-data pipeline usable across environments instead of failing on a common local setup.",
          stars: "58.6k",
          starBar: 37,
          tags: ["Merged PR", "Document AI", "Cross-platform", "Python"]
        },
        {
          target: "LlamaIndex",
          title: "Merged input_file serialization fix for the Responses API",
          status: "Merged Mar 27",
          href: "https://github.com/run-llama/llama_index/pull/21172",
          summary:
            "Fixed nested serialization for file-based Responses API inputs, keeping retrieval and document-processing flows stable as teams adopt the newer OpenAI interface.",
          stars: "48.9k",
          starBar: 31,
          tags: ["Merged PR", "RAG", "Serialization", "Python"]
        },
        {
          target: "LiteLLM",
          title: "Merged TTFT capture for /v1/messages across Anthropic, Bedrock, and Vertex",
          status: "Merged Apr 16",
          href: "https://github.com/BerriAI/litellm/pull/25599",
          summary:
            "Added time-to-first-token instrumentation on the Anthropic-style streaming path so multi-provider LLM gateways can report consistent latency metrics across Bedrock, Vertex, and Anthropic backends.",
          stars: "44.7k",
          starBar: 28,
          tags: ["Merged PR", "LLM serving", "Streaming metrics", "Python"]
        },
        {
          target: "Ray",
          title: "Merged Serve autoscaling timing fix for delayed scale-up behavior",
          status: "Merged Apr 3",
          href: "https://github.com/ray-project/ray/pull/62144",
          summary:
            "Corrected Serve autoscaling timing so scale-up decisions happen on the intended wall-clock path instead of drifting under real traffic patterns.",
          stars: "42.3k",
          starBar: 26,
          tags: ["Merged PR", "Distributed compute", "Autoscaling", "Python"]
        },
        {
          target: "Continue",
          title: "Merged Ollama MCP tool-calling fix for Mistral and Gemma3 models",
          status: "Merged Mar 24",
          href: "https://github.com/continuedev/continue/pull/11523",
          summary:
            "Makes local-model tooling more dependable in a popular AI coding environment, which matters when teams want model choice without unpredictable tool-call failures.",
          stars: "32.8k",
          starBar: 21,
          tags: ["Merged PR", "Tool calling", "Ollama", "Developer workflows"]
        },
        {
          target: "OpenAI Agents Python",
          title: "Merged fix preserving MCP and reasoning items during tool cleanup",
          status: "Merged Mar 21",
          href: "https://github.com/openai/openai-agents-python/pull/2700",
          summary:
            "Keeps agent-system state reliable during cleanup flows, so teams do not lose structured context in a place that is hard to debug after the fact.",
          stars: "25.2k",
          starBar: 16,
          tags: ["Merged PR", "Agent reliability", "Python", "MCP"]
        },
        {
          target: "Mastra",
          title: "Merged MCP tool-response interoperability fix",
          status: "Merged Mar 18",
          href: "https://github.com/mastra-ai/mastra/pull/14372",
          summary:
            "Prevents tool output from disappearing in agent workflows, which matters directly for operator trust and debugging quality.",
          stars: "23.3k",
          starBar: 15,
          tags: ["Merged PR", "Interoperability", "MCP", "Agent reliability"]
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
      "Amazon PM work spanning product definition, ML launch ownership, and technical execution: aligning PM, SDE, science, and Ops to ship decision systems that improved speed and delivered measurable savings.",
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
      "Defined requirements and launch artifacts for new generations of existing ML decision systems, aligning PM, SDE, scientists, and Ops around production rollout, operator behavior, and success metrics.",
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
