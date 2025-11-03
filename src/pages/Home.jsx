import { useState, useEffect, useRef, useCallback } from 'react'
import { Github, Star, Users } from 'lucide-react'
import { categories } from '@/data/categories'
import ResourceCard from '@/components/ResourceCard'

// Flatten all resources from all categories with metadata
const allResources = categories.flatMap(category =>
  category.resources.map(resource => ({
    ...resource,
    category: {
      id: category.id,
      title: category.title,
      icon: category.icon
    }
  }))
).reverse() // Reverse to show newest first

const ITEMS_PER_PAGE = 20

export default function Home() {
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [githubStats, setGithubStats] = useState({ stars: null, contributors: [] })
  const observerTarget = useRef(null)

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [repoRes, contributorsRes] = await Promise.all([
          fetch('https://api.github.com/repos/selfishprimate/curated-design-resources'),
          fetch('https://api.github.com/repos/selfishprimate/curated-design-resources/contributors')
        ])

        const repoData = await repoRes.json()
        const contributorsData = await contributorsRes.json()

        setGithubStats({
          stars: repoData.stargazers_count,
          contributors: contributorsData.slice(0, 8) // Show max 8 contributors
        })
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
      }
    }

    fetchGitHubStats()
  }, [])

  const loadMore = useCallback(() => {
    if (displayedItems >= allResources.length) return

    setIsLoading(true)
    setTimeout(() => {
      setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, allResources.length))
      setIsLoading(false)
    }, 300)
  }, [displayedItems])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMore, isLoading])

  const visibleResources = allResources.slice(0, displayedItems)

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 px-8 py-32 dark:border-gray-800">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100/20 via-transparent to-transparent dark:from-purple-900/30 dark:via-blue-900/20 dark:to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-pink-100/20 via-transparent to-transparent dark:from-pink-900/20 dark:via-purple-900/10 dark:to-transparent" />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-7xl font-bold tracking-tight text-transparent dark:from-white dark:via-gray-100 dark:to-white">
            Curated Design Resources
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            A comprehensive collection of handpicked design tools, libraries, and resources
            for designers and developers.
          </p>
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://github.com/selfishprimate/curated-design-resources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gray-900 px-8 py-4 font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:scale-105 hover:bg-gray-800 hover:shadow-xl dark:bg-white dark:text-gray-900 dark:shadow-white/20 dark:hover:bg-gray-100"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
            <a
              href="https://github.com/selfishprimate/curated-design-resources/blob/master/CONTRIBUTING.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white/50 px-8 py-4 font-semibold text-gray-900 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white dark:border-gray-700 dark:bg-gray-900/50 dark:text-white dark:hover:bg-gray-900"
            >
              Contribute
            </a>
          </div>

          {/* GitHub Stats */}
          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            {/* Contributors */}
            {githubStats.contributors.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {githubStats.contributors.map((contributor) => (
                    <a
                      key={contributor.id}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block"
                      title={contributor.login}
                    >
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="h-10 w-10 rounded-full border-2 border-gray-50 transition-transform hover:scale-110 hover:z-10 dark:border-gray-950"
                      />
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{githubStats.contributors.length}+ contributors</span>
                </div>
              </div>
            )}

            {/* Stars */}
            {githubStats.stars !== null && (
              <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 dark:bg-gray-900">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {githubStats.stars.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">stars</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleResources.map((resource, index) => (
            <ResourceCard
              key={`${resource.category.id}-${index}`}
              resource={resource}
              showCategory={true}
            />
          ))}
        </div>

        {/* Loading indicator / Observer target */}
        {displayedItems < allResources.length && (
          <div ref={observerTarget} className="border-b border-r border-gray-200 p-8 text-center dark:border-gray-800">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Loading more...' : 'Scroll to load more'}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
