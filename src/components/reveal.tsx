"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.32, delay: Math.min(delay, 0.1), ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
