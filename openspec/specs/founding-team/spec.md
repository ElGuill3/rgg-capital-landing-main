# Founding Team Specification

## Purpose

Showcase the leadership team of RGG Capital using interactive, localized profile cards, and natively support direct-scroll navigation for pillars with zero sub-sections.

## Requirements

### Requirement: Leader Cards Display

The system MUST display four interactive member cards under the Founding Team section (`#rgg-team`) for Rodrigo, Mario, Guillermo, and Emiliano. Each card MUST render their image, name, and role, localized in English and Spanish.

#### Scenario: Display leadership cards on landing
- GIVEN the landing page in English or Spanish
- WHEN the user views the Founding Team section
- THEN four member cards are rendered with image, name, and role

### Requirement: Zero-Sub-Item Navigation

The navigation components (desktop `NavDropdown.jsx` and mobile `NavOverlay.jsx`) MUST handle pillars with zero sub-sections natively:
1. If a pillar has zero subItems, the desktop dropdown MUST NOT render or display an empty dropdown panel.
2. Clicking the pillar in desktop navigation MUST directly scroll to the pillar's anchor link.
3. Clicking the pillar in mobile navigation MUST directly scroll to the pillar's anchor link and close the overlay menu.

#### Scenario: Interaction with zero-sub-item pillar on desktop
- GIVEN a pillar with zero subItems in desktop navigation
- WHEN the user hovers or clicks the pillar
- THEN no dropdown panel renders and the viewport scrolls directly to the pillar's anchor link

#### Scenario: Interaction with zero-sub-item pillar on mobile
- GIVEN a pillar with zero subItems in mobile NavOverlay
- WHEN the user clicks the pillar link
- THEN the viewport scrolls directly to the anchor link and the mobile NavOverlay closes

### Requirement: Automated Validation

The unit and Playwright E2E tests MUST assert that the Founding Team section exists, has appropriate headings, and handles zero-sub-item navigation clicks correctly.

#### Scenario: Execution of automated tests
- GIVEN the landing page and navigation components
- WHEN the test runner executes Node.js unit and Playwright E2E tests
- THEN assertions verify section existence, heading, cards, and zero-sub-item scroll behavior
