import { useState, useEffect, useRef } from "react";
import { useTheme } from "./theme";
import { hexToRgba } from "./colorUtils.js";

/** Fade-in on intersection — adaptado de referencia Orbit */
export function FadeIn({ children, delay = 0, style = {}, direction = "up" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const transforms = {
    up: "translateY(20px)",
    down: "translateY(-20px)",
    left: "translateX(30px)",
    right: "translateX(-30px)",
    scale: "scale(0.95)",
    none: "none",
  };
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transforms[direction] || transforms.up,
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Etiqueta de sección — color por defecto del tema */
export function SectionTag({ children, color, center = false }) {
  const { t } = useTheme();
  const tagColor = color || t.accent;
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        background: `${tagColor}1A`,
        color: tagColor,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        borderRadius: 9999,
        padding: "6px 16px",
        marginBottom: 16,
        fontFamily: t.fontMono,
        ...(center ? { display: "flex", width: "fit-content", margin: "0 auto 16px" } : {}),
      }}
    >
      {children}
    </div>
  );
}

export function ThemeToggle() {
  const { mode, t, toggle } = useTheme();
  const trackBg = t.isDark ? hexToRgba(t.bg, 0.5) : hexToRgba(t.bgAlt, 0.72);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle theme"
      aria-pressed={mode === "light"}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        border: `1px solid ${t.border}`,
        background: trackBg,
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        position: "relative",
        cursor: "pointer",
        transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
        display: "flex",
        alignItems: "center",
        padding: "0 3px",
        boxShadow: `inset 0 1px 0 ${hexToRgba(t.heading, 0.06)}`,
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: t.accent,
          color: t.bg,
          transform: mode === "dark" ? "translateX(0)" : "translateX(20px)",
          transition: "transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 10,
          lineHeight: 1,
          boxShadow: `0 1px 3px ${hexToRgba(t.bg, 0.35)}`,
        }}
      >
        {mode === "dark" ? "☾" : "☀"}
      </div>
    </button>
  );
}
