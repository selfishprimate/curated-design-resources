import { ArrowUpDown, Filter } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetic', label: 'Alphabetic' }
]

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'free', label: 'Free' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'paid', label: 'Paid' }
]

export default function SortFilter({
  sortBy = 'popular',
  onSortChange,
  filterBy = 'all',
  onFilterChange,
  totalCount,
  displayedCount,
  showFilter = true
}) {
  const currentLabel = SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Sort'

  return (
    <section className="sorting">
      <div className="sortingContainer w-full p-6">
        {showFilter ? (
          /* Layout with Filter */
          <div className="sortingWrapper flex flex-col gap-4">
            {/* Top: Filter & Sort */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              {/* Mobile: Dropdowns side by side */}
              <div className="flex gap-2 sm:hidden">
                {/* Filter Dropdown */}
                <select
                  value={filterBy}
                  onChange={(e) => onFilterChange(e.target.value)}
                  aria-label="Filter resources by pricing"
                  className="filterSelect flex-1 appearance-none rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400/30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  {FILTER_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  aria-label="Sort resources"
                  className="sortSelect flex-1 appearance-none rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400/30"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 0.75rem center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '1.5em 1.5em'
                  }}
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop: Filter & Sort with icons and buttons */}
              <div className="filterControls hidden items-center gap-3 sm:flex">
                <Filter className="h-4 w-4 text-gray-600 dark:text-white" />

                <div className="filterButtons flex gap-1">
                  {FILTER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange(option.value)}
                      className={`filterButton relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        filterBy === option.value
                          ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="sortControls hidden items-center gap-3 sm:flex">
                <ArrowUpDown className="h-4 w-4 text-gray-600 dark:text-white" />

                <div className="sortButtons flex gap-1">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onSortChange(option.value)}
                      className={`sortButton relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        sortBy === option.value
                          ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom: Resource count */}
            <div className="resourceCount text-sm font-medium text-gray-700 dark:text-white">
              Showing {displayedCount} of {totalCount} resources
            </div>
          </div>
        ) : (
          /* Layout without Filter - Resource count left, Sort right */
          <div className="sortingWrapper flex flex-col gap-4">
            {/* Mobile: Sort dropdown */}
            <div className="sm:hidden">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                aria-label="Sort resources"
                className="sortSelect w-full appearance-none rounded-lg border border-gray-300 bg-gray-100 px-4 py-2 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400/30"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                  backgroundPosition: 'right 0.75rem center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '1.5em 1.5em'
                }}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Desktop: Resource count left, Sort right */}
            <div className="hidden items-center justify-between sm:flex">
              {/* Left: Resource count */}
              <div className="resourceCount text-sm font-medium text-gray-700 dark:text-white">
                Showing {displayedCount} of {totalCount} resources
              </div>

              {/* Right: Sort controls */}
              <div className="sortControls flex items-center gap-3">
                <ArrowUpDown className="h-4 w-4 text-gray-600 dark:text-white" />

                <div className="sortButtons flex gap-1">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onSortChange(option.value)}
                      className={`sortButton relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        sortBy === option.value
                          ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: Resource count */}
            <div className="resourceCount text-sm font-medium text-gray-700 sm:hidden dark:text-white">
              Showing {displayedCount} of {totalCount} resources
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
