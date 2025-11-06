import { Link } from 'react-router-dom'
import { Github, Moon, Sun, Menu, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

// Logo SVG Component
function LogoMark() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-900 dark:text-white"
    >
      {/* Abstract design shapes - modern and minimal */}
      <circle cx="10" cy="10" r="4" className="fill-blue-500 dark:fill-blue-400" />
      <circle cx="22" cy="10" r="4" className="fill-purple-500 dark:fill-purple-400" />
      <circle cx="10" cy="22" r="4" className="fill-pink-500 dark:fill-pink-400" />
      <circle cx="22" cy="22" r="4" className="fill-indigo-500 dark:fill-indigo-400" />
      <rect
        x="14"
        y="14"
        width="4"
        height="4"
        rx="1"
        className="fill-gray-900 dark:fill-white"
      />
    </svg>
  )
}

export default function Header({ onShowToast, onToggleSidebar, onOpenSubmitModal }) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (html.classList.contains('dark')) {
      html.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      html.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-800/50 dark:bg-gray-950/80">
      <div className="mx-auto flex h-16 items-center justify-between px-6 sm:h-20">
        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-2 font-semibold text-gray-900 transition-opacity hover:opacity-80 dark:text-white">
          <div className="hidden flex-shrink-0 sm:block">
            <LogoMark />
          </div>
          <div className="truncate text-base sm:text-lg">
            Curated Design Resources
          </div>
        </Link>

        {/* Right side: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Submit Button - Icon only on mobile, text on desktop */}
          <button
            onClick={onOpenSubmitModal}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 sm:px-4 sm:py-2 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Submit resource"
          >
            <Plus className="h-5 w-5 sm:hidden" />
            <span className="hidden text-sm font-medium sm:inline">Submit</span>
          </button>

          {/* Support Button - Hidden on mobile */}
          <a
            href="https://github.com/sponsors/selfishprimate"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:inline-block dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Support
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* GitHub Link - Hidden on mobile */}
          <a
            href="https://github.com/selfishprimate/curated-design-resources"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 sm:inline-block dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>

          {/* Hamburger Menu - Mobile only */}
          <button
            onClick={onToggleSidebar}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
