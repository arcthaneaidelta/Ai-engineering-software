import React, { useState } from "react";
import { Clock, Layers, CheckCircle, X, Sparkles, BookOpen } from "lucide-react";

interface WeekData {
  week: number;
  title: string;
  shortDesc: string;
  hours: number;
  labsCount: number;
  skills: string[];
  objectives: string[];
  technologies: string[];
  labs: string[];
  outcome: string;
  radarSkills: {
    backend: number;
    frontend: number;
    ai: number;
    cloud: number;
    devops: number;
    security: number;
  };
}

export const CurriculumTimeline: React.FC = () => {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number | null>(null);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const curriculum: WeekData[] = [
    {
      week: 1,
      title: "Enterprise Systems & LLM Architecture",
      shortDesc: "Understand foundational Cloud computing infrastructure, SaaS/PaaS design, and Vertex AI API orchestration.",
      hours: 8,
      labsCount: 2,
      skills: ["Cloud Ingress", "Vertex Setup", "IAM Controls"],
      objectives: [
        "Master the structural boundaries of public cloud providers",
        "Set up enterprise service accounts and restrict API boundaries using IAM policies",
        "Orchestrate standard synchronous API queries to Gemini model classes"
      ],
      technologies: ["Google Cloud Platform", "Vertex AI", "gcloud CLI", "IAM"],
      labs: [
        "Deploying your first Cloud storage repository and service boundary controls",
        "Writing a secure token-authorized request client in Node.js"
      ],
      outcome: "Architect a secure cloud-native development workspace with granular identity and access management controls.",
      radarSkills: { backend: 40, frontend: 20, ai: 30, cloud: 70, devops: 30, security: 80 }
    },
    {
      week: 2,
      title: "Vertex AI & Advanced Inference Systems",
      shortDesc: "Implement system instructions, security safety filters, and context caching parameters.",
      hours: 9,
      labsCount: 2,
      skills: ["Context Caching", "API Rate Management", "Token Economics"],
      objectives: [
        "Build context caching pipelines for repetitive prompt fragments to cut ingestion billing",
        "Handle API throttling and rate-limit headers with exponential backoff algorithms",
        "Establish Vertex AI safety filter thresholds to balance false positives vs security requirements"
      ],
      technologies: ["Vertex AI", "Python SDK", "Node SDK", "Tokenizers"],
      labs: [
        "Building a token-aware middleware handling system instruction injection",
        "Implementing a task queue with sliding window rate limiting"
      ],
      outcome: "An optimized inference pipeline capable of processing large prompts with up to 50% cost savings via custom caching.",
      radarSkills: { backend: 60, frontend: 20, ai: 60, cloud: 60, devops: 40, security: 70 }
    },
    {
      week: 3,
      title: "Retrieval Augmented Generation (RAG)",
      shortDesc: "Understand document chunking, semantic similarity vector spaces, and indexing techniques.",
      hours: 10,
      labsCount: 3,
      skills: ["Text Chunking", "Semantic Search", "Sentence Embeddings"],
      objectives: [
        "Differentiate between slide, sentence, and hierarchical paragraph chunking",
        "Measure vector space similarity using cosine distance, dot product, and L2 norms",
        "Design metadata filters to restrict vector search results dynamically"
      ],
      technologies: ["Vertex Embeddings", "LangChain", "FastAPI", "Pandas"],
      labs: [
        "Benchmarking semantic alignment of multiple embedding models",
        "Building a metadata-filtered grounding preprocessor"
      ],
      outcome: "Retrieve domain-specific knowledge chunks with high semantic relevancy and structural source validation.",
      radarSkills: { backend: 70, frontend: 20, ai: 80, cloud: 50, devops: 30, security: 50 }
    },
    {
      week: 4,
      title: "Vertex Vector Search & High-Scale Indexes",
      shortDesc: "Provision Approximate Nearest Neighbor (ANN) index databases on Google Cloud.",
      hours: 8,
      labsCount: 2,
      skills: ["ANN Indexing", "Index Querying", "Scale Tuning"],
      objectives: [
        "Deploy a Vertex Vector Search Index and Index Endpoint in a VPC network",
        "Tune index creation parameters: leafNodeCount and dimensions to balance search speed vs recall accuracy",
        "Implement continuous index updates from GCS storage triggers"
      ],
      technologies: ["Vertex Vector Search", "VPC Peering", "gcloud storage", "Terraform"],
      labs: [
        "Deploying a high-scale vector index endpoint via Terraform script",
        "Running multi-threaded query benchmarks against deployed Index Endpoint"
      ],
      outcome: "A low-latency vector database capable of querying millions of documents in sub-25ms response windows.",
      radarSkills: { backend: 65, frontend: 10, ai: 85, cloud: 80, devops: 60, security: 60 }
    },
    {
      week: 5,
      title: "Advanced Prompt Engineering & State Machines",
      shortDesc: "Design stateful conversational logic, prompt chains, and agent state memories.",
      hours: 9,
      labsCount: 2,
      skills: ["Few-Shot Tuning", "Chain-of-Thought", "Stateful Conversation"],
      objectives: [
        "Structure dynamic templates with context-specific few-shot examples",
        "Implement Chain-of-Thought and Self-Consistency prompting patterns",
        "Maintain conversation memory in Redis keys with automatic TTL expiration"
      ],
      technologies: ["Redis", "FastAPI", "YAML Templates", "LangChain Core"],
      labs: [
        "Designing a multi-turn conversation tracker using Redis hash layers",
        "Implementing a dynamic prompt optimizer that matches user feedback scores"
      ],
      outcome: "Create robust, predictable prompts that resist drifting off-topic and maintain historical memory context.",
      radarSkills: { backend: 80, frontend: 30, ai: 70, cloud: 40, devops: 30, security: 60 }
    },
    {
      week: 6,
      title: "Agentic Workflows & Function Calling",
      shortDesc: "Orchestrate Gemini tool-calling features, API interface maps, and execution loops.",
      hours: 10,
      labsCount: 3,
      skills: ["Function Calling", "Schema Definitions", "Reasoning Loops"],
      objectives: [
        "Define strict JSON schema specifications representing enterprise system endpoints",
        "Handle Gemini's tool-call responses and route execution back to system services securely",
        "Build closed loop agent reasoners (ReAct) that self-correct API execution parameters"
      ],
      technologies: ["OpenAPI Specification", "Vertex AI Function Calling", "JSON Schema"],
      labs: [
        "Connecting Gemini to a mock banking database via function-call routing",
        "Building a visual execution flow path showing tool invocation logs"
      ],
      outcome: "An autonomous agent system capable of dynamically selecting, parameterizing, and calling backend services.",
      radarSkills: { backend: 85, frontend: 40, ai: 80, cloud: 60, devops: 40, security: 70 }
    },
    {
      week: 7,
      title: "Production Infrastructure & Docker Setup",
      shortDesc: "Containerize Python application frameworks and push to GCP Artifact Registry.",
      hours: 8,
      labsCount: 2,
      skills: ["Dockerization", "Multi-Stage Builds", "Artifact Registry"],
      objectives: [
        "Write optimized Dockerfiles leveraging multi-stage builds to produce tiny container footprints",
        "Configure secure container build steps in local environments and GCP Artifact Registry",
        "Establish environment variables and secret injection using Secret Manager"
      ],
      technologies: ["Docker", "Google Artifact Registry", "Secret Manager", "Alpine Linux"],
      labs: [
        "Building a minimal FastAPI container under 80MB using multi-stage scripts",
        "Configuring secret environment variables loaded during container startup"
      ],
      outcome: "A secure, compiled container image uploaded to a private enterprise repository, ready for serverless deployment.",
      radarSkills: { backend: 70, frontend: 20, ai: 40, cloud: 75, devops: 85, security: 80 }
    },
    {
      week: 8,
      title: "Cloud Run Deployment & Serverless Scale",
      shortDesc: "Configure autoscaling thresholds, VPC ingress pipelines, and concurrency controls.",
      hours: 8,
      labsCount: 2,
      skills: ["Serverless Scaling", "Concurrency Tuning", "VPC Networking"],
      objectives: [
        "Deploy a microservice container to Cloud Run with custom scale parameters",
        "Set maximum CPU and memory limits. Restrict ingress access strictly through Cloud Load Balancer",
        "Tune concurrency levels (requests per container) to optimize resource usage"
      ],
      technologies: ["Cloud Run", "Cloud Load Balancing", "VPC Connectors", "IAM Permissions"],
      labs: [
        "Deploying an auto-scaling orchestration container to Cloud Run",
        "Performing load testing to trigger container scale-out from 1 to 5 instances"
      ],
      outcome: "A serverless REST API that automatically handles traffic spikes and scales down to zero to eliminate idle billing.",
      radarSkills: { backend: 75, frontend: 20, ai: 40, cloud: 90, devops: 80, security: 75 }
    },
    {
      week: 9,
      title: "AI Model Evaluation & Quality Benchmarks",
      shortDesc: "Implement BLEU, ROUGE, cosine similarity, and LLM-as-a-Judge evaluations.",
      hours: 10,
      labsCount: 2,
      skills: ["ROUGE / BLEU Evaluation", "Semantic Alignment", "LLM-as-a-Judge"],
      objectives: [
        "Differentiate between traditional token overlap metrics (ROUGE) and semantic vector distance evaluations",
        "Build a robust LLM-as-a-Judge scoring pipeline utilizing structured schemas",
        "Generate a continuous testing report showing prompt modification impact"
      ],
      technologies: ["Vertex AI Evaluation API", "DeepEval", "JSON Schemas", "Jest/PyTest"],
      labs: [
        "Building a pipeline evaluating model summary alignments against target ground truths",
        "Creating a custom QA benchmark testing framework using Vertex evaluation"
      ],
      outcome: "Define and execute regression test suites ensuring prompt adjustments do not degrade response quality.",
      radarSkills: { backend: 80, frontend: 20, ai: 90, cloud: 60, devops: 70, security: 65 }
    },
    {
      week: 10,
      title: "Observability, Telemetry & Tracing",
      shortDesc: "Enable distributed tracing, prompt latency monitors, and Cloud Logging tags.",
      hours: 8,
      labsCount: 2,
      skills: ["Distributed Tracing", "Cloud Logging", "OpenTelemetry"],
      objectives: [
        "Track parent-child execution spans across orchestrator nodes, embedding APIs, and vector index databases",
        "Structure structured log outputs (JSON) mapped to Cloud Logging levels",
        "Alert engineers when inference latency P95 exceeds target threshold metrics"
      ],
      technologies: ["Cloud Trace", "Cloud Logging", "OpenTelemetry SDK", "Prometheus"],
      labs: [
        "Integrating OpenTelemetry span tracing inside a FastAPI route handler",
        "Configuring a log metrics alarm in Google Cloud Console"
      ],
      outcome: "Full transparency over request latency bottlenecks, tracing errors instantly to the specific database or API model step.",
      radarSkills: { backend: 80, frontend: 30, ai: 50, cloud: 85, devops: 90, security: 70 }
    },
    {
      week: 11,
      title: "Security Hardening & Input Guardrails",
      shortDesc: "Implement prompt injection defenses, PII data masking, and rate limits.",
      hours: 10,
      labsCount: 3,
      skills: ["Injection Protection", "PII Redaction", "Rate Throttling"],
      objectives: [
        "Construct sanitization middleware checking user inputs for common injection patterns",
        "Integrate Cloud DLP (Data Loss Prevention) APIs to redact PII (SSNs, emails) before sending to external API layers",
        "Configure API security boundaries restricting prompt responses to approved company data"
      ],
      technologies: ["Cloud DLP", "OWASP LLM Top 10", "Regular Expressions", "OAuth 2.0"],
      labs: [
        "Writing a FastAPI middleware intercepting and redacting PII data patterns",
        "Simulating adversarial prompt injection attacks and validating defense mechanisms"
      ],
      outcome: "A secure API perimeter that prevents data leakage and safeguards against adversarial system takeover attempts.",
      radarSkills: { backend: 85, frontend: 25, ai: 60, cloud: 80, devops: 75, security: 95 }
    },
    {
      week: 12,
      title: "Capstone Project & Enterprise Defense",
      shortDesc: "Finalize production system architecture, run end-to-end checks, and present project.",
      hours: 12,
      labsCount: 1,
      skills: ["Production Architecture", "Load Testing", "Architecture Defense"],
      objectives: [
        "Integrate components from weeks 1-11 into a production-grade grounded agent service",
        "Conduct automated multi-thread load and performance benchmark tests",
        "Validate pipeline security, cost metrics, and error rates in simulated production environment"
      ],
      technologies: ["All Stacks", "Terraform", "GitHub Actions CI/CD", "LoadRunner"],
      labs: [
        "Assembling the complete microservice with deployment pipelines and logging filters"
      ],
      outcome: "Present a production-ready, secure, and auto-scaling RAG application deployed on Google Cloud under model evaluation frameworks.",
      radarSkills: { backend: 95, frontend: 60, ai: 90, cloud: 95, devops: 90, security: 90 }
    }
  ];

  // Radar chart calculation details
  const activeWeek = hoveredWeek !== null ? curriculum[hoveredWeek] : selectedWeekIndex !== null ? curriculum[selectedWeekIndex] : curriculum[0];
  
  // Custom SVG Radar Chart Calculation
  const getRadarPoints = () => {
    const skills = activeWeek.radarSkills;
    const center = 100;
    const maxVal = 100;
    const r = 70; // radius of chart
    
    // Axes angles (6 dimensions)
    // 0: Backend, 1: Frontend, 2: AI, 3: Cloud, 4: DevOps, 5: Security
    const getAngle = (i: number) => (i * 2 * Math.PI) / 6 - Math.PI / 2;

    const points = [
      skills.backend,
      skills.frontend,
      skills.ai,
      skills.cloud,
      skills.devops,
      skills.security,
    ].map((val, idx) => {
      const angle = getAngle(idx);
      const distance = (val / maxVal) * r;
      const x = center + distance * Math.cos(angle);
      const y = center + distance * Math.sin(angle);
      return `${x},${y}`;
    });

    return points.join(" ");
  };

  const getAxisPoints = (idx: number, length: number = 70) => {
    const center = 100;
    const angle = (idx * 2 * Math.PI) / 6 - Math.PI / 2;
    const x = center + length * Math.cos(angle);
    const y = center + length * Math.sin(angle);
    return { x, y };
  };

  return (
    <div className="w-full">
      {/* Visual Roadmap & Radar Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Weekly Journey Timeline (Columns 1 & 2) */}
        <div className="lg:col-span-2 relative pl-8 border-l border-border-primary/50 flex flex-col gap-6">
          
          {/* Animated Progress vertical line overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-accent-blue via-accent-teal to-accent-success origin-top transition-all" />

          {curriculum.map((item, index) => {
            const isHovered = hoveredWeek === index;
            const isSelected = selectedWeekIndex === index;
            return (
              <div
                key={item.week}
                className={`relative group transition-all duration-300 ${
                  isSelected ? "scale-101 translate-x-1" : ""
                }`}
                onMouseEnter={() => setHoveredWeek(index)}
                onMouseLeave={() => setHoveredWeek(null)}
                onClick={() => setSelectedWeekIndex(index)}
              >
                {/* Timeline node selector dot */}
                <div
                  className={`absolute -left-[37px] top-6 w-4 h-4 rounded-full border-2 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                    isSelected
                      ? "bg-accent-blue border-accent-blue scale-120 shadow-level-2"
                      : isHovered
                      ? "bg-accent-teal border-accent-teal"
                      : "bg-bg-primary border-border-primary/80"
                  }`}
                >
                  {(isSelected || isHovered) && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  )}
                </div>

                {/* Week card container */}
                <div
                  className={`p-6 rounded-2xl border transition-all duration-250 cursor-pointer ${
                    isSelected
                      ? "bg-bg-card border-accent-blue shadow-level-2"
                      : "bg-bg-card/65 border-border-primary/50 hover:bg-bg-card hover:border-text-muted/40 hover:-translate-y-0.5 shadow-level-1"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 mb-3">
                    <span className="text-[11px] font-bold font-mono tracking-widest text-accent-blue uppercase">
                      WEEK 0{item.week}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-text-muted font-mono">
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {item.hours} hrs
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers size={12} /> {item.labsCount} labs
                      </span>
                    </div>
                  </div>

                  <h3 className="font-manrope font-bold text-lg text-text-primary mb-2 group-hover:text-accent-blue transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-sm text-text-secondary leading-relaxed mb-4">
                    {item.shortDesc}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg-secondary text-text-secondary border border-border-primary/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Skills Radar Sidebar (Column 3) */}
        <div className="lg:col-span-1 lg:sticky lg:top-28 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border-primary/50 bg-bg-card shadow-level-1">
            <h3 className="font-manrope font-bold text-base text-text-primary mb-4 flex items-center gap-2">
              <Sparkles size={18} className="text-accent-blue" />
              Skills Progression Radar
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-6">
              Observe how the active week's curriculum shifts focus across backend, frontend, cloud architecture, and security metrics.
            </p>

            {/* SVG Radar Chart Representation */}
            <div className="w-full flex items-center justify-center mb-6">
              <svg className="w-56 h-56" viewBox="0 0 200 200">
                {/* Concentric grid circles representing levels */}
                <circle cx="100" cy="100" r="70" fill="none" stroke="var(--border-primary)" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="52.5" fill="none" stroke="var(--border-primary)" strokeWidth="0.75" strokeDasharray="3,3" />
                <circle cx="100" cy="100" r="35" fill="none" stroke="var(--border-primary)" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="17.5" fill="none" stroke="var(--border-primary)" strokeWidth="0.75" strokeDasharray="3,3" />

                {/* Axes lines */}
                {[0, 1, 2, 3, 4, 5].map((idx) => {
                  const end = getAxisPoints(idx, 75);
                  return (
                    <line
                      key={idx}
                      x1="100"
                      y1="100"
                      x2={end.x}
                      y2={end.y}
                      stroke="var(--border-primary)"
                      strokeWidth="1"
                    />
                  );
                })}

                {/* Axis Labels */}
                {["Backend", "Frontend", "AI Core", "GCP Cloud", "DevOps", "Security"].map((label, idx) => {
                  const pos = getAxisPoints(idx, 86);
                  return (
                    <text
                      key={label}
                      x={pos.x}
                      y={pos.y}
                      textAnchor="middle"
                      alignmentBaseline="middle"
                      className="text-[9px] font-mono fill-text-muted font-semibold tracking-tighter"
                    >
                      {label}
                    </text>
                  );
                })}

                {/* Radar Skill polygon */}
                <polygon
                  points={getRadarPoints()}
                  fill="rgba(37, 99, 235, 0.15)"
                  stroke="#2563EB"
                  strokeWidth="1.5"
                  className="transition-all duration-500 ease-out"
                />

                {/* Radar value vertex points */}
                {getRadarPoints()
                  .split(" ")
                  .map((pt, i) => {
                    const [x, y] = pt.split(",");
                    return (
                      <circle
                        key={i}
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill="#2563EB"
                        stroke="var(--card-bg)"
                        strokeWidth="1"
                        className="transition-all duration-500 ease-out"
                      />
                    );
                  })}
              </svg>
            </div>

            {/* Active Details List */}
            <div className="flex flex-col gap-4 border-t border-border-primary/50 pt-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">ACTIVE CONTEXT:</span>
                <span className="font-semibold text-accent-blue">WEEK 0{activeWeek.week}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="flex flex-col">
                  <span className="text-text-muted uppercase text-[9px] tracking-wider">AI Engine</span>
                  <span className="text-text-primary font-semibold">{activeWeek.radarSkills.ai}% focused</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-muted uppercase text-[9px] tracking-wider">Cloud Deployment</span>
                  <span className="text-text-primary font-semibold">{activeWeek.radarSkills.cloud}% focused</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-muted uppercase text-[9px] tracking-wider">Security Bounds</span>
                  <span className="text-text-primary font-semibold">{activeWeek.radarSkills.security}% focused</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-text-muted uppercase text-[9px] tracking-wider">DevOps Pipelines</span>
                  <span className="text-text-primary font-semibold">{activeWeek.radarSkills.devops}% focused</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Week Details Modal */}
      {selectedWeekIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000000]/65 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl border border-border-primary bg-bg-card p-6 md:p-8 shadow-level-3">
            {/* Modal Close Button */}
            <button
              onClick={() => setSelectedWeekIndex(null)}
              className="absolute top-4 right-4 p-2 rounded-full border border-border-primary bg-bg-card hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold font-mono tracking-widest bg-accent-blue/10 text-accent-blue uppercase">
                WEEK 0{curriculum[selectedWeekIndex].week} CORE Blueprints
              </span>
              <h2 className="font-manrope font-bold text-2xl md:text-3xl text-text-primary mt-2">
                {curriculum[selectedWeekIndex].title}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="flex flex-col gap-6 text-sm">
              <div>
                <h4 className="font-manrope font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                  <BookOpen size={16} className="text-accent-blue" />
                  Key Objectives
                </h4>
                <ul className="list-disc pl-5 text-text-secondary leading-relaxed flex flex-col gap-1.5">
                  {curriculum[selectedWeekIndex].objectives.map((obj, i) => (
                    <li key={i}>{obj}</li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-manrope font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                    <Layers size={16} className="text-accent-teal" />
                    Stack & SDKs
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {curriculum[selectedWeekIndex].technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-bg-secondary text-text-primary border border-border-primary/45"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-manrope font-semibold text-text-primary mb-2 flex items-center gap-1.5">
                    <Clock size={16} className="text-accent-warning" />
                    Interactive Lab Deliverables
                  </h4>
                  <ul className="text-xs text-text-secondary flex flex-col gap-2">
                    {curriculum[selectedWeekIndex].labs.map((lab, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle size={14} className="text-accent-success shrink-0 mt-0.5" />
                        <span>{lab}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border-primary pt-4 mt-2">
                <h4 className="font-manrope font-semibold text-text-primary mb-1.5 flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-accent-success" />
                  Tangible Outcomes
                </h4>
                <p className="text-text-secondary leading-relaxed italic">
                  "{curriculum[selectedWeekIndex].outcome}"
                </p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => setSelectedWeekIndex(null)}
                className="px-5 py-2.5 rounded-full bg-text-primary text-bg-primary hover:bg-text-primary/90 font-semibold text-xs tracking-wider uppercase cursor-pointer active:scale-95 transition-all"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
