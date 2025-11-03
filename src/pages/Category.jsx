import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { categories } from '@/data/categories'
import * as Icons from 'lucide-react'

// Extract domain from URL for logo API
const getDomainFromUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

const iconMap = {
  Eye: Icons.Eye,
  FileText: Icons.FileText,
  Rss: Icons.Rss,
  Book: Icons.Book,
  Palette: Icons.Palette,
  Newspaper: Icons.Newspaper,
  Grid: Icons.Grid,
  Plug: Icons.Plug,
  Code: Icons.Code,
  PenTool: Icons.PenTool,
  Sparkles: Icons.Sparkles,
  Lightbulb: Icons.Lightbulb,
  Image: Icons.Image,
  Zap: Icons.Zap,
  Layers: Icons.Layers,
  Camera: Icons.Camera,
  Video: Icons.Video,
  GraduationCap: Icons.GraduationCap,
  Type: Icons.Type,
  Play: Icons.Play,
  Layout: Icons.Layout,
  Users: Icons.Users,
  Box: Icons.Box,
  MoreHorizontal: Icons.MoreHorizontal,
  Circle: Icons.Circle
}

export default function Category() {
  const { id } = useParams()
  const category = categories.find(cat => cat.id === id)

  if (!category) {
    return (
      <div className="bg-white p-8 text-gray-900 dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <div className="mt-8">
            <h1 className="text-3xl font-bold">Category not found</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              The category you're looking for doesn't exist.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const IconComponent = iconMap[category.icon]

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-8 dark:border-gray-800">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mt-6 flex items-center gap-4">
            {/* {IconComponent && (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-primary-600 dark:bg-gray-900 dark:text-primary-500">
                <IconComponent className="h-8 w-8" />
              </div>
            )} */}
            <div>
              <h1 className="text-4xl font-bold">{category.title}</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div>
        {category.resources.length === 0 ? (
          <div className="border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900/50">
            <p className="text-gray-600 dark:text-gray-400">
              No resources available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {category.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-[4/3] border-b border-r border-gray-200 bg-gray-50 p-5 transition-colors hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:bg-gray-900"
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="flex-1 overflow-hidden">
                    <div className="mb-3 flex items-start gap-3">
                      <img
                        src={`https://logo.clearbit.com/${getDomainFromUrl(resource.link)}`}
                        alt={`${resource.title} logo`}
                        className="h-10 w-10 flex-shrink-0 rounded-lg object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none'
                        }}
                      />
                      <div className="flex-1 overflow-hidden">
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
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
