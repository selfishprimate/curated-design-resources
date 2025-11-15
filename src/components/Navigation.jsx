import { Github, Moon, Sun, Menu } from 'lucide-react'
import { useEffect, useState } from 'react'
import Logo from '@/components/Logo'
import SearchCommand from '@/components/SearchCommand'

// Desktop Navigation
function NavigationDesktop({ isDark, toggleTheme, onOpenSubmitModal }) {
  return (
    <header className="mainNavigation mainNavigationDesktop fixed inset-x-0 top-0 z-[60] hidden border-b border-gray-200 bg-white/95 backdrop-blur-md lg:block dark:border-gray-800/50 dark:bg-gray-950/95">
      <div className="navigationContainer mx-auto flex h-20 items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Logo />

        {/* Search */}
        <div className="flex-1 max-w-md">
          <SearchCommand />
        </div>

        {/* Right side: Actions */}
        <div className="navigationActions flex items-center gap-2">
          {/* Submit Button */}
          <button
            onClick={onOpenSubmitModal}
            className="submitButton rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Submit resource"
          >
            Submit
          </button>

          {/* Support Button */}
          <a
            href="https://github.com/sponsors/selfishprimate"
            target="_blank"
            rel="noopener noreferrer"
            className="supportButton rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Support
          </a>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="themeToggle rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
            href="https://github.com/selfishprimate/mossaique"
            target="_blank"
            rel="noopener noreferrer"
            className="githubLink rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
      </div>
    </header>
  )
}

// Mobile Navigation
function NavigationMobile({ isDark, toggleTheme, onToggleSidebar }) {
  return (
    <header className="mainNavigation mainNavigationMobile fixed inset-x-0 top-0 z-[60] border-b border-gray-200 bg-white/95 backdrop-blur-md lg:hidden dark:border-gray-800/50 dark:bg-gray-950/95">
      <div className="navigationContainer mx-auto flex h-20 items-center justify-between px-6">
        {/* Logo */}
        <Logo />

        {/* Right side: Actions */}
        <div className="navigationActions flex items-center gap-1">
          {/* Search */}
          <SearchCommand />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="themeToggle rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
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
            className="hamburgerMenu -mr-2 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  )
}

// Main Navigation Component
export default function Navigation({ onToggleSidebar, onOpenSubmitModal }) {
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
      <NavigationDesktop isDark={isDark} toggleTheme={toggleTheme} onOpenSubmitModal={onOpenSubmitModal} />
      <NavigationMobile isDark={isDark} toggleTheme={toggleTheme} onToggleSidebar={onToggleSidebar} />
    </>
  )
}
