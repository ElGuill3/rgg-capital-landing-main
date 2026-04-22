import { useState, useCallback } from "react";
import { useTheme } from "./theme";
import { hexToRgba } from "./colorUtils";

/**
 * Mobile nav: fila por pilar — etiqueta (scroll al primer hijo, opción B) y chevron (solo expandir/colapsar).
 * Un panel abierto a la vez. Tras expandir con el chevron, se hace scroll al panel para mantenerlo bajo la nav.
 *
 * @param {{
 *   navTree: Array<{ pillarId: string, labelKey: string, subItems: Array<{id: string, labelKey: string}> }>,
 *   nav: Record<string, string>,
 *   subLabels: Record<string, string>,
 *   activePillarId: string | null,
 *   activeChildId: string | null,
 * }} props
 */
export function NavAccordion({ navTree, nav, subLabels, activePillarId, activeChildId }) {
  const { t } = useTheme();
  const [openPillar, setOpenPillar] = useState(null);

  const scrollToFirstChild = useCallback((pillar) => {
    const firstId = pillar.subItems[0]?.id;
    if (firstId) {
      document.getElementById(firstId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, []);

  const togglePanel = useCallback((pillar) => {
    const panelDomId = `nav-accordion-panel-${pillar.pillarId}`;
    if (openPillar === pillar.pillarId) {
      setOpenPillar(null);
    } else {
      setOpenPillar(pillar.pillarId);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.getElementById(panelDomId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
      });
    }
  }, [openPillar]);

  const pillarLabelStyle = {
    fontSize: 12,
    fontWeight: 600,
    fontFamily: t.fontHeading,
    letterSpacing: "0.05em",
    transition: "color 0.3s ease, opacity 0.3s ease",
  };

  return (
    <div style={{ width: "100%" }}>
      {navTree.map((pillar) => {
        const isOpen = openPillar === pillar.pillarId;
        const isActivePillar = pillar.pillarId === activePillarId;
        const hasActiveChild = Boolean(
          activeChildId && pillar.subItems.some((s) => s.id === activeChildId),
        );
        const panelId = `nav-accordion-panel-${pillar.pillarId}`;
        const chevronId = `nav-accordion-chevron-${pillar.pillarId}`;
        const labelId = `nav-accordion-label-${pillar.pillarId}`;

        return (
          <div key={pillar.pillarId}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                width: "100%",
              }}
            >
              <button
                id={labelId}
                type="button"
                className="navRgg__link"
                aria-current={isActivePillar && !hasActiveChild ? "location" : undefined}
                onClick={() => scrollToFirstChild(pillar)}
                style={{
                  ...pillarLabelStyle,
                  flex: 1,
                  minWidth: 0,
                  color: isActivePillar ? t.accent : t.textMuted,
                  opacity: isActivePillar ? 1 : 0.7,
                  background: "none",
                  border: "none",
                  padding: "6px 0",
                  cursor: "pointer",
                  textAlign: "left",
                  whiteSpace: "nowrap",
                }}
              >
                {nav[pillar.labelKey]}
              </button>
              <button
                id={chevronId}
                type="button"
                className="navRgg__link"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={isOpen ? "Collapse submenu" : "Expand submenu"}
                onClick={() => togglePanel(pillar)}
                style={{
                  flexShrink: 0,
                  width: 32,
                  padding: "6px 0",
                  fontSize: 10,
                  lineHeight: 1,
                  color: isActivePillar ? t.accent : t.textMuted,
                  opacity: isActivePillar ? 0.85 : 0.55,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.2s ease, opacity 0.2s ease",
                }}
              >
                ▾
              </button>
            </div>

            <div
              id={panelId}
              role="region"
              aria-labelledby={labelId}
              style={{
                overflow: "hidden",
                maxHeight: isOpen ? 300 : 0,
                transition: "max-height 0.25s ease",
              }}
            >
              {pillar.subItems.map((item) => {
                const isActiveChild = item.id === activeChildId;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="navRgg__sublink"
                    aria-current={isActiveChild ? "location" : undefined}
                    onClick={() => setOpenPillar(null)}
                    style={{
                      display: "block",
                      padding: "5px 0 5px 12px",
                      fontFamily: t.fontMono,
                      fontSize: "0.75rem",
                      color: isActiveChild ? t.accent : t.textMuted,
                      opacity: isActiveChild ? 1 : 0.75,
                      textDecoration: "none",
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
      })}
    </div>
  );
}
