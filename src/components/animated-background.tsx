"use client";

import { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";

export function AnimatedBackground() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(-600);
  const pointerY = useMotionValue(-600);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${pointerX}px ${pointerY}px, color-mix(in oklch, var(--primary) 13%, transparent), transparent 72%)`;

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(min-width: 900px)").matches) return;
    const trackPointer = (event: PointerEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };
    window.addEventListener("pointermove", trackPointer, { passive: true });
    return () => window.removeEventListener("pointermove", trackPointer);
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div className="absolute inset-0 hidden opacity-80 lg:block" style={{ background: spotlight }} />
      <motion.div
        className="absolute -left-52 -top-52 size-[36rem] rounded-full bg-cyan-500/10 blur-[110px] will-change-transform"
        animate={reduceMotion ? undefined : { x: [0, 90, 18, 0], y: [0, 38, 110, 0], scale: [1, 1.08, 0.94, 1] }}
        transition={{ duration: 19, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-60 top-[18%] size-[42rem] rounded-full bg-violet-500/10 blur-[125px] will-change-transform"
        animate={reduceMotion ? undefined : { x: [0, -85, -20, 0], y: [0, 100, 25, 0], scale: [1, 0.92, 1.06, 1] }}
        transition={{ duration: 23, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
      <motion.div
        className="absolute bottom-[-22rem] left-[28%] size-[40rem] rounded-full bg-blue-500/8 blur-[120px] will-change-transform"
        animate={reduceMotion ? undefined : { x: [0, 120, -30, 0], y: [0, -90, -25, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
      />
      <div className="ambient-data-grid absolute inset-0 opacity-[0.16] dark:opacity-[0.11]" />
    </div>
  );
}
