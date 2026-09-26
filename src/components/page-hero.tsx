import { Reveal } from "@/components/reveal";
export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="relative overflow-hidden border-b border-border/70 pt-28 sm:pt-32">
    <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_20%,color-mix(in_srgb,var(--primary)_8%,transparent),transparent_50%)]" />
    <div className="container-shell py-12 sm:py-16 lg:py-20">
      <Reveal><p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl text-balance text-4xl font-semibold leading-[1.1] tracking-[-0.04em] sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-pretty text-base leading-8 text-muted-foreground sm:text-lg">{description}</p>
      </Reveal>
    </div>
  </section>;
}
