import { Heart, Target, Lightbulb, Shield, Globe, Users, Zap, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const MOTIVATION_ICONS = [Lightbulb, Zap, Globe, Users];
const VALUE_ICONS = [Heart, Target, Shield, BookOpen];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: [0, 0, 0.2, 1] },
  }),
};

const MotivationSection = () => {
  const { t } = useTranslation();

  const paragraphs = t("motivation.paragraphs", { returnObjects: true }) as string[];
  const motivations = (t("motivation.motivations", { returnObjects: true }) as Array<{ title: string; description: string }>).map(
    (item, i) => ({ ...item, icon: MOTIVATION_ICONS[i] })
  );
  const values = (t("motivation.values", { returnObjects: true }) as Array<{ title: string; description: string }>).map(
    (item, i) => ({ ...item, icon: VALUE_ICONS[i] })
  );

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
              {t("motivation.label")}
            </span>
          </div>
          <h2 className="text-4xl font-display font-bold mb-3 tracking-tight">
            {t("motivation.title")}
          </h2>
          <div className="section-heading-line" />
          <p className="text-base text-muted-foreground max-w-xl mx-auto mt-5 leading-relaxed">
            {t("motivation.subtitle")}
          </p>
        </div>

        {/* Personal story */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-card border border-border/60 mb-10 md:mb-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        >
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
          <div
            className="absolute inset-x-0 top-0 h-[1.5px]"
            style={{
              background:
                "linear-gradient(90deg, transparent, hsl(262 83% 68% / 0.7) 35%, hsl(230 68% 62% / 0.5) 65%, transparent)",
            }}
          />

          <div className="relative z-10 p-5 sm:p-8">
            <h3 className="text-xl font-display font-bold text-foreground mb-5">
              {t("motivation.storyTitle")}
            </h3>
            <div className="space-y-4">
              {paragraphs.map((para, i) => (
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
            {t("motivation.whatMotivatesMe")}
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
            {t("motivation.coreValues")}
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
              "{t("motivation.quote")}"
            </p>
            <span className="text-xs font-mono font-semibold text-violet tracking-wider uppercase">
              {t("motivation.quoteAuthor")}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MotivationSection;
