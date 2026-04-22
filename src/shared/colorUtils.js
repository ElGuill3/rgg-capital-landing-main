/**
 * Convierte `#RRGGBB` a `rgba(r,g,b,alpha)`.
 * @param {string} hex
 * @param {number} alpha 0..1
 */
export function hexToRgba(hex, alpha) {
  const m = typeof hex === "string" && /^#?([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!m) return `rgba(0,0,0,${alpha})`;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}
