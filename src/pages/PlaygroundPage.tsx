import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AIPlayground } from "../components/AIPlayground";

export const PlaygroundPage: React.FC = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "0px 0px -80px 0px" });

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
              AI Playground · Live Demo
            </span>
            <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
              Watch the Pipeline
              <br />
              <span className="text-accent-blue">Think in Real-Time.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Submit a query and observe every stage of the enterprise grounded AI system responding — token by token, with live telemetry metrics updating alongside.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20" ref={contentRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <AIPlayground />
        </motion.div>

        {/* Info cards underneath */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: "100% Frontend", desc: "No backend. All responses are simulated client-side to demonstrate the UX flow of an agentic AI pipeline." },
            { label: "Live Telemetry", desc: "Watch token ingestion, latency, and cost counters update as the model generates — exactly as you'd see in production logs." },
            { label: "Grounded Design", desc: "Responses reference source document paths, mimicking the Vector Search grounding architecture taught in the curriculum." },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={contentInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
              className="p-6 rounded-2xl border border-border-primary/50 bg-bg-card shadow-level-1"
            >
              <h3 className="font-manrope font-bold text-base text-text-primary mb-2">{card.label}</h3>
              <p className="text-sm text-text-secondary leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
