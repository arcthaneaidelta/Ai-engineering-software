import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { InteractiveArchitecture } from "../components/InteractiveArchitecture";
import { ArrowRight, ChevronDown, Zap, Shield, Brain, BarChart2, Cloud, Target, CheckCircle, X } from "lucide-react";

interface HeroSectionProps {
  setCurrentPage: (page: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

// Section reveal animation hook
const useSectionReveal = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  return { ref, inView };
};

// Animated stat counter
const AnimatedCounter: React.FC<{ value: number; suffix?: string; prefix?: string }> = ({ value, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(value / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, value);
      setCount(start);
      if (start >= value) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  );
};

export const HomePage: React.FC<HeroSectionProps> = ({ setCurrentPage }) => {
  const [demoOpen, setDemoOpen] = useState(false);
  const missionRef = useSectionReveal();
  const problemRef = useSectionReveal();
  const techRef = useSectionReveal();
  const statsRef = useSectionReveal();
  const featuresRef = useSectionReveal();
  const whyRef = useSectionReveal();

  const problemRows = {
    traditional: [
      "Prompt Engineering Only",
      "Toy Projects & Tutorials",
      "No Production Deployment",
      "No Evaluation Framework",
      "No Monitoring Setup",
      "No Security Hardening",
    ],
    aifirst: [
      "Enterprise RAG Architecture",
      "Production-Grade Capstone",
      "Cloud Run & Vertex AI Deploy",
      "LLM-as-a-Judge Evaluation",
      "Distributed Telemetry & Tracing",
      "Cloud DLP & Guardrail Design",
    ],
  };

  const techLogos = [
    { name: "Google Cloud", color: "#4285F4" },
    { name: "Vertex AI", color: "#0EA5E9" },
    { name: "Gemini", color: "#8B5CF6" },
    { name: "Cloud Run", color: "#16A34A" },
    { name: "LangChain", color: "#F59E0B" },
    { name: "Docker", color: "#2563EB" },
    { name: "FastAPI", color: "#10B981" },
    { name: "TypeScript", color: "#3178C6" },
  ];

  const features = [
    {
      icon: Brain,
      title: "Retrieval Augmented Generation",
      desc: "Build scalable RAG systems using Vertex Vector Search with semantic chunking, embedding pipelines, and grounding policies.",
      color: "text-purple-500",
      bg: "bg-purple-500/8",
    },
    {
      icon: Zap,
      title: "Agentic Tool Calling",
      desc: "Orchestrate autonomous agents that dynamically select backend tools using Gemini Function Calling with JSON schema enforcement.",
      color: "text-amber-500",
      bg: "bg-amber-500/8",
    },
    {
      icon: Cloud,
      title: "Serverless Deployment",
      desc: "Deploy containerized microservices to Cloud Run with auto-scaling, concurrency control, and zero-downtime rollouts.",
      color: "text-sky-500",
      bg: "bg-sky-500/8",
    },
    {
      icon: BarChart2,
      title: "Evaluation Framework",
      desc: "Implement ROUGE, BLEU, and LLM-as-a-Judge pipelines using Vertex AI Evaluation API for automated quality regressions.",
      color: "text-emerald-500",
      bg: "bg-emerald-500/8",
    },
    {
      icon: Shield,
      title: "Security Hardening",
      desc: "Enforce Cloud DLP PII redaction, prompt injection defenses, and OAuth 2.0 API boundaries aligned with OWASP LLM Top 10.",
      color: "text-rose-500",
      bg: "bg-rose-500/8",
    },
    {
      icon: Target,
      title: "Observability & Tracing",
      desc: "Instrument distributed traces using OpenTelemetry, Cloud Trace, and structured JSON logs mapped to latency SLA targets.",
      color: "text-indigo-500",
      bg: "bg-indigo-500/8",
    },
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-bg-primary bg-grid-pattern">
        {/* Subtle gradient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-accent-blue/4 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/4 blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-28 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <motion.div
              className="flex flex-col gap-8"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {/* Eyebrow label */}
              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-full text-[11px] font-bold font-mono tracking-widest bg-accent-blue/10 text-accent-blue uppercase border border-accent-blue/20">
                  Google Cloud · Vertex AI · Gemini
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h1
                variants={fadeUp}
                className="font-manrope font-extrabold text-[52px] md:text-[68px] xl:text-[80px] leading-[1.05] tracking-tight text-text-primary"
              >
                Building{" "}
                <span className="text-accent-blue">AI Engineers</span>,
                <br />
                Not AI Users.
              </motion.h1>

              {/* Subheading */}
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-[520px]"
              >
                A 12-week enterprise curriculum teaching architects, developers and tech leads to build, deploy and evaluate production AI systems on Google Cloud.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => setCurrentPage("curriculum")}
                  className="group h-14 px-8 rounded-full bg-accent-blue text-white text-base font-semibold hover:bg-accent-blue/90 shadow-level-2 hover:-translate-y-[2px] transition-all duration-250 flex items-center gap-2.5 cursor-pointer active:scale-95"
                >
                  Explore Curriculum
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => setDemoOpen(true)}
                  className="group h-14 px-8 rounded-full border border-border-primary bg-bg-card hover:bg-bg-secondary text-text-primary text-base font-semibold hover:-translate-y-[1px] transition-all duration-250 flex items-center gap-2.5 cursor-pointer shadow-level-1"
                >
                  Watch Live Demo
                  <span className="w-5 h-5 rounded-full border-2 border-text-secondary flex items-center justify-center group-hover:border-accent-blue transition-colors">
                    <span className="w-0 h-0 border-l-[6px] border-l-text-secondary group-hover:border-l-accent-blue border-y-[4px] border-y-transparent ml-0.5 transition-colors" />
                  </span>
                </button>
              </motion.div>

              {/* Trust signal */}
              <motion.p variants={fadeUp} className="text-xs text-text-muted font-mono tracking-wider">
                Enterprise-grade curriculum · No prior AI experience required · Full stack production delivery
              </motion.p>
            </motion.div>

            {/* Right: Architecture Diagram */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:flex flex-col"
            >
              <InteractiveArchitecture compact />
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-muted cursor-pointer hover:text-text-secondary transition-colors"
            onClick={() => window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" })}
          >
            <span className="text-[10px] font-mono tracking-widest uppercase">Scroll</span>
            <ChevronDown size={18} className="animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* ─── MISSION STATEMENT ──────────────────────────────────────── */}
      <section
        ref={missionRef.ref}
        className="relative py-32 bg-bg-secondary overflow-hidden"
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-8">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={missionRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase"
          >
            Our Philosophy
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={missionRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-manrope font-extrabold text-[40px] md:text-[56px] xl:text-[72px] leading-[1.1] tracking-tight text-text-primary max-w-[900px]"
          >
            Enterprise AI isn't about prompting.
            <br />
            <span className="text-accent-teal">It's about engineering.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={missionRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-[640px] leading-relaxed"
          >
            The engineers who build the next decade of AI products won't just use APIs — they will architect systems, evaluate models, deploy infrastructure, and secure production environments.
          </motion.p>
        </div>
      </section>

      {/* ─── STATS ROW ──────────────────────────────────────────────── */}
      <section ref={statsRef.ref} className="py-20 bg-bg-primary border-y border-border-primary/40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { val: 12, suffix: " Weeks", label: "Enterprise Curriculum" },
              { val: 16, suffix: "+ Labs", label: "Production Environments" },
              { val: 6, suffix: " Cloud", label: "GCP Services Covered" },
              { val: 98, suffix: "%", label: "Evaluation Accuracy Rate" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={statsRef.inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="flex flex-col gap-2 p-6 rounded-2xl border border-border-primary/50 bg-bg-card shadow-level-1 text-center"
              >
                <span className="font-manrope font-extrabold text-4xl text-text-primary">
                  <AnimatedCounter value={stat.val} suffix={stat.suffix} />
                </span>
                <span className="text-xs font-mono text-text-muted uppercase tracking-widest">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROBLEM VS SOLUTION ──────────────────────────────────── */}
      <section ref={problemRef.ref} className="py-32 bg-bg-secondary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={problemRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] font-mono font-bold tracking-[0.25em] text-text-muted uppercase"
            >
              The Difference
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={problemRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-manrope font-extrabold text-4xl md:text-5xl text-text-primary"
            >
              Most AI courses teach prompts.
              <br />
              <span className="text-text-secondary font-semibold">Enterprise teams need engineers.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Traditional */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={problemRef.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="p-8 rounded-2xl border border-rose-500/20 bg-rose-500/4 flex flex-col gap-4"
            >
              <h3 className="font-manrope font-bold text-lg text-rose-500">
                Traditional Learning
              </h3>
              <div className="flex flex-col gap-3">
                {problemRows.traditional.map((row, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                    <X size={16} className="text-rose-500 shrink-0" />
                    {row}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* AI First */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={problemRef.inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-8 rounded-2xl border border-accent-success/25 bg-accent-success/4 flex flex-col gap-4"
            >
              <h3 className="font-manrope font-bold text-lg text-accent-success">
                AI-First Engineering
              </h3>
              <div className="flex flex-col gap-3">
                {problemRows.aifirst.map((row, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-accent-success shrink-0" />
                    {row}
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Divider statement */}
          <div className="text-center">
            <span className="font-manrope font-extrabold text-4xl md:text-5xl text-text-primary/20 dark:text-text-primary/15 select-none">
              Enterprise AI is Engineering.
            </span>
          </div>
        </div>
      </section>

      {/* ─── FEATURES GRID ──────────────────────────────────────────── */}
      <section ref={featuresRef.ref} className="py-32 bg-bg-primary">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col gap-16">
          <div className="flex flex-col items-center text-center gap-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={featuresRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase"
            >
              Curriculum Pillars
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={featuresRef.inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-manrope font-extrabold text-4xl md:text-5xl text-text-primary max-w-3xl"
            >
              Everything required to ship AI to production.
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={featuresRef.inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.07 }}
                  className="group p-8 rounded-2xl border border-border-primary/50 bg-bg-card hover:shadow-level-2 hover:-translate-y-1 transition-all duration-250 cursor-default"
                >
                  <div className={`w-11 h-11 rounded-xl ${feat.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={22} className={feat.color} />
                  </div>
                  <h3 className="font-manrope font-bold text-xl text-text-primary mb-3 group-hover:text-accent-blue transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {feat.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── TECH TRUST LOGOS ───────────────────────────────────────── */}
      <section ref={techRef.ref} className="py-20 bg-bg-secondary border-y border-border-primary/40">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex flex-col items-center gap-10">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={techRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-[11px] font-mono font-semibold tracking-[0.2em] text-text-muted uppercase text-center"
          >
            Production Stack · 8 Enterprise Technologies
          </motion.p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {techLogos.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={techRef.inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="px-5 py-2.5 rounded-xl border border-border-primary/50 bg-bg-card hover:border-accent-blue/40 hover:shadow-level-1 transition-all duration-200 cursor-default"
              >
                <span className="font-manrope font-semibold text-sm text-text-secondary">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA SECTION ────────────────────────────────────────────── */}
      <section ref={whyRef.ref} className="py-40 bg-bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[500px] bg-gradient-to-r from-transparent via-accent-blue/4 to-transparent" />
        </div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-10">
          <motion.h2
            initial={{ opacity: 0, y: 32 }}
            animate={whyRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-manrope font-extrabold text-5xl md:text-[72px] xl:text-[96px] leading-[1.0] tracking-tight text-text-primary"
          >
            Learn.
            <br />
            <span className="text-accent-blue">Build.</span>
            <br />
            Deploy.
            <br />
            <span className="text-accent-teal">Scale.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={whyRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-text-secondary max-w-[540px] leading-relaxed"
          >
            Join an enterprise curriculum designed for engineers ready to lead AI transformation — not just understand it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={whyRef.inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex gap-4"
          >
            <button
              onClick={() => setCurrentPage("contact")}
              className="group h-14 px-10 rounded-full bg-accent-blue text-white text-base font-semibold hover:bg-accent-blue/90 shadow-level-2 hover:-translate-y-[2px] transition-all duration-250 flex items-center gap-2.5 cursor-pointer"
            >
              Book a Demo Session
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Demo Video Modal */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-2xl border border-border-primary bg-bg-card p-8 flex flex-col gap-4 shadow-level-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-manrope font-bold text-xl text-text-primary">Live Demo Preview</h3>
              <button onClick={() => setDemoOpen(false)} className="p-2 rounded-full hover:bg-bg-secondary text-text-secondary cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <div className="w-full aspect-video bg-bg-secondary rounded-xl border border-border-primary flex items-center justify-center">
              <div className="text-center flex flex-col items-center gap-3 text-text-muted">
                <div className="w-14 h-14 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center">
                  <span className="w-0 h-0 border-l-[18px] border-l-accent-blue border-y-[12px] border-y-transparent ml-1" />
                </div>
                <p className="text-sm text-text-secondary">Full demo available during onboarding session.</p>
                <button
                  onClick={() => { setDemoOpen(false); setCurrentPage("contact"); }}
                  className="text-xs font-semibold text-accent-blue underline cursor-pointer"
                >
                  Book a 30-minute demo call →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
