# Lighthouse Performance Optimization Plan

**Date:** November 10, 2024
**Current Mobile Score:** 65/100 ⚠️
**Current Desktop Score:** 60/100 ⚠️
**Target Score:** 90+ 🎯

---

## Executive Summary

Lighthouse testing reveals significant performance optimization opportunities. Main issues are:
- Large JavaScript bundles with unused code
- Unoptimized images (GitHub avatars)
- Slow Largest Contentful Paint (LCP)
- Heavy Google Analytics script

**Estimated Improvement:** +25-30 points (65 → 90-95)

---

## Current Performance Metrics

### Mobile Performance
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Performance Score** | 65/100 | 90+ | ❌ |
| First Contentful Paint | 3.0s | <1.8s | ❌ |
| Largest Contentful Paint | 5.8s | <2.5s | ❌ |
| Total Blocking Time | 180ms | <200ms | ⚠️ |
| Cumulative Layout Shift | 0.02 | <0.1 | ✅ |
| Speed Index | 6.9s | <3.4s | ❌ |

### Desktop Performance
| Metric | Current | Target | Status |
|--------|---------|--------|--------|
| **Performance Score** | 60/100 | 90+ | ❌ |
| First Contentful Paint | 2.9s | <1.8s | ❌ |
| Largest Contentful Paint | 4.9s | <2.5s | ❌ |
| Total Blocking Time | 60ms | <200ms | ✅ |
| Cumulative Layout Shift | 0.02 | <0.1 | ✅ |
| Speed Index | 3.1s | <3.4s | ⚠️ |

### Page Weight
- **Total Size:** 488 KiB
- **Largest Assets:**
  1. Google Analytics: 146KB
  2. Main JS Bundle: 116KB
  3. Inter Font: 48KB
  4. GitHub Avatars: ~26-37KB each

---

## Optimization Priorities

### 🔴 Critical (Must Fix)
1. ✅ **Optimize JavaScript Bundle**
2. ✅ **Lazy Load Google Analytics**
3. ✅ **Optimize GitHub Avatars**
4. ✅ **Implement Code Splitting**

### 🟡 Important (Should Fix)
5. ⚠️ **Preload Critical Assets**
6. ⚠️ **Font Optimization**
7. ⚠️ **Reduce Server Response Time**

### 🟢 Nice to Have (Optional)
8. 💡 **Service Worker / Cache Strategy**
9. 💡 **Resource Hints (dns-prefetch, preconnect)**

---

## Detailed Action Plan

## Task 1: Optimize JavaScript Bundle

**Problem:**
- Main bundle: 116KB (31KB unused)
- Unused code accounts for ~27% of bundle

**Impact:** ~590ms savings

**Actions:**

### 1.1 Analyze Bundle
```bash
npm install --save-dev vite-plugin-bundle-visualizer
```

### 1.2 Update vite.config.js
```javascript
import { visualizer } from 'vite-plugin-bundle-visualizer'

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'icons': ['lucide-react']
        }
      }
    }
  }
})
```

### 1.3 Implement Code Splitting
Use React.lazy() for modal components:
```javascript
// App.jsx
const SubmitModal = lazy(() => import('@/components/SubmitModal'))
const SupportersModal = lazy(() => import('@/components/SupportersModal'))
```

**Expected Result:**
- Bundle size: 116KB → ~80-90KB
- Unused code: 31KB → ~10-15KB
- LCP improvement: -200ms

---

## Task 2: Lazy Load Google Analytics

**Problem:**
- Google Analytics loads immediately: 146KB
- Blocks initial rendering
- Not critical for first paint

**Impact:** ~300ms savings on FCP

**Actions:**

### 2.1 Update index.html
Replace immediate GA load with lazy loading:

```html
<!-- Remove this -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HLNZBQKJTP"></script>

<!-- Add this instead -->
<script>
  // Lazy load GA after page load
  window.addEventListener('load', function() {
    setTimeout(function() {
      var script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=G-HLNZBQKJTP';
      document.head.appendChild(script);

      script.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-HLNZBQKJTP');
      };
    }, 2000); // Load after 2 seconds
  });
</script>
```

**Expected Result:**
- FCP improvement: -300ms
- Initial bundle: 146KB lighter
- No impact on analytics data

---

## Task 3: Optimize GitHub Avatars

**Problem:**
- Avatars loaded at full size (~26-37KB each)
- Mobile only needs smaller versions
- No lazy loading

**Impact:** ~340ms savings

**Actions:**

### 3.1 Add Size Parameter
GitHub API supports size parameter:
```javascript
// Before
https://avatars.githubusercontent.com/u/21262357?v=4

// After
https://avatars.githubusercontent.com/u/21262357?v=4&s=64  // 64px for mobile
https://avatars.githubusercontent.com/u/21262357?v=4&s=96  // 96px for desktop
```

### 3.2 Update Hero.jsx
```jsx
<img
  src={`${person.avatar_url}&s=${isMobile ? 64 : 96}`}
  alt={person.login}
  className="h-12 w-12 md:h-14 md:w-14 ..."
  loading="lazy"
/>
```

### 3.3 Add Intersection Observer
Lazy load avatars when visible:
```javascript
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    observer.observe(img);
  });

  return () => observer.disconnect();
}, []);
```

**Expected Result:**
- Avatar size: ~26KB → ~8-12KB each
- LCP improvement: -200ms
- Saves ~100-150KB total

---

## Task 4: Implement Code Splitting

**Problem:**
- All components loaded upfront
- Modals loaded even if not opened

**Impact:** ~200ms initial load savings

**Actions:**

### 4.1 Install Suspense Wrapper
```jsx
// App.jsx
import { Suspense, lazy } from 'react'

const SubmitModal = lazy(() => import('@/components/SubmitModal'))
const SupportersModal = lazy(() => import('@/components/SupportersModal'))
const MenuMobile = lazy(() => import('@/components/MenuMobile'))

// Wrap with Suspense
<Suspense fallback={<div>Loading...</div>}>
  <SubmitModal
    isOpen={isSubmitModalOpen}
    onClose={() => setIsSubmitModalOpen(false)}
    onShowToast={showToast}
  />
</Suspense>
```

### 4.2 Route-based Splitting
```jsx
// Already using React Router, add lazy loading:
const Home = lazy(() => import('@/pages/Home'))
const Category = lazy(() => import('@/pages/Category'))

<Routes>
  <Route path="/" element={
    <Suspense fallback={<LoadingSpinner />}>
      <Home />
    </Suspense>
  } />
  <Route path="/:id" element={
    <Suspense fallback={<LoadingSpinner />}>
      <Category />
    </Suspense>
  } />
</Routes>
```

**Expected Result:**
- Initial bundle: -30-40KB
- Faster initial load
- Better code organization

---

## Task 5: Preload Critical Assets

**Problem:**
- No resource prioritization
- Browser doesn't know what's critical

**Impact:** ~100ms FCP improvement

**Actions:**

### 5.1 Add to index.html <head>
```html
<!-- Preload critical font -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preconnect to external domains -->
<link rel="preconnect" href="https://avatars.githubusercontent.com">
<link rel="preconnect" href="https://fonts.gstatic.com">

<!-- DNS prefetch for less critical domains -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

### 5.2 Preload Hero Image (if any)
```html
<link rel="preload" as="image" href="/hero-bg.webp">
```

**Expected Result:**
- FCP improvement: -100ms
- Better resource prioritization

---

## Task 6: Font Optimization

**Problem:**
- Inter font loaded from Google Fonts
- Potential FOUT (Flash of Unstyled Text)

**Current:** 48KB

**Actions:**

### 6.1 Self-host Inter Font
```bash
# Download Inter font files
npm install @fontsource/inter
```

### 6.2 Update App.jsx or main.jsx
```javascript
import '@fontsource/inter/400.css'
import '@fontsource/inter/500.css'
import '@fontsource/inter/600.css'
import '@fontsource/inter/700.css'
```

### 6.3 Add font-display: swap
```css
@font-face {
  font-family: 'Inter';
  font-display: swap; /* Show fallback immediately */
  src: url('/fonts/inter-var.woff2') format('woff2-variations');
}
```

**Expected Result:**
- No external font request
- Faster font loading
- No layout shift

---

## Task 7: Reduce Server Response Time

**Problem:**
- Server response: ~62ms
- Could be optimized

**Actions:**

### 7.1 Enable HTTP/2
Check Netlify settings (usually enabled by default)

### 7.2 Add Cache Headers
Create `netlify.toml`:
```toml
[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/*.html"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
```

### 7.3 Enable Brotli Compression
Already enabled in Netlify, verify in build settings.

**Expected Result:**
- Faster asset loading
- Better caching strategy

---

## Task 8: Service Worker & Cache Strategy (Optional)

**Problem:**
- No offline capability
- Repeat visits load everything again

**Actions:**

### 8.1 Install Vite PWA Plugin
```bash
npm install vite-plugin-pwa -D
```

### 8.2 Update vite.config.js
```javascript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/avatars\.githubusercontent\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'github-avatars',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
              }
            }
          }
        ]
      }
    })
  ]
})
```

**Expected Result:**
- Instant repeat visits
- Offline capability
- Better UX

---

## Task 9: Resource Hints (Optional)

**Actions:**

### 9.1 Update index.html
```html
<!-- Already added in Task 5 -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="dns-prefetch" href="https://logo.clearbit.com">
<link rel="preconnect" href="https://avatars.githubusercontent.com">
```

---

## Implementation Order

### Phase 1: Quick Wins (Day 1) ⚡
**Estimated Impact:** +15 points

1. ✅ Lazy load Google Analytics (15 min)
2. ✅ Optimize GitHub avatars with size param (20 min)
3. ✅ Add preload/preconnect hints (10 min)

**Expected Score After Phase 1:** 65 → 80

---

### Phase 2: Code Optimization (Day 2) 🔧
**Estimated Impact:** +10 points

4. ✅ Implement code splitting with React.lazy (45 min)
5. ✅ Configure manual chunks in Vite (30 min)
6. ✅ Self-host fonts (30 min)

**Expected Score After Phase 2:** 80 → 90

---

### Phase 3: Advanced (Optional) 🚀
**Estimated Impact:** +5 points

7. ⚠️ Add cache headers in netlify.toml (15 min)
8. 💡 Implement service worker (60 min)
9. 💡 Add bundle visualizer for monitoring (20 min)

**Expected Score After Phase 3:** 90 → 95

---

## Expected Results

### Before Optimization
- Mobile: 65/100
- Desktop: 60/100
- FCP: 3.0s / 2.9s
- LCP: 5.8s / 4.9s
- Bundle: 488KB

### After Phase 1
- Mobile: ~80/100 (+15)
- Desktop: ~75/100 (+15)
- FCP: ~2.2s / 2.0s (-0.8s / -0.9s)
- LCP: ~4.0s / 3.5s (-1.8s / -1.4s)
- Bundle: ~380KB (-108KB)

### After Phase 2
- Mobile: ~90/100 (+10)
- Desktop: ~88/100 (+13)
- FCP: ~1.5s / 1.3s (-0.7s)
- LCP: ~2.8s / 2.3s (-1.2s)
- Bundle: ~300KB (-80KB)

### After Phase 3 (Target)
- Mobile: 92-95/100 (+5)
- Desktop: 93-97/100 (+5)
- FCP: ~1.2s / 1.0s
- LCP: ~2.3s / 1.8s
- Cached repeat visits: instant

---

## Monitoring & Validation

### After Each Phase
1. Run Lighthouse again
2. Check Core Web Vitals
3. Test on real devices
4. Monitor bundle size

### Commands
```bash
# Run Lighthouse
lighthouse https://mossaique.com --preset=perf --form-factor=mobile
lighthouse https://mossaique.com --preset=perf --form-factor=desktop

# Check bundle size
npm run build
ls -lh dist/assets/*.js

# Analyze bundle
npm run build -- --mode analyze
```

---

## Notes

- Each task is independent and can be done separately
- Start with Phase 1 for immediate impact
- Test after each change
- Monitor real user metrics with Google Analytics

---

**Created:** November 10, 2024
**Status:** 🚀 Ready to implement
**Estimated Total Time:** 3-4 hours
**Expected Improvement:** 65 → 90-95 (+25-30 points)
