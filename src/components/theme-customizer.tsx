"use client";
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Palette as PaletteIcon, RotateCcw, X, Check } from "lucide-react";
import { appearanceKey, presets, parseAppearance, resolvePalette, ink, mix, readable, type Appearance, type Palette } from "@/lib/appearance";
const eventName = "omar-appearance-change";
let fallback = "";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback); window.addEventListener(eventName, callback);
  return () => { window.removeEventListener("storage", callback); window.removeEventListener(eventName, callback); };
}
function snapshot() { try { return localStorage.getItem(appearanceKey) || fallback; } catch { return fallback; } }
function save(settings: Appearance) {
  fallback = JSON.stringify(settings);
  try { localStorage.setItem(appearanceKey, fallback); } catch { /* Keep preferences for this visit if storage is unavailable. */ }
  window.dispatchEvent(new Event(eventName));
}
export function ThemeCustomizer() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  const settings = parseAppearance(raw);
  const { resolvedTheme, setTheme } = useTheme();
  const mode = resolvedTheme === "light" ? "light" : "dark";
  const { accent, background, text, border } = resolvePalette(settings, mode);
  const dialog = useRef<HTMLDialogElement>(null);
  const startedOutside = useRef(false);
  useLayoutEffect(() => {
    const surface = mix(background, text, .035);
    const values = {
      "--background": background, "--foreground": text,
      "--card": surface, "--card-foreground": text, "--popover": surface, "--popover-foreground": text,
      "--primary": accent, "--primary-foreground": ink(accent),
      "--secondary": mix(background, text, .07), "--secondary-foreground": text,
      "--muted": mix(background, text, .055), "--muted-foreground": readable(mix(text, background, .28), surface),
      "--accent": mix(background, accent, .12), "--accent-foreground": text,
      "--border": border, "--input": border, "--ring": accent,
    };
    Object.entries(values).forEach(([name, value]) => document.documentElement.style.setProperty(name, value));
    return () => Object.keys(values).forEach(name => document.documentElement.style.removeProperty(name));
  }, [accent, background, text, border]);
  function update(name: keyof Palette, value: string) { save({ ...settings, overrides: { ...settings.overrides, [mode]: { ...settings.overrides?.[mode], [name]: value } } }); }
  function outside(e: React.PointerEvent<HTMLDialogElement>) {
    const b = e.currentTarget.getBoundingClientRect();
    return e.clientX < b.left || e.clientX > b.right || e.clientY < b.top || e.clientY > b.bottom;
  }
  return <>
    <button type="button" onClick={() => dialog.current?.showModal()} aria-label="Customize appearance" aria-haspopup="dialog" className="grid size-10 place-items-center rounded-full border border-border/70 bg-card/70 transition-colors hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-primary"><PaletteIcon className="size-[18px]" /></button>
    <dialog ref={dialog} aria-labelledby="appearance-title" onPointerDown={e => { startedOutside.current = outside(e); }} onPointerUp={e => { if (startedOutside.current && outside(e)) dialog.current?.close(); startedOutside.current = false; }} className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-sm overflow-y-auto overscroll-contain rounded-3xl border border-border bg-background p-5 text-foreground shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-sm sm:ml-auto sm:mr-6 sm:mt-24">
      <div className="flex items-start justify-between gap-4"><div><h2 id="appearance-title" className="text-lg font-semibold">Make it yours</h2><p className="mt-1 text-xs text-muted-foreground">Saved only in this browser.</p></div><button type="button" onClick={() => dialog.current?.close()} aria-label="Close customization" className="rounded-full p-2 hover:bg-muted"><X className="size-4" /></button></div>
      <div className="mt-5 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">{(["light", "dark"] as const).map(m => <button type="button" key={m} aria-pressed={mode === m} onClick={() => setTheme(m)} className={`rounded-lg py-2 text-sm capitalize transition-colors ${mode === m ? "bg-background shadow-sm" : "text-muted-foreground"}`}>{m}</button>)}</div>
      <p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Color palette</p>
      <div className="grid grid-cols-2 gap-2">{presets.map(p => <button type="button" key={p.id} aria-pressed={settings.preset === p.id} onClick={() => save({ preset: p.id })} className={`flex items-center gap-2 rounded-xl border p-3 text-left text-sm transition-colors ${settings.preset === p.id ? "border-primary bg-primary/8" : "border-border hover:border-primary/50"}`}><span className="flex shrink-0 -space-x-2"><span className="size-5 rounded-full border border-border" style={{ background: p[mode].background }} /><span className="size-5 rounded-full border border-border" style={{ background: p[mode].accent }} /></span>{p.name}</button>)}</div>
      <p className="mb-3 mt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">Accent</p>
      <div className="flex flex-wrap gap-3">{["#a78bfa", "#38bdf8", "#f472b6", "#9ad85a", "#ff9475"].map(color => <button type="button" key={color} aria-label={`Use ${color} accent`} aria-pressed={accent === readable(color, background)} onClick={() => update("accent", color)} className="grid size-9 place-items-center rounded-full border border-border outline-offset-4 focus-visible:outline-2 focus-visible:outline-primary" style={{ background: color, color: ink(color) }}>{accent === readable(color, background) && <Check className="size-4" />}</button>)}</div>
      <details className="mt-5 rounded-xl border border-border p-3"><summary className="cursor-pointer text-sm font-medium">Fine-tune colors</summary><div className="mt-4 grid grid-cols-2 gap-4">{([{ name: "accent", label: "Accent", value: accent }, { name: "background", label: "Background", value: background }, { name: "text", label: "Text", value: text }, { name: "border", label: "Border", value: border }] as const).map(field => <label key={field.name} className="text-xs text-muted-foreground">{field.label}<input type="color" value={field.value} onChange={e => update(field.name, e.target.value)} className="mt-2 block h-10 w-full cursor-pointer rounded-lg border border-border bg-card p-1" /></label>)}</div><p className="mt-3 text-xs leading-5 text-muted-foreground">Text colors adjust for readability. Light and dark settings are saved separately.</p></details>
      <button type="button" onClick={() => save({ preset: "original" })} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-3 text-sm transition-colors hover:bg-muted"><RotateCcw className="size-4" />Reset palette</button>
    </dialog>
  </>;
}
