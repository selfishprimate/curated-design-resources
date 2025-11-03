import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="sticky bottom-0 z-40 border-t border-gray-800 bg-gray-950">
      <div className="px-8 py-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="text-sm text-gray-400">
            Made with love by{' '}
            <a
              href="https://github.com/selfishprimate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:underline"
            >
              selfishprimate
            </a>
            {' '}for the design community.
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/selfishprimate/curated-design-resources"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 transition-colors hover:text-white"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
