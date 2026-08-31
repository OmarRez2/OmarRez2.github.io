"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ProjectCard } from "@/components/project-card";
import type { Project } from "@/lib/portfolio-data";
import { cn } from "@/lib/utils";

const filters = ["All", "Power BI", "SQL", "Python"] as const;

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<(typeof filters)[number]>("All");
  const reduceMotion = useReducedMotion();
  const visible = useMemo(
    () => projects.filter((project) => active === "All" || project.tech.some((item) => item.toLowerCase().includes(active.toLowerCase()))),
    [active, projects],
  );

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter projects">
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActive(filter)}
            aria-pressed={active === filter}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-semibold transition",
              active === filter
                ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/15"
                : "border-border bg-card text-muted-foreground hover:border-primary/35 hover:text-foreground",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-10 grid gap-6 lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
