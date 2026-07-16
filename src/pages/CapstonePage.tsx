import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle, ArrowRight, Shield, Cpu, BarChart2, Code, Cloud, FileCode } from "lucide-react";

interface CapstonePageProps {
  setCurrentPage: (page: string) => void;
}

export const CapstonePage: React.FC<CapstonePageProps> = ({ setCurrentPage }) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "0px 0px -80px 0px" });

  const milestones = [
    {
      icon: FileCode,
      phase: "Phase 1",
      title: "Architecture Design",
      desc: "Submit a detailed architecture diagram documenting the full RAG pipeline: data ingress, embedding, retrieval, orchestration, and response generation.",
      color: "text-blue-500",
      bg: "bg-blue-500/8",
    },
    {
      icon: Code,
      phase: "Phase 2",
      title: "Code & Pipeline Build",
      desc: "Develop and test the orchestration microservice with FastAPI, implement Vertex Vector Search querying, and configure Gemini function calling.",
      color: "text-purple-500",
      bg: "bg-purple-500/8",
    },
    {
      icon: Cloud,
      phase: "Phase 3",
      title: "Cloud Deployment",
      desc: "Package into a Docker container, push to Artifact Registry, and deploy to Cloud Run with IAM, auto-scaling, and Secret Manager configuration.",
      color: "text-sky-500",
      bg: "bg-sky-500/8",
    },
    {
      icon: BarChart2,
      phase: "Phase 4",
      title: "Evaluation & Benchmarks",
      desc: "Run ROUGE and LLM-as-a-Judge test suites. Capture response quality scores, latency percentiles, and token cost comparisons.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/8",
    },
    {
      icon: Shield,
      phase: "Phase 5",
      title: "Security Audit",
      desc: "Demonstrate PII redaction via Cloud DLP, simulate injection attacks and validate defenses, and document IAM boundary policies.",
      color: "text-rose-500",
      bg: "bg-rose-500/8",
    },
    {
      icon: Cpu,
      phase: "Phase 6",
      title: "Enterprise Defense",
      desc: "Present the complete system to reviewers. Explain architectural decisions, discuss trade-offs, answer technical questions, and demonstrate live.",
      color: "text-amber-500",
      bg: "bg-amber-500/8",
    },
  ];

  const deliverables = [
    "Fully deployed Cloud Run service endpoint (live URL)",
    "Authenticated RAG query with Vector Search grounding",
    "Evaluation report with ROUGE, latency, and cost benchmarks",
    "Security audit proof: PII redaction pipeline demonstration",
    "Architecture diagram (Terraform or draw.io format)",
    "CI/CD pipeline via GitHub Actions to Cloud Build",
    "Observability dashboards (Cloud Trace + Logging)",
    "Recorded technical defense session (30 minutes)",
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="bg-bg-secondary border-b border-border-primary/50 pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase">
              Week 12 · Capstone Project
            </span>
            <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
              Ship a Production
              <br />
              <span className="text-accent-teal">AI System. For Real.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              The capstone isn't a demo — it's a real, deployed, and evaluated enterprise AI application. Every line of code runs in Google Cloud.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 flex flex-col gap-20" ref={contentRef}>

        {/* Milestones grid */}
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <h2 className="font-manrope font-bold text-3xl text-text-primary">Six Delivery Phases</h2>
            <p className="text-text-secondary max-w-lg">Each phase produces a concrete deliverable that is reviewed and signed off before the next begins.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {milestones.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={contentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="group p-8 rounded-2xl border border-border-primary/50 bg-bg-card hover:shadow-level-2 hover:-translate-y-1 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl ${m.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className={m.color} />
                  </div>
                  <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest mb-1 block">{m.phase}</span>
                  <h3 className="font-manrope font-bold text-xl text-text-primary mb-3 group-hover:text-accent-blue transition-colors">{m.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{m.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Final Deliverables checklist */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="p-8 md:p-12 rounded-3xl border border-border-primary/50 bg-bg-card shadow-level-1"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <div className="flex flex-col gap-6">
              <div>
                <h2 className="font-manrope font-bold text-3xl text-text-primary mb-3">Final Deliverables</h2>
                <p className="text-text-secondary text-base leading-relaxed">
                  Completing all deliverables certifies production AI engineering proficiency recognized within enterprise Google Cloud engagements.
                </p>
              </div>
              <button
                onClick={() => setCurrentPage("contact")}
                className="group w-fit h-12 px-7 rounded-full bg-accent-blue text-white font-semibold text-sm hover:bg-accent-blue/90 shadow-level-1 hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                Discuss the Capstone
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-text-secondary">
                  <CheckCircle size={16} className="text-accent-success shrink-0 mt-0.5" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
