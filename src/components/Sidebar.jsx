import { Link, useLocation } from 'react-router-dom'
import { X, Github, Linkedin, Instagram } from 'lucide-react'
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

export default function Sidebar({ isOpen, onClose, onSubmit }) {
  const location = useLocation()

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed z-50 w-64 transform overflow-y-auto bg-white transition-transform duration-300 dark:bg-gray-950 ${
        isOpen ? 'left-0 translate-x-0 border-r' : 'left-0 -translate-x-full'
      } top-16 h-[calc(100vh-4rem)] border-gray-200 dark:border-gray-800/50 sm:top-20 sm:h-[calc(100vh-5rem)] lg:translate-x-0 lg:border-r`}>
        {/* Close button - mobile only */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-800"
          aria-label="Close menu"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Categories */}
        <nav className="p-4 pt-6">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Categories
        </div>
        <ul className="space-y-1">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon]
            const isActive = location.pathname === `/${category.id}`
            return (
              <li key={category.id}>
                <Link
                  to={`/${category.id}`}
                  onClick={onClose}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white'
                  }`}
                >
                  {IconComponent && <IconComponent className="h-4 w-4" />}
                  <span>{category.title}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        </nav>

        {/* Action Links - Mobile only */}
        <div className="border-t border-gray-200 p-4 lg:hidden dark:border-gray-800/50">
          <div className="space-y-1">
            <button
              onClick={() => {
                onClose()
                onSubmit?.()
              }}
              className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Submit Resource
            </button>
            <a
              href="https://github.com/sponsors/selfishprimate"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Support
            </a>
          </div>
        </div>

        {/* Footer Content - Mobile only */}
        <div className="mt-auto border-t border-gray-200 px-4 py-6 lg:hidden dark:border-gray-800/50">
          <div className="space-y-4">
            {/* Made by text */}
            <div className="px-3 text-left text-xs text-gray-600 dark:text-gray-400">
              Made with ❤️ by{' '}
              <a
                href="https://github.com/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-gray-900 hover:underline dark:text-white"
              >
                selfishprimate
              </a>
              {' '}for the design community.
            </div>

            {/* Social links */}
            <div className="flex items-center justify-start gap-4 px-3">
              <a
                href="https://github.com/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://medium.com/@selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                aria-label="Medium"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
