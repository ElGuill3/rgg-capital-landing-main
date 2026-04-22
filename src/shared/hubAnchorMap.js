/**
 * Single source of truth for hub anchor → pillar mapping.
 * Tie-breaking: among candidates with equal intersection ratio, the one with the
 * lower index in ALL_HUB_SPY_IDS wins (DOM order, pillar before its children).
 */

/** @type {Map<string, string>} child section id → parent pillar id */
export const CHILD_TO_PILLAR = new Map([
  ["system-overview", "system"],
  ["system-allocation", "system"],
  ["system-research", "system"],
  ["system-execution", "system"],
  ["crypto-trading", "crypto"],
  ["crypto-strategy", "crypto"],
  ["crypto-optimization", "crypto"],
  ["crypto-risk", "crypto"],
  ["sports-market", "sports"],
  ["sports-strategy", "sports"],
  ["sports-execution", "sports"],
  ["sports-portfolio", "sports"],
  ["ai-labs-rl-core", "ai-labs"],
  ["ai-labs-agents", "ai-labs"],
  ["ai-labs-simulation", "ai-labs"],
  ["ai-labs-vision", "ai-labs"],
  ["foundation-infrastructure", "foundation"],
  ["foundation-philosophy", "foundation"],
]);

/** @type {Set<string>} top-level pillar ids */
export const PILLAR_IDS = new Set(["system", "crypto", "sports", "ai-labs", "foundation"]);

/**
 * All ids to observe, in DOM order (pillar precedes its children).
 * Passed as sectionIds to useScrollSpy; index in this array breaks ties.
 * @type {string[]}
 */
export const ALL_HUB_SPY_IDS = [
  "system",
  "system-overview",
  "system-allocation",
  "system-research",
  "system-execution",
  "crypto",
  "crypto-trading",
  "crypto-strategy",
  "crypto-optimization",
  "crypto-risk",
  "sports",
  "sports-market",
  "sports-strategy",
  "sports-execution",
  "sports-portfolio",
  "ai-labs",
  "ai-labs-rl-core",
  "ai-labs-agents",
  "ai-labs-simulation",
  "ai-labs-vision",
  "foundation",
  "foundation-infrastructure",
  "foundation-philosophy",
];
