import { Github } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="fixed bottom-0 right-0 z-50 m-6">
      <div className="rounded-xl border border-gray-800 bg-gray-950/95 px-6 py-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-400">
            Made by{' '}
            <a
              href="https://github.com/selfishprimate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-white hover:underline"
            >
              Halil İbrahim Çakıroğlu
            </a>
          </div>
          <div className="h-4 w-px bg-gray-700" />
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
    </footer>
  )
}
