## Exploration: replace-system-with-team

### Current State
Currently, the landing page has a primary "System" or "Innovation HUB" pillar (`#system`), which is the first menu item and contains sections for `system-overview`, `system-allocation`, `system-research`, and `system-execution`. In `translations.js`, these are mapped under `system`, with headings, subheadings, and bullet points in both English and Spanish. E2E tests and scroll-spy utilities also heavily rely on these specific IDs.

### Affected Areas
- `src/pages/HubLanding.jsx` — Need to remove the System-specific overview, allocation, research, and execution sub-sections, while preserving the top Hero introductory section. Insert the new `rgg-team` (Founding Team) section with animated member cards (Rodrigo, Mario, Guillermo, Emiliano) imported from assets.
- `src/shared/translations.js` — Update `NAV_TREE`, `nav` labels, `navSub` subtitles, and sections metadata for both `en` and `es` configurations. This means removing all `system`-related translation keys and introducing the new `rggTeam` keys.
- `src/shared/hubAnchorMap.js` — Update the single source of truth for the scroll spy. Map the new `#rgg-team` section to `rgg-team` pillar, remove old child-to-pillar mappings, and adjust `PILLAR_IDS` and `ALL_HUB_SPY_IDS`.
- `src/shared/NavDropdown.jsx` (desktop) & `src/shared/NavOverlay.jsx` (mobile) — Improve handling for pillars with empty sub-items (like the new `rgg-team` pillar). If a pillar has no sub-sections, it should not render an empty dropdown menu panel (desktop) and should directly scroll to the pillar section on click (both desktop and mobile) rather than toggling empty accordion panels.
- `src/shared/layout.css` — Adjust `scroll-margin-top` for the new `#rgg-team` section and clean up system-related IDs.
- `src/shared/seoShared.js` — Update metadata functions to use "RGG Capital" instead of "RGG Innovation HUB" in organization and website JSON-LD mappings.
- `e2e/smoke.spec.ts` & `e2e/refinar-nav.spec.ts` — Update selector references (e.g., from `INNOVATION HUB` or `#system` to `FOUNDING TEAM` / `#rgg-team`) and assert against updated pillar structure.

### Approaches
1. **Approach 1: Single Top-Level Team Section with Standalone Hero** — Restructure the top of `HubLanding.jsx` to have a dedicated `#hero` section at the top of the page, followed by a standalone `#rgg-team` section as the first landing pillar. Update navigation components to handle pillars with 0 sub-items natively.
   - Pros: Preserves the essential hero introductory CTA, provides a clean layout, avoids empty sub-menus, and accurately represents the founding team.
   - Cons: Requires minor layout and navigation updates to support 0-sub-item pillars.
   - Effort: Medium

### Recommendation
Adopt **Approach 1**. It delivers a high-fidelity rendering of the founding team exactly as implemented in the alternative project, while preserving the critical landing hero introductory section, and seamlessly updates the navigation and scroll-spy components to handle empty sub-items cleanly.

### Risks
- **Navigation/Scroll-Spy Sync**: Removing multi-level child sections in the first pillar could cause rendering or runtime spy issues if components assume every pillar has sub-items. We must implement proper guards in `NavDropdown` and `NavOverlay` to handle empty `subItems` collections.
- **E2E Test Breakages**: Changing the landing structure will break assertions that look for "INNOVATION HUB" or specific system IDs. All navigation and smoke tests must be updated to expect the new "Founding Team" structure.

### Ready for Proposal
Yes — and the orchestrator should tell the user that we are ready to move to the Proposal/Spec phase with a complete plan on replacing the System pillar with the Founding Team section, including all translation, navigation, and E2E test updates.
