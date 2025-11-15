import Fuse from 'fuse.js'
import { getAllResources } from './resourceAggregator'

/**
 * Fuse.js configuration for optimal search experience
 * Tuned for 300+ design resources
 */
const fuseOptions = {
  // Search keys with weights
  keys: [
    { name: 'title', weight: 0.5 },           // Highest priority
    { name: 'description', weight: 0.3 },     // Medium priority
    { name: 'category.title', weight: 0.2 }   // Low priority
  ],

  // Fuzzy matching settings
  threshold: 0.3,              // 0.0-1.0 (0=exact, 1=match anything)
  distance: 100,               // Max character distance
  minMatchCharLength: 2,       // Minimum 2 characters to match

  // Location settings
  ignoreLocation: true,        // Don't care WHERE in string match occurs

  // Performance
  ignoreFieldNorm: false,      // Consider field length in scoring

  // Results
  includeScore: true,          // Return relevance score
  includeMatches: true,        // Return matched text positions
  findAllMatches: false,       // Stop at first match (faster)

  // Sorting
  shouldSort: true             // Auto-sort by relevance
}

/**
 * Singleton Fuse instance (created once, reused for all searches)
 */
let fuseInstance = null

const getFuseInstance = () => {
  if (!fuseInstance) {
    const allResources = getAllResources()
    fuseInstance = new Fuse(allResources, fuseOptions)
  }
  return fuseInstance
}

/**
 * Main search function
 * @param {string} query - User search query
 * @param {Object} options - Optional filters and settings
 * @returns {Array} - Ranked and filtered results
 */
export const searchResources = (query, options = {}) => {
  // Validation
  if (!query || typeof query !== 'string') {
    return []
  }

  // Minimum length check
  const trimmedQuery = query.trim()
  if (trimmedQuery.length < 2) {
    return []
  }

  // Get Fuse instance
  const fuse = getFuseInstance()

  // Perform search
  const rawResults = fuse.search(trimmedQuery)

  // Extract items and scores
  let results = rawResults.map(result => ({
    ...result.item,
    searchScore: result.score,      // Original Fuse score
    matches: result.matches,        // Matched text positions
    refIndex: result.refIndex       // Original array index
  }))

  // Apply boosting (adjust scores for better ranking)
  results = results.map(resource => {
    let adjustedScore = resource.searchScore

    // Boost featured resources (-20%)
    if (resource.featured) {
      adjustedScore *= 0.8
    }

    // Boost trending resources (-10%)
    if (resource.stats?.trending) {
      adjustedScore *= 0.9
    }

    // Boost free resources (-5%)
    if (resource.pricing === 'free') {
      adjustedScore *= 0.95
    }

    return {
      ...resource,
      adjustedScore
    }
  })

  // Re-sort by adjusted score (lower = better)
  results.sort((a, b) => a.adjustedScore - b.adjustedScore)

  // Apply optional filters
  if (options.pricing && options.pricing !== 'all') {
    results = results.filter(r => r.pricing === options.pricing)
  }

  if (options.category) {
    results = results.filter(r => r.category.id === options.category)
  }

  // Limit results (performance)
  const limit = options.limit || 50
  results = results.slice(0, limit)

  return results
}

/**
 * Get search suggestions (popular/trending terms)
 * Used for empty state
 */
export const getSearchSuggestions = () => {
  return [
    { term: 'ai', label: '✨ AI' },
    { term: 'figma', label: '🎨 Figma' },
    { term: 'icons', label: '🎯 Icons' },
    { term: 'colors', label: '🌈 Colors' },
    { term: 'frontend', label: '💻 Frontend' },
    { term: 'tailwind', label: '🎨 Tailwind' },
    { term: 'react', label: '⚛️ React' },
    { term: 'fonts', label: '📝 Typography' },
    { term: 'free', label: '💎 Free' },
    { term: 'animation', label: '🎬 Animation' },
    { term: 'prototyping', label: '🔧 Prototyping' },
    { term: 'accessibility', label: '♿ Accessibility' },
    { term: 'design systems', label: '📐 Design Systems' },
    { term: 'inspiration', label: '💡 Inspiration' }
  ]
}
