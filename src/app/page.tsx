import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, CheckCircle2, Database, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/animated-counter";
import { Parallax } from "@/components/parallax";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experiences, projects, skills } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    title: "Omar Rezk | Data Analyst & Power BI Developer",
    description: "Power BI dashboards, analytics case studies, SQL, and Python projects.",
    url: "/",
    images: [{ url: "/images/omar-social-suit-v2.jpg", width: 1254, height: 1254, type: "image/jpeg", alt: "Omar Rezk — Data Analyst and Power BI Developer" }],
  },
};

const impact = [
  { value: 3, suffix: "+", label: "Years in data & AI" },
  { value: 190, suffix: "K+", label: "Records analyzed" },
  { value: 100, suffix: "+", label: "Learners mentored" },
  { value: projects.length, suffix: "", label: "Complete BI case studies" },
];

export default function Home() {
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <>
      <section className="relative overflow-hidden pt-24 lg:min-h-[88svh]">
        <div className="hero-grid absolute inset-0 -z-20 opacity-50" />
        <div className="absolute -left-36 top-24 -z-10 size-96 rounded-full bg-primary/6 blur-3xl" />
        <div className="absolute -right-36 bottom-0 -z-10 size-[30rem] rounded-full bg-primary/5 blur-3xl" />

        <div className="container-shell grid items-center gap-10 py-10 lg:min-h-[calc(88svh-6rem)] lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-14">
          <Reveal className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3.5 py-2 text-xs font-semibold text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-emerald-400/20" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              Open to Data & BI opportunities
            </div>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.19em] text-muted-foreground">
              Data Analyst · BI Analyst · Power BI Developer
            </p>
            <h1 className="mt-5 max-w-3xl text-balance text-[clamp(2.75rem,5.8vw,5.25rem)] font-semibold leading-[1.06] tracking-[-0.045em]">
              Data made clear. <span className="text-gradient">Decisions made better.</span>
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">
              I&apos;m Omar Rezk. I turn raw data into clear business decisions through trusted Power BI, SQL, and Python solutions that people can actually use.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button render={<Link href="/projects" />} size="lg" className="h-13 rounded-full bg-primary px-7 text-primary-foreground shadow-lg shadow-primary/15 hover:opacity-90">
                Explore my work <ArrowRight className="size-4" />
              </Button>
              <Button render={<a href="/documents/Omar-Mahmoud-Sophy-Rezk-CV.pdf" download />} variant="outline" size="lg" className="h-13 rounded-full bg-background/60 px-7 backdrop-blur">
                Download CV <Download className="size-4" />
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              {["Cairo, Egypt", "Available remotely", "English & Arabic"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary" /> {item}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.12} className="relative mx-auto w-full max-w-[34rem] lg:ml-auto">
            <Parallax distance={22} className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl" />
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-border bg-slate-950 shadow-xl">
                <Image
                  src="/images/omar-portrait-suit-v2.webp"
                  alt="Professional portrait of Omar Rezk"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 sm:inset-x-6 sm:bottom-6">
                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-white backdrop-blur">
                    <BarChart3 className="size-5 text-white/80" />
                    <p className="mt-2 text-xs text-slate-300">Core focus</p>
                    <p className="mt-1 text-sm font-semibold">Business Intelligence</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-slate-950/70 p-3 text-white backdrop-blur">
                    <Database className="size-5 text-white/80" />
                    <p className="mt-2 text-xs text-slate-300">From raw data to</p>
                    <p className="mt-1 text-sm font-semibold">Actionable insight</p>
                  </div>
                </div>
              </div>
            </Parallax>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card/45">
        <div className="container-shell grid grid-cols-2 divide-x divide-y divide-border/70 sm:grid-cols-4 sm:divide-y-0">
          {impact.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05} className="p-5 text-center sm:px-4 sm:py-8">
              <p className="text-2xl font-semibold tracking-[-0.04em] sm:text-3xl"><AnimatedCounter value={item.value} suffix={item.suffix} /></p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">{item.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected work"
              title="Analytics built around real decisions."
              description="Complete case studies—not just screenshots. Each project shows the problem, analytical process, model, dashboard, and business findings."
            />
            <Button render={<Link href="/projects" />} variant="outline" className="w-fit rounded-full">
              View all projects <ArrowRight className="size-4" />
            </Button>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 md:[&>*:last-child]:col-span-2 xl:grid-cols-3 xl:[&>*:last-child]:col-span-1">
            {featuredProjects.map((project, index) => (
              <Reveal key={project.slug} delay={index * 0.06}>
                <ProjectCard project={project} priority={index < 3} showStats />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad border-y border-border/70 bg-card/35">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Capabilities"
              title="A practical toolkit from data source to boardroom."
              description="My work combines technical rigor, visual clarity, and a strong understanding of what the business actually needs to know."
            />
            <div className="mt-8 rounded-3xl border border-border/70 bg-background/70 p-6">
              <Sparkles className="size-6 text-primary" />
              <p className="mt-4 text-sm font-semibold">The goal is never just a dashboard.</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">It is a reliable decision system people can understand, trust, and use.</p>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items], index) => (
              <Reveal key={group} delay={index * 0.05} className="rounded-3xl border border-border/70 bg-background/75 p-6 transition hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5">
                <h3 className="font-semibold capitalize tracking-[-0.02em]">{group}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span key={item} className="rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">{item}</span>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="Experience" title="Analytics, teaching, and practical business experience." />
            <Button render={<Link href="/about" />} variant="link" className="mt-6 h-auto p-0 text-primary">
              Read my full profile <ArrowRight className="size-4" />
            </Button>
          </Reveal>
          <div className="border-l border-border/80 pl-5 sm:pl-8">
            {experiences.slice(0, 3).map((item, index) => (
              <Reveal key={`${item.company}-${item.role}`} delay={index * 0.06} className="relative border-b border-border/70 py-7 first:pt-0 last:border-b-0">
                <span className="absolute -left-[1.58rem] top-2 size-3 rounded-full border-2 border-background bg-primary shadow-[0_0_0_5px_color-mix(in_oklch,var(--primary)_14%,transparent)] sm:-left-[2.35rem]" />
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold tracking-[-0.02em]">{item.role}</h3>
                    <p className="mt-1 text-sm font-semibold text-primary">
                      {item.companyUrl ? (
                        <a href={item.companyUrl} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline focus-visible:underline">{item.company}</a>
                      ) : item.company}
                    </p>
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.period}</p>
                </div>
                {item.summary && <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{item.summary}</p>}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-shell">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-12 text-white shadow-2xl shadow-blue-950/25 sm:px-10 lg:px-14 lg:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_120%,color-mix(in_srgb,var(--primary)_22%,transparent),transparent_45%)]" />
            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-white/70">Ready to collaborate?</p>
                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Bring me the business question. I&apos;ll help make the data answer it.</h2>
              </div>
              <Button render={<Link href="/contact" />} size="lg" className="h-13 w-fit shrink-0 rounded-full bg-white px-7 text-slate-950 hover:bg-slate-100">
                Start a conversation <ArrowRight className="size-4" />
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
