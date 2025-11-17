import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { categories } from '@/data/categories'
import ResourceCard from '@/components/ResourceCard'
import SEO from '@/components/SEO'
import SortFilter from '@/components/SortFilter'
import CategoryHeader from '@/components/CategoryHeader'
import seoConfig from '../../seo-config'
import { calculatePopularity, sortResources } from '@/utils/sorting'
import { markCategoryAsVisited } from '@/utils/visitedCategories'

export default function Category() {
  const { id } = useParams()
  const category = categories.find(cat => cat.id === id)
  const [sortBy, setSortBy] = useState('popular')
  const [filterBy, setFilterBy] = useState('all')

  // Reset filter when category changes and mark category as visited
  useEffect(() => {
    setFilterBy('all')

    // Mark this category as visited
    if (id) {
      markCategoryAsVisited(id)
    }
  }, [id])

  // Categories where pricing filter should be hidden
  const categoriesWithoutPricing = [
    'articles',
    'blogs',
    'books',
    'tutorials',
    'design-news'
  ]

  const shouldShowPricingFilter = category && !categoriesWithoutPricing.includes(category.id)

  // Add popularity scores and category info to resources
  const resourcesWithScores = category?.resources.map(resource => ({
    ...resource,
    popularityScore: calculatePopularity(resource),
    category: {
      id: category.id,
      title: category.title
    }
  })) || []

  // Filter resources based on pricing (only if filtering is enabled for this category)
  const filteredResources = (filterBy === 'all' || !shouldShowPricingFilter)
    ? resourcesWithScores
    : resourcesWithScores.filter(resource => resource.pricing === filterBy)

  // Sort filtered resources
  const sortedResources = sortResources(filteredResources, sortBy)

  if (!category) {
    return (
      <div className="bg-white px-8 py-8 text-gray-900 dark:bg-gray-950 dark:text-white">
        <SEO
          title="Mossaique: Category not found"
          description="The category you're looking for doesn't exist."
          noindex={true}
        />
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <div className="mt-8">
          <h1 className="text-3xl font-bold">Category not found</h1>
          <p className="mt-2 text-gray-600 dark:text-white/90">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  // Breadcrumbs for structured data
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: category.title, path: `/${category.id}` }
  ]

  // Structured data for collection page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `${seoConfig.siteUrl}/${category.id}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `${category.title} Resources`,
      numberOfItems: category.resources.length,
      itemListElement: category.resources.slice(0, 10).map((resource, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          name: resource.title,
          description: resource.description,
          url: resource.link
        }
      }))
    }
  }

  // Get SEO metadata for this category
  const categoryMeta = seoConfig.categoryMetadata[category.id]
  const metaTitle = `Mossaique: ${category.title}`
  const metaDescription = categoryMeta?.description || category.description
  const metaKeywords = categoryMeta?.keywords || seoConfig.defaultKeywords

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        url={`${seoConfig.siteUrl}/${category.id}`}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />

      {/* Header */}
      <CategoryHeader title={category.title} description={category.description} type="natural" />

      {/* Sort & Filter */}
      {category.resources.length > 0 && (
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <SortFilter
            sortBy={sortBy}
            onSortChange={setSortBy}
            filterBy={filterBy}
            onFilterChange={setFilterBy}
            totalCount={sortedResources.length}
            displayedCount={sortedResources.length}
            showFilter={shouldShowPricingFilter}
          />
        </div>
      )}

      {/* Resources */}
      <div className="resourcesSection p-6">
        {sortedResources.length === 0 ? (
          <div className="emptyState border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800/50 dark:bg-gray-900/50">
            <p className="text-gray-600 dark:text-white/90">
              {category.resources.length === 0
                ? 'No resources available yet. Check back soon!'
                : `No ${filterBy} resources found. Try a different filter.`}
            </p>
          </div>
        ) : (
          <div className="resourcesGrid mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {sortedResources.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource}
                showCategory={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
