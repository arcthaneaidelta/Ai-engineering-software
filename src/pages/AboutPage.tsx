import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Brain, Cloud, Shield, Target, BookOpen, Cpu } from "lucide-react";

export const AboutPage: React.FC = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "0px 0px -80px 0px" });

  const values = [
    {
      icon: Brain,
      title: "Engineering Over Prompting",
      desc: "AI literacy begins with systems thinking. Before writing prompts, understand embedding spaces, retrieval pipelines, and evaluation frameworks.",
      color: "text-purple-500",
      bg: "bg-purple-500/8",
    },
    {
      icon: Cloud,
      title: "Cloud-Native by Default",
      desc: "Every lab, exercise and project deploys to real Google Cloud infrastructure. Students graduate with a production footprint — not screenshots.",
      color: "text-sky-500",
      bg: "bg-sky-500/8",
    },
    {
      icon: Shield,
      title: "Security is Foundational",
      desc: "AI systems that handle enterprise data must be secure by design. We teach DLP, injection hardening, and access governance from day one.",
      color: "text-rose-500",
      bg: "bg-rose-500/8",
    },
    {
      icon: Target,
      title: "Evaluation is Non-Negotiable",
      desc: "Shipping AI without evaluation is engineering malpractice. Every model decision in this curriculum is measured, compared, and defended.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/8",
    },
    {
      icon: BookOpen,
      title: "Learning by Doing",
      desc: "Theory without practice is trivia. Every concept is immediately applied in a hands-on lab that produces a real, reviewable output.",
      color: "text-amber-500",
      bg: "bg-amber-500/8",
    },
    {
      icon: Cpu,
      title: "Production Mindset",
      desc: "The capstone is not a tutorial project. It's an end-to-end, containerized, evaluated, and monitored system running on live infrastructure.",
      color: "text-blue-500",
      bg: "bg-blue-500/8",
    },
  ];

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="bg-bg-secondary border-b border-border-primary/50 pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12" ref={headerRef}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase">
                About the Academy
              </span>
              <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
                Built by an Engineer.
                <br />
                <span className="text-accent-blue">For Engineers.</span>
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                M Akram is a software engineer and enterprise AI trainer who has designed production AI systems on Google Cloud. The academy distills that experience into a curriculum that treats AI as what it is — a software engineering discipline.
              </p>
              <p className="text-base text-text-secondary leading-relaxed">
                The goal is not to produce prompt engineers. The goal is to produce AI architects who can deploy, evaluate, monitor, and secure production LLM applications in regulated enterprise environments.
              </p>
            </motion.div>

            {/* Trainer card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="p-10 rounded-3xl border border-border-primary/50 bg-bg-card shadow-level-2 flex flex-col gap-6"
            >
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-blue to-accent-teal flex items-center justify-center font-manrope font-extrabold text-white text-2xl shadow-level-1">
                  MA
                </div>
                <div>
                  <h3 className="font-manrope font-bold text-xl text-text-primary">M Akram</h3>
                  <span className="text-sm text-text-secondary font-mono">Enterprise AI Trainer · GCP Architect</span>
                </div>
              </div>
              <div className="h-[1px] bg-border-primary/50" />
              <div className="grid grid-cols-2 gap-4 text-sm">
                {[
                  { label: "Specialization", value: "RAG & Agent Systems" },
                  { label: "Cloud Platform", value: "Google Cloud (GCP)" },
                  { label: "Cohorts Trained", value: "Enterprise Teams" },
                  { label: "Academy Format", value: "12 Weeks, 16+ Labs" },
                ].map((item) => (
                  <div key={item.label} className="flex flex-col gap-0.5">
                    <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-widest">{item.label}</span>
                    <span className="font-semibold text-text-primary">{item.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values / Philosophy */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 flex flex-col gap-16" ref={contentRef}>
        <div className="flex flex-col items-center text-center gap-4">
          <h2 className="font-manrope font-bold text-4xl text-text-primary">Core Teaching Philosophy</h2>
          <p className="text-text-secondary max-w-xl">Six engineering principles that define every lesson, lab and live session in the academy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 28 }}
                animate={contentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="group p-8 rounded-2xl border border-border-primary/50 bg-bg-card hover:shadow-level-2 hover:-translate-y-1 transition-all"
              >
                <div className={`w-11 h-11 rounded-xl ${v.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <Icon size={22} className={v.color} />
                </div>
                <h3 className="font-manrope font-bold text-xl text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
                  {v.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">{v.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
