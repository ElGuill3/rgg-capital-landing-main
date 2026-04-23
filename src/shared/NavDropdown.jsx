import { useState, useRef, useCallback } from "react";
import { useTheme } from "./theme";
import { hexToRgba } from "./colorUtils";

/**
 * Desktop nav item: pillar trigger button + glass dropdown panel.
 * Click on pillar label → scrolls to first child id (option B).
 * Hover / focus-within → opens panel; onMouseLeave with 200ms delay → closes.
 * Escape key → closes panel and returns focus to trigger.
 *
 * Active child indicator: borderLeft 3px solid accent @45% opacity (spec hierarchy).
 * Active pillar without active child uses aria-current="location".
 *
 * @param {{
 *   pillar: { pillarId: string, labelKey: string, subItems: Array<{id: string, labelKey: string}> },
 *   label: string,
 *   subLabels: Record<string, string>,
 *   isActivePillar: boolean,
 *   activeChildId: string | null,
 * }} props
 */
export function NavDropdown({ pillar, label, subLabels, isActivePillar, activeChildId }) {
  const { t } = useTheme();
  const [open, setOpen] = useState(false);
  const closeTimer = useRef(null);
  const triggerRef = useRef(null);

  const openPanel = useCallback(() => {
    clearTimeout(closeTimer.current);
    setOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 200);
  }, []);

  const handleTriggerClick = useCallback(() => {
    const firstId = pillar.subItems[0]?.id;
    if (firstId) {
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  }, [pillar.subItems]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setOpen(false);
      triggerRef.current?.focus();
    }
  }, []);

  const hasActiveChild = Boolean(activeChildId && pillar.subItems.some((s) => s.id === activeChildId));

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={openPanel}
      onMouseLeave={scheduleClose}
      onFocus={openPanel}
      onBlur={scheduleClose}
      onKeyDown={handleKeyDown}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-current={isActivePillar && !hasActiveChild ? "location" : undefined}
        className="navRgg__link"
        onClick={handleTriggerClick}
        style={{
          fontSize: "clamp(11px, 1.5vw, 13px)",
          fontWeight: 600,
          fontFamily: t.fontHeading,
          letterSpacing: "0.04em",
          color: isActivePillar ? t.accent : t.textMuted,
          opacity: isActivePillar ? 1 : 0.7,
          background: "none",
          border: "none",
          padding: "clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 14px)",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "color 0.3s ease, opacity 0.3s ease",
        }}
      >
        {label}
      </button>

      <div
        role="menu"
        aria-label={label}
        style={{
          position: "absolute",
          top: "calc(100% + 8px)",
          left: "50%",
          transform: open
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(-6px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          background: t.navGlassBg,
          backdropFilter: "blur(12px) saturate(150%)",
          WebkitBackdropFilter: "blur(12px) saturate(150%)",
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "8px 0",
          minWidth: 180,
          zIndex: 10,
          boxShadow: t.isDark
            ? "0 8px 32px rgba(0,0,0,0.4)"
            : "0 8px 24px rgba(83,72,78,0.14)",
        }}
      >
        {pillar.subItems.map((item) => {
          const isActiveChild = item.id === activeChildId;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              role="menuitem"
              className="navRgg__sublink"
              aria-current={isActiveChild ? "location" : undefined}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "7px 16px",
                fontFamily: t.fontMono,
                fontSize: "0.75rem",
                color: isActiveChild ? t.accent : t.textMuted,
                opacity: isActiveChild ? 1 : 0.8,
                textDecoration: "none",
                whiteSpace: "nowrap",
                // Active child: subtle left border (muted accent ~45% opacity, does not rival pillar)
                borderLeft: isActiveChild
                  ? `3px solid ${hexToRgba(t.accent, 0.45)}`
                  : "3px solid transparent",
                transition: "color 0.2s ease, opacity 0.2s ease, border-color 0.2s ease",
              }}
            >
              {subLabels[item.labelKey] ?? item.id}
            </a>
          );
        })}
      </div>
    </div>
  );
}
