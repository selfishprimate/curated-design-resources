import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import seoConfig from '../../seo-config'

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
  breadcrumbs = null,
  structuredData = null,
}) {
  const {
    siteName,
    siteUrl,
    defaultTitle,
    defaultDescription,
    defaultKeywords,
    defaultImage,
    imageAlt,
    twitterCardType,
    locale,
    social,
  } = seoConfig

  // Use provided values or fall back to defaults
  const pageTitle = title || defaultTitle
  const pageDescription = description || defaultDescription
  const pageKeywords = keywords || defaultKeywords
  const pageImage = image || defaultImage
  const pageUrl = url || siteUrl
  const fullImageUrl = pageImage.startsWith('http') ? pageImage : `${siteUrl}${pageImage}`

  // Fallback: Manually update meta tags if Helmet fails
  useEffect(() => {
    // Update title
    document.title = pageTitle

    // Update or create meta description
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = pageDescription

    // Update or create meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]')
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta')
      metaKeywords.name = 'keywords'
      document.head.appendChild(metaKeywords)
    }
    metaKeywords.content = pageKeywords
  }, [pageTitle, pageDescription, pageKeywords])

  // Default structured data for website
  const defaultStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    description: defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/category/{category_id}`
      },
      'query-input': 'required name=category_id'
    }
  }

  // Breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.path}`
    }))
  } : null

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={fullImageUrl} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCardType} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={fullImageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {social.twitter && <meta name="twitter:site" content={social.twitter} />}
      {social.twitter && <meta name="twitter:creator" content={social.twitter} />}

      {/* Canonical URL */}
      <link rel="canonical" href={pageUrl} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || defaultStructuredData)}
      </script>

      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
    </Helmet>
  )
}
