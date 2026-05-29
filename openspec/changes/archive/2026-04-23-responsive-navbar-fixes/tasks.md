# Tasks: Responsive Navbar Fixes

## Phase 1: Foundation

- [x] 1.1 Identify all hardcoded pixel values in `styles.js` (container, navInner, hero, sectionP, card, btnPrimary, btnSecondary)
- [x] 1.2 Replace `maxWidth: 1180` container padding with `width: 95%` + `clamp()` padding
- [x] 1.3 Add `clamp()` values for all major spacing tokens (hero, section, card, buttons)

## Phase 2: Mobile Navbar

- [x] 2.1 Add `isMenuOpen` state + hamburger→X toggle button in `Layout.jsx`
- [x] 2.2 Create `NavOverlay.jsx` full-screen overlay component
- [x] 2.3 Add CSS media query for nav visibility (desktop ≥768px vs mobile <768px)
- [x] 2.4 Add overlay styles to `layout.css` (backdrop, panel, header, items, subitems)
- [x] 2.5 Implement close-on-backdrop-tap and close-on-sublink-click behavior
- [x] 2.6 Add `margin-top: 0` on mobile for navbar inner

## Phase 3: Navbar Sizing

- [x] 3.1 Make navbar `minHeight`, padding, gap, border-radius fluid with `clamp()`
- [x] 3.2 Make logo height fluid with `clamp()`
- [x] 3.3 Increase desktop nav gap to `clamp(12px, 3vw, 24px)` for link separation
- [x] 3.4 Adjust NavDropdown pillar font size to `clamp(11px, 1.5vw, 13px)` and padding to `clamp(4px, 1vw, 6px) clamp(8px, 1.5vw, 14px)`

## Phase 4: Dev Server (Testing)

- [x] 4.1 Add `--host` flag to Vite dev script in `package.json` for Tailscale mobile testing

## Pending

- [ ] P1. Logo srcset — requires @2x and @3x image variants generated from original logo asset
