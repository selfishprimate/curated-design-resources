import { Link } from 'react-router-dom'
import { Github, Moon, Sun, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'

// Logo SVG Component - Using external SVG file
function LogoMark() {
  return (
    <img src="/logomark.svg" alt="CDR Logo" className="h-full w-full" />
  )
}

/* BACKUP: Venn Diagram Style Logomark (circles)
function LogoMarkCircles() {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logomark-svg"
    >
      <circle
        cx="7.5"
        cy="14"
        r="6"
        className="fill-cyan-500 dark:fill-cyan-400"
      />
      <circle
        cx="16.5"
        cy="14"
        r="6"
        className="fill-fuchsia-500 dark:fill-fuchsia-400"
      />
      <circle
        cx="12"
        cy="7"
        r="6"
        className="fill-rose-500 dark:fill-rose-400"
      />
    </svg>
  )
}
*/

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
      <div className="mx-auto flex h-20 items-center justify-between px-6 sm:h-20">
        {/* Logo */}
        <Link to="/" className="flex min-w-0 items-center gap-1.5 text-gray-900 transition-opacity hover:opacity-80 dark:text-white">
          <div className="flex-shrink-0">
            <div className="h-6 w-6">
              <LogoMark />
            </div>
          </div>
          <div className="truncate text-base font-medium">
            Curated Design Resources
          </div>
        </Link>

        {/* Right side: Actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Submit Button - Hidden on mobile */}
          <button
            onClick={onOpenSubmitModal}
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 sm:inline-block dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Submit resource"
          >
            Submit
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
            className="-mr-2 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}
