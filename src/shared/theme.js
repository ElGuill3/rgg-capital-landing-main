import { createContext, useContext } from "react";
import { hexToRgba } from "./colorUtils.js";

const ThemeCtx = createContext(null);
function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme must be used within ThemeCtx.Provider");
  return ctx;
}

/** Fuentes RGG: Inter (cuerpo), Space Grotesk (titulares), JetBrains Mono (etiquetas / datos) */
export const FONTS = {
  body: "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif",
  heading: "'Space Grotesk', 'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'Cascadia Code', monospace",
};

const LETTER_H2 = "-0.02em";

/* Paleta aprobada RGG: semántica light / dark + derivados (glass, sombra) */
const ACCENTS = {
  hub: { dark: "#D7B58F", light: "#AB7058" },
};

function getAccent(_context, mode) {
  return ACCENTS.hub[mode];
}

const THEMES = {
  dark: {
    isDark: true,
    fontBody: FONTS.body,
    fontHeading: FONTS.heading,
    fontMono: FONTS.mono,
    letterSpacingHeading: LETTER_H2,
    bg: "#1A1718",
    bgAlt: "#53484E",
    text: "#FAF6F0",
    textMuted: "#D1A881",
    heading: "#FAF6F0",
    accent: "#D7B58F",
    accentLight: "#E8D4B8",
    accentGlow: "#B8956A",
    gold: "#D7B58F",
    goldLight: "#E8D4B8",
    border: "rgba(250, 246, 240, 0.1)",
    borderLight: "rgba(250, 246, 240, 0.16)",
    navBg: "rgba(26, 23, 24, 0.78)",
    cardBg: "rgba(83, 72, 78, 0.45)",
    subtleBg: "rgba(250, 246, 240, 0.06)",
    subtleBorder: "rgba(250, 246, 240, 0.1)",
    glassBg: "rgba(38, 35, 36, 0.55)",
    glassBorder: "rgba(250, 246, 240, 0.14)",
    glassBorderHover: "rgba(250, 246, 240, 0.24)",
    glassHighlight:
      "inset 0 1px 0 rgba(250, 246, 240, 0.08), inset 0 -1px 0 rgba(0,0,0,0.2)",
    glassShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 1px rgba(250,246,240,0.06)",
    glassHoverShadow: "0 12px 40px rgba(0,0,0,0.5), 0 0 1px rgba(250,246,240,0.1)",
    shadow: "rgba(0,0,0,0.4)",
    hoverShadow: "rgba(250, 246, 240, 0.06)",
    gradFrom: "#E8D4B8",
    gradTo: "#D7B58F",
    meshGradient: "none",
    glassBlur: "blur(40px) saturate(180%)",
    cardBlur: "blur(16px) saturate(150%)",
    specular: "rgba(250, 246, 240, 0.08)",
    specularHover: "rgba(250, 246, 240, 0.12)",
    dotGridDot: "rgba(250, 246, 240, 0.1)",
  },
  light: {
    isDark: false,
    fontBody: FONTS.body,
    fontHeading: FONTS.heading,
    fontMono: FONTS.mono,
    letterSpacingHeading: LETTER_H2,
    bg: "#FAF6F0",
    bgAlt: "#E4DDDA",
    text: "#53484E",
    textMuted: "#94847D",
    heading: "#53484E",
    accent: "#AB7058",
    accentLight: "#C48A6E",
    accentGlow: "#8A5A45",
    gold: "#AB7058",
    goldLight: "#C48A6E",
    border: "rgba(83, 72, 78, 0.1)",
    borderLight: "rgba(83, 72, 78, 0.16)",
    navBg: "rgba(250, 246, 240, 0.82)",
    cardBg: "rgba(255, 255, 255, 0.5)",
    subtleBg: "rgba(83, 72, 78, 0.05)",
    subtleBorder: "rgba(83, 72, 78, 0.1)",
    glassBg: "rgba(255, 255, 255, 0.55)",
    glassBorder: "rgba(83, 72, 78, 0.14)",
    glassBorderHover: "rgba(83, 72, 78, 0.24)",
    glassHighlight:
      "inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -1px 0 rgba(83, 72, 78, 0.08)",
    glassShadow: "0 4px 16px rgba(83, 72, 78, 0.08), 0 0 1px rgba(83, 72, 78, 0.06)",
    glassHoverShadow: "0 12px 40px rgba(83, 72, 78, 0.12), 0 0 1px rgba(83, 72, 78, 0.1)",
    shadow: "rgba(83, 72, 78, 0.12)",
    hoverShadow: "rgba(83, 72, 78, 0.06)",
    gradFrom: "#C48A6E",
    gradTo: "#AB7058",
    meshGradient: "none",
    glassBlur: "blur(40px) saturate(200%)",
    cardBlur: "blur(20px) saturate(180%)",
    specular: "rgba(255, 255, 255, 0.65)",
    specularHover: "rgba(255, 255, 255, 0.85)",
    dotGridDot: "rgba(83, 72, 78, 0.14)",
  },
};

/** Fondo acristalado del nav: `bgAlt` al 80% — al cambiar `mode`, `t` toma el objeto del modo y recalcula. */
for (const key of Object.keys(THEMES)) {
  const th = THEMES[key];
  th.navGlassBg = hexToRgba(th.bgAlt, 0.8);
}

export { ThemeCtx, useTheme, THEMES, ACCENTS, getAccent };
