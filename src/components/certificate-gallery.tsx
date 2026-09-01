"use client"

import Image from "next/image"
import { Download, ExternalLink, Maximize2 } from "lucide-react"

import { Reveal } from "@/components/reveal"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Certificate } from "@/lib/portfolio-data"

export function CertificateGallery({ certificates }: { certificates: Certificate[] }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {certificates.map((certificate, index) => {
        if (!certificate.image) return null

        return (
          <Reveal key={`${certificate.title}-${certificate.issuer}`} delay={(index % 2) * 0.06}>
            <Dialog>
              <article className="group overflow-hidden rounded-[1.75rem] border border-border/70 bg-card transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/7">
                <DialogTrigger
                  render={
                    <button
                      type="button"
                      className="relative block w-full overflow-hidden bg-slate-100 text-left outline-none focus-visible:ring-3 focus-visible:ring-primary/45 dark:bg-slate-900"
                      aria-label={`View ${certificate.title} certificate`}
                    />
                  }
                >
                  <span className="relative block aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={certificate.image}
                      alt=""
                      fill
                      aria-hidden="true"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="scale-110 object-cover opacity-15 blur-2xl transition duration-700 group-hover:scale-115 dark:opacity-20"
                    />
                    <Image
                      src={certificate.image}
                      alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-2 drop-shadow-xl transition duration-500 ease-out group-hover:scale-[1.025] sm:p-3"
                    />
                    <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-slate-950/75 via-slate-950/20 to-transparent p-4 pt-16 text-white opacity-100 transition sm:p-5">
                      <span className="text-xs font-semibold uppercase tracking-[0.15em]">View certificate</span>
                      <span className="grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition group-hover:bg-primary group-hover:text-primary-foreground">
                        <Maximize2 className="size-4" />
                      </span>
                    </span>
                  </span>
                </DialogTrigger>

                <div className="p-5 sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-primary">{certificate.date}</p>
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {certificate.type}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold tracking-[-0.025em]">{certificate.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-muted-foreground">{certificate.issuer}</p>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{certificate.detail}</p>
                </div>
              </article>

              <DialogContent className="max-h-[94svh] overflow-y-auto">
                <div className="relative flex min-h-[45svh] items-center justify-center overflow-hidden rounded-[1.15rem] bg-slate-100 p-2 dark:bg-slate-950 sm:min-h-[62svh] sm:rounded-[1.5rem] sm:p-4">
                  <Image
                    src={certificate.image}
                    alt={`${certificate.title} certificate issued by ${certificate.issuer}`}
                    fill
                    sizes="95vw"
                    priority
                    className="object-contain p-2 sm:p-4"
                  />
                </div>
                <div className="flex flex-col gap-4 px-1 pb-1 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 pr-10">
                    <DialogTitle>{certificate.title}</DialogTitle>
                    <DialogDescription className="mt-1">
                      {certificate.issuer} · {certificate.date}
                    </DialogDescription>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      render={<a href={certificate.image} target="_blank" rel="noreferrer" />}
                      className="h-10 rounded-full px-4"
                    >
                      Full image <ExternalLink className="size-4" />
                    </Button>
                    <Button
                      render={<a href={certificate.image} download />}
                      className="h-10 rounded-full px-4"
                    >
                      Download <Download className="size-4" />
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Reveal>
        )
      })}
    </div>
  )
}
