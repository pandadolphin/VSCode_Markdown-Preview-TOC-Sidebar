# Postmortem: TOC Scroll Highlight Bug (90 minutes debugging)

**Date**: October 4, 2025
**Duration**: 21:36 - 23:15 (1.5 hours)
**Commits analyzed**: `9ec6e7b` → HEAD + unstaged changes

## Executive Summary

A TOC highlight tracking bug took 90 minutes and 8 commits to fully resolve. The highlight worked when scrolling UP but failed when scrolling DOWN. The root cause was a misunderstanding of the IntersectionObserver API - specifically that the `entries` parameter only contains elements that changed intersection state, not all currently visible elements.

## Timeline of Events

### Starting Point: Commit 9ec6e7b (21:36)
**"Fix active highlight blue mask issue on initial load"**
- Fixed opaque blue overlay on initial page load
- Added 100ms observer initialization delay
- Changed to more subtle theme colors
- **Status**: Observable highlighting worked, but UI polish issues emerged

### Commit 1: 39e1abf (21:44) - 8 minutes later
**"Disable automatic highlighting on initial page load"**
- **Issue**: TOC highlighted on initial load without user interaction
- **Fix**: Added `hasUserScrolled` flag - only highlight after scroll/click
- **Type**: UX improvement
- **Lines changed**: +17

### Commit 2: e8d10dc (22:00) - 16 minutes later
**"Fix race condition causing multiple items to be highlighted"**
- **Issue**: Multiple TOC items highlighted simultaneously during rapid scrolling
- **Fix**: Store `activeItemElement` reference for fast cleanup
- **Type**: Race condition fix
- **Lines changed**: +18/-5

### Commit 3: aa7360d (22:08) - 8 minutes later
**"Simplify active class cleanup to fix persistent double highlight"**
- **Issue**: Both clicked item and scrolled-to item stayed highlighted
- **Fix**: **Simplified to ALWAYS remove ALL active classes** (brute force approach)
- **Type**: Cleanup strategy change
- **Lines changed**: +16/-15
- **Note**: This was the RIGHT approach - abandoned complex state tracking

### Commit 4: 9cbe982 (22:21) - 13 minutes later
**"Fix double highlight by detecting manual scroll after TOC click"**
- **Issue**: After TOC click then manual scroll, both sections highlighted
- **Fix**: Add one-time scroll listener to clear `isClickScrolling` flag faster
- **Type**: Click-scroll interaction fix
- **Lines changed**: +22/-2

### Commit 5: bfb4f07 (22:27) - 6 minutes later
**"Improve visual distinction between hover and active states"**
- **Issue**: Hover and active states looked too similar
- **Fix**: CSS improvements - different opacities, borders, font weights
- **Type**: Visual/CSS polish
- **File**: CSS only

### Commit 6: a9f5fb7 (22:33) - 6 minutes later
**"Fix stuck focus state causing persistent hover appearance"**
- **Issue**: Clicked TOC link retained hover background after cursor moved away
- **Fix**: Call `this.blur()` after clicking to remove focus state
- **Type**: Browser focus state fix
- **Lines changed**: +4

### Commit 7: e393d76 (22:45) - 12 minutes later ⚠️ **CRITICAL**
**"Fix reading zone detection to properly highlight sections"**
- **Issue**: Headers at bottom of viewport incorrectly highlighted
- **Major refactor**: Introduced "reading zone" concept (20-40% from top)
- **Changed**: From `rootMargin: "-20% 0px -70% 0px"` to `rootMargin: "0px"` + manual zone calculation
- **Lines changed**: +46/-12
- **BUG INTRODUCED**: Only checked `entries` array, not ALL headers
- **Consequence**: Worked for scroll UP, failed for scroll DOWN

### Final Fix: Current unstaged changes (23:15) - 30 minutes later
**"Fix scroll down highlight tracking"**
- **Issue**: Highlight didn't follow when scrolling DOWN (only worked scrolling UP)
- **Root cause**: `entries` only contains headers that CHANGED state, not all visible headers
- **Fix**: Check ALL headers using `headers.forEach()` + `getBoundingClientRect()`
- **Lines changed**: +16/-29

## Root Cause Analysis

### The Fundamental Bug

The IntersectionObserver callback receives an `entries` parameter containing **only elements that changed intersection state** in that specific callback:

```javascript
// ❌ WRONG - Commit e393d76
headersObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {  // Only headers that CHANGED state
    if (entry.isIntersecting) {
      // Check if in reading zone...
    }
  })
})
```

**Why this failed on scroll DOWN:**
- When scrolling down, headers already above the reading zone don't trigger new intersection events
- The fallback logic looked for "headers above reading zone" in `entries`
- But those headers weren't IN `entries` - they were already visible from before
- Result: No header found → no highlight update

**Why this worked on scroll UP:**
- Headers entering from the top DO trigger intersection events (entering viewport)
- These headers appear in `entries`
- Fallback logic could find them

### The Correct Approach

```javascript
// ✅ CORRECT - Current fix
headersObserver = new IntersectionObserver((entries) => {
  headers.forEach(header => {  // Check ALL headers, not just entries
    const rect = header.getBoundingClientRect()
    // Check actual position relative to reading zone...
  })
})
```

The IntersectionObserver is now used **only as a trigger** to re-evaluate positions, not as the source of which headers to check.

## Why Did This Take 90 Minutes?

### 1. **Symptom Chasing (Commits 1-6)**
We spent the first ~57 minutes fixing various UI/UX symptoms:
- Double highlights
- Hover state confusion
- Focus state issues
- Initial load behavior

**Mistake**: These were secondary issues that obscured the core bug. We should have:
1. Identified all bugs upfront
2. Prioritized by severity: core logic > UI polish
3. Fixed core logic first, then polish

### 2. **Insufficient Testing of Major Refactor (Commit 7)**
The reading zone refactor was architecturally sound but introduced a critical bug:
- ✅ Tested: Scrolling up (worked)
- ❌ NOT tested: Scrolling down (broken)
- ❌ NOT tested: Scrolling to bottom then back up

**Mistake**: Major logic changes require bidirectional testing.

### 3. **API Misunderstanding**
We didn't fully understand that `IntersectionObserver` entries are **delta changes**, not **current state**.

**Documentation we should have read**:
> "The callback receives a list of IntersectionObserverEntry objects, one for each observed element **whose intersection status changed**."

### 4. **Incremental Debugging**
Each fix revealed the next bug:
- Fix highlight on load → reveals double highlight
- Fix double highlight → reveals hover confusion
- Fix hover → reveals focus issues
- Fix focus → reveals wrong headers highlighted
- Fix reading zone → reveals scroll direction bug

**Better approach**:
1. Map all symptoms before coding
2. Identify root causes (may be fewer than symptoms)
3. Fix root causes in order of priority
4. Test comprehensively

### 5. **Context Switching**
Jumping between JS logic, CSS styling, and UX behavior prevented deep focus on the core issue.

## Lessons Learned

### 🎯 **Lesson 1: Test Bidirectionally**
When fixing scroll-related bugs, ALWAYS test:
- ✅ Scroll down from top
- ✅ Scroll up from bottom
- ✅ Scroll to middle, then both directions
- ✅ Rapid scrolling
- ✅ Click navigation + manual scroll

**Rule**: If it involves direction or state transitions, test all directions/states.

### 🎯 **Lesson 2: Understand API Contracts Deeply**
`IntersectionObserver` callback semantics:
- `entries` = elements that **changed** intersection status
- `entries` ≠ all currently intersecting elements

**Rule**: When using an unfamiliar API, read the full specification, not just examples.

### 🎯 **Lesson 3: Separate Concerns**
Logic bugs vs. visual bugs are different categories:

| Category | Examples | Priority |
|----------|----------|----------|
| **Core Logic** | Wrong highlight, no highlight, scroll tracking | 🔴 P0 |
| **Visual Polish** | Hover states, colors, opacity | 🟡 P1 |
| **UX Refinement** | Initial load behavior, transitions | 🟢 P2 |

**Rule**: Fix P0 bugs completely before touching P1/P2.

### 🎯 **Lesson 4: Root Cause Analysis First**
Our approach:
1. See double highlight → fix double highlight logic
2. See wrong highlight → fix reading zone logic
3. See scroll direction bug → finally found root cause

**Better approach**:
1. Reproduce bug systematically (scroll up, scroll down, click TOC, etc.)
2. Map all symptoms
3. Identify common root causes
4. Fix root causes
5. Verify all symptoms resolved

**Tool**: Before coding, create a test matrix:

| Action | Expected | Actual | Status |
|--------|----------|--------|--------|
| Scroll down | Highlight follows | ❌ Doesn't follow | Bug |
| Scroll up | Highlight follows | ✅ Works | OK |
| Click TOC | Jump & highlight | ✅ Works | OK |
| Initial load | No highlight | ✅ Works | OK |

### 🎯 **Lesson 5: Code Simplicity > Cleverness**
**Commit 3** (aa7360d) got this right:

```javascript
// ❌ COMPLEX: Track state, conditionally clean up
if (activeItemElement) {
  activeItemElement.classList.remove("active")
}
const itemsWithActive = sidebarWrapper.querySelectorAll(".toc li.active")
if (itemsWithActive.length > 0) {
  itemsWithActive.forEach(...)
}

// ✅ SIMPLE: Always clean everything
const allTocItems = sidebarWrapper.querySelectorAll(".toc li")
allTocItems.forEach(item => {
  item.classList.remove("active")
})
```

**Rule**: Prefer simple, brute-force approaches unless profiling shows a performance issue.

### 🎯 **Lesson 6: The Observer Pattern is a Trigger, Not Truth**
The final fix uses IntersectionObserver as a **trigger to re-evaluate**, not as the **source of truth** about which elements to check.

```javascript
// Observer fires → "Something changed, re-evaluate ALL headers"
headersObserver = new IntersectionObserver((entries) => {
  // Don't trust entries as complete list
  // Check ALL headers using getBoundingClientRect()
  headers.forEach(header => { ... })
})
```

**Rule**: Event callbacks tell you WHEN to act, not necessarily WHAT to act on.

## Concrete Improvements for Future

### 1. **Testing Checklist for Scroll Features**
Before committing scroll-related changes:
```
□ Scroll down from top to bottom
□ Scroll up from bottom to top
□ Scroll down, then up
□ Scroll to random middle position
□ Rapid scroll (mousewheel spin)
□ Click TOC item
□ Click TOC, then immediately scroll
□ Resize window (viewport change)
□ Different document lengths (short, medium, long)
```

### 2. **Bug Triage Template**
When multiple bugs appear:
```markdown
## Bug Inventory
| Symptom | Severity | Affected Code | Root Cause Hypothesis |
|---------|----------|---------------|----------------------|
| Double highlight | P0 | JS - setActiveTocItem | Race condition |
| Wrong highlight | P0 | JS - observer callback | Wrong headers checked |
| Hover confusion | P1 | CSS - hover states | Missing :not() selector |

## Investigation Order
1. P0 bugs first (core logic)
2. Identify if bugs are related (same root cause)
3. Fix root causes, not symptoms
4. Test fix resolves ALL related symptoms
5. Then move to P1 bugs
```

### 3. **API Understanding Documentation**
When using complex APIs, document your understanding:

```javascript
/**
 * IntersectionObserver callback semantics:
 * - entries: Elements that CHANGED intersection state (entered/left viewport)
 * - NOT a list of all currently intersecting elements
 * - To get current state of all elements, use getBoundingClientRect()
 *
 * Our usage:
 * - Observer fires when ANY header enters/exits viewport (trigger)
 * - On trigger, we check ALL headers' positions manually
 * - This ensures we see headers already in viewport from previous scrolls
 */
```

### 4. **Commit Message Quality**
Our commit messages were excellent - each explained:
- ✅ Issue (what was wrong)
- ✅ Root cause (why it was wrong)
- ✅ Solution (how we fixed it)
- ✅ Benefit (impact of fix)

**Keep doing this!** These messages were invaluable for this postmortem.

## Technical Debt Assessment

### Debt Introduced
None - the final solution is cleaner than intermediate attempts.

### Debt Paid
- **Simplified active class cleanup** (commit 3): Removed complex state tracking
- **Final fix**: Reduced code by 13 lines while fixing the bug

### Code Quality: ✅ IMPROVED
The current code is:
- More maintainable (simpler logic)
- More robust (checks all headers)
- Better documented (clear comments about API semantics)

## Metrics

| Metric | Value |
|--------|-------|
| **Total time** | 90 minutes |
| **Commits** | 8 (7 committed + 1 unstaged) |
| **Files changed** | 2 (JS + CSS) |
| **Net lines added** | ~125 lines |
| **Bugs fixed** | 8 symptoms, 2 root causes |
| **Average time per commit** | 11 minutes |
| **Time on root cause** | 30 minutes (33%) |
| **Time on symptoms** | 60 minutes (67%) |

## Prevention: What Would Have Saved Time?

If we had done this FIRST, we could have saved ~45 minutes:

### Systematic Bug Reproduction (10 min)
1. Open markdown preview with long document
2. Test scroll down → Note: ❌ highlight doesn't follow
3. Test scroll up → Note: ✅ highlight follows
4. Conclusion: Direction-dependent bug

### Root Cause Hypothesis (10 min)
1. Reading the code: Observer checks `entries`
2. Reading MDN: `entries` = changed state, not all visible
3. Hypothesis: Scrolling down doesn't create entries for headers already above

### Targeted Fix (10 min)
1. Change `entries.forEach()` to `headers.forEach()`
2. Use `getBoundingClientRect()` for current positions
3. Test both directions → ✅ Works

### Total systematic approach: 30 minutes
**Actual time taken: 90 minutes**
**Time saved: 60 minutes (67%)**

## Conclusion

This 90-minute debugging session was educational but inefficient. The core issue was a fundamental misunderstanding of the IntersectionObserver API, compounded by:
1. Chasing symptoms instead of root causes
2. Insufficient bidirectional testing
3. Context switching between logic and polish
4. Not mapping all bugs before fixing

**The silver lining**:
- We did fix all issues (not just the main bug)
- Code quality improved (simpler, cleaner)
- Excellent commit messages preserved context
- This postmortem will prevent similar issues

**For next time**:
- Test both directions immediately
- Map all symptoms before fixing
- Prioritize core logic over polish
- Read API docs thoroughly
- Use the 30-minute systematic approach above

## References

**Commits analyzed**:
- [`9ec6e7b`](../src/md-toc-sidebar.js) - Starting point
- [`39e1abf`](../src/md-toc-sidebar.js) - Disable auto-highlight
- [`e8d10dc`](../src/md-toc-sidebar.js) - Fix race condition
- [`aa7360d`](../src/md-toc-sidebar.js) - Simplify cleanup
- [`9cbe982`](../src/md-toc-sidebar.js) - Fix click-scroll interaction
- [`bfb4f07`](../src/md-toc-sidebar.css) - Visual distinction
- [`a9f5fb7`](../src/md-toc-sidebar.js) - Fix focus state
- [`e393d76`](../src/md-toc-sidebar.js) - Reading zone (introduced bug)
- Current unstaged - Fix scroll down (final fix)

**Key files**:
- [`src/md-toc-sidebar.js:312-360`](../src/md-toc-sidebar.js#L312-L360) - IntersectionObserver implementation
- [`src/md-toc-sidebar.js:254-295`](../src/md-toc-sidebar.js#L254-L295) - setActiveTocItem function

**API Documentation**:
- [MDN: IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver)
- [MDN: IntersectionObserverEntry](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)

---

*This postmortem was generated after 90 minutes of debugging to document lessons learned and prevent similar issues in the future.*
