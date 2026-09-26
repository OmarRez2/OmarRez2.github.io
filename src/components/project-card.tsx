"use client";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/portfolio-data";
export function ProjectCard({ project, priority = false, showStats = false }: { project: Project; priority?: boolean; showStats?: boolean }) {
  const reduced = useReducedMotion();
  return <motion.article whileHover={reduced ? undefined : { y: -3 }} transition={{ duration: 0.2 }} className="group h-full overflow-hidden rounded-3xl border border-border/70 bg-card transition-shadow hover:shadow-xl hover:shadow-primary/5">
    <Link href={`/projects/${project.slug}`} className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-primary focus-visible:-outline-offset-2">
      <div className="relative aspect-video border-b border-border/70 bg-muted/40">
        <Image src={project.image} alt={`${project.title} dashboard preview`} fill priority={priority} sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" className="object-contain" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">{project.eyebrow} · {project.year}</p>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold leading-tight tracking-[-0.025em]">{project.title}</h3>
          <span className="grid size-9 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><ArrowUpRight className="size-4" /></span>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">{project.description}</p>
        {showStats && <div className="mt-4 grid grid-cols-2 gap-3 border-y border-border/70 py-3">{project.stats.slice(0, 2).map(stat => <div key={stat.label}><p className="text-base font-semibold">{stat.value}</p><p className="mt-1 text-[11px] text-muted-foreground">{stat.label}</p></div>)}</div>}
        <div className="mt-auto flex flex-wrap gap-2 pt-5">{project.tech.slice(0, 4).map(item => <span key={item} className="rounded-full bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground">{item}</span>)}</div>
      </div>
    </Link>
  </motion.article>;
}
