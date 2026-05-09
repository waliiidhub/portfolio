import { Heart, Target, Lightbulb, Shield, Globe, Users, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const motivations = [
  {
    icon: Lightbulb,
    title: "Building Meaningful Digital Experiences",
    description:
      "What motivates me most is creating products that genuinely help people. Whether it's improving communication for thousands of travelers or optimizing an internal tool used every day by companies, I thrive when my work has a real and measurable impact.",
  },
  {
    icon: Zap,
    title: "Turning Ideas Into Scalable Systems",
    description:
      "I love transforming abstract ideas into fully functional, scalable solutions. From mobile apps to backend architectures, I enjoy designing systems that are clean, efficient, and engineered for long-term growth.",
  },
  {
    icon: Globe,
    title: "Solving Real-World Problems Through Technology",
    description:
      "Technology is a universal language. I'm driven by the possibility of building software that makes everyday life easier — smarter communication, faster workflows, richer user experiences, and more connected communities.",
  },
  {
    icon: Users,
    title: "Empowering Teams & Clients",
    description:
      "I value collaboration and knowledge-sharing. Whether it's designing UI for a client, building an SDK for multiple applications, or helping teammates overcome challenges, I enjoy contributing to environments where everyone grows together.",
  },
];

const values = [
  {
    icon: Heart,
    title: "User-Centered Mindset",
    description:
      "Every feature I build starts with one question: does this improve the user's experience? Great products are born from empathy, clarity, and a deep understanding of how people interact with software.",
  },
  {
    icon: Target,
    title: "Continuous Improvement",
    description:
      "I am committed to learning every day — new frameworks, new architectures, new tools, new design principles. Technology evolves quickly, and I love growing with it.",
  },
  {
    icon: Shield,
    title: "Security & Reliability First",
    description:
      "From secure authentication to encrypted messaging, I prioritize building systems that protect users and ensure high reliability. Quality isn't an option — it's a responsibility.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description:
      "I believe in giving back: documenting solutions, mentoring, and helping teams adopt better practices. Sharing knowledge creates stronger teams and better products.",
  },
];

const personalStory = {
  title: "My Journey Into Software Engineering",
  paragraphs: [
    "My passion for software started with a simple curiosity: how something written on a screen could come to life and impact people. As I learned and grew, I explored mobile development, backend engineering, cloud tools, and UX design, and with every step I discovered new ways technology can make life easier, more connected, or simply more enjoyable.",
    "What shaped me the most wasn't a single project, but the continuous journey of improvement — the late nights spent learning a new concept, the challenges that forced me to rethink my approach, the small wins that slowly built confidence, and the satisfaction of turning ideas into something real and useful.",
    "Today, what drives me is the desire to build software that feels natural, dependable, and thoughtful. I love creating systems that people enjoy using, codebases that teams enjoy maintaining, and experiences that blend functionality and emotion. For me, being a developer is not just about writing code — it's about growing, adapting, understanding humans, and building technology that genuinely matters.",
  ],
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0, 0, 0.2, 1] },
  }),
};

const MotivationSection = () => {
  return (
    <motion.section
      id="motivation"
      className="py-14 md:py-24"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-16">
          <div className="flex justify-center mb-4">
            <span className="section-label">
              <Heart className="h-3.5 w-3.5" />
              What Drives Me
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">
            Motivation & Values
          </h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            The passion and principles that guide my engineering journey.
          </p>
        </div>

        {/* Personal story — with decorative quote mark */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-card border border-border/60 mb-10 md:mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          {/* Decorative quote mark */}
          <div
            className="absolute top-4 left-6 font-display font-bold leading-none pointer-events-none select-none"
            style={{
              fontSize: "8rem",
              color: "hsl(262 83% 68% / 0.06)",
              lineHeight: 1,
            }}
          >
            "
          </div>
          {/* Top accent */}
          <div
            className="absolute inset-x-0 top-0 h-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(262 83% 68% / 0.7) 35%, hsl(230 68% 62% / 0.5) 65%, transparent)",
            }}
          />

          <div className="relative z-10 p-5 sm:p-8">
            <h3 className="text-xl font-display font-bold text-foreground mb-5">
              {personalStory.title}
            </h3>
            <div className="space-y-4">
              {personalStory.paragraphs.map((para, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </div>
        </motion.div>

        {/* What Motivates Me */}
        <div className="mb-10 md:mb-14 max-w-4xl mx-auto">
          <h3 className="text-xl font-display font-semibold text-center mb-8">
            What Motivates Me
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {motivations.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 hover:border-violet/30 transition-all duration-300 hover:shadow-[0_6px_30px_hsl(262_83%_68%/0.08)] p-5"
              >
                <div className="card-top-accent" />
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-violet/10 border border-violet/15 group-hover:bg-violet/18 transition-colors shrink-0">
                    <item.icon className="h-5 w-5 text-violet" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold mb-1.5 group-hover:text-violet transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-10 md:mb-14 max-w-4xl mx-auto">
          <h3 className="text-xl font-display font-semibold text-center mb-8">
            Core Values
          </h3>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map((item, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/60 hover:border-violet/30 transition-all duration-300 hover:shadow-[0_6px_30px_hsl(262_83%_68%/0.08)] p-5"
              >
                <div className="card-top-accent" />
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-violet/10 border border-violet/15 group-hover:bg-violet/18 transition-colors shrink-0">
                    <item.icon className="h-5 w-5 text-violet" />
                  </div>
                  <div>
                    <h4 className="text-sm font-display font-semibold mb-1.5 group-hover:text-violet transition-colors duration-200">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Closing quote */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
          <div
            className="relative overflow-hidden rounded-2xl border border-violet/20 text-center px-8 py-8"
            style={{
              background:
                "linear-gradient(135deg, hsl(262 83% 68% / 0.07) 0%, hsl(243 22% 8%) 50%, hsl(230 68% 62% / 0.05) 100%)",
            }}
          >
            <div
              className="absolute inset-x-0 top-0 h-[1.5px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, hsl(262 83% 68% / 0.6) 35%, hsl(230 68% 62% / 0.4) 65%, transparent)",
              }}
            />
            <p className="text-base font-display font-medium italic text-foreground/85 mb-3 leading-relaxed">
              "Progress happens step by step. I believe in improving consistently,
              learning constantly, and building things that make a real difference."
            </p>
            <span className="text-xs font-mono font-semibold text-violet tracking-wider uppercase">
              — My Personal Philosophy
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MotivationSection;
