# Proposal: Integrate AWS Cloud Infrastructure Section

## Intent

Integrate the AWS cloud infrastructure ("Powered by AWS") section under the Foundation pillar, highlighting the reliable hosting framework supporting the RGG Hub.

## Scope

### In Scope
- Add translation keys for `rggAws` (`en` and `es`) and register `foundationAws` in `navSub` and `NAV_TREE`.
- Update `hubAnchorMap.js` maps and arrays to enable scroll-spy and correct routing for `foundation-aws`.
- Render `<ContentSection id="foundation-aws" sectionKey="rggAws" alternate />` under the `#foundation` container in `HubLanding.jsx`.

### Out of Scope
- Creating a separate top-level AWS navigation pillar.
- Modifying styling patterns beyond adding standard alternate section backgrounds.

## Capabilities

### New Capabilities
None

### Modified Capabilities
- `foundation`: Extend core foundation specifications to require cloud infrastructure / AWS section behavior.

## Approach

Implement Option A (from exploration) to group AWS hosting logically under the existing Foundation pillar. This preserves the 5-pillar top navigation, prevents clutter, and maintains a consistent visual layout.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `src/pages/HubLanding.jsx` | Modified | Render `ContentSection` with ID `foundation-aws` inside Foundation container. |
| `src/shared/translations.js` | Modified | Add `rggAws` keys and map `foundationAws` under nav structures. |
| `src/shared/hubAnchorMap.js` | Modified | Update scroll-spy lists and parent mapping for `foundation-aws`. |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Scroll-spy mismatch | Low | Validate order of entries in `hubAnchorMap.js` matches DOM rendering sequence exactly. |
| Background inconsistency | Low | Apply `alternate` prop to ensure alternating section background patterns remain unbroken. |

## Rollback Plan

Revert all committed files to the previous stable state via Git:
```bash
git checkout HEAD -- src/pages/HubLanding.jsx src/shared/translations.js src/shared/hubAnchorMap.js
```

## Dependencies

None

## Success Criteria

- [ ] "Powered by AWS" section renders in the DOM with correct translated content (EN/ES).
- [ ] Section correctly highlights in the sub-navigation via Scroll-spy when scrolled into view.
- [ ] Background style alternates correctly between the preceding and following sections.
