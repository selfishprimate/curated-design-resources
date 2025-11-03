import { Link, useLocation } from 'react-router-dom'
import { Palette, Github, Sun, Moon } from 'lucide-react'
import { categories } from '@/data/categories'
import { useTheme } from '@/contexts/ThemeContext'
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

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 border-r border-gray-200 bg-white overflow-y-auto dark:border-gray-800 dark:bg-gray-950">
      {/* Brand */}
      <div className="border-b border-gray-200 p-6 dark:border-gray-800">
        <Link to="/" className="flex items-center gap-3 text-gray-900 transition-opacity hover:opacity-80 dark:text-white">
          <Palette className="h-6 w-6 text-primary-500" />
          <div>
            <div className="font-bold">Curated Design</div>
            <div className="text-xs text-gray-500">Resources</div>
          </div>
        </Link>
      </div>

      {/* Categories */}
      <nav className="p-4">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Categories
        </div>
        <ul className="space-y-1">
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon]
            const isActive = location.pathname === `/category/${category.id}`
            return (
              <li key={category.id}>
                <Link
                  to={`/category/${category.id}`}
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

      {/* Footer Links */}
      <div className="border-t border-gray-200 mt-auto dark:border-gray-800">
        <div className="p-4">
          <a
            href="https://github.com/selfishprimate/curated-design-resources"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-900 dark:hover:text-white"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a
            href="https://github.com/selfishprimate/curated-design-resources/blob/master/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-primary-600 transition-colors hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-900"
          >
            <span>Contribute</span>
          </a>
        </div>

        {/* Theme Toggle Switch */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <div className="flex items-center justify-between px-3 py-2">
            <span className="text-sm text-gray-700 dark:text-gray-400">Theme</span>
            <button
              onClick={toggleTheme}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                theme === 'dark' ? 'bg-primary-500' : 'bg-gray-300'
              }`}
              role="switch"
              aria-checked={theme === 'dark'}
            >
              <span
                className={`inline-flex h-4 w-4 transform items-center justify-center rounded-full bg-white transition-transform ${
                  theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                }`}
              >
                {theme === 'dark' ? (
                  <Moon className="h-3 w-3 text-primary-500" />
                ) : (
                  <Sun className="h-3 w-3 text-gray-500" />
                )}
              </span>
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
