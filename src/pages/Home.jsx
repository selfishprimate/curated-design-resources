import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Github, ExternalLink } from 'lucide-react'
import { categories, featuredResources } from '@/data/categories'
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
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="border-b border-gray-200 px-8 py-16 dark:border-gray-800">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-4 text-5xl font-bold">
            Curated Design Resources
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A comprehensive collection of handpicked design tools, libraries, and resources
            for designers and developers.
          </p>
          <div className="mt-8 flex gap-4">
            <Button variant="default" className="gap-2">
              <Github className="h-4 w-4" />
              View on GitHub
            </Button>
            <Button variant="outline" className="gap-2">
              Contribute
            </Button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-gray-200 px-8 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-bold text-primary-500">{categories.length}+</div>
              <div className="mt-1 text-sm text-gray-500">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">500+</div>
              <div className="mt-1 text-sm text-gray-500">Resources</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">100%</div>
              <div className="mt-1 text-sm text-gray-500">Open Source</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-500">Weekly</div>
              <div className="mt-1 text-sm text-gray-500">Updates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="border-b border-gray-200 px-8 py-16 dark:border-gray-800">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">Featured Resources</h2>
          <div className="space-y-3">
            {featuredResources.map((resource, index) => (
              <a
                key={index}
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-lg border border-gray-200 bg-gray-50 p-4 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-900"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-gray-900 dark:text-white">{resource.title}</h3>
                    <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                      {resource.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{resource.description}</p>
                </div>
                <ExternalLink className="h-4 w-4 text-gray-400 transition-colors group-hover:text-gray-600 dark:text-gray-600 dark:group-hover:text-gray-400" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="px-8 py-16" id="categories">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">All Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon]
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.id}`}
                  className="group rounded-lg border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-900"
                >
                  <div className="mb-3 flex items-center gap-3">
                    {IconComponent && (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-200 text-primary-600 dark:bg-gray-800 dark:text-primary-500">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{category.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 px-8 py-12 dark:border-gray-800">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Made by{' '}
              <a
                href="https://github.com/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:underline dark:text-white"
              >
                Halil İbrahim Çakıroğlu
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://github.com/selfishprimate/curated-design-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 transition-colors hover:text-gray-900 dark:hover:text-white"
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
