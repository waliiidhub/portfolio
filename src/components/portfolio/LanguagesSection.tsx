import { Badge } from "@/components/ui/badge";
import { BookOpen, Shield, Globe, Wrench } from "lucide-react";
import { motion } from "framer-motion";

const skillGroups = [
  {
    label: "Mobile",
    skills: ["Flutter", "Dart"],
  },
  {
    label: "Frontend",
    skills: ["React.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
  },
  {
    label: "Backend",
    skills: ["Java", "Spring Boot", "Node.js", "NestJS", "PHP", "Symfony", "Python"],
  },
  {
    label: "Databases",
    skills: ["PostgreSQL", "SQL", "Oracle", "MongoDB"],
  },
  {
    label: "DevOps & Tools",
    skills: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "GitLab CI/CD",
      "Git",
      "Bash",
      "PowerShell",
      "CI/CD Pipelines",
      "DevOps Fundamentals",
    ],
  },
  {
    label: "APIs & Protocols",
    skills: ["REST APIs", "WebSockets", "Matrix (Synapse, Olm/Megolm)"],
  },
  {
    label: "Design & Security",
    skills: ["Figma", "Mobile UI/UX Design", "Secure Development Practices"],
  },
];

const LanguagesSection = () => {
  return (
    <motion.section
      id="languages"
      className="py-24 bg-surface-card"
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
              <Wrench className="h-3.5 w-3.5" />
              Skills
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">
            Technical Skills & Growth
          </h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            A solid engineering toolkit, continuously expanded with DevSecOps and applied AI.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start max-w-5xl mx-auto">

          {/* Core skills — grouped */}
          <div className="rounded-2xl bg-card border border-border/60 overflow-hidden">
            <div className="px-6 pt-5 pb-4 border-b border-border/50">
              <h3 className="font-display font-semibold text-foreground">Core Technical Toolkit</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Languages, frameworks and tools I use to build production-ready systems.
              </p>
            </div>
            <div className="px-6 py-5 space-y-5">
              {skillGroups.map((group) => (
                <div key={group.label}>
                  <span className="skill-category-label mb-2.5 inline-block">
                    {group.label}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((skill) => (
                      <span key={skill} className="badge-tech">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Growth card */}
          <div
            className="rounded-2xl border border-violet/25 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, hsl(262 83% 68% / 0.08) 0%, hsl(243 22% 8%) 50%, hsl(245 18% 14% / 0.4) 100%)",
            }}
          >
            <div className="p-6">
              {/* Header */}
              <div className="flex items-start gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-violet/15 border border-violet/20 shrink-0">
                  <BookOpen className="h-5 w-5 text-violet" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] font-mono font-semibold text-violet mb-1">
                    Currently growing
                  </p>
                  <h3 className="font-display font-semibold text-foreground leading-snug">
                    Deepening my expertise in<br />DevSecOps & Applied AI
                  </h3>
                </div>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed mb-5">
                I'm actively strengthening my profile as a software engineer by focusing on
                secure delivery pipelines, automated security testing, and AI-assisted
                development workflows to build reliable and secure products end-to-end.
              </p>

              {/* Two mini-tracks */}
              <div className="space-y-3">
                {/* DevSecOps */}
                <div className="rounded-xl border border-violet/20 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="p-1.5 rounded-md bg-violet/12">
                      <Shield className="h-3.5 w-3.5 text-violet" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-violet">
                      DevSecOps Track
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed">
                    Bringing security earlier into the development lifecycle.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["Secure CI/CD", "SAST & DAST", "Container Security", "Threat Modeling"].map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px] px-2 py-0.5 border-border/60">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Applied AI */}
                <div className="rounded-xl border border-violet/20 bg-background/40 p-4">
                  <div className="flex items-center gap-2 mb-2.5">
                    <div className="p-1.5 rounded-md bg-violet/12">
                      <Globe className="h-3.5 w-3.5 text-violet" />
                    </div>
                    <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-violet">
                      Applied AI Track
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mb-2.5 leading-relaxed">
                    Using AI to improve developer productivity and product intelligence.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {["AI for Developers", "LLMs & Automation", "Code Assistants", "Intelligent Features"].map((s) => (
                      <Badge key={s} variant="outline" className="text-[10px] px-2 py-0.5 border-border/60">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-[10px] text-muted-foreground mt-4 leading-relaxed">
                This learning path directly reinforces my work on secure, production-ready
                applications and AI-powered features.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default LanguagesSection;
