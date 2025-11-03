import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { categories } from '@/data/categories'
import ResourceCard from '@/components/ResourceCard'

export default function Category() {
  const { id } = useParams()
  const category = categories.find(cat => cat.id === id)

  if (!category) {
    return (
      <div className="bg-white p-8 text-gray-900 dark:bg-gray-950 dark:text-white">
        <div className="mx-auto max-w-4xl">
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
      </div>
    )
  }

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-8 py-8 dark:border-gray-800">
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mt-6 flex items-center gap-4">
            {/* {IconComponent && (
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-primary-600 dark:bg-gray-900 dark:text-primary-500">
                <IconComponent className="h-8 w-8" />
              </div>
            )} */}
            <div>
              <h1 className="text-4xl font-bold">{category.title}</h1>
              <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div>
        {category.resources.length === 0 ? (
          <div className="border border-gray-200 bg-gray-50 p-8 text-center dark:border-gray-800 dark:bg-gray-900/50">
            <p className="text-gray-600 dark:text-gray-400">
              No resources available yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {category.resources.map((resource, index) => (
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
