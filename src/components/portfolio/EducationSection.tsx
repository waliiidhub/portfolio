import { GraduationCap, MapPin, Award, Star, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const cardVariants = {
  hidden: (i: number) => ({ opacity: 0, x: i === 0 ? -48 : 48 }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  },
};

const EducationSection = () => {
  const { t } = useTranslation();

  const entries = t("education.entries", { returnObjects: true }) as Array<{
    degree: string;
    institutionFull: string;
    period: string;
    description: string;
    coursework: string[];
    achievements: string[];
  }>;

  const education = entries.map((entry, i) => ({
    ...entry,
    index: String(i + 1).padStart(2, "0"),
    institution: "ESPRIT",
    location: "Ariana, Tunisia",
    status: t("education.graduated"),
  }));

  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background ambiance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 55% 55% at 50% 0%, hsl(262 83% 68% / 0.065) 0%, transparent 65%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(262 83% 68% / 0.14) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 100%)",
          opacity: 0.28,
        }}
      />

      <div className="section-container">
        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="section-label mb-5 inline-flex gap-2">
            <GraduationCap className="h-3.5 w-3.5" />
            {t("education.label")}
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mt-5 mb-3 tracking-tight">
            {t("education.title")}
          </h2>
          <div className="section-heading-line" />
          <p className="text-muted-foreground/80 max-w-lg mx-auto mt-5 text-sm md:text-base leading-relaxed">
            {t("education.subtitle")}
          </p>
        </motion.div>

        {/* ── Institution connector ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.5 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="flex items-center gap-4 max-w-4xl mx-auto mb-8"
        >
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(262 83% 68% / 0.22))",
            }}
          />
          <div
            className="flex items-center gap-2.5 px-4 py-2 rounded-full shrink-0"
            style={{
              background: "hsl(262 83% 68% / 0.07)",
              border: "1px solid hsl(262 83% 68% / 0.2)",
              color: "hsl(262 83% 76%)",
            }}
          >
            <GraduationCap className="h-3.5 w-3.5 shrink-0" />
            <span className="text-xs font-semibold tracking-wide font-display">
              {t("education.espritConnector")}
            </span>
          </div>
          <div
            className="h-px flex-1"
            style={{
              background:
                "linear-gradient(90deg, hsl(262 83% 68% / 0.22), transparent)",
            }}
          />
        </motion.div>

        {/* ── Cards grid ── */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {education.map((edu, index) => (
            <motion.div
              key={edu.index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              whileHover={{
                y: -6,
                borderColor: "hsl(262 83% 68% / 0.38)",
                boxShadow:
                  "0 24px 64px rgba(0,0,0,0.55), 0 0 36px hsl(262 83% 68% / 0.12)",
                transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
              }}
              className="relative overflow-hidden rounded-2xl border group"
              style={{
                background:
                  "linear-gradient(135deg, hsl(248 28% 7%) 0%, hsl(243 22% 5%) 100%)",
                borderColor: "hsl(262 83% 68% / 0.15)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
              }}
            >
              <div className="card-top-accent" />

              {/* Left accent spine */}
              <div
                className="absolute left-0 inset-y-0 w-[3px] rounded-r-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(to bottom, hsl(262 83% 68%), hsl(230 68% 62%))",
                }}
              />

              {/* Ghost index watermark */}
              <div
                className="absolute -top-3 right-3 font-display font-black select-none pointer-events-none tabular-nums leading-none"
                style={{
                  fontSize: "7.5rem",
                  color: "rgba(168,85,247,0.055)",
                }}
                aria-hidden
              >
                {edu.index}
              </div>

              <div className="relative p-5 sm:p-7 flex flex-col gap-5">
                {/* Top row: icon + period + status */}
                <div className="flex items-start justify-between gap-4">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, hsl(262 83% 68% / 0.14), hsl(230 68% 62% / 0.08))",
                      border: "1px solid hsl(262 83% 68% / 0.22)",
                      boxShadow: "0 0 22px hsl(262 83% 68% / 0.15)",
                    }}
                  >
                    <GraduationCap className="h-5 w-5 text-violet" />
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span
                      className="font-mono text-xs tracking-widest"
                      style={{ color: "hsl(262 83% 72%)" }}
                    >
                      {edu.period}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      style={{
                        background: "hsl(142 76% 36% / 0.1)",
                        border: "1px solid hsl(142 76% 36% / 0.25)",
                        color: "#86efac",
                      }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      {edu.status}
                    </span>
                  </div>
                </div>

                {/* Degree + institution */}
                <div>
                  <h3 className="text-xl font-display font-bold leading-tight mb-1.5 group-hover:text-violet transition-colors duration-200">
                    {edu.degree}
                  </h3>
                  <p className="text-xs text-muted-foreground/60 leading-snug">
                    {edu.institutionFull}
                  </p>
                </div>

                {/* Gradient divider */}
                <div
                  className="h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, hsl(262 83% 68% / 0.2), transparent 75%)",
                  }}
                />

                {/* Description */}
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {edu.description}
                </p>

                {/* Key Focus */}
                <div>
                  <div className="skill-category-label gap-1.5 mb-3">
                    <BookOpen className="h-3 w-3" /> {t("education.keyFocus")}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {edu.coursework.map((course) => (
                      <span key={course} className="badge-tech">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <div className="skill-category-label gap-1.5 mb-3">
                    <Award className="h-3 w-3" /> {t("education.highlights")}
                  </div>
                  <ul className="space-y-2.5">
                    {edu.achievements.map((ach, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 shrink-0 inline-flex items-center justify-center w-[18px] h-[18px] rounded-full"
                          style={{
                            background:
                              "linear-gradient(135deg, hsl(45 100% 60% / 0.2), hsl(35 100% 55% / 0.1))",
                            border: "1px solid hsl(45 100% 60% / 0.4)",
                          }}
                        >
                          <Star
                            className="h-2.5 w-2.5"
                            style={{
                              color: "hsl(45 100% 65%)",
                              fill: "hsl(45 100% 65%)",
                            }}
                          />
                        </span>
                        <span className="text-sm leading-snug text-foreground/90 font-medium">
                          {ach}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
