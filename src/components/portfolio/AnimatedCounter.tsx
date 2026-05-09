import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  numberClassName?: string;
  labelClassName?: string;
  labelFirst?: boolean;
  className?: string;
}

const AnimatedCounter = ({
  value,
  label,
  suffix = "",
  prefix = "",
  numberClassName,
  labelClassName,
  labelFirst = false,
  className,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { damping: 55, stiffness: 90 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, motionValue, value]);

  useEffect(() => {
    if (prefersReduced) { setDisplay(value); return; }
    const unsubscribe = spring.on("change", (v) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [spring, prefersReduced, value]);

  const numberEl = (
    <span className={numberClassName ?? "font-display text-4xl font-bold text-gradient leading-none"}>
      {prefix}{display}{suffix}
    </span>
  );
  const labelEl = (
    <span className={labelClassName ?? "text-sm text-muted-foreground font-medium tracking-wide uppercase"}>
      {label}
    </span>
  );

  return (
    <div ref={ref} className={className ?? "flex flex-col items-center gap-1"}>
      {labelFirst ? <>{labelEl}{numberEl}</> : <>{numberEl}{labelEl}</>}
    </div>
  );
};

export default AnimatedCounter;
