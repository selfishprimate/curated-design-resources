import { ArrowUpDown } from 'lucide-react'

const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'recent', label: 'Most Recent' },
  { value: 'alphabetic', label: 'Alphabetic' }
]

export default function SortFilter({
  sortBy = 'popular',
  onSortChange,
  totalCount,
  displayedCount
}) {
  const currentLabel = SORT_OPTIONS.find(opt => opt.value === sortBy)?.label || 'Sort'

  return (
    <section className="bg-white md:bg-transparent dark:bg-gray-950 dark:md:bg-transparent">
      <div className="w-full px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Left: Resource count */}
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Showing {displayedCount} of {totalCount} resources
          </div>

          {/* Right: Sort options */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <ArrowUpDown className="h-4 w-4" />
              <span className="text-sm font-medium">Sort:</span>
            </div>

            {/* Mobile: Dropdown */}
            <div className="sm:hidden">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value)}
                className="appearance-none rounded-lg border-0 bg-gray-100 px-4 py-2 pr-10 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/30 dark:bg-gray-800 dark:text-white dark:focus:ring-blue-400/30"
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

            {/* Desktop: Buttons */}
            <div className="hidden gap-1 sm:inline-flex">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={`relative rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                    sortBy === option.value
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
                      : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
