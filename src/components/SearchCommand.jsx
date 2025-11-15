import { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { Search, TrendingUp, Sparkles, ExternalLink, X, ArrowUpDown, CornerDownLeft } from 'lucide-react'
import { useHotkeys } from 'react-hotkeys-hook'
import { searchResources, getSearchSuggestions } from '@/utils/search'

// Extract domain from URL for logo API
const getDomainFromUrl = (url) => {
  try {
    const urlObj = new URL(url)
    return urlObj.hostname.replace('www.', '')
  } catch {
    return ''
  }
}

// Get initials from resource title
const getInitials = (title) => {
  const words = title.split(' ').filter(word => word.length > 0)
  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase()
  }
  return (words[0][0] + words[1][0]).toUpperCase()
}

// Generate color from string
const getColorFromString = (str) => {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  const colors = [
    'bg-blue-600',
    'bg-purple-600',
    'bg-pink-600',
    'bg-indigo-600',
    'bg-cyan-700',
    'bg-teal-700',
    'bg-green-600',
    'bg-orange-700',
    'bg-red-600',
    'bg-violet-600',
  ]

  return colors[Math.abs(hash) % colors.length]
}

// ResourceAvatar component to handle logo loading
function ResourceAvatar({ resource }) {
  const [logoError, setLogoError] = useState(false)
  const [logoLoaded, setLogoLoaded] = useState(false)
  const initials = getInitials(resource.title)
  const bgColor = getColorFromString(resource.title)
  const domain = getDomainFromUrl(resource.link || resource.url)
  const logoUrl = `/logos/${domain}.png`

  return (
    <div className="relative mt-0.5 h-10 w-10 flex-shrink-0">
      {!logoError ? (
        <>
          <img
            src={logoUrl}
            alt={`${resource.title} logo`}
            className={`h-10 w-10 rounded-full object-cover transition-opacity duration-200 ${logoLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onError={() => setLogoError(true)}
            onLoad={() => setLogoLoaded(true)}
          />
          {!logoLoaded && (
            <div className={`absolute inset-0 flex h-10 w-10 items-center justify-center rounded-full ${bgColor} text-sm font-bold text-white`}>
              {initials}
            </div>
          )}
        </>
      ) : (
        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${bgColor} text-sm font-bold text-white`}>
          {initials}
        </div>
      )}
    </div>
  )
}

export default function SearchCommand() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const navigate = useNavigate()

  // Keyboard shortcut: Cmd+K (Mac) / Ctrl+K (Windows)
  useHotkeys('mod+k', (e) => {
    e.preventDefault()
    setOpen(true)
  }, { enableOnFormTags: true })

  // ESC to close and prevent body scroll
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    if (open) {
      // Save current scroll position
      const scrollY = window.scrollY
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

      // Lock body scroll - multiple approaches for better compatibility
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'

      document.addEventListener('keydown', down)

      // Return cleanup function that restores scroll
      return () => {
        // Unlock body scroll
        document.body.style.overflow = ''
        document.body.style.paddingRight = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.width = ''

        // Restore scroll position
        window.scrollTo(0, scrollY)

        document.removeEventListener('keydown', down)
      }
    }

    return () => {
      document.removeEventListener('keydown', down)
    }
  }, [open])

  // Search logic
  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([])
      return
    }

    const searchResults = searchResources(query, { limit: 20 })
    setResults(searchResults)
  }, [query])

  // Handle selection
  const handleSelect = useCallback((resource) => {
    if (resource.link) {
      // Open external link
      window.open(resource.link, '_blank', 'noopener,noreferrer')
    }
    setOpen(false)
    setQuery('')
  }, [])

  // Navigate to category
  const handleCategoryClick = useCallback((categoryId) => {
    navigate(`/${categoryId}`)
    setOpen(false)
    setQuery('')
  }, [navigate])

  // Suggestions
  const suggestions = getSearchSuggestions()

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    // Only close if clicking directly on backdrop, not on children
    if (e.target === e.currentTarget) {
      setOpen(false)
    }
  }

  return (
    <>
      {/* Search Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="searchTrigger group flex items-center gap-3 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 md:w-full md:border md:border-gray-200 md:bg-white md:px-4 md:py-2.5 md:text-sm md:text-gray-500 md:hover:border-gray-300 md:hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 dark:md:border-gray-700 dark:md:bg-gray-900 dark:md:text-gray-400 dark:md:hover:border-gray-600 dark:md:hover:bg-gray-800"
        aria-label="Search resources"
      >
        <Search className="h-5 w-5" />
        <span className="hidden md:inline">Search resources...</span>
        <kbd className="ml-auto hidden items-center font-mono text-sm font-medium text-gray-400 md:inline-flex dark:text-gray-500">
          <span className="text-base">⌘</span>+K
        </kbd>
      </button>

      {/* Command Dialog - Rendered via Portal */}
      {open && createPortal(
        <div
          className="commandDialogOverlay fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm animate-in fade-in md:bg-black/50"
          onClick={handleBackdropClick}
          onMouseDown={handleBackdropClick}
        >
          <div
            className="commandDialogContainer flex min-h-screen items-start justify-center p-0 md:items-center md:p-4"
            onClick={handleBackdropClick}
            onMouseDown={handleBackdropClick}
          >
            <Command
              className="commandDialog h-screen w-full overflow-hidden rounded-none border-0 bg-white shadow-2xl animate-in zoom-in-95 md:h-auto md:max-w-2xl md:rounded-xl md:border md:border-gray-200 dark:bg-gray-900 dark:md:border-gray-800"
              shouldFilter={false}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.preventDefault()
                  setOpen(false)
                }
              }}
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-end px-4 py-4 md:hidden">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Search Input */}
              <div className="p-4 md:p-0">
                <div className="commandInputWrapper flex items-center rounded-lg border border-gray-200 bg-white px-4 py-3 md:rounded-none md:border-0 md:border-b md:bg-transparent md:px-4 md:py-4 dark:border-gray-700 dark:bg-gray-900 dark:md:border-0 dark:md:border-b dark:md:border-gray-800 dark:md:bg-transparent">
                  <Search className="mr-3 h-5 w-5 text-gray-400" />
                  <Command.Input
                    value={query}
                    onValueChange={setQuery}
                    placeholder="Search 300+ design resources..."
                    className="commandInput flex-1 border-0 bg-transparent text-base text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
                    autoFocus
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="ml-2 rounded-md px-2 py-1 text-xs font-medium text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                      aria-label="Clear search"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Results */}
              <Command.List className="commandList min-h-[300px] max-h-[calc(100vh-160px)] overflow-y-auto px-4 pb-4 md:min-h-[400px] md:max-h-[400px] md:p-2">
                {/* Empty state */}
                {!query && (
                  <div className="commandEmpty py-8 text-center">
                    <Search className="mx-auto mb-4 h-14 w-14 text-gray-300 dark:text-gray-700" />
                    <p className="mb-2 text-xl font-semibold text-gray-900 dark:text-gray-100">
                      What are you looking for?
                    </p>
                    <p className="mb-6 text-base text-gray-500 dark:text-gray-400">
                      Search through 300+ curated design resources including tools, icons, colors, frameworks, and more. Try the suggestions below to get started.
                    </p>

                    {/* Suggestions */}
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {suggestions.map((suggestion) => (
                        <button
                          key={suggestion.term}
                          onClick={() => setQuery(suggestion.term)}
                          className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-gray-600 dark:hover:bg-gray-700"
                        >
                          {suggestion.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* No results */}
                {query && results.length === 0 && (
                  <Command.Empty className="commandEmpty py-12 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      No results found for "{query}"
                    </p>
                  </Command.Empty>
                )}

                {/* Search Results */}
                {query && results.length > 0 && (
                  <Command.Group heading={`${results.length} result${results.length > 1 ? 's' : ''}`}>
                    {results.map((resource) => (
                      <Command.Item
                        key={resource.id}
                        value={resource.id}
                        onSelect={() => handleSelect(resource)}
                        className="commandItem group flex cursor-pointer items-start gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-gray-100 aria-selected:bg-gray-100 dark:hover:bg-gray-800 dark:aria-selected:bg-gray-800"
                      >
                        {/* Avatar/Logo */}
                        <ResourceAvatar resource={resource} />

                        {/* Content */}
                        <div className="flex-1 overflow-hidden">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="truncate text-sm font-semibold text-gray-900 dark:text-gray-100">
                              {resource.title}
                            </h3>
                            <ExternalLink className="h-3.5 w-3.5 flex-shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                            {resource.description}
                          </p>

                          {/* Metadata */}
                          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCategoryClick(resource.category.id)
                              }}
                              className="rounded-full bg-gray-100 px-2 py-0.5 font-medium text-gray-700 transition-colors group-hover:bg-gray-200 group-aria-selected:bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:group-hover:bg-gray-700 dark:group-aria-selected:bg-gray-700 dark:hover:bg-gray-600"
                            >
                              {resource.category.title}
                            </button>

                            {resource.featured && (
                              <span className="flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5 font-medium text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                                <Sparkles className="h-3 w-3" />
                                Featured
                              </span>
                            )}

                            {resource.stats?.trending && (
                              <span className="flex items-center gap-1 rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                                <TrendingUp className="h-3 w-3" />
                                Trending
                              </span>
                            )}

                            {resource.pricing === 'free' && (
                              <span className="rounded-full bg-green-100 px-2 py-0.5 font-medium text-green-800 dark:bg-green-900/30 dark:text-green-400">
                                Free
                              </span>
                            )}
                          </div>
                        </div>
                      </Command.Item>
                    ))}
                  </Command.Group>
                )}
              </Command.List>

              {/* Footer */}
              <div className="commandFooter hidden items-center justify-between border-t border-gray-200 px-4 py-3 text-xs text-gray-500 md:flex dark:border-gray-800 dark:text-gray-400">
                <div className="flex items-center gap-6">
                  <span className="flex items-center gap-1.5">
                    <ArrowUpDown className="h-3.5 w-3.5" />
                    to Navigate
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CornerDownLeft className="h-3.5 w-3.5" />
                    to Open
                  </span>
                  <span className="flex items-center gap-1.5">
                    ESC to Close
                  </span>
                </div>
              </div>
            </Command>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
