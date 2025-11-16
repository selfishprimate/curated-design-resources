import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { categories } from '@/data/categories'
import * as Icons from 'lucide-react'
import { categoryHasNewResources } from '@/utils/newResources'

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

export default function MenuDesktop({ isCollapsed = false }) {
  const location = useLocation()
  const [refreshKey, setRefreshKey] = useState(0)

  // Listen for category visited events to refresh blue dots
  useEffect(() => {
    const handleCategoryVisited = () => {
      setRefreshKey(prev => prev + 1)
    }

    window.addEventListener('categoryVisited', handleCategoryVisited)
    return () => window.removeEventListener('categoryVisited', handleCategoryVisited)
  }, [])

  return (
    <aside className={`fixed left-0 top-20 z-50 hidden h-[calc(100vh-5rem)] overflow-hidden border-r border-gray-200 bg-white transition-all duration-300 ease-in-out dark:border-gray-800/50 dark:bg-gray-950 lg:block ${
      isCollapsed ? 'w-0 border-r-0' : 'w-64'
    }`}>
      <nav className="h-full w-64 overflow-y-auto p-4 pt-6">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Categories
        </div>
        <ul>
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon]
            const isActive = location.pathname === `/${category.id}`
            const hasNew = categoryHasNewResources(category)
            return (
              <li key={category.id} className="mb-1">
                <Link
                  to={`/${category.id}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                    isActive
                      ? 'font-semibold text-primary-600 dark:text-primary-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white'
                  }`}
                >
                  {IconComponent && <IconComponent className="h-4 w-4 flex-shrink-0" />}
                  <span className="flex-1 text-sm">{category.title}</span>
                  {/* Blue dot indicator for new resources */}
                  {hasNew && (
                    <span className="h-2 w-2 flex-shrink-0 rounded-full bg-blue-600"></span>
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
