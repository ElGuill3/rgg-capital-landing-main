import test from "node:test";
import assert from "node:assert/strict";
import { buildOrganizationJsonLd, buildWebSiteJsonLd } from "./seoShared.js";

const mockHub = {
  hero: {
    description: "Quantitative trading strategies across digital assets."
  },
  contactEmail: "contact@rggcapital.ai"
};

test("Organization JSON-LD uses RGG Capital and not alternate RGG Innovation HUB", () => {
  const jsonLd = buildOrganizationJsonLd(mockHub, "https://rggcapital.ai");
  assert.equal(jsonLd.name, "RGG Capital");
  assert.equal(jsonLd.alternateName.includes("RGG Innovation HUB"), false, "Alternate name should not contain legacy RGG Innovation HUB");
});

test("WebSite JSON-LD uses RGG Capital and not RGG Innovation HUB as name", () => {
  const jsonLd = buildWebSiteJsonLd("https://rggcapital.ai");
  assert.equal(jsonLd.name, "RGG Capital", "WebSite name should be RGG Capital");
});
