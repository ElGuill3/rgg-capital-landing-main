import { test, expect } from "@playwright/test";

test.describe("hub landing smoke", () => {
  test("home muestra #system y el pilar CRYPTO lleva al bloque crypto", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto("/");
    await expect(page.locator("#system")).toBeVisible();

    await page.getByRole("button", { name: /^CRYPTO$/i }).click();
    await page.waitForTimeout(600);
    await expect(page.locator("#crypto-trading")).toBeVisible();
    await expect(page.locator("#crypto")).toBeVisible();
  });
});
