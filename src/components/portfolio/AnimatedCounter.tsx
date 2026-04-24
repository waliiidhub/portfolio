import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

const AnimatedCounter = ({ value, label, suffix = "", prefix = "" }: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(prefersReduced ? value : value);
  }, [isInView, motionValue, value, prefersReduced]);

  useEffect(() => {
    if (prefersReduced) { setDisplay(value); return; }
    const unsubscribe = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [spring, prefersReduced, value]);

  return (
    <div className="flex flex-col items-center gap-1">
      <span ref={ref} className="font-display text-4xl font-bold text-gradient leading-none">
        {prefix}{display}{suffix}
      </span>
      <span className="text-sm text-muted-foreground font-medium tracking-wide uppercase">
        {label}
      </span>
    </div>
  );
};

export default AnimatedCounter;
