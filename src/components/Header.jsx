import { Github, Moon, Sun, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'

// Desktop Header
function HeaderDesktop({ isDark, toggleTheme, onOpenSubmitModal }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] hidden border-b border-gray-200 bg-white/80 backdrop-blur-sm sm:block dark:border-gray-800/50 dark:bg-gray-950/80">
      <div className="mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Right side: Actions */}
        <div className="flex items-center gap-2">
          {/* Submit Button */}
          <button
            onClick={onOpenSubmitModal}
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Submit resource"
          >
            Submit
          </button>

          {/* Support Button */}
          <a
            href="https://github.com/sponsors/selfishprimate"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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

          {/* GitHub Link */}
          <a
            href="https://github.com/selfishprimate/curated-design-resources"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  )
}

// Mobile Header
function HeaderMobile({ isDark, toggleTheme, onToggleSidebar }) {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] border-b border-gray-200 bg-white/80 backdrop-blur-sm sm:hidden dark:border-gray-800/50 dark:bg-gray-950/80">
      <div className="mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Right side: Actions */}
        <div className="flex items-center gap-1">
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

          {/* Hamburger Menu */}
          <button
            onClick={onToggleSidebar}
            className="-mr-2 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

// Main Header Component
export default function Header({ onToggleSidebar, onOpenSubmitModal }) {
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
    <>
      <HeaderDesktop isDark={isDark} toggleTheme={toggleTheme} onOpenSubmitModal={onOpenSubmitModal} />
      <HeaderMobile isDark={isDark} toggleTheme={toggleTheme} onToggleSidebar={onToggleSidebar} />
    </>
  )
}
