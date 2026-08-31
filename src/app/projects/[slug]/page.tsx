import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Layers3, Lightbulb, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { projects } from "@/lib/portfolio-data";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Omar Rezk`,
      description: project.description,
      url: `/projects/${project.slug}`,
      images: [{ url: project.image, alt: `${project.title} dashboard` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Omar Rezk`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailsPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  const project = projects[index];
  if (!project) notFound();
  const nextProject = projects[(index + 1) % projects.length];
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `https://omarrez2.github.io/projects/${project.slug}`,
    image: `https://omarrez2.github.io${project.image}`,
    author: {
      "@type": "Person",
      name: "Omar Rezk",
      url: "https://omarrez2.github.io",
    },
    keywords: project.tech.join(", "),
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd).replace(/</g, "\\u003c") }}
      />
      <header className="relative overflow-hidden border-b border-border/70 pt-32">
        <div className="hero-grid absolute inset-0 -z-20 opacity-45" />
        <div className="absolute right-0 top-0 -z-10 size-[32rem] rounded-full bg-primary/10 blur-3xl" />
        <div className="container-shell py-14 sm:py-20 lg:py-24">
          <Reveal>
            <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition hover:text-primary">
              <ArrowLeft className="size-4" /> All projects
            </Link>
            <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-4xl">
                <p className="eyebrow">{project.eyebrow}</p>
                <h1 className="mt-5 text-balance text-5xl font-semibold tracking-[-0.055em] sm:text-6xl lg:text-7xl">{project.title}</h1>
                <p className="mt-6 max-w-3xl text-pretty text-lg leading-8 text-muted-foreground">{project.description}</p>
              </div>
              <Button render={<a href={project.github} target="_blank" rel="noreferrer" />} size="lg" className="h-12 w-fit shrink-0 rounded-full">
                View repository <Code2 className="size-4" />
              </Button>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {project.tech.map((item) => <span key={item} className="rounded-full border border-border bg-card/75 px-3.5 py-2 text-xs font-semibold text-muted-foreground backdrop-blur">{item}</span>)}
            </div>
          </Reveal>
        </div>
      </header>

      <section className="pt-10 sm:pt-14">
        <div className="container-shell">
          <Reveal>
            <Parallax distance={18} className="overflow-hidden rounded-[1.4rem] border border-border/70 bg-card p-2 shadow-2xl shadow-primary/10 sm:rounded-[2rem] sm:p-3">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1rem] bg-muted sm:rounded-[1.4rem]">
                <Image src={project.image} alt={`${project.title} dashboard`} fill priority sizes="100vw" className="object-cover object-top transition-transform duration-700 hover:scale-[1.018]" />
              </div>
            </Parallax>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {project.stats.map((stat, statIndex) => (
              <Reveal key={stat.label} delay={statIndex * 0.04} className="rounded-2xl border border-border/70 bg-card p-5 sm:p-6">
                <p className="text-xl font-semibold tracking-[-0.04em] sm:text-2xl">{stat.value}</p>
                <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">{stat.label}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-5 flex flex-col gap-4 rounded-3xl border border-primary/18 bg-primary/7 p-6 sm:flex-row sm:items-start sm:p-7">
            <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
              <Target className="size-5" />
            </span>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Decision brief</p>
              <p className="mt-2 max-w-4xl text-base font-medium leading-8 text-foreground/85">{project.decision}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Context</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">From business question to trusted reporting.</h2>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="text-lg leading-9 text-muted-foreground">{project.overview}</p>
            <div className="mt-10 rounded-3xl border border-border/70 bg-card p-6 sm:p-8">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary"><Layers3 className="size-5" /></span>
                <h3 className="text-lg font-semibold">The challenge</h3>
              </div>
              <p className="mt-5 leading-8 text-muted-foreground">{project.challenge}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-y border-border/70 bg-card/35">
        <div className="container-shell grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Approach</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">How I built it</h2>
            <div className="mt-8 space-y-4">
              {project.approach.map((item, itemIndex) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-border/70 bg-background p-5">
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">{itemIndex + 1}</span>
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.07}>
            <p className="eyebrow">Outcomes</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">What the analysis revealed</h2>
            <div className="mt-8 space-y-4">
              {project.outcomes.map((item) => (
                <div key={item} className="flex gap-4 rounded-2xl border border-primary/15 bg-primary/6 p-5">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><Check className="size-4" /></span>
                  <p className="text-sm leading-7 text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.68fr_1.32fr] lg:gap-20">
          <Reveal>
            <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-violet-500/15 text-primary">
              <Lightbulb className="size-6" />
            </span>
            <p className="mt-6 eyebrow">Recommendations</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">How the findings can guide action.</h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground">Practical next steps derived from the analysis—not generic dashboard observations.</p>
          </Reveal>
          <div className="grid gap-4">
            {project.recommendations.map((item, itemIndex) => (
              <Reveal key={item} delay={itemIndex * 0.05} className="group flex gap-5 rounded-3xl border border-border/70 bg-card p-6 transition hover:border-primary/35 hover:shadow-xl hover:shadow-primary/5 sm:p-7">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/20 bg-primary/8 text-sm font-bold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                  {String(itemIndex + 1).padStart(2, "0")}
                </span>
                <p className="pt-1 text-sm leading-7 text-muted-foreground sm:text-base sm:leading-8">{item}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {project.gallery.length > 1 ? (
        <section className="section-pad">
          <div className="container-shell">
            <Reveal>
              <p className="eyebrow">Dashboard gallery</p>
              <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">More views from the solution.</h2>
            </Reveal>
            <div className="mt-10 grid gap-5">
              {project.gallery.slice(1).map((image, imageIndex) => (
                <Reveal key={image} delay={imageIndex * 0.05} className="overflow-hidden rounded-3xl border border-border/70 bg-card p-2 shadow-xl shadow-primary/5">
                  <div className="relative aspect-[16/9] overflow-hidden rounded-[1.1rem] bg-muted">
                    <Image src={image} alt={`${project.title} dashboard view ${imageIndex + 2}`} fill sizes="100vw" className="object-cover object-top" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="pb-20 pt-16 sm:pb-28">
        <div className="container-shell grid gap-5 lg:grid-cols-[1fr_auto] lg:items-stretch">
          <Reveal className="rounded-[2rem] border border-border/70 bg-card p-7 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Next case study</p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{nextProject.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{nextProject.description}</p>
            <Button render={<Link href={`/projects/${nextProject.slug}`} />} variant="link" className="mt-5 h-auto p-0 text-primary">Explore project <ArrowRight className="size-4" /></Button>
          </Reveal>
          <Reveal delay={0.05} className="flex rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10 lg:w-80 lg:flex-col lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Source files</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.03em]">Explore the full repository.</h2>
            </div>
            <a href={project.github} target="_blank" rel="noreferrer" className="ml-auto grid size-12 shrink-0 place-items-center self-end rounded-full bg-white text-slate-950 transition hover:rotate-6 lg:ml-0 lg:mt-8 lg:self-start" aria-label={`Open ${project.title} repository`}><ArrowUpRight className="size-5" /></a>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
