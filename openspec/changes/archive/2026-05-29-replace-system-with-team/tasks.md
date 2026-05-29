# Tasks: Replace System with Team

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | 250-350 |
| 400-line budget risk | Medium |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Medium

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Complete migration and direct navigation | Single PR | Fits under 400-line budget |

## Phase 1: Foundation & Translations

- [x] 1.1 Edit `src/shared/translations.js`: Replace `"system"` with `"rgg-team"` in `NAV_TREE`, add localized profiles for Rodrigo, Mario, Guillermo, and Emiliano under `"rggTeam"`.
- [x] 1.2 Edit `src/shared/hubAnchorMap.js`: Replace `"system"` and children with `"rgg-team"` in `ALL_HUB_SPY_IDS` and `PILLAR_IDS`, clean up outdated `CHILD_TO_PILLAR` mappings.
- [x] 1.3 Edit `src/shared/seoShared.js`: Replace `"RGG Innovation HUB"` with `"RGG Capital"`.

## Phase 2: Navigation Integration

- [x] 2.1 Edit `src/shared/NavDropdown.jsx`: Skip empty menu render if `subItems.length === 0` and smooth scroll to `pillarId` on click.
- [x] 2.2 Edit `src/shared/NavOverlay.jsx`: Handle zero-sub-item click by scrolling directly to `#pillarId` and closing overlay.
- [x] 2.3 Edit `src/shared/NavAccordion.jsx`: Handle zero-sub-item click, scroll directly, and hide sub-menu chevron.

## Phase 3: Layout & Section Implementation

- [x] 3.1 Edit `src/pages/HubLanding.jsx`: Isolate Hero section, replace outdated System subsections with `#rgg-team` section rendering localized leader cards.
- [x] 3.2 Edit `src/shared/layout.css`: Map `#system` styles and scroll offsets to `#rgg-team`.

## Phase 4: Testing & Verification

- [x] 4.1 Edit `e2e/smoke.spec.ts`: Update tests to target `#rgg-team` and verify page loading.
- [x] 4.2 Edit `e2e/refinar-nav.spec.ts`: Update navigation assertions to test direct-scroll behavior on the Team pillar.
- [x] 4.3 Run unit and Playwright tests to verify all tests pass.

## Phase 5: Cleanup

- [x] 5.1 Remove any unused assets or legacy system-specific styles.

