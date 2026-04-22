/**
 * Resolución pura: id ganador del spy → estado jerárquico (sin DOM).
 * Debe coincidir con la lógica en useScrollSpy.
 *
 * @param {string | null | undefined} winner
 * @param {Map<string, string> | undefined} childToPillar
 * @param {Set<string> | undefined} pillarIds
 * @returns {{ activePillarId: string | null, activeChildId: string | null }}
 */
export function resolveScrollSpyHierarchy(winner, childToPillar, pillarIds) {
  if (!winner) return { activePillarId: null, activeChildId: null };
  if (childToPillar?.has(winner)) {
    return { activePillarId: childToPillar.get(winner) ?? null, activeChildId: winner };
  }
  if (pillarIds?.has(winner)) {
    return { activePillarId: winner, activeChildId: null };
  }
  if (childToPillar && pillarIds) {
    return { activePillarId: null, activeChildId: null };
  }
  return { activePillarId: winner, activeChildId: null };
}
