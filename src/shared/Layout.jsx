import { useMemo, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "./theme";
import { useLang } from "./i18n";
import { ThemeToggle } from "./components";
import { useScrollSpy, DEFAULT_NAV_SPY_OFFSET } from "./hooks/useScrollSpy";
import { CHILD_TO_PILLAR, PILLAR_IDS, ALL_HUB_SPY_IDS } from "./hubAnchorMap";
import { NavDropdown } from "./NavDropdown";
import { NavOverlay } from "./NavOverlay";
import "./layout.css";

import logoSrc from "../assets/logo.png";

/**
 * Contrato de anclas (Hub `/`):
 *  - Pilares: #system, #crypto, #sports, #ai-labs, #foundation
 *  - Hijos: #system-overview … #foundation-philosophy (ver hubAnchorMap.js)
 *  - Todos tienen scroll-margin-top: 122px (layout.css)
 *  - NavDropdown (desktop ≥768px): dropdown con hover
 *  - NavOverlay (mobile <768px): full-screen overlay con hamburger→X
 */

const MOBILE_BP = 767;

export default function Layout() {
  const { t } = useTheme();
  const { lang, toggleLang, i18n } = useLang();
  const { pathname } = useLocation();
  const nav = i18n.hub.nav;
  const navTree = i18n.hub.navTree;
  const navSub = i18n.hub.navSub;

  // Breakpoint detection: matchMedia + resize → isMobile
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= MOBILE_BP;
  });

  // Mobile menu open/close state
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Close menu when switching to desktop
  useEffect(() => {
    if (!isMobile) setIsMenuOpen(false);
  }, [isMobile]);

  // All hub section ids (pillar + children), stable reference
  const sectionIds = useMemo(() => ALL_HUB_SPY_IDS, []);
  const spyEnabled = pathname === "/";

  const { activePillarId, activeChildId } = useScrollSpy(sectionIds, {
    enabled: spyEnabled,
    rootTopPx: DEFAULT_NAV_SPY_OFFSET,
    childToPillar: CHILD_TO_PILLAR,
    pillarIds: PILLAR_IDS,
  });

  const barVars = {
    "--rgg-link-accent": t.accent,
    "--rgg-link-muted": t.textMuted,
  };

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, margin: 0, padding: 0, border: "none", background: "transparent", pointerEvents: "none" }}>
        <div
          className="navRgg__inner"
          style={{
            ...barVars,
            pointerEvents: "auto",
            width: "95%",
            maxWidth: 1200,
            margin: "clamp(6px, 1.5vw, 10px) auto",
            borderRadius: "clamp(8px, 2.5vw, 16px)",
            background: t.navGlassBg,
            border: `1px solid ${t.border}`,
            backdropFilter: "blur(12px) saturate(150%)",
            WebkitBackdropFilter: "blur(12px) saturate(150%)",
            boxShadow: t.isDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 8px 28px rgba(83, 72, 78, 0.12)",
            display: "flex",
            alignItems: "center",
            gap: "clamp(6px, 2vw, 12px)",
            minHeight: "clamp(44px, 10vw, 68px)",
            paddingTop: "clamp(6px, 1.5vw, 10px)",
            paddingBottom: "clamp(6px, 1.5vw, 10px)",
            paddingLeft: "calc(max(10px, min(4vw, 22px)) + env(safe-area-inset-left, 0px))",
            paddingRight: "calc(max(10px, min(4vw, 22px)) + env(safe-area-inset-right, 0px))",
            flexWrap: "wrap",
            boxSizing: "border-box",
            justifyContent: "space-between",
            height: "auto",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            {logoSrc ? (
              <img src={logoSrc} alt="RGG Capital" style={{ height: "clamp(28px, 8vw, 48px)", width: "auto", maxWidth: 160, objectFit: "contain", display: "block" }} />
            ) : (
              <strong style={{ color: t.heading, letterSpacing: t.letterSpacingHeading, fontSize: "clamp(14px, 4vw, 18px)", fontFamily: t.fontHeading }}>RGG</strong>
            )}
          </Link>

          <nav aria-label="Primary" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "clamp(6px, 2vw, 12px) clamp(12px, 3vw, 24px)", flex: "1 1 auto", justifyContent: "center", minWidth: 0 }}>
            <div className="nav-dropdown">
              {navTree.map((pillar) => (
                <NavDropdown
                  key={pillar.pillarId}
                  pillar={pillar}
                  label={nav[pillar.labelKey]}
                  subLabels={navSub}
                  isActivePillar={spyEnabled && activePillarId === pillar.pillarId}
                  activeChildId={spyEnabled ? activeChildId : null}
                />
              ))}
            </div>
          </nav>

          {/* Full-screen mobile overlay */}
          {isMobile && (
            <NavOverlay
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              navTree={navTree}
              nav={nav}
              subLabels={navSub}
              activePillarId={spyEnabled ? activePillarId : null}
              activeChildId={spyEnabled ? activeChildId : null}
            />
          )}

          <span aria-hidden style={{ width: 1, height: 20, backgroundColor: t.border, flexShrink: 0, alignSelf: "center", borderRadius: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "clamp(4px, 1.5vw, 10px)", flexShrink: 0 }}>
            {isMobile && (
              <button
                type="button"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "clamp(4px, 1.5vw, 6px)",
                  color: t.text,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {isMenuOpen ? (
                  // X icon
                  <svg width="clamp(18px, 5vw, 22px)" height="clamp(18px, 5vw, 22px)" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <path d="M3 3L19 19M19 3L3 19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  // Hamburger icon
                  <svg width="clamp(18px, 5vw, 22px)" height="clamp(18px, 5vw, 22px)" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                    <path d="M3 6H19M3 11H19M3 16H19" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            )}
            <button type="button" onClick={toggleLang} aria-label="Toggle language" style={{ fontSize: "clamp(10px, 3vw, 11px)", fontWeight: 700, textTransform: "uppercase", padding: "clamp(4px, 1.5vw, 6px) clamp(6px, 2vw, 10px)", borderRadius: 8, border: `1px solid ${t.glassBorder}`, background: t.subtleBg, color: t.textMuted, cursor: "pointer", fontFamily: "inherit" }}>
              {lang === "es" ? "EN" : "ES"}
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
}
