import { useState, useEffect, useLayoutEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ThemeCtx, THEMES, useTheme } from "./shared/theme";
import { LangCtx, translations } from "./shared/i18n";
import { useSEO } from "./shared/useSEO";
import Layout from "./shared/Layout";
import HubLanding from "./pages/HubLanding";

function SEOManager({ lang }) {
  useSEO(lang);
  return null;
}

function getInitialLang() {
  if (typeof navigator !== "undefined") {
    const langs = navigator.languages || [navigator.language || ""];
    if (langs.some((l) => l.toLowerCase().startsWith("es"))) return "es";
  }
  return "en";
}

function getInitialMode() {
  if (typeof window !== "undefined" && window.matchMedia) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  return "dark";
}

function NotFound() {
  const { t } = useTheme();
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: t.fontBody,
        color: t.text,
        background: t.bg,
        padding: 24,
      }}
    >
      <h1
        style={{
          fontSize: 48,
          margin: "0 0 8px",
          opacity: 0.2,
          fontFamily: t.fontHeading,
          letterSpacing: t.letterSpacingHeading,
        }}
      >
        404
      </h1>
      <p style={{ marginBottom: 24, color: t.textMuted }}>Page not found</p>
      <Link to="/" style={{ color: t.accent, fontWeight: 600 }}>
        Back to home
      </Link>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState(getInitialMode);
  const [lang, setLang] = useState(getInitialLang);
  const t = THEMES[mode];
  const toggle = () => setMode((m) => (m === "dark" ? "light" : "dark"));
  const toggleLang = () => setLang((l) => (l === "es" ? "en" : "es"));

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = (e) => setMode(e.matches ? "dark" : "light");
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.style.setProperty("--rgg-page-bg", t.bg);
    let meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "theme-color");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", t.bg);
  }, [t.bg]);

  return (
    <ThemeCtx.Provider value={{ mode, t, toggle }}>
      <LangCtx.Provider value={{ lang, toggleLang, i18n: translations[lang] }}>
        <SEOManager lang={lang} />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HubLanding />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LangCtx.Provider>
    </ThemeCtx.Provider>
  );
}
