import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'

// Extract domain from URL for logo API
const getDomainFromUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

export default function ResourceCard({ resource, showCategory = false }) {
  return (
    <a
      href={resource.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative aspect-[4/3] border-b border-r border-gray-200 bg-gray-50 p-5 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900"
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img
            src={`https://logo.clearbit.com/${getDomainFromUrl(resource.link)}`}
            alt={`${resource.title} logo`}
            className="h-12 w-12 rounded-lg object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
            }}
          />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 font-semibold text-gray-900 dark:text-white">
              {resource.title}
            </h3>
            <ExternalLink className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400" />
          </div>
          <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">
            {resource.description}
          </p>
        </div>

        {/* Category Badge (optional) */}
        {showCategory && resource.category && (
          <div className="mt-3 flex items-center gap-2 border-t border-gray-200 pt-3 dark:border-gray-800">
            <Link
              to={`/category/${resource.category.id}`}
              onClick={(e) => e.stopPropagation()}
              className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              {resource.category.title}
            </Link>
          </div>
        )}
      </div>
    </a>
  )
}
