import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Monitor, Server, Smartphone, GitBranch, Sparkles } from 'lucide-react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from 'recharts';
import { useTranslation } from 'react-i18next';

const CATEGORY_ICONS = [BookOpen, Monitor, Server, Smartphone, GitBranch, Sparkles];

const CATEGORIES_DATA = [
  {
    skills: [
      { name: "Algorithms & DS", value: 70 },
      { name: "OOP", value: 80 },
      { name: "Databases", value: 85 },
      { name: "Networking", value: 65 },
      { name: "Code Quality", value: 80 },
      { name: "Design Patterns", value: 75 },
    ],
  },
  {
    skills: [
      { name: "React", value: 65 },
      { name: "Angular", value: 60 },
      { name: "Next.js", value: 70 },
      { name: "Flutter Web", value: 85 },
      { name: "HTML & CSS", value: 75 },
    ],
  },
  {
    skills: [
      { name: "NestJS", value: 85 },
      { name: "Node.js / Express", value: 80 },
      { name: "Spring Boot", value: 90 },
      { name: "Python (FastAPI)", value: 70 },
      { name: "Symfony", value: 90 },
      { name: "ASP .NET", value: 60 },
    ],
  },
  {
    skills: [
      { name: "Flutter", value: 90 },
      { name: "React Native", value: 60 },
      { name: "Kotlin (Android)", value: 80 },
      { name: "Swift & SwiftUI", value: 75 },
      { name: "Kotlin Multiplatform", value: 60 },
    ],
  },
  {
    skills: [
      { name: "Docker / Compose", value: 75 },
      { name: "CI/CD (GitLab)", value: 90 },
      { name: "Linux & Shell", value: 75 },
      { name: "Grafana / Prometheus", value: 60 },
      { name: "Git", value: 90 },
      { name: "Cloud Deployment", value: 60 },
    ],
  },
  {
    skills: [
      { name: "Python Automation", value: 75 },
      { name: "Agent Orchestration", value: 75 },
      { name: "Prompt Engineering", value: 77 },
      { name: "Chatbot Design", value: 78 },
      { name: "Test Automation", value: 55 },
      { name: "Data Processing", value: 50 },
    ],
  },
];

interface SkillsMatrixModalProps {
  onClose: () => void;
}

const SkillsMatrixModal: React.FC<SkillsMatrixModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(2);

  const categoryNames = t('skills.categoryNames', { returnObjects: true }) as string[];

  const categories = CATEGORIES_DATA.map((cat, i) => ({
    ...cat,
    name: categoryNames[i] ?? categoryNames[i],
    icon: CATEGORY_ICONS[i],
  }));

  const category = categories[activeIndex];
  const avg = Math.round(category.skills.reduce((s, sk) => s + sk.value, 0) / category.skills.length);
  const radarData = category.skills.map(s => ({ subject: s.name, A: s.value, fullMark: 100 }));

  const getTier = (value: number) => {
    if (value >= 80) return { label: t('skills.expert'), cls: "text-violet-300 bg-violet-500/15 border-violet-400/40" };
    if (value >= 65) return { label: t('skills.proficient'), cls: "text-blue-300 bg-blue-500/10 border-blue-400/30" };
    return { label: t('skills.familiar'), cls: "text-muted-foreground bg-muted/30 border-border/60" };
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl glass border border-violet/20 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
        style={{ maxHeight: '88vh' }}
        initial={{ opacity: 0, scale: 0.97, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 20 }}
        transition={{ duration: 0.28, ease: [0, 0, 0.2, 1] }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-border/40 shrink-0">
          <div>
            <h2 className="text-xl font-display font-bold text-foreground tracking-tight">{t('skills.title')}</h2>
            <p className="text-xs text-muted-foreground font-mono mt-0.5 tracking-wider">
              {category.skills.length} skills · {category.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl p-2 text-muted-foreground hover:text-foreground hover:bg-violet/10 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Category Tabs ── */}
        <div className="flex items-center gap-1 px-5 py-2.5 border-b border-border/30 overflow-x-auto shrink-0 no-scrollbar">
          {categories.map((cat, i) => (
            <button
              key={cat.name}
              onClick={() => setActiveIndex(i)}
              className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors outline-none focus-visible:ring-1 focus-visible:ring-violet/50"
              style={{ color: activeIndex === i ? 'hsl(262 83% 78%)' : 'hsl(var(--muted-foreground))' }}
            >
              {activeIndex === i && (
                <motion.div
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full border border-violet/30 bg-violet/10"
                  transition={{ type: 'spring', stiffness: 420, damping: 38 }}
                />
              )}
              <cat.icon className="relative z-10 h-3.5 w-3.5 shrink-0" />
              <span className="relative z-10">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="flex flex-col md:flex-row min-h-0 flex-1 overflow-hidden">

          {/* Radar + Score */}
          <div className="md:w-[42%] border-b md:border-b-0 md:border-r border-border/25 flex flex-col items-center justify-center px-6 py-5 shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="w-full flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.25 }}
              >
                <ResponsiveContainer width="100%" height={230}>
                  <RadarChart cx="50%" cy="50%" outerRadius="72%" data={radarData}>
                    <PolarGrid stroke="hsl(262 83% 68% / 0.14)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 9.5, fontFamily: 'ui-monospace, monospace' }}
                    />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      dataKey="A"
                      stroke="hsl(262 83% 68%)"
                      strokeWidth={2}
                      fill="hsl(262 83% 68%)"
                      fillOpacity={0.22}
                      isAnimationActive
                      animationDuration={600}
                    />
                  </RadarChart>
                </ResponsiveContainer>

                <div className="text-center mt-1">
                  <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.18em]">
                    {t('skills.avgProficiency')}
                  </p>
                  <p className="text-4xl font-display font-bold text-gradient leading-none mt-1">
                    {avg}
                    <span className="text-sm font-normal text-muted-foreground ml-0.5">/100</span>
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Skill Bars */}
          <div className="flex-1 overflow-y-auto px-6 py-5 min-h-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                className="space-y-3.5"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  visible: { transition: { staggerChildren: 0.055 } },
                  hidden: {},
                }}
              >
                {category.skills.map((skill, i) => {
                  const tier = getTier(skill.value);
                  return (
                    <motion.div
                      key={skill.name}
                      variants={{
                        hidden: { opacity: 0, x: 14 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0, 0, 0.2, 1] } },
                      }}
                      className="space-y-1.5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium text-foreground leading-none">{skill.name}</span>
                        <span className={`shrink-0 text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${tier.cls}`}>
                          {tier.label}
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-muted/35 overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: 'linear-gradient(90deg, hsl(262 83% 64%), hsl(230 68% 60%))' }}
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.value}%` }}
                          transition={{ duration: 0.65, delay: i * 0.055, ease: [0, 0, 0.2, 1] }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsMatrixModal;
