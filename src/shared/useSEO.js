import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import translations from "./translations.js";
import { getSiteUrlRuntime } from "./siteConfig.js";
import {
  homeMetaFromTranslations,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "./seoShared.js";

function setMetaTag(attr, attrValue, content) {
  let el = document.querySelector(`meta[${attr}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel, href, attrs = {}) {
  const selector = Object.entries(attrs)
    .map(([k, v]) => `[${k}="${v}"]`)
    .join("");
  let el = document.querySelector(`link[rel="${rel}"]${selector}`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

const logoModules = import.meta.glob("../assets/*.{jpg,jpeg,png,webp,avif,svg}", {
  eager: true,
  import: "default",
});

function getOgImageAbsolute(baseUrl) {
  const rel = Object.values(logoModules)[0];
  if (!rel) return `${baseUrl}/favicon.ico`;
  const path = rel.startsWith("/") ? rel : `/${rel}`;
  return `${baseUrl}${path}`;
}

/**
 * SEO solo para la home `/` (SPA single-page hub).
 * @param {string} lang — `en` | `es`
 */
export function useSEO(lang) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;

    const baseUrl = getSiteUrlRuntime().replace(/\/+$/, "");
    const { title, description } = homeMetaFromTranslations(translations, lang);
    const url = `${baseUrl}/`;
    const ogImage = getOgImageAbsolute(baseUrl);
    const L = lang === "es" ? "es" : "en";
    const hub = translations[L].hub;

    document.title = title;
    document.documentElement.lang = L;

    setMetaTag("name", "description", description);
    setMetaTag("name", "robots", "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1");

    setLinkTag("canonical", url);

    setMetaTag("property", "og:type", "website");
    setMetaTag("property", "og:site_name", "RGG Capital");
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:url", url);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:image:alt", title);
    setMetaTag("property", "og:locale", lang === "es" ? "es_MX" : "en_US");

    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", ogImage);

    setLinkTag("alternate", url, { hreflang: "x-default" });

    setJsonLd("rgg-jsonld-org", buildOrganizationJsonLd(hub, baseUrl));
    setJsonLd("rgg-jsonld-site", buildWebSiteJsonLd(baseUrl));
  }, [pathname, lang]);
}
