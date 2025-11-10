import { Github, Send, GitBranch, Star, MoreHorizontal } from 'lucide-react'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function Hero({ onSubmitModalOpen, githubStats, onSupportersModalOpen }) {

  return (
    <section className="heroSection relative overflow-hidden px-8 py-32 pb-[600px] -mb-[550px] md:pb-[800px] md:-mb-[650px]">
      {/* Animated Background */}
      <AnimatedBackground type="natural" />

      {/* Content */}
      <div className="heroContent relative mx-auto max-w-7xl text-center">
        <h1 className="heroTitle mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-[2.5rem] font-bold leading-[1.15] tracking-tight text-transparent md:text-6xl md:leading-[1.15] xl5:text-7xl xl5:leading-[1.2] dark:from-white dark:via-gray-100 dark:to-white">
          Discover the best design tools and resources for your next project!
        </h1>
        <p className="heroSubtitle mx-auto mb-10 max-w-2xl text-base font-normal leading-normal text-gray-600 md:text-xl dark:text-gray-300">
          A carefully curated collection of 300+ premium design tools, UI libraries, icons, colors, and learning resources to help designers and developers build exceptional digital products.
        </p>
        <div className="heroCTA flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="https://github.com/selfishprimate/mossaique"
            target="_blank"
            rel="noopener noreferrer"
            className="ctaGithub inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:scale-105 hover:bg-gray-800 hover:shadow-xl sm:w-auto dark:bg-white dark:text-gray-900 dark:shadow-white/20 dark:hover:bg-gray-100"
          >
            <Github className="h-5 w-5" />
            View on GitHub
          </a>
          <button
            onClick={onSubmitModalOpen}
            className="ctaSubmit inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-900/10 bg-gray-900/5 px-6 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all hover:scale-105 hover:border-gray-900/20 hover:bg-gray-900/10 sm:w-auto dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:border-white/30 dark:hover:bg-white/20"
          >
            <Send className="h-4 w-4" />
            Submit a Resource
          </button>
        </div>

        {/* GitHub Stats */}
        <div className="heroStats mt-10 flex flex-col items-center gap-4">
          {/* People Avatars (Contributors & Stargazers) */}
          {githubStats.displayedPeople && githubStats.displayedPeople.length > 0 && (
            <>
              <div className="flex items-center gap-1">
                <div className="flex -space-x-3 md:-space-x-4">
                  {githubStats.displayedPeople.map((person, index) => (
                    <a
                      key={person.id}
                      href={person.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`relative inline-block flex-shrink-0 ${index >= 7 ? 'hidden md:inline-block' : ''} ${index >= 8 ? 'md:hidden' : ''}`}
                      title={`${person.login} ${person.type === 'contributor' ? '(contributor)' : '(stargazer)'}`}
                    >
                      <img
                        src={person.avatar_url}
                        alt={person.login}
                        className="h-12 w-12 md:h-14 md:w-14 aspect-square rounded-full border-[4px] md:border-[6px] border-white/40 transition-transform hover:scale-110 hover:z-10 dark:border-white/20 object-cover"
                      />
                    </a>
                  ))}
                </div>
                {/* Show more button - show if > 7 on mobile, > 8 on desktop */}
                {(githubStats.totalPeople > 8) && (
                  <button
                    onClick={onSupportersModalOpen}
                    className="flex h-10 w-10 items-center justify-center text-gray-600 dark:text-white"
                    title="View all contributors and stargazers"
                    aria-label="View all contributors and stargazers"
                  >
                    <MoreHorizontal className="h-6 w-6" />
                  </button>
                )}
              </div>
              {/* Contributors and Stargazers Count */}
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <GitBranch className="h-4 w-4" />
                  <span>{githubStats.totalContributors} Contributors</span>
                </div>
                <span>·</span>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" />
                  <span>{githubStats.totalStargazers} Stargazers</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
