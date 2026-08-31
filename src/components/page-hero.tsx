"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/reveal";

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border/70 pt-32 sm:pt-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_20%,color-mix(in_oklch,var(--primary)_16%,transparent),transparent_36%),radial-gradient(circle_at_82%_10%,rgba(124,58,237,.13),transparent_32%)]" />
      <motion.div
        className="absolute -left-24 top-28 -z-10 size-72 rounded-full bg-cyan-400/8 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, 75, 0], y: [0, 28, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-20 top-16 -z-10 size-80 rounded-full bg-violet-500/10 blur-3xl"
        animate={reduceMotion ? undefined : { x: [0, -70, 0], y: [0, 45, 0], scale: [1.06, 0.94, 1.06] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <div className="container-shell py-16 sm:py-20 lg:py-24">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="mt-7 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}
