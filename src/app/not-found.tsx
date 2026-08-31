import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative grid min-h-[82svh] place-items-center overflow-hidden px-4 pt-24 text-center">
      <div className="hero-grid absolute inset-0 -z-10 opacity-45" />
      <div>
        <p className="text-gradient text-8xl font-semibold tracking-[-0.08em] sm:text-9xl">404</p>
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em]">This page is outside the dataset.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground">The link may have moved, but the rest of the portfolio is ready to explore.</p>
        <Button render={<Link href="/" />} className="mt-8 rounded-full"><ArrowLeft className="size-4" /> Back home</Button>
      </div>
    </section>
  );
}
