"use client";

import Script from "next/script";
import Link from "next/link";
import { useSyncExternalStore } from "react";

const key = "omar-analytics-consent-v1";
const event = "analytics-consent-change";
let visitChoice: string | null = null;
function snapshot() {
  try { return localStorage.getItem(key) || visitChoice; } catch { return visitChoice; }
}
function subscribe(callback: () => void) {
  window.addEventListener(event, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(event, callback);
    window.removeEventListener("storage", callback);
  };
}
function choose(value: "allowed" | "denied") {
  const wasAllowed = snapshot() === "allowed";
  visitChoice = value;
  try { localStorage.setItem(key, value); } catch { /* Use this visit only. */ }
  window.dispatchEvent(new Event(event));
  if (value === "denied") {
    // Remove first-party GA cookies on this hostname and restart without the tag.
    for (const cookie of document.cookie.split(";")) {
      const name = cookie.split("=")[0].trim();
      if (/^_ga(?:_|$)/.test(name)) {
        document.cookie = `${name}=; Max-Age=0; path=/`;
        document.cookie = `${name}=; Max-Age=0; path=/; domain=${location.hostname}`;
      }
    }
    if (wasAllowed) location.reload();
  }
}

export function AnalyticsPreferences() {
  const choice = useSyncExternalStore(subscribe, snapshot, () => null);
  return <div className="mt-5 space-y-3">
    <p role="status">Analytics: {choice === "allowed" ? "allowed" : "off"}.</p>
    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={() => choose("allowed")} className="rounded-xl border border-border px-4 py-3">Allow analytics</button>
      <button type="button" onClick={() => choose("denied")} className="rounded-xl border border-border px-4 py-3">Turn analytics off</button>
    </div>
  </div>;
}

export function AnalyticsConsent({ measurementId }: { measurementId: string }) {
  const choice = useSyncExternalStore(subscribe, snapshot, () => null);
  if (choice === "allowed") return <>
    <Script id="analytics-setup" strategy="afterInteractive">{`
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', ${JSON.stringify(measurementId)});
    `}</Script>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`} strategy="afterInteractive" />
  </>;
  if (choice === "denied") return null;
  return <aside aria-label="Analytics choice" className="relative z-20 border-t border-border bg-card px-6 py-5">
    <div className="container-shell flex flex-wrap items-center gap-4 pb-14 sm:pb-0">
      <p className="max-w-xl text-sm leading-6">Optional Google Analytics helps understand visits and popular projects. It stays off unless you allow it. <Link href="/privacy" className="underline">Privacy & choices</Link></p>
      <button type="button" onClick={() => choose("allowed")} className="rounded-xl border border-border px-4 py-3 text-sm">Allow analytics</button>
      <button type="button" onClick={() => choose("denied")} className="rounded-xl border border-border px-4 py-3 text-sm">Decline</button>
    </div>
  </aside>;
}
