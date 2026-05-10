import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Briefcase, MapPin, Calendar, Github, ExternalLink, Play,
  CheckCircle2, Code2, GraduationCap, Building2, Smartphone, ArrowDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Experience {
  id: string;
  type: "work" | "internship";
  company: string;
  role: string;
  period: string;
  year: string;
  duration?: string;
  location: string;
  description: string;
  logoUrl: string;
  tech: string[];
  highlights: string[];
  metrics?: { label: string; value: string }[];
  github?: string;
  demo?: string;
  videoId?: string;
  videoPhoneCrop?: boolean;
  storeLinks?: { label: string; url: string }[];
  isGraduation?: boolean;
  isLive?: boolean;
}

const EXPERIENCE_STATIC = [
  {
    id: "continuousnet",
    type: "work" as const,
    company: "ContinuousNet & ZenifyTrip",
    year: "2026",
    tech: ["NestJS", "Flutter", "FastAPI", "Matrix/Synapse", "Docker", "GitLab CI/CD", "Grafana", "Python", "WebRTC"],
    metricValues: ["3", "3", "9+"],
    logoUrl: "continuousnet.png",
    storeLinkUrls: [
      "https://play.google.com/store/apps/details?id=com.zenifytrip.tunisiepromo.app",
      "https://play.google.com/store/apps/details?id=com.zenifytrip.sunshinevacances.app&hl=en-US",
    ],
    isGraduation: true,
    isLive: true,
  },
  {
    id: "continuousnet-intern",
    type: "internship" as const,
    company: "ContinuousNet & ZenifyTrip",
    year: "2025",
    tech: ["NestJS", "Matrix/Synapse", "FastAPI", "Flutter", "PostgreSQL", "Docker", "GitLab CI/CD", "Portainer", "Grafana", "Prometheus", "WebRTC", "Python"],
    metricValues: ["3", "3", "8"],
    logoUrl: "continuousnet.png",
    videoId: "2jSBJhhQPk0",
    videoPhoneCrop: true,
    isGraduation: true,
    isLive: false,
  },
  {
    id: "codingoat",
    type: "internship" as const,
    company: "CodinGoat",
    year: "2024",
    tech: ["Flutter", "Dart", "Riverpod", "Firebase", "Figma", "Clean Architecture"],
    metricValues: [] as string[],
    logoUrl: "codingoat.png",
    github: "https://github.com/walidmz/CodinGoat",
    isGraduation: false,
    isLive: false,
  },
  {
    id: "esprit",
    type: "internship" as const,
    company: "ESPRIT",
    year: "2023",
    tech: ["Angular", "TypeScript", "RxJS", "Angular Material", "Java", "Spring Boot", "Spring Security", "JWT", "REST API", "MySQL", "Maven", "Jasmine"],
    metricValues: ["2k+", "3", "3"],
    logoUrl: "esprit.png",
    isGraduation: false,
    isLive: false,
  },
  {
    id: "mbm-lab",
    type: "internship" as const,
    company: "MBM LAB",
    year: "2022",
    tech: ["Symfony 6", "PHP 8", "Doctrine ORM", "Twig", "Bootstrap 5", "MySQL", "Webpack Encore", "REST API", "PHPUnit", "Composer"],
    metricValues: ["12", "80%", "40%"],
    logoUrl: "mbm-lab.png",
    isGraduation: false,
    isLive: false,
  },
];

const ExperienceSection = () => {
  const { t } = useTranslation();

  const experiences = useMemo<Experience[]>(() =>
    EXPERIENCE_STATIC.map((s) => {
      const entry = t(`experience.entries.${s.id}`, { returnObjects: true }) as {
        role: string;
        period: string;
        duration?: string;
        location: string;
        description: string;
        highlights: string[];
        metricLabels?: string[];
        storeLinkLabels?: string[];
      };

      const metrics =
        s.metricValues.length > 0 && entry.metricLabels
          ? s.metricValues.map((value, i) => ({ value, label: entry.metricLabels![i] ?? "" }))
          : undefined;

      const storeLinkUrls = "storeLinkUrls" in s ? (s as { storeLinkUrls: string[] }).storeLinkUrls : undefined;
      const storeLinks =
        storeLinkUrls && entry.storeLinkLabels
          ? storeLinkUrls.map((url, i) => ({ url, label: entry.storeLinkLabels![i] ?? url }))
          : undefined;

      return {
        id: s.id,
        type: s.type,
        company: s.company,
        year: s.year,
        tech: s.tech,
        logoUrl: s.logoUrl,
        github: "github" in s ? (s as { github?: string }).github : undefined,
        videoId: "videoId" in s ? (s as { videoId?: string }).videoId : undefined,
        videoPhoneCrop: "videoPhoneCrop" in s ? (s as { videoPhoneCrop?: boolean }).videoPhoneCrop : undefined,
        isGraduation: s.isGraduation,
        isLive: s.isLive,
        role: entry.role,
        period: entry.period,
        duration: entry.duration,
        location: entry.location,
        description: entry.description,
        highlights: entry.highlights,
        metrics,
        storeLinks,
      };
    }), [t]);

  const [selectedId, setSelectedId] = useState<string>("continuousnet");
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const navigatorRef = useRef<HTMLDivElement>(null);
  const isNavigatorInView = useInView(navigatorRef, { once: true, margin: "-60px" });

  const selectedExp = experiences.find((e) => e.id === selectedId)!;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;

      const currentIndex = experiences.findIndex((exp) => exp.id === selectedId);
      if (e.key === "ArrowDown" && currentIndex < experiences.length - 1) {
        setSelectedId(experiences[currentIndex + 1].id);
      }
      if (e.key === "ArrowUp" && currentIndex > 0) {
        setSelectedId(experiences[currentIndex - 1].id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId, experiences]);


  return (
    <motion.section
      id="internships"
      className="py-14 md:py-24 bg-surface-card overflow-hidden relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      {/* Section background ambiance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            "radial-gradient(ellipse 55% 40% at 85% 10%, hsl(262 83% 68% / 0.055) 0%, transparent 70%)",
            "radial-gradient(ellipse 45% 35% at 12% 88%, hsl(230 68% 62% / 0.04) 0%, transparent 60%)",
          ].join(", "),
        }}
      />

      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <Briefcase className="h-3.5 w-3.5" />
              {t("experience.label")}
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">{t("experience.title")}</h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            {t("experience.subtitle")}
          </p>
        </div>

        {/* Two-panel layout */}
        <div className="max-w-6xl mx-auto">

          {/* Mobile chip row — visible only on < md */}
          <div className="md:hidden mb-4">
            <MobileExperienceChips
              experiences={experiences}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div className="md:grid md:grid-cols-[300px_1fr] md:gap-8 md:items-start">

            {/* LEFT: Navigator — hidden on mobile */}
            <div className="hidden md:block">
              <ExperienceNavigator
                experiences={experiences}
                selectedId={selectedId}
                onSelect={setSelectedId}
                isInView={isNavigatorInView}
                ref={navigatorRef}
              />
            </div>

            {/* RIGHT: Detail — sticky on desktop */}
            <div className="md:sticky md:top-24">
              <ExperienceDetail
                experience={selectedExp}
                onWatchDemo={setActiveVideoId}
              />
            </div>

          </div>
        </div>
      </div>

      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white px-3 py-1 rounded-full border border-white/30 bg-black/50 backdrop-blur-sm transition-colors"
            >
              {t("experience.close")}
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="Demo video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </motion.section>
  );
};

const ExperienceNavigator = React.forwardRef<
  HTMLDivElement,
  {
    experiences: Experience[];
    selectedId: string;
    onSelect: (id: string) => void;
    isInView: boolean;
  }
>(({ experiences, selectedId, onSelect, isInView }, ref) => {
  const { t } = useTranslation();

  return (
    <div ref={ref}>
      <div className="relative pl-14" role="tablist" aria-label="Experience entries">

        {/* ── Spine ── */}
        <motion.div
          className="absolute left-[7px] top-[20px] w-[2px] rounded-full pointer-events-none"
          style={{
            bottom: "20px",
            background: "linear-gradient(180deg, hsl(262 83% 78%), hsl(262 83% 68% / 0.25) 80%, transparent)",
            boxShadow: "0 0 8px hsl(262 83% 68% / 0.3)",
            transformOrigin: "top",
          }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* ── Entries ── */}
        {experiences.map((exp, index) => {
          const isSelected = exp.id === selectedId;
          const startsGroup = index === 0 || experiences[index - 1].type !== exp.type;
          return (
            <React.Fragment key={exp.id}>
              {startsGroup && (
                <div className={`ml-1 ${index === 0 ? "mb-2" : "mt-6 mb-2"}`}>
                  <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55">
                    {exp.type === "work" ? t("experience.workGroup") : t("experience.internGroup")}
                  </p>
                </div>
              )}

              <motion.div
                className="relative mb-3 last:mb-0"
                initial={{ opacity: 0, x: -12 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.12, duration: 0.45, ease: [0, 0, 0.2, 1] }}
              >
              {/* Year label — left of the spine */}
              <div
                className="absolute top-[14px] font-mono text-[10px] font-bold leading-none select-none"
                style={{
                  left: "-46px",
                  width: "40px",
                  textAlign: "right",
                  color: isSelected ? "hsl(262 83% 78%)" : "hsl(262 83% 68% / 0.45)",
                  transition: "color 0.2s ease",
                }}
              >
                {exp.year}
              </div>

              {/* Node dot — centered on the spine */}
              <div
                className="absolute left-[-8px] top-[18px] w-4 h-4 rounded-full border-2 z-10 flex items-center justify-center pointer-events-none"
                style={{
                  background: isSelected ? "hsl(248 28% 10%)" : "hsl(243 22% 6%)",
                  borderColor: isSelected ? "hsl(262 83% 80%)" : "hsl(262 83% 68% / 0.38)",
                  boxShadow: isSelected
                    ? "0 0 18px hsl(262 83% 68% / 0.85), 0 0 6px hsl(262 83% 68% / 0.6), 0 0 32px hsl(262 83% 68% / 0.2)"
                    : "0 0 6px hsl(262 83% 68% / 0.2)",
                  transition: "all 0.25s ease",
                }}
              >
                <div
                  className="rounded-full"
                  style={{
                    width: isSelected ? "7px" : "6px",
                    height: isSelected ? "7px" : "6px",
                    background: isSelected ? "hsl(262 83% 82%)" : "hsl(262 83% 68%)",
                    opacity: isSelected ? 1 : 0.45,
                    transition: "all 0.25s ease",
                    boxShadow: isSelected ? "0 0 6px hsl(262 83% 78%)" : "none",
                  }}
                />
              </div>

              {/* Short horizontal connector from dot to card */}
              <div
                className="absolute left-[8px] top-[24px] h-[1px] w-6 pointer-events-none"
                style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.4), transparent)" }}
              />

              {/* Graduation cap — floats above the node for end-of-studies entries */}
              {exp.isGraduation && exp.type === "internship" && (
                <motion.div
                  className="absolute z-20 pointer-events-none"
                  style={{ left: "-20px", top: "-10px" }}
                  initial={{ opacity: 0, y: -18, rotate: -35, scale: 0.4 }}
                  animate={isInView ? { opacity: 1, y: 0, rotate: 0, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.12, duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0], rotate: [-8, 8, -8] }}
                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
                  >
                    <GraduationCap
                      className="w-4 h-4"
                      style={{
                        color: "hsl(45 100% 65%)",
                        filter: "drop-shadow(0 0 6px hsl(45 100% 60% / 0.85)) drop-shadow(0 0 12px hsl(45 100% 60% / 0.4))",
                      }}
                    />
                  </motion.div>
                </motion.div>
              )}

              {/* Selector card */}
              <NavigatorCard
                exp={exp}
                isSelected={isSelected}
                onClick={() => onSelect(exp.id)}
              />
              </motion.div>
            </React.Fragment>
          );
        })}

      </div>
    </div>
  );
});

ExperienceNavigator.displayName = "ExperienceNavigator";

const NavigatorCard = ({
  exp,
  isSelected,
  onClick,
}: {
  exp: Experience;
  isSelected: boolean;
  onClick: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={onClick}
      role="tab"
      aria-selected={isSelected}
      aria-label={`${exp.role} at ${exp.company}`}
      className="relative w-full overflow-hidden rounded-xl border text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60 focus-visible:ring-offset-1 focus-visible:ring-offset-[#0c0c18]"
      style={{
        borderColor: isSelected
          ? "hsl(262 83% 68% / 0.44)"
          : "hsl(262 83% 68% / 0.10)",
        background: isSelected
          ? "linear-gradient(135deg, hsl(262 83% 68% / 0.12) 0%, hsl(243 22% 6%) 100%)"
          : "hsl(243 22% 5%)",
        boxShadow: isSelected
          ? "0 4px 28px rgba(0,0,0,0.45), 0 0 0 1px hsl(262 83% 68% / 0.08), inset 0 1px 0 hsl(262 83% 78% / 0.07)"
          : "none",
        transition: "all 0.22s ease",
      }}
    >
      {/* Left accent bar — animates in when selected */}
      <motion.div
        className="absolute left-0 inset-y-0 w-[3px] rounded-l-xl pointer-events-none"
        initial={false}
        animate={{
          opacity: isSelected ? 1 : 0,
          scaleY: isSelected ? 1 : 0.4,
        }}
        transition={{ duration: 0.2, ease: [0, 0, 0.2, 1] }}
        style={{
          background: "linear-gradient(180deg, hsl(262 83% 78%), hsl(230 68% 62%))",
          transformOrigin: "center",
        }}
      />

      <div className="pl-4 pr-3 py-3">

        {/* Logo + role + meta */}
        <div className="flex items-start gap-2.5">

          {/* Company logo */}
          <div
            className={`shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center p-1.5 mt-0.5 transition-colors duration-200 ${exp.id === "esprit" ? "bg-white/15" : "bg-black/40"}`}
            style={{
              borderColor: isSelected
                ? "hsl(262 83% 68% / 0.28)"
                : "hsl(262 83% 68% / 0.10)",
            }}
          >
            <img
              src={exp.logoUrl}
              alt={exp.company}
              className="w-full h-full object-contain"
              style={{ filter: "grayscale(0.15) brightness(1.05)" }}
            />
          </div>

          {/* Text stack */}
          <div className="flex-1 min-w-0">
            <p
              className="font-display font-semibold text-sm leading-snug truncate transition-colors duration-200"
              style={{ color: isSelected ? "hsl(0 0% 90%)" : "hsl(0 0% 52%)" }}
            >
              {exp.role}
            </p>
            <p className="font-mono text-[10px] text-white/35 mt-0.5 truncate">
              {exp.company}
            </p>
            <p className="font-mono text-[10px] text-white/25 mt-0.5">
              {exp.period}
            </p>
          </div>
        </div>

        {/* Badges row — always shown when flags are set */}
        {(exp.type === "work" || exp.type === "internship" || exp.isLive) && (
          <div className="flex gap-1.5 mt-2 ml-[42px]">
            {exp.type === "work" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-violet/35 bg-violet/[0.08] px-1.5 py-0.5 font-mono text-[8px] font-bold text-violet-bright">
                <Briefcase className="w-2.5 h-2.5" /> {t("experience.badgeWork")}
              </span>
            )}
            {exp.type === "internship" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/25 bg-blue-400/[0.07] px-1.5 py-0.5 font-mono text-[8px] font-bold text-blue-300/80">
                <Building2 className="w-2.5 h-2.5" /> {t("experience.badgeIntern")}
              </span>
            )}
            {exp.isLive && (
              <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/[0.08] px-1.5 py-0.5 font-mono text-[8px] font-bold text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                {t("experience.badgeCurrent")}
              </span>
            )}
          </div>
        )}

      </div>
    </button>
  );
};

const ExperienceDetail = ({
  experience,
  onWatchDemo,
}: {
  experience: Experience;
  onWatchDemo: (id: string) => void;
}) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={experience.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
    >
      <DetailCard experience={experience} onWatchDemo={onWatchDemo} />
    </motion.div>
  </AnimatePresence>
);

const VideoPreview = ({ videoId, phoneCrop = false }: { videoId: string; phoneCrop?: boolean }) => {
  const [playing, setPlaying] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="mb-6">
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3 flex items-center gap-1.5">
        <Play className="w-3 h-3" /> {t("experience.demoPreview")}
      </p>

      <div
        className={phoneCrop ? "mx-auto" : ""}
        style={phoneCrop ? {
          aspectRatio: "9/16",
          maxWidth: "260px",
          width: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "2rem",
          boxShadow: "0 0 0 2px hsl(262 83% 68% / 0.32), 0 0 0 10px hsl(0 0% 7%), 0 8px 48px rgba(0,0,0,0.6), 0 0 60px hsl(262 83% 68% / 0.08)",
        } : {}}
      >
        <div
          className={phoneCrop ? "w-full h-full bg-black" : "relative rounded-xl overflow-hidden bg-black"}
          style={phoneCrop ? {} : {
            aspectRatio: "16/9",
            boxShadow: "0 0 0 1px hsl(262 83% 68% / 0.22), 0 8px 40px rgba(0,0,0,0.5), 0 0 80px hsl(262 83% 68% / 0.06)",
          }}
        >
          <AnimatePresence mode="wait">
            {playing ? (
              <motion.iframe
                key="player"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
                style={phoneCrop ? {
                  position: "absolute",
                  height: "100%",
                  width: `${(256 / 81) * 100}%`,
                  left: "50%",
                  top: 0,
                  transform: "translateX(-50%)",
                  border: "none",
                } : { width: "100%", height: "100%" }}
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title="Project demo"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <motion.div
                key="thumb"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full cursor-pointer group"
                onClick={() => setPlaying(true)}
              >
                {/* Thumbnail */}
                {phoneCrop ? (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Demo preview"
                    className="absolute transition-transform duration-500 group-hover:scale-[1.02]"
                    style={{
                      height: "100%",
                      width: `${(256 / 81) * 100}%`,
                      left: "50%",
                      top: 0,
                      transform: "translateX(-50%)",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                ) : (
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Demo preview"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    }}
                  />
                )}

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent transition-opacity duration-300 group-hover:from-black/50" />

                {/* Ambient violet glow top-right */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 55% 45% at 72% 18%, hsl(262 83% 68% / 0.14), transparent)",
                  }}
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      className="absolute rounded-full border border-white/20"
                      style={{ width: 56, height: 56 }}
                      animate={{ scale: [1, 2.4], opacity: [0.35, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <motion.div
                      className="absolute rounded-full border border-white/12"
                      style={{ width: 56, height: 56 }}
                      animate={{ scale: [1, 2.4], opacity: [0.25, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
                    />
                    <motion.div
                      className="relative w-14 h-14 rounded-full flex items-center justify-center"
                      style={{
                        background:
                          "linear-gradient(135deg, hsl(262 83% 62% / 0.93), hsl(230 68% 56% / 0.93))",
                        boxShadow:
                          "0 0 0 1px hsl(262 83% 78% / 0.28), 0 0 32px hsl(262 83% 68% / 0.55), inset 0 1px 0 rgba(255,255,255,0.12)",
                        backdropFilter: "blur(4px)",
                      }}
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: "spring", stiffness: 380, damping: 22 }}
                    >
                      <Play className="w-6 h-6 text-white ml-0.5" style={{ fill: "white" }} />
                    </motion.div>
                  </div>
                </div>

                {/* Bottom info row */}
                <div className="absolute bottom-0 inset-x-0 px-4 py-3 flex items-end justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/35 mb-0.5">
                      {t("experience.projectShowcase")}
                    </p>
                    <p className="font-display text-sm font-semibold text-white/75">
                      {t("experience.clickDemo")}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-black/55 backdrop-blur-sm px-2.5 py-1 font-mono text-[9px] text-white/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                    {t("experience.youtube")}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ActionBar = ({ exp }: { exp: Experience }) => {
  const { t } = useTranslation();

  if (!exp.demo && !exp.github && !exp.storeLinks?.length) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {exp.storeLinks?.length ? (
        <div className="flex flex-col gap-2">
          <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            <Smartphone className="w-2.5 h-2.5" /> {t("experience.downloadMobile")}
          </span>
          <div className="flex flex-wrap gap-2">
            {exp.storeLinks.map((link) => (
              <Button
                key={link.label}
                size="sm"
                className="text-xs gap-2 text-white shadow-[0_0_18px_hsl(262_83%_68%/0.22)] transition-all duration-200 hover:shadow-[0_0_28px_hsl(262_83%_68%/0.4)]"
                style={{ background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))" }}
                onClick={() => window.open(link.url, "_blank")}
              >
                <span className="relative flex items-center justify-center w-4 h-4 shrink-0">
                  <Smartphone className="w-3.5 h-3.5" />
                  <motion.span
                    className="absolute -bottom-[5px] left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 3, 0], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowDown className="w-2 h-2" />
                  </motion.span>
                </span>
                {link.label}
              </Button>
            ))}
          </div>
        </div>
      ) : null}
      {exp.demo && (
        <Button
          size="sm"
          className="text-xs gap-1.5 text-white shadow-[0_0_18px_hsl(262_83%_68%/0.22)] transition-all duration-200 hover:shadow-[0_0_28px_hsl(262_83%_68%/0.4)]"
          style={{ background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))" }}
          onClick={() => window.open(exp.demo, "_blank")}
        >
          <ExternalLink className="w-3.5 h-3.5" /> {t("experience.liveDemo")}
        </Button>
      )}
      {exp.github && (
        <Button
          variant="outline"
          size="sm"
          className="text-xs gap-1.5 border-violet/20 bg-black/15 text-white/60 hover:border-violet/45 hover:bg-violet/10 hover:text-white transition-all duration-200"
          onClick={() => window.open(exp.github, "_blank")}
        >
          <Github className="w-3.5 h-3.5" /> {t("experience.github")}
        </Button>
      )}
    </div>
  );
};

const TechChips = ({ exp }: { exp: Experience }) => (
  <div className="flex flex-wrap gap-1.5">
    {exp.tech.map((tech, idx) => (
      <motion.span
        key={`${exp.id}-${tech}`}
        className="inline-flex items-center rounded-md border border-violet/20 bg-violet/[0.06] px-2 py-1 font-mono text-[10px] font-medium text-white/65 transition-colors duration-200 hover:border-violet/45 hover:text-white/90 hover:bg-violet/[0.12]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 + Math.min(idx, 8) * 0.022, duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      >
        {tech}
      </motion.span>
    ))}
  </div>
);

const ExpandableDescription = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const isLong = text.length > 200;

  if (!isLong) return <p className={className}>{text}</p>;

  return (
    <div>
      <div className="relative">
        <motion.div
          className="overflow-hidden"
          initial={{ height: "4.5rem" }}
          animate={{ height: expanded ? "auto" : "4.5rem" }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className={className}>{text}</p>
        </motion.div>

        {/* Fade veil — masks cut-off text when collapsed */}
        <AnimatePresence>
          {!expanded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="absolute bottom-0 inset-x-0 h-10 pointer-events-none"
              style={{
                background: "linear-gradient(to top, hsl(248 28% 6%) 0%, transparent 100%)",
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={() => setExpanded((v) => !v)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.97 }}
        className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] select-none transition-colors duration-150"
        style={{ color: "hsl(262 83% 72%)" }}
      >
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "inline-block", lineHeight: 1 }}
        >
          ↓
        </motion.span>
        {expanded ? t("experience.showLess") : t("experience.readMore")}
      </motion.button>
    </div>
  );
};

const HIGHLIGHTS_VISIBLE = 3;

const ExpandableHighlights = ({
  expId,
  highlights,
}: {
  expId: string;
  highlights: string[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const { t } = useTranslation();
  const visible = highlights.slice(0, HIGHLIGHTS_VISIBLE);
  const hidden = highlights.slice(HIGHLIGHTS_VISIBLE);
  const overflow = hidden.length;

  return (
    <ul className="space-y-2.5">
      {visible.map((point, idx) => (
        <motion.li
          key={`${expId}-h${idx}`}
          className="flex items-start gap-2.5 text-sm text-white/72 leading-relaxed"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.06 + idx * 0.07, duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          <CheckCircle2 className="mt-0.5 shrink-0 w-3.5 h-3.5 text-violet/65" />
          {point}
        </motion.li>
      ))}

      <AnimatePresence>
        {expanded && hidden.map((point, idx) => (
          <motion.li
            key={`${expId}-hx${idx}`}
            className="flex items-start gap-2.5 text-sm text-white/72 leading-relaxed"
            initial={{ opacity: 0, x: -10, y: 6 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -6, transition: { duration: 0.15 } }}
            transition={{ delay: idx * 0.08, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <CheckCircle2 className="mt-0.5 shrink-0 w-3.5 h-3.5 text-violet/65" />
            {point}
          </motion.li>
        ))}
      </AnimatePresence>

      {overflow > 0 && (
        <motion.button
          onClick={() => setExpanded((v) => !v)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.16em] select-none transition-colors duration-150"
          style={{ color: "hsl(262 83% 72%)" }}
        >
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "inline-block", lineHeight: 1 }}
          >
            ↓
          </motion.span>
          {expanded ? t("experience.showLess") : t("experience.moreCount", { count: overflow })}
        </motion.button>
      )}
    </ul>
  );
};

const DetailCard = ({
  experience: exp,
  onWatchDemo: _onWatchDemo,
}: {
  experience: Experience;
  onWatchDemo: (id: string) => void;
}) => {
  const [playing, setPlaying] = useState(false);
  const { t } = useTranslation();
  const isEos = !!(exp.videoPhoneCrop && exp.videoId);

  /* ── shared decorative chrome ── */
  const chrome = (
    <>
      {/* Left accent bar */}
      <div className="absolute left-0 inset-y-0 w-[3px] rounded-l-2xl pointer-events-none"
           style={{ background: "linear-gradient(180deg, hsl(262 83% 82%), hsl(230 68% 65%) 60%, transparent)" }} />
      {/* Top gradient line — brighter glow */}
      <div className="absolute inset-x-0 top-0 h-[1.5px] pointer-events-none"
           style={{ background: "linear-gradient(90deg, transparent, hsl(262 83% 82% / 0.95) 28%, hsl(230 68% 68% / 0.75) 72%, transparent)", boxShadow: "0 0 22px hsl(262 83% 68% / 0.55), 0 0 40px hsl(262 83% 68% / 0.2)" }} />
      {/* Top atmospheric glow */}
      <div className="absolute inset-x-0 top-0 h-56 pointer-events-none"
           style={{ background: "radial-gradient(ellipse 75% 110% at 38% 0%, hsl(262 83% 68% / 0.11), transparent 68%)" }} />
      {/* Diagonal noise grid */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "repeating-linear-gradient(135deg, rgba(255,255,255,0.014) 0px, rgba(255,255,255,0.014) 1px, transparent 1px, transparent 8px)", opacity: 0.45 }} />
      {/* Bottom hairline */}
      <div className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
           style={{ background: "linear-gradient(90deg, transparent, hsl(262 83% 68% / 0.22), transparent)" }} />
    </>
  );

  /* ── EOS card ── */
  if (isEos) {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-violet/25"
           style={{
             background: "linear-gradient(160deg, hsl(248 28% 7%) 0%, hsl(243 22% 5%) 100%)",
             boxShadow: "0 28px 90px rgba(0,0,0,0.6), 0 0 0 1px hsl(262 83% 68% / 0.09), 0 0 80px hsl(262 83% 68% / 0.05)",
           }}>
        {chrome}

        {/* Right-side screen glow — suggests the phone is illuminating the card */}
        <div className="absolute right-0 inset-y-0 w-1/2 pointer-events-none"
             style={{ background: "radial-gradient(ellipse 100% 70% at 100% 40%, hsl(262 83% 68% / 0.10), transparent 65%)" }} />

        {/* ── HEADER ── */}
        <div className="relative px-5 pt-6 pb-4 sm:px-8 sm:pt-8 sm:pb-6 md:px-10 md:pt-9">
          <div className="flex items-start gap-5">
            {/* Logo */}
            <div className={`relative shrink-0 w-[52px] h-[52px] rounded-2xl border border-violet/20 flex items-center justify-center p-2 overflow-hidden ${exp.id === "esprit" ? "bg-white/15" : "bg-black/40"}`}
                 style={{ boxShadow: "0 0 20px hsl(262 83% 68% / 0.12), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                   style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(262 83% 68% / 0.18), transparent 65%)" }} />
              <img src={exp.logoUrl} alt={exp.company} className="relative w-full h-full object-contain"
                   style={{ filter: "grayscale(0.1) brightness(1.1) drop-shadow(0 0 6px hsl(262 83% 68% / 0.4))" }} />
            </div>

            {/* Meta */}
            <div className="flex-1 min-w-0">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-2.5">
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/35 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-amber-300">
                  <GraduationCap className="w-3 h-3" /> {t("experience.badgeEos")}
                </span>
                {exp.duration && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/35 bg-violet/[0.08] px-2.5 py-0.5 font-mono text-[10px] font-semibold text-violet-bright">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-bright animate-pulse" />
                    {exp.duration}
                  </span>
                )}
              </div>

              {/* Role — larger for EOS */}
              <h3 className="font-display font-bold text-[1.35rem] md:text-[1.6rem] leading-tight mb-2"
                  style={{ background: "linear-gradient(135deg, hsl(0 0% 94%), hsl(262 83% 78%) 60%, hsl(230 68% 72%))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {exp.role}
              </h3>

              {/* Company + period + location */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="font-mono text-sm font-bold text-white/80">{exp.company}</span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40 font-mono">
                  <Calendar className="h-3 w-3 text-violet/50 shrink-0" /> {exp.period}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] text-white/35">
                  <MapPin className="h-3 w-3 text-violet/45 shrink-0" /> {exp.location}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Header / body divider */}
        <div className="mx-5 sm:mx-8 md:mx-10 h-px"
             style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.28), hsl(230 68% 62% / 0.14) 50%, transparent)" }} />

        {/* ── BODY: description + highlights | phone ── */}
        <div className="relative flex flex-col lg:flex-row items-stretch">

          {/* Content */}
          <div className="flex-1 min-w-0 px-5 py-5 sm:px-8 md:px-10 space-y-4">
            <ExpandableDescription
              text={exp.description}
              className="text-sm text-white/55 leading-relaxed"
            />

            <div className="h-px"
                 style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.14), hsl(230 68% 62% / 0.07) 50%, transparent)" }} />

            {/* Highlights */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/50 mb-3">{t("experience.keyHighlights")}</p>
              <ExpandableHighlights expId={exp.id} highlights={exp.highlights} />
            </div>
          </div>

          {/* Vertical divider (desktop) */}
          <div className="hidden lg:block w-px shrink-0 self-stretch my-6"
               style={{ background: "linear-gradient(180deg, transparent, hsl(262 83% 68% / 0.18) 15%, hsl(262 83% 68% / 0.18) 85%, transparent)" }} />

          {/* Phone player */}
          <div className="shrink-0 flex flex-col items-center justify-center gap-3 px-5 py-5 sm:px-8 lg:px-10">
            <div className="relative">
              {/* Screen glow beneath phone */}
              <div className="absolute left-1/2 -translate-x-1/2 -bottom-4 pointer-events-none"
                   style={{ width: "180px", height: "60px", background: "radial-gradient(ellipse at 50% 100%, hsl(262 83% 68% / 0.40), transparent 70%)", filter: "blur(14px)" }} />

              {/* Phone container */}
              <div className="relative overflow-hidden bg-black"
                   style={{
                     aspectRatio: "9/16",
                     width: "min(220px, 65vw)",
                     borderRadius: "2.25rem",
                     boxShadow: "0 0 0 2px hsl(262 83% 68% / 0.35), 0 0 0 8px hsl(0 0% 7%), 0 0 0 10px hsl(0 0% 14%), 0 32px 80px rgba(0,0,0,0.55), 0 8px 40px hsl(262 83% 68% / 0.12)",
                   }}>
                {/* Subtle screen glare line at top */}
                <div className="absolute inset-x-0 top-0 h-[1px] z-20 pointer-events-none"
                     style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.14) 50%, transparent 90%)" }} />

                <AnimatePresence mode="wait">
                  {playing ? (
                    <motion.iframe
                      key="player"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ position: "absolute", height: "100%", width: `${(256 / 81) * 100}%`, left: "50%", top: 0, transform: "translateX(-50%)", border: "none" }}
                      src={`https://www.youtube.com/embed/${exp.videoId}?autoplay=1&rel=0&modestbranding=1`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <motion.div
                      key="thumb"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 cursor-pointer group bg-black"
                      onClick={() => setPlaying(true)}
                    >
                      {/* Thumbnail */}
                      <img
                        src={`https://img.youtube.com/vi/${exp.videoId}/maxresdefault.jpg`}
                        alt="Demo preview"
                        className="absolute transition-transform duration-500 group-hover:scale-[1.04]"
                        style={{ height: "100%", width: `${(256 / 81) * 100}%`, left: "50%", top: 0, transform: "translateX(-50%)", objectFit: "cover" }}
                        onError={(e) => { (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${exp.videoId}/hqdefault.jpg`; }}
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/15 transition-colors duration-300" />

                      {/* Play button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center justify-center">
                          <motion.div className="absolute rounded-full border border-white/20"
                                       style={{ width: 46, height: 46 }}
                                       animate={{ scale: [1, 2.3], opacity: [0.35, 0] }}
                                       transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }} />
                          <motion.div className="absolute rounded-full border border-white/12"
                                       style={{ width: 46, height: 46 }}
                                       animate={{ scale: [1, 2.3], opacity: [0.22, 0] }}
                                       transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.72 }} />
                          <motion.div
                            className="relative w-11 h-11 rounded-full flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, hsl(262 83% 62% / 0.95), hsl(230 68% 56% / 0.95))", boxShadow: "0 0 0 1px hsl(262 83% 78% / 0.3), 0 0 28px hsl(262 83% 68% / 0.6)", backdropFilter: "blur(4px)" }}
                            whileHover={{ scale: 1.12 }} whileTap={{ scale: 0.93 }}
                            transition={{ type: "spring", stiffness: 400, damping: 22 }}
                          >
                            <Play className="w-5 h-5 text-white ml-0.5" style={{ fill: "white" }} />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Tap label */}
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/22 text-center select-none">
              {playing ? t("experience.playing") : t("experience.tapToPlay")}
            </p>
          </div>
        </div>

        {/* ── BOTTOM: metrics + tech + actions ── */}
        <div className="px-5 pb-6 sm:px-8 sm:pb-8 md:px-10 md:pb-9 space-y-5">
          <div className="h-px"
               style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.20), hsl(230 68% 62% / 0.10) 50%, transparent)" }} />

          {/* Metrics + Tech in adaptive grid */}
          <div className="grid md:grid-cols-[auto_1fr] gap-5 md:gap-8 items-start">
            {exp.metrics && exp.metrics.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/50 mb-3">{t("experience.impact")}</p>
                <div className="flex gap-2">
                  {exp.metrics.map((m) => (
                    <div key={m.label} className="w-20 rounded-xl border border-violet/15 bg-violet/[0.05] p-2.5 text-center">
                      <p className="font-display font-bold text-xl text-gradient leading-none">{m.value}</p>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-white/38 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/50 mb-3 flex items-center gap-1.5">
                <Code2 className="w-3 h-3" /> {t("experience.techStack")}
              </p>
              <TechChips exp={exp} />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-violet/[0.08]">
            <ActionBar exp={exp} />
          </div>
        </div>
      </div>
    );
  }

  /* ── STANDARD card ── */
  return (
    <div className="relative overflow-hidden rounded-2xl border border-violet/25"
         style={{
           background: "linear-gradient(160deg, hsl(248 28% 7%) 0%, hsl(243 22% 5%) 100%)",
           boxShadow: "0 28px 90px rgba(0,0,0,0.6), 0 0 0 1px hsl(262 83% 68% / 0.09), 0 0 80px hsl(262 83% 68% / 0.05)",
         }}>
      {chrome}

      <div className="relative pl-5 pr-4 py-5 sm:pl-8 sm:pr-6 sm:py-7 md:pl-10 md:pr-8 md:py-9">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-5 mb-6">
          <div className={`relative shrink-0 w-14 h-14 rounded-2xl border border-violet/20 flex items-center justify-center p-2.5 overflow-hidden ${exp.id === "esprit" ? "bg-white/15" : "bg-black/40"}`}
               style={{ boxShadow: "0 0 24px hsl(262 83% 68% / 0.10), inset 0 1px 0 rgba(255,255,255,0.05)" }}>
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
                 style={{ background: "radial-gradient(ellipse at 50% 0%, hsl(262 83% 68% / 0.15), transparent 65%)" }} />
            <img src={exp.logoUrl} alt={exp.company} className="relative w-full h-full object-contain"
                 style={{ filter: "grayscale(0.15) brightness(1.1) drop-shadow(0 0 8px hsl(262 83% 68% / 0.35))" }} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {exp.isLive && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> {t("experience.badgeCurrent")}
                </span>
              )}
              {exp.type === "work" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-xs font-bold text-violet-bright">
                  <Briefcase className="w-3 h-3" /> {t("experience.badgeWorkExp")}
                </span>
              )}
              {exp.duration && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/10 px-3 py-1 font-mono text-xs font-bold text-violet-bright">
                  <span className="w-2 h-2 rounded-full bg-violet-bright animate-pulse" /> {exp.duration}
                </span>
              )}
              {exp.type === "internship" && exp.isGraduation && (
                <span className="inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-400/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
                  <GraduationCap className="w-3 h-3" /> {t("experience.badgeEos")}
                </span>
              )}
              {exp.type === "internship" && !exp.isGraduation && (
                <span className="inline-flex items-center gap-1 rounded-full border border-blue-400/25 bg-blue-400/[0.07] px-2.5 py-0.5 font-mono text-[10px] text-blue-300/80">
                  <Building2 className="w-3 h-3" /> {t("experience.badgeInternship")}
                </span>
              )}
            </div>
            <h3 className="font-display font-bold text-xl md:text-2xl text-gradient leading-snug mb-1">{exp.role}</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="font-mono text-sm font-bold text-white/80">{exp.company}</span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/45 font-mono">
                <Calendar className="h-3 w-3 text-violet/50 shrink-0" /> {exp.period}
              </span>
              <span className="inline-flex items-center gap-1.5 text-[11px] text-white/40">
                <MapPin className="h-3 w-3 text-violet/50 shrink-0" /> {exp.location}
              </span>
            </div>
          </div>
        </div>

        <div className="mb-5 h-px"
             style={{ background: "linear-gradient(90deg, hsl(262 83% 68% / 0.20), hsl(230 68% 62% / 0.10) 50%, transparent)" }} />

        <div className="mb-5">
          <ExpandableDescription
            text={exp.description}
            className="text-sm text-white/55 leading-relaxed"
          />
        </div>

        <div className="grid md:grid-cols-[1fr_auto] gap-6 md:gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3">{t("experience.keyHighlights")}</p>
            <ExpandableHighlights expId={exp.id} highlights={exp.highlights} />
          </div>
          <div className="md:w-52 space-y-5">
            {exp.metrics && exp.metrics.length > 0 && (
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3">{t("experience.impact")}</p>
                <div className="grid grid-cols-3 gap-2">
                  {exp.metrics.map((m) => (
                    <div key={m.label} className="rounded-xl border border-violet/15 bg-violet/[0.05] p-2.5 text-center">
                      <p className="font-display font-bold text-xl text-gradient leading-none">{m.value}</p>
                      <p className="font-mono text-[8px] uppercase tracking-wider text-white/40 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-violet/55 mb-3 flex items-center gap-1.5">
                <Code2 className="w-3 h-3" /> {t("experience.techStack")}
              </p>
              <TechChips exp={exp} />
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-violet/10">
          <ActionBar exp={exp} />
        </div>
      </div>
    </div>
  );
};

const MobileExperienceChips = ({
  experiences,
  selectedId,
  onSelect,
}: {
  experiences: Experience[];
  selectedId: string;
  onSelect: (id: string) => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex gap-5 overflow-x-auto pb-1 no-scrollbar">
      {(["work", "internship"] as const).map((type) => {
        const group = experiences.filter((exp) => exp.type === type);
        if (!group.length) return null;

        return (
          <div key={type} className="shrink-0">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-violet/55">
              {type === "work" ? t("experience.workChip") : t("experience.internChip")}
            </p>
            <div className="flex gap-2">
              {group.map((exp) => {
                const isSelected = exp.id === selectedId;
                return (
                  <motion.button
                    key={exp.id}
                    onClick={() => onSelect(exp.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.96 }}
                    className="shrink-0 flex items-center gap-2 rounded-full border px-3 py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet/60"
                    style={{
                      borderColor: isSelected
                        ? "hsl(262 83% 68% / 0.55)"
                        : "hsl(262 83% 68% / 0.15)",
                      background: isSelected
                        ? "linear-gradient(135deg, hsl(262 83% 68% / 0.15), hsl(262 83% 68% / 0.07))"
                        : "transparent",
                      boxShadow: isSelected ? "0 0 14px hsl(262 83% 68% / 0.15)" : "none",
                      transition: "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
                    }}
                  >
                    <img
                      src={exp.logoUrl}
                      alt=""
                      className="w-4 h-4 object-contain"
                      style={{ filter: "grayscale(0.15) brightness(1.05)" }}
                    />
                    <span
                      className="font-mono text-[11px] font-medium whitespace-nowrap"
                      style={{ color: isSelected ? "hsl(0 0% 88%)" : "hsl(0 0% 48%)" }}
                    >
                      {exp.company.split(" ")[0]}
                    </span>
                    {exp.isLive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExperienceSection;
