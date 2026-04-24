import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Target, Lightbulb, Shield, Globe, Users, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const MotivationSection = () => {
 const motivations = [
  {
    icon: Lightbulb,
    title: "Building Meaningful Digital Experiences",
    description:
      "What motivates me most is creating products that genuinely help people. Whether it's improving communication for thousands of travelers or optimizing an internal tool used every day by companies, I thrive when my work has a real and measurable impact."
  },
  {
    icon: Zap,
    title: "Turning Ideas Into Scalable Systems",
    description:
      "I love transforming abstract ideas into fully functional, scalable solutions. From mobile apps to backend architectures, I enjoy designing systems that are clean, efficient, and engineered for long-term growth."
  },
  {
    icon: Globe,
    title: "Solving Real-World Problems Through Technology",
    description:
      "Technology is a universal language. I’m driven by the possibility of building software that makes everyday life easier — smarter communication, faster workflows, richer user experiences, and more connected communities."
  },
  {
    icon: Users,
    title: "Empowering Teams & Clients",
    description:
      "I value collaboration and knowledge-sharing. Whether it's designing UI for a client, building an SDK for multiple applications, or helping teammates overcome challenges, I enjoy contributing to environments where everyone grows together."
  }
];

const values = [
  {
    icon: Heart,
    title: "User-Centered Mindset",
    description:
      "Every feature I build starts with one question: does this improve the user’s experience? Great products are born from empathy, clarity, and a deep understanding of how people interact with software."
  },
  {
    icon: Target,
    title: "Continuous Improvement",
    description:
      "I am committed to learning every day — new frameworks, new architectures, new tools, new design principles. Technology evolves quickly, and I love growing with it."
  },
  {
    icon: Shield,
    title: "Security & Reliability First",
    description:
      "From secure authentication to encrypted messaging, I prioritize building systems that protect users and ensure high reliability. Quality isn't an option — it’s a responsibility."
  },
  {
    icon: BookOpen,
    title: "Knowledge Sharing",
    description:
      "I believe in giving back: documenting solutions, mentoring, and helping teams adopt better practices. Sharing knowledge creates stronger teams and better products."
  }
];

const personalStory = {
  title: "My Journey Into Software Engineering",
  content: `My passion for software started with a simple curiosity: how something written on a screen could come to life and impact people. As I learned and grew, I explored mobile development, backend engineering, cloud tools, and UX design, and with every step I discovered new ways technology can make life easier, more connected, or simply more enjoyable.

What shaped me the most wasn’t a single project, but the continuous journey of improvement — the late nights spent learning a new concept, the challenges that forced me to rethink my approach, the small wins that slowly built confidence, and the satisfaction of turning ideas into something real and useful.

Today, what drives me is the desire to build software that feels natural, dependable, and thoughtful. I love creating systems that people enjoy using, codebases that teams enjoy maintaining, and experiences that blend functionality and emotion. For me, being a developer is not just about writing code — it's about growing, adapting, understanding humans, and building technology that genuinely matters.`
};


  return (
    <motion.section
      id="motivation"
      className="py-24 bg-surface-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 text-primary mb-4">
            <Heart className="h-6 w-6" />
            <span className="text-sm uppercase tracking-wide">What Drives Me</span>
          </div>
          <h2 className="text-4xl font-bold mb-6">Motivation & Values</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The passion and principles that guide my cybersecurity journey
          </p>
        </div>

        {/* Personal Story */}
        <Card className="mb-16 bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-center">{personalStory.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-lg prose-invert max-w-none">
              {personalStory.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* What Motivates Me */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">What Motivates Me</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {motivations.map((motivation, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <motivation.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {motivation.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {motivation.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-2xl font-bold text-center mb-8">Core Values</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border hover:border-primary/50 transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quote */}
        <Card className="mt-16 bg-gradient-dark border-border text-center">
  <CardContent className="p-8">
    <blockquote className="text-xl italic text-foreground mb-4">
      "Progress happens step by step. I believe in improving consistently, learning constantly, and building things that make a real difference."
    </blockquote>
    <cite className="text-primary font-semibold">- My Personal Philosophy</cite>
  </CardContent>
</Card>

      </div>
    </motion.section>
  );
};

export default MotivationSection;