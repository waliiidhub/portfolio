import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Github, ExternalLink, Shield, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Mouqawel.tn Mobile App",
    company: "Independent Freelance Project",
    period: "2024",
    location: "Mouqawel",
    description:
      "Created a mobile application for Mouqawel.tn to provide contractors with on-the-go access to services, improving usability and customer satisfaction.",
    icon: Shield,
    category: "Mobile Development",
    technologies: ["Flutter", "MVVM", "Provider", "Figma", "ValueNotifier", "Git"],
    highlights: [
      "Role-based UX for contractors",
      "Optimized for mobile-first usage",
      "Improved customer satisfaction",
    ],
    status: "Stopped",
    github: "https://github.com/walidmz/Mouqawel-app",
    demo: "",
    imageUrl: "/image.png",
  },
  {
    title: "Bisou Mobile App",
    company: "Independent Freelance Project",
    period: "2025",
    location: "Bisou Café",
    description:
      "Designed and developed a modern mobile application for Bisou Café, focused on delivering a smooth customer experience and a strong visual identity aligned with the brand. The app is built to be extendable, ready for future features such as digital menus, ordering, loyalty, and customer engagement.",
    icon: Briefcase,
    category: "Mobile Development",
    technologies: ["Flutter", "Git"],
    highlights: [
      "Mobile-first UX tailored to Bisou Café's branding",
      "Clean, maintainable Flutter codebase ready for future features",
      "End-to-end delivery: from UI design to implementation and testing",
    ],
    status: "Completed",
    github: "",
    demo: "",
    videoId: "qRSv_clT194",
    imageUrl: "/bisou.png",
  },
];

const statusStyle = (status: string) => {
  if (status === "Completed")
    return "bg-emerald-500/80 text-white border border-emerald-400/30 backdrop-blur-sm";
  if (status === "In Progress")
    return "bg-sky-500/80 text-white border border-sky-400/30 backdrop-blur-sm";
  return "bg-amber-500/70 text-white border border-amber-400/30 backdrop-blur-sm";
};

const ProjectsSection = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <motion.section
      id="projects"
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
              <Briefcase className="h-3.5 w-3.5" />
              Portfolio
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">
            Featured Projects
          </h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            A selection of web and mobile projects highlighting both technical
            depth and real-world impact.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-8 max-w-3xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-card border-border/60 hover:border-violet/35 transition-all duration-300 hover:shadow-[0_12px_50px_hsl(262_83%_68%/0.1)]"
            >
              {/* Top accent line */}
              <div className="card-top-accent" />

              {/* Image header */}
              {project.imageUrl && (
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={`${project.title} preview`}
                    className="w-full h-full object-cover transform group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

                  {/* Project number */}
                  <div className="absolute top-4 left-4 font-mono text-[11px] font-semibold tracking-[0.25em] text-violet/60">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* Badges top-right */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm border border-white/15 text-white/75">
                      {project.category}
                    </span>
                    <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${statusStyle(project.status)}`}>
                      {project.status}
                    </span>
                  </div>

                  {/* Title overlaid at bottom of image */}
                  <div className="absolute bottom-4 left-5 right-5">
                    <h3 className="text-xl font-display font-bold text-foreground group-hover:text-violet transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-white/55 mt-0.5">{project.company}</p>
                  </div>
                </div>
              )}

              <CardContent className="pt-5 space-y-4">
                {/* Meta */}
                <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono">
                  {project.period && <span>{project.period}</span>}
                  {project.location && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-muted-foreground/40" />
                      <span>{project.location}</span>
                    </>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Highlights */}
                {project.highlights.length > 0 && (
                  <ul className="space-y-1.5">
                    {project.highlights.map((hl, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-violet/70 shrink-0" />
                        {hl}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech badges */}
                {project.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="badge-tech">{tech}</span>
                    ))}
                  </div>
                )}

                {/* Action buttons */}
                {(project.github || project.demo || project.videoId) && (
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
                    {project.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-1.5 text-xs border-border/60 hover:border-violet/50 hover:text-violet transition-all duration-200"
                      >
                        <a href={project.github} target="_blank" rel="noreferrer">
                          <Github className="h-3.5 w-3.5" />
                          Source Code
                        </a>
                      </Button>
                    )}
                    {project.demo && (
                      <Button
                        size="sm"
                        asChild
                        className="gap-1.5 text-xs text-white"
                        style={{ background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))" }}
                      >
                        <a href={project.demo} target="_blank" rel="noreferrer">
                          <ExternalLink className="h-3.5 w-3.5" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.videoId && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-1.5 text-xs text-violet hover:bg-violet/10 hover:text-violet transition-all duration-200"
                        onClick={() => setActiveVideoId(project.videoId as string)}
                      >
                        <PlayCircle className="h-3.5 w-3.5" />
                        Watch Demo
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video modal */}
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
              Close ✕
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="Project demo"
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

export default ProjectsSection;
