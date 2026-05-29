## Exploration: Integrating "Powered by AWS" section (2026-05-29-integrate-aws-section)

### Current State
- The landing page in `rgg-capital-landing-main` (the main repository) is divided into 5 main pillars/sections: `Founding Team` (`rgg-team`), `Crypto` (`crypto`), `Sports` (`sports`), `AI Labs` (`ai-labs`), and `Foundation` (`foundation`).
- The `Foundation` pillar (`#foundation` section) currently has two subitems: Core Infrastructure (`#foundation-infrastructure` / `infrastructure` key) and Philosophy (`#foundation-philosophy` / `philosophy` key).
- In the other project (`rgg-capital-landing`), there is an existing `rggAws` section under `rgg-capital` pillar (which is structured differently as an overall parent pillar). It uses section key `"rggAws"` and ID `"rgg-aws"`.
- In `rgg-capital-landing-main`, `rggAws` translations and components are not yet integrated.
- Custom navigation, scroll spying, and language switching are fully dynamic and rely on `src/shared/translations.js` (`NAV_TREE`, `navSub`, `sections` in both `en` and `es` blocks) and `src/shared/hubAnchorMap.js` (`CHILD_TO_PILLAR`, `PILLAR_IDS`, `ALL_HUB_SPY_IDS`).

### Affected Areas
- `src/shared/translations.js` — Needs the addition of the `rggAws` translation content in both `en` and `es` blocks, updating `NAV_TREE` with the new sub-item mapping, and adding `foundationAws` to `navSub`.
- `src/shared/hubAnchorMap.js` — Needs updating `CHILD_TO_PILLAR` map and `ALL_HUB_SPY_IDS` list to include the new section, ensuring proper scroll spying and active state highlighting.
- `src/pages/HubLanding.jsx` — Needs the addition of `<ContentSection id="foundation-aws" sectionKey="rggAws" alternate />` within the `#foundation` section.
- `src/shared/hubAnchorMap.test.mjs` — Test suite might need verification to ensure no side effects.

### Approaches
1. **Option A: Integrate as a subitem of the `foundation` pillar**
   - **Description**: Add the AWS section as a subitem of `foundation` (e.g. `id="foundation-aws"`, `sectionKey="rggAws"`), placed within the `<section id="foundation">` alongside `foundation-infrastructure` and `foundation-philosophy`.
   - **Pros**:
     - *Cohesive grouping*: AWS is physical/cloud infrastructure, fitting perfectly under the `foundation` (Infrastructure & Philosophy) pillar.
     - *Clean navigation*: Avoids adding another top-level nav item, preserving the established five-pillar layout.
     - *Design balance*: Keeps the landing page balanced, ending on a strong, concrete description of the system's hosting infrastructure.
   - **Cons**:
     - *Longer section*: Extends the `foundation` pillar with a third subitem, making it the longest-scrolling section on the page.
   - **Effort**: Low

2. **Option B: Standalone top-level section / separate pillar**
   - **Description**: Add `rggAws` as a standalone top-level section/pillar on the landing page (similar to the Founding Team section), giving it its own top-level entry in `NAV_TREE` and `PILLAR_IDS`.
   - **Pros**:
     - *Prominence*: Gives AWS maximum visibility as its own independent entity.
     - *Clarity*: Keeps the `foundation` pillar strictly focused on internal custom code infrastructure and philosophy.
   - **Cons**:
     - *Cluttered navigation*: Adds a 6th pillar to the top bar, which is already dense.
     - *Inconsistent conceptual level*: "Powered by AWS" is a technology provider, not a functional business pillar like "Crypto Fund", "Sports", or "AI Labs".
   - **Effort**: Medium

### Recommendation
Option A (Integrate as a subitem of the `foundation` pillar) is highly recommended. It maintains the conceptual integrity of the landing page, keeps the primary navigation uncluttered, and groups cloud infrastructure logically next to custom core infrastructure.

### Risks
- **Navigation/Scroll-Spy alignment**: Ensure `ALL_HUB_SPY_IDS` and `CHILD_TO_PILLAR` are in precise DOM order. If they don't match, scroll-spy highlights might jump or misbehave.
- **Alternating Backgrounds**: In `HubLanding.jsx`, standard and alternate sections alternate backgrounds (`t.bg` vs `t.bgAlt`). The AWS section must be styled with the correct alternate prop to avoid consecutive sections with identical backgrounds.

### Ready for Proposal
Yes — We have explored both options thoroughly, identified the exact files and lines to modify, and extracted the exact translation content and layout structure from the fallback project. We are ready to propose Option A as the implementation path.
