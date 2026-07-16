import React from "react";
import { ArrowUp, GitBranch, ExternalLink, Mail, Shield, BookOpen, Terminal, Cpu } from "lucide-react";

interface FooterProps {
  setCurrentPage: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-bg-secondary border-t border-border-primary/50 relative overflow-hidden transition-colors duration-300">
      {/* Decorative top border glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent-blue/30 to-transparent" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Academy & Socials */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleLinkClick("home")}>
              <div className="w-7 h-7 rounded-md bg-accent-blue flex items-center justify-center text-white font-bold text-xs tracking-wider">
                AI
              </div>
              <span className="font-manrope font-bold text-base tracking-tight text-text-primary">
                AI-First Academy
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed max-w-[280px]">
              Empowering engineers to architect, deploy, and scale enterprise-grade AI applications and autonomous agent systems.
            </p>
            {/* Social Icons with elegant hover animations */}
            <div className="flex items-center gap-4 mt-2">
              <a
                href="#github"
                className="p-2.5 rounded-full border border-border-primary/60 bg-bg-card hover:bg-bg-secondary text-text-secondary hover:text-accent-blue transition-all duration-250 hover:scale-115"
                aria-label="GitHub"
              >
                <GitBranch size={18} />
              </a>
              <a
                href="#linkedin"
                className="p-2.5 rounded-full border border-border-primary/60 bg-bg-card hover:bg-bg-secondary text-text-secondary hover:text-accent-blue transition-all duration-250 hover:scale-115"
                aria-label="LinkedIn"
              >
                <ExternalLink size={18} />
              </a>
              <a
                href="mailto:contact@ai-first-academy.com"
                className="p-2.5 rounded-full border border-border-primary/60 bg-bg-card hover:bg-bg-secondary text-text-secondary hover:text-accent-blue transition-all duration-250 hover:scale-115"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="font-manrope font-semibold text-xs tracking-widest text-text-primary uppercase mb-2 flex items-center gap-1.5">
              <BookOpen size={14} className="text-accent-blue" />
              Sitemap
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <button onClick={() => handleLinkClick("home")} className="text-text-secondary hover:text-accent-blue cursor-pointer transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("curriculum")} className="text-text-secondary hover:text-accent-blue cursor-pointer transition-colors">
                  Curriculum
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("architecture")} className="text-text-secondary hover:text-accent-blue cursor-pointer transition-colors">
                  Architecture Explorer
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("labs")} className="text-text-secondary hover:text-accent-blue cursor-pointer transition-colors">
                  Interactive Labs
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick("playground")} className="text-text-secondary hover:text-accent-blue cursor-pointer transition-colors">
                  AI Playground
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Technologies */}
          <div className="flex flex-col gap-4">
            <h3 className="font-manrope font-semibold text-xs tracking-widest text-text-primary uppercase mb-2 flex items-center gap-1.5">
              <Cpu size={14} className="text-accent-teal" />
              Stack & Platforms
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li className="text-text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Google Cloud & Vertex AI
              </li>
              <li className="text-text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500" /> Gemini & LLM Orchestration
              </li>
              <li className="text-text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Vector Search & RAG
              </li>
              <li className="text-text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Cloud Run & Docker
              </li>
              <li className="text-text-secondary flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> FastAPI & LangChain
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div className="flex flex-col gap-4">
            <h3 className="font-manrope font-semibold text-xs tracking-widest text-text-primary uppercase mb-2 flex items-center gap-1.5">
              <Shield size={14} className="text-accent-success" />
              Newsletter
            </h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Subscribe for enterprise AI design patterns, code snippets, and lab releases.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 mt-2">
              <input
                type="email"
                placeholder="Enter work email"
                required
                className="w-full h-11 px-4 rounded-xl bg-bg-card border border-border-primary/60 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue transition-all"
              />
              <button
                type="submit"
                className="w-full h-11 rounded-xl bg-text-primary text-bg-primary text-sm font-semibold hover:bg-text-primary/95 transition-all cursor-pointer shadow-level-1 active:scale-98"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer bottom separator */}
        <div className="h-[1px] bg-border-primary/45 w-full my-8" />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xs text-text-muted font-mono tracking-wider">
            © 2026 All rights reserved. M Akram
          </span>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-xs font-semibold text-text-secondary hover:text-accent-blue transition-colors cursor-pointer group"
          >
            Back to Top
            <span className="p-2 rounded-full border border-border-primary/60 bg-bg-card group-hover:-translate-y-1 transition-all duration-200 shadow-level-1">
              <ArrowUp size={12} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
