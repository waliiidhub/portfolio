import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    degree: "Software Engineering Student",
    institution: "The High Private School of Engineering and Technology (ESPRIT)",
    location: "Ariana, Tunisia",
    period: "2023 – Present",
    status: "Graduated",
    description:
      "Comprehensive software engineering education with focus on Mobile Development, Backend Technologies, DevSecOps and QA testing.",
    coursework: [
      "Software Architecture",
      "Mobile Development",
      "AI",
      "Blockchain Technology",
      "DevSecOps",
    ],
    achievements: [
      "Multiple Software Development Internships",
      "2nd place in ESPRIT project fair 2024",
    ],
  },
  {
    degree: "Integrated Preparatory Cycle",
    institution: "The High Private School of Engineering and Technology (ESPRIT)",
    location: "Ariana, Tunisia",
    period: "2020 – 2022",
    status: "Graduated",
    description:
      "Foundational engineering studies preparing for advanced computer science.",
    coursework: [
      "Mathematics",
      "Unix",
      "Computer Science Fundamentals",
      "Engineering Principles",
      "Problem Solving",
    ],
    achievements: [
      "Strong foundation in computer science fundamentals",
      "Top of class in both years",
    ],
  },
];

const EducationSection = () => {
  return (
    <motion.section
      id="education"
      className="py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <GraduationCap className="h-3.5 w-3.5" />
              Academic Background
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">Education</h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            Continuous learning in software engineering, DevSecOps and applied AI.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div
            className="hidden md:block absolute left-6 top-8 bottom-8 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(262 83% 68% / 0.4) 10%, hsl(262 83% 68% / 0.25) 85%, transparent)",
            }}
          />

          <div className="space-y-8 md:pl-16">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0, 0, 0.2, 1] }}
              >
                {/* Timeline dot */}
                <div
                  className="hidden md:block absolute -left-[2.9rem] top-6 w-3 h-3 rounded-full"
                  style={{
                    background: "hsl(262 83% 68%)",
                    boxShadow: "0 0 0 3px hsl(262 83% 68% / 0.15), 0 0 12px hsl(262 83% 68% / 0.35)",
                  }}
                />

                {/* Card */}
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/60 group-hover:border-violet/30 transition-all duration-300 group-hover:shadow-[0_8px_40px_hsl(262_83%_68%/0.08)] p-6">
                  <div className="card-top-accent" />

                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-display font-bold text-foreground group-hover:text-violet transition-colors duration-200">
                        {edu.degree}
                      </h3>
                      <p className="text-sm font-semibold text-violet/90 mt-0.5">
                        {edu.institution}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-2">
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                          <Calendar className="h-3 w-3 text-violet/60 shrink-0" />
                          {edu.period}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 text-violet/60 shrink-0" />
                          {edu.location}
                        </span>
                      </div>
                    </div>
                    <Badge
                      className="shrink-0 self-start text-xs font-semibold px-3 py-1 text-white"
                      style={{ background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))" }}
                    >
                      {edu.status}
                    </Badge>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {edu.description}
                  </p>

                  {/* Coursework */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2.5">
                      Key Coursework
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[11px] px-2.5 py-0.5 border-border/60 text-muted-foreground hover:border-violet/40 hover:text-violet/80 transition-colors"
                        >
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2.5 flex items-center gap-1.5">
                      <Award className="h-3.5 w-3.5 text-violet/70" />
                      Achievements
                    </h4>
                    <ul className="space-y-1.5">
                      {edu.achievements.map((a, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-violet/70 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default EducationSection;
