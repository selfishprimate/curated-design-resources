import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load pricing data
const pricingPath = path.join(__dirname, '..', 'src', 'data', 'pricing.json');
let pricingData = {};
try {
  const pricingContent = fs.readFileSync(pricingPath, 'utf-8');
  pricingData = JSON.parse(pricingContent).pricing || {};
} catch (error) {
  console.warn('⚠️  Could not load pricing.json, continuing without pricing data');
}

// Icon mapping based on category names
const iconMap = {
  'accessibility': 'Eye',
  'ai': 'Sparkles',
  'articles': 'FileText',
  'blogs': 'Rss',
  'books': 'Book',
  'color': 'Palette',
  'design news': 'Newspaper',
  'design systems': 'Grid',
  'figma plugins': 'Plug',
  'frontend design': 'Code',
  'graphic design': 'PenTool',
  'icons': 'Sparkles',
  'inspiration': 'Lightbulb',
  'mockup': 'Image',
  'productivity': 'Zap',
  'prototyping': 'Layers',
  'stock photos': 'Camera',
  'stock videos': 'Video',
  'tutorials': 'GraduationCap',
  'typography': 'Type',
  'ui animation': 'Play',
  'ui design': 'Layout',
  'ux design': 'Users',
  'wireframing': 'Box',
  'others': 'MoreHorizontal'
};

function parseReadme() {
  // Read README.md
  const readmePath = path.join(__dirname, '..', 'README.md');
  const content = fs.readFileSync(readmePath, 'utf-8');

  // Split by ## headers
  const sections = content.split(/^## /gm).slice(1); // Skip the first split (before first ##)

  const categories = [];
  const ignoredSections = ['contribution', 'table of contents'];
  let globalResourceIndex = 0; // Track global order of resources

  sections.forEach(section => {
    const lines = section.trim().split('\n');
    const title = lines[0].trim();
    const titleLower = title.toLowerCase();

    // Skip ignored sections
    if (ignoredSections.includes(titleLower)) {
      return;
    }

    // Create category ID (kebab-case)
    const id = titleLower.replace(/\s+/g, '-');

    // Find description (italic text between title and first list item)
    let description = '';
    const descMatch = section.match(/_(.+?)_/);
    if (descMatch) {
      description = descMatch[1];
    }

    // Parse resources
    const resources = [];
    const resourceRegex = /- \[(.+?)\]\((.+?)\):?\s*(.+?)$/gm;
    let match;

    while ((match = resourceRegex.exec(section)) !== null) {
      const title = match[1].trim();
      const link = match[2].trim();

      // Create slug from title for pricing lookup
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      resources.push({
        title,
        link,
        description: match[3].trim(),
        globalIndex: globalResourceIndex++,
        pricing: pricingData[slug] || null
      });
    }

    // Sort resources alphabetically by title
    resources.sort((a, b) => a.title.localeCompare(b.title, 'en', { sensitivity: 'base' }));

    // Get icon
    const icon = iconMap[titleLower] || 'Circle';

    const category = {
      id,
      title,
      description: description || `Resources for ${title}`,
      icon,
      resources
    };

    categories.push(category);

    // Write individual JSON file for this category
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const jsonPath = path.join(dataDir, `${id}.json`);
    fs.writeFileSync(jsonPath, JSON.stringify(category, null, 2), 'utf-8');

    console.log(`✓ Generated ${id}.json (${resources.length} resources)`);
  });

  // Create categories index
  const categoriesIndex = categories.map(cat => ({
    id: cat.id,
    title: cat.title,
    description: cat.description,
    icon: cat.icon,
    resourceCount: cat.resources.length
  }));

  const indexPath = path.join(__dirname, '..', 'src', 'data', 'categories-index.json');
  fs.writeFileSync(indexPath, JSON.stringify(categoriesIndex, null, 2), 'utf-8');
  console.log(`\n✓ Generated categories-index.json (${categories.length} categories)`);

  console.log('\n✅ README.md successfully parsed!');
  console.log(`   Total categories: ${categories.length}`);
  console.log(`   Total resources: ${categories.reduce((sum, cat) => sum + cat.resources.length, 0)}`);
}

parseReadme();
