/**
 * Utility functions for handling "new" resources
 */

import { isCategoryVisited } from './visitedCategories'

/**
 * Check if a category has any new resources that haven't been seen yet
 * @param {Object} category - Category object with resources array
 * @param {boolean} checkVisited - Whether to check if category has been visited (default: true)
 * @returns {boolean} - True if category has new resources and hasn't been visited
 */
export const categoryHasNewResources = (category, checkVisited = true) => {
  if (!category || !category.resources) return false

  const hasNew = category.resources.some(resource => resource.new === true)

  if (!hasNew) return false

  // If checkVisited is true, also check if category hasn't been visited
  if (checkVisited && isCategoryVisited(category.id)) {
    return false
  }

  return true
}

/**
 * Check if any category has new resources that haven't been seen yet
 * @param {Array} categories - Array of category objects
 * @param {boolean} checkVisited - Whether to check if categories have been visited (default: true)
 * @returns {boolean} - True if any category has new resources and hasn't been visited
 */
export const hasAnyNewResources = (categories, checkVisited = true) => {
  if (!categories || !Array.isArray(categories)) return false
  return categories.some(category => categoryHasNewResources(category, checkVisited))
}

/**
 * Get count of new resources in a category
 * @param {Object} category - Category object with resources array
 * @returns {number} - Number of new resources
 */
export const getNewResourcesCount = (category) => {
  if (!category || !category.resources) return 0
  return category.resources.filter(resource => resource.new === true).length
}
