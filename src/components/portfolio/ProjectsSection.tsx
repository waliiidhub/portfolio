import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Server, Play } from "lucide-react";

interface Project {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  github?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  videoId?: string;
  imageUrl: string;
  visualMode: "wide-pan" | "tall-pan" | "cover";
  platform?: "mobile" | "servers";
  status: "live" | "in-progress" | "stopped" | "finished";
  /** Render videoId inside a phone mockup frame instead of full-panel */
  phoneFrame?: boolean;
  /** Auto-advance duration in ms — tuned per content type */
  duration: number;
  /** Key feature highlights — triggers the features-grid right panel */
  highlights?: string[];
  /** External demo / video URL */
  demoUrl?: string;
  /** General embed URL (Google Drive preview, etc.) — used instead of videoId in phone frame */
  videoEmbedUrl?: string;
  /** Phone frame background theme */
  frameTheme?: "ai";
  /** Award label displayed as an animated badge */
  award?: string;
}

function getAppStoreLink(project: Project): string | null {
  const ua = navigator.userAgent;
  const isAndroid = /android/i.test(ua);
  const isIOS = /iphone|ipad|ipod/i.test(ua);

  if (isAndroid && project.playStoreUrl) return project.playStoreUrl;
  if (isIOS && project.appStoreUrl) return project.appStoreUrl;
  // Desktop / unknown → Play Store web page as fallback
  return project.playStoreUrl ?? project.appStoreUrl ?? null;
}

const projects: Project[] = [
  {
    title: "Sunshine Vacances",
    category: "Travel Agency · Mobile App",
    description:
      "Travel agency app for Sunshine Vacances, helping customers browse trips and reach the agency from a polished mobile experience.",
    technologies: ["Flutter", "Dio", "Riverpod", "GoRouter", "flutter_flavor","Websockets","FCM","Firebase","Matrix","Design Systems", "Figma","SOLID principles","Clean Architecture","Unit & Integration Testing","CI/CD","Agile Methodologies", "Git"],
    github: "",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.zenifytrip.sunshinevacances.app&hl=en-US",
    appStoreUrl: "https://apps.apple.com/us/app/sunshine-vacances/id6761716491",
    imageUrl: "/sunshine_demo.png",
    visualMode: "wide-pan",
    status: "live",
    duration: 8500,
  },
  {
    title: "TunisiePromo",
    category: "Travel Agency · Mobile App",
    description:
      "A curated deals and voyage promotions app for the Tunisian market — connecting users with the best travel offers through a fast, minimal interface built for quick decisions.",
    technologies: ["Flutter", "Dio", "Riverpod", "GoRouter", "flutter_flavor","Websockets","FCM","Firebase","Matrix","Design Systems", "Figma","SOLID principles","Clean Architecture","Unit & Integration Testing","CI/CD","Agile Methodologies", "Git"],
    github: "",
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.zenifytrip.tunisiepromo.app",
    appStoreUrl: "https://apps.apple.com/us/app/tunisie-promo-deals-voyage/id6758765132",
    imageUrl: "/tunisiepormo_demo.png",
    visualMode: "wide-pan",
    status: "live",
    duration: 8500,
  },
  {
    title: "ZenifyTrip Backend",
    category: "Travel Tech · Backend API",
    description:
      "Enterprise REST API powering a multi-tenant travel management platform — orchestrating end-to-end group journeys across flights, hotels, transfers, and activities, with real-time WebSocket coordination, multi-channel push notifications, and automated Excel reporting across agencies, guides, and operators.",
    technologies: ["NestJS", "TypeScript", "PostgreSQL", "Socket.io", "Firebase FCM", "JWT", "Passport", "Docker", "Swagger", "Jest", "Sequelize", "ExcelJS","Synapse", "Git", "Agile Methodologies", "CI/CD","SOLID principles","Modular Monolith Architecture"],
    imageUrl: "/zenifytrip_backend_demo.png",
    visualMode: "tall-pan",
    platform: "servers",
    status: "live",
    duration: 7000,
  },
  {
    title: "Bisou",
    category: "Food & Beverage · Mobile App · Freelance",
    description:
      "Modern mobile app with strong branding, designed for scalability and future features like loyalty and ordering.",
    technologies: ["Team Management","Flutter", "Git","Figma","UI/UX Design","flutter_bloc","animations"],
    github: "",
    videoId: "qRSv_clT194",
    imageUrl: "/bisou.png",
    visualMode: "cover",
    phoneFrame: true,
    status: "in-progress",
    duration: 9000,
  },
  {
    title: "Mouqawel.tn",
    category: "Construction · Mobile App · Freelance",
    description:
      "Mobile application designed for contractors, delivering fast access to services with a mobile-first UX.",
    technologies: ["Flutter", "MVVM", "Provider", "Figma"],
    github: "https://github.com/walidmz/Mouqawel-app",
    imageUrl: "/image.png",
    visualMode: "cover",
    status: "stopped",
    duration: 5500,
  },
  {
    title: "AiRecruit Platform",
    category: "AI · Full-Stack · Academic Project",
    description:
      "AI-powered recruitment platform combining web, mobile, and ML to streamline hiring — managing job offers, candidate applications, intelligent assessments, and recruiter workflows end-to-end.",
    technologies: ["React.js", "TypeScript", "Python", "Machine Learning", "Flutter", "Figma", "REST APIs", "Git"],
    videoEmbedUrl: "https://drive.google.com/file/d/1UkhCBSk97n5u746UANV6P1crr8pApDP2/preview",
    award: "2nd Place · Esprit Project Fair 2024",
    imageUrl: "/airecruit_demo.png",
    visualMode: "cover",
    phoneFrame: true,
    frameTheme: "ai",
    status: "finished",
    duration: 12000,
  },
];

const LOOP_COPIES = 5;
const MIDDLE_COPY = Math.floor(LOOP_COPIES / 2);
const FIRST_SAFE = projects.length;
const LAST_SAFE = projects.length * (LOOP_COPIES - 1);

// SVG progress ring geometry (r=7, viewBox 20×20, origin at center 10,10)
const RING_R = 7;
const RING_C = parseFloat((2 * Math.PI * RING_R).toFixed(2)); // 43.98

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollFrameRef = useRef<number | null>(null);

  const [activeLoopIndex, setActiveLoopIndex] = useState(projects.length * MIDDLE_COPY);
  const [isPaused, setIsPaused] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [expandedBadges, setExpandedBadges] = useState<Set<string>>(new Set());
  const toggleBadges = useCallback((title: string) => {
    setExpandedBadges(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  }, []);

  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  // Reset video player when the active slide changes
  useEffect(() => { setPlayingVideo(null); }, [activeLoopIndex]);

  const loopedProjects = useMemo(
    () => Array.from({ length: LOOP_COPIES }, () => projects).flat(),
    []
  );

  const activeProjectIndex = activeLoopIndex % projects.length;
  const currentDuration = projects[activeProjectIndex].duration;

  // ── Navigation helpers ──────────────────────────────────────────────
  const scrollToSlide = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const container = containerRef.current;
      const slide = slideRefs.current[index];
      if (!container || !slide) return;
      container.scrollTo({
        left: slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2,
        behavior,
      });
    },
    []
  );

  const goToProject = useCallback(
    (projectIndex: number) => {
      const safeCopies = Array.from(
        { length: LOOP_COPIES },
        (_, i) => i * projects.length + projectIndex
      ).filter((idx) => idx >= FIRST_SAFE && idx < LAST_SAFE);
      const closest = safeCopies.reduce((a, b) =>
        Math.abs(a - activeLoopIndex) < Math.abs(b - activeLoopIndex) ? a : b
      );
      setActiveLoopIndex(closest);
      scrollToSlide(closest);
    },
    [activeLoopIndex, scrollToSlide]
  );

  const goPrev = useCallback(
    () => scrollToSlide(activeLoopIndex - 1),
    [activeLoopIndex, scrollToSlide]
  );

  const goNext = useCallback(
    () => scrollToSlide(activeLoopIndex + 1),
    [activeLoopIndex, scrollToSlide]
  );

  // ── Initial position ────────────────────────────────────────────────
  useEffect(() => {
    scrollToSlide(projects.length * MIDDLE_COPY, "auto");
  }, [scrollToSlide]);

  // ── Auto-advance: per-card duration, resets on every card change ────
  useEffect(() => {
    if (isPaused || hasInteracted || !isInView) return;
    const t = window.setTimeout(() => scrollToSlide(activeLoopIndex + 1), currentDuration);
    return () => window.clearTimeout(t);
  }, [activeLoopIndex, isPaused, hasInteracted, isInView, currentDuration, scrollToSlide]);

  // ── Scroll tracking + infinite loop reset ──────────────────────────
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const getClosest = () => {
      const cc = container.getBoundingClientRect().left + container.clientWidth / 2;
      return slideRefs.current.reduce((best, slide, i) => {
        if (!slide) return best;
        const sc = slide.getBoundingClientRect().left + slide.clientWidth / 2;
        const bestSlide = slideRefs.current[best];
        if (!bestSlide) return i;
        const bc = bestSlide.getBoundingClientRect().left + bestSlide.clientWidth / 2;
        return Math.abs(sc - cc) < Math.abs(bc - cc) ? i : best;
      }, 0);
    };

    const keepCentered = (idx: number) => {
      if (idx < FIRST_SAFE || idx >= LAST_SAFE) {
        const norm = idx % projects.length;
        const reset = projects.length * MIDDLE_COPY + norm;
        setActiveLoopIndex(reset);
        scrollToSlide(reset, "auto");
        return;
      }
      setActiveLoopIndex(idx);
    };

    const onScroll = () => {
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
      scrollFrameRef.current = window.requestAnimationFrame(() =>
        keepCentered(getClosest())
      );
    };

    container.addEventListener("scroll", onScroll);
    return () => {
      container.removeEventListener("scroll", onScroll);
      if (scrollFrameRef.current) window.cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [scrollToSlide]);

  // ── IntersectionObserver for keyboard nav ──────────────────────────
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => setIsInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  // ── Keyboard navigation ────────────────────────────────────────────
  useEffect(() => {
    if (!isInView) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); goPrev(); }
      else if (e.key === "ArrowRight") { e.preventDefault(); goNext(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isInView, goPrev, goNext]);

  return (
    <section ref={sectionRef} id="projects" className="py-14 md:py-24 overflow-hidden relative">
      {/* Section background ambiance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 50% at 15% 50%, hsl(262 83% 68% / 0.065) 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 40% at 85% 50%, hsl(230 68% 62% / 0.05) 0%, transparent 65%)",
          ].join(", "),
        }}
      />

      {/* ── Section Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10 md:mb-16 text-center relative z-10"
      >
        <span className="section-label mb-5 inline-flex">Featured Work</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold mt-5 mb-3 tracking-tight">
          Built With <span className="text-gradient">Purpose</span>
        </h2>
        <div className="section-heading-line" />
        <p className="text-muted-foreground/80 max-w-lg mx-auto mt-5 text-sm md:text-base leading-relaxed">
          A curated selection of projects showcasing real-world impact and engineering depth.
        </p>
      </motion.div>

      {/* ── Carousel + navigation wrapped for unified pause ────────── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        onClick={() => setHasInteracted(true)}
      >
        {/* Scroll container */}
        <div className="relative">
          <div
            ref={containerRef}
            className="flex gap-6 overflow-x-auto px-[12vw] snap-x snap-mandatory scroll-smooth no-scrollbar [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
          >
            {loopedProjects.map((project, index) => {
              const isActive = index === activeLoopIndex;

              return (
                <motion.div
                  key={`${project.title}-${index}`}
                  ref={(node) => { slideRefs.current[index] = node; }}
                  className="snap-center shrink-0 w-[82vw] max-w-5xl rounded-2xl border overflow-hidden relative"
                  animate={{
                    scale: isActive ? 1 : 0.88,
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? "blur(0px)" : "blur(2px)",
                    borderColor: isActive
                      ? "rgba(168,85,247,0.4)"
                      : "rgba(168,85,247,0.1)",
                    boxShadow: isActive
                      ? "0 0 0 1px rgba(168,85,247,0.15), 0 32px 80px rgba(0,0,0,0.65), 0 0 80px rgba(168,85,247,0.10)"
                      : "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: isActive ? 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden={!isActive}
                  style={{ background: "linear-gradient(110deg, rgba(22,14,38,0.96) 0%, rgba(16,16,31,0.94) 42%, rgba(11,11,22,0.97) 100%)" }}
                >
                  <div className="grid lg:grid-cols-2">
                    {/* ── Left: Content ───────────────────────────── */}
                    <div className="p-5 md:p-8 flex flex-col justify-center space-y-4 lg:min-h-[420px]">
                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 4 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <span
                          className="section-label"
                          style={{ fontSize: "0.6rem", letterSpacing: "0.18em" }}
                        >
                          {project.category}
                        </span>
                      </motion.div>

                      <motion.h3
                        animate={{ opacity: isActive ? 1 : 0.6, y: isActive ? 0 : 6 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.04 }}
                        className="text-2xl lg:text-3xl font-display font-bold tracking-tight"
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        animate={{ opacity: isActive ? 1 : 0.45 }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                        className="text-muted-foreground/85 text-sm leading-relaxed"
                      >
                        {project.description}
                      </motion.p>

                      {(() => {
                        const VISIBLE = 9;
                        const isExpanded = expandedBadges.has(project.title);
                        const hiddenTechs = project.technologies.slice(VISIBLE);
                        const overflow = hiddenTechs.length;
                        return (
                          <div className="flex flex-wrap gap-2 items-center">
                            {project.technologies.slice(0, VISIBLE).map((tech) => (
                              <span key={tech} className="badge-tech">{tech}</span>
                            ))}

                            <AnimatePresence>
                              {isExpanded && hiddenTechs.map((tech, idx) => (
                                <motion.span
                                  key={`x-${tech}`}
                                  initial={{ opacity: 0, scale: 0.5, y: 8, rotate: -5 }}
                                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                                  exit={{ opacity: 0, scale: 0.5, y: 8, rotate: -5 }}
                                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: idx * 0.045 }}
                                  className="badge-tech"
                                >
                                  {tech}
                                </motion.span>
                              ))}
                            </AnimatePresence>

                            <AnimatePresence mode="wait">
                              {overflow > 0 && !isExpanded && (
                                <motion.button
                                  key="overflow"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.12 } }}
                                  whileHover={{ scale: 1.12, boxShadow: "0 0 16px hsl(262 83% 68% / 0.5)" }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => { e.stopPropagation(); toggleBadges(project.title); }}
                                  tabIndex={isActive ? 0 : -1}
                                  className="badge-tech cursor-pointer select-none"
                                  style={{
                                    borderColor: "hsl(262 83% 68% / 0.45)",
                                    color: "hsl(262 83% 80%)",
                                    boxShadow: "0 0 6px hsl(262 83% 68% / 0.2)",
                                  }}
                                >
                                  +{overflow} more
                                </motion.button>
                              )}
                              {isExpanded && overflow > 0 && (
                                <motion.button
                                  key="collapse"
                                  initial={{ opacity: 0, scale: 0.7 }}
                                  animate={{ opacity: 1, scale: 1, transition: { delay: hiddenTechs.length * 0.045 + 0.06 } }}
                                  exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.12 } }}
                                  whileHover={{ scale: 1.08 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => { e.stopPropagation(); toggleBadges(project.title); }}
                                  tabIndex={isActive ? 0 : -1}
                                  className="badge-tech cursor-pointer select-none"
                                  style={{
                                    borderColor: "hsl(262 83% 68% / 0.28)",
                                    color: "hsl(262 83% 68% / 0.65)",
                                  }}
                                >
                                  show less
                                </motion.button>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })()}

                      {project.award && (
                        <motion.div
                          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10, scale: isActive ? 1 : 0.92 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                          className="relative inline-flex items-center gap-2.5 self-start"
                        >
                          {/* Outer glow ring */}
                          <motion.div
                            className="absolute inset-0 rounded-full pointer-events-none"
                            animate={isActive ? { boxShadow: ["0 0 0px hsl(45 90% 55% / 0)", "0 0 18px hsl(45 90% 55% / 0.55)", "0 0 8px hsl(45 90% 55% / 0.25)", "0 0 18px hsl(45 90% 55% / 0.55)", "0 0 0px hsl(45 90% 55% / 0)"] } : { boxShadow: "none" }}
                            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                          />
                          <div
                            className="relative flex items-center gap-2.5 px-4 py-2 rounded-full overflow-hidden"
                            style={{
                              background: "linear-gradient(110deg, rgba(30,22,8,0.95) 0%, rgba(40,28,6,0.9) 100%)",
                              border: "1px solid hsl(45 80% 52% / 0.5)",
                              boxShadow: "0 0 12px hsl(45 90% 55% / 0.18), inset 0 1px 0 rgba(255,215,0,0.1)",
                            }}
                          >
                            {/* Shimmer sweep */}
                            <motion.span
                              className="absolute inset-0 pointer-events-none"
                              style={{ background: "linear-gradient(90deg, transparent 20%, rgba(255,215,0,0.12) 50%, transparent 80%)" }}
                              animate={{ x: ["-100%", "100%"] }}
                              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
                            />
                            {/* Trophy icon */}
                            <motion.span
                              animate={isActive ? { rotate: [-4, 4, -4] } : { rotate: 0 }}
                              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                              className="text-base leading-none select-none"
                              style={{ filter: "drop-shadow(0 0 6px hsl(45 90% 60% / 0.7))" }}
                            >
                              🏆
                            </motion.span>
                            <span
                              className="relative text-xs font-semibold tracking-wide"
                              style={{ color: "hsl(45 90% 68%)", textShadow: "0 0 12px hsl(45 90% 55% / 0.5)" }}
                            >
                              {project.award}
                            </span>
                          </div>
                        </motion.div>
                      )}

                      <motion.div
                        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
                        className="flex flex-wrap gap-3 pt-2"
                      >
                        {project.github && (
                          <motion.a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            tabIndex={isActive ? 0 : -1}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium border border-violet-500/40 bg-violet-500/10 text-violet-300 hover:bg-violet-500/20 hover:border-violet-400/60 hover:text-violet-200 transition-all duration-200"
                          >
                            <Github size={15} /> Code
                          </motion.a>
                        )}
                        {(project.playStoreUrl || project.appStoreUrl) && (() => {
                          const href = getAppStoreLink(project);
                          if (!href) return null;
                          return (
                            <motion.a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              tabIndex={isActive ? 0 : -1}
                              whileHover={{
                                scale: 1.07,
                                y: -2,
                                boxShadow: "0 0 36px hsl(262 83% 68% / 0.7), 0 8px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.22)",
                              }}
                              whileTap={{ scale: 0.94 }}
                              className="group relative inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-semibold overflow-hidden text-white"
                              style={{
                                background: "linear-gradient(135deg, hsl(262 83% 58%) 0%, hsl(230 68% 52%) 55%, hsl(262 83% 63%) 100%)",
                                boxShadow: "0 0 20px hsl(262 83% 68% / 0.38), 0 4px 18px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.16)",
                              }}
                            >
                              {/* Shimmer sweep */}
                              <span
                                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out pointer-events-none"
                                style={{ background: "linear-gradient(90deg, transparent 20%, rgba(255,255,255,0.18) 50%, transparent 80%)" }}
                              />
                              {/* Apple + Android icons */}
                              <span className="relative flex items-center gap-1 opacity-80 shrink-0">
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                </svg>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                  <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
                                </svg>
                              </span>
                              <span className="relative tracking-wide">Get the App</span>
                            </motion.a>
                          );
                        })()}
                      </motion.div>
                    </div>

                    {/* ── Right: Visual ───────────────────────────── */}
                    <div className="relative h-[240px] sm:h-[320px] lg:h-full overflow-hidden bg-black">
                      {/* Status badge */}
                      <motion.div
                        animate={
                          isActive
                            ? { opacity: 1, x: 0 }
                            : { opacity: 0, x: -6 }
                        }
                        transition={{ duration: 0.4, delay: isActive ? 0.18 : 0, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-4 left-4 z-10 flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide backdrop-blur-md select-none pointer-events-none"
                        style={
                          project.status === "live"
                            ? { background: "rgba(34,197,94,0.12)", borderColor: "rgba(34,197,94,0.28)", color: "#86efac" }
                            : project.status === "stopped"
                            ? { background: "rgba(239,68,68,0.10)", borderColor: "rgba(239,68,68,0.28)", color: "#fca5a5" }
                            : project.status === "finished"
                            ? { background: "rgba(99,102,241,0.12)", borderColor: "rgba(99,102,241,0.32)", color: "#a5b4fc" }
                            : { background: "rgba(251,191,36,0.10)", borderColor: "rgba(251,191,36,0.25)", color: "#fcd34d" }
                        }
                      >
                        {project.status === "live" ? (
                          <>
                            <span className="relative flex h-2 w-2 shrink-0">
                              <span className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-70" style={{ background: "#22c55e" }} />
                              <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
                            </span>
                            {project.platform === "servers" ? (
                              <>
                                <span className="tracking-wide">Live</span> 
                                <span className="tracking-wide">Servers</span>
                                 <Server size={13} />
                              </>
                            ) : (
                              <>
                                <span className="tracking-wide">Live on</span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-label="Apple">
                                  <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                                </svg>
                                <span className="opacity-30 text-[10px] leading-none">·</span>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-label="Android">
                                  <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
                                </svg>
                              </>
                            )}
                          </>
                        ) : (
                          project.status === "finished" ? (
                            <>
                              <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                                <polyline points="2,6 5,9 10,3" />
                              </svg>
                              Finished
                            </>
                          ) : project.status === "stopped" ? (
                            <>
                              <span
                                className="relative inline-flex h-2 w-2 rounded-full shrink-0"
                                style={{ background: "#ef4444" }}
                              />
                              Stopped
                            </>
                          ) : (
                            <>
                              <span
                                className="relative inline-flex h-2 w-2 rounded-full shrink-0"
                                style={{
                                  background: "#fbbf24",
                                  animation: "pulse 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
                                }}
                              />
                              In Progress
                            </>
                          )
                        )}
                      </motion.div>

                      {/* Ghost project number */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute top-4 right-5 font-display font-bold select-none pointer-events-none z-10 tabular-nums leading-none"
                          style={{
                            fontSize: "clamp(3.5rem, 6vw, 5rem)",
                            color: "rgba(255,255,255,0.07)",
                          }}
                        >
                          {String(activeProjectIndex + 1).padStart(2, "0")}
                        </motion.div>
                      )}

                      {project.frameTheme === "ai" && project.videoEmbedUrl ? (
                        /* ── AiRecruit: AI-themed rectangular demo player ── */
                        <div
                          className="relative h-full w-full overflow-hidden"
                          style={{ background: "linear-gradient(160deg, hsl(210 20% 4%), hsl(190 45% 7%))" }}
                        >
                          {/* Ambient teal glow */}
                          <div className="absolute inset-0 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse 100% 90% at 50% 55%, hsl(185 70% 42% / 0.11), transparent 65%)" }}
                          />
                          {/* Data grid */}
                          <div className="absolute inset-0 pointer-events-none"
                            style={{
                              backgroundImage: "linear-gradient(rgba(20,184,166,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,0.05) 1px, transparent 1px)",
                              backgroundSize: "36px 36px",
                            }}
                          />
                          {/* Scanning line */}
                          <motion.div
                            className="absolute inset-x-0 h-px pointer-events-none"
                            style={{
                              top: 0, zIndex: 5,
                              background: "linear-gradient(90deg, transparent 0%, hsl(185 100% 62% / 0.5) 30%, hsl(185 100% 78% / 0.9) 50%, hsl(185 100% 62% / 0.5) 70%, transparent 100%)",
                              boxShadow: "0 0 10px hsl(185 100% 65% / 0.45), 0 0 22px hsl(185 100% 65% / 0.18)",
                            }}
                            animate={{ y: [0, 420] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                          />
                          {/* Corner brackets */}
                          <svg className="absolute bottom-[52px] left-4 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="hsl(185 100% 62%)" strokeWidth="1.4" style={{ opacity: 0.35 }}>
                            <path d="M1 8v7h7" />
                          </svg>
                          <svg className="absolute bottom-[52px] right-4 pointer-events-none" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="hsl(185 100% 62%)" strokeWidth="1.4" style={{ opacity: 0.35 }}>
                            <path d="M15 8v7H8" />
                          </svg>
                          {/* Neural node dots */}
                          <span className="absolute top-[20%] right-[8%] w-1.5 h-1.5 rounded-full pointer-events-none" style={{ background: "hsl(185 100% 62% / 0.28)", boxShadow: "0 0 6px hsl(185 100% 62% / 0.35)" }} />
                          <span className="absolute top-[32%] right-[16%] w-1 h-1 rounded-full pointer-events-none" style={{ background: "hsl(185 100% 62% / 0.18)" }} />
                          <span className="absolute bottom-[25%] left-[8%] w-1.5 h-1.5 rounded-full pointer-events-none" style={{ background: "hsl(185 100% 62% / 0.28)", boxShadow: "0 0 6px hsl(185 100% 62% / 0.35)" }} />

                          {/* ── Video rectangle ── */}
                          <div className="absolute inset-x-4 top-14 bottom-12">
                            <motion.div
                              className="relative w-full h-full overflow-hidden rounded-2xl"
                              animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0.5, scale: 0.97 }}
                              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              style={{
                                border: "1px solid hsl(185 100% 62% / 0.24)",
                                boxShadow: isActive
                                  ? "0 0 0 1px hsl(185 100% 62% / 0.08), 0 0 36px hsl(185 83% 42% / 0.22), 0 0 72px hsl(185 83% 42% / 0.09), 0 16px 48px rgba(0,0,0,0.55)"
                                  : "0 8px 32px rgba(0,0,0,0.45)",
                                background: "#000",
                              }}
                            >
                              {/* Top glare */}
                              <div className="absolute inset-x-0 top-0 h-px z-20 pointer-events-none"
                                style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.08) 50%, transparent 90%)" }}
                              />

                              {isActive && playingVideo === project.title ? (
                                <iframe
                                  title={`${project.title} demo`}
                                  className="absolute inset-0 w-full h-full"
                                  style={{ border: "none" }}
                                  src={project.videoEmbedUrl}
                                  allow="autoplay; fullscreen"
                                  allowFullScreen
                                />
                              ) : (
                                <div
                                  className={`absolute inset-0 ${isActive ? "cursor-pointer group" : ""}`}
                                  onClick={isActive ? () => setPlayingVideo(project.title) : undefined}
                                >
                                  {/* Thumbnail — full image, no crop */}
                                  <img
                                    src={project.imageUrl}
                                    alt={`${project.title} preview`}
                                    className="absolute inset-0 w-full h-full object-contain"
                                    style={{ background: "hsl(210 20% 5%)" }}
                                  />
                                  {/* Bottom fade for label */}
                                  <div className="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
                                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                                  />
                                  {/* Play button — only on active card */}
                                  {isActive && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/25 transition-colors duration-200">
                                      <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.93 }}
                                        className="flex items-center justify-center rounded-full"
                                        style={{
                                          width: 52, height: 52,
                                          background: "hsl(185 83% 42% / 0.22)",
                                          border: "1.5px solid hsl(185 100% 62% / 0.55)",
                                          boxShadow: "0 0 28px hsl(185 100% 62% / 0.28), inset 0 1px 0 rgba(255,255,255,0.08)",
                                          backdropFilter: "blur(6px)",
                                        }}
                                      >
                                        <Play size={20} className="text-teal-300 ml-0.5" style={{ fill: "currentColor" }} />
                                      </motion.div>
                                    </div>
                                  )}
                                  <div className="absolute bottom-2.5 inset-x-0 flex justify-center">
                                    <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-teal-400/50 select-none">
                                      {isActive ? "Click to play demo" : "Demo Preview"}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          </div>

                          {/* Label row below video */}
                          <div className="absolute bottom-0 inset-x-4 h-12 flex items-center justify-between pointer-events-none select-none">
                            <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-teal-400/35">
                              AI · Walkthrough
                            </span>
                            <span className="font-mono text-[9px] text-white/20">
                              {isActive ? "playing" : "click card to play"}
                            </span>
                          </div>

                          {/* Bottom ambient glow */}
                          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                            style={{ width: "70%", height: "70px", background: "radial-gradient(ellipse at 50% 100%, hsl(185 83% 42% / 0.26), transparent 70%)", filter: "blur(18px)" }}
                          />
                        </div>
                      ) : project.phoneFrame && (project.videoId || project.videoEmbedUrl) ? (
                        /* ── Phone frame (Bisou / YouTube) ── */
                        <div
                          className="relative h-full w-full flex items-center justify-center overflow-hidden"
                          style={{ background: "linear-gradient(160deg, hsl(0 0% 5%), hsl(262 30% 9%))" }}
                        >
                          {/* Ambient violet glow */}
                          <div className="absolute inset-0 pointer-events-none"
                            style={{ background: "radial-gradient(ellipse 80% 90% at 50% 60%, hsl(262 83% 68% / 0.10), transparent 65%)" }}
                          />
                          {/* Particle dots */}
                          <div className="absolute inset-0 pointer-events-none opacity-30"
                            style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.012) 0px, rgba(255,255,255,0.012) 1px, transparent 1px, transparent 8px)" }}
                          />
                          {/* Screen glow beneath phone */}
                          <motion.div
                            className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
                            animate={{ opacity: isActive ? 1 : 0.35 }}
                            transition={{ duration: 0.5 }}
                            style={{ width: "200px", height: "80px", background: "radial-gradient(ellipse at 50% 100%, hsl(262 83% 68% / 0.38), transparent 70%)", filter: "blur(20px)" }}
                          />
                          {/* Phone body */}
                          <div className="relative overflow-hidden bg-black flex-shrink-0"
                            style={{
                              aspectRatio: "9/16",
                              height: "calc(100% - 28px)",
                              maxHeight: "340px",
                              width: "auto",
                              borderRadius: "2.25rem",
                              boxShadow: "0 0 0 2px hsl(262 83% 68% / 0.38), 0 0 0 8px hsl(0 0% 6%), 0 0 0 10px hsl(0 0% 13%), 0 24px 72px rgba(0,0,0,0.65), 0 0 50px hsl(262 83% 68% / 0.12)",
                            }}
                          >
                            <div className="absolute inset-x-0 top-0 h-[1px] z-20 pointer-events-none"
                              style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.14) 50%, transparent 90%)" }}
                            />
                            {isActive ? (
                              <iframe
                                title={`${project.title} preview`}
                                style={{ position: "absolute", height: "100%", width: `${(256 / 81) * 100}%`, left: "50%", top: 0, transform: "translateX(-50%)", border: "none" }}
                                src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.videoId}`}
                                allow="autoplay"
                              />
                            ) : (
                              <img
                                src={`https://img.youtube.com/vi/${project.videoId}/maxresdefault.jpg`}
                                alt={`${project.title} preview`}
                                className="absolute"
                                style={{ height: "100%", width: `${(256 / 81) * 100}%`, left: "50%", top: 0, transform: "translateX(-50%)", objectFit: "cover" }}
                                onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${project.videoId}/hqdefault.jpg`; }}
                              />
                            )}
                          </div>
                          {!isActive && (
                            <p className="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.22em] text-white/20 select-none whitespace-nowrap">
                              tap to watch
                            </p>
                          )}
                        </div>
                      ) : project.visualMode === "wide-pan" ? (
                        /* Wide-pan (Sunshine, TunisiePromo) */
                        <div className="relative h-full w-full overflow-hidden" style={{ background: "hsl(210 35% 7%)" }}>
                          <img
                            src={project.imageUrl}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full object-cover opacity-[0.28] blur-xl scale-110"
                          />
                          <div className="absolute inset-y-6 left-1/2 w-[72%] -translate-x-1/2 overflow-hidden rounded-[1.75rem] border border-white/15 bg-black/40 shadow-2xl shadow-black/50">
                            <motion.img
                              src={project.imageUrl}
                              alt={`${project.title} preview`}
                              className="h-full max-w-none object-contain"
                              animate={isActive ? { x: ["0%", "-56%", "0%"] } : { x: "-18%" }}
                              transition={
                                isActive
                                  ? { duration: 12, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }
                                  : { duration: 0.45 }
                              }
                            />
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.45),transparent_18%,transparent_82%,rgba(0,0,0,0.45))]" />
                            <div className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-white/10 to-transparent" />
                          </div>
                          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 backdrop-blur-md">
                            <span className="h-1.5 w-6 rounded-full bg-white/80" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                          </div>
                        </div>
                      ) : project.visualMode === "tall-pan" ? (
                        /* Tall-pan: vertical scroll for long screenshots (e.g. Swagger docs) */
                        <div className="relative h-full w-full overflow-hidden" style={{ background: "hsl(210 35% 7%)" }}>
                          {/* Blurred ambient background */}
                          <img
                            src={project.imageUrl}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full object-cover object-top opacity-[0.22] blur-xl scale-110"
                          />
                          {/* Main frame */}
                          <div className="absolute inset-x-5 inset-y-6 overflow-hidden rounded-xl border border-white/15 bg-black/40 shadow-2xl shadow-black/50">
                            <motion.img
                              src={project.imageUrl}
                              alt={`${project.title} preview`}
                              className="w-full h-auto block"
                              animate={isActive ? { y: ["0%", "-82%", "0%"] } : { y: "0%" }}
                              transition={
                                isActive
                                  ? { duration: 24, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 }
                                  : { duration: 0.45 }
                              }
                            />
                            {/* Fade top & bottom */}
                            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),transparent_12%,transparent_88%,rgba(0,0,0,0.5))]" />
                          </div>
                          {/* Browser chrome dots */}
                          <div className="absolute top-7 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-black/50 px-3 py-1.5 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                          </div>
                        </div>
                      ) : (
                        /* Cover + Ken Burns (Mouqawel, Bisou inactive) */
                        <motion.div
                          className="w-full h-full"
                          animate={isActive ? { scale: 1.05 } : { scale: 1.0 }}
                          transition={
                            isActive
                              ? { duration: currentDuration / 1000, ease: "linear" }
                              : { duration: 0.6, ease: "easeOut" }
                          }
                          style={{ transformOrigin: "center center" }}
                        >
                          <img
                            src={project.imageUrl}
                            alt={`${project.title} preview`}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>
                      )}

                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* ── Progress bar (depletes over currentDuration) ── */}
                  {isActive && (
                    <div
                      className="absolute bottom-0 inset-x-0 h-[2px] origin-left"
                      style={{
                        background: "linear-gradient(90deg, hsl(262 83% 72%), hsl(230 68% 65%))",
                        boxShadow: "0 0 8px hsl(262 83% 68% / 0.65)",
                        animation: `progress-deplete ${currentDuration}ms linear forwards`,
                        animationPlayState: (isPaused || hasInteracted) ? "paused" : "running",
                      }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile swipe hint — one-shot, disappears after 2 cycles */}
          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: [0, 0.9, 0.9, 0], x: [0, 10, 10, 18] }}
            transition={{
              duration: 1.8,
              times: [0, 0.25, 0.75, 1],
              delay: 2.5,
              repeat: 1,
              repeatDelay: 0.5,
            }}
            className="absolute right-5 top-1/2 -translate-y-1/2 md:hidden pointer-events-none z-20"
            aria-hidden
          >
            <ChevronRight
              size={22}
              className="text-violet-400"
              style={{ filter: "drop-shadow(0 0 6px rgba(168,85,247,0.8))" }}
            />
          </motion.div>
        </div>

        {/* ── Navigation — frosted glass pill ─────────────────────────── */}
        <div className="mt-8 flex items-center justify-center">
          <div
            className="inline-flex items-center gap-1.5 px-2.5 py-2 rounded-full glass border border-white/[0.07]"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.04)" }}
          >
            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={goPrev}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-violet hover:bg-violet/10 transition-all duration-150"
              aria-label="Previous project"
            >
              <ChevronLeft size={14} />
            </motion.button>

            <div className="w-px h-4 bg-white/[0.1] mx-0.5 shrink-0" />

            {/* Progress ring dots */}
            <div className="flex items-center gap-2.5 px-0.5">
              {projects.map((proj, i) => {
                const isActiveDot = activeProjectIndex === i;
                return (
                  <button
                    key={i}
                    onClick={() => goToProject(i)}
                    aria-label={`Go to ${proj.title}`}
                    className="flex items-center justify-center transition-transform duration-200 hover:scale-110 focus:outline-none"
                    style={{ width: 20, height: 20 }}
                  >
                    {isActiveDot ? (
                      /* Active: SVG progress ring — key resets animation on every advance */
                      <svg
                        key={`ring-${activeLoopIndex}`}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        style={{ display: "block", overflow: "visible" }}
                      >
                        {/* Background fill */}
                        <circle cx="10" cy="10" r={RING_R} fill="rgba(168,85,247,0.2)" />
                        {/* Depleting ring */}
                        <circle
                          cx="10"
                          cy="10"
                          r={RING_R}
                          fill="none"
                          stroke="#a855f7"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeDasharray={RING_C}
                          strokeDashoffset="0"
                          transform="rotate(-90 10 10)"
                          style={{
                            animation: `ring-deplete ${currentDuration}ms linear forwards`,
                            animationPlayState: (isPaused || hasInteracted) ? "paused" : "running",
                          }}
                        />
                        {/* Center dot */}
                        <circle cx="10" cy="10" r="2.5" fill="#a855f7" />
                      </svg>
                    ) : (
                      /* Inactive: plain dot */
                      <span className="block w-2 h-2 rounded-full bg-violet-500/35 transition-colors hover:bg-violet-500/60" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="w-px h-4 bg-white/[0.1] mx-0.5 shrink-0" />

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
              onClick={goNext}
              className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-violet hover:bg-violet/10 transition-all duration-150"
              aria-label="Next project"
            >
              <ChevronRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
