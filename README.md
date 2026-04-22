# RGG Capital — sitio marketing (RGG HUB)

SPA con Vite 7, React 19 y React Router 7. Código en este repo; dominio propio (p. ej. `rggcapital.ai`).

## Requisitos

- Node.js LTS actual

## Instalación

```bash
npm install
```

## Variables de entorno

Copia `.env.example` a `.env` y ajusta:

| Variable | Descripción |
|----------|-------------|
| `VITE_PUBLIC_SITE_URL` | Origen canónico del sitio (HTTPS, sin barra final recomendada). |
| `VITE_PUBLIC_POSTHOG_KEY` | Opcional. Si está vacío, no se carga PostHog. |
| `VITE_PUBLIC_POSTHOG_HOST` | Opcional. Host de PostHog. |

## Comandos

| Comando | Uso |
|---------|-----|
| `npm run dev` | Servidor de desarrollo (Vite). |
| `npm run build` | `vite build` + `scripts/prerender.mjs` (meta/JSON-LD en `dist/index.html`). |
| `npm run preview` | Sirve `dist` en `http://127.0.0.1:4173` (útil antes de E2E). |
| `npm run test:e2e` | Playwright: levanta `build` + `preview` (ver abajo) y ejecuta `e2e/`. |

## Deploy (Vercel)

El repo incluye **`vercel.json`**: rewrites `/(.*)` → `/index.html` para que React Router resuelva rutas cliente (p. ej. `/cualquier-ruta`). Los archivos estáticos en `dist` (p. ej. `/assets/*`, `/favicon.svg`) siguen sirviéndose con prioridad sobre el rewrite.

1. Conecta este repositorio en [Vercel](https://vercel.com) como proyecto nuevo.
2. **Build command:** `npm run build`
3. **Output directory:** `dist`
4. En **Settings → Environment Variables**, define al menos:
   - `VITE_PUBLIC_SITE_URL` = URL pública final con HTTPS (p. ej. `https://rggcapital.ai`, sin barra final). Imprescindible para canonical, Open Graph y JSON-LD en build/prerender.
   - Opcionales: `VITE_PUBLIC_POSTHOG_KEY`, `VITE_PUBLIC_POSTHOG_HOST`.
5. Despliega; comprueba la URL de preview o producción.

### Verificación local (antes o después del deploy)

- `npm run build` sin errores.
- `npm run preview` y abre `http://127.0.0.1:4173/`: navega por el menú a varias anclas (`#system`, `#crypto`, `#sports`, `#ai-labs`, `#foundation`); alterna EN/ES y tema.
- Inspecciona `<head>` (DevTools → Elements): título, descripción, `og:url`, `canonical` coherentes con `VITE_PUBLIC_SITE_URL`.
- Tras un deploy, repite la inspección del `<head>` en la URL real de producción o staging.

### Dominio propio, HTTPS y SEO

1. En Vercel → **Domains**, añade el dominio (p. ej. `rggcapital.ai` y `www` si aplica). Configura DNS según Vercel (registro A/CNAME); el certificado HTTPS lo gestiona Vercel.
2. Asegúrate de que **`VITE_PUBLIC_SITE_URL` en producción** coincide con el dominio canónico que quieres mostrar en buscadores y redes (si cambias de `*.vercel.app` a dominio custom, vuelve a desplegar tras actualizar la variable).
3. Valida en la página en vivo: `og:url`, `link[rel=canonical]` y los bloques JSON-LD deben usar ese mismo origen.
4. **Pulido posterior (no bloquea el deploy):** cuando definas paleta y tipografía definitivas, sustituye los placeholders en `src/shared/theme.js` y ajusta fuentes en `index.html` (tarea 5.4 del cambio OpenSpec).

## Contacto (provisional)

**rggcapital5@gmail.com** — usar en CTA y datos estructurados cuando esté la landing completa.

## Logo

Coloca assets de marca en **`src/assets/`** (p. ej. SVG/PNG del logo) e impórtalos desde los componentes con `import logo from './assets/archivo.svg'` (Fase 3: header).

## E2E (Playwright)

1. Instala los navegadores de Playwright (una vez por máquina): `npx playwright install chromium` (o `npx playwright install` para todos).
2. `npm run test:e2e` — por defecto usa `PLAYWRIGHT_BASE_URL` si está definida, si no **`http://127.0.0.1:4173`**. El `playwright.config.ts` arranca **`npm run build && npm run preview`** salvo en CI o si ya hay un servidor escuchando en esa URL (`reuseExistingServer`).
3. Para ejecutar contra otra URL (p. ej. preview en Vercel): `PLAYWRIGHT_BASE_URL=https://tu-preview.vercel.app npm run test:e2e`. Si **no** usas el valor por defecto `http://127.0.0.1:4173`, Playwright **no** arranca `build`/`preview` local: la URL debe estar ya accesible.
4. Casos en `e2e/smoke.spec.ts`: landing `#system` y salto del menú a `#crypto`. Amplía asserts conforme añadas rutas o flujos.

### Verificación manual (navegación 5 pilares)

Tras un deploy o en local con `npm run dev` / `npm run preview`:

- En `/` con scroll arriba del todo, el enlace de barra **SYSTEM** (o SISTEMA) tiene `aria-current="location"`.
- Desplazarte por el bloque **#system** y por **#foundation** no rompe títulos bajo la barra flotante.
- Cada ancla de la barra (`#system` … `#foundation`) hace scroll al tramo correcto.
- Conmutar **EN/ES** muestra cinco rótulos coherentes (institucional en mayúsculas).

## Anclas (ruptura de hashes)

Si tenías enlaces guardados a fragmentos antiguos (`#hub`, `#capital-allocation`, `#pillar-crypto`, `#infrastructure`, `#philosophy`, etc.), deben actualizarse a los cinco pilares actuales: `#system`, `#crypto`, `#sports`, `#ai-labs`, `#foundation`.
