/**
 * Post-build: alinea `dist/index.html` con meta/OG/JSON-LD de la home (inglés por defecto para crawlers).
 * Fuente de copy: `src/shared/translations.js` + `seoShared.js` (misma lógica que `useSEO`).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from "fs";
import { join } from "path";
import translations from "../src/shared/translations.js";
import {
  homeMetaFromTranslations,
  buildOrganizationJsonLd,
  buildWebSiteJsonLd,
} from "../src/shared/seoShared.js";

const PRERENDER_LANG = "en";

function normalizeSiteUrl(url) {
  if (!url || typeof url !== "string") return "";
  let s = url.trim().replace(/\/+$/, "");
  if (!s) return "";
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

function getBaseUrl() {
  const env = process.env.VITE_PUBLIC_SITE_URL;
  if (env) return normalizeSiteUrl(env);
  const envPath = join(process.cwd(), ".env");
  if (existsSync(envPath)) {
    const raw = readFileSync(envPath, "utf-8");
    const m = raw.match(/^\s*VITE_PUBLIC_SITE_URL\s*=\s*(\S+)/m);
    if (m) return normalizeSiteUrl(m[1].replace(/^["']|["']$/g, ""));
  }
  return "https://rggcapital.ai";
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const DIST = join(process.cwd(), "dist");
const distHtml = join(DIST, "index.html");

if (!existsSync(distHtml)) {
  console.error("prerender: falta dist/index.html — ejecuta vite build antes");
  process.exit(1);
}

const baseUrl = getBaseUrl().replace(/\/+$/, "");
const { title, description } = homeMetaFromTranslations(translations, PRERENDER_LANG);
const hub = translations.en.hub;
const pageUrl = `${baseUrl}/`;

let assetsList = [];
try {
  assetsList = readdirSync(join(DIST, "assets"));
} catch {
  assetsList = [];
}
const logoFile = assetsList.find(
  (f) => /^logo-/i.test(f) && /\.(jpg|jpeg|png|webp|avif)$/i.test(f)
);
const ogImage = logoFile ? `${baseUrl}/assets/${logoFile}` : `${baseUrl}/favicon.svg`;

const orgLd = buildOrganizationJsonLd(hub, baseUrl);
const siteLd = buildWebSiteJsonLd(baseUrl);
const jsonLdBlock = `    <script type="application/ld+json" id="rgg-jsonld-org">${JSON.stringify(orgLd)}</script>
    <script type="application/ld+json" id="rgg-jsonld-site">${JSON.stringify(siteLd)}</script>`;

let html = readFileSync(distHtml, "utf-8");

html = html.replace(/<html lang="[^"]*"/, `<html lang="${PRERENDER_LANG}"`);
html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`);
html = html.replace(
  /<meta name="description" content="[^"]*" \/>/,
  `<meta name="description" content="${escapeHtml(description)}" />`
);
html = html.replace(
  /<link rel="canonical" href="[^"]*" \/>/,
  `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`
);

html = html.replace(
  /<meta property="og:title" content="[^"]*" \/>/,
  `<meta property="og:title" content="${escapeHtml(title)}" />`
);
html = html.replace(
  /<meta property="og:description" content="[^"]*" \/>/,
  `<meta property="og:description" content="${escapeHtml(description)}" />`
);
html = html.replace(
  /<meta property="og:url" content="[^"]*" \/>/,
  `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`
);
html = html.replace(
  /<meta property="og:image" content="[^"]*" \/>/,
  `<meta property="og:image" content="${escapeHtml(ogImage)}" />`
);
html = html.replace(
  /<meta property="og:image:alt" content="[^"]*" \/>/,
  `<meta property="og:image:alt" content="${escapeHtml(title)}" />`
);

html = html.replace(
  /<meta name="twitter:title" content="[^"]*" \/>/,
  `<meta name="twitter:title" content="${escapeHtml(title)}" />`
);
html = html.replace(
  /<meta name="twitter:description" content="[^"]*" \/>/,
  `<meta name="twitter:description" content="${escapeHtml(description)}" />`
);
html = html.replace(
  /<meta name="twitter:image" content="[^"]*" \/>/,
  `<meta name="twitter:image" content="${escapeHtml(ogImage)}" />`
);

html = html.replace(
  /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
  `<link rel="alternate" hreflang="x-default" href="${escapeHtml(pageUrl)}" />`
);

html = html.replace(/<script type="application\/ld\+json" id="rgg-jsonld-org">[\s\S]*?<\/script>\s*/g, "");
html = html.replace(/<script type="application\/ld\+json" id="rgg-jsonld-site">[\s\S]*?<\/script>\s*/g, "");

html = html.replace("</head>", `${jsonLdBlock}\n  </head>`);

writeFileSync(distHtml, html);
console.log(`prerender: OK — ${pageUrl} (og: ${ogImage})`);
