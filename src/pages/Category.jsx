import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { categories } from '@/data/categories'
import ResourceCard from '@/components/ResourceCard'
import SEO from '@/components/SEO'
import SortFilter from '@/components/SortFilter'
import seoConfig from '@/config/seo'
import { calculatePopularity, sortResources } from '@/utils/sorting'

export default function Category() {
  const { id } = useParams()
  const category = categories.find(cat => cat.id === id)
  const [sortBy, setSortBy] = useState('popular')

  // Add popularity scores to resources
  const resourcesWithScores = category?.resources.map(resource => ({
    ...resource,
    popularityScore: calculatePopularity(resource)
  })) || []

  // Sort resources
  const sortedResources = sortResources(resourcesWithScores, sortBy)

  if (!category) {
    return (
      <div className="bg-white px-8 py-8 text-gray-900 dark:bg-gray-950 dark:text-white">
        <SEO
          title="Category not found - Curated Design Resources"
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
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    )
  }

  // Breadcrumbs for structured data
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: category.title, path: `/category/${category.id}` }
  ]

  // Structured data for collection page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.title,
    description: category.description,
    url: `${seoConfig.siteUrl}/category/${category.id}`,
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
  const metaTitle = `${category.title} - Curated Design Resources`
  const metaDescription = categoryMeta?.description || category.description
  const metaKeywords = categoryMeta?.keywords || seoConfig.defaultKeywords

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO
        title={metaTitle}
        description={metaDescription}
        keywords={metaKeywords}
        url={`${seoConfig.siteUrl}/category/${category.id}`}
        breadcrumbs={breadcrumbs}
        structuredData={structuredData}
      />
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-8 dark:border-gray-800/50">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mt-6">
          <h1 className="text-4xl font-bold">{category.title}</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            {category.description}
          </p>
        </div>
      </div>

      {/* Sort & Filter */}
      {category.resources.length > 0 && (
        <SortFilter
          sortBy={sortBy}
          onSortChange={setSortBy}
          totalCount={category.resources.length}
          displayedCount={category.resources.length}
        />
      )}

      {/* Resources */}
      <div>
        {category.resources.length === 0 ? (
          <div className="border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800/50 dark:bg-gray-900/50">
            <p className="text-gray-600 dark:text-gray-400">
              No resources available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
            {sortedResources.map((resource, index) => (
              <ResourceCard
                key={index}
                resource={resource}
                showCategory={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
