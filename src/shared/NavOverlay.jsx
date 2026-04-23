import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./theme";
import { hexToRgba } from "./colorUtils";

import logoSrc from "../assets/logo.png";

/**
 * Full-screen mobile nav overlay.
 * Appears from top with slide animation, displays pillars and subitems
 * in a centered, touch-friendly layout.
 */
export function NavOverlay({ isOpen, onClose, navTree, nav, subLabels, activePillarId, activeChildId }) {
  const { t } = useTheme();
  const [openPillar, setOpenPillar] = useState(null);

  const togglePillar = useCallback((pillarId) => {
    setOpenPillar((prev) => (prev === pillarId ? null : pillarId));
  }, []);

  const handleSublinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  const pillarStyle = {
    fontSize: "clamp(18px, 5vw, 28px)",
    fontWeight: 700,
    fontFamily: t.fontHeading,
    letterSpacing: "0.03em",
    textAlign: "left",
    width: "100%",
    padding: "clamp(12px, 3vw, 18px) clamp(8px, 2vw, 16px)",
    background: "none",
    border: "none",
    borderRadius: 12,
    cursor: "pointer",
    color: t.textMuted,
    transition: "color 0.2s ease, background 0.2s ease",
  };

  const sublinkStyle = {
    display: "block",
    padding: "clamp(8px, 2vw, 12px) clamp(8px, 2vw, 16px)",
    fontFamily: t.fontMono,
    fontSize: "clamp(13px, 3.5vw, 16px)",
    textDecoration: "none",
    borderLeft: "3px solid transparent",
    borderRadius: "0 8px 8px 0",
    color: t.textMuted,
    transition: "color 0.2s ease, border-color 0.2s ease, background 0.2s ease",
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`nav-overlay-backdrop${isOpen ? " is-open" : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Full-screen panel */}
      <div
        className={`nav-overlay${isOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
      >
        <div className="nav-overlay__header">
          <Link to="/" onClick={onClose} style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            {logoSrc ? (
              <img src={logoSrc} alt="RGG Capital" height={40} style={{ height: 40, width: "auto", maxWidth: 180, objectFit: "contain", display: "block" }} />
            ) : (
              <strong style={{ color: t.heading, letterSpacing: t.letterSpacingHeading, fontSize: 18, fontFamily: t.fontHeading }}>RGG</strong>
            )}
          </Link>

          <button
            type="button"
            className="nav-overlay__close"
            onClick={onClose}
            aria-label="Cerrar menú"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 4L20 20M20 4L4 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <nav aria-label="Navegación principal" className="nav-overlay__items">
          {navTree.map((pillar) => {
            const isOpenPillar = openPillar === pillar.pillarId;
            const isActivePillar = pillar.pillarId === activePillarId;
            const hasActiveChild = Boolean(
              activeChildId && pillar.subItems.some((s) => s.id === activeChildId),
            );

            return (
              <div key={pillar.pillarId}>
                <button
                  type="button"
                  className={`nav-overlay__pillar-btn${isActivePillar ? " is-active" : ""}`}
                  style={{
                    ...pillarStyle,
                    color: isActivePillar ? t.accent : t.textMuted,
                    background: isActivePillar ? `${t.accent}15` : "transparent",
                  }}
                  onClick={() => togglePillar(pillar.pillarId)}
                  aria-expanded={isOpenPillar}
                >
                  {nav[pillar.labelKey]}
                </button>

                <div className={`nav-overlay__subitems${isOpenPillar ? " is-open" : ""}`}>
                  {pillar.subItems.map((item) => {
                    const isActiveChild = item.id === activeChildId;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`nav-overlay__sublink${isActiveChild ? " is-active" : ""}`}
                        style={{
                          ...sublinkStyle,
                          color: isActiveChild ? t.accent : t.textMuted,
                          borderLeftColor: isActiveChild ? hexToRgba(t.accent, 0.5) : "transparent",
                          background: isActiveChild ? `${t.accent}12` : "transparent",
                        }}
                        onClick={handleSublinkClick}
                      >
                        {subLabels[item.labelKey] ?? item.id}
                      </a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </>
  );
}
