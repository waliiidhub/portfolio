import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  id?: string;
  className?: string;
  children: ReactNode;
  delay?: number;
}

const SectionWrapper = ({ id, className, children, delay = 0 }: SectionWrapperProps) => {
  const prefersReduced = useReducedMotion();

  const variants = {
    hidden: prefersReduced ? { opacity: 0 } : { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0, 0, 0.2, 1], delay },
    },
  };

  return (
    <motion.section
      id={id}
      className={cn("section-container", className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
