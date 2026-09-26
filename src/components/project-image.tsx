"use client";
import Image from "next/image";
import { useRef } from "react";
import { Maximize2, X } from "lucide-react";
export function ProjectImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const outside = useRef(false);
  const isOutside = (event: React.PointerEvent<HTMLDialogElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
  };
  return <>
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted/40">
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 1280px) 100vw, 1216px" className="object-contain" />
      <button type="button" onClick={() => dialog.current?.showModal()} aria-label={`Expand ${alt}`} className="absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-border bg-background/95 px-3 py-2 text-xs font-semibold shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"><Maximize2 className="size-4" />Expand</button>
    </div>
    <dialog ref={dialog} aria-label={alt} onPointerDown={e => { outside.current = isOutside(e); }} onPointerUp={e => { if (outside.current && isOutside(e)) dialog.current?.close(); outside.current = false; }} className="fixed inset-0 m-auto h-[85dvh] max-h-[85dvh] w-[calc(100%-1rem)] max-w-[1600px] overflow-hidden rounded-2xl border border-border bg-background p-3 text-foreground shadow-2xl backdrop:bg-black/75 sm:w-[calc(100%-3rem)]">
      <div className="flex h-10 items-center justify-between gap-4"><p className="truncate text-xs text-muted-foreground">{alt}</p><button type="button" onClick={() => dialog.current?.close()} aria-label="Close image" className="grid size-9 shrink-0 place-items-center rounded-full hover:bg-muted"><X className="size-5" /></button></div>
      <div className="relative h-[calc(100%-2.5rem)]"><Image src={src} alt={alt} fill sizes="100vw" className="object-contain" /></div>
    </dialog>
  </>;
}
