import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, BrainCircuit, GraduationCap, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Parallax } from "@/components/parallax";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { experiences, skills } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "About",
  description: "Experience, skills, education, and professional profile of data analyst Omar Rezk.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Omar Rezk | Data Analyst & Power BI Developer",
    description: "Experience, skills, education, and professional profile of data analyst Omar Rezk.",
    url: "/about",
    images: [{ url: "/images/omar-hero.webp", width: 1775, height: 887, alt: "Omar Rezk" }],
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About me"
        title="Analytical thinking, translated into useful experiences."
        description="I connect technical analysis with clear communication—building solutions people can trust, understand, and act on."
      />

      <section className="section-pad">
        <div className="container-shell grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal className="relative">
            <Parallax distance={18} className="relative">
              <div className="absolute -inset-4 -z-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/12 to-violet-500/14 blur-2xl" />
              <div className="motion-shine relative aspect-square overflow-hidden rounded-[2rem] border border-border/60 bg-slate-950">
                <Image src="/images/omar-profile.webp" alt="Professional portrait of Omar Rezk" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover object-center transition-transform duration-700 hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-slate-950/65 p-5 text-white backdrop-blur-xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-cyan-300">Working philosophy</p>
                  <p className="mt-2 text-lg font-semibold">Clarity is a feature, not decoration.</p>
                </div>
              </div>
            </Parallax>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="eyebrow">Profile</p>
            <h2 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-5xl">I turn complex data into focused business conversations.</h2>
            <div className="mt-7 space-y-5 text-base leading-8 text-muted-foreground">
              <p>I&apos;m Omar Mahmoud Sophy Rezk, a Cairo-based Data Analyst, BI Analyst, and Power BI Developer with over two years of experience across analytics, education, and AI model evaluation.</p>
              <p>My work spans the full analysis lifecycle: understanding the business question, validating the data, modeling it with SQL and Power BI, building reliable DAX, and shaping the final story for decision-makers.</p>
              <p>I also enjoy teaching. Helping more than 100 learners has sharpened the way I explain technical ideas and design reports that feel intuitive from the first interaction.</p>
            </div>
            <Button render={<Link href="/contact" />} className="mt-8 rounded-full">
              Work with me <ArrowRight className="size-4" />
            </Button>
          </Reveal>
        </div>
      </section>

      <section className="section-pad border-y border-border/70 bg-card/35">
        <div className="container-shell">
          <SectionHeading eyebrow="Technical stack" title="Built for reliable, repeatable analysis." description="A balanced toolkit covering data preparation, modeling, visualization, and applied machine learning." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {Object.entries(skills).map(([group, items], index) => (
              <Reveal key={group} delay={index * 0.05} className="rounded-3xl border border-border/70 bg-background p-6 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary"><BrainCircuit className="size-5" /></span>
                  <h3 className="font-semibold capitalize">{group}</h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {items.map((item) => <span key={item} className="rounded-full border border-border bg-muted/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">{item}</span>)}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <SectionHeading eyebrow="Experience" title="A career shaped by analysis and communication." />
          <div className="relative border-l border-border/80 pl-6 sm:pl-9">
            {experiences.map((item, index) => (
              <Reveal key={`${item.company}-${item.role}`} delay={index * 0.05} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[1.78rem] top-1 size-3.5 rounded-full border-[3px] border-background bg-primary sm:-left-[2.57rem]" />
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.025em]">{item.role}</h3>
                    <p className="mt-1 font-semibold text-primary">{item.company}</p>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm font-semibold">{item.period}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.location}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">{item.summary}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20 sm:pb-28">
        <div className="container-shell grid gap-4 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "B.Sc. Computers & AI", body: "Benha University · 2019–2023 · Graduation project: A+" },
            { icon: Languages, title: "Arabic & English", body: "Arabic native · English professional working proficiency" },
            { icon: BookOpen, title: "Continuous learning", body: "DEPI Professional Data Analyst Track · 214 hours · In progress" },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05} className="rounded-3xl border border-border/70 bg-card p-6">
              <item.icon className="size-6 text-primary" />
              <h3 className="mt-5 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
