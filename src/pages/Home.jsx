import { Link } from 'react-router-dom'
import { categories } from '@/data/categories'
import * as Icons from 'lucide-react'

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

export default function Home() {
  // Reverse categories to show newest first
  const sortedCategories = [...categories].reverse()

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-4 text-5xl font-bold">
            Curated Design Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A comprehensive collection of handpicked design tools, libraries, and resources
            for designers and developers.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-8 pb-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {sortedCategories.map((category) => {
              const IconComponent = iconMap[category.icon]
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group aspect-[4/3] overflow-hidden rounded-lg border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-900"
                >
                  <div className="flex h-full flex-col">
                    <div className="mb-3 flex items-center gap-3">
                      {IconComponent && (
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-200 text-primary-600 dark:bg-gray-800 dark:text-primary-500">
                          <IconComponent className="h-5 w-5" />
                        </div>
                      )}
                      <h3 className="line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                    </div>
                    <p className="line-clamp-3 text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
