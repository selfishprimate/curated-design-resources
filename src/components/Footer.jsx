import { Github, Twitter, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* About */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Curated Design Resources</h3>
            <p className="text-sm text-gray-400">
              A comprehensive collection of handpicked design resources, tools, and articles
              for designers and developers.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#categories"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Categories
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/selfishprimate/curated-design-resources/blob/master/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Contribute
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/selfishprimate/curated-design-resources/blob/master/CODE_OF_CONDUCT.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 transition-colors hover:text-white"
                >
                  Code of Conduct
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/selfishprimate/curated-design-resources"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/selfishprimate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-800 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="h-4 w-4 text-red-500" /> by{' '}
            <a
              href="https://github.com/selfishprimate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white hover:underline"
            >
              Halil İbrahim Çakıroğlu
            </a>
          </p>
          <p className="mt-2">
            Licensed under the{' '}
            <a
              href="https://github.com/selfishprimate/curated-design-resources/blob/master/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:underline"
            >
              MIT License
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
