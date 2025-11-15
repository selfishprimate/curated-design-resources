import { categories } from '@/data/categories'

/**
 * Aggregate all resources from all categories into a single searchable array
 * Each resource is enhanced with category metadata and a unique ID
 */
export const getAllResources = () => {
  const allResources = []

  categories.forEach((category) => {
    category.resources.forEach((resource, index) => {
      allResources.push({
        ...resource,
        // Generate unique ID (category + index based)
        id: `${category.id}-${index}`,
        // Embed category info for search and display
        category: {
          id: category.id,
          title: category.title,
          icon: category.icon
        }
      })
    })
  })

  return allResources
}

/**
 * Get total resource count across all categories
 */
export const getTotalResourceCount = () => {
  return categories.reduce((total, cat) => total + cat.resources.length, 0)
}
