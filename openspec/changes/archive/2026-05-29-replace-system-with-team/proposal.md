# Proposal: Replace System with Team

## Intent

Replace the outdated "System / Innovation HUB" pillar with a dedicated, high-fidelity "Founding Team" section to accurately represent the organization's leadership.

## Scope

### In Scope
- Add a new `#rgg-team` (Founding Team) section to `HubLanding.jsx` with animated member cards (Rodrigo, Mario, Guillermo, Emiliano).
- Remove the four outdated `system` sub-sections and related UI content.
- Update `translations.js` (EN/ES) and navigation structure (`NAV_TREE`, `nav`, `navSub`).
- Update `hubAnchorMap.js` (scroll spy) to map `#rgg-team` and handle 0-sub-item pillars.
- Prevent rendering of empty dropdowns/accordions in desktop `NavDropdown.jsx` and mobile `NavOverlay.jsx` for pillars without sub-sections.
- Update metadata in `seoShared.js` from "RGG Innovation HUB" to "RGG Capital".
- Update Playwright specs (`e2e/smoke.spec.ts` and `e2e/refinar-nav.spec.ts`) to assert "Founding Team" selectors instead of "Innovation HUB".

### Out of Scope
- Adding sub-sections or sub-navigation items to the Founding Team pillar.
- Redesigning the main CTA hero landing layout or global theme colors.

## Capabilities

### New Capabilities
- `founding-team`: Leadership showcase capability featuring interactive member cards, localized profiles, and direct-scroll navigation support for pillars with zero sub-items.

### Modified Capabilities
- `system`: Removed and deprecated. All requirements and sub-section mappings are retired.

## Approach

- **Approach 1**: Restructure `HubLanding.jsx` to introduce `#rgg-team` as the first pillar following a standalone hero section.
- Implement click-to-scroll guards in `NavDropdown.jsx` and `NavOverlay.jsx` so empty sub-item pillars directly scroll without triggering empty sub-menus.
- Consolidate scroll-spy mapping via `hubAnchorMap.js` and clean up styling in `layout.css`.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/HubLanding.jsx` | Modified | Removes System sub-sections, adds `#rgg-team` section |
| `src/shared/translations.js` | Modified | Removes system keys, adds `rggTeam` keys (EN/ES), updates `NAV_TREE` |
| `src/shared/hubAnchorMap.js` | Modified | Updates active scroll spy mappings for `#rgg-team` |
| `src/shared/NavDropdown.jsx` | Modified | Adds direct-scroll and empty-panel guard for 0-sub-item pillars |
| `src/shared/NavOverlay.jsx` | Modified | Disables accordion toggle and triggers direct scroll for `#rgg-team` |
| `src/shared/layout.css` | Modified | Adjusts scroll-margin-top, removes old system classes |
| `src/shared/seoShared.js` | Modified | Updates organization metadata JSON-LD references |
| `e2e/` | Modified | Adjusts test assertions to match Founding Team and removed System IDs |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Navigation/Scroll-spy breaks on 0-sub-item pillar | Med | Implement strict conditional rendering guards in desktop/mobile nav |
| E2E test failures | High | Update selectors to target `#rgg-team` and expect Founding Team titles |

## Rollback Plan

To revert the entire change, run:
```bash
git reset --hard HEAD
git clean -fd
```
This discards all working directory modifications and restores the previous repository state.

## Dependencies

- Founding Team assets (`emiliano.png`, `guillermo.png`, `mario.png`, `rodrigo.png`) must exist in `src/assets/`.

## Success Criteria

- [ ] Landing page renders "Founding Team" as the first navigation pillar.
- [ ] Desktop and mobile navigation menus scroll directly to `#rgg-team` on click without displaying empty dropdowns or accordions.
- [ ] Translations display correctly in English and Spanish.
- [ ] All unit and Playwright E2E tests (`npm test`) pass successfully.
