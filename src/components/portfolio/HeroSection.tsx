import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Download, Mail, Github, Linkedin, Phone,
  Rocket, Server, Users2, Code2,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import CvDownloadModal from "./CvDownloadModal";
import SkillsMatrixModal from "./SkillsMatrixModal";
import ParticleBackground from "./ParticleBackground";
import AnimatedCounter from "./AnimatedCounter";

const TECH_STACK = ["Flutter", "NestJs"];

const HeroSection = () => {
  const { t } = useTranslation();
  const [isContactFormOpen, setContactFormOpen] = useState(false);
  const [isCvModalOpen, setCvModalOpen] = useState(false);
  const [isSkillsMatrixOpen, setSkillsMatrixOpen] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReduced = useReducedMotion();

  const TYPING_WORDS = t("hero.typing", { returnObjects: true }) as string[];

  useEffect(() => {
    setDisplayed("");
    setIsDeleting(false);
    setTypingIndex(0);
  }, [TYPING_WORDS[0]]);

  useEffect(() => {
    if (prefersReduced) { setDisplayed(TYPING_WORDS[0]); return; }
    const word = TYPING_WORDS[typingIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === word.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTypingIndex((i) => (i + 1) % TYPING_WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, typingIndex, prefersReduced, TYPING_WORDS]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };
  const fadeUp = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0, 0, 0.2, 1] as [number, number, number, number] } },
  };

  return (
    <>
      <section
        id="about"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        <ParticleBackground />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 80% 60% at 65% 35%, hsl(262 83% 68% / 0.17) 0%, transparent 70%)",
              "radial-gradient(ellipse 55% 45% at 10% 80%, hsl(230 68% 62% / 0.12) 0%, transparent 65%)",
              "radial-gradient(ellipse 35% 28% at 22% 10%, hsl(262 83% 68% / 0.08) 0%, transparent 60%)",
            ].join(", "),
          }}
        />

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, hsl(262 83% 68% / 0.18) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
            maskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 15%, transparent 100%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 50% 50%, black 15%, transparent 100%)",
            opacity: 0.55,
          }}
        />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center min-h-[75vh] lg:min-h-[85vh]">

            {/* ── Left: Text ── */}
            <motion.div
              className="space-y-5 sm:space-y-8 order-2 lg:order-1"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              {/* Available badge */}
              <motion.div variants={fadeUp}>
                <motion.span
                  className="inline-flex items-center gap-2.5 text-xs font-mono font-semibold tracking-[0.18em] uppercase text-emerald-400 px-4 py-2 rounded-full border border-emerald-400/30 relative overflow-hidden cursor-default select-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(152 76% 50% / 0.08) 0%, hsl(160 60% 45% / 0.06) 100%)",
                    boxShadow: "0 0 18px hsl(152 76% 50% / 0.12), inset 0 1px 0 hsl(152 76% 50% / 0.15)",
                  }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 28px hsl(152 76% 50% / 0.25), inset 0 1px 0 hsl(152 76% 50% / 0.2)" }}
                  transition={{ duration: 0.2 }}
                >
                  <span
                    className="absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(105deg, transparent 30%, hsl(152 76% 70% / 0.12) 50%, transparent 70%)" }}
                  />
                  <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 animate-ping" />
                    <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_hsl(152_76%_50%/0.8)]" />
                  </span>
                  {t("hero.available")}
                </motion.span>
              </motion.div>

              {/* Name + typing */}
              <motion.div variants={fadeUp} className="space-y-3">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
                  <span className="text-foreground">Walid</span>
                  <br />
                  <span className="text-gradient">Marzouk</span>
                </h1>

                <div className="flex items-center gap-2 h-10">
                  <span className="font-display text-base sm:text-xl lg:text-2xl text-muted-foreground font-medium">
                    {displayed}
                  </span>
                  <span className="w-0.5 h-7 bg-violet animate-pulse rounded-full" />
                </div>
              </motion.div>

              {/* Bio */}
              <motion.p
                variants={fadeUp}
                className="text-base text-muted-foreground max-w-md leading-relaxed"
              >
                {t("hero.bio")}
              </motion.p>

              {/* Current position */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
                <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/40 animate-ping" />
                  <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs text-muted-foreground/50 font-mono tracking-wide">{t("hero.currentlyAt")}</span>
                <span className="text-sm font-semibold text-foreground/90">ContinuousNet</span>
                <span className="text-muted-foreground/25 select-none text-sm leading-none">—</span>
                <span className="text-sm text-muted-foreground/65 font-medium">{t("hero.role")}</span>
                <span className="flex items-center gap-1.5">
                  {TECH_STACK.map((tech) => (
                    <span key={tech} className="badge-tech">{tech}</span>
                  ))}
                </span>
              </motion.div>

              {/* CTA buttons */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-2 sm:gap-3">

                {/* Primary — Download CV */}
                <motion.button
                  onClick={() => setCvModalOpen(true)}
                  className="group relative flex items-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden"
                  style={{
                    background: "linear-gradient(135deg, hsl(262 83% 64%) 0%, hsl(230 68% 58%) 100%)",
                    boxShadow: "0 0 22px hsl(262 83% 68% / 0.3), inset 0 1px 0 hsl(0 0% 100% / 0.12)",
                  }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 36px hsl(262 83% 68% / 0.5), inset 0 1px 0 hsl(0 0% 100% / 0.15)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                  <Download className="relative h-4 w-4 transition-transform duration-200 group-hover:scale-110 group-hover:-translate-y-px" />
                  <span className="relative">{t("hero.downloadCv")}</span>
                </motion.button>

                {/* Secondary — Get in Touch */}
                <motion.button
                  onClick={() => setContactFormOpen(true)}
                  className="group relative flex items-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm font-semibold text-violet overflow-hidden"
                  style={{
                    background: "hsl(240 25% 7%)",
                    boxShadow: "0 0 0 1.5px hsl(262 83% 68% / 0.35)",
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 0 1.5px hsl(262 83% 68% / 0.7), 0 0 24px hsl(262 83% 68% / 0.2)",
                  }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, hsl(262 83% 68% / 0.1) 0%, transparent 70%)" }}
                  />
                  <Mail className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-px" />
                  <span className="relative">{t("hero.getInTouch")}</span>
                </motion.button>

                {/* Tertiary — Skills Matrix */}
                <motion.button
                  onClick={() => setSkillsMatrixOpen(true)}
                  className="group relative flex items-center gap-1.5 px-4 py-3.5 text-sm font-mono text-muted-foreground/70 hover:text-emerald-400 transition-colors duration-200"
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                >
                  <span className="text-emerald-400/50 group-hover:text-emerald-400 transition-colors duration-200 select-none">$</span>
                  <span>{t("hero.viewSkills")}</span>
                  <span className="w-px h-3.5 bg-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-100 animate-pulse" />
                  <span
                    className="absolute bottom-2.5 left-4 right-4 h-px"
                    style={{ background: "linear-gradient(to right, transparent, hsl(152 76% 50% / 0), hsl(152 76% 50% / 0))" }}
                  >
                    <span
                      className="absolute inset-0 transition-all duration-300 opacity-0 group-hover:opacity-100"
                      style={{ background: "linear-gradient(to right, transparent, hsl(152 76% 50% / 0.5), transparent)" }}
                    />
                  </span>
                </motion.button>

              </motion.div>

              {/* Social links */}
              <motion.div variants={fadeUp} className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-violet hover:bg-violet/10 rounded-xl" asChild>
                  <a href="https://github.com/walidmz" target="_blank" rel="noopener noreferrer" aria-label={t("hero.aria.github")}>
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-violet hover:bg-violet/10 rounded-xl" asChild>
                  <a href="https://www.linkedin.com/in/walidmarzouk/" target="_blank" rel="noopener noreferrer" aria-label={t("hero.aria.linkedin")}>
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-violet hover:bg-violet/10 rounded-xl" asChild>
                  <a href="tel:+21699054535" aria-label={t("hero.aria.phone")}>
                    <Phone className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-violet hover:bg-violet/10 rounded-xl" onClick={() => setContactFormOpen(true)} aria-label={t("hero.aria.email")}>
                  <Mail className="h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>

            {/* ── Right: Photo ── */}
            <motion.div
              className="relative order-1 lg:order-2 flex justify-center lg:justify-end"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0, 0, 0.2, 1] }}
            >
              {/* Orbital rings */}
              {!prefersReduced && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <svg viewBox="0 0 440 440" className="absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[440px] lg:h-[440px] opacity-60">
                    <circle cx="220" cy="220" r="213" fill="none" stroke="hsl(262 83% 68% / 0.12)" strokeWidth="1" strokeDasharray="5 8" />
                    <circle cx="220" cy="220" r="178" fill="none" stroke="hsl(230 68% 62% / 0.07)" strokeWidth="1" />
                    <circle
                      cx="220" cy="220" r="213"
                      fill="none"
                      stroke="hsl(262 83% 68% / 0.55)"
                      strokeWidth="1.5"
                      strokeDasharray="68 348"
                      className="animate-spin-slow"
                      style={{ transformOrigin: "220px 220px" }}
                    />
                    <circle
                      cx="220" cy="220" r="178"
                      fill="none"
                      stroke="hsl(230 68% 62% / 0.45)"
                      strokeWidth="1"
                      strokeDasharray="40 278"
                      style={{ transformOrigin: "220px 220px", animation: "spin-slow 15s linear infinite reverse" }}
                    />
                  </svg>
                </div>
              )}

              <div
                className="absolute inset-0 rounded-full blur-3xl opacity-25"
                style={{ background: "radial-gradient(circle, hsl(262 83% 68%) 0%, transparent 65%)" }}
              />

              <motion.img
                src="/walid-hero-image.png"
                alt={t("hero.aria.photo")}
                className="relative w-44 h-44 sm:w-60 sm:h-60 lg:w-[22rem] lg:h-[22rem] rounded-full object-cover shadow-glow-lg"
                style={{ border: "2.5px solid hsl(262 83% 68% / 0.4)" }}
                animate={prefersReduced ? {} : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Floating card: Apps Deployed */}
              <motion.div
                className="hidden sm:block absolute bottom-8 -left-4 lg:-left-12 glass rounded-2xl px-4 py-3 shadow-elevated border border-violet/20"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 24px hsl(262 83% 68% / 0.2)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Rocket className="h-3 w-3 text-violet/80" />
                  <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">{t("hero.appsDeployed")}</span>
                </div>
                <AnimatedCounter
                  value={3}
                  label={t("hero.appsDeployed")}
                  labelClassName="sr-only"
                  numberClassName="text-xl font-display font-bold text-gradient leading-none"
                  className="block"
                />
              </motion.div>

              {/* Floating card: Servers Hosted */}
              <motion.div
                className="hidden sm:block absolute top-8 -right-4 lg:-right-12 glass rounded-2xl px-4 py-3 shadow-elevated border border-violet/20"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 24px hsl(262 83% 68% / 0.2)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Server className="h-3 w-3 text-violet/80" />
                  <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">{t("hero.serversHosted")}</span>
                </div>
                <AnimatedCounter
                  value={5}
                  label={t("hero.serversHosted")}
                  labelClassName="sr-only"
                  numberClassName="text-xl font-display font-bold text-gradient leading-none"
                  className="block"
                />
              </motion.div>

              {/* Floating card: Active Users */}
              <motion.div
                className="absolute top-8 -left-4 lg:-left-12 glass rounded-2xl px-4 py-3 shadow-elevated border border-violet/20 hidden lg:block"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 24px hsl(262 83% 68% / 0.2)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Users2 className="h-3 w-3 text-violet/80" />
                  <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">{t("hero.activeUsers")}</span>
                </div>
                <AnimatedCounter
                  value={1}
                  suffix="K+"
                  label={t("hero.activeUsers")}
                  labelClassName="sr-only"
                  numberClassName="text-xl font-display font-bold text-gradient leading-none"
                  className="block"
                />
              </motion.div>

              {/* Floating card: Months of Experience */}
              <motion.div
                className="absolute bottom-8 -right-4 lg:-right-12 glass rounded-2xl px-4 py-3 shadow-elevated border border-violet/20 hidden lg:block"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6, duration: 0.6 }}
                whileHover={{ scale: 1.06, boxShadow: "0 0 24px hsl(262 83% 68% / 0.2)" }}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  <Code2 className="h-3 w-3 text-violet/80" />
                  <span className="text-[10px] text-muted-foreground font-mono tracking-wider uppercase">{t("hero.monthsExperience")}</span>
                </div>
                <AnimatedCounter
                  value={9}
                  suffix="+"
                  label={t("hero.monthsExperience")}
                  labelClassName="sr-only"
                  numberClassName="text-xl font-display font-bold text-gradient leading-none"
                  className="block"
                />
              </motion.div>
            </motion.div>
          </div>

        </div>

        <div
          className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, hsl(240 25% 4%))" }}
        />

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <div className="relative w-5 h-[30px] rounded-full border border-muted-foreground/30 flex items-start justify-center pt-1">
            <motion.div
              className="w-px h-[9px] rounded-full bg-muted-foreground/55"
              animate={prefersReduced ? {} : { y: [0, 7, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          <span className="text-[8px] font-mono tracking-[0.3em] uppercase text-muted-foreground/35 select-none">
            {t("hero.scroll")}
          </span>
        </motion.div>
      </section>

      {isContactFormOpen && <ContactForm onClose={() => setContactFormOpen(false)} />}
      {isCvModalOpen && <CvDownloadModal onClose={() => setCvModalOpen(false)} />}
      {isSkillsMatrixOpen && <SkillsMatrixModal onClose={() => setSkillsMatrixOpen(false)} />}
    </>
  );
};

export default HeroSection;
