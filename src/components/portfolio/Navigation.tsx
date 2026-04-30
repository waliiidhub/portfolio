import { useState, useEffect } from "react";
import { Menu, X, User, Briefcase, GraduationCap, Wrench, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { icon: User,         label: "About",       href: "#about",       id: "about"       },
  { icon: Briefcase,    label: "Projects",    href: "#projects",    id: "projects"    },
  { icon: Briefcase,    label: "Internships", href: "#internships", id: "internships" },
  { icon: GraduationCap,label: "Education",   href: "#education",   id: "education"   },
  { icon: Wrench,       label: "Toolkit",     href: "#languages",   id: "languages"   },
  { icon: Heart,        label: "Values",      href: "#motivation",  id: "motivation"  },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const onScroll = () => {
      const scrolled  = window.scrollY;
      const total     = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-64px 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <>
      {/* Scroll-progress bar */}
      <div
        className="fixed top-0 left-0 z-[60] h-[2px] pointer-events-none"
        style={{
          width: `${scrollProgress}%`,
          background: "linear-gradient(to right, hsl(262 83% 68%), hsl(230 68% 62%))",
          transition: "width 100ms linear",
        }}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); scrollTo("#about"); }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-7 h-7 rounded-lg bg-violet/15 border border-violet/30 flex items-center justify-center group-hover:bg-violet/25 group-hover:border-violet/50 transition-all duration-200">
                <span className="font-mono text-xs font-bold text-violet">W</span>
              </div>
              <span className="font-display font-semibold text-sm tracking-tight text-foreground group-hover:text-violet transition-colors duration-200">
                Walid Marzouk
              </span>
            </a>

            {/* Desktop nav — pill container */}
            <div className="hidden md:flex items-center gap-0.5 bg-surface-elevated/40 rounded-full border border-border/40 px-2 py-1.5">
              {navItems.map(({ icon: Icon, label, href, id }) => {
                const active = activeSection === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(href)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      active
                        ? "text-white bg-violet shadow-[0_0_14px_hsl(262_83%_68%/0.45)]"
                        : "text-muted-foreground hover:text-foreground hover:bg-white/[0.06]"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    {label}
                  </button>
                );
              })}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden p-2 text-muted-foreground hover:text-violet hover:bg-violet/10 rounded-lg transition-all duration-150"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden border-t border-border/50 overflow-hidden"
            >
              <div className="px-4 py-3 space-y-1">
                {navItems.map(({ icon: Icon, label, href, id }) => {
                  const active = activeSection === id;
                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(href)}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left ${
                        active
                          ? "text-violet bg-violet/10 border border-violet/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navigation;
