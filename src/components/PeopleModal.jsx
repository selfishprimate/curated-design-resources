import { useEffect } from 'react'
import { X } from 'lucide-react'

export default function PeopleModal({ isOpen, onClose, people }) {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const contributors = people.filter(p => p.type === 'contributor')
  const stargazers = people.filter(p => p.type === 'stargazer')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-3xl max-h-[80vh] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white px-6 py-4 dark:bg-gray-900">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Supporters
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                These wonderful people help make this project better through code contributions and community support.
              </p>
            </div>
            <button
              onClick={onClose}
              className="mt-1 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 80px)' }}>
          {/* Contributors Section */}
          {contributors.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Contributors ({contributors.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {contributors.map((person) => (
                  <a
                    key={person.id}
                    href={person.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={person.login}
                  >
                    <img
                      src={person.avatar_url}
                      alt={person.login}
                      className="h-16 w-16 rounded-full transition-transform group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Stargazers Section */}
          {stargazers.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-medium text-gray-900 dark:text-white">
                Stargazers ({stargazers.length})
              </h3>
              <div className="flex flex-wrap gap-3">
                {stargazers.map((person) => (
                  <a
                    key={person.id}
                    href={person.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                    title={person.login}
                  >
                    <img
                      src={person.avatar_url}
                      alt={person.login}
                      className="h-16 w-16 rounded-full transition-transform group-hover:scale-110"
                    />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
