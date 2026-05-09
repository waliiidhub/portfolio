import { useEffect, useRef } from "react";
import Navigation from "./Navigation";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import LanguagesSection from "./LanguagesSection";
import MotivationSection from "./MotivationSection";

const PortfolioLayout = () => {
  const autoScrollStartedRef = useRef(false);

  useEffect(() => {
    if (window.location.hash) return;

    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });

    const scrollKeys = new Set([
      "ArrowDown",
      "ArrowUp",
      "End",
      "Home",
      "PageDown",
      "PageUp",
      " ",
    ]);

    let hasUserScrolled = false;

    const markUserScrolled = () => {
      if (!autoScrollStartedRef.current) {
        hasUserScrolled = true;
      }
    };

    const handleWindowScroll = () => {
      if (!autoScrollStartedRef.current && window.scrollY > 4) {
        hasUserScrolled = true;
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (scrollKeys.has(event.key)) {
        markUserScrolled();
      }
    };

    window.addEventListener("wheel", markUserScrolled, { passive: true });
    window.addEventListener("touchmove", markUserScrolled, { passive: true });
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    const timer = window.setTimeout(() => {
      if (hasUserScrolled) return;

      const projects = document.getElementById("projects");
      if (!projects) return;

      autoScrollStartedRef.current = true;
      projects.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 10000);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("wheel", markUserScrolled);
      window.removeEventListener("touchmove", markUserScrolled);
      window.removeEventListener("scroll", handleWindowScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      <main>
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <EducationSection />
        <LanguagesSection />
        <MotivationSection />
      </main>
    </div>
  );
};

export default PortfolioLayout;
