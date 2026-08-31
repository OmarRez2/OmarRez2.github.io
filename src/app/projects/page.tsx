import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Power BI, SQL, Python, and business intelligence case studies by Omar Rezk.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Analytics Projects & Case Studies | Omar Rezk",
    description: "Power BI, SQL, Python, and business intelligence case studies by Omar Rezk.",
    url: "/projects",
    images: [{ url: "/images/projects/sales-overview.webp", alt: "Sales Intelligence Hub dashboard" }],
  },
};

const kaggleProjects = [
  { title: "Cardiovascular Disease Data Analysis", tag: "Python · EDA", href: "https://www.kaggle.com/omarrezk" },
  { title: "Tesla Stock EDA & Prediction", tag: "Python · Machine Learning", href: "https://www.kaggle.com/omarrezk" },
];

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Case studies with a clear path from question to insight."
        description="Explore end-to-end projects across sales, mobility, financial risk, and retail—with real KPIs, reproducible analysis, and interactive Power BI experiences."
      />
      <section className="section-pad">
        <div className="container-shell">
          <ProjectsGrid projects={projects} />
        </div>
      </section>
      <section className="border-t border-border/70 bg-card/35 py-20">
        <div className="container-shell">
          <Reveal>
            <p className="eyebrow">Data science notebooks</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {kaggleProjects.map((project) => (
                <a
                  key={project.title}
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-5 rounded-3xl border border-border/70 bg-background p-6 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5"
                >
                  <span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">{project.tag}</span>
                    <span className="mt-2 block text-lg font-semibold">{project.title}</span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 transition group-hover:rotate-6 group-hover:text-primary" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
