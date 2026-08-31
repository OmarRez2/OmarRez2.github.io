"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const progress = useMotionValue(reduceMotion ? value : 0);
  const rounded = useTransform(progress, (latest) => `${prefix}${latest.toFixed(decimals)}${suffix}`);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      progress.set(value);
      return;
    }
    const controls = animate(progress, value, { duration: 1.35, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [inView, progress, reduceMotion, value]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
}
