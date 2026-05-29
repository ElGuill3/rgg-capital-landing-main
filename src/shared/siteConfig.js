/** URL pública del sitio (Vite inyecta `import.meta.env` en el cliente) */

export function normalizeSiteUrl(url) {
  if (!url || typeof url !== "string") return "";
  let s = url.trim().replace(/\/+$/, "");
  if (!s) return "";
  if (!/^https?:\/\//i.test(s)) s = `https://${s}`;
  return s;
}

export function getSiteUrlRuntime() {
  const raw = import.meta.env.VITE_PUBLIC_SITE_URL;
  const n = normalizeSiteUrl(raw || "");
  return n || "https://rggcapital.ai";
}
