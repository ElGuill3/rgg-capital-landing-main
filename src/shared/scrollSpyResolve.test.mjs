import test from "node:test";
import assert from "node:assert/strict";
import { resolveScrollSpyHierarchy } from "./scrollSpyResolve.js";

const childToPillar = new Map([
  ["system-overview", "system"],
  ["crypto-trading", "crypto"],
]);
const pillarIds = new Set(["system", "crypto", "foundation"]);

test("hijo mapeado → activeChildId y pilar derivado", () => {
  assert.deepEqual(resolveScrollSpyHierarchy("crypto-trading", childToPillar, pillarIds), {
    activePillarId: "crypto",
    activeChildId: "crypto-trading",
  });
});

test("pilar solo → activePillarId sin hijo", () => {
  assert.deepEqual(resolveScrollSpyHierarchy("foundation", childToPillar, pillarIds), {
    activePillarId: "foundation",
    activeChildId: null,
  });
});

test("id desconocido con mapas → fail-safe null", () => {
  assert.deepEqual(resolveScrollSpyHierarchy("bogus-id", childToPillar, pillarIds), {
    activePillarId: null,
    activeChildId: null,
  });
});

test("sin mapas (legacy) → ganador como pilar", () => {
  assert.deepEqual(resolveScrollSpyHierarchy("anything", undefined, undefined), {
    activePillarId: "anything",
    activeChildId: null,
  });
});

test("winner vacío → nulls", () => {
  assert.deepEqual(resolveScrollSpyHierarchy(null, childToPillar, pillarIds), {
    activePillarId: null,
    activeChildId: null,
  });
});
