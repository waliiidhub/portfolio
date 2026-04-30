import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const internships = [
  {
    company: "ContinuousNet & ZenifyTrip",
    role: "AI-Driven Full-Stack Software Engineering Intern",
    period: "Mar 2025 – Oct 2025",
    location: "Sousse, Tunisia",
    description:
      "Designed and built the complete messaging ecosystem powering the ZenifyTrip platform across three travel agencies. I developed and deployed the full backend infrastructure, including a multi-tenant NestJS server for agency separation, a Matrix Synapse homeserver integrated with PostgreSQL for secure real-time communication and E2E encryption, and FastAPI AI microservices delivering translation, summarization, and intelligent travel assistance. On the frontend, I created a reusable Flutter messaging SDK used across 12+ mobile applications (Traveller, Guide, Driver, Staff), featuring adaptive UI, offline support, audio/video calls, geolocation, and advanced AI capabilities. The entire system was containerized and automated using GitLab CI/CD, Docker, Docker Compose, Portainer, and Grafana/Prometheus for monitoring.",
    logoUrl: "continuousnet.png",
    demo: "https://play.google.com/store/apps/details?id=com.zenify_client_app&hl=en-US&pli=1",
    videoId: "2jSBJhhQPk0",
    videoThumbnail: "/thumbnail.jpg",
  },
  {
    company: "CodinGoat",
    role: "Frontend Mobile Developer Intern",
    period: "Jul 2024 – Sep 2024",
    location: "Mahdia, Tunisia",
    description:
      "Led the UI design in Figma and developed the Flutter frontend for a role-based e-commerce mobile application. Applied Clean Architecture and Riverpod to ensure maintainability and scalability, implemented secure online payment and stock management functionalities, and incorporated real-time communication and data synchronization using Firebase.",
    logoUrl: "codingoat.png",
    github: "https://github.com/walidmz/CodinGoat",
  },
  {
    company: "ESPRIT",
    role: "Backend Development Intern",
    period: "Jul 2023 – Sep 2023",
    location: "Tunis, Tunisia",
    description:
      "Designed and developed the backend of the ESPRIT internship management platform using Spring Boot and JWT-based authentication. Implemented features for student internship tracking, evaluation workflows, document and file management, and communication between students and academic supervisors. Built dedicated modules for teachers, internship supervisors, and the internship department, and contributed to the admin dashboard by implementing core management and monitoring functionalities.",
    logoUrl: "esprit.png",
  },
  {
    company: "MBM LAB",
    role: "Qt Developer Intern",
    period: "Jul 2022 – Aug 2022",
    location: "Tunis, Tunisia",
    description:
      "Developed a full-featured desktop application using C++ and the Qt framework. Implemented secure password storage with AES-256 encryption, designed an intuitive interface for managing job offers and candidates, and integrated facial recognition for administrator and recruitment staff authentication using Python and OpenCV. Ensured high standards of security, performance, and user experience throughout the application.",
    logoUrl: "mbm-lab.png",
    github: "https://github.com/walidmz/QtRepass",
  },
];

const InternshipsSection = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <motion.section
      id="internships"
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
              <Briefcase className="h-3.5 w-3.5" />
              Experience
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">Internships</h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            Professional experience building real-world products across mobile, backend, and AI domains.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical connector */}
          <div
            className="hidden md:block absolute left-6 top-8 bottom-8 w-px"
            style={{
              background:
                "linear-gradient(to bottom, transparent, hsl(262 83% 68% / 0.4) 10%, hsl(262 83% 68% / 0.3) 85%, transparent)",
            }}
          />

          <div className="space-y-8 md:pl-16">
            {internships.map((internship, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: [0, 0, 0.2, 1] }}
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
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border/60 group-hover:border-violet/30 transition-all duration-300 group-hover:shadow-[0_8px_40px_hsl(262_83%_68%/0.08)]">
                  {/* Top accent */}
                  <div className="card-top-accent" />

                  <div className="p-6">
                    {/* Top row */}
                    <div className="flex flex-col md:flex-row md:items-start gap-4 mb-4">

                      {/* Logo */}
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-muted/50 border border-border/60 flex items-center justify-center overflow-hidden p-2">
                        <img
                          src={internship.logoUrl}
                          alt={`${internship.company} logo`}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Company info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-display font-bold text-foreground group-hover:text-violet transition-colors duration-200">
                              {internship.company}
                            </h3>
                            <p className="text-sm font-semibold text-violet/90 mt-0.5">
                              {internship.role}
                            </p>
                          </div>

                          {/* Video thumbnail */}
                          {internship.videoId && (
                            <button
                              type="button"
                              onClick={() => setActiveVideoId(internship.videoId as string)}
                              className="group/vid relative w-32 aspect-video rounded-lg overflow-hidden bg-black/80 border border-border/60 hover:border-violet/40 shadow-sm hover:shadow-md transition-all shrink-0"
                            >
                              <img
                                src={
                                  internship.videoThumbnail ||
                                  `https://img.youtube.com/vi/${internship.videoId}/hqdefault.jpg`
                                }
                                alt="Project demo"
                                className="w-full h-full object-cover opacity-90 group-hover/vid:opacity-100 transition-opacity"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover/vid:from-black/50 transition-colors" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-sm">
                                  <div
                                    className="flex items-center justify-center w-6 h-6 rounded-full"
                                    style={{ background: "hsl(262 83% 68%)" }}
                                  >
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white ml-[1px]">
                                      <polygon points="5 3 19 12 5 21 5 3" />
                                    </svg>
                                  </div>
                                  <span className="text-[10px] text-white font-medium">Demo</span>
                                </div>
                              </div>
                            </button>
                          )}
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap items-center gap-4 mt-2.5">
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                            <Calendar className="h-3 w-3 text-violet/60 shrink-0" />
                            {internship.period}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 text-violet/60 shrink-0" />
                            {internship.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {internship.description}
                    </p>

                    {/* Buttons */}
                    {(internship.github || internship.demo) && (
                      <div className="flex flex-wrap gap-2 pt-3 border-t border-border/50">
                        {internship.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs gap-1.5 border-border/60 hover:border-violet/50 hover:text-violet transition-all duration-200"
                            onClick={() => window.open(internship.github, "_blank")}
                          >
                            View GitHub
                          </Button>
                        )}
                        {internship.demo && (
                          <Button
                            size="sm"
                            className="text-xs gap-1.5 text-white transition-all duration-200"
                            style={{ background: "linear-gradient(135deg, hsl(262 83% 64%), hsl(230 68% 60%))" }}
                            onClick={() => window.open(internship.demo, "_blank")}
                          >
                            Live Demo
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
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
              title="Internship demo"
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

export default InternshipsSection;
