import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Award, BadgeCheck, BookOpenCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { certificates } from "@/lib/portfolio-data";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Professional training, certifications, and recognition earned by Omar Rezk.",
};

export default function CertificatesPage() {
  return (
    <>
      <PageHero
        eyebrow="Certificates"
        title="Learning that strengthens the way I solve problems."
        description="Selected certifications and recognitions across data analysis, SQL, artificial intelligence, Python development, and technical mentorship."
      />
      <section className="section-pad">
        <div className="container-shell grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {certificates.map((certificate, index) => (
            <Reveal key={`${certificate.title}-${certificate.issuer}`} delay={(index % 3) * 0.05} className="group flex min-h-72 flex-col rounded-[1.75rem] border border-border/70 bg-card p-6 transition hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-cyan-400/15 via-blue-500/15 to-violet-500/15 text-primary">
                  {certificate.type === "Recognition" ? <Award className="size-6" /> : certificate.type === "Training" ? <BookOpenCheck className="size-6" /> : <BadgeCheck className="size-6" />}
                </span>
                <span className="rounded-full border border-border bg-background px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{certificate.type}</span>
              </div>
              <p className="mt-7 text-xs font-semibold uppercase tracking-[0.15em] text-primary">{certificate.date}</p>
              <h2 className="mt-3 text-xl font-semibold tracking-[-0.025em]">{certificate.title}</h2>
              <p className="mt-2 text-sm font-semibold text-muted-foreground">{certificate.issuer}</p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{certificate.detail}</p>
            </Reveal>
          ))}
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
