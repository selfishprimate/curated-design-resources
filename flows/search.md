# Search Modal - Task Flow & Instructions

## Overview

The search modal is a command palette-style interface that allows users to quickly search through resources and navigate between categories using keyboard shortcuts or mouse interaction.

---

## User Interaction Flow

### Opening the Modal

**Method 1: Keyboard Shortcut**
1. User presses `Cmd+K` (Mac) or `Ctrl+K` (Windows)
2. Modal appears centered on screen
3. Search input is auto-focused
4. No items are pre-selected

**Method 2: Click**
1. User clicks search box in desktop navigation
2. Modal appears centered on screen
3. Search input is auto-focused
4. No items are pre-selected

---

### Browsing Categories (No Search Query)

**Default State:**
- All categories displayed in alphabetical order
- Each category shows resource count
- No item is highlighted
- User can scroll through list

**Keyboard Navigation:**
1. User presses `ArrowDown` → First category becomes highlighted
2. User continues with `ArrowDown` → Moves to next category
3. User presses `ArrowUp` → Moves to previous category
4. At last category + `ArrowDown` → Loops to first category
5. At first category + `ArrowUp` → Loops to last category
6. User presses `Enter` → Page reloads to selected category

**Mouse Navigation:**
1. User hovers over category → Category becomes highlighted
2. User clicks category → Page reloads to category

---

### Searching Resources

**Search Activation:**
1. User types in search input (minimum 2 characters)
2. Results appear instantly (debounced search)
3. Keyboard navigation state resets
4. No item is pre-selected

**Search Results Display:**
- Resource title
- Resource description (truncated)
- Category badge (clickable)
- Featured/Trending badges (if applicable)
- Free/Freemium/Paid badges (if applicable)
- Resource logo or initials

**Keyboard Navigation in Results:**
1. User presses `ArrowDown` → First result becomes highlighted
2. User continues with `ArrowDown` → Moves to next result
3. User presses `ArrowUp` → Moves to previous result
4. Loop navigation works same as categories
5. User presses `Enter` → Resource opens in new tab

**Mouse Navigation in Results:**
1. User hovers over result → Result becomes highlighted
2. User clicks result → Resource opens in new tab
3. User clicks category badge → Page reloads to that category

---

### Closing the Modal

**Method 1: ESC Key**
1. User presses `ESC`
2. Modal closes immediately
3. Search query is cleared
4. Body scroll is restored

**Method 2: Backdrop Click**
1. User clicks outside modal (on dark overlay)
2. Modal closes immediately
3. Search query is cleared
4. Body scroll is restored

**Method 3: Making a Selection**
- Resource clicked → Modal closes, new tab opens
- Category clicked → Page reloads, modal closes automatically

---

## Technical Flow

### Component Lifecycle

```
┌─────────────────────────────────────────────┐
│ User triggers modal                         │
│ (Cmd+K or Click)                           │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ SearchCommand Component                     │
│ - setOpen(true)                            │
│ - setSelectedValue('')                     │
│ - setKeyboardNav(false)                    │
│ - Lock body scroll                         │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ Modal Rendered via Portal                   │
│ - Categories displayed (no query)          │
│ - No visual selection (CSS hides it)      │
│ - Input auto-focused                       │
└─────────────┬───────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────────┐
│ User Interaction Path Splits                │
└─────┬───────────────────────────────────┬───┘
      │                                   │
      ▼                                   ▼
┌──────────────────┐           ┌──────────────────┐
│ Keyboard Path    │           │ Mouse Path       │
└─────┬────────────┘           └─────┬────────────┘
      │                              │
      ▼                              ▼
┌──────────────────┐           ┌──────────────────┐
│ Arrow Key Press  │           │ Hover Event      │
│ - Check if first │           │ - Highlight item │
│   time           │           │                  │
│ - If yes: select │           │                  │
│   first item     │           │                  │
│ - setKeyboardNav │           │                  │
│   (true)         │           │                  │
│ - Show highlight │           │                  │
└─────┬────────────┘           └─────┬────────────┘
      │                              │
      ▼                              ▼
┌──────────────────┐           ┌──────────────────┐
│ Continue Nav     │           │ Click Item       │
│ - Loop support   │           │                  │
└─────┬────────────┘           └─────┬────────────┘
      │                              │
      ▼                              ▼
┌─────────────────────────────────────────────┐
│ Enter or Click Selection                    │
└─────┬───────────────────────────────────┬───┘
      │                                   │
      ▼                                   ▼
┌──────────────────┐           ┌──────────────────┐
│ Category         │           │ Resource         │
│ - window.        │           │ - window.open    │
│   location.href  │           │   (new tab)      │
│ - Page reloads   │           │ - setOpen(false) │
│ - Modal closes   │           │ - Modal closes   │
└──────────────────┘           └──────────────────┘
```

### State Management

**Component State:**
```javascript
const [open, setOpen] = useState(false)           // Modal visibility
const [query, setQuery] = useState('')            // Search input
const [results, setResults] = useState([])        // Search results
const [selectedValue, setSelectedValue] = useState('') // Selected item ID
const [keyboardNav, setKeyboardNav] = useState(false) // Keyboard mode active
```

**State Transitions:**

1. **Modal Open:**
   - `open: false → true`
   - `selectedValue: '' (reset)`
   - `keyboardNav: false (reset)`
   - Body scroll locked

2. **Search Query Change:**
   - `query: '' → 'abc'`
   - `results: [] → [...]`
   - `keyboardNav: false (reset)`
   - Selection hidden again

3. **First Arrow Key:**
   - `keyboardNav: false → true`
   - `selectedValue: '' → firstItemId`
   - CSS class added to show highlights

4. **Selection Made:**
   - `open: true → false`
   - All state reset
   - Body scroll restored

---

## Component Architecture

```
Navigation.jsx (Desktop)
  └─ SearchCommand.jsx
       ├─ Search Trigger Button
       └─ Portal (when open=true)
            └─ Command (cmdk)
                 ├─ Search Input
                 ├─ Command.List
                 │    ├─ Command.Group (Categories or Results)
                 │    │    └─ Command.Item
                 │    │         └─ ResourceAvatar (memoized)
                 │    └─ Command.Empty
                 └─ Footer (keyboard hints)
```

---

## Key Files & Their Roles

### `src/components/SearchCommand.jsx`
**Primary Component**
- Manages all search modal state
- Handles keyboard shortcuts (Cmd+K)
- Controls modal open/close
- Manages selection state
- Handles body scroll locking
- Implements search logic

**Key Functions:**
- `handleSelect(resource)` - Opens resource in new tab
- `handleCategoryClick(categoryId)` - Navigates to category (page reload)
- `handleBackdropClick(e)` - Closes modal on backdrop click

### `src/components/Navigation.jsx`
**Integration Point**
- Renders SearchCommand in desktop nav only
- No duplicate instances

### `src/index.css`
**Visual Behavior**
- Hides selection when `keyboard-nav` class is absent
- Shows selection when `keyboard-nav` class is present
- Works in both light and dark modes

### `src/utils/search.js`
**Search Logic**
- `searchResources(query, options)` - Performs search
- Weights: title (3x) > description (1x)
- Case-insensitive matching
- Returns sorted results by relevance

---

## CSS Classes & Styling

### Modal States
- `.commandDialog` - Base modal class
- `.commandDialog.keyboard-nav` - Keyboard navigation active
- `.commandItem` - Individual category/resource item
- `.commandItem[aria-selected="true"]` - Selected item (may be hidden)

### CSS Rules
```css
/* Hide selection until keyboard nav starts */
.commandDialog:not(.keyboard-nav) .commandItem[aria-selected="true"]:not(:hover) {
  background-color: transparent !important;
}
```

---

## Performance Considerations

### Optimization Strategies

1. **Intersection Observer:**
   - Glowing effects only animate when cards visible
   - 50px rootMargin for smooth transitions
   - 0.1 threshold for early activation

2. **Event Throttling:**
   - Mouse move events throttled to 16ms (~60fps)
   - Prevents excessive re-renders

3. **Component Memoization:**
   - ResourceAvatar memoized
   - Prevents re-renders during navigation

4. **Efficient State:**
   - useRef for non-rendering state
   - Controlled component pattern
   - Minimal re-renders

---

## Accessibility

### Keyboard Support
- `Cmd/Ctrl + K` - Open modal
- `ArrowUp/Down` - Navigate items
- `Enter` - Select highlighted item
- `ESC` - Close modal
- `Tab` - (Disabled in modal, arrow keys preferred)

### Screen Readers
- `aria-label` on buttons
- `aria-selected` on items
- Semantic HTML structure
- Focus management

### Focus Management
- Auto-focus search input on open
- Focus trapped in modal
- Focus restored on close

---

## Edge Cases & Handling

### No Search Results
- Empty state message displayed
- "No results found for 'query'"
- User can clear search or close modal

### Network Issues
- Search is client-side (no network dependency)
- All data loaded from static JSON

### Rapid State Changes
- Query debouncing prevents excessive searches
- State resets properly on modal close

### Multiple Modal Triggers
- Only one modal instance exists
- Cmd+K and click open same instance
- No duplicate modals possible

---

## Debugging Guide

### Common Issues

**Issue: Item appears pre-selected**
- Check: `keyboardNav` state is false initially
- Check: CSS rule `.commandDialog:not(.keyboard-nav)` is applied
- Check: `selectedValue` is empty string on open

**Issue: Arrow keys not working**
- Check: Modal has focus
- Check: `onKeyDown` handler is attached
- Check: Event not prevented elsewhere

**Issue: Modal not closing**
- Check: `setOpen(false)` is called
- Check: Body scroll unlock code runs
- Check: Portal unmounts properly

**Issue: Duplicate modals**
- Check: Only one `<SearchCommand />` in Navigation.jsx
- Check: No duplicate Cmd+K listeners

---

## Future Enhancements

### Planned Features
- [ ] Recent searches history
- [ ] Search analytics tracking
- [ ] Command palette actions (beyond search)
- [ ] AI-powered suggestions
- [ ] Fuzzy search support
- [ ] Search result grouping by category

### Performance Improvements
- [ ] Virtual scrolling for large result sets
- [ ] Progressive rendering
- [ ] Search result caching

### UX Improvements
- [ ] Keyboard shortcut hints in footer
- [ ] Search tips/examples
- [ ] Trending searches
- [ ] Auto-complete suggestions

---

## Maintenance Notes

### When Adding New Categories
1. Update `src/data/categories.js`
2. Search automatically includes new categories
3. No code changes needed in SearchCommand

### When Modifying Search Algorithm
1. Update `src/utils/search.js`
2. Test with various queries
3. Ensure performance remains acceptable

### When Updating Styles
1. Maintain both light and dark mode support
2. Test keyboard navigation visibility
3. Ensure hover states work correctly

---

## Testing Checklist

Before deploying changes:

- [ ] Open modal with Cmd+K
- [ ] Open modal with click
- [ ] Verify single modal (no duplicates)
- [ ] Verify no pre-selection on open
- [ ] Test arrow key navigation
- [ ] Test loop navigation (first ↔ last)
- [ ] Test Enter key selection
- [ ] Test mouse hover
- [ ] Test mouse click
- [ ] Test category badge clicks
- [ ] Test ESC to close
- [ ] Test backdrop click to close
- [ ] Test body scroll lock
- [ ] Test search query updates
- [ ] Test empty state
- [ ] Test dark mode
- [ ] Test mobile responsive
- [ ] Test keyboard shortcuts disabled when typing

---

## Related Documentation

- [Search Functionality Implementation Guide](../reports/search-functionality-implementation-guide.md)
- [Search Relevance and Scoring Deep Dive](../reports/search-relevance-and-scoring-deep-dive.md)
- [Search Modal Fixes Report](../reports/search-modal-fixes-report.md)
