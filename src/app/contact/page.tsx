import type { Metadata } from "next";
import { Code2, Link2, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Omar Rezk for Data Analyst, BI Analyst, Power BI, and analytics opportunities.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Omar Rezk | Data Analyst & Power BI Developer",
    description: "Contact Omar Rezk for Data Analyst, BI Analyst, Power BI, and analytics opportunities.",
    url: "/contact",
    images: [{ url: "/images/omar-hero.webp", width: 1775, height: 887, alt: "Omar Rezk" }],
  },
};

const contactItems = [
  { icon: Mail, label: "Email", value: "orezk337@gmail.com", href: "mailto:orezk337@gmail.com" },
  { icon: Phone, label: "Phone", value: "+20 100 212 7404", href: "tel:+201002127404" },
  { icon: MapPin, label: "Location", value: "Cairo, Egypt", href: null },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Have a data challenge or a role in mind? Let’s talk."
        description="I’m open to Data Analyst, BI Analyst, Power BI Developer, training, and analytics collaboration opportunities in Egypt and remotely."
      />
      <section className="section-pad">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Direct contact</p>
            <h2 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">Start with a quick hello.</h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-muted-foreground">Share the role, project, or business question. I’ll respond with the most useful next step.</p>
            <div className="mt-8 space-y-3">
              {contactItems.map((item) => {
                const content = (
                  <>
                    <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary"><item.icon className="size-5" /></span>
                    <span>
                      <span className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">{item.label}</span>
                      <span className="mt-1 block text-sm font-semibold">{item.value}</span>
                    </span>
                  </>
                );
                return item.href ? (
                  <a key={item.label} href={item.href} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4 transition hover:border-primary/35">{content}</a>
                ) : (
                  <div key={item.label} className="flex items-center gap-4 rounded-2xl border border-border/70 bg-card p-4">{content}</div>
                );
              })}
            </div>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <CopyEmailButton />
              <a href="https://www.linkedin.com/in/omar-rezk-70868b211/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:-translate-y-1 hover:border-primary/35 hover:text-primary"><Link2 className="size-5" /></a>
              <a href="https://github.com/OmarRez2" target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-full border border-border bg-card text-muted-foreground transition hover:-translate-y-1 hover:border-primary/35 hover:text-primary"><Code2 className="size-5" /></a>
              <a href="https://www.kaggle.com/omarrezk" target="_blank" rel="noreferrer" aria-label="Kaggle" className="grid size-11 place-items-center rounded-full border border-border bg-card text-sm font-black text-muted-foreground transition hover:-translate-y-1 hover:border-primary/35 hover:text-primary">K</a>
            </div>
          </Reveal>
          <Reveal delay={0.08}><ContactForm /></Reveal>
        </div>
      </section>
    </>
  );
}
