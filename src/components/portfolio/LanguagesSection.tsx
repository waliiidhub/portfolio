import { useState } from "react";
import { motion } from "framer-motion";
import {
  Smartphone, Monitor, Server, Database, GitBranch,
  Globe, Shield, BookOpen, Sparkles, ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import SkillsMatrixModal from "./SkillsMatrixModal";

const SKILL_DATA = [
  { id: "mobile",    icon: Smartphone, lgSpan: 1, skills: ["Flutter", "Dart", "Kotlin (Android)", "Swift & SwiftUI", "React Native", "KMP"] },
  { id: "frontend",  icon: Monitor,    lgSpan: 1, skills: ["React.js", "TypeScript", "JavaScript", "Next.js", "HTML", "CSS", "Tailwind"] },
  { id: "backend",   icon: Server,     lgSpan: 2, skills: ["Java", "Spring Boot", "Node.js", "NestJS", "PHP", "Symfony", "Python", "FastAPI", "ASP .NET"] },
  { id: "devops",    icon: GitBranch,  lgSpan: 2, skills: ["Docker", "Docker Compose", "Kubernetes", "GitLab CI/CD", "Git", "Bash", "Grafana", "Prometheus", "Linux"] },
  { id: "databases", icon: Database,   lgSpan: 1, skills: ["PostgreSQL", "SQL", "Oracle", "MongoDB"] },
  { id: "apis",      icon: Globe,      lgSpan: 1, skills: ["REST APIs", "WebSockets", "Matrix / Synapse", "JWT", "OAuth"] },
  { id: "design",    icon: Shield,     lgSpan: 2, skills: ["Figma", "Mobile UI/UX", "Secure CI/CD", "SAST & DAST", "Threat Modeling"] },
];

const DEVSECOPS_SKILLS = ["Secure CI/CD", "SAST & DAST", "Container Security", "Threat Modeling"];
const APPLIED_AI_SKILLS = ["LLMs & Automation", "Agent Orchestration", "Prompt Engineering", "AI Features"];

const stats_keys = [
  { value: "35+", key: "technologies" },
  { value: "7",   key: "skillDomains" },
  { value: "5",   key: "yearsBuilding" },
];

const tileVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

const LanguagesSection = () => {
  const { t } = useTranslation();
  const [isSkillsMatrixOpen, setSkillsMatrixOpen] = useState(false);

  const skillGroups = SKILL_DATA.map(g => ({
    ...g,
    label: t(`languages.groups.${g.id}`),
  }));

  return (
    <>
      <section id="languages" className="py-14 md:py-24 bg-surface-card relative overflow-hidden">
        {/* Background ambiance */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: [
              "radial-gradient(ellipse 50% 45% at 15% 60%, hsl(262 83% 68% / 0.06) 0%, transparent 65%)",
              "radial-gradient(ellipse 40% 35% at 85% 40%, hsl(230 68% 62% / 0.05) 0%, transparent 60%)",
            ].join(", "),
          }}
        />

        <div className="container mx-auto px-4 sm:px-6">
          {/* ── Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-10 sm:mb-14"
          >
            <span className="section-label mb-5 inline-flex gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              {t("languages.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-5 mb-3 tracking-tight">
              {t("languages.titleMain")} <span className="text-gradient">{t("languages.titleHighlight")}</span>
            </h2>
            <div className="section-heading-line" />
            <p className="text-muted-foreground/80 max-w-lg mx-auto mt-5 text-sm md:text-base leading-relaxed">
              {t("languages.subtitle")}
            </p>
          </motion.div>

          {/* ── Stats strip + CTA ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            {stats_keys.map((stat) => (
              <div
                key={stat.key}
                className="flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: "hsl(262 83% 68% / 0.07)",
                  border: "1px solid hsl(262 83% 68% / 0.18)",
                }}
              >
                <span
                  className="font-display font-bold text-base"
                  style={{
                    background: "var(--gradient-violet)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground/70 font-mono tracking-wider">
                  {t(`languages.stats.${stat.key}`)}
                </span>
              </div>
            ))}

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 24px hsl(262 83% 68% / 0.45)",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSkillsMatrixOpen(true)}
              className="relative overflow-hidden flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white group"
              style={{
                background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))",
                boxShadow: "0 0 18px hsl(262 83% 68% / 0.28)",
              }}
            >
              <span className="absolute inset-0 translate-x-[-110%] group-hover:translate-x-[110%] transition-transform duration-600 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              <span className="relative">{t("languages.viewSkillsMatrix")}</span>
              <ChevronRight className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </motion.button>
          </motion.div>

          {/* ── Bento skill grid ── */}
          <motion.div
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto"
          >
            {skillGroups.map((group) => (
              <motion.div
                key={group.id}
                variants={tileVariants}
                whileHover={{
                  y: -4,
                  borderColor: "hsl(262 83% 68% / 0.35)",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.45), 0 0 28px hsl(262 83% 68% / 0.10)",
                  transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
                }}
                className={`relative overflow-hidden rounded-2xl border group flex flex-col gap-3.5 p-5${
                  group.lgSpan === 2 ? " lg:col-span-2" : ""
                }`}
                style={{
                  background: "linear-gradient(135deg, hsl(248 28% 7%) 0%, hsl(243 22% 5%) 100%)",
                  borderColor: "hsl(262 83% 68% / 0.13)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
                }}
              >
                <div className="card-top-accent" />
                <div
                  className="absolute left-0 inset-y-0 w-[3px] rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to bottom, hsl(262 83% 68%), hsl(230 68% 62%))" }}
                />

                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      background: "linear-gradient(135deg, hsl(262 83% 68% / 0.14), hsl(230 68% 62% / 0.08))",
                      border: "1px solid hsl(262 83% 68% / 0.2)",
                      boxShadow: "0 0 14px hsl(262 83% 68% / 0.12)",
                    }}
                  >
                    <group.icon className="h-4 w-4 text-violet" />
                  </div>
                  <span className="skill-category-label">{group.label}</span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span key={skill} className="badge-tech">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* ── Currently Growing tile ── */}
            <motion.div
              variants={tileVariants}
              whileHover={{
                y: -4,
                borderColor: "hsl(262 83% 68% / 0.45)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.45), 0 0 32px hsl(262 83% 68% / 0.15)",
                transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
              }}
              className="relative overflow-hidden rounded-2xl border col-span-2 flex flex-col gap-4 p-5"
              style={{
                background: "linear-gradient(135deg, hsl(262 83% 68% / 0.09) 0%, hsl(248 28% 7%) 50%, hsl(243 22% 5%) 100%)",
                borderColor: "hsl(262 83% 68% / 0.25)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
              }}
            >
              <div className="card-top-accent" />

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                  style={{
                    background: "linear-gradient(135deg, hsl(262 83% 68% / 0.2), hsl(230 68% 62% / 0.12))",
                    border: "1px solid hsl(262 83% 68% / 0.3)",
                    boxShadow: "0 0 18px hsl(262 83% 68% / 0.2)",
                  }}
                >
                  <BookOpen className="h-4 w-4 text-violet" />
                </div>
                <div>
                  <div
                    className="text-[9px] font-mono font-semibold uppercase tracking-[0.22em] mb-0.5"
                    style={{ color: "hsl(262 83% 72%)" }}
                  >
                    {t("languages.currentlyGrowing")}
                  </div>
                  <div className="font-display font-bold text-sm text-foreground">
                    {t("languages.currentlyGrowingTitle")}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {/* DevSecOps */}
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "hsl(262 83% 68% / 0.06)",
                    border: "1px solid hsl(262 83% 68% / 0.18)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Shield className="h-3 w-3" style={{ color: "hsl(262 83% 72%)" }} />
                    <span
                      className="text-[9px] font-mono font-semibold uppercase tracking-wider"
                      style={{ color: "hsl(262 83% 72%)" }}
                    >
                      {t("languages.devsecops")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {DEVSECOPS_SKILLS.map((s) => (
                      <span key={s} className="badge-tech" style={{ fontSize: "0.6rem" }}>{s}</span>
                    ))}
                  </div>
                </div>

                {/* Applied AI */}
                <div
                  className="rounded-xl p-3"
                  style={{
                    background: "hsl(230 68% 62% / 0.06)",
                    border: "1px solid hsl(230 68% 62% / 0.18)",
                  }}
                >
                  <div className="flex items-center gap-1.5 mb-2">
                    <Sparkles className="h-3 w-3" style={{ color: "hsl(230 68% 72%)" }} />
                    <span
                      className="text-[9px] font-mono font-semibold uppercase tracking-wider"
                      style={{ color: "hsl(230 68% 72%)" }}
                    >
                      {t("languages.appliedAi")}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {APPLIED_AI_SKILLS.map((s) => (
                      <span key={s} className="badge-tech" style={{ fontSize: "0.6rem" }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-xs text-muted-foreground/65 leading-relaxed">
                {t("languages.footerText")}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {isSkillsMatrixOpen && (
        <SkillsMatrixModal onClose={() => setSkillsMatrixOpen(false)} />
      )}
    </>
  );
};

export default LanguagesSection;
