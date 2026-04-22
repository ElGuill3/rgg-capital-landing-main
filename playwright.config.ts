import { defineConfig, devices } from "@playwright/test";

const defaultBaseURL = "http://127.0.0.1:4173";
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? defaultBaseURL;
const useLocalPreview = baseURL === defaultBaseURL;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "list",
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: useLocalPreview
    ? {
        command: "npm run build && npm run preview",
        url: defaultBaseURL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
      }
    : undefined,
});
