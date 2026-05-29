# Tasks: Integrate AWS Section

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~70-120 lines |
| 400-line budget risk | Low |
| Chained PRs recommended | No |
| Suggested split | Single PR |
| Delivery strategy | ask-on-risk |
| Chain strategy | size-exception |

Decision needed before apply: No
Chained PRs recommended: No
Chain strategy: size-exception
400-line budget risk: Low

## Phase 1: Foundation / Infrastructure (translations.js & hubAnchorMap.js)

- [x] 1.1 RED: Add unit tests in `src/shared/translations.test.mjs` verifying missing `rggAws` key, and `src/shared/hubAnchorMap.test.mjs` verifying missing `foundation-aws` anchor key.
- [x] 1.2 GREEN: Implement translations addition (`rggAws`) in `src/shared/translations.js` and update key map in `src/shared/hubAnchorMap.js` to include `foundation-aws`. Ensure tests pass.
- [x] 1.3 REFACTOR: Review imports, clean up and refactor variables for foundation updates in `src/shared/translations.js` and `src/shared/hubAnchorMap.js`.

## Phase 2: Core Implementation (HubLanding.jsx rendering)

- [x] 2.1 RED: Write E2E test in `e2e/refinar-nav.spec.ts` or `e2e/smoke.spec.ts` asserting presence of `foundation-aws` section and verifying scrollspy navigates target correctly.
- [x] 2.2 GREEN: Implement the new AWS `ContentSection` in `src/pages/HubLanding.jsx` using translations, correct alternating props, and verifying the `foundation-aws` section renders.
- [x] 2.3 REFACTOR: Clean up JSX formatting and refactor rendering logic in `src/pages/HubLanding.jsx` for readability.

## Phase 3: Testing & Verification

- [x] 3.1 Run unit tests (`npm run test` or equivalent) to confirm translations and anchor maps are validated.
- [x] 3.2 Run E2E tests (`npx playwright test`) to verify section scrollspy and visual rendering are flawless.
- [x] 3.3 Run production build (`npm run build`) to ensure no bundling or syntax errors exist.

## Phase 4: Cleanup & Documentation

- [x] 4.1 Perform git sanity check (`git status` and `git diff`) to ensure only scoped files are altered.
- [x] 4.2 Verify JSDoc/inline code comments are accurate, clean, and in English.
