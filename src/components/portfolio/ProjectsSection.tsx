import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Github, Server, Smartphone } from "lucide-react";

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
  status: "live" | "in-progress" | "stopped";
  /** Auto-advance duration in ms — tuned per content type */
  duration: number;
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
    title: "Mouqawel.tn",
    category: "Construction · Mobile App",
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
    title: "Bisou",
    category: "Food & Beverage · Mobile App",
    description:
      "Modern mobile app with strong branding, designed for scalability and future features like loyalty and ordering.",
    technologies: ["Team Management","Flutter", "Git","Figma","UI/UX Design","flutter_bloc","animations"],
    github: "",
    videoId: "qRSv_clT194",
    imageUrl: "/bisou.png",
    visualMode: "cover",
    status: "in-progress",
    duration: 9000,
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
  const [isInView, setIsInView] = useState(false);

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
    if (isPaused) return;
    const t = window.setTimeout(() => scrollToSlide(activeLoopIndex + 1), currentDuration);
    return () => window.clearTimeout(t);
  }, [activeLoopIndex, isPaused, currentDuration, scrollToSlide]);

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
    <section ref={sectionRef} id="projects" className="py-24 overflow-hidden">
      {/* ── Section Header ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-16 text-center"
      >
        <span className="section-label mb-5 inline-flex">Featured Work</span>
        <h2 className="text-4xl font-display font-bold mt-5 mb-3 tracking-tight">
          Built With <span className="text-gradient">Purpose</span>
        </h2>
        <div className="section-heading-line" />
        <p className="text-muted-foreground max-w-xl mx-auto mt-5 text-sm leading-relaxed">
          A curated selection of projects showcasing real-world impact and engineering depth.
        </p>
      </motion.div>

      {/* ── Carousel + navigation wrapped for unified pause ────────── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
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
                      ? "0 0 0 1px rgba(168,85,247,0.12), 0 32px 80px rgba(0,0,0,0.6), 0 0 60px rgba(168,85,247,0.08)"
                      : "0 8px 32px rgba(0,0,0,0.3)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: isActive ? 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  aria-hidden={!isActive}
                  style={{ background: "rgba(16,16,31,0.92)" }}
                >
                  <div className="grid lg:grid-cols-2">
                    {/* ── Left: Content ───────────────────────────── */}
                    <div className="p-8 flex flex-col justify-center space-y-4 lg:min-h-[420px]">
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
                        className="text-2xl font-display font-bold tracking-tight"
                      >
                        {project.title}
                      </motion.h3>

                      <motion.p
                        animate={{ opacity: isActive ? 1 : 0.45 }}
                        transition={{ duration: 0.35, delay: 0.08 }}
                        className="text-muted-foreground text-sm leading-relaxed"
                      >
                        {project.description}
                      </motion.p>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="badge-tech">{tech}</span>
                        ))}
                      </div>

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
                            <Github size={15} /> Code
                          </a>
                        )}
                        {(project.playStoreUrl || project.appStoreUrl) && (() => {
                          const href = getAppStoreLink(project);
                          if (!href) return null;
                          return (
                            <a
                              href={href}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-primary flex items-center gap-2"
                              tabIndex={isActive ? 0 : -1}
                            >
                              <Smartphone size={15} /> Get the App
                            </a>
                          );
                        })()}
                      </motion.div>
                    </div>

                    {/* ── Right: Visual ───────────────────────────── */}
                    <div className="relative h-[380px] lg:h-full overflow-hidden bg-black">
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
                          project.status === "stopped" ? (
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

                      {/* Video (Bisou active) */}
                      {project.videoId && isActive ? (
                        <iframe
                          title={`${project.title} preview`}
                          className="w-full h-full"
                          src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${project.videoId}`}
                          allow="autoplay"
                        />
                      ) : project.visualMode === "wide-pan" ? (
                        /* Wide-pan (Sunshine, TunisiePromo) */
                        <div className="relative h-full w-full overflow-hidden bg-[#07131f]">
                          <img
                            src={project.imageUrl}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full object-cover opacity-20 blur-xl scale-110"
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
                        <div className="relative h-full w-full overflow-hidden bg-[#07131f]">
                          {/* Blurred ambient background */}
                          <img
                            src={project.imageUrl}
                            alt=""
                            aria-hidden
                            className="absolute inset-0 h-full w-full object-cover object-top opacity-15 blur-xl scale-110"
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
                        background: "linear-gradient(90deg, #a855f7, #5b7be8)",
                        animation: `progress-deplete ${currentDuration}ms linear forwards`,
                        animationPlayState: isPaused ? "paused" : "running",
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

        {/* ── Navigation ──────────────────────────────────────────────── */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {/* Prev */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={goPrev}
            className="w-9 h-9 rounded-full border border-border/50 bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-violet-500/40 hover:shadow-[0_0_14px_rgba(168,85,247,0.18)] transition-all duration-200"
            aria-label="Previous project"
          >
            <ChevronLeft size={16} />
          </motion.button>

          {/* Progress ring dots */}
          <div className="flex items-center gap-3">
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
                          animationPlayState: isPaused ? "paused" : "running",
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

          {/* Next */}
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
      </div>
    </section>
  );
};

export default ProjectsSection;
