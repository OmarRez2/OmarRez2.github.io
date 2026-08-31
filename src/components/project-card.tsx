"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";

export function ProjectCard({ project, priority = false, showStats = false }: { project: Project; priority?: boolean; showStats?: boolean }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, { stiffness: 190, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 190, damping: 20 });
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const glareX = useTransform(smoothX, [-0.5, 0.5], ["5%", "95%"]);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ["5%", "95%"]);
  const glare = useMotionTemplate`radial-gradient(320px circle at ${glareX} ${glareY}, rgba(125, 211, 252, 0.18), transparent 58%)`;

  function trackPointer(event: React.PointerEvent<HTMLElement>) {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  }

  function resetTilt() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -7 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      onPointerMove={trackPointer}
      onPointerLeave={resetTilt}
      style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1100, transformStyle: "preserve-3d" }}
      className="group relative h-full overflow-hidden rounded-[1.75rem] border border-border/70 bg-card shadow-sm transition-shadow duration-300 will-change-transform hover:shadow-2xl hover:shadow-primary/10"
    >
      <motion.div className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: glare }} />
      <Link href={`/projects/${project.slug}`} className="flex h-full flex-col focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <Image
            src={project.image}
            alt={`${project.title} dashboard preview`}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {project.eyebrow}
          </span>
        </div>
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{project.year}</p>
              <h3 className="mt-2 text-xl font-semibold tracking-[-0.025em] sm:text-2xl">{project.title}</h3>
            </div>
            <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border bg-background transition duration-300 group-hover:rotate-6 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
              <ArrowUpRight className="size-5" />
            </span>
          </div>
          <p className={showStats ? "mt-4 line-clamp-2 text-sm leading-7 text-muted-foreground" : "mt-4 line-clamp-3 text-sm leading-7 text-muted-foreground"}>{project.description}</p>
          {showStats ? (
            <div className="mt-5 grid grid-cols-2 gap-2 border-y border-border/70 py-4">
              {project.stats.slice(0, 2).map((stat) => (
                <div key={stat.label}>
                  <p className="text-base font-semibold tracking-[-0.025em] text-foreground">{stat.value}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            {project.tech.slice(0, showStats ? 3 : 4).map((item) => (
              <span key={item} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                {item}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
