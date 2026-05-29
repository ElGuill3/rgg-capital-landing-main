# Design: Responsive Navbar Fixes

## Architecture Decisions

### 1. Why `clamp()` instead of explicit tablet breakpoint?

The site had only `MOBILE_BP = 767` as a single JS-driven breakpoint. Adding an explicit tablet breakpoint (768-1024px) would require:
- Additional JS state tracking
- More complex responsive logic
- Duplicated styling for a range that `clamp()` covers naturally

**Decision**: Use `clamp()` for all spacing tokens. This provides smooth fluid scaling across the entire viewport range without discrete breakpoints. The only explicit media query is `@media (min-width: 768px)` for the CSS-based nav visibility switch.

**Tradeoff**: `clamp()` works well for linear scaling but cannot handle radical layout shifts. For truly different layouts at tablet (e.g., 3-column → 2-column grids), explicit media queries would still be needed. In this project, the layout is single-column throughout, so `clamp()` is sufficient.

---

### 2. Why CSS-based nav visibility instead of JS component switching?

**Previous approach**: `isMobile ? <NavAccordion /> : <NavDropdown />` — React re-renders and unmounts one component and mounts the other on breakpoint change.

**Problems**:
- `matchMedia` callback adds ~100ms delay on breakpoint crossing
- Component tree remount causes focus loss and state reset
- Both components could never coexist (needed for CSS-only visibility)

**New approach**: Both components render always. CSS controls visibility:
```css
.nav-accordion { display: none; }
.nav-dropdown { display: none; }
@media (min-width: 768px) {
  .nav-accordion { display: none !important; }
  .nav-dropdown { display: flex; }
}
```

**Mobile accordion visibility** is controlled by JS inline style (`style={{ display: isMenuOpen ? "flex" : "none" }}`) because it needs interactive open/close state. The `!important` in the media query ensures desktop always wins.

**Tradeoff**: Both components always exist in the DOM, even when hidden. This is negligible for performance — NavDropdown and NavAccordion are small components.

---

### 3. Why full-screen overlay instead of expandable in-place?

**Argument for expandable in-place**: The navbar grows downward, content is pushed. User doesn't lose the page entirely.

**Why we chose full-screen overlay**:
1. **5 pillars × ~5 subitems = ~25 items**. An expandable accordion would push content very far down, losing scroll context.
2. **Clarity of close action**. With an expandable, "how do I close it?" is ambiguous. Overlay has clear X button and backdrop tap.
3. **Industry standard**. Apple, Stripe, and most premium SaaS marketing sites use full-screen overlays for complex mobile navigation.
4. **Animating height is tricky**. `max-height` transitions cause jumpiness when content changes. Transform-based animations are smoother.

**Tradeoff**: The page content is completely hidden behind the overlay. For simple navs (≤3 items), an expandable would be more elegant.

---

### 4. Navbar height — why `clamp(44px, 10vw, 68px)`?

- **44px**: Apple HIG minimum for touch targets, close to Material Design's 48dp
- **10vw**: Grows ~10% of viewport width (on 375px = 37.5px → rounds to ~44px, close enough)
- **68px**: Original fixed value, used as the ceiling for large viewports

The logo height uses `clamp(28px, 8vw, 48px)` — slightly smaller than the navbar to leave breathing room.

---

### 5. Why `margin-top: 0` on mobile via CSS?

The `header` has `background: transparent`, and `.navRgg__inner` has `margin: clamp(6px, 1.5vw, 10px) auto`. On mobile, the body's background color (or the `html` background) was bleeding through as a visible top stripe above the navbar.

**Fix**: CSS media query sets `margin-top: 0` on mobile, `unset` on desktop. No JS needed.

---

## Sequence Diagram: Mobile Overlay Open/Close

```
User taps hamburger
       │
       ▼
┌──────────────────┐
│  Layout.jsx      │
│  setIsMenuOpen   │
│  (true)          │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  NavOverlay      │
│  isOpen=true    │
│  (CSS class     │
│  .is-open)      │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  CSS transition  │
│  transform:      │
│  translateY(0)   │
│  opacity: 1     │
└──────────────────┘
```

---

## CSS Custom Properties Used

| Property | Source | Used In |
|----------|--------|---------|
| `--rgg-link-accent` | `theme.js` → `t.accent` | Overlay accent colors |
| `--rgg-link-muted` | `theme.js` → `t.textMuted` | Overlay muted text |
| `--font-heading` | `theme.js` → `t.fontHeading` | Pillar button fonts |
| `--font-mono` | `theme.js` → `t.fontMono` | Subitem fonts |
| `--rgg-page-bg` | `theme.js` → `t.bg` | Overlay background |

---

## Accessibility

| Element | A11y Feature |
|---------|---------------|
| Hamburger button | `aria-label="Abrir menú"` / `"Cerrar menú"`, `aria-expanded` |
| NavOverlay | `role="dialog"`, `aria-modal="true"`, `aria-label="Menú de navegación"` |
| Close button | `aria-label="Cerrar menú"` |
| Pillar buttons | `aria-expanded` on subitems expansion |
| Sublinks | Standard anchor with `href="#id"` — scroll behavior natural |
| Focus styles | `.navRgg__sublink:focus-visible` defined in layout.css |

---

## Performance Considerations

- **No external dependencies** added — pure CSS + inline styles
- **NavOverlay** is a single small component — negligible bundle impact
- **SVG icons** are inline — no additional network requests
- **`clamp()`** is CSS-native — no JS polyfills needed
- **Backdrop blur** uses GPU-accelerated `backdrop-filter` — may cause perf issues on low-end Android devices; acceptable for marketing site

---

## Rollback Map

| File | What to Revert |
|------|----------------|
| `package.json` | `"dev": "vite --host"` → `"dev": "vite"` |
| `styles.js` | All clamp() values → fixed pixel values (see git diff) |
| `Layout.jsx` | Remove `isMenuOpen` state + effect, revert nav gap, hamburger logic |
| `layout.css` | Remove overlay styles, nav media queries, `.navRgg__inner` margin rules |
| `NavDropdown.jsx` | Revert font size and padding to original fixed values |
| `NavOverlay.jsx` | DELETE this file entirely |
