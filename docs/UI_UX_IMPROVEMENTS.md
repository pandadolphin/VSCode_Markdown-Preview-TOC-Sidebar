# UI/UX Improvements - Feature Requirements Document

**Project**: Markdown Preview - TOC Sidebar
**Document Version**: 1.0
**Date**: 2025-10-04
**Status**: Proposal

---

## Table of Contents

- [Overview](#overview)
- [Priority Matrix](#priority-matrix)
- [High Priority Features](#high-priority-features)
  - [Feature 1: Active Section Highlighting](#feature-1-active-section-highlighting)
  - [Feature 2: Better Visual Hierarchy](#feature-2-better-visual-hierarchy)
  - [Feature 3: Improved Hover States](#feature-3-improved-hover-states)
  - [Feature 4: Better Spacing](#feature-4-better-spacing)
- [Medium Priority Features](#medium-priority-features)
  - [Feature 5: Smooth Scrolling](#feature-5-smooth-scrolling)
  - [Feature 6: Collapsible Sections](#feature-6-collapsible-sections)
  - [Feature 7: Visual Polish](#feature-7-visual-polish)
- [Low Priority Features](#low-priority-features)
  - [Feature 8: Search/Filter](#feature-8-searchfilter)
  - [Feature 9: Progress Indicator](#feature-9-progress-indicator)
  - [Feature 10: Keyboard Navigation](#feature-10-keyboard-navigation)

---

## Overview

This document outlines proposed UI/UX improvements for the Markdown Preview TOC Sidebar extension. Each feature includes detailed requirements, acceptance criteria, technical considerations, and estimated effort.

**Goals**:
- Improve navigation and discoverability
- Enhance visual clarity and hierarchy
- Reduce cognitive load for users
- Maintain performance and accessibility

---

## Priority Matrix

| Priority | Feature | Impact | Effort | Status |
|----------|---------|--------|--------|--------|
| **High** | Active Section Highlighting | High | Medium | 📋 Proposed |
| **High** | Better Visual Hierarchy | High | Low | 📋 Proposed |
| **High** | Improved Hover States | Medium | Low | 📋 Proposed |
| **High** | Better Spacing | Medium | Low | 📋 Proposed |
| **Medium** | Smooth Scrolling | Medium | Low | 📋 Proposed |
| **Medium** | Collapsible Sections | High | High | 📋 Proposed |
| **Medium** | Visual Polish | Medium | Medium | 📋 Proposed |
| **Low** | Search/Filter | High | High | 📋 Proposed |
| **Low** | Progress Indicator | Low | Medium | 📋 Proposed |
| **Low** | Keyboard Navigation | Medium | Medium | 📋 Proposed |

---

## High Priority Features

### Feature 1: Active Section Highlighting

**Priority**: High
**Impact**: High
**Effort**: Medium

#### Description
Automatically highlight the current section in the TOC as the user scrolls through the document. This provides visual feedback about the user's current location.

#### User Story
*As a user reading a long document, I want to see which section I'm currently viewing in the TOC, so I can easily track my position in the document.*

#### Requirements

**Functional Requirements**:
1. Detect which header is currently in the viewport
2. Highlight the corresponding TOC item with visual distinction
3. Auto-scroll the TOC to keep the active item visible
4. Update highlighting in real-time as user scrolls
5. Clear highlighting when no section is in view

**Visual Design**:
- Active item should have:
  - Colored left border (3px, using VSCode theme accent color)
  - Slightly darker background
  - Bold font weight
  - Different text color (brighter/accent color)

#### Acceptance Criteria

- [ ] TOC highlights correct section as user scrolls
- [ ] Highlighting updates within 100ms of scroll
- [ ] Active item auto-scrolls into view in TOC
- [ ] Works with all heading levels (h1-h6)
- [ ] No performance degradation on long documents (100+ headings)
- [ ] Highlighting persists when clicking TOC links

#### Technical Considerations

**Implementation**:
- Use `IntersectionObserver` API for performance
- Track all headers with unique IDs
- Add/remove `.active` class on TOC items
- Implement debouncing to prevent excessive updates

**Files to Modify**:
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Add scroll observer logic
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Add `.active` styles

**Potential Issues**:
- Multiple headers in viewport (choose topmost)
- Performance with 200+ headers (throttle observer)
- Nested sections (highlight parent and child)

#### Localization
No new strings required.

---

### Feature 2: Better Visual Hierarchy

**Priority**: High
**Impact**: High
**Effort**: Low

#### Description
Improve the visual distinction between heading levels to make document structure immediately scannable.

#### User Story
*As a user browsing a document, I want to quickly understand the document structure by looking at the TOC, so I can find relevant sections faster.*

#### Requirements

**Functional Requirements**:
1. Apply different font weights for different heading levels
2. Use color gradients for hierarchy (h1 darkest → h6 lightest)
3. Adjust font sizes for better scanning
4. Maintain consistency with VSCode theme

**Visual Design**:
- **H1**: Bold (600), 1rem, theme foreground color
- **H2**: Semi-bold (500), 0.95rem, 90% opacity
- **H3**: Medium (400), 0.9rem, 80% opacity
- **H4-H6**: Regular (400), 0.85rem, 70% opacity

#### Acceptance Criteria

- [ ] Clear visual distinction between all heading levels
- [ ] Font sizes remain readable (minimum 0.75rem)
- [ ] Color contrast meets WCAG AA standards
- [ ] Hierarchy visible in both light and dark themes
- [ ] No text overflow or wrapping issues

#### Technical Considerations

**Implementation**:
- Add CSS classes for each heading level
- Use CSS custom properties for theme integration
- Tag TOC items with heading level during generation

**Files to Modify**:
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Add hierarchy styles
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Add level classes to TOC items

**Potential Issues**:
- Theme compatibility (test with multiple VSCode themes)
- Long headings with smaller fonts (ensure readability)

#### Localization
No new strings required.

---

### Feature 3: Improved Hover States

**Priority**: High
**Impact**: Medium
**Effort**: Low

#### Description
Add clear, responsive hover feedback to improve interactivity and discoverability.

#### User Story
*As a user navigating the TOC, I want immediate visual feedback when hovering over items, so I know they're clickable and where my cursor is.*

#### Requirements

**Functional Requirements**:
1. Show hover state on entire TOC item row (not just link)
2. Add subtle animation on hover
3. Increase visual contrast on hover
4. Maintain accessibility (focus states for keyboard navigation)

**Visual Design**:
- Background color change (subtle, theme-aware)
- Text color brightening
- Smooth transition (150ms)
- Optional: slight left padding increase

#### Acceptance Criteria

- [ ] Hover state visible on all TOC items
- [ ] Hover covers full width of TOC item
- [ ] Smooth transition animation
- [ ] Cursor changes to pointer
- [ ] Focus state matches hover state for keyboard users
- [ ] Works with dark and light themes

#### Technical Considerations

**Implementation**:
- CSS `:hover` and `:focus` pseudo-classes
- Use VSCode theme variables for colors
- Add `transition` property for smoothness

**Files to Modify**:
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Add hover styles

**Potential Issues**:
- Conflicting with active state (ensure active has higher priority)
- Touch devices (consider `:active` state)

#### Localization
No new strings required.

---

### Feature 4: Better Spacing

**Priority**: High
**Impact**: Medium
**Effort**: Low

#### Description
Improve readability and reduce visual fatigue by optimizing spacing throughout the TOC.

#### User Story
*As a user with a long reading session, I want the TOC to be comfortable to read, so I can navigate without eye strain.*

#### Requirements

**Functional Requirements**:
1. Increase line-height for better readability
2. Add padding between major sections
3. Improve spacing around TOC header
4. Maintain compact layout (don't waste space)

**Visual Design**:
- Line height: 1.6 (currently ~1.2)
- Padding between top-level items: 8px
- Padding around "Table of Contents" header: 12px vertical
- Left padding for nested items: 16px per level

#### Acceptance Criteria

- [ ] Line height improves readability
- [ ] Clear separation between major sections
- [ ] No excessive whitespace (TOC fits reasonably)
- [ ] Nested items clearly indented
- [ ] Spacing consistent across all heading levels

#### Technical Considerations

**Implementation**:
- Update CSS spacing values
- Test with documents of varying lengths

**Files to Modify**:
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Update spacing

**Potential Issues**:
- Very long documents may require more scrolling
- Balance between comfort and information density

#### Localization
No new strings required.

---

## Medium Priority Features

### Feature 5: Smooth Scrolling

**Priority**: Medium
**Impact**: Medium
**Effort**: Low

#### Description
Add smooth scroll animation when clicking TOC links for better UX and context.

#### User Story
*As a user clicking on a TOC link, I want to see smooth scrolling to the target section, so I can maintain context and orientation.*

#### Requirements

**Functional Requirements**:
1. Animate scroll when TOC link is clicked
2. Scroll duration: 300-500ms
3. Account for any fixed headers
4. Cancel animation if user scrolls manually

**Visual Design**:
- Smooth easing function (ease-in-out)
- Target position: top of viewport with small offset

#### Acceptance Criteria

- [ ] Smooth scroll works on all TOC links
- [ ] Animation duration feels natural (not too fast/slow)
- [ ] User can interrupt scroll by scrolling manually
- [ ] Target section ends up in viewport
- [ ] Works across different document lengths

#### Technical Considerations

**Implementation**:
- Use `scrollIntoView({ behavior: 'smooth' })`
- Or implement custom scroll animation
- Add offset calculation for proper positioning

**Files to Modify**:
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Add click handler with smooth scroll

**Potential Issues**:
- Browser compatibility (most modern browsers support)
- Performance on very long documents

#### Localization
No new strings required.

---

### Feature 6: Collapsible Sections

**Priority**: Medium
**Impact**: High
**Effort**: High

#### Description
Allow users to expand/collapse sections in the TOC to focus on relevant parts of long documents.

#### User Story
*As a user navigating a very long document with many sections, I want to collapse sections I'm not interested in, so I can focus on relevant content.*

#### Requirements

**Functional Requirements**:
1. Add expand/collapse icons next to parent items
2. Click icon to toggle section visibility
3. Persist collapsed state in LocalStorage
4. Show/hide child items smoothly
5. Default state: all expanded

**Visual Design**:
- Icon: ▶ (collapsed) / ▼ (expanded)
- Icon position: left of heading text
- Smooth expand/collapse animation (200ms)
- Collapsed items hide all descendants

#### Acceptance Criteria

- [ ] All parent items have expand/collapse icons
- [ ] Clicking icon toggles children visibility
- [ ] Animation is smooth and performant
- [ ] State persists across preview reloads
- [ ] Keyboard accessible (Space/Enter to toggle)
- [ ] Works with nested hierarchies (h1 > h2 > h3)

#### Technical Considerations

**Implementation**:
- Track parent-child relationships during TOC generation
- Add toggle buttons to parent items
- Use CSS transitions for smooth collapse
- Store state as JSON in LocalStorage

**Files to Modify**:
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Add toggle logic, state management
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Add collapse animations

**Potential Issues**:
- Complex state management with deep nesting
- Active section in collapsed parent (auto-expand?)
- LocalStorage key conflicts with other extensions

#### Localization

New strings needed:
- `expandSection`: "Expand section"
- `collapseSection`: "Collapse section"

---

### Feature 7: Visual Polish

**Priority**: Medium
**Impact**: Medium
**Effort**: Medium

#### Description
Enhance overall visual appeal with professional styling touches.

#### User Story
*As a user, I want the TOC to feel polished and integrated with VSCode, so my experience is cohesive and professional.*

#### Requirements

**Functional Requirements**:
1. Style hamburger button with proper hover/active states
2. Add subtle separator between TOC and content
3. Improve TOC header styling
4. Add depth with subtle shadows
5. Round corners where appropriate

**Visual Design**:
- Button: Rounded corners, hover background, active state
- Separator: 1px border using theme divider color
- Header: Bottom border, slightly larger font
- Shadow: Subtle box-shadow on sidebar (optional)
- Border radius: 4px for buttons

#### Acceptance Criteria

- [ ] Toggle button has clear visual states
- [ ] TOC visually separated from content
- [ ] Header stands out as title
- [ ] Overall appearance feels modern and cohesive
- [ ] Respects VSCode theme colors

#### Technical Considerations

**Implementation**:
- Update CSS with enhanced styling
- Use VSCode CSS variables for theming
- Test with multiple VSCode themes

**Files to Modify**:
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Enhanced styling

**Potential Issues**:
- Theme compatibility (test light/dark/high contrast)
- Maintaining minimalist design

#### Localization
No new strings required.

---

## Low Priority Features

### Feature 8: Search/Filter

**Priority**: Low
**Impact**: High
**Effort**: High

#### Description
Add search functionality to filter TOC items by keyword.

#### User Story
*As a user with a document containing 100+ sections, I want to search the TOC to quickly find specific topics.*

#### Requirements

**Functional Requirements**:
1. Add search input at top of TOC
2. Filter TOC items as user types
3. Highlight matching text
4. Show count of matches
5. Clear search with ESC or clear button

**Visual Design**:
- Search box: below "Table of Contents" header
- Matching items: highlighted with background
- Non-matching: hidden or dimmed
- Match count: "3 matches" below search box

#### Acceptance Criteria

- [ ] Search filters TOC in real-time
- [ ] Matching text is highlighted
- [ ] Match count is accurate
- [ ] ESC clears search and shows all items
- [ ] Search is case-insensitive
- [ ] Works with non-English characters

#### Technical Considerations

**Implementation**:
- Add input element to TOC header
- Filter items using `filter()` or CSS classes
- Use fuzzy matching for better UX
- Debounce search input (300ms)

**Files to Modify**:
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Add search logic
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Search UI styles

**Potential Issues**:
- Performance with 500+ headings
- Search box takes up space
- Accessibility (announce match count)

#### Localization

New strings needed:
- `searchPlaceholder`: "Search headings..."
- `matchCount`: "{count} matches" / "1 match" / "No matches"
- `clearSearch`: "Clear search"

---

### Feature 9: Progress Indicator

**Priority**: Low
**Impact**: Low
**Effort**: Medium

#### Description
Show reading progress to help users track their position in the document.

#### User Story
*As a user reading through a long document, I want to see my reading progress, so I know how much content remains.*

#### Requirements

**Functional Requirements**:
1. Show current section number (e.g., "Section 3 of 10")
2. Or show progress bar at top of TOC
3. Update as user scrolls
4. Count top-level sections only (h1 or h2)

**Visual Design**:
- Option A: Text indicator below header
- Option B: Progress bar (2px height, accent color)
- Position: top of TOC
- Update smoothly

#### Acceptance Criteria

- [ ] Progress updates as user scrolls
- [ ] Calculation is accurate
- [ ] Indicator is unobtrusive
- [ ] Works with documents of varying structures

#### Technical Considerations

**Implementation**:
- Calculate progress based on scroll position
- Update indicator on scroll events
- Use throttling to avoid performance issues

**Files to Modify**:
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Progress calculation
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Progress indicator styles

**Potential Issues**:
- Defining "progress" (by section count vs. scroll position?)
- Documents with uneven section lengths

#### Localization

New strings needed:
- `progressIndicator`: "Section {current} of {total}"

---

### Feature 10: Keyboard Navigation

**Priority**: Low
**Impact**: Medium
**Effort**: Medium

#### Description
Enable keyboard navigation within the TOC for accessibility and power users.

#### User Story
*As a keyboard-focused user, I want to navigate the TOC using arrow keys, so I can work efficiently without a mouse.*

#### Requirements

**Functional Requirements**:
1. Focus TOC with keyboard shortcut (Ctrl+Shift+T?)
2. Arrow keys navigate up/down through items
3. Enter/Space jumps to selected section
4. Tab key cycles focus through TOC items
5. ESC returns focus to document

**Visual Design**:
- Clear focus indicator (outline/border)
- Focused item has distinct background
- Keyboard shortcut hint in UI (optional)

#### Acceptance Criteria

- [ ] Arrow keys navigate TOC items
- [ ] Enter jumps to selected section
- [ ] Tab navigation works correctly
- [ ] Focus indicator is clearly visible
- [ ] Works with screen readers
- [ ] Doesn't conflict with VSCode shortcuts

#### Technical Considerations

**Implementation**:
- Add `tabindex` to TOC items
- Implement keyboard event handlers
- Manage focus state
- Ensure ARIA attributes for accessibility

**Files to Modify**:
- [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js) - Keyboard handlers
- [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css) - Focus styles

**Potential Issues**:
- Shortcut conflicts with VSCode
- Complex focus management with collapsible sections
- Screen reader compatibility

#### Localization

New strings needed (for accessibility):
- `tocNavigationHint`: "Use arrow keys to navigate, Enter to select"
- `focusTOC`: "Focus table of contents"

---

## Implementation Guidelines

### Development Phases

**Phase 1: Quick Wins** (Features 2, 3, 4)
- Estimated effort: 2-4 hours
- Focus: CSS improvements only
- No JavaScript changes required

**Phase 2: Active Highlighting** (Feature 1)
- Estimated effort: 4-8 hours
- Requires scroll observer implementation
- Moderate complexity

**Phase 3: Smooth Scrolling** (Feature 5)
- Estimated effort: 2-4 hours
- Simple JavaScript enhancement

**Phase 4: Visual Polish** (Feature 7)
- Estimated effort: 3-6 hours
- CSS refinements

**Phase 5: Advanced Features** (Features 6, 8, 9, 10)
- Estimated effort: 20-40 hours
- High complexity
- Consider user demand before implementing

### Testing Requirements

For each feature:
1. Test with documents of varying lengths (short, medium, 100+ headers)
2. Test with different heading structures (flat vs. deeply nested)
3. Test in light and dark VSCode themes
4. Test on different screen sizes (≥1366px)
5. Verify keyboard accessibility
6. Check for performance impact (no lag with 500+ headers)

### Success Metrics

- User satisfaction (feedback/ratings)
- Performance (scroll FPS, memory usage)
- Accessibility (WCAG AA compliance)
- Adoption rate (based on extension analytics)

---

## Appendix

### Related Files

- Main JavaScript: [`src/md-toc-sidebar.js`](../src/md-toc-sidebar.js)
- Styles: [`src/md-toc-sidebar.css`](../src/md-toc-sidebar.css)
- Documentation: [`README.md`](../README.md)

### References

- [VSCode Theme Colors](https://code.visualstudio.com/api/references/theme-color)
- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
