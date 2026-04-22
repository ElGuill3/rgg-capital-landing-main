import { test, expect } from "@playwright/test";

const NAV_OFFSET = 122;

test.describe("refinar barra — anclas, tema, layout", () => {
  /**
   * Option B: clicking a pillar button scrolls to its FIRST child id.
   * Verifies the first child's h2 is visible and not hidden behind the nav bar.
   */
  test("anclas AI Labs y Foundation: el h2 no queda bajo la barra flotante", async ({ page }) => {
    await page.goto("/");
    // Map pillar → first child id (option B)
    const pillarToFirstChild: Record<string, string> = {
      "ai-labs": "ai-labs-rl-core",
      "foundation": "foundation-infrastructure",
    };
    for (const [pillarId, firstChildId] of Object.entries(pillarToFirstChild)) {
      // Click the pillar button (NavDropdown trigger) — scrolls to first child
      await page
        .locator(`nav[aria-label="Primary"] button`, { hasText: /AI LABS|FOUNDATION/i })
        .filter({ hasText: pillarId === "ai-labs" ? /AI LABS/i : /FOUNDATION/i })
        .click();
      await page.waitForTimeout(500);
      const h2 = page.locator(`#${firstChildId} h2`).first();
      await expect(h2).toBeVisible();
      const top = await h2.evaluate((el) => el.getBoundingClientRect().top);
      expect(top).toBeGreaterThanOrEqual(NAV_OFFSET - 24);
    }
  });

  test("ThemeToggle: fondo del carril y navGlassBg usan tokens al alternar tema", async ({ page }) => {
    await page.goto("/");
    const toggle = page.getByRole("button", { name: "Toggle theme" });
    const inner = page.locator(".navRgg__inner").first();
    const navBgBefore = await inner.evaluate((el) => getComputedStyle(el).backgroundColor);
    const trackBefore = await toggle.evaluate((el) => getComputedStyle(el).backgroundColor);
    await toggle.click();
    const navBgAfter = await inner.evaluate((el) => getComputedStyle(el).backgroundColor);
    const trackAfter = await toggle.evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(navBgAfter).not.toBe(navBgBefore);
    expect(trackAfter).not.toBe(trackBefore);
  });

  /**
   * Scroll-spy + ARIA: con un hijo del pilar más visible, `aria-current="location"` va al
   * subenlace activo (no al botón del pilar). El pilar sigue resaltado (opacity 1).
   */
  test("scroll-spy: hijo foundation-infrastructure activo → subenlace con aria-current, no el pilar", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.locator("#foundation-infrastructure").scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    const foundationBtn = page
      .locator('nav[aria-label="Primary"] button')
      .filter({ hasText: /^FOUNDATION$/i });
    await expect(foundationBtn).not.toHaveAttribute("aria-current", "location");
    const opacity = await foundationBtn.evaluate((el) => parseFloat(getComputedStyle(el).opacity));
    expect(opacity).toBe(1);
    const subLink = page.locator('nav[aria-label="Primary"] a[href="#foundation-infrastructure"]').first();
    await expect(subLink).toHaveAttribute("aria-current", "location");
  });

  /**
   * Solo pilar en el spy: al alinear el borde superior de #crypto con el offset de nav,
   * el hijo no debe llevar aria-current y el botón CRYPTO sí (pilar sin hijo activo en jerarquía).
   */
  test("scroll-spy: solo pilar crypto — botón CRYPTO con aria-current, no el subenlace", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await page.evaluate((offset) => {
      const el = document.getElementById("crypto");
      if (el) window.scrollTo({ top: Math.max(0, el.offsetTop - offset), behavior: "instant" });
    }, NAV_OFFSET);
    await page.waitForTimeout(500);
    const cryptoBtn = page.locator('nav[aria-label="Primary"] button').filter({ hasText: /^CRYPTO$/i });
    const tradingLink = page.locator('nav[aria-label="Primary"] a[href="#crypto-trading"]').first();
    await expect(cryptoBtn).toHaveAttribute("aria-current", "location");
    await expect(tradingLink).not.toHaveAttribute("aria-current", "location");
  });

  test("dropdown desktop: gracia 200ms al salir y volver con el puntero", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    const cryptoBtn = page.locator('nav[aria-label="Primary"] button').filter({ hasText: /^CRYPTO$/i });
    const panel = page
      .locator('nav[aria-label="Primary"] [role="menu"]')
      .filter({ has: page.locator('a[href="#crypto-trading"]') });
    await cryptoBtn.hover();
    await expect(panel).toBeVisible();
    // Salir del wrapper del dropdown y volver al botón del pilar (<200ms) para cancelar el cierre
    await page.mouse.move(1270, 680);
    await page.waitForTimeout(55);
    await cryptoBtn.hover({ force: true });
    await page.waitForTimeout(280);
    await expect(panel).toBeVisible();
    const opacity = await panel.evaluate((el) => parseFloat(getComputedStyle(el).opacity));
    expect(opacity).toBeGreaterThan(0.85);
  });

  test("dropdown desktop: subenlaces JetBrains Mono y 0.75rem; pilar más fuerte que hijo", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    const systemBtn = page.locator('nav[aria-label="Primary"] button').filter({ hasText: /^INNOVATION HUB$/i });
    await systemBtn.hover();
    const sub = page.locator('nav[aria-label="Primary"] a[href="#system-overview"]').first();
    await expect(sub).toBeVisible();
    const fs = await sub.evaluate((el) => getComputedStyle(el).fontSize);
    const ff = await sub.evaluate((el) => getComputedStyle(el).fontFamily.toLowerCase());
    expect(fs).toBe("12px");
    expect(ff).toMatch(/jetbrains|mono/);
    const wPillar = await systemBtn.evaluate((el) => parseInt(getComputedStyle(el).fontWeight, 10));
    const wSub = await sub.evaluate((el) => parseInt(getComputedStyle(el).fontWeight, 10));
    expect(wPillar).toBeGreaterThanOrEqual(wSub);
  });

  test("isla flotante: border-radius y ancho acotado tras redimensionar", async ({ page }) => {
    await page.goto("/");
    const inner = page.locator(".navRgg__inner").first();
    await page.setViewportSize({ width: 375, height: 720 });
    const boxNarrow = await inner.boundingBox();
    expect(boxNarrow!.width).toBeLessThanOrEqual(375 * 0.97);
    const brNarrow = await inner.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(parseFloat(brNarrow)).toBeGreaterThanOrEqual(14);
    await page.setViewportSize({ width: 1280, height: 720 });
    const boxWide = await inner.boundingBox();
    expect(boxWide!.width).toBeLessThanOrEqual(1200 + 4);
    const brWide = await inner.evaluate((el) => getComputedStyle(el).borderRadius);
    expect(parseFloat(brWide)).toBeGreaterThanOrEqual(14);
  });

  /**
   * Smoke: NavAccordion renders on mobile viewport (≤767px).
   * Pillar trigger shows chevron and toggles aria-expanded.
   */
  test("acordeón móvil: chevron con aria-expanded y primer subenlace visible en viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 720 });
    await page.goto("/");
    const chevrons = page.locator('nav[aria-label="Primary"] button[aria-expanded]');
    await expect(chevrons.first()).toBeVisible();
    expect(await chevrons.count()).toBeGreaterThanOrEqual(5);
    const firstChevron = chevrons.first();
    await expect(firstChevron).toHaveAttribute("aria-expanded", "false");
    await firstChevron.click();
    await expect(firstChevron).toHaveAttribute("aria-expanded", "true");
    await page.waitForTimeout(450);
    const firstSub = page.locator('nav[aria-label="Primary"] a.navRgg__sublink').first();
    await expect(firstSub).toBeVisible();
    const vh = page.viewportSize()!.height;
    const r = await firstSub.evaluate((el) => el.getBoundingClientRect());
    expect(r.height).toBeGreaterThan(4);
    expect(r.top).toBeGreaterThanOrEqual(0);
    expect(r.bottom).toBeLessThanOrEqual(vh + 1);
  });

  /**
   * Option B deep-link: clicking the CRYPTO pillar button scrolls to #crypto-trading.
   */
  test("clic pilar CRYPTO navega al primer hijo crypto-trading", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    const cryptoBtn = page
      .locator('nav[aria-label="Primary"] button')
      .filter({ hasText: /^CRYPTO$/i });
    await cryptoBtn.click();
    await page.waitForTimeout(600);
    const cryptoTrading = page.locator("#crypto-trading");
    await expect(cryptoTrading).toBeVisible();
  });
});
