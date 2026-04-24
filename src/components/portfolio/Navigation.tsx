import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Briefcase, GraduationCap, ArrowUpNarrowWideIcon, Dumbbell } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { icon: User, label: "About", href: "#about" },
    { icon: Briefcase, label: "Projects", href: "#projects" },
    { icon: Briefcase, label: "Internships", href: "#internships" },
    { icon: GraduationCap, label: "Education", href: "#education" },
    { icon: ArrowUpNarrowWideIcon, label: "Toolkit", href: "#languages" },
    { icon: Dumbbell, label: "Motivation", href: "#motivation" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); scrollToSection("#about"); }}
            className="font-display font-semibold tracking-tight text-foreground hover:text-violet transition-colors duration-normal"
          >
            Walid Marzouk
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-violet hover:bg-violet/10 transition-colors duration-normal"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-muted-foreground hover:text-violet hover:bg-violet/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t border-border/50 py-4 space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.label}
                variant="ghost"
                size="sm"
                onClick={() => scrollToSection(item.href)}
                className="w-full justify-start text-muted-foreground hover:text-violet hover:bg-violet/10"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
