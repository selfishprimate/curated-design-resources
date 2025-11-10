import { Link } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs mb-6" aria-label="Breadcrumb">
      <ol className="breadcrumbsList flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="breadcrumbItem flex items-center gap-2">
            {index > 0 && (
              <ChevronRight className="breadcrumbSeparator h-4 w-4 text-gray-400 dark:text-gray-500" />
            )}
            {item.path ? (
              <Link
                to={item.path}
                className="breadcrumbLink flex items-center gap-1.5 text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                {index === 0 && <Home className="h-4 w-4" />}
                {item.name}
              </Link>
            ) : (
              <span className="breadcrumbCurrent font-medium text-gray-900 dark:text-white">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
