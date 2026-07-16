import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LiveLab } from "../components/LiveLab";
import { Terminal } from "lucide-react";

export const LabsPage: React.FC = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "0px 0px -80px 0px" });

  const labModules = [
    { week: "01–02", title: "Vertex AI Inference Lab", tags: ["API Authentication", "Rate Limiting", "Context Caching"] },
    { week: "03–04", title: "RAG Pipeline Construction", tags: ["Chunk Strategies", "Embedding Models", "ANN Indexing"] },
    { week: "05–06", title: "Agent Orchestration Lab", tags: ["Function Calling", "JSON Schemas", "ReAct Loops"] },
    { week: "07–08", title: "Docker & Cloud Run Deploy", tags: ["Multi-stage Builds", "Artifact Registry", "IAM Invoker"] },
    { week: "09–10", title: "Model Evaluation Suite", tags: ["ROUGE / BLEU", "LLM-as-a-Judge", "Regression Tests"] },
    { week: "11–12", title: "Security & Capstone", tags: ["Cloud DLP", "PII Redaction", "Load Testing"] },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Page Header */}
      <div className="bg-bg-secondary border-b border-border-primary/50 pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase">
              Interactive Lab Environment
            </span>
            <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
              Build in the Cloud.
              <br />
              <span className="text-accent-teal">Right From the Browser.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Every lab runs inside a live browser environment connected to GCP Cloud Shell. Click Deploy and watch your container go live in under 60 seconds.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Live Lab Component */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20" ref={contentRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <LiveLab />
        </motion.div>

        {/* Lab Modules grid */}
        <div className="mt-20 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h2 className="font-manrope font-bold text-3xl text-text-primary">All Lab Modules</h2>
            <p className="text-text-secondary max-w-lg">Six lab clusters covering the complete production AI engineering lifecycle.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {labModules.map((lab, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-6 rounded-2xl border border-border-primary/50 bg-bg-card hover:shadow-level-2 hover:-translate-y-0.5 transition-all cursor-default"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase">
                    WEEK {lab.week}
                  </span>
                  <Terminal size={16} className="text-accent-blue opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-manrope font-bold text-lg text-text-primary mb-4 group-hover:text-accent-blue transition-colors">
                  {lab.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {lab.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-bg-secondary border border-border-primary/40 text-text-secondary">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
