"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/contact", label: "Contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.25 });

  useMotionValueEvent(scrollY, "change", (latest) => setCompact(latest > 36));

  return (
    <motion.header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300",
        compact ? "border-border/70 bg-background/90 shadow-lg shadow-slate-950/5" : "border-border/45 bg-background/70",
      )}
    >
      <motion.div className="absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500" style={{ scaleX: smoothProgress }} />
      <div className={cn("container-shell flex items-center justify-between transition-[height] duration-300", compact ? "h-16" : "h-18")}>
        <Link href="/" className="group flex items-center gap-3" aria-label="Omar Rezk home">
          <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 font-bold text-white shadow-lg shadow-blue-500/20 transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
            OR
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold tracking-wide">Omar Rezk</span>
            <span className="block text-[11px] text-muted-foreground">Data & BI</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isActive(pathname, link.href) && "text-foreground",
              )}
            >
              {link.label}
              {isActive(pathname, link.href) ? (
                <motion.span layoutId="active-nav" className={cn("absolute inset-x-4 h-0.5 rounded-full bg-gradient-to-r from-cyan-400 to-violet-500", compact ? "-bottom-[11px]" : "-bottom-[13px]")} />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            render={<Link href="/contact" />}
            className="hidden h-10 rounded-full bg-foreground px-5 text-background hover:bg-foreground/85 sm:inline-flex"
          >
            Let&apos;s talk
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-10 rounded-full border border-border/70 bg-card/70 lg:hidden"
                  aria-label="Open navigation"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent className="w-[88%] border-border/70 bg-background/96 p-0 backdrop-blur-2xl">
              <SheetHeader className="border-b border-border/70 p-6">
                <SheetTitle className="text-left text-xl">Omar Rezk</SheetTitle>
                <SheetDescription className="text-left">Data Analyst & Power BI Developer</SheetDescription>
              </SheetHeader>
              <nav className="flex flex-col p-4" aria-label="Mobile navigation">
                {links.map((link) => (
                  <SheetClose key={link.href} render={<Link href={link.href} />}>
                    <span
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-4 text-base font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground",
                        isActive(pathname, link.href) && "bg-muted text-foreground",
                      )}
                    >
                      {link.label}
                      <span aria-hidden>↗</span>
                    </span>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
