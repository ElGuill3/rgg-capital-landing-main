import { useState, useEffect, useRef } from "react";
import { resolveScrollSpyHierarchy } from "../scrollSpyResolve.js";

const THRESHOLDS = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

export const DEFAULT_NAV_SPY_OFFSET = 122;

function manualIntersectionRatio(el, rootTop) {
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const r = el.getBoundingClientRect();
  if (r.width <= 0 || r.height <= 0) return 0;
  const interTop = Math.max(r.top, rootTop);
  const interLeft = Math.max(r.left, 0);
  const interRight = Math.min(r.right, vw);
  const interBottom = Math.min(r.bottom, vh);
  const w = Math.max(0, interRight - interLeft);
  const h = Math.max(0, interBottom - interTop);
  const interArea = w * h;
  return interArea / (r.width * r.height);
}

/**
 * @param {string[]} sectionIds  All ids to observe (pillar + children, in DOM order).
 * @param {{
 *   enabled?: boolean,
 *   rootTopPx?: number,
 *   rootMargin?: string,
 *   childToPillar?: Map<string, string>,
 *   pillarIds?: Set<string>,
 * }} [options]
 * @returns {{ activePillarId: string | null, activeChildId: string | null }}
 */
export function useScrollSpy(sectionIds, options = {}) {
  const {
    enabled = true,
    rootTopPx = DEFAULT_NAV_SPY_OFFSET,
    rootMargin,
    childToPillar,
    pillarIds,
  } = options;

  const [result, setResult] = useState({ activePillarId: null, activeChildId: null });
  const ratiosRef = useRef(new Map());

  useEffect(() => {
    if (!enabled || !sectionIds?.length) {
      setResult({ activePillarId: null, activeChildId: null });
      return;
    }

    const ids = [...sectionIds];
    const order = new Map(ids.map((id, i) => [id, i]));
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (elements.length === 0) {
      setResult({ activePillarId: null, activeChildId: null });
      return;
    }

    const pickWinner = () => {
      const ratios = ratiosRef.current;
      let bestR = 0;
      const candidates = [];
      for (const id of ids) {
        const r = ratios.get(id) ?? 0;
        if (r > bestR) {
          bestR = r;
          candidates.length = 0;
          candidates.push(id);
        } else if (r > 0 && r === bestR) {
          candidates.push(id);
        }
      }
      if (bestR <= 0) {
        setResult({ activePillarId: null, activeChildId: null });
        return;
      }
      let winner;
      if (candidates.length === 1) {
        winner = candidates[0];
      } else {
        // Tie-breaking: earliest in DOM order (lower index in sectionIds)
        candidates.sort((a, b) => order.get(a) - order.get(b));
        winner = candidates[0];
      }
      setResult(resolveScrollSpyHierarchy(winner, childToPillar, pillarIds));
    };

    const margin = rootMargin ?? `-${rootTopPx}px 0px 0px 0px`;

    const onScroll = () => {
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) ratiosRef.current.set(id, manualIntersectionRatio(el, rootTopPx));
      }
      pickWinner();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (id) ratiosRef.current.set(id, entry.intersectionRatio);
        }
        pickWinner();
      },
      { root: null, rootMargin: margin, threshold: THRESHOLDS },
    );

    for (const el of elements) observer.observe(el);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      observer.disconnect();
    };
  }, [enabled, rootTopPx, rootMargin, sectionIds, childToPillar, pillarIds]);

  return result;
}
