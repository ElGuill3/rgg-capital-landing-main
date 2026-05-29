# Design: Integrate AWS Section

## Technical Approach

We will integrate the AWS Infrastructure section into the `foundation` pillar as a sub-item, below the Core Infrastructure section and above the Philosophy section. This maintains semantic clarity, prevents top-navigation clutter, and allows smooth navigation within the Foundation group. The section will use the translation key `rggAws` and the DOM ID `#foundation-aws`.

## Architecture Decisions

| Option | Tradeoff | Decision |
|--------|----------|----------|
| Position AWS under Foundation | + Maintains clean top-navigation semantics<br>- Minor layout adjustments within the pillar | **Chosen**: Positions AWS after Core Infrastructure and before Philosophy. |
| Map `foundation-aws` in Scroll-Spy | + Prevents scroll-spy jumping and ensures correct active highlights<br>- Requires strict DOM-matching order | **Chosen**: Insert in `CHILD_TO_PILLAR` and `ALL_HUB_SPY_IDS` in exact DOM sequence. |
| Alternate Section Backgrounds | + Visually distinguishes consecutive blocks<br>- Requires disabling `alternate` on Core Infrastructure to alternate correctly | **Chosen**: Set `foundation-infrastructure` as default, `foundation-aws` as `alternate`, and `foundation-philosophy` as default. |

## Data Flow

Data moves from `siteConfig`/`translations` into the shared layout and navigation components, which resolve the active child using `useScrollSpy` via `ALL_HUB_SPY_IDS` order:

    translations.js (NAV_TREE / rggAws) ──→ HubLanding.jsx (<ContentSection>)
                                                       │
                                                 (Scroll Event)
                                                       │
                                                       ▼
    useScrollSpy ──→ ALL_HUB_SPY_IDS ──→ Active Link/Button highlighted (nav)

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `src/shared/translations.js` | Modify | Add `foundationAws` key to English and Spanish `navSub`, update Philosophy numbers to 6, add `rggAws` to English and Spanish `sections` keys, renumber philosophy sections, and insert `foundation-aws` sub-item in `NAV_TREE`. |
| `src/shared/hubAnchorMap.js` | Modify | Map `foundation-aws` to parent `foundation` in `CHILD_TO_PILLAR` map and insert `"foundation-aws"` inside `ALL_HUB_SPY_IDS` array in DOM order. |
| `src/pages/HubLanding.jsx` | Modify | Remove `alternate` from `foundation-infrastructure` section, render `<ContentSection id="foundation-aws" sectionKey="rggAws" alternate />`, and keep `foundation-philosophy` without `alternate`. |

## Interfaces / Contracts

No new interfaces are created. We extend existing key maps:
- `NAV_TREE` subItems type signature remains: `{ id: string, labelKey: string }`.
- `CHILD_TO_PILLAR` map mapping: `string` (child section id) ──→ `string` (parent pillar id).
- `ALL_HUB_SPY_IDS` sequence: `string[]`.

## Testing Strategy

| Layer | What to Test | Approach |
|-------|-------------|----------|
| Unit | `translations.js` | Assert `NAV_TREE` contains the `foundation-aws` sub-item under `foundation` and translations contain `rggAws`. |
| Unit | `hubAnchorMap.js` | Assert `CHILD_TO_PILLAR` maps `foundation-aws` to `foundation`, and `ALL_HUB_SPY_IDS` contains `foundation-aws`. |
| E2E | Scroll-Spy & Rendering | Playwright test to verify `#foundation-aws` is rendered and correct scroll-spy highlighting sequence transitions seamlessly. |

## Migration / Rollout

No migration required.

## Open Questions

- None
