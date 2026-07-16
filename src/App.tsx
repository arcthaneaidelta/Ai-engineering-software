import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { LoadingScreen } from "./components/LoadingScreen";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { HomePage } from "./pages/HomePage";
import { CurriculumPage } from "./pages/CurriculumPage";
import { ArchitecturePage } from "./pages/ArchitecturePage";
import { LabsPage } from "./pages/LabsPage";
import { PlaygroundPage } from "./pages/PlaygroundPage";
import { CapstonePage } from "./pages/CapstonePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

type PageId =
  | "home"
  | "curriculum"
  | "architecture"
  | "labs"
  | "playground"
  | "capstone"
  | "about"
  | "contact";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] as const } },
};

const renderPage = (
  pageId: PageId,
  setCurrentPage: (page: string) => void
): React.ReactNode => {
  switch (pageId) {
    case "home":
      return <HomePage setCurrentPage={setCurrentPage} />;
    case "curriculum":
      return <CurriculumPage setCurrentPage={setCurrentPage} />;
    case "architecture":
      return <ArchitecturePage />;
    case "labs":
      return <LabsPage />;
    case "playground":
      return <PlaygroundPage />;
    case "capstone":
      return <CapstonePage setCurrentPage={setCurrentPage} />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    default:
      return <HomePage setCurrentPage={setCurrentPage} />;
  }
};

// Scroll-to-top button
const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-40 w-11 h-11 rounded-full border border-border-primary bg-bg-card shadow-level-2 flex items-center justify-center text-text-secondary hover:text-accent-blue hover:border-accent-blue hover:-translate-y-1 transition-all duration-200 cursor-pointer"
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
};

const AppContent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageId>("home");

  const handlePageChange = (page: string) => {
    setCurrentPage(page as PageId);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary transition-colors duration-300">
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} />

          <AnimatePresence mode="wait">
            <motion.main
              key={currentPage}
              variants={pageVariants}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              {renderPage(currentPage, handlePageChange)}
            </motion.main>
          </AnimatePresence>

          <Footer setCurrentPage={handlePageChange} />
          <ScrollToTopButton />
        </>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
