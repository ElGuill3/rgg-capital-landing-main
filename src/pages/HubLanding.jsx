import { useMemo } from "react";
import { useTheme } from "../shared/theme";
import { useLang } from "../shared/i18n";
import { createStyles } from "../shared/styles";
import { FadeIn, SectionTag } from "../shared/components";
import rodrigoImg from "../assets/rodrigo.png";
import marioImg from "../assets/mario.png";
import guillermoImg from "../assets/guillermo.png";
import emilianoImg from "../assets/emiliano.png";

/**
 * PostHog: en `rgg_hub_cta_clicked`, `target` puede ser un id de pilar (`system`, `crypto`, …)
 * o un id de hijo (`system-overview`, `crypto-trading`, …) según el elemento pulsado.
 */
function captureRgg(event, props) {
  window.__posthog?.capture?.(event, props);
}

function BulletList({ items, color }) {
  if (!items || items.length === 0) return null;
  return (
    <ul style={{ margin: "0 0 0 4px", paddingLeft: 20, color, lineHeight: 1.75, fontSize: 16, fontWeight: 500 }}>
      {items.map((text) => (
        <li key={text} style={{ marginBottom: 10 }}>{text}</li>
      ))}
    </ul>
  );
}

function ContentSection({ id, sectionKey, alternate, variant, children }) {
  const { t } = useTheme();
  const { i18n } = useLang();
  const hub = i18n.hub;
  const s = hub.sections[sectionKey];
  const { S } = useMemo(() => createStyles(t), [t]);
  const bg = alternate ? t.bgAlt : t.bg;
  const dotGrid = variant === "dotGrid";
  const headingId = `rgg-hub-section-${sectionKey}-title`;

  return (
    <section
      {...(id != null && id !== "" ? { id } : {})}
      aria-labelledby={headingId}
      style={{ padding: "72px 0", backgroundColor: bg, backgroundImage: dotGrid ? `radial-gradient(circle, ${t.dotGridDot} 1px, transparent 1px)` : undefined, backgroundSize: dotGrid ? "20px 20px" : undefined, transition: "background 0.4s" }}
    >
      <div style={S.container}>
        <FadeIn>
          <SectionTag>{s.tag}</SectionTag>
          <h2 id={headingId} style={S.sectionH2}>{s.title}</h2>
          <p style={{ ...S.sectionP, marginBottom: s.quote ? 16 : 28 }}>{s.lead}</p>
          {s.quote && (
            <blockquote style={{ margin: "0 0 28px", padding: "16px 20px", borderLeft: `4px solid ${t.accent}`, color: t.text, fontSize: 18, fontWeight: 600, fontStyle: "italic", background: t.subtleBg, borderRadius: "0 12px 12px 0" }}>
              {s.quote}
            </blockquote>
          )}
          {s.bullets && <BulletList items={s.bullets} color={t.textMuted} />}
          {children}
        </FadeIn>
      </div>
    </section>
  );
}

export default function HubLanding() {
  const { t } = useTheme();
  const { i18n } = useLang();
  const hub = i18n.hub;
  const { S, btnPrimary, btnSecondary } = useMemo(() => createStyles(t), [t]);
  const sec = hub.sections;

  const scrollToId = (id) => {
    captureRgg("rgg_hub_cta_clicked", { source: "hero_secondary", target: id });
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={S.page}>
      {/* ── Hero section ─────────────────────────────────────── */}
      <section aria-labelledby="rgg-hub-hero-title" style={{ position: "relative" }}>
        <div style={{ minHeight: "clamp(320px, 52vh, 560px)", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(108px, 18vw, 148px)", paddingBottom: 64 }}>
          <div style={S.container}>
            <FadeIn>
              <h1 id="rgg-hub-hero-title" style={S.sectionH2}>
                {hub.hero.title}{" "}
                <span style={{ color: t.accent }}>{hub.hero.titleAccent}</span>
              </h1>
              <p style={{ ...S.sectionP, maxWidth: 720, marginBottom: 32 }}>{hub.hero.description}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a href={`mailto:${hub.contactEmail}`} onClick={() => captureRgg("rgg_hub_cta_clicked", { source: "hero_primary", kind: "mailto" })} style={{ ...btnPrimary, textDecoration: "none" }}>{hub.hero.ctaPrimary}</a>
                <button type="button" onClick={() => scrollToId("rgg-team")} style={{ ...btnSecondary, cursor: "pointer", fontFamily: "inherit" }}>{hub.hero.ctaSecondary}</button>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Founding Team pillar ────────────────────────────── */}
      <ContentSection id="rgg-team" sectionKey="rggTeam" alternate>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(20px, 4vw, 32px)",
          marginTop: 48,
        }}>
          {[
            { name: "Rodrigo Garcia Gorostizaga", role: "CEO", img: rodrigoImg },
            { name: "Mario Jesús Arias Hernández", role: "Quant Developer", img: marioImg },
            { name: "Guillermo Antonio Jiménez de la Cruz", role: "Quant Trader", img: guillermoImg },
            { name: "Emiliano Salgado", role: "AI Researcher", img: emilianoImg },
          ].map((member, i) => (
            <FadeIn key={member.name} delay={i * 0.08}>
              <div style={{
                background: t.glassBg,
                border: `1px solid ${t.glassBorder}`,
                borderRadius: 16,
                padding: "clamp(20px, 4vw, 28px)",
                textAlign: "center",
                transition: "border-color 0.3s ease, box-shadow 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = t.glassBorderHover;
                e.currentTarget.style.boxShadow = t.glassHoverShadow;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = t.glassBorder;
                e.currentTarget.style.boxShadow = t.glassShadow;
              }}>
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "clamp(72px, 12vw, 96px)",
                    height: "clamp(72px, 12vw, 96px)",
                    borderRadius: "50%",
                    objectFit: "cover",
                    margin: "0 auto 16px",
                    display: "block",
                    border: `2px solid ${t.glassBorder}`,
                  }}
                />
                <p style={{ fontFamily: t.fontHeading, fontWeight: 700, fontSize: "clamp(14px, 2.5vw, 16px)", color: t.heading, margin: "0 0 4px" }}>{member.name}</p>
                <p style={{ fontSize: "clamp(12px, 2vw, 13px)", color: t.textMuted, fontWeight: 500, margin: 0, letterSpacing: "0.03em" }}>{member.role}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </ContentSection>

      {/* ── Crypto pillar ─────────────────────────────────── */}
      <section id="crypto">
        <ContentSection sectionKey="pillarCrypto" />
        <ContentSection id="crypto-trading" sectionKey="cryptoTrading" alternate />
        <ContentSection id="crypto-strategy" sectionKey="cryptoStrategy" />
        <ContentSection id="crypto-optimization" sectionKey="cryptoOptimization" alternate />
        <ContentSection id="crypto-risk" sectionKey="cryptoRisk" />
      </section>

      {/* ── Sports pillar ─────────────────────────────────── */}
      <section id="sports">
        <ContentSection sectionKey="pillarSports" alternate />
        <ContentSection id="sports-market" sectionKey="sportsMarket" />
        <ContentSection id="sports-strategy" sectionKey="sportsStrategy" alternate />
        <ContentSection id="sports-execution" sectionKey="sportsExecution" />
        <ContentSection id="sports-portfolio" sectionKey="sportsPortfolio" alternate />
      </section>

      {/* ── AI Labs pillar ────────────────────────────────── */}
      <section id="ai-labs">
        <ContentSection sectionKey="pillarAiLabs" />
        <ContentSection id="ai-labs-rl-core" sectionKey="aiLabsRlCore" alternate />
        <ContentSection id="ai-labs-agents" sectionKey="aiLabsAgents" />
        <ContentSection id="ai-labs-simulation" sectionKey="aiLabsSimulation" alternate />
        <ContentSection id="ai-labs-vision" sectionKey="aiLabsVision" />
      </section>

      {/* ── Foundation pillar ─────────────────────────────── */}
      <section id="foundation" aria-label={hub.a11y.foundationGroup}>
        <ContentSection id="foundation-infrastructure" sectionKey="infrastructure" variant="dotGrid" />
        <ContentSection id="foundation-aws" sectionKey="rggAws" alternate />
        <ContentSection id="foundation-philosophy" sectionKey="philosophy" />
      </section>

      <footer style={{ padding: "48px 24px", borderTop: `1px solid ${t.glassBorder}`, background: t.bgAlt, textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: 14, color: t.textMuted }}>
          <a href={`mailto:${hub.contactEmail}`} style={{ color: t.accent, fontWeight: 600 }} onClick={() => captureRgg("rgg_hub_cta_clicked", { source: "footer", kind: "mailto" })}>{hub.contactEmail}</a>
        </p>
      </footer>
    </div>
  );
}
