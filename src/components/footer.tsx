import Link from "next/link";
import { Camera, Code2, Link2, Mail } from "lucide-react";

const socialLinks = [
  { href: "https://www.linkedin.com/in/omar-rezk-70868b211/", label: "LinkedIn", icon: Link2, monogram: null },
  { href: "https://github.com/OmarRez2", label: "GitHub", icon: Code2, monogram: null },
  { href: "https://www.kaggle.com/omarrezk", label: "Kaggle", icon: null, monogram: "K" },
  { href: "https://www.facebook.com/profile.php?id=100007444755586", label: "Facebook", icon: null, monogram: "f" },
  { href: "https://www.instagram.com/3omar_rez2/", label: "Instagram", icon: Camera, monogram: null },
];

export function Footer() {
  return (
    <footer className="border-t border-border/70 bg-card/40">
      <div className="container-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="eyebrow">Available for opportunities</p>
            <h2 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Let&apos;s turn your data into decisions that move the business.
            </h2>
            <a
              href="mailto:orezk337@gmail.com"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:opacity-75"
            >
              <Mail className="size-4" />
              orezk337@gmail.com
            </a>
          </div>
          <div className="lg:text-right">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
              {socialLinks.map(({ href, label, icon: Icon, monogram }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border bg-background/70 px-3 py-2 text-sm text-muted-foreground transition hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground"
                >
                  {Icon ? <Icon className="size-4" /> : <span className="font-black">{monogram}</span>}
                  {label}
                </a>
              ))}
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Cairo, Egypt · Built with clarity and intent.</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Omar Mahmoud Sophy Rezk.</p>
          <div className="flex gap-5">
            <Link href="/projects" className="hover:text-foreground">Work</Link>
            <Link href="/about" className="hover:text-foreground">Profile</Link>
            <Link href="/contact" className="hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
