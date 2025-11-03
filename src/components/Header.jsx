import { Button } from '@/components/ui/button'
import { Menu, Palette, Github } from 'lucide-react'
import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <Palette className="h-8 w-8 text-primary-600" />
            <span className="hidden text-xl font-bold text-gray-900 sm:block">
              Curated Design Resources
            </span>
            <span className="text-lg font-bold text-gray-900 sm:hidden">
              CDR
            </span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-1">
            <li>
              <a
                href="/"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#categories"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="https://github.com/selfishprimate/curated-design-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/selfishprimate/curated-design-resources/blob/master/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Contribute</Button>
              </a>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="px-4 py-4">
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/selfishprimate/curated-design-resources"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/selfishprimate/curated-design-resources/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50"
                >
                  Contribute
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  )
}
