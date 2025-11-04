// SEO Configuration
// You can easily update these values to customize your site's SEO

export const seoConfig = {
  // Site Information
  siteName: 'Curated Design Resources',
  siteUrl: 'https://designresourc.es', // Update with your actual domain
  defaultTitle: 'Curated Design Resources - Handpicked Design Tools & Libraries',
  defaultDescription: 'A comprehensive collection of handpicked design tools, libraries, and resources for designers and developers. Discover the best resources for UI/UX design, prototyping, color palettes, typography, and more.',
  defaultKeywords: 'design resources, design tools, ui design, ux design, prototyping, typography, color palettes, design systems, figma plugins, icons, stock photos',

  // Social Media
  author: 'selfishprimate',
  social: {
    github: 'https://github.com/selfishprimate/curated-design-resources',
    twitter: '@selfishprimate', // Optional: Update with your Twitter handle
  },

  // Open Graph / Social Media Preview
  defaultImage: '/og-image.jpg', // Update with actual OG image path (1200x630px recommended)
  imageAlt: 'Curated Design Resources',

  // Twitter Card
  twitterCardType: 'summary_large_image', // or 'summary'

  // Locale
  locale: 'en_US',

  // Category Page Templates
  categoryPageTitle: (categoryTitle) => `${categoryTitle} - Curated Design Resources`,
  categoryPageDescription: (categoryTitle, categoryDescription) =>
    `${categoryDescription} Explore our curated collection of ${categoryTitle.toLowerCase()} resources.`,
}

export default seoConfig
