# Spec: Responsive Navbar Fixes

## Overview

Improves mobile/tablet experience of the RGG Capital landing navbar and layout through fluid CSS values and a full-screen mobile navigation overlay.

---

## Domain: Layout & Navigation

### Requirement: Fluid Container

Containers SHALL use fluid `width: 95%` with `clamp()`-based horizontal padding instead of fixed pixel values.

**Rationale**: Prevents layout overflow on viewports narrower than the container's max-width.

---

### Requirement: Fluid Spacing Tokens

All major spacing tokens (hero padding, section padding, card padding, button padding, font sizes) SHALL use `clamp()` to scale smoothly from 375px to 1440px+ viewports.

**Rationale**: The previous mobile/desktop-only binary approach left tablet (768–1024px) users with a poor experience.

---

### Requirement: Mobile Nav Overlay

The mobile navigation SHALL be a full-screen overlay triggered by a hamburger button, not an inline accordion.

**The overlay SHALL:**
- Appear as a slide-down panel from the top of the viewport
- Use `backdrop-filter: blur(4px)` with a semi-transparent dark backdrop
- Include a header with logo + close (X) button
- Display pillars as large touch-friendly buttons (minimum 44×44px touch target per Apple HIG)
- Expand subitems on pillar tap with smooth `max-height` animation
- Close when: X button is tapped, backdrop is tapped, or a sublink is tapped

**The hamburger button SHALL:**
- Display as an SVG icon (not a Unicode character)
- Transform into an X icon when the menu is open
- Have correct `aria-label` ("Abrir menú" / "Cerrar menú") and `aria-expanded` state

**Rationale**: Full-screen overlays are the industry standard for complex navigation on mobile. Inline accordions lack sufficient affordance.

---

### Requirement: Navbar Mobile Height

The navbar `minHeight`, vertical padding, logo height, border-radius, and icon sizes SHALL use `clamp()` to be proportional on mobile.

**Rationale**: A fixed 68px navbar looks visually heavy on small screens. Fluid sizing makes it feel lightweight.

---

### Requirement: Desktop Nav Spacing

On viewports ≥768px, the nav links SHALL have a minimum horizontal gap of 24px between items.

**Rationale**: The previous gap of 14px maximum was insufficient, making links feel cramped on desktop.

---

### Requirement: CSS-Based Responsive Nav (No JS Component Switching)

Both `NavDropdown` and `NavAccordion` SHALL always be rendered. CSS media queries SHALL control which is visible at each viewport size.

**The navbar SHALL:**
- Hide `.nav-dropdown` and show `.nav-accordion` on viewports <768px
- Hide `.nav-accordion` and show `.nav-dropdown` on viewports ≥768px
- Have `margin-top: 0` on the navbar inner on mobile to prevent a visible top stripe

**Rationale**: Rendering both components and toggling visibility via CSS is more performant than JS-driven component replacement. The navbar height fix prevents the body background from bleeding through as a top stripe.

---

### Requirement: Vite Host Binding for Mobile Testing

The dev server SHALL listen on all network interfaces (`--host`) to enable mobile testing over Tailscale VPN.

**Rationale**: Developers need to preview on physical devices during responsive development.

---

## Scenarios

### Scenario: Mobile user opens navbar
- **Given**: User is on mobile (<768px viewport)
- **When**: User taps the hamburger icon
- **Then**: Full-screen overlay slides down from top with backdrop blur active
- **And**: Hamburger icon transforms into X icon
- **And**: Overlay displays logo + close button at top, pillar list below

### Scenario: Mobile user closes navbar
- **Given**: Mobile navbar overlay is open
- **When**: User taps the X button OR taps the backdrop
- **Then**: Overlay slides up and disappears
- **And**: Backdrop fades out
- **And**: X icon transforms back into hamburger icon

### Scenario: Mobile user navigates to a pillar subitem
- **Given**: Mobile navbar overlay is open
- **When**: User taps a pillar button
- **Then**: Subitems expand below the pillar with smooth animation
- **When**: User taps a subitem link
- **Then**: Overlay closes
- **And**: Page scrolls to the target anchor

### Scenario: Desktop user views navbar
- **Given**: User is on desktop (≥768px viewport)
- **When**: Page loads
- **Then**: Navbar displays with dropdown-style navigation visible
- **And**: Nav links have ≥24px horizontal spacing
- **And**: No hamburger button is visible

### Scenario: Navbar margin on mobile
- **Given**: User is on mobile (<768px viewport)
- **When**: Page loads
- **Then**: Navbar inner has no top margin (flush to viewport top)
- **And**: No body-color stripe is visible above the navbar

---

## Files

| File | Role |
|------|------|
| `src/shared/styles.js` | Fluid clamp() spacing tokens |
| `src/shared/layout.css` | CSS media queries, overlay styles, mobile margin |
| `src/shared/Layout.jsx` | Hamburger toggle, navbar sizing, nav gap |
| `src/shared/NavDropdown.jsx` | Desktop pillar font size and spacing |
| `src/shared/NavOverlay.jsx` | Full-screen mobile overlay (NEW) |
| `package.json` | Vite --host flag |

---

## Pending

- **Logo srcset**: Requires `@2x` and `@3x` image variants to be generated from the original logo asset. The `srcset` attribute is prepared but variants do not yet exist in `src/assets/`.
