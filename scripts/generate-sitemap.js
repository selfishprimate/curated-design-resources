import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Import categories (we'll read the JSON files directly)
const dataDir = path.join(__dirname, '../src/data')

// Read all category JSON files
const categoryFiles = [
  'accessibility',
  'ai',
  'articles',
  'blogs',
  'books',
  'color',
  'design-news',
  'design-systems',
  'figma-plugins',
  'frontend-design',
  'graphic-design',
  'icons',
  'inspiration',
  'mockup',
  'productivity',
  'prototyping',
  'stock-photos',
  'stock-videos',
  'tutorials',
  'typography',
  'ui-animation',
  'ui-design',
  'ux-design',
  'wireframing',
  'others'
]

const siteUrl = 'https://curated-design-resources.netlify.app'
const today = new Date().toISOString().split('T')[0]

// Start sitemap XML
let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>

`

// Add category pages
categoryFiles.forEach(categoryId => {
  sitemap += `  <!-- Category: ${categoryId} -->
  <url>
    <loc>${siteUrl}/category/${categoryId}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>

`
})

// Close sitemap
sitemap += `</urlset>`

// Write sitemap to public directory
const outputPath = path.join(__dirname, '../public/sitemap.xml')
fs.writeFileSync(outputPath, sitemap, 'utf-8')

console.log('✅ Sitemap generated successfully!')
console.log(`   - Homepage: 1 URL`)
console.log(`   - Categories: ${categoryFiles.length} URLs`)
console.log(`   - Total: ${categoryFiles.length + 1} URLs`)
console.log(`   - Output: ${outputPath}`)
