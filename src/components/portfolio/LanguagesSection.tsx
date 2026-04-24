import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Languages,
  Globe,
  BookOpen,
  ArrowUpNarrowWideIcon,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";

const LanguagesSection = () => {
  const skills = [
    "Flutter",
    "Dart",
    "React.js",
    "JavaScript",
    "TypeScript",
    "PHP",
    "Symfony",
    "Java",
    "Spring Boot",
    "Node.js",
    "NestJS",
    "SQL",
    "PostgreSQL",
    "Oracle",
    "MongoDB",
    "HTML",
    "CSS",
    "Tailwind",
    "Python",
    "Bash",
    "PowerShell",
    "Git",
    "GitLab CI/CD",
    "Docker",
    "Docker Compose",
    "Kubernetes",
    "REST APIs",
    "WebSockets",
    "Matrix (Synapse, Olm/Megolm)",
    "CI/CD Pipelines",
    "DevOps Fundamentals",
    "Mobile UI/UX Design",
    "Figma",
    "Secure Development Practices",
  ];

  return (
    <motion.section
      id="languages"
      className="py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <ArrowUpNarrowWideIcon className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Skills</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Technical Skills & Growth</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A solid engineering toolkit, continuously expanded with DevSecOps
            and applied AI.
          </p>
        </div>

        {/* Main layout: skills cloud + growth card */}
        <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] items-start">
          {/* Core skills */}
          <Card className="bg-card border-border/70">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3 mb-1">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Languages className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg md:text-xl">
                    Core technical toolkit
                  </CardTitle>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Languages, frameworks and tools I use daily to build
                    production-ready systems.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs md:text-sm px-3 py-1 rounded-full"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Ongoing learning / skills growth */}
          <Card className="bg-gradient-to-br from-primary/10 via-card to-secondary/20 border-primary/30 shadow-lg shadow-primary/10">
            <CardContent className="py-6 px-5 flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-primary/20 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] uppercase tracking-[0.25em] text-primary mb-1">
                    Currently growing
                  </p>
                  <h3 className="font-semibold text-lg mb-1 text-foreground">
                    Deepening my expertise in DevSecOps & Applied AI
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    I’m actively strengthening my profile as a software engineer
                    by focusing on secure delivery pipelines, automated
                    security testing, and AI-assisted development workflows to
                    build reliable and secure products end-to-end.
                  </p>
                </div>
              </div>

              {/* Two mini tracks: DevSecOps & AI */}
              <div className="grid gap-4 md:grid-cols-2">
                {/* DevSecOps track */}
                <div className="rounded-lg border border-primary/30 bg-background/40 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-primary/15">
                      <Shield className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      DevSecOps track
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Bringing security earlier into the development lifecycle.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Secure CI/CD
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      SAST & DAST
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Container Security
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Threat Modeling
                    </Badge>
                  </div>
                </div>

                {/* AI track */}
                <div className="rounded-lg border border-primary/30 bg-background/40 p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-1.5 rounded-md bg-primary/15">
                      <Globe className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                      Applied AI track
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Using AI to improve developer productivity and product
                    intelligence.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      AI for Developers
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      LLMs & Automation
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Code Assistants
                    </Badge>
                    <Badge variant="outline" className="text-[10px] px-2 py-0.5">
                      Intelligent Features
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Small footer line */}
              <p className="text-[11px] text-muted-foreground mt-1">
                This learning path directly reinforces my work on secure,
                production-ready applications and AI-powered features.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.section>
  );
};

export default LanguagesSection;
