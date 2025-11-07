// SEO Configuration
// You can easily update these values to customize your site's SEO

export const seoConfig = {
  // Site Information
  siteName: 'Curated Design Resources',
  siteUrl: 'https://curated-design-resources.netlify.app',
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

  // Custom meta descriptions for each category (SEO optimized)
  categoryDescriptions: {
    'accessibility': 'Discover the best accessibility design tools and resources. WCAG guidelines, color contrast checkers, and inclusive design tools to make your products accessible to everyone.',
    'ai': 'Explore cutting-edge AI tools for designers and developers. ChatGPT, Midjourney, DALL-E, and more AI-powered tools for image generation, copywriting, and creative work.',
    'articles': 'Read the best design articles and thought leadership content. Stay updated with expert insights on UX/UI design, design thinking, and industry best practices.',
    'blogs': 'Follow top design blogs and publications. Get daily inspiration, tutorials, and insights from leading designers and design agencies worldwide.',
    'books': 'Essential design books every designer should read. Curated collection of books on UX design, UI design, typography, color theory, and design thinking.',
    'color': 'Find the perfect color palette for your design projects. Color generators, palette tools, gradient makers, and color accessibility checkers for designers.',
    'design-news': 'Stay updated with the latest design news and trends. Daily updates on design tools, industry news, and what\'s happening in the design community.',
    'design-systems': 'Explore comprehensive design systems and component libraries. Learn from the best design systems by Google, Apple, Airbnb, and other leading companies.',
    'figma-plugins': 'Boost your Figma workflow with the best plugins. Discover time-saving Figma plugins for icons, images, accessibility, prototyping, and design automation.',
    'frontend-design': 'Frontend design resources for developers and designers. CSS frameworks, UI libraries, animation tools, and modern frontend development resources.',
    'graphic-design': 'Professional graphic design tools and resources. Discover software, templates, mockups, and resources for logo design, branding, and visual communication.',
    'icons': 'Free and premium icon libraries for your design projects. Thousands of icons in SVG, PNG, and icon fonts for web and mobile applications.',
    'inspiration': 'Get inspired by the best design work from around the world. Browse design galleries, award-winning websites, and creative portfolios for inspiration.',
    'mockup': 'Professional mockup templates for presenting your designs. Device mockups, print mockups, branding mockups, and scene creators for realistic presentations.',
    'productivity': 'Productivity tools to streamline your design workflow. Time management, collaboration tools, and utilities to help designers work more efficiently.',
    'prototyping': 'Best prototyping tools for interactive design. Create high-fidelity prototypes, test user flows, and validate designs before development.',
    'stock-photos': 'Free and premium stock photos for commercial use. High-quality stock photography libraries with millions of images for your design projects.',
    'stock-videos': 'Free and premium stock video footage. Download HD and 4K stock videos for commercial projects, presentations, and creative work.',
    'tutorials': 'Learn design with step-by-step tutorials. Free design tutorials covering UI/UX design, graphic design, web design, and design tools like Figma and Adobe XD.',
    'typography': 'Beautiful fonts and typography resources for designers. Free fonts, font pairing tools, web fonts, and typography inspiration for your projects.',
    'ui-animation': 'UI animation tools and motion design resources. Create smooth animations, micro-interactions, and engaging motion design for web and mobile apps.',
    'ui-design': 'Best UI design resources and inspiration. UI kits, design patterns, component libraries, and tools for creating beautiful user interfaces.',
    'ux-design': 'UX design tools and user research resources. Discover tools for user testing, wireframing, journey mapping, and creating user-centered designs.',
    'wireframing': 'Wireframing tools for rapid prototyping. Create low-fidelity wireframes, sitemaps, and user flows to plan your design projects effectively.',
    'others': 'More essential design resources and tools. Discover additional design utilities, conversion tools, and resources that don\'t fit other categories.'
  },

  // Custom keywords for each category (SEO optimized)
  categoryKeywords: {
    'accessibility': 'accessibility design, WCAG guidelines, color contrast checker, inclusive design, a11y tools, screen reader, accessibility testing, disability design, web accessibility',
    'ai': 'AI tools, ChatGPT, Midjourney, DALL-E, AI image generation, AI copywriting, machine learning design, generative AI, AI for designers, Claude AI',
    'articles': 'design articles, UX articles, UI design blog posts, design thinking, design leadership, design best practices, design insights, design theory',
    'blogs': 'design blogs, UX blogs, design publications, design inspiration, design community, design trends, design news, design agencies',
    'books': 'design books, UX books, UI design books, typography books, color theory books, design thinking books, graphic design books, design education',
    'color': 'color palette, color generator, gradient maker, color scheme, color picker, color theory, color accessibility, palette tools, hex colors',
    'design-news': 'design news, design trends, design industry, design updates, design community news, design tools news, design awards, design events',
    'design-systems': 'design systems, component library, style guide, UI kit, design tokens, design patterns, Material Design, iOS Human Interface, design framework',
    'figma-plugins': 'Figma plugins, Figma tools, Figma extensions, Figma workflow, design automation, Figma resources, Figma productivity, Figma icons',
    'frontend-design': 'frontend design, CSS frameworks, Tailwind CSS, Bootstrap, React UI, Vue components, web components, CSS libraries, frontend development',
    'graphic-design': 'graphic design, logo design, branding, visual design, print design, illustration, graphic design software, Adobe Creative Suite',
    'icons': 'icons, icon library, SVG icons, icon fonts, free icons, icon sets, UI icons, vector icons, icon pack',
    'inspiration': 'design inspiration, design gallery, design awards, web design showcase, creative portfolio, design examples, design trends, Awwwards',
    'mockup': 'mockup templates, device mockups, branding mockup, product mockup, presentation mockup, PSD mockup, scene creator, mockup generator',
    'productivity': 'productivity tools, time management, collaboration tools, project management, design workflow, task management, team collaboration',
    'prototyping': 'prototyping tools, interactive prototype, wireframe prototype, UX prototype, design prototype, user flow, mockup tools, Figma prototype',
    'stock-photos': 'stock photos, free stock images, commercial use photos, royalty-free images, stock photography, high-resolution photos, photo library',
    'stock-videos': 'stock videos, free stock footage, video clips, HD videos, 4K videos, commercial use videos, royalty-free videos, video library',
    'tutorials': 'design tutorials, UX tutorials, UI tutorials, Figma tutorials, design courses, learn design, design training, design education',
    'typography': 'typography, fonts, typeface, web fonts, Google Fonts, font pairing, typography design, font library, free fonts',
    'ui-animation': 'UI animation, motion design, micro-interactions, CSS animation, animation library, transition effects, animated UI, Lottie',
    'ui-design': 'UI design, user interface, UI patterns, UI components, interface design, UI kit, design inspiration, app design',
    'ux-design': 'UX design, user experience, UX research, user testing, journey mapping, wireframing, UX tools, user-centered design',
    'wireframing': 'wireframing, wireframe tools, low-fidelity wireframe, sitemap, user flow, IA design, wireframe kit, rapid prototyping',
    'others': 'design tools, design utilities, design resources, conversion tools, design helpers, design misc, additional design resources'
  }
}

export default seoConfig
