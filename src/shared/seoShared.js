/** Funciones puras SEO — usables en runtime y en prerender (Node) */

export function trimDescription(text, max = 158) {
  if (!text || text.length <= max) return text;
  return text.slice(0, Math.max(0, max - 1)).trimEnd() + "…";
}

export function buildHomeTitle(hub) {
  return `${hub.hero.title} ${hub.hero.titleAccent} | RGG Capital`;
}

export function homeMetaFromTranslations(translationsRoot, lang) {
  const L = lang === "es" ? "es" : "en";
  const hub = translationsRoot[L].hub;
  return {
    title: buildHomeTitle(hub),
    description: trimDescription(hub.hero.description),
  };
}

export function buildOrganizationJsonLd(hub, baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RGG Capital",
    alternateName: ["RGG Innovation HUB"],
    url: baseUrl,
    description: hub.hero.description,
    contactPoint: [
      {
        "@type": "ContactPoint",
        email: hub.contactEmail,
        contactType: "inquiries",
        availableLanguage: ["English", "Spanish"],
      },
    ],
  };
}

export function buildWebSiteJsonLd(baseUrl) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RGG Innovation HUB",
    url: baseUrl,
    inLanguage: ["en", "es"],
    publisher: {
      "@type": "Organization",
      name: "RGG Capital",
      url: baseUrl,
    },
  };
}
