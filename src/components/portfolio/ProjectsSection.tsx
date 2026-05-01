import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  github?: string;
  downloadUrl?: string;
  videoId?: string;
  imageUrl: string;
  visualMode: "wide-pan" | "cover";
}

const projects: Project[] = [
  {
    title: "Sunshine Vacances",
    category: "Travel · Mobile App",
    description:
      "Travel agency app for Sunshine Vacances, helping customers browse trips and reach the agency from a polished mobile experience.",
    technologies: ["Flutter", "Travel", "Mobile UX", "Android", "iOS"],
    github: "",
    downloadUrl:
      "https://play.google.com/store/apps/details?id=com.zenifytrip.sunshinevacances.app&hl=en-US",
    imageUrl: "/sunshine_demo.png",
    visualMode: "wide-pan",
  },
  {
    title: "TunisiePromo",
    category: "Retail · Mobile App",
    description:
      "Deals and promotions discovery platform for Tunisian consumers — browse real-time offers across retail, food, and services with a fast, clean mobile experience.",
    technologies: ["Flutter", "REST APIs", "Android", "iOS"],
    github: "",
    imageUrl: "/tunisiepormo_demo.png",
    visualMode: "wide-pan",
  },
  {
    title: "Mouqawel.tn",
    category: "Construction · Mobile App",
    description:
      "Mobile application designed for contractors, delivering fast access to services with a mobile-first UX.",
    technologies: ["Flutter", "MVVM", "Provider", "Figma"],
    github: "https://github.com/walidmz/Mouqawel-app",
    imageUrl: "/image.png",
    visualMode: "cover",
  },
  {
    title: "Bisou",
    category: "Food & Beverage · Mobile App",
    description:
      "Modern mobile app with strong branding, designed for scalability and future features like loyalty and ordering.",
    technologies: ["Flutter", "Git"],
    github: "",
    videoId: "qRSv_clT194",
    imageUrl: "/bisou.png",
    visualMode: "cover",
  },
];

const LOOP_COPIES = 5;
const MIDDLE_COPY = Math.floor(LOOP_COPIES / 2);
const FIRST_SAFE = projects.length;
const LAST_SAFE = projects.length * (LOOP_COPIES - 1);

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollFrameRef = useRef<number | null>(null);
  const [activeLoopIndex, setActiveLoopIndex] = useState(projects.length * MIDDLE_COPY);
  const [isPaused, setIsPaused] = useState(false);

  const loopedProjects = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => projects).flat(),
    []
  );
  const activeProjectIndex = activeLoopIndex % projects.length;

  const scrollToSlide = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
    const container = containerRef.current;
    const slide = slideRefs.current[index];
    if (!container || !slide) return;
    container.scrollTo({
      left: slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2,
      behavior,
    });
  }, []);

  const goToProject = useCallback(
    (projectIndex: number) => {
      // Navigate to the safest, closest copy of the target project
      const safeCopies = Array.from({ length: LOOP_COPIES }, (_, i) => i * projects.length + projectIndex)
        .filter((idx) => idx >= FIRST_SAFE && idx < LAST_SAFE);
      const closest = safeCopies.reduce((a, b) =>
        Math.abs(a - activeLoopIndex) < Math.abs(b - activeLoopIndex) ? a : b
      );
      setActiveLoopIndex(closest);
      scrollToSlide(closest);
    },
    [activeLoopIndex, scrollToSlide]
  );

  const goPrev = useCallback(() => {
    scrollToSlide(activeLoopIndex - 1);
  }, [activeLoopIndex, scrollToSlide]);

  const goNext = useCallback(() => {
    scrollToSlide(activeLoopIndex + 1);
  }, [activeLoopIndex, scrollToSlide]);

  useEffect(() => {
    scrollToSlide(projects.length * MIDDLE_COPY, "auto");
  }, [scrollToSlide]);

  useEffect(() => {
    if (isPaused) return;
    const interval = window.setInterval(() => {
      scrollToSlide(activeLoopIndex + 1);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [activeLoopIndex, isPaused, scrollToSlide]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getClosestSlideIndex = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      return slideRefs.current.reduce((closestIndex, slide, index) => {
        if (!slide) return closestIndex;
        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;
        const currentDistance = Math.abs(slideCenter - containerCenter);
        const closestSlide = slideRefs.current[closestIndex];
        if (!closestSlide) return index;
        const closestRect = closestSlide.getBoundingClientRect();
        const closestCenter = closestRect.left + closestRect.width / 2;
        const closestDistance = Math.abs(closestCenter - containerCenter);
        return currentDistance < closestDistance ? index : closestIndex;
      }, 0);
    };

    const keepLoopCentered = (index: number) => {
      if (index < FIRST_SAFE || index >= LAST_SAFE) {
        const normalizedIndex = index % projects.length;
        const resetIndex = projects.length * MIDDLE_COPY + normalizedIndex;
        setActiveLoopIndex(resetIndex);
        scrollToSlide(resetIndex, "auto");
        return;
      }
      setActiveLoopIndex(index);
    };

    const handleScroll = () => {
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = window.requestAnimationFrame(() => {
        keepLoopCentered(getClosestSlideIndex());
      });
    };

    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [scrollToSlide]);

  return (
    <section id="projects" className="py-24 overflow-hidden">
      {/* ── Section Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <span className="section-label mb-5 inline-flex">Featured Work</span>
        <h2 className="text-4xl font-display font-bold mt-5 mb-3 tracking-tight">
          Built With{" "}
          <span className="text-gradient">Purpose</span>
        </h2>
        <div className="section-heading-line" />
        <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-sm leading-relaxed">
          A curated selection of projects showcasing real-world impact and engineering depth.
        </p>
      </motion.div>

      {/* ── Carousel ── */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto px-[12vw] snap-x snap-mandatory scroll-smooth no-scrollbar [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        {loopedProjects.map((project, index) => {
          const isActive = index === activeLoopIndex;

          return (
            <motion.div
              key={`${project.title}-${index}`}
              ref={(node) => { slideRefs.current[index] = node; }}
              className="snap-center shrink-0 w-[82vw] max-w-5xl rounded-2xl border overflow-hidden"
              animate={{
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.4,
                filter: isActive ? "blur(0px)" : "blur(2px)",
                borderColor: isActive
                  ? "rgba(168, 85, 247, 0.4)"
                  : "rgba(168, 85, 247, 0.1)",
                boxShadow: isActive
                  ? "0 0 0 1px rgba(168,85,247,0.12), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(168,85,247,0.08)"
                  : "0 8px 32px rgba(0,0,0,0.3)",
              }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              aria-hidden={!isActive}
              style={{ background: "rgba(16, 16, 31, 0.92)" }}
            >
              <div className="grid lg:grid-cols-2">
                {/* ── Left: Content ── */}
                <div className="p-8 flex flex-col justify-center space-y-4">
                  {/* Category label */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="section-label" style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}>
                      {project.category}
                    </span>
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      y: isActive ? 0 : 6,
                    }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
                    className="text-2xl font-display font-bold tracking-tight"
                  >
                    {project.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    animate={{ opacity: isActive ? 1 : 0.45 }}
                    transition={{ duration: 0.35, delay: 0.08 }}
                    className="text-muted-foreground text-sm leading-relaxed"
                  >
                    {project.description}
                  </motion.p>

                  {/* Tech badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="badge-tech">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons — only fully visible on active card */}
                  <motion.div
                    animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                    className="flex flex-wrap gap-3 pt-2"
                  >
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-outline flex items-center gap-2"
                        tabIndex={isActive ? 0 : -1}
                      >
                        <Github size={15} />
                        Code
                      </a>
                    )}
                    {project.downloadUrl ? (
                      <a
                        href={project.downloadUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-primary flex items-center gap-2"
                        tabIndex={isActive ? 0 : -1}
                      >
                        <Download size={15} />
                        Play Store
                      </a>
                    ) : !project.github ? (
                      <button
                        className="btn-primary flex items-center gap-2"
                        tabIndex={isActive ? 0 : -1}
                      >
                        <ExternalLink size={15} />
                        View
                      </button>
                    ) : null}
                  </motion.div>
                </div>

                {/* ── Right: Visual ── */}
                <div className="relative h-[380px] lg:h-full overflow-hidden bg-black">
                  {project.videoId && isActive ? (
                    <iframe
                      title={`${project.title} preview`}
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.videoId}`}
                      allow="autoplay"
                    />
                  ) : project.visualMode === "wide-pan" ? (
                    <div className="relative h-full w-full overflow-hidden bg-[#07131f]">
                      {/* Blurred background atmosphere */}
                      <img
                        src={project.imageUrl}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover opacity-20 blur-xl scale-110"
                        aria-hidden="true"
                      />
                      {/* Phone frame container */}
                      <div className="absolute inset-y-6 left-1/2 w-[72%] -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/40 shadow-2xl shadow-black/50">
                        <motion.img
                          src={project.imageUrl}
                          alt={`${project.title} preview`}
                          className="h-full max-w-none object-contain"
                          animate={
                            isActive
                              ? { x: ["0%", "-56%", "0%"] }
                              : { x: "-18%" }
                          }
                          transition={
                            isActive
                              ? {
                                  duration: 12,
                                  ease: "easeInOut",
                                  repeat: Infinity,
                                  repeatDelay: 0.8,
                                }
                              : { duration: 0.45 }
                          }
                        />
                        {/* Side fade masks */}
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45),transparent_18%,transparent_82%,rgba(0,0,0,0.45))]" />
                        {/* Top shine */}
                        <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/10 to-transparent" />
                      </div>
                      {/* Pagination dots indicator */}
                      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                        <span className="h-1.5 w-6 rounded-full bg-white/80" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                        <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="w-full h-full object-cover"
                    />
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ── Navigation ── */}
      <div className="mt-8 flex items-center justify-center gap-4">
        {/* Prev arrow */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={goPrev}
          className="w-9 h-9 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-violet-500/40 hover:shadow-[0_0_14px_rgba(168,85,247,0.18)] transition-all duration-200"
          aria-label="Previous project"
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Animated pill dots */}
        <div className="flex items-center gap-2">
          {projects.map((proj, i) => (
            <motion.button
              key={i}
              onClick={() => goToProject(i)}
              animate={{
                width: activeProjectIndex === i ? 28 : 8,
                opacity: activeProjectIndex === i ? 1 : 0.3,
                backgroundColor: activeProjectIndex === i ? "#a855f7" : "#a855f7",
              }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="h-2 rounded-full"
              aria-label={`Go to ${proj.title}`}
            />
          ))}
        </div>

        {/* Next arrow */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={goNext}
          className="w-9 h-9 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-violet-500/40 hover:shadow-[0_0_14px_rgba(168,85,247,0.18)] transition-all duration-200"
          aria-label="Next project"
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>
    </section>
  );
};

export default ProjectsSection;
