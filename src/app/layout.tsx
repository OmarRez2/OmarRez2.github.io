import type { Metadata, Viewport } from "next";
import { AnimatedBackground } from "@/components/animated-background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://omarrez2.github.io"),
  title: {
    default: "Omar Rezk | Data Analyst & Power BI Developer",
    template: "%s | Omar Rezk",
  },
  description:
    "Portfolio of Omar Rezk, a Data Analyst and Power BI Developer who turns complex data into clear business decisions.",
  keywords: ["Omar Rezk", "Data Analyst", "Power BI Developer", "BI Analyst", "SQL", "Python", "DAX"],
  authors: [{ name: "Omar Mahmoud Sophy Rezk" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Omar Rezk | Data Analyst & Power BI Developer",
    description: "Power BI dashboards, analytics case studies, SQL, and Python projects.",
    images: [{ url: "/images/omar-hero.webp", width: 1775, height: 887, alt: "Omar Rezk" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Omar Rezk | Data Analyst & Power BI Developer",
    description: "Power BI dashboards, analytics case studies, SQL, and Python projects.",
    images: ["/images/omar-hero.webp"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f9fc" },
    { media: "(prefers-color-scheme: dark)", color: "#070b14" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <AnimatedBackground />
          <Navbar />
          <main id="main-content" className="relative z-10 min-h-screen overflow-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
          <div className="relative z-10"><Footer /></div>
        </ThemeProvider>
      </body>
    </html>
  );
}
