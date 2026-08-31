import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, BookOpenCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { certificates } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Professional training, certifications, and recognition earned by Omar Rezk.",
  alternates: { canonical: "/certificates" },
  openGraph: {
    title: "Certificates & Professional Training | Omar Rezk",
    description: "Professional training, certifications, and recognition earned by Omar Rezk.",
    url: "/certificates",
    images: [{ url: "/images/omar-hero.webp", width: 1775, height: 887, alt: "Omar Rezk" }],
  },
};

type Certificate = (typeof certificates)[number];

function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  return (
    <Reveal
      delay={(index % 3) * 0.05}
      className="group relative flex min-h-72 flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card p-6 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/6 sm:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-violet-500/15 text-primary">
          {certificate.type === "Recognition" ? <Award className="size-6" /> : certificate.type === "Training" ? <BookOpenCheck className="size-6" /> : <BadgeCheck className="size-6" />}
        </span>
        <div className="flex flex-wrap justify-end gap-2">
          {certificate.date.toLowerCase().includes("progress") ? (
            <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">Current</span>
          ) : null}
          <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{certificate.type}</span>
        </div>
      </div>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-primary">{certificate.date}</p>
      <h3 className="mt-3 text-xl font-semibold tracking-[-0.025em]">{certificate.title}</h3>
      <p className="mt-2 text-sm font-semibold text-muted-foreground">{certificate.issuer}</p>
      <p className="mt-5 text-sm leading-7 text-muted-foreground">{certificate.detail}</p>
    </Reveal>
  );
}

export default function CertificatesPage() {
  const technicalCredentials = certificates.filter((certificate) => certificate.type !== "Recognition");
  const recognition = certificates.filter((certificate) => certificate.type === "Recognition");

  return (
    <>
      <PageHero
        eyebrow="Certificates"
        title="Learning that strengthens the way I solve problems."
        description="Selected certifications and recognitions across data analysis, SQL, artificial intelligence, Python development, and technical mentorship."
      />
      <section className="section-pad">
        <div className="container-shell">
          <Reveal className="flex flex-col gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Technical credentials</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Training aligned with the work.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">Focused learning across analytics, SQL, AI, Python, and the foundations behind reliable data products.</p>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {technicalCredentials.map((certificate, index) => (
              <CertificateCard key={`${certificate.title}-${certificate.issuer}`} certificate={certificate} index={index} />
            ))}
          </div>

          <Reveal className="mt-16 flex items-center gap-4">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary"><Sparkles className="size-5" /></span>
            <div>
              <p className="eyebrow">Recognition & contribution</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Professional impact beyond coursework.</h2>
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {recognition.map((certificate, index) => (
              <CertificateCard key={`${certificate.title}-${certificate.issuer}`} certificate={certificate} index={index} />
            ))}
          </div>
        </div>
      </section>
      <section className="pb-20 sm:pb-28">
        <Reveal className="container-shell rounded-[2rem] border border-primary/15 bg-primary/7 p-7 sm:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="eyebrow">Proof in practice</p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">See how the learning becomes real analytical work.</h2>
            </div>
            <Button render={<Link href="/projects" />} className="w-fit shrink-0 rounded-full">View case studies <ArrowRight className="size-4" /></Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
