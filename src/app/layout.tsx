import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { AnimatedBackground } from "@/components/animated-background";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { PageTransition } from "@/components/page-transition";
import { ThemeProvider } from "@/components/theme-provider";
import { WhatsAppButton } from "@/components/whatsapp-button";
import "./globals.css";

const configuredGaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const gaMeasurementId = /^G-[A-Z0-9]+$/i.test(configuredGaId) ? configuredGaId.toUpperCase() : null;

export const metadata: Metadata = {
  metadataBase: new URL("https://omarrez2.github.io"),
  applicationName: "Omar Rezk Portfolio",
  title: {
    default: "Omar Rezk | Data Analyst & Power BI Developer",
    template: "%s | Omar Rezk",
  },
  description:
    "Portfolio of Omar Rezk, a Data Analyst and Power BI Developer who turns complex data into clear business decisions.",
  keywords: ["Omar Rezk", "Data Analyst", "Power BI Developer", "BI Analyst", "SQL", "Python", "DAX"],
  authors: [{ name: "Omar Mahmoud Sophy Rezk" }],
  creator: "Omar Mahmoud Sophy Rezk",
  publisher: "Omar Mahmoud Sophy Rezk",
  category: "Data Analytics",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://omarrez2.github.io",
    siteName: "Omar Rezk Portfolio",
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

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Omar Mahmoud Sophy Rezk",
  alternateName: "Omar Rezk",
  url: "https://omarrez2.github.io",
  image: "https://omarrez2.github.io/images/omar-profile.webp",
  jobTitle: "Data Analyst and Power BI Developer",
  email: "mailto:orezk337@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
  sameAs: [
    "https://www.linkedin.com/in/omar-rezk-70868b211/",
    "https://github.com/OmarRez2",
    "https://www.kaggle.com/omarrezk",
    "https://www.facebook.com/profile.php?id=100007444755586",
    "https://www.instagram.com/3omar_rez2/",
  ],
  knowsAbout: ["Data Analysis", "Business Intelligence", "Power BI", "SQL", "Python", "DAX", "Data Modeling"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <AnimatedBackground />
          <Navbar />
          <main id="main-content" className="relative z-10 min-h-screen overflow-hidden">
            <PageTransition>{children}</PageTransition>
          </main>
          <div className="relative z-10"><Footer /></div>
          <WhatsAppButton />
        </ThemeProvider>
        {gaMeasurementId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', ${JSON.stringify(gaMeasurementId)});
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
