import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { X, Github, Linkedin, Instagram } from 'lucide-react'
import { categories } from '@/data/categories'

export default function MenuMobile({ isOpen, onClose, onSubmit }) {
  const location = useLocation()

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[65] bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Mobile Menu */}
      <aside
        className={`fixed right-0 top-0 z-[70] h-screen w-full transform overflow-y-auto bg-white transition-transform duration-300 dark:bg-gray-950 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close button */}
        <div className="sticky top-0 z-10 flex justify-end p-6 pb-0">
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Categories */}
        <nav className="p-4 pt-6">
          <div className="mb-6 p-0 text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Categories
          </div>
          <ul className="grid grid-cols-1 min-[375px]:grid-cols-2 gap-x-4">
            {categories.map((category) => {
              const isActive = location.pathname === `/${category.id}`
              return (
                <li key={category.id} className="mb-3">
                  <Link
                    to={`/${category.id}`}
                    onClick={onClose}
                    className={`flex items-center p-0 text-base transition-all ${
                      isActive
                        ? 'font-semibold text-primary-500 dark:text-primary-400'
                        : 'font-normal text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'
                    }`}
                  >
                    <span>{category.title}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Action Links */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800/50">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => {
                onClose()
                onSubmit?.()
              }}
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-center text-base font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Submit a Resource
            </button>
            <a
              href="https://github.com/sponsors/selfishprimate"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 rounded-lg border-2 border-gray-300 px-4 py-3 text-center text-base font-semibold text-gray-700 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900"
            >
              Support
            </a>
          </div>
        </div>

        {/* Footer Content */}
        <div className="mt-auto border-t border-gray-200 px-4 py-6 dark:border-gray-800/50">
          <div className="space-y-4">
            {/* Made by text */}
            <div className="px-3 text-center text-base text-gray-600 dark:text-gray-400">
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
            <div className="flex items-center justify-center gap-4 px-3">
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
