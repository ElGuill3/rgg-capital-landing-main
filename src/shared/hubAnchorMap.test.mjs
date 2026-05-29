import test from "node:test";
import assert from "node:assert/strict";
import { CHILD_TO_PILLAR, PILLAR_IDS, ALL_HUB_SPY_IDS } from "./hubAnchorMap.js";

test("PILLAR_IDS does not contain 'system' and contains 'rgg-team'", () => {
  assert.equal(PILLAR_IDS.has("system"), false);
  assert.equal(PILLAR_IDS.has("rgg-team"), true);
});

test("ALL_HUB_SPY_IDS does not contain 'system' or system children and contains 'rgg-team'", () => {
  assert.equal(ALL_HUB_SPY_IDS.includes("system"), false);
  assert.equal(ALL_HUB_SPY_IDS.includes("system-overview"), false);
  assert.equal(ALL_HUB_SPY_IDS.includes("system-allocation"), false);
  assert.equal(ALL_HUB_SPY_IDS.includes("system-research"), false);
  assert.equal(ALL_HUB_SPY_IDS.includes("system-execution"), false);
  
  assert.equal(ALL_HUB_SPY_IDS.includes("rgg-team"), true);
});

test("CHILD_TO_PILLAR has no system children mapped to system", () => {
  assert.equal(CHILD_TO_PILLAR.has("system-overview"), false);
  assert.equal(CHILD_TO_PILLAR.has("system-allocation"), false);
  assert.equal(CHILD_TO_PILLAR.has("system-research"), false);
  assert.equal(CHILD_TO_PILLAR.has("system-execution"), false);
  
  for (const [key, val] of CHILD_TO_PILLAR.entries()) {
    assert.notEqual(val, "system", `Key ${key} should not map to 'system'`);
  }
});

test("foundation-aws exists in ALL_HUB_SPY_IDS and CHILD_TO_PILLAR in correct position and mapping", () => {
  // Check mapping
  assert.equal(CHILD_TO_PILLAR.get("foundation-aws"), "foundation", "foundation-aws should map to foundation");
  
  // Check exists in spy ids
  assert.ok(ALL_HUB_SPY_IDS.includes("foundation-aws"), "ALL_HUB_SPY_IDS should include foundation-aws");
  
  // Check correct order: between foundation-infrastructure and foundation-philosophy
  const idxInfra = ALL_HUB_SPY_IDS.indexOf("foundation-infrastructure");
  const idxAws = ALL_HUB_SPY_IDS.indexOf("foundation-aws");
  const idxPhil = ALL_HUB_SPY_IDS.indexOf("foundation-philosophy");
  
  assert.ok(idxInfra !== -1, "foundation-infrastructure should exist");
  assert.ok(idxAws !== -1, "foundation-aws should exist");
  assert.ok(idxPhil !== -1, "foundation-philosophy should exist");
  
  assert.ok(idxInfra < idxAws, "foundation-infrastructure should precede foundation-aws");
  assert.ok(idxAws < idxPhil, "foundation-aws should precede foundation-philosophy");
});

