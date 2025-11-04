import { Helmet } from 'react-helmet-async'
import seoConfig from '@/config/seo'

export default function SEO({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
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
    </Helmet>
  )
}
