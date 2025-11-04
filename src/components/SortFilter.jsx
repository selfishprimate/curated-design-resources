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
  return (
    <section className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8">
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
            <div className="inline-flex gap-1">
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
