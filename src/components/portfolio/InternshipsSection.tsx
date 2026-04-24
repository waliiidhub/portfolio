import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const InternshipsSection = () => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  const internships = [
    {
      company: "ContinuousNet & ZenifyTrip",
      role: "AI-Driven Full-Stack Software Engineering Intern",
      period: "March 2025 – October 2025",
      location: "Sousse, Tunisia",
      description:
        "Designed and built the complete messaging ecosystem powering the ZenifyTrip platform across three travel agencies. I developed and deployed the full backend infrastructure, including a multi-tenant NestJS server for agency separation, a Matrix Synapse homeserver integrated with PostgreSQL for secure real-time communication and E2E encryption, and FastAPI AI microservices delivering translation, summarization, and intelligent travel assistance. On the frontend, I created a reusable Flutter messaging SDK used across 12+ mobile applications (Traveller, Guide, Driver, Staff), featuring adaptive UI, offline support, audio/video calls, geolocation, and advanced AI capabilities. The entire system was containerized and automated using GitLab CI/CD, Docker, Docker Compose, Portainer, and Grafana/Prometheus for monitoring.",
      logoUrl: "continuousnet.png",
      demo: "https://play.google.com/store/apps/details?id=com.zenify_client_app&hl=en-US&pli=1",
      videoId: "2jSBJhhQPk0", // YouTube ID
      videoThumbnail: "/thumbnail.jpg",
    },
    {
      company: "CodinGoat",
      role: "Frontend Mobile Developer Intern",
      period: "July 2024 – September 2024",
      location: "Mahdia, Tunisia",
      description:
        "Led the UI design in Figma and developed the Flutter frontend for a role-based e-commerce mobile application. Applied Clean Architecture and Riverpod to ensure maintainability and scalability, implemented secure online payment and stock management functionalities, and incorporated real-time communication and data synchronization using Firebase.",
      logoUrl: "codingoat.png",
      github: "https://github.com/walidmz/CodinGoat",
    },
    {
      company: "ESPRIT",
      role: "Backend Development Intern",
      period: "July 2023 – September 2023",
      location: "Tunis, Tunisia",
      description:
        "Designed and developed the backend of the ESPRIT internship management platform using Spring Boot and JWT-based authentication. Implemented features for student internship tracking, evaluation workflows, document and file management, and communication between students and academic supervisors. Built dedicated modules for teachers, internship supervisors, and the internship department, and contributed to the admin dashboard by implementing core management and monitoring functionalities.",
      logoUrl: "esprit.png",
    },
    {
      company: "MBM LAB",
      role: "Qt Developer Intern",
      period: "July 2022 – August 2022",
      location: "Tunis, Tunisia",
      description:
        "Developed a full-featured desktop application using C++ and the Qt framework. Implemented secure password storage with AES-256 encryption, designed an intuitive interface for managing job offers and candidates, and integrated facial recognition for administrator and recruitment staff authentication using Python and OpenCV. Ensured high standards of security, performance, and user experience throughout the application.",
      logoUrl: "mbm-lab.png",
      github: "https://github.com/walidmz/QtRepass",
    },
  ];

  return (
    <motion.section
      id="internships"
      className="py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6">Internships</h2>
        </div>

        <div className="space-y-8">
          {internships.map((internship, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 overflow-hidden"
            >
              <div className="flex flex-col md:flex-row">
                {/* LEFT: Logo */}
                <div className="md:w-1/4 flex items-center justify-center p-6 bg-muted/40">
                  <img
                    src={internship.logoUrl}
                    alt={`${internship.company} logo`}
                    className="h-20 w-auto object-contain"
                  />
                </div>

                {/* RIGHT: Content */}
                <div className="md:w-3/4">
                  {/* TOP ROW: text + small video preview on the right */}
                  <CardHeader className="pb-3">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      {/* Text block */}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-xl text-foreground">
                          {internship.company}
                        </CardTitle>
                        <p className="text-primary font-semibold">
                          {internship.role}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <p>{internship.period}</p>
                          <p>{internship.location}</p>
                        </div>
                      </div>

                      {/* Small video preview ONLY for ContinuousNet (or any with videoId) */}
                      {internship.videoId && (
                        <div className="w-full md:w-auto md:ml-4 flex-shrink-0">
                          <p className="text-[10px] text-muted-foreground mb-1 font-semibold tracking-[0.15em] uppercase text-right">
                            Project demo
                          </p>
                          <button
                            type="button"
                            onClick={() =>
                              setActiveVideoId(internship.videoId as string)
                            }
                            className="group relative ml-auto w-36 sm:w-40 aspect-video rounded-lg overflow-hidden bg-black/80 border border-border shadow-sm hover:shadow-md transition-shadow"
                          >
                            <img
                              src={
                                internship.videoThumbnail ||
                                `https://img.youtube.com/vi/${internship.videoId}/hqdefault.jpg`
                              }
                              alt="Project demo video thumbnail"
                              className="w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent group-hover:from-black/50 group-hover:via-black/30 transition-colors duration-300" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full backdrop-blur-sm group-hover:bg-black/80 transition-colors">
                                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary shadow-lg group-hover:scale-105 transition-transform">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-3.5 h-3.5 text-primary-foreground ml-[1px]"
                                  >
                                    <polygon points="5 3 19 12 5 21 5 3" />
                                  </svg>
                                </div>
                                <span className="text-[11px] text-white font-medium">
                                  Watch demo
                                </span>
                              </div>
                            </div>
                          </button>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  {/* BOTTOM: description + buttons */}
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      {internship.description}
                    </p>

                    <div className="flex gap-3 flex-wrap">
                      {internship.github && (
                        <Button
                          variant="outline"
                          onClick={() =>
                            window.open(internship.github, "_blank")
                          }
                        >
                          View GitHub
                        </Button>
                      )}

                      {internship.demo && (
                        <Button
                          onClick={() =>
                            window.open(internship.demo, "_blank")
                          }
                        >
                          Live Demo
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* MODAL: clicking background or Close closes it */}
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
              title="Internship demo video"
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
