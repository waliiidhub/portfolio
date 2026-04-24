import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Calendar, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const EducationSection = () => {
  const education = [
    {
      degree: "Software Engineering Student",
      institution:
        "The High Private School of Engineering and Technology (ESPRIT)",
      location: "Ariana, Tunisia",
      period: "2023 - Present",
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
      institution:
        "The High Private School of Engineering and Technology (ESPRIT)",
      location: "Ariana, Tunisia",
      period: "2020 - 2022",
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

  return (
    <motion.section
      id="education"
      className="py-24 bg-surface-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <GraduationCap className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">
              Academic Background
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Education</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Continuous learning in software engineering, DevSecOps and applied
            AI.
          </p>
        </div>

        {/* Education cards */}
        <div className="space-y-8 mb-12">
          {education.map((edu, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl text-foreground">
                      {edu.degree}
                    </CardTitle>
                    <p className="text-primary font-semibold">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {edu.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2 justify-end">
                      <Calendar className="h-4 w-4" />
                      {edu.period}
                    </div>
                    <Badge className="bg-primary text-primary-foreground">
                      {edu.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <p className="text-muted-foreground">{edu.description}</p>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground">
                    Key coursework:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course, courseIndex) => (
                      <Badge
                        key={courseIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {course}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    Achievements:
                  </h4>
                  <ul className="space-y-1">
                    {edu.achievements.map(
                      (achievement: string, achievementIndex: number) => (
                        <li
                          key={achievementIndex}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1 h-1 bg-primary rounded-full" />
                          {achievement}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       
      </div>
    </motion.section>
  );
};

export default EducationSection;
