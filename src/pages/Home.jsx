import { useState, useEffect, useRef, useCallback } from 'react'
import { categories } from '@/data/categories'
import ResourceCard from '@/components/ResourceCard'
import SEO from '@/components/SEO'
import SortFilter from '@/components/SortFilter'
import SubmitModal from '@/components/SubmitModal'
import SupportersModal from '@/components/SupportersModal'
import Toast from '@/components/Toast'
import Hero from '@/components/Hero'
import seoConfig from '../../seo-config'
import { calculatePopularity, sortResources } from '@/utils/sorting'
import githubStatsData from '@/data/github-stats.json'

// Flatten all resources from all categories with metadata
const allResourcesRaw = categories.flatMap(category =>
  category.resources.map(resource => ({
    ...resource,
    category: {
      id: category.id,
      title: category.title,
      icon: category.icon
    },
    popularityScore: calculatePopularity(resource)
  }))
)

const ITEMS_PER_PAGE = 20

export default function Home() {
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const githubStats = githubStatsData
  const [sortBy, setSortBy] = useState('popular')
  const observerTarget = useRef(null)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isSupportersModalOpen, setIsSupportersModalOpen] = useState(false)
  const [toast, setToast] = useState(null)
  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Sort resources based on selected option
  const allResources = sortResources(allResourcesRaw, sortBy)

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
      <SEO
        title={seoConfig.defaultTitle}
        description={seoConfig.defaultDescription}
        keywords={seoConfig.defaultKeywords}
        url={seoConfig.siteUrl}
      />
      {/* Hero Section */}
      <Hero
        onSubmitModalOpen={() => setIsSubmitModalOpen(true)}
        githubStats={githubStats}
        onSupportersModalOpen={() => setIsSupportersModalOpen(true)}
      />

      {/* Sort & Filter */}
      <div className="relative z-10">
        <SortFilter
          sortBy={sortBy}
          onSortChange={(value) => {
            setSortBy(value)
            setDisplayedItems(ITEMS_PER_PAGE)
          }}
          totalCount={allResources.length}
          displayedCount={Math.min(displayedItems, allResources.length)}
        />
      </div>

      {/* Resources Grid */}
      <section className="relative z-10 flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
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
          <div ref={observerTarget} className="p-8 text-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Loading more...' : 'Scroll to load more'}
            </div>
          </div>
        )}
      </section>

      {/* Submit Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Supporters Modal */}
      <SupportersModal
        isOpen={isSupportersModalOpen}
        onClose={() => setIsSupportersModalOpen(false)}
        people={githubStats.people || []}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
