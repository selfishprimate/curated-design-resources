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
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-cyan-500',
    'bg-teal-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-violet-500',
  ]

  return colors[Math.abs(hash) % colors.length]
}

export default function ResourceCard({ resource, showCategory = false }) {
  const navigate = useNavigate()
  const [logoError, setLogoError] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoServiceIndex, setLogoServiceIndex] = useState(0)
  const initials = getInitials(resource.title)
  const bgColor = getColorFromString(resource.title)
  const domain = getDomainFromUrl(resource.link)

  // Multiple logo services as fallbacks (in case one is blocked by ad blockers)
  const logoServices = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icon.horse/icon/${domain}`,
    `https://logo.clearbit.com/${domain}`
  ]

  const currentLogoUrl = logoServices[logoServiceIndex]

  const handleLogoError = () => {
    // Try next service if available
    if (logoServiceIndex < logoServices.length - 1) {
      setLogoServiceIndex(logoServiceIndex + 1)
      setLogoLoaded(false)
    } else {
      // All services failed, show initials
      setLogoError(true)
    }
  }

  const handleCategoryClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate(`/${resource.category.id}`)
  }

  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-square rounded-3xl border border-gray-200 bg-gray-50 p-5 transition-colors hover:bg-gray-100 dark:border-gray-800/50 dark:bg-gray-900/50 dark:hover:bg-gray-900"
    >
      <div className="flex h-full flex-col">
        {/* Logo or Initials - Left aligned */}
        <div className="mb-4">
          {!logoError ? (
            <>
              <img
                src={currentLogoUrl}
                alt={`${resource.title} logo`}
                className={`h-10 w-10 rounded-full object-cover transition-opacity duration-200 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                onError={handleLogoError}
                onLoad={() => setLogoLoaded(true)}
              />
              {!logoLoaded && (
                <div className={`absolute flex h-10 w-10 items-center justify-center rounded-full ${bgColor} text-sm font-bold text-white`}>
                  {initials}
                </div>
              )}
            </>
          ) : (
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor} text-sm font-bold text-white`}>
              {initials}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 dark:text-white">
            {resource.title}
          </h3>
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {resource.description}
          </p>
        </div>

        {/* Footer - Category */}
        {showCategory && resource.category && (
          <div className="mt-3">
            <span
              onClick={handleCategoryClick}
              className="cursor-pointer text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {resource.category.title}
            </span>
          </div>
        )}
      </div>
    </a>
  )
}
