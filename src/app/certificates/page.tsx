import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Sparkles } from "lucide-react";
import { CertificateGallery } from "@/components/certificate-gallery";
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

export default function CertificatesPage() {
  const currentTrack = certificates.find((certificate) => certificate.date.toLowerCase().includes("progress"));
  const completedCredentials = certificates.filter((certificate) => certificate.image);
  const partnerCount = new Set(completedCredentials.map((certificate) => certificate.issuer.split(" - ")[0])).size;
  const technicalCredentials = certificates.filter((certificate) => certificate.type !== "Recognition" && certificate.image);
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
          <Reveal className="mb-8 grid overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/70 sm:grid-cols-3">
            {[
              { value: completedCredentials.length, label: "Completed credentials" },
              { value: partnerCount, label: "Training partners" },
              { value: currentTrack ? 1 : 0, label: "Active professional track" },
            ].map((item, index) => (
              <div key={item.label} className={`p-5 sm:p-6 ${index ? "border-t border-border/70 sm:border-l sm:border-t-0" : ""}`}>
                <p className="text-3xl font-semibold tracking-[-0.05em] text-foreground">{item.value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.13em] text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </Reveal>

          {currentTrack ? (
            <Reveal className="relative mb-16 overflow-hidden rounded-[2rem] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-card to-primary/7 p-6 sm:p-8">
              <div className="absolute -right-10 -top-16 size-48 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-500/12 text-emerald-500">
                    <BarChart3 className="size-6" />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="eyebrow text-emerald-500">Current learning journey</p>
                      <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-500">In progress</span>
                    </div>
                    <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">{currentTrack.title}</h2>
                    <p className="mt-2 text-sm font-semibold text-muted-foreground">{currentTrack.issuer} · {currentTrack.date}</p>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{currentTrack.detail}</p>
                  </div>
                </div>
                <div className="w-fit shrink-0 rounded-2xl border border-border/70 bg-background/65 px-6 py-4 text-left sm:text-right">
                  <p className="text-3xl font-semibold tracking-[-0.05em] text-foreground">214h</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground">Professional program</p>
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal className="flex flex-col gap-5 border-b border-border/70 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow">Technical credentials</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">Training aligned with the work.</h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-muted-foreground">Focused learning across analytics, SQL, AI, Python, and the foundations behind reliable data products.</p>
          </Reveal>
          <div className="mt-8">
            <CertificateGallery certificates={technicalCredentials} />
          </div>

          <Reveal className="mt-16 flex items-center gap-4">
            <span className="grid size-11 place-items-center rounded-2xl bg-primary/10 text-primary"><Sparkles className="size-5" /></span>
            <div>
              <p className="eyebrow">Recognition & contribution</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em] sm:text-3xl">Professional impact beyond coursework.</h2>
            </div>
          </Reveal>
          <div className="mt-8">
            <CertificateGallery certificates={recognition} />
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
