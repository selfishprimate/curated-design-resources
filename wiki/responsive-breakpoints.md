# Responsive Breakpoints Guide

**Project:** Mossaique
**Last Updated:** November 11, 2025
**Related Files:** `tailwind.config.js`

---

## Table of Contents
1. [Overview](#overview)
2. [Breakpoint System](#breakpoint-system)
3. [Usage Examples](#usage-examples)
4. [Best Practices](#best-practices)
5. [Common Patterns](#common-patterns)
6. [Testing Breakpoints](#testing-breakpoints)

---

## Overview

Mossaique uses Tailwind CSS's responsive design system with additional custom breakpoints for ultra-wide displays. The system follows a mobile-first approach, meaning styles apply from the smallest screen up unless overridden at larger breakpoints.

### Mobile-First Philosophy

```jsx
// Base styles apply to all screen sizes (mobile first)
<div className="text-sm">

// Styles at 'md' and above override the base
<div className="text-sm md:text-base">

// Styles at 'lg' and above override previous breakpoints
<div className="text-sm md:text-base lg:text-lg">
```

---

## Breakpoint System

### Default Tailwind Breakpoints

These are the standard Tailwind CSS breakpoints used in the project:

| Prefix | Min Width | Description | Device Examples |
|--------|-----------|-------------|-----------------|
| `sm:` | **640px** | Small tablets, large phones in landscape | iPhone 12 Pro Max landscape, iPad Mini portrait |
| `md:` | **768px** | Tablets, small laptops | iPad portrait, Surface tablets |
| `lg:` | **1024px** | Laptops, desktop monitors | MacBook Air, standard desktops |
| `xl:` | **1280px** | Large desktops | iMac 21", 1080p monitors |
| `2xl:` | **1536px** | Extra large desktops | iMac 27", 1440p monitors |

### Custom Breakpoints

Additional breakpoints defined in `tailwind.config.js` for ultra-wide displays:

| Prefix | Min Width | Description | Device Examples |
|--------|-----------|-------------|-----------------|
| `xl5:` | **1500px** | Extra-wide desktops | Between XL and 2XL, fills the gap |
| `xxl:` | **1640px** | Ultra-wide monitors | 1080p ultrawide, dual monitors |
| `3xl:` | **2400px** | 4K and super-wide displays | 4K monitors, triple monitor setups |

### Complete Breakpoint Hierarchy

```
Mobile (default)
    ↓
sm:   640px   →  Small tablets
    ↓
md:   768px   →  Tablets
    ↓
lg:   1024px  →  Laptops
    ↓
xl:   1280px  →  Large desktops
    ↓
xl5:  1500px  →  Extra-wide (custom)
    ↓
2xl:  1536px  →  Extra large
    ↓
xxl:  1640px  →  Ultra-wide (custom)
    ↓
3xl:  2400px  →  4K displays (custom)
```

---

## Usage Examples

### Basic Responsive Text

```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
```

**Breakdown:**
- Mobile (0-639px): `text-2xl` (1.5rem / 24px)
- Small (640px+): `text-3xl` (1.875rem / 30px)
- Medium (768px+): `text-4xl` (2.25rem / 36px)
- Large (1024px+): `text-5xl` (3rem / 48px)

### Responsive Grid Layouts

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
  {/* Resource cards */}
</div>
```

**Visual Layout:**
- **Mobile (0-639px):** 1 column (stacked)
- **Small (640-767px):** 2 columns
- **Medium (768-1023px):** 3 columns
- **Large (1024-1499px):** 4 columns
- **XL5 (1500-1639px):** 5 columns
- **XXL (1640-2399px):** 6 columns
- **3XL (2400px+):** 8 columns

### Responsive Padding

```jsx
<section className="px-4 md:px-6 lg:px-8 py-32 md:py-56">
  {/* Hero content */}
</section>
```

**Breakdown:**
- **Horizontal padding:**
  - Mobile: 1rem (16px)
  - Medium: 1.5rem (24px)
  - Large: 2rem (32px)

- **Vertical padding:**
  - Mobile: 8rem (128px)
  - Medium: 14rem (224px)

### Responsive Visibility

```jsx
<div className="hidden md:block">
  Only visible on tablets and up
</div>

<div className="block md:hidden">
  Only visible on mobile
</div>
```

### Responsive Flexbox

```jsx
<div className="flex flex-col md:flex-row gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

**Behavior:**
- Mobile: Stacked vertically (`flex-col`)
- Medium+: Side by side (`flex-row`)

---

## Best Practices

### 1. Mobile-First Design

Always start with mobile styles and enhance for larger screens:

```jsx
// ✅ Good: Mobile-first
<div className="text-sm md:text-base lg:text-lg">

// ❌ Avoid: Desktop-first
<div className="text-lg lg:text-base md:text-sm">
```

### 2. Logical Breakpoint Progression

Use breakpoints in ascending order:

```jsx
// ✅ Good: Ascending order
<div className="p-4 md:p-6 lg:p-8 xl:p-10">

// ❌ Avoid: Random order
<div className="p-4 xl:p-10 md:p-6 lg:p-8">
```

### 3. Consistent Spacing Scale

Use Tailwind's spacing scale consistently:

```jsx
// ✅ Good: Uses spacing scale (4, 6, 8, 10)
<div className="gap-4 md:gap-6 lg:gap-8 xl:gap-10">

// ⚠️ Less ideal: Inconsistent jumps
<div className="gap-2 md:gap-7 lg:gap-14">
```

### 4. Test All Breakpoints

Always test your responsive design at:
- 375px (iPhone SE - smallest common mobile)
- 768px (iPad portrait - tablet boundary)
- 1024px (Laptop - desktop boundary)
- 1500px (Custom XL5 - ultra-wide)
- 2400px (Custom 3XL - 4K displays)

### 5. Avoid Over-Complication

Don't specify unnecessary breakpoints:

```jsx
// ✅ Good: Only necessary breakpoints
<div className="text-sm md:text-base">

// ❌ Avoid: Redundant breakpoints
<div className="text-sm sm:text-sm md:text-base lg:text-base xl:text-base">
```

---

## Common Patterns

### 1. Hero Section Spacing

```jsx
<section className="px-8 py-32 md:py-56">
  {/* Hero content */}
</section>
```

**Used in:** `Hero.jsx`
**Purpose:** More dramatic spacing on desktop while maintaining reasonable mobile spacing

### 2. Resource Card Grid

```jsx
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
  {/* Cards */}
</div>
```

**Used in:** `Home.jsx`, `CategoryPage.jsx`
**Purpose:** Maximize screen real estate on ultra-wide displays

### 3. Navigation & Mobile Menu

```jsx
{/* Desktop Navigation */}
<nav className="hidden lg:block">
  {/* Nav items */}
</nav>

{/* Mobile Menu Button */}
<button className="lg:hidden">
  <Menu />
</button>
```

**Used in:** `Sidebar.jsx`
**Purpose:** Toggle between mobile hamburger menu and desktop navigation

### 4. Responsive Typography

```jsx
<h1 className="text-[2.5rem] md:text-6xl xl5:text-7xl leading-[1.15] md:leading-[1.15] xl5:leading-[1.2]">
  {/* Title */}
</h1>
```

**Used in:** `Hero.jsx`
**Purpose:** Scale typography proportionally with screen size

### 5. Responsive Button Layouts

```jsx
<div className="flex flex-col sm:flex-row gap-4">
  <button className="w-full sm:w-auto">Button 1</button>
  <button className="w-full sm:w-auto">Button 2</button>
</div>
```

**Used in:** `Hero.jsx`, `SubmitModal.jsx`
**Purpose:** Stack buttons on mobile, place side-by-side on desktop

### 6. Conditional Avatar Display

```jsx
<div className={`
  ${index >= 7 ? 'hidden md:inline-block' : ''}
  ${index >= 8 ? 'md:hidden' : ''}
`}>
  <img src={avatar} />
</div>
```

**Used in:** `Hero.jsx`
**Purpose:** Show 7 avatars on mobile, 8 on desktop

---

## Testing Breakpoints

### Browser DevTools

**Chrome/Edge:**
1. Open DevTools (F12)
2. Click Toggle Device Toolbar (Ctrl/Cmd + Shift + M)
3. Select preset devices or enter custom dimensions
4. Test all breakpoints: 375px, 640px, 768px, 1024px, 1500px, 1640px, 2400px

**Firefox:**
1. Open DevTools (F12)
2. Click Responsive Design Mode (Ctrl/Cmd + Shift + M)
3. Use width slider or input custom dimensions

### Recommended Test Sizes

| Size | Breakpoint | Test Purpose |
|------|------------|--------------|
| **375px** | Mobile | Smallest common phone |
| **639px** | Pre-sm | Just before small breakpoint |
| **640px** | sm | Small tablet boundary |
| **767px** | Pre-md | Just before medium breakpoint |
| **768px** | md | Tablet boundary |
| **1023px** | Pre-lg | Just before large breakpoint |
| **1024px** | lg | Desktop boundary |
| **1499px** | Pre-xl5 | Just before custom XL5 |
| **1500px** | xl5 | Extra-wide boundary |
| **1639px** | Pre-xxl | Just before ultra-wide |
| **1640px** | xxl | Ultra-wide boundary |
| **2400px** | 3xl | 4K display boundary |

### Testing Checklist

- [ ] Text scales appropriately at all breakpoints
- [ ] Grid layouts don't break or overflow
- [ ] Navigation switches between mobile/desktop correctly
- [ ] Images and logos maintain aspect ratio
- [ ] Padding and spacing look balanced
- [ ] Buttons remain clickable and properly sized
- [ ] Modals and overlays center correctly
- [ ] No horizontal scrolling at any breakpoint
- [ ] Content remains readable (not too wide or too narrow)

---

## Tailwind Config Reference

Located in `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      screens: {
        'xl5': '1500px',   // Custom: Extra-wide
        'xxl': '1640px',   // Custom: Ultra-wide
        '3xl': '2400px',   // Custom: 4K displays
      },
    },
  },
}
```

### Safelist for Custom Breakpoints

Some classes using custom breakpoints are safelisted to prevent purging:

```javascript
safelist: [
  'xl5:grid-cols-5',
  'xxl:grid-cols-6',
  '3xl:grid-cols-8',
]
```

**Why?** Dynamic classes generated at runtime need to be explicitly included in the build.

---

## Real-World Usage in Project

### File: `Home.jsx`

```jsx
// Resource grid with all custom breakpoints
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
  {/* Resources */}
</div>
```

### File: `Hero.jsx`

```jsx
// Responsive padding with negative margin trick
<section className="px-8 py-32 pb-[600px] -mb-[550px] md:py-56 md:pb-[800px] md:-mb-[650px]">
  {/* Hero content */}
</section>
```

### File: `CategoryPage.jsx`

```jsx
// Same grid pattern as Home
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
  {/* Category resources */}
</div>
```

### File: `Sidebar.jsx`

```jsx
// Mobile/Desktop navigation switch
<nav className="hidden lg:block">
  {/* Desktop nav */}
</nav>

<button className="lg:hidden">
  {/* Mobile menu toggle */}
</button>
```

---

## Quick Reference Card

### Breakpoint Cheat Sheet

```
PREFIX    WIDTH     USE CASE
------    -----     --------
(none)    0px       Mobile phones (default)
sm:       640px     Large phones, small tablets
md:       768px     Tablets
lg:       1024px    Laptops, desktop
xl:       1280px    Large desktop
xl5:      1500px    Extra-wide (custom)
2xl:      1536px    Extra large desktop
xxl:      1640px    Ultra-wide (custom)
3xl:      2400px    4K displays (custom)
```

### Common Responsive Patterns

```jsx
// Spacing
className="p-4 md:p-6 lg:p-8"

// Typography
className="text-sm md:text-base lg:text-lg"

// Grid columns
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-4"

// Flexbox direction
className="flex-col md:flex-row"

// Visibility
className="hidden md:block"

// Width
className="w-full md:w-auto"
```

---

## Additional Resources

### Official Documentation
- [Tailwind CSS Responsive Design](https://tailwindcss.com/docs/responsive-design)
- [Tailwind CSS Breakpoints](https://tailwindcss.com/docs/screens)

### Related Files
- `/tailwind.config.js` - Breakpoint configuration
- `/src/pages/Home.jsx` - Grid layout examples
- `/src/components/Hero.jsx` - Responsive spacing
- `/src/components/Sidebar.jsx` - Mobile/desktop navigation

### Related Wiki Pages
- `grain-texture-implementation.md` - Visual effects across breakpoints
- `HMR.md` - Development workflow

---

**Last Updated:** November 11, 2025
**Maintainer:** selfishprimate
**Version:** 2.0
