// SEO Configuration
// You can easily update these values to customize your site's SEO

export const seoConfig = {
  // Site Information
  siteName: 'Mossaique',
  siteUrl: 'https://mossaique.com',
  defaultTitle: 'Mossaique: Your Design Mosaic',
  defaultDescription: 'Your design mosaic. A carefully curated collection of 300+ premium design tools, UI libraries, icons, colors, and learning resources for designers and developers.',
  defaultKeywords: 'mossaique, design resources, design tools, ui design, ux design, prototyping, typography, color palettes, design systems, figma plugins, icons, stock photos, curated design',

  // Social Media
  author: 'selfishprimate',
  social: {
    github: 'https://github.com/selfishprimate/mossaique',
    twitter: '@selfishprimate',
  },

  // Open Graph / Social Media Preview
  defaultImage: '/og-image-dark.jpg',
  imageAlt: 'Mossaique - Your Design Mosaic',

  // Twitter Card
  twitterCardType: 'summary_large_image', // or 'summary'

  // Locale
  locale: 'en_US',

  // SEO metadata for each category (organized for better readability)
  categoryMetadata: {
    'accessibility': {
      title: 'Accessibility',
      description: 'Discover the best accessibility design tools and resources. WCAG guidelines, color contrast checkers, and inclusive design tools to make your products accessible to everyone.',
      keywords: 'accessibility design, WCAG guidelines, color contrast checker, inclusive design, a11y tools, screen reader, accessibility testing, disability design, web accessibility'
    },
    'ai': {
      title: 'AI',
      description: 'Explore cutting-edge AI tools for designers and developers. ChatGPT, Midjourney, DALL-E, and more AI-powered tools for image generation, copywriting, and creative work.',
      keywords: 'AI tools, ChatGPT, Midjourney, DALL-E, AI image generation, AI copywriting, machine learning design, generative AI, AI for designers, Claude AI'
    },
    'articles': {
      title: 'Articles',
      description: 'Read the best design articles and thought leadership content. Stay updated with expert insights on UX/UI design, design thinking, and industry best practices.',
      keywords: 'design articles, UX articles, UI design blog posts, design thinking, design leadership, design best practices, design insights, design theory'
    },
    'blogs': {
      title: 'Blogs',
      description: 'Follow top design blogs and publications. Get daily inspiration, tutorials, and insights from leading designers and design agencies worldwide.',
      keywords: 'design blogs, UX blogs, design publications, design inspiration, design community, design trends, design news, design agencies'
    },
    'books': {
      title: 'Books',
      description: 'Essential design books every designer should read. Curated collection of books on UX design, UI design, typography, color theory, and design thinking.',
      keywords: 'design books, UX books, UI design books, typography books, color theory books, design thinking books, graphic design books, design education'
    },
    'color': {
      title: 'Color',
      description: 'Find the perfect color palette for your design projects. Color generators, palette tools, gradient makers, and color accessibility checkers for designers.',
      keywords: 'color palette, color generator, gradient maker, color scheme, color picker, color theory, color accessibility, palette tools, hex colors'
    },
    'design-news': {
      title: 'Design News',
      description: 'Stay updated with the latest design news and trends. Daily updates on design tools, industry news, and what\'s happening in the design community.',
      keywords: 'design news, design trends, design industry, design updates, design community news, design tools news, design awards, design events'
    },
    'design-systems': {
      title: 'Design Systems',
      description: 'Explore comprehensive design systems and component libraries. Learn from the best design systems by Google, Apple, Airbnb, and other leading companies.',
      keywords: 'design systems, component library, style guide, UI kit, design tokens, design patterns, Material Design, iOS Human Interface, design framework'
    },
    'figma-plugins': {
      title: 'Figma Plugins',
      description: 'Boost your Figma workflow with the best plugins. Discover time-saving Figma plugins for icons, images, accessibility, prototyping, and design automation.',
      keywords: 'Figma plugins, Figma tools, Figma extensions, Figma workflow, design automation, Figma resources, Figma productivity, Figma icons'
    },
    'frontend-design': {
      title: 'Frontend Design',
      description: 'Frontend design resources for developers and designers. CSS frameworks, UI libraries, animation tools, and modern frontend development resources.',
      keywords: 'frontend design, CSS frameworks, Tailwind CSS, Bootstrap, React UI, Vue components, web components, CSS libraries, frontend development'
    },
    'graphic-design': {
      title: 'Graphic Design',
      description: 'Professional graphic design tools and resources. Discover software, templates, mockups, and resources for logo design, branding, and visual communication.',
      keywords: 'graphic design, logo design, branding, visual design, print design, illustration, graphic design software, Adobe Creative Suite'
    },
    'icons': {
      title: 'Icons',
      description: 'Free and premium icon libraries for your design projects. Thousands of icons in SVG, PNG, and icon fonts for web and mobile applications.',
      keywords: 'icons, icon library, SVG icons, icon fonts, free icons, icon sets, UI icons, vector icons, icon pack'
    },
    'inspiration': {
      title: 'Inspiration',
      description: 'Get inspired by the best design work from around the world. Browse design galleries, award-winning websites, and creative portfolios for inspiration.',
      keywords: 'design inspiration, design gallery, design awards, web design showcase, creative portfolio, design examples, design trends, Awwwards'
    },
    'mockup': {
      title: 'Mockup',
      description: 'Professional mockup templates for presenting your designs. Device mockups, print mockups, branding mockups, and scene creators for realistic presentations.',
      keywords: 'mockup templates, device mockups, branding mockup, product mockup, presentation mockup, PSD mockup, scene creator, mockup generator'
    },
    'productivity': {
      title: 'Productivity',
      description: 'Productivity tools to streamline your design workflow. Time management, collaboration tools, and utilities to help designers work more efficiently.',
      keywords: 'productivity tools, time management, collaboration tools, project management, design workflow, task management, team collaboration'
    },
    'prototyping': {
      title: 'Prototyping',
      description: 'Best prototyping tools for interactive design. Create high-fidelity prototypes, test user flows, and validate designs before development.',
      keywords: 'prototyping tools, interactive prototype, wireframe prototype, UX prototype, design prototype, user flow, mockup tools, Figma prototype'
    },
    'stock-photos': {
      title: 'Stock Photos',
      description: 'Free and premium stock photos for commercial use. High-quality stock photography libraries with millions of images for your design projects.',
      keywords: 'stock photos, free stock images, commercial use photos, royalty-free images, stock photography, high-resolution photos, photo library'
    },
    'stock-videos': {
      title: 'Stock Videos',
      description: 'Free and premium stock video footage. Download HD and 4K stock videos for commercial projects, presentations, and creative work.',
      keywords: 'stock videos, free stock footage, video clips, HD videos, 4K videos, commercial use videos, royalty-free videos, video library'
    },
    'tutorials': {
      title: 'Tutorials',
      description: 'Learn design with step-by-step tutorials. Free design tutorials covering UI/UX design, graphic design, web design, and design tools like Figma and Adobe XD.',
      keywords: 'design tutorials, UX tutorials, UI tutorials, Figma tutorials, design courses, learn design, design training, design education'
    },
    'typography': {
      title: 'Typography',
      description: 'Beautiful fonts and typography resources for designers. Free fonts, font pairing tools, web fonts, and typography inspiration for your projects.',
      keywords: 'typography, fonts, typeface, web fonts, Google Fonts, font pairing, typography design, font library, free fonts'
    },
    'ui-animation': {
      title: 'UI Animation',
      description: 'UI animation tools and motion design resources. Create smooth animations, micro-interactions, and engaging motion design for web and mobile apps.',
      keywords: 'UI animation, motion design, micro-interactions, CSS animation, animation library, transition effects, animated UI, Lottie'
    },
    'ui-design': {
      title: 'UI Design',
      description: 'Best UI design resources and inspiration. UI kits, design patterns, component libraries, and tools for creating beautiful user interfaces.',
      keywords: 'UI design, user interface, UI patterns, UI components, interface design, UI kit, design inspiration, app design'
    },
    'ux-design': {
      title: 'UX Design',
      description: 'UX design tools and user research resources. Discover tools for user testing, wireframing, journey mapping, and creating user-centered designs.',
      keywords: 'UX design, user experience, UX research, user testing, journey mapping, wireframing, UX tools, user-centered design'
    },
    'wireframing': {
      title: 'Wireframing',
      description: 'Wireframing tools for rapid prototyping. Create low-fidelity wireframes, sitemaps, and user flows to plan your design projects effectively.',
      keywords: 'wireframing, wireframe tools, low-fidelity wireframe, sitemap, user flow, IA design, wireframe kit, rapid prototyping'
    },
    'others': {
      title: 'Others',
      description: 'More essential design resources and tools. Discover additional design utilities, conversion tools, and resources that don\'t fit other categories.',
      keywords: 'design tools, design utilities, design resources, conversion tools, design helpers, design misc, additional design resources'
    }
  }
}

export default seoConfig
