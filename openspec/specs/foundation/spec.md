# Foundation Specification

## Purpose

Define the infrastructure, cloud platforms, and guiding philosophies of RGG Capital via systematic navigation, scroll-spy tracking, and localized content.

## Requirements

### Requirement: Foundation Layout & AWS Integration

The landing page MUST render the Foundation container (`#foundation`), containing three sequential sub-sections in exact DOM order:
1. Core Infrastructure (`#foundation-infrastructure`)
2. AWS Infrastructure (`#foundation-aws`)
3. Philosophy (`#foundation-philosophy`)

#### Scenario: Render Foundation sections
- GIVEN the landing page is loaded
- WHEN the `#foundation` container is viewed
- THEN three localized sub-sections are rendered in the correct DOM sequence

### Requirement: Navigation & Scroll-Spy Tracking

The navigation components (desktop dropdown and mobile overlay) MUST include the "AWS Infrastructure" sub-link under the Foundation pillar. The scroll-spy MUST track viewport intersections and highlight the corresponding sub-navigation link sequentially without jumping or flickering.

#### Scenario: Desktop dropdown link click
- GIVEN the desktop dropdown menu is open
- WHEN the user clicks the AWS Infrastructure link
- THEN the page scrolls smoothly to `#foundation-aws`

#### Scenario: Scroll-spy activation on viewport scroll
- GIVEN the user scrolls through the Foundation pillar
- WHEN `#foundation-aws` enters the active intersection threshold
- THEN the AWS sub-navigation link is highlighted as active

### Requirement: i18n Localization

The Foundation pillar and all sub-sections MUST support English (EN) and Spanish (ES) dynamically, localizing tags, titles, lead paragraphs, and bullet points.

#### Scenario: Localization toggle to Spanish
- GIVEN the active language is English
- WHEN the user toggles the language to Spanish
- THEN all Foundation headings and bullets translate instantly to Spanish
