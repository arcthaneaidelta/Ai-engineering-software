import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon, ArrowRight, Menu, X } from "lucide-react";

interface NavbarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "curriculum", label: "Curriculum" },
    { id: "architecture", label: "Architecture" },
    { id: "labs", label: "Labs" },
    { id: "playground", label: "Playground" },
    { id: "capstone", label: "Capstone" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (pageId: string) => {
    setCurrentPage(pageId);
    setMobileMenuOpen(false);
    // Smooth scroll back to top when switching sections to restart experience
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll Progress Bar at the top */}
      <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-accent-blue via-accent-teal to-accent-success transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-bg-primary/80 backdrop-blur-md border-b border-border-primary/50 shadow-level-1"
            : "py-6 bg-transparent"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("home")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center text-white font-bold text-sm tracking-wider">
              AI
            </div>
            <span className="font-manrope font-bold text-lg tracking-tight text-text-primary transition-colors">
              AI-First Academy
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 bg-bg-secondary/40 border border-border-primary/30 rounded-full px-2 py-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                  currentPage === item.id
                    ? "text-accent-blue bg-bg-card shadow-level-1 font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-accent-blue rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Action Area */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Theme Switcher */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-border-primary/45 bg-bg-card hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Book Demo CTA */}
            <button
              onClick={() => handleNavClick("contact")}
              className="group px-6 py-2.5 rounded-full bg-accent-blue text-white text-sm font-semibold hover:bg-accent-blue/90 shadow-level-1 hover:-translate-y-[1px] transition-all duration-200 flex items-center gap-2 cursor-pointer active:scale-95"
            >
              Book Demo
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu & Theme Buttons */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full border border-border-primary/45 bg-bg-card hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-full border border-border-primary/45 bg-bg-card text-text-secondary hover:text-text-primary transition-all duration-200 cursor-pointer"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-bg-card border-b border-border-primary shadow-level-2 py-4 px-6 flex flex-col gap-2 transition-all duration-300">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  currentPage === item.id
                    ? "text-accent-blue bg-bg-secondary font-semibold"
                    : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary/50"
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("contact")}
              className="w-full text-center mt-3 py-3 rounded-full bg-accent-blue text-white font-semibold flex items-center justify-center gap-2 hover:bg-accent-blue/90"
            >
              Book Demo
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </nav>
    </>
  );
};
