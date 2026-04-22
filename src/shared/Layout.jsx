import { useMemo, useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { useTheme } from "./theme";
import { useLang } from "./i18n";
import { ThemeToggle } from "./components";
import { useScrollSpy, DEFAULT_NAV_SPY_OFFSET } from "./hooks/useScrollSpy";
import { CHILD_TO_PILLAR, PILLAR_IDS, ALL_HUB_SPY_IDS } from "./hubAnchorMap";
import { NavDropdown } from "./NavDropdown";
import { NavAccordion } from "./NavAccordion";
import "./layout.css";

import logoSrc from "../assets/logo.png";

/**
 * Contrato de anclas (Hub `/`):
 *  - Pilares: #system, #crypto, #sports, #ai-labs, #foundation
 *  - Hijos: #system-overview … #foundation-philosophy (ver hubAnchorMap.js)
 *  - Todos tienen scroll-margin-top: 122px (layout.css)
 *  - NavDropdown (desktop): clic pilar → scroll al primer hijo del pilar
 *  - NavAccordion (móvil ≤767px): acordeón con un panel abierto a la vez
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

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BP}px)`);
    const handler = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

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
            margin: "10px auto",
            borderRadius: 16,
            background: t.navGlassBg,
            border: `1px solid ${t.border}`,
            backdropFilter: "blur(12px) saturate(150%)",
            WebkitBackdropFilter: "blur(12px) saturate(150%)",
            boxShadow: t.isDark ? "0 8px 32px rgba(0,0,0,0.35)" : "0 8px 28px rgba(83, 72, 78, 0.12)",
            display: "flex",
            alignItems: "center",
            gap: 12,
            minHeight: 68,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: "calc(max(12px, min(4.5vw, 22px)) + env(safe-area-inset-left, 0px))",
            paddingRight: "calc(max(12px, min(4.5vw, 22px)) + env(safe-area-inset-right, 0px))",
            flexWrap: "wrap",
            boxSizing: "border-box",
            justifyContent: "space-between",
            height: "auto",
          }}
        >
          <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            {logoSrc ? (
              <img src={logoSrc} alt="RGG Capital" height={48} style={{ height: 48, width: "auto", maxWidth: 220, objectFit: "contain", display: "block" }} />
            ) : (
              <strong style={{ color: t.heading, letterSpacing: t.letterSpacingHeading, fontSize: 18, fontFamily: t.fontHeading }}>RGG</strong>
            )}
          </Link>

          <nav aria-label="Primary" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 14px", flex: "1 1 200px", justifyContent: "center", minWidth: 0 }}>
            {isMobile ? (
              <NavAccordion
                navTree={navTree}
                nav={nav}
                subLabels={navSub}
                activePillarId={spyEnabled ? activePillarId : null}
                activeChildId={spyEnabled ? activeChildId : null}
              />
            ) : (
              navTree.map((pillar) => (
                <NavDropdown
                  key={pillar.pillarId}
                  pillar={pillar}
                  label={nav[pillar.labelKey]}
                  subLabels={navSub}
                  isActivePillar={spyEnabled && activePillarId === pillar.pillarId}
                  activeChildId={spyEnabled ? activeChildId : null}
                />
              ))
            )}
          </nav>

          <span aria-hidden style={{ width: 1, height: 20, backgroundColor: t.border, flexShrink: 0, alignSelf: "center", borderRadius: 1 }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, marginLeft: "auto" }}>
            <button type="button" onClick={toggleLang} aria-label="Toggle language" style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", padding: "6px 10px", borderRadius: 8, border: `1px solid ${t.glassBorder}`, background: t.subtleBg, color: t.textMuted, cursor: "pointer", fontFamily: "inherit" }}>
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
