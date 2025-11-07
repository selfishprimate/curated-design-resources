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
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contributors & Stargazers
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(80vh - 80px)' }}>
          {/* Contributors Section */}
          {contributors.length > 0 && (
            <div className="mb-8">
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Contributors ({contributors.length})
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {contributors.map((person) => (
                  <a
                    key={person.id}
                    href={person.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
                  >
                    <img
                      src={person.avatar_url}
                      alt={person.login}
                      className="h-16 w-16 rounded-full border-2 border-gray-200 transition-transform group-hover:scale-110 dark:border-gray-700"
                    />
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {person.login}
                      </p>
                      {person.contributions && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {person.contributions} commits
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Stargazers Section */}
          {stargazers.length > 0 && (
            <div>
              <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
                Stargazers ({stargazers.length})
              </h3>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {stargazers.map((person) => (
                  <a
                    key={person.id}
                    href={person.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:hover:border-gray-700"
                  >
                    <img
                      src={person.avatar_url}
                      alt={person.login}
                      className="h-16 w-16 rounded-full border-2 border-gray-200 transition-transform group-hover:scale-110 dark:border-gray-700"
                    />
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {person.login}
                    </p>
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
