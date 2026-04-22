import { useMemo } from "react";
import { useTheme } from "../shared/theme";
import { useLang } from "../shared/i18n";
import { createStyles } from "../shared/styles";
import { FadeIn, SectionTag } from "../shared/components";

/**
 * PostHog: en `rgg_hub_cta_clicked`, `target` puede ser un id de pilar (`system`, `crypto`, …)
 * o un id de hijo (`system-overview`, `crypto-trading`, …) según el elemento pulsado.
 */
function captureRgg(event, props) {
  window.__posthog?.capture?.(event, props);
}

function BulletList({ items, color }) {
  return (
    <ul style={{ margin: "0 0 0 4px", paddingLeft: 20, color, lineHeight: 1.75, fontSize: 16, fontWeight: 500 }}>
      {items.map((text) => (
        <li key={text} style={{ marginBottom: 10 }}>{text}</li>
      ))}
    </ul>
  );
}

function ContentSection({ id, sectionKey, alternate, variant }) {
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
          <BulletList items={s.bullets} color={t.textMuted} />
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
      {/* ── System pillar ─────────────────────────────────── */}
      <section id="system" aria-labelledby="rgg-hub-hero-title" style={{ position: "relative" }}>
        <div id="system-overview" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", paddingTop: "clamp(108px, 18vw, 148px)", paddingBottom: 64 }}>
          <div style={S.container}>
            <FadeIn>
              <h1 id="rgg-hub-hero-title" style={S.sectionH2}>
                {hub.hero.title}{" "}
                <span style={{ color: t.accent }}>{hub.hero.titleAccent}</span>
              </h1>
              <p style={{ ...S.sectionP, maxWidth: 720, marginBottom: 32 }}>{hub.hero.description}</p>
              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
                <a href={`mailto:${hub.contactEmail}`} onClick={() => captureRgg("rgg_hub_cta_clicked", { source: "hero_primary", kind: "mailto" })} style={{ ...btnPrimary, textDecoration: "none" }}>{hub.hero.ctaPrimary}</a>
                <button type="button" onClick={() => scrollToId("system-overview")} style={{ ...btnSecondary, cursor: "pointer", fontFamily: "inherit" }}>{hub.hero.ctaSecondary}</button>
              </div>
            </FadeIn>

            <FadeIn delay={0.1} style={{ marginTop: 56 }}>
              <SectionTag>{sec.system.tag}</SectionTag>
              <h2 style={{ ...S.sectionH2, fontSize: "clamp(26px, 3.5vw, 40px)" }}>{sec.system.title}</h2>
              <p style={{ ...S.sectionP, marginBottom: 16 }}>{sec.system.lead}</p>
              <blockquote style={{ margin: "0 0 24px", padding: "16px 20px", borderLeft: `4px solid ${t.accent}`, color: t.text, fontSize: 17, fontWeight: 600, fontStyle: "italic", background: t.subtleBg, borderRadius: "0 12px 12px 0" }}>
                {sec.system.quote}
              </blockquote>
              <BulletList items={sec.system.bullets} color={t.textMuted} />
            </FadeIn>
          </div>
        </div>

        <ContentSection id="system-allocation" sectionKey="allocation" alternate />
        <ContentSection id="system-research" sectionKey="research" />
        <ContentSection id="system-execution" sectionKey="execution" alternate />
      </section>

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
        <ContentSection id="foundation-infrastructure" sectionKey="infrastructure" alternate variant="dotGrid" />
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
