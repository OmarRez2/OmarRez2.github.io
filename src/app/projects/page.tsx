import type { Metadata } from "next";
import { ArrowUpRight, BarChart3, Code2 } from "lucide-react";
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
  {
    title: "Tesla Stock EDA & Prediction",
    tag: "Python · Machine Learning",
    href: "https://www.kaggle.com/code/omarrezk/tesla-stock-eda-prediction",
  },
];

const professionalProfiles = [
  {
    title: "GitHub",
    description: "Source code, analytical workflows, documentation, and reproducible project repositories.",
    stat: `${projects.length} documented case studies`,
    href: "https://github.com/OmarRez2",
    icon: Code2,
  },
  {
    title: "Kaggle",
    description: "Exploratory data analysis, machine learning notebooks, and practical data science work.",
    stat: `${kaggleProjects.length} featured notebooks`,
    href: "https://www.kaggle.com/omarrezk",
    icon: BarChart3,
  },
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
            <p className="eyebrow">Professional profiles</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {professionalProfiles.map((profile) => {
                const Icon = profile.icon;
                return (
                  <a
                    key={profile.title}
                    href={profile.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5"
                  >
                    <div className="flex items-start justify-between gap-5">
                      <span className="grid size-12 place-items-center rounded-2xl bg-primary/10 text-primary"><Icon className="size-6" /></span>
                      <ArrowUpRight className="size-5 transition group-hover:rotate-6 group-hover:text-primary" />
                    </div>
                    <p className="mt-6 text-xl font-semibold tracking-[-0.025em]">{profile.title}</p>
                    <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">{profile.description}</p>
                    <p className="mt-5 text-xs font-semibold uppercase tracking-[0.14em] text-primary">{profile.stat}</p>
                  </a>
                );
              })}
            </div>
          </Reveal>

          <Reveal>
            <p className="eyebrow mt-16">Data science notebooks</p>
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
