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
  return (
    <section className="sorting">
      <div className="sortingContainer w-full p-6">
        <div className="sortingWrapper flex flex-col gap-4">
          {/* Filter & Sort */}
          <div className="no-scrollbar -mx-6 flex items-center gap-6 overflow-x-auto px-6 sm:mx-0 sm:gap-3 sm:justify-between sm:px-0">
            {/* Filter */}
            {showFilter && (
              <div className="filterControls flex items-center gap-3">
                <Filter className="h-4 w-4 text-gray-600 dark:text-white/60" />
                <div className="filterButtons flex gap-1">
                  {FILTER_OPTIONS.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => onFilterChange(option.value)}
                      className={`filterButton whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                        filterBy === option.value
                          ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                          : 'bg-gray-900/5 text-gray-600 hover:bg-gray-900/10 hover:text-gray-900 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Separator */}
            {showFilter && (
              <div className="hidden h-6 w-px border-l border-gray-900/20 dark:border-white/20" />
            )}

            {/* Sort */}
            <div className="sortControls flex items-center gap-3">
              <ArrowUpDown className="h-4 w-4 text-gray-600 dark:text-white/60" />
              <div className="sortButtons flex gap-1">
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => onSortChange(option.value)}
                    className={`sortButton whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                      sortBy === option.value
                        ? 'bg-gray-900 text-white hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100'
                        : 'bg-gray-900/5 text-gray-600 hover:bg-gray-900/10 hover:text-gray-900 dark:bg-white/5 dark:text-white dark:hover:bg-white/10'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Resource count */}
          <div className="resourceCount text-sm font-medium text-gray-700 dark:text-white">
            Showing {displayedCount} of {totalCount} resources
          </div>
        </div>
      </div>
    </section>
  )
}
