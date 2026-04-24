import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import {
  Briefcase,
  Github,
  ExternalLink,
  Shield,
  PlayCircle,
} from "lucide-react";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

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
      technologies: [
        "Flutter",
        "MVVM",
        "Provider",
        "Figma",
        "ValueNotifier",
        "Git",
      ],
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
        "Mobile-first UX tailored to Bisou Café’s branding",
        "Clean, maintainable Flutter codebase ready for future features",
        "End-to-end delivery: from UI design to implementation and testing",
      ],
      status: "Completed",
      github: "",
      demo: "",
      videoId: "qRSv_clT194", // just the YouTube ID
      imageUrl: "/bisou.png",
    },
  ];

  const statusVariant = (status: string) => {
    if (status === "Completed") return "default" as const;
    if (status === "In Progress") return "secondary" as const;
    return "outline" as const;
  };

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
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Briefcase className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">Portfolio</span>
          </div>
          <h2 className="text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of web and mobile projects highlighting both technical
            depth and real-world impact.
          </p>
        </div>

        {/* Grid – one project per row */}
        <div className="grid grid-cols-1 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group bg-card border-border/70 hover:border-primary/60 transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 relative overflow-hidden"
            >
              {/* subtle top gradient */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-primary/60 via-primary/0 to-primary/60 opacity-0 group-hover:opacity-100 transition-opacity" />

              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <project.icon className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <CardTitle className="text-lg md:text-xl group-hover:text-primary transition-colors">
                        {project.title}
                      </CardTitle>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {project.category}
                        </Badge>
                        <Badge
                          variant={statusVariant(project.status)}
                          className="text-[11px]"
                        >
                          {project.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs md:text-sm text-muted-foreground">
                      {project.company && <p>{project.company}</p>}
                      {project.period && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                          <p>{project.period}</p>
                        </>
                      )}
                      {project.location && (
                        <>
                          <span className="h-1 w-1 rounded-full bg-muted-foreground/60" />
                          <p>{project.location}</p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-5 pt-0">
                {/* Preview image */}
                {project.imageUrl && (
                  <div className="relative mb-4 rounded-xl overflow-hidden border border-border/60 bg-muted/40">
                    <img
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="w-full h-64 object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    {/* preview pill */}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 text-[11px] text-white backdrop-blur-sm">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      <span>Preview</span>
                    </div>
                  </div>
                )}

                <p className="text-sm md:text-[15px] text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {project.highlights.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground text-sm">
                      Key highlights
                    </h4>
                    <ul className="space-y-1.5">
                      {project.highlights.map((highlight, highlightIndex) => (
                        <li
                          key={highlightIndex}
                          className="text-xs md:text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary/80" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.technologies.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2 text-foreground text-sm">
                      Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="text-[11px] px-2 py-0.5"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                {(project.github || project.demo || project.videoId) && (
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-border/60 mt-1">
                    {project.github && project.github.trim() !== "" && (
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="gap-2"
                      >
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <Github className="h-4 w-4" />
                          <span>Source Code</span>
                        </a>
                      </Button>
                    )}

                    {project.demo && project.demo.trim() !== "" && (
                      <Button size="sm" asChild className="gap-2">
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="h-4 w-4" />
                          <span>Live Demo</span>
                        </a>
                      </Button>
                    )}

                    {project.videoId && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="gap-2"
                        onClick={() =>
                          setActiveVideoId(project.videoId as string)
                        }
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>Watch Demo</span>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Video modal (same behavior as internships, click outside to close) */}
      {activeVideoId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActiveVideoId(null)}
        >
          <div
            className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideoId(null)}
              className="absolute -top-10 right-0 text-sm text-white/80 hover:text-white px-3 py-1 rounded-full border border-white/40 bg-black/40 backdrop-blur-sm"
            >
              Close
            </button>

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1`}
              title="Project demo video"
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