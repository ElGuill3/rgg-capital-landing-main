# Design: Replace System with Team

## Technical Approach

We will replace the outdated "System / Innovation HUB" section with a dedicated, high-fidelity "Founding Team" section (`#rgg-team`). The landing page hero section will be isolated from any specific pillar, while the first landing navigation pillar will become `#rgg-team`. Both desktop and mobile navigation renderers will be generically extended to support zero-sub-item navigation, allowing the user to click the main pillar to scroll directly to the section without opening empty menus.

## Architecture Decisions

### Decision: Zero-Sub-Item Navigation Implementation

| Option | Tradeoff | Decision |
|--------|----------|----------|
| **Option A**: Hardcode checks for `'rgg-team'` in navigation renderers. | Fragile, couples component logic to specific section names, high maintenance if more pillars change. | *Rejected* |
| **Option B**: Generic check for `subItems.length === 0` in `NavDropdown.jsx`, `NavOverlay.jsx`, and `NavAccordion.jsx`. | Clean, reusable architecture pattern that supports any future pillar without sub-items. | **Chosen** |

**Rationale**: Option B is a generic architecture pattern. It ensures navigation components adapt dynamically based on `NAV_TREE` metadata. If a pillar has zero sub-sections, it inherently behaves as a direct-scroll anchor.

## Data Flow / Navigation Flow

```
[User Click] ──→ Nav Link (NavDropdown/NavOverlay/NavAccordion)
                     │
         ┌───────────┴───────────┐
         ▼                       ▼
 [subItems.length > 0?]   [subItems.length === 0?]
         │                       │
         ▼ (Standard)            ▼ (Direct Scroll)
  Open dropdown/accordion    Intercept click ──→ Scroll to #pillarId
                                               & Close menu/overlay
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/pages/HubLanding.jsx` | Modify | Extracts the hero section as a standalone block. Replaces the four outdated System sub-sections with a dedicated `#rgg-team` section using animated, localized member cards. |
| `src/shared/translations.js` | Modify | Replaces `"system"` with `"rgg-team"` in `NAV_TREE`. Deletes outdated System keys and adds localized names and roles under `"rggTeam"`. |
| `src/shared/hubAnchorMap.js` | Modify | Replaces `"system"` and its child IDs with `"rgg-team"` in `ALL_HUB_SPY_IDS` and `PILLAR_IDS`. Removes System child entries from `CHILD_TO_PILLAR`. |
| `src/shared/NavDropdown.jsx` | Modify | Adds check for `pillar.subItems.length === 0` to omit the dropdown menu rendering and allow direct scroll to `pillar.pillarId` on click. |
| `src/shared/NavOverlay.jsx` | Modify | Intercepts clicks on zero-sub-item pillars to trigger smooth scroll directly to `#pillarId` and close the mobile overlay menu. |
| `src/shared/NavAccordion.jsx` | Modify | Intercepts clicks on zero-sub-item pillars to trigger smooth scroll and hides the sub-menu chevron. |
| `src/shared/layout.css` | Modify | Replaces scroll-margin-top references for `#system` and its children with `#rgg-team`. |
| `src/shared/seoShared.js` | Modify | Updates metadata references from `"RGG Innovation HUB"` to `"RGG Capital"`. |
| `e2e/smoke.spec.ts` | Modify | Updates smoke assertions to target `#rgg-team` instead of `#system`. |
| `e2e/refinar-nav.spec.ts` | Modify | Updates navbar assertions and labels from `"INNOVATION HUB"` to `"FOUNDING TEAM"`. |

## Interfaces / Contracts

The `NAV_TREE` structure in `translations.js` will receive an empty array for `subItems` on the team pillar:

```javascript
{
  pillarId: "rgg-team",
  labelKey: "rggTeam",
  subItems: [],
}
```

The localized translations in `translations.js` will receive the following schema:

```javascript
rggTeam: "FOUNDING TEAM", // "EQUIPO FUNDADOR" in Spanish
// Profile translations
sections: {
  rggTeam: {
    tag: "0 Founding Team",
    title: "Leadership",
    // Member profiles in EN and ES
  }
}
```

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| **Unit** | `scrollSpyResolve.js` | Test that `resolveScrollSpyHierarchy` correctly resolves `"rgg-team"` as an active pillar without any active child. |
| **Integration** | Navigation Renderers | Assert that `NavDropdown` and `NavOverlay` with `subItems: []` do not render empty lists/accordions. |
| **E2E** | Playwright Test Suite | Update `smoke.spec.ts` and `refinar-nav.spec.ts` to assert that clicking `"FOUNDING TEAM"` directly scrolls the viewport to `#rgg-team` and closes the overlay on mobile. |

## Migration / Rollout

No database or data migration required. Zero downtime frontend rollout.

## Open Questions

- None.
