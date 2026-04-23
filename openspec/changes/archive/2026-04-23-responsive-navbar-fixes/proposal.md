# Proposal: Responsive Navbar Fixes

## Context

The RGG Capital landing page navbar and layout were not responsive-friendly. The site had only a binary mobile/desktop breakpoint (767px), hardcoded pixel values throughout, no fluid typography or spacing, and a confusing mobile navigation experience.

## Intent

Improve the mobile and tablet experience of the navbar and layout by:
- Making containers and spacing fluid with `clamp()`
- Replacing JS-driven component switching with CSS media queries
- Implementing a full-screen overlay for mobile navigation
- Fixing navbar height/thickness for mobile
- Improving desktop nav spacing

## Scope

### Included
- `src/shared/styles.js` — fluid clamp() values for spacing/typography
- `src/shared/layout.css` — CSS media queries, overlay styles, mobile margin fix
- `src/shared/Layout.jsx` — hamburger toggle, navbar sizing, nav gap
- `src/shared/NavDropdown.jsx` — desktop pillar spacing
- `src/shared/NavOverlay.jsx` — NEW: full-screen mobile overlay component
- `package.json` — Vite --host for mobile testing

### Excluded
- Logo srcset (requires real @2x/@3x image assets)
- Any backend or API changes
- Testing layer additions

## Approach

1. **Fluid containers**: Replace fixed `maxWidth: 1180` + `padding: 0 24px` with `width: 95%` + `clamp()` padding
2. **Tablet support**: Use `clamp()` for all spacing tokens to cover the 375px–1440px range without explicit tablet breakpoint
3. **CSS nav switch**: Render both NavAccordion and NavDropdown always; show/hide via CSS media queries
4. **Full-screen overlay**: New NavOverlay component with backdrop blur, slide animation, touch-friendly targets
5. **Fluid navbar height**: All navbar dimensions use `clamp()` for proportional scaling
6. **Desktop spacing**: Increase nav gap to `clamp(12px, 3vw, 24px)` maximum for better link separation

## Rollback Plan

All changes are CSS/inline style adjustments and one new component. To rollback:
1. Revert `package.json` script
2. Revert `styles.js` clamp() values to fixed pixels
3. Delete `NavOverlay.jsx`
4. Revert `Layout.jsx` to JS-driven component switching
5. Revert `layout.css` media query and overlay styles
6. Revert `NavDropdown.jsx` font size and padding

## Risks

- **Risk**: CSS `!important` in media query overrides inline JS styles — mitigated by careful ordering
- **Risk**: New NavOverlay component increases bundle size — negligible (small component)
- **Risk**: Tailscale --host exposes dev server on LAN — intended for local testing only
