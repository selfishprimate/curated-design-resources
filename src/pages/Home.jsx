import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'
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
    <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white px-8 py-20 dark:border-gray-800 dark:from-gray-900 dark:to-gray-950">
        <div className="mx-auto max-w-7xl text-center">
          <h1 className="mb-6 text-6xl font-bold tracking-tight">
            Curated Design Resources
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            A comprehensive collection of handpicked design tools, libraries, and resources
            for designers and developers.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/selfishprimate/curated-design-resources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
            <a
              href="https://github.com/selfishprimate/curated-design-resources/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-950 dark:text-white dark:hover:bg-gray-900"
            >
              Contribute
            </a>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="flex-1 px-8 py-16">
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

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white px-8 py-8 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Made by{' '}
              <a
                href="https://github.com/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 hover:underline dark:text-white"
              >
                Halil İbrahim Çakıroğlu
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/selfishprimate/curated-design-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
