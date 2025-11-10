import { Link, useLocation } from 'react-router-dom'
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

export default function MenuDesktop() {
  const location = useLocation()

  return (
    <aside className="fixed left-0 top-20 z-50 hidden h-[calc(100vh-5rem)] w-64 overflow-y-auto border-r border-gray-200 bg-white dark:border-gray-800/50 dark:bg-gray-950 lg:block">
      <nav className="p-4 pt-6">
        <div className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
          Categories
        </div>
        <ul>
          {categories.map((category) => {
            const IconComponent = iconMap[category.icon]
            const isActive = location.pathname === `/${category.id}`
            return (
              <li key={category.id} className="mb-1">
                <Link
                  to={`/${category.id}`}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    isActive
                      ? 'font-semibold text-primary-600 dark:text-primary-500'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-900 dark:hover:text-white'
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
    </aside>
  )
}
