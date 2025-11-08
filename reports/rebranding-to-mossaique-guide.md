# Mossaique Rebranding Guide
**Complete Step-by-Step Migration Plan**
**From:** Curated Design Resources → **To:** Mossaique
**Date:** 2025-11-08

---

## Table of Contents
1. [Pre-Migration Checklist](#pre-migration-checklist)
2. [Phase 1: Domain Acquisition](#phase-1-domain-acquisition)
3. [Phase 2: Code Updates](#phase-2-code-updates)
4. [Phase 3: GitHub Repository](#phase-3-github-repository)
5. [Phase 4: Netlify Configuration](#phase-4-netlify-configuration)
6. [Phase 5: DNS Configuration](#phase-5-dns-configuration)
7. [Phase 6: SEO & Redirects](#phase-6-seo--redirects)
8. [Phase 7: Post-Launch](#phase-7-post-launch)
9. [Rollback Plan](#rollback-plan)
10. [Final Checklist](#final-checklist)

---

## Pre-Migration Checklist

Before starting the migration, ensure you have:

- [ ] **Squarespace account** ready for domain purchase
- [ ] **GitHub admin access** to the repository
- [ ] **Netlify admin access** to the site
- [ ] **Backup** of current site (git commit)
- [ ] **Budget confirmed** for domain purchase (~$20-40/year)
- [ ] **Social media handles** checked (@mossaique availability)
- [ ] **Trademark search** completed (no conflicts)

---

## Phase 1: Domain Acquisition

### Step 1.1: Purchase Domain from Squarespace

1. Go to [Squarespace Domains](https://domains.squarespace.com/)
2. Search for **mossaique.com**
3. Add to cart and proceed to checkout
4. **Important**: Do NOT enable auto-renewal of bundled services you don't need
5. Complete purchase
6. Wait for confirmation email (usually instant)

**Estimated Time:** 10 minutes
**Cost:** ~$20-40/year

### Step 1.2: Optional Additional Domains

Consider purchasing these for brand protection:
- [ ] mosaic.com (if available and budget allows)
- [ ] mossaique.design
- [ ] mossaique.tools
- [ ] mossaique.dev

**Note:** These can be purchased later; mossaique.com is the priority

---

## Phase 2: Code Updates

### Step 2.1: Update Package Information

**File:** `package.json`

```json
{
  "name": "mossaique",
  "version": "1.0.0",
  "description": "Mossaique - Your design mosaic. A curated collection of 300+ premium design tools and resources.",
  "homepage": "https://mossaique.com",
  "repository": {
    "type": "git",
    "url": "https://github.com/selfishprimate/mossaique.git"
  },
  "bugs": {
    "url": "https://github.com/selfishprimate/mossaique/issues"
  }
}
```

### Step 2.2: Update SEO Configuration

**File:** `seo-config.js`

```javascript
export default {
  siteUrl: 'https://mossaique.com',
  siteName: 'Mossaique',
  defaultTitle: 'Mossaique - Curated Design Resources',
  defaultDescription: 'Your design mosaic. A carefully curated collection of 300+ premium design tools, UI libraries, icons, colors, and learning resources.',
  defaultKeywords: [
    'mossaique',
    'design resources',
    'design tools',
    'ui design',
    'curated design',
    'design mosaic',
    // ... keep existing keywords
  ],
  twitterHandle: '@mossaique',
  // ... rest of config
}
```

### Step 2.3: Update HTML Meta Tags

**File:** `index.html`

```html
<!-- Application Name -->
<meta name="application-name" content="Mossaique" />

<!-- Open Graph -->
<meta property="og:site_name" content="Mossaique" />

<!-- Twitter -->
<meta name="twitter:site" content="@mossaique" />
<meta name="twitter:creator" content="@selfishprimate" />
```

### Step 2.4: Update README.md

**File:** `README.md`

Update all references:
- Replace "Curated Design Resources" with "Mossaique"
- Update repository URLs
- Update demo site URL to mossaique.com
- Update badge URLs (if any)

Example header:
```markdown
# Mossaique

> Your design mosaic - A curated collection of 300+ premium design tools and resources

[Visit Mossaique](https://mossaique.com) | [Submit a Resource](https://mossaique.com) | [Contribute](#contributing)
```

### Step 2.5: Update Component Text

**File:** `src/pages/Home.jsx`

Update hero section title if needed:
```jsx
<h1>
  Discover the best design tools and resources for your next project!
</h1>
<p>
  Mossaique - A carefully curated collection of 300+ premium design tools...
</p>
```

### Step 2.6: Update Footer/Header (if applicable)

Check any footer or header components for hardcoded site name references.

### Step 2.7: Generate New Manifest

**File:** `public/manifest.json` (if exists)

```json
{
  "name": "Mossaique",
  "short_name": "Mossaique",
  "description": "Curated design resources - Your design mosaic",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#030712"
}
```

### Step 2.8: Test Locally

```bash
npm run dev
```

Check:
- [ ] All text displays correctly
- [ ] No broken references
- [ ] SEO tags look good (use browser dev tools)
- [ ] Console has no errors

### Step 2.9: Commit Changes

```bash
git add .
git commit -m "Rebrand to Mossaique - Update site name and metadata

- Update package.json with new name and URLs
- Update SEO configuration with mossaique.com
- Update meta tags and site references
- Update README with new branding
- Prepare for domain migration

🎨 Mossaique - Your design mosaic"

git push origin master
```

**Estimated Time:** 30-45 minutes

---

## Phase 3: GitHub Repository

### Step 3.1: Rename Repository

⚠️ **Important:** GitHub automatically sets up redirects from old URL to new URL

1. Go to repository: `https://github.com/selfishprimate/curated-design-resources`
2. Click **Settings** tab
3. Scroll to **Repository name** section
4. Change name from `curated-design-resources` to `mossaique`
5. Click **Rename**

**New URL:** `https://github.com/selfishprimate/mossaique`

### Step 3.2: Update Repository Description

1. Go to main repo page
2. Click gear icon next to **About**
3. Update description: "Mossaique - Your design mosaic. Curated design resources for designers and developers."
4. Update website: `https://mossaique.com`
5. Update topics/tags: `design`, `design-resources`, `mossaique`, `curated`, `design-tools`

### Step 3.3: Update Local Git Remote (Optional)

Your local repo will still work with the old URL (GitHub redirects), but to update:

```bash
git remote set-url origin https://github.com/selfishprimate/mossaique.git
git remote -v  # Verify
```

### Step 3.4: Update GitHub Pages (if enabled)

If you're using GitHub Pages:
1. Settings → Pages
2. Verify custom domain is set to `mossaique.com`

**Estimated Time:** 5 minutes

---

## Phase 4: Netlify Configuration

### Step 4.1: Update Site Name

1. Log in to [Netlify](https://app.netlify.com)
2. Go to your site
3. Click **Site settings**
4. Under **Site details** → **Site information**
5. Click **Change site name**
6. Enter new name: `mossaique` (creates mossaique.netlify.app)
7. Click **Save**

**New Netlify URL:** `https://mossaique.netlify.app`

### Step 4.2: Verify Build Settings

1. Go to **Site settings** → **Build & deploy**
2. Verify:
   - Repository: `selfishprimate/mossaique`
   - Base directory: (empty or root)
   - Build command: `npm run build`
   - Publish directory: `dist`

### Step 4.3: Update Environment Variables (if any)

1. Go to **Site settings** → **Environment variables**
2. Update any variables that reference the old domain

**Estimated Time:** 5 minutes

---

## Phase 5: DNS Configuration

### Step 5.1: Get Netlify DNS Records

1. In Netlify, go to **Domain settings**
2. Click **Add custom domain**
3. Enter: `mossaique.com`
4. Click **Verify**
5. Netlify will show you DNS records to configure:

**A Record:**
```
Type: A
Name: @
Value: 75.2.60.5 (Netlify's IP - verify current IP in Netlify)
TTL: 3600
```

**CNAME Record (www):**
```
Type: CNAME
Name: www
Value: mossaique.netlify.app
TTL: 3600
```

### Step 5.2: Configure DNS in Squarespace

1. Log in to [Squarespace Domains](https://account.squarespace.com/domains)
2. Click on **mossaique.com**
3. Go to **DNS Settings** (or **Advanced DNS**)
4. Add the records from Netlify:

**Add A Record:**
- Type: `A`
- Host: `@` (or leave empty)
- Points to: `75.2.60.5` (verify from Netlify)
- TTL: `3600` (or auto)

**Add CNAME Record:**
- Type: `CNAME`
- Host: `www`
- Points to: `mossaique.netlify.app`
- TTL: `3600` (or auto)

5. **Remove any conflicting records** (old A or CNAME records)
6. Click **Save** or **Apply**

### Step 5.3: Wait for DNS Propagation

- **Time:** 5 minutes to 48 hours (usually 15-30 minutes)
- Check propagation: https://dnschecker.org (search `mossaique.com`)

### Step 5.4: Enable HTTPS in Netlify

1. Once DNS is verified, go to Netlify **Domain settings**
2. Under **HTTPS**, click **Verify DNS configuration**
3. Once verified, click **Provision certificate**
4. Wait for SSL certificate (usually 1-5 minutes)
5. Enable **Force HTTPS** (redirects http → https)

**Estimated Time:** 15-30 minutes (mostly waiting for DNS)

---

## Phase 6: SEO & Redirects

### Step 6.1: Set Up Old Domain Redirect (if applicable)

If the old site is still hosted somewhere:

Create `_redirects` file in Netlify public folder:

**File:** `public/_redirects`

```
# Redirect old Netlify domain to new domain
https://curated-design-resources.netlify.app/* https://mossaique.com/:splat 301!
http://curated-design-resources.netlify.app/* https://mossaique.com/:splat 301!
```

### Step 6.2: Add Alternative Spelling Redirect

If you purchase mosaic.com later:

```
# Redirect alternative spelling
https://mosaic.com/* https://mossaique.com/:splat 301!
https://www.mosaic.com/* https://mossaique.com/:splat 301!
```

### Step 6.3: Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add new property: `mossaique.com`
3. Verify ownership (use DNS TXT record or HTML file)
4. Submit sitemap: `https://mossaique.com/sitemap.xml`
5. Request indexing for homepage

### Step 6.4: Update Old Property (if exists)

If old domain was in Search Console:
1. Add "Change of address" notification
2. Point old domain → new domain

### Step 6.5: Submit Sitemap

**File:** `public/sitemap.xml` (if doesn't exist, create)

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mossaique.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <!-- Add category pages -->
</urlset>
```

Or use automated sitemap generation:

```bash
npm install --save-dev vite-plugin-sitemap
```

### Step 6.6: Update robots.txt

**File:** `public/robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://mossaique.com/sitemap.xml
```

**Estimated Time:** 20 minutes

---

## Phase 7: Post-Launch

### Step 7.1: Test Everything

**Functionality Checklist:**
- [ ] Homepage loads on mossaique.com
- [ ] www.mossaique.com redirects to mossaique.com
- [ ] HTTPS is enabled (green lock icon)
- [ ] All pages work correctly
- [ ] All links work
- [ ] Forms work (if any)
- [ ] Images load correctly
- [ ] Favicon displays correctly
- [ ] Mobile responsive
- [ ] Dark mode works

**SEO Checklist:**
- [ ] Title shows "Mossaique"
- [ ] Meta description updated
- [ ] Open Graph tags correct
- [ ] Twitter Card tags correct
- [ ] Sitemap accessible at /sitemap.xml
- [ ] robots.txt accessible

### Step 7.2: Update Social Media

**Update links on:**
- [ ] Twitter/X bio (@selfishprimate)
- [ ] GitHub profile
- [ ] LinkedIn
- [ ] Portfolio site
- [ ] Any other listings

### Step 7.3: Register Social Handles

Try to register @mossaique on:
- [ ] Twitter/X
- [ ] Instagram
- [ ] LinkedIn
- [ ] Facebook
- [ ] Threads
- [ ] Bluesky
- [ ] Product Hunt

### Step 7.4: Update External Listings

**Update on:**
- [ ] Product Hunt (if listed)
- [ ] Hacker News (if posted)
- [ ] Reddit threads (if mentioned)
- [ ] Design communities
- [ ] Newsletter mentions

### Step 7.5: Announce the Rebrand

**Create announcement:**

1. **GitHub Release/Announcement:**
```markdown
# 🎨 Introducing Mossaique

We're excited to announce our rebrand from "Curated Design Resources" to **Mossaique**!

## What's New?
- New domain: [mossaique.com](https://mossaique.com)
- New name: Mossaique (your design mosaic)
- Same great curated resources you love

## Why Mossaique?
Just like a mosaic is made of many beautiful pieces forming a complete picture,
Mossaique brings together the best design resources to help you create amazing projects.

🔗 Visit us at: https://mossaique.com
```

2. **Social Media Posts:**
```
🎨 Exciting news! Curated Design Resources is now Mossaique!

Your design mosaic - Same curated excellence, new name.

✨ mossaique.com

#design #designtools #webdesign #uidesign
```

3. **README Badge (optional):**
```markdown
![Mossaique](https://img.shields.io/badge/Mossaique-Your%20Design%20Mosaic-FF3737?style=flat-square)
```

### Step 7.6: Monitor Analytics

**First 24 hours:**
- Check traffic on new domain
- Monitor for 404 errors
- Check search console for crawl errors
- Verify redirects working

**First week:**
- Monitor search rankings
- Check referral sources
- Verify social shares working

### Step 7.7: Backup Everything

```bash
git tag -a v2.0.0 -m "Rebranded to Mossaique"
git push origin v2.0.0
```

**Estimated Time:** 2-3 hours (spread over several days)

---

## Rollback Plan

If something goes wrong, here's how to rollback:

### Emergency Rollback Steps

1. **DNS Rollback:**
   - Remove new DNS records in Squarespace
   - Point back to old hosting (if exists)

2. **Code Rollback:**
   ```bash
   git revert HEAD~1  # Revert last commit
   git push origin master
   ```

3. **GitHub Rollback:**
   - Go to Settings → Rename repository back
   - Update repository description

4. **Netlify Rollback:**
   - Go to Deploys → find last working deploy
   - Click "Publish deploy"
   - Change site name back (if needed)

---

## Final Checklist

### Pre-Launch
- [ ] Domain purchased (mossaique.com)
- [ ] Code updated and tested locally
- [ ] GitHub repo renamed
- [ ] Netlify site renamed
- [ ] DNS records configured
- [ ] Backup created (git tag)

### Launch
- [ ] DNS propagated
- [ ] SSL certificate provisioned
- [ ] HTTPS enabled and forced
- [ ] Site accessible at mossaique.com
- [ ] Redirects working

### Post-Launch
- [ ] All pages tested
- [ ] SEO tags verified
- [ ] Search Console updated
- [ ] Sitemap submitted
- [ ] Social media updated
- [ ] Announcement posted
- [ ] Analytics monitoring

---

## Timeline Summary

| Phase | Task | Time | Can Start |
|-------|------|------|-----------|
| 1 | Domain purchase | 10 min | Immediately |
| 2 | Code updates | 45 min | Immediately |
| 3 | GitHub rename | 5 min | After code |
| 4 | Netlify config | 5 min | After GitHub |
| 5 | DNS setup | 15-30 min | After domain |
| 6 | SEO & redirects | 20 min | After DNS |
| 7 | Testing & announcement | 2-3 hrs | After DNS propagation |

**Total Active Time:** ~2-3 hours
**Total Elapsed Time:** 1-2 days (due to DNS propagation)

---

## Important Notes

### ⚠️ Critical Reminders

1. **Backup Before Changes:** Always commit code before major changes
2. **DNS Propagation:** Can take up to 48 hours, but usually 15-30 minutes
3. **SSL Certificate:** May take 5-10 minutes to provision after DNS verification
4. **Search Rankings:** May fluctuate for 2-4 weeks after domain change
5. **Old Domain:** Keep redirects in place for at least 6-12 months

### 💡 Pro Tips

1. **Timing:** Launch on a weekday morning for quick issue resolution
2. **Monitoring:** Use uptime monitoring (like UptimeRobot) during transition
3. **Communication:** Announce rebrand to existing users/followers
4. **Gradual:** You can test with DNS before changing code
5. **Analytics:** Set up Google Analytics with new domain

---

## Support Resources

- **Squarespace DNS Help:** https://support.squarespace.com/hc/en-us/articles/205812378
- **Netlify Custom Domains:** https://docs.netlify.com/domains-https/custom-domains/
- **GitHub Rename Repo:** https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- **Google Search Console:** https://search.google.com/search-console

---

## Contact for Issues

If you encounter problems:

1. **DNS Issues:** Check Squarespace support or DNS checker
2. **Netlify Issues:** Check Netlify support docs or status page
3. **Code Issues:** Review git history and rollback if needed
4. **General:** GitHub Issues in the repository

---

**Report prepared by:** Claude Code
**Date:** November 8, 2025
**Status:** Ready for execution ✅

---

## Next Immediate Steps

1. ✅ Purchase mossaique.com from Squarespace
2. ⏳ Update code (Phase 2)
3. ⏳ Rename GitHub repo (Phase 3)
4. ⏳ Configure Netlify (Phase 4)
5. ⏳ Set up DNS (Phase 5)
6. ⏳ Wait for DNS propagation
7. ⏳ Test and announce! 🎉

**Good luck with the rebrand! 🎨✨**
