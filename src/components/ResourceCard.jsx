import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Extract domain from URL for logo API
const getDomainFromUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

// Get initials from resource title
const getInitials = (title) => {
  const words = title.split(' ').filter(word => word.length > 0)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Generate color from string
const getColorFromString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const colors = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-cyan-700',
    'bg-teal-700',
    'bg-green-600',
    'bg-orange-700',
    'bg-red-600',
    'bg-violet-600',
  ]

  return colors[Math.abs(hash) % colors.length]
}

export default function ResourceCard({ resource, showCategory = false }) {
  const navigate = useNavigate()
  const [logoError, setLogoError] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const initials = getInitials(resource.title)
  const bgColor = getColorFromString(resource.title)
  const domain = getDomainFromUrl(resource.link)

  // Use local logo (downloaded by fetch-logos script)
  const logoUrl = `/logos/${domain}.png`

  const handleLogoError = () => {
    // Show initials if local logo doesn't exist
    setLogoError(true)
  }

  const handleCategoryClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/${resource.category.id}`)
  }

  // Pricing badge config
  // Categories where pricing badges should be hidden
  const categoriesWithoutPricing = [
    'articles',
    'blogs',
    'books',
    'tutorials',
    'design-news'
  ]

  const shouldShowPricing = resource.category && !categoriesWithoutPricing.includes(resource.category.id)

  const pricingConfig = {
    free: {
      label: 'Free',
      bg: 'bg-green-100/90 dark:bg-green-900/40',
      text: 'text-green-800 dark:text-green-400'
    },
    freemium: {
      label: 'Freemium',
      bg: 'bg-blue-100/90 dark:bg-blue-900/40',
      text: 'text-blue-800 dark:text-blue-400'
    },
    paid: {
      label: 'Paid',
      bg: 'bg-orange-100/90 dark:bg-orange-900/40',
      text: 'text-orange-800 dark:text-orange-400'
    }
  }

  const pricingInfo = resource.pricing && shouldShowPricing ? pricingConfig[resource.pricing] : null

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="resourceCard group relative rounded-3xl border border-gray-300/75 bg-white/55 p-5 backdrop-blur-md transition-all hover:bg-white/70 hover:backdrop-blur-lg sm:aspect-square dark:border-gray-700/65 dark:bg-gray-900/45 dark:hover:bg-gray-900/60"
    >
      {/* Pricing Badge - Top Right */}
      {pricingInfo && (
        <div className={`pricingBadge absolute right-3 top-3 rounded-full px-3 py-1.5 text-xs font-medium ${pricingInfo.bg} ${pricingInfo.text}`}>
          {pricingInfo.label}
        </div>
      )}

      <div className="cardInner flex h-full flex-col">
        {/* Logo or Initials - Left aligned */}
        <div className="cardLogo mb-4 relative">
          {!logoError ? (
            <>
              <img
                src={logoUrl}
                alt={`${resource.title} logo`}
                className={`logoImage h-12 w-12 rounded-full object-cover transition-opacity duration-200 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onError={handleLogoError}
                onLoad={() => setLogoLoaded(true)}
              />
              {!logoLoaded && (
                <div className={`logoInitials absolute inset-0 flex h-12 w-12 items-center justify-center rounded-full ${bgColor} text-base font-bold text-white`}>
                  {initials}
                </div>
              )}
            </>
          ) : (
            <div className={`logoInitials flex h-12 w-12 items-center justify-center rounded-full ${bgColor} text-base font-bold text-white`}>
              {initials}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="cardContent flex flex-1 flex-col overflow-hidden">
          <h2 className="cardTitle mb-2 line-clamp-2 text-base font-semibold text-gray-900 dark:text-white">
            {resource.title}
          </h2>
          <p className="cardDescription line-clamp-3 text-sm text-gray-600 dark:text-white/80">
            {resource.description}
          </p>
        </div>

        {/* Footer - Category */}
        {showCategory && resource.category && (
          <div className="cardFooter mt-6 sm:mt-3">
            <span
              onClick={handleCategoryClick}
              className="cardCategory cursor-pointer text-xs font-medium uppercase text-gray-500 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-200"
            >
              {resource.category.title}
            </span>
          </div>
        )}
      </div>
    </a>
  )
}
