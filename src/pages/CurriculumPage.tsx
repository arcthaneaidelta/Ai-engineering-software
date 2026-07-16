import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CurriculumTimeline } from "../components/CurriculumTimeline";
import { ArrowRight } from "lucide-react";

interface CurriculumPageProps {
  setCurrentPage: (page: string) => void;
}

export const CurriculumPage: React.FC<CurriculumPageProps> = ({ setCurrentPage }) => {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

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
              12-Week Enterprise Curriculum
            </span>
            <h1 className="font-manrope font-extrabold text-5xl md:text-6xl text-text-primary leading-tight">
              Your Journey from
              <br />
              <span className="text-accent-blue">Developer to AI Engineer.</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              Each week builds directly on the last. By week 12, you will have delivered a production-grade, grounded AI application deployed on Google Cloud.
            </p>
            <div className="flex gap-4 flex-wrap mt-2">
              {["12 Weeks", "16+ Labs", "1 Capstone", "Full GCP Stack"].map((badge) => (
                <span key={badge} className="px-4 py-2 rounded-full text-xs font-semibold bg-bg-card border border-border-primary/50 text-text-secondary">
                  {badge}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20">
        <CurriculumTimeline />
      </div>

      {/* CTA footer of page */}
      <div className="bg-bg-secondary border-t border-border-primary/50 py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center flex flex-col items-center gap-6">
          <h2 className="font-manrope font-bold text-3xl md:text-4xl text-text-primary">
            Ready to begin your AI engineering journey?
          </h2>
          <p className="text-text-secondary max-w-md">
            Book a consultation and discuss how this curriculum adapts to your team's enterprise technology stack.
          </p>
          <button
            onClick={() => setCurrentPage("contact")}
            className="group h-14 px-8 rounded-full bg-accent-blue text-white text-base font-semibold hover:bg-accent-blue/90 shadow-level-2 hover:-translate-y-[2px] transition-all flex items-center gap-2.5 cursor-pointer"
          >
            Schedule Demo
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
