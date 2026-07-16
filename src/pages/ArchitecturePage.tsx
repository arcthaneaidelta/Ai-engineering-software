import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { InteractiveArchitecture } from "../components/InteractiveArchitecture";

export const ArchitecturePage: React.FC = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "0px 0px -80px 0px" });

  const concepts = [
    {
      title: "Request Ingress & Auth",
      desc: "All client requests enter via a secure HTTPS gateway with OAuth 2.0 token verification before reaching any backend microservice.",
      step: "01",
    },
    {
      title: "Orchestration Layer",
      desc: "The Cloud Run microservice coordinates parallel workloads: prompt sanitization, embedding retrieval, and Gemini API forwarding.",
      step: "02",
    },
    {
      title: "Semantic Vector Retrieval",
      desc: "Query embeddings are generated via Text-Gecko and used to perform ANN search against the Vertex Vector Search index.",
      step: "03",
    },
    {
      title: "Gemini Model Reasoning",
      desc: "Retrieved document context is injected into a structured prompt that guides Gemini to produce grounded, policy-aware responses.",
      step: "04",
    },
    {
      title: "Response & Evaluation",
      desc: "Outputs are evaluated using LLM-as-a-Judge scoring before being streamed back to the client with full telemetry span tagging.",
      step: "05",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Page Header */}
      <div className="bg-bg-secondary border-b border-border-primary/50 pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6 max-w-3xl"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase">
              Architecture Explorer
            </span>
            <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
              A Real Enterprise
              <br />
              <span className="text-accent-teal">AI Pipeline.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Explore the production architecture taught across the 12-week curriculum. Click any node to learn its role, technology, and GCP best practices.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Interactive Diagram */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20" ref={contentRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveArchitecture />
        </motion.div>

        {/* Pipeline step walkthrough */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {concepts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="p-6 rounded-2xl border border-border-primary/50 bg-bg-card shadow-level-1 flex flex-col gap-3"
            >
              <span className="font-mono text-[11px] font-bold text-accent-blue tracking-widest">
                STEP {item.step}
              </span>
              <h3 className="font-manrope font-bold text-lg text-text-primary">
                {item.title}
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
