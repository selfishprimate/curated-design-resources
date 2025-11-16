/**
 * Utility functions for managing visited categories in localStorage
 */

const STORAGE_KEY = 'mossaique_visited_categories'

/**
 * Get list of visited category IDs from localStorage
 * @returns {Array<string>} - Array of visited category IDs
 */
export const getVisitedCategories = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Error reading visited categories:', error)
    return []
  }
}

/**
 * Mark a category as visited
 * @param {string} categoryId - The category ID to mark as visited
 */
export const markCategoryAsVisited = (categoryId) => {
  try {
    const visited = getVisitedCategories()
    if (!visited.includes(categoryId)) {
      visited.push(categoryId)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visited))

      // Dispatch custom event to notify components
      window.dispatchEvent(new CustomEvent('categoryVisited', { detail: { categoryId } }))
    }
  } catch (error) {
    console.error('Error marking category as visited:', error)
  }
}

/**
 * Check if a category has been visited
 * @param {string} categoryId - The category ID to check
 * @returns {boolean} - True if category has been visited
 */
export const isCategoryVisited = (categoryId) => {
  const visited = getVisitedCategories()
  return visited.includes(categoryId)
}

/**
 * Clear all visited categories (useful for testing or reset)
 */
export const clearVisitedCategories = () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing visited categories:', error)
  }
}
