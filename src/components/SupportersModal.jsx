import Modal from '@/components/ui/modal'

export default function SupportersModal({ isOpen, onClose, people }) {
  const contributors = people.filter(p => p.type === 'contributor')
  const stargazers = people.filter(p => p.type === 'stargazer')

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      variant="default"
      title="Supporters"
      description="These wonderful people help make this project better through code contributions and community support."
    >
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
                  src={`${person.avatar_url}&s=96`}
                  alt={person.login}
                  className="h-16 w-16 rounded-full transition-transform group-hover:scale-110"
                  loading="lazy"
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
                  src={`${person.avatar_url}&s=96`}
                  alt={person.login}
                  className="h-16 w-16 rounded-full transition-transform group-hover:scale-110"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </Modal>
  )
}
