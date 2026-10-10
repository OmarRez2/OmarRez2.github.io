import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { AnalyticsPreferences } from "@/components/analytics-consent";

export const metadata: Metadata = {
  title: "Privacy & analytics choices",
  description: "How this portfolio handles analytics, browser preferences and contact drafts.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return <>
    <PageHero eyebrow="Privacy" title="Your browsing choices." description="Analytics is optional. Contact drafts stay in your browser until you choose to copy them or open your email app." />
    <section className="container-shell section-pad max-w-3xl space-y-8 leading-7">
      <div><h2 className="text-2xl font-semibold">Optional analytics</h2>
        <p className="mt-3 text-muted-foreground">Google Analytics loads only after you allow it. It can use cookies to measure visits, page views and interactions. Google processes analytics data under its own policies. You can turn it off here; this stops future collection in this browser and removes first-party Google Analytics cookies for this site. It does not erase data already collected.</p>
        <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">Google privacy policy</a>
        <AnalyticsPreferences />
      </div>
      <div><h2 className="text-2xl font-semibold">Browser preferences</h2><p className="mt-3 text-muted-foreground">Theme, appearance and analytics choices are saved in local browser storage. Clearing site data resets them. If storage is unavailable, a choice may last only for the current visit.</p></div>
      <div><h2 className="text-2xl font-semibold">Contact and external links</h2><p className="mt-3 text-muted-foreground">The contact form has no submission backend. It prepares a draft for your email application or clipboard. LinkedIn, GitHub, Kaggle, WhatsApp and other external services have their own privacy policies. This static website is hosted on GitHub Pages; hosting requests are processed by GitHub.</p></div>
      <div><h2 className="text-2xl font-semibold">Questions</h2><a className="underline" href="mailto:orezk337@gmail.com">Contact Omar at orezk337@gmail.com</a></div>
    </section>
  </>;
}
