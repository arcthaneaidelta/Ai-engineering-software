import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, ExternalLink, GitBranch, Send, CheckCircle } from "lucide-react";

export const ContactPage: React.FC = () => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // UI-only form submission simulation
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="bg-bg-secondary border-b border-border-primary/50 pt-32 pb-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12" ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-4 max-w-2xl"
          >
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-accent-blue uppercase">
              Get in Touch
            </span>
            <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
              Let's Build
              <br />
              <span className="text-accent-blue">Together.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-lg">
              Ready to upskill your engineering team in enterprise AI? Let's discuss a tailored curriculum path for your organization.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

          {/* Left: Context */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="flex flex-col gap-6"
            >
              <h2 className="font-manrope font-bold text-2xl text-text-primary">
                Reach out directly
              </h2>
              <div className="flex flex-col gap-4">
                {[
                  { icon: Mail, label: "Email", value: "hello@aifirst.academy", href: "mailto:hello@aifirst.academy" },
                  { icon: ExternalLink, label: "LinkedIn", value: "linkedin.com/in/makram", href: "#linkedin" },
                  { icon: GitBranch, label: "GitHub", value: "github.com/makram-ai", href: "#github" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-border-primary/50 bg-bg-card hover:border-accent-blue/40 hover:shadow-level-1 transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent-blue/8 flex items-center justify-center text-accent-blue">
                        <Icon size={18} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">{item.label}</span>
                        <span className="text-sm font-medium text-text-primary group-hover:text-accent-blue transition-colors">{item.value}</span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={headerInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="p-6 rounded-2xl bg-accent-blue/6 border border-accent-blue/15"
            >
              <h3 className="font-manrope font-bold text-base text-text-primary mb-2">What happens next?</h3>
              <ol className="flex flex-col gap-3 text-sm text-text-secondary list-none">
                {[
                  "We respond within 1 business day",
                  "30-minute discovery call scheduled",
                  "Custom curriculum proposal shared",
                  "Pilot cohort kickoff arranged",
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-accent-blue text-white text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={headerInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-3"
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center gap-6 p-10 rounded-2xl border border-accent-success/25 bg-accent-success/4">
                <CheckCircle size={48} className="text-accent-success" />
                <h3 className="font-manrope font-bold text-2xl text-text-primary">Message Received</h3>
                <p className="text-text-secondary max-w-xs">
                  Thank you for reaching out. Expect a response within 1 business day.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "" }); }}
                  className="text-sm font-semibold text-accent-blue underline cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-8 md:p-10 rounded-2xl border border-border-primary/50 bg-bg-card shadow-level-1 flex flex-col gap-6"
              >
                <h2 className="font-manrope font-bold text-2xl text-text-primary">Send a message</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="h-12 px-4 rounded-2xl bg-bg-secondary border border-border-primary/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@enterprise.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="h-12 px-4 rounded-2xl bg-bg-secondary border border-border-primary/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider">Company / Organization</label>
                  <input
                    type="text"
                    placeholder="Acme Corp"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="h-12 px-4 rounded-2xl bg-bg-secondary border border-border-primary/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-text-secondary font-mono uppercase tracking-wider">Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your team, your current stack, and what you'd like to build..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="p-4 rounded-2xl bg-bg-secondary border border-border-primary/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="group h-14 w-full rounded-full bg-accent-blue text-white font-semibold text-base hover:bg-accent-blue/90 shadow-level-1 hover:-translate-y-[1px] transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
                >
                  Let's Build Together
                  <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
