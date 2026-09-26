export const appearanceKey = "omar-portfolio-appearance-v1";
export type ColorMode = "light" | "dark";
export type Palette = { accent: string; background: string; text: string; border: string };
export type Appearance = { preset: string; overrides?: Partial<Record<ColorMode, Partial<Palette>>> };
export const presets = [
  { id: "original", name: "Signature", dark: { accent: "#38bdf8", background: "#080f1b" }, light: { accent: "#2563eb", background: "#f8fafc" } },
  { id: "minimal", name: "Minimal", dark: { accent: "#74c7a7", background: "#101b17" }, light: { accent: "#16745b", background: "#f7faf8" } },
  { id: "midnight", name: "Midnight", dark: { accent: "#a78bfa", background: "#100e1c" }, light: { accent: "#7354bf", background: "#faf8fe" } },
  { id: "ocean", name: "Ocean", dark: { accent: "#45d4cd", background: "#091c24" }, light: { accent: "#087e83", background: "#f3fafb" } },
  { id: "forest", name: "Forest", dark: { accent: "#9ad85a", background: "#0d1912" }, light: { accent: "#427b25", background: "#f7faf3" } },
  { id: "sunset", name: "Sunset", dark: { accent: "#ff9475", background: "#20131a" }, light: { accent: "#ba4b30", background: "#fff8f5" } },
] as const;
export function parseAppearance(raw: string): Appearance {
  try {
    const value = JSON.parse(raw);
    if (!presets.some(p => p.id === value?.preset)) return { preset: "original" };
    const overrides: Appearance["overrides"] = {};
    for (const mode of ["light", "dark"] as const) {
      const source = value.overrides?.[mode] || (mode === "dark" ? value : {});
      const colors: Partial<Palette> = {};
      for (const field of ["accent", "background", "text", "border"] as const) {
        if (typeof source[field] === "string" && /^#[0-9a-f]{6}$/i.test(source[field])) colors[field] = source[field];
      }
      overrides[mode] = colors;
    }
    return { preset: value.preset, overrides };
  } catch { return { preset: "original" }; }
}
function rgb(hex: string) { return [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16)); }
function luminance(hex: string) {
  const values = rgb(hex).map(v => v / 255).map(v => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
  return values[0] * .2126 + values[1] * .7152 + values[2] * .0722;
}
export function contrast(a: string, b: string) { const x = luminance(a), y = luminance(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
export function ink(bg: string) {
  if (contrast("#0b1220", bg) >= 4.5) return "#0b1220";
  return contrast("#ffffff", bg) >= 4.5 ? "#ffffff" : "#000000";
}
export function mix(a: string, b: string, ratio: number) {
  const other = rgb(b);
  return "#" + rgb(a).map((v, i) => Math.round(v + (other[i] - v) * ratio).toString(16).padStart(2, "0")).join("");
}
export function readable(color: string, background: string) {
  if (contrast(color, background) >= 4.5) return color;
  for (let i = 1; i <= 20; i++) { const adjusted = mix(color, ink(background), i / 20); if (contrast(adjusted, background) >= 4.5) return adjusted; }
  return ink(background);
}
export function resolvePalette(settings: Appearance, mode: ColorMode): Palette {
  const preset = presets.find(p => p.id === settings.preset) || presets[0];
  const custom = settings.overrides?.[mode] || {};
  const background = custom.background || preset[mode].background;
  const text = readable(custom.text || ink(background), background);
  return { background, text, accent: readable(custom.accent || preset[mode].accent, background), border: custom.border || mix(background, text, .17) };
}
