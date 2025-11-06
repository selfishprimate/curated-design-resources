import { useState, useEffect, useRef, useCallback } from 'react'
import { Github, Star, Users, Send } from 'lucide-react'
import { categories } from '@/data/categories'
import ResourceCard from '@/components/ResourceCard'
import SEO from '@/components/SEO'
import SortFilter from '@/components/SortFilter'
import SubmitModal from '@/components/SubmitModal'
import Toast from '@/components/Toast'
import { calculatePopularity, sortResources } from '@/utils/sorting'

// Flatten all resources from all categories with metadata
const allResourcesRaw = categories.flatMap(category =>
  category.resources.map(resource => ({
    ...resource,
    category: {
      id: category.id,
      title: category.title,
      icon: category.icon
    },
    popularityScore: calculatePopularity(resource)
  }))
)

const ITEMS_PER_PAGE = 20

// 20 different color palettes for gradient animations
const COLOR_PALETTES = [
  { name: 'Blues', colors: ['blue', 'sky', 'cyan', 'indigo'] },
  { name: 'Purples', colors: ['purple', 'violet', 'indigo', 'fuchsia'] },
  { name: 'Pinks', colors: ['pink', 'rose', 'fuchsia', 'purple'] },
  { name: 'Greens', colors: ['green', 'emerald', 'teal', 'cyan'] },
  { name: 'Oranges', colors: ['orange', 'amber', 'yellow', 'red'] },
  { name: 'Teals', colors: ['teal', 'cyan', 'sky', 'blue'] },
  { name: 'Reds', colors: ['red', 'rose', 'pink', 'orange'] },
  { name: 'Yellows', colors: ['yellow', 'amber', 'orange', 'lime'] },
  { name: 'Indigos', colors: ['indigo', 'blue', 'violet', 'purple'] },
  { name: 'Cool Blues', colors: ['sky', 'blue', 'indigo', 'cyan'] },
  { name: 'Warm Purples', colors: ['fuchsia', 'purple', 'pink', 'rose'] },
  { name: 'Ocean', colors: ['cyan', 'teal', 'blue', 'sky'] },
  { name: 'Sunset', colors: ['orange', 'red', 'pink', 'purple'] },
  { name: 'Forest', colors: ['green', 'emerald', 'teal', 'lime'] },
  { name: 'Lavender', colors: ['violet', 'purple', 'indigo', 'blue'] },
  { name: 'Mint', colors: ['emerald', 'teal', 'cyan', 'green'] },
  { name: 'Coral', colors: ['rose', 'pink', 'orange', 'red'] },
  { name: 'Berry', colors: ['fuchsia', 'purple', 'violet', 'pink'] },
  { name: 'Sky', colors: ['sky', 'cyan', 'blue', 'indigo'] },
  { name: 'Warm Earth', colors: ['amber', 'orange', 'red', 'yellow'] }
]

// Color mappings for Tailwind colors
const tailwindColors = {
  blue: { 200: '#bfdbfe', 300: '#93c5fd', 400: '#60a5fa', 500: '#3b82f6', 600: '#2563eb' },
  sky: { 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8', 500: '#0ea5e9', 600: '#0284c7' },
  cyan: { 200: '#a5f3fc', 300: '#67e8f9', 400: '#22d3ee', 500: '#06b6d4', 600: '#0891b2' },
  indigo: { 200: '#c7d2fe', 300: '#a5b4fc', 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5' },
  purple: { 200: '#e9d5ff', 300: '#d8b4fe', 400: '#c084fc', 500: '#a855f7', 600: '#9333ea' },
  violet: { 200: '#ddd6fe', 300: '#c4b5fd', 400: '#a78bfa', 500: '#8b5cf6', 600: '#7c3aed' },
  fuchsia: { 200: '#f5d0fe', 300: '#f0abfc', 400: '#e879f9', 500: '#d946ef', 600: '#c026d3' },
  pink: { 200: '#fbcfe8', 300: '#f9a8d4', 400: '#f472b6', 500: '#ec4899', 600: '#db2777' },
  rose: { 200: '#fecdd3', 300: '#fda4af', 400: '#fb7185', 500: '#f43f5e', 600: '#e11d48' },
  green: { 200: '#bbf7d0', 300: '#86efac', 400: '#4ade80', 500: '#22c55e', 600: '#16a34a' },
  emerald: { 200: '#a7f3d0', 300: '#6ee7b7', 400: '#34d399', 500: '#10b981', 600: '#059669' },
  teal: { 200: '#99f6e4', 300: '#5eead4', 400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488' },
  lime: { 200: '#d9f99d', 300: '#bef264', 400: '#a3e635', 500: '#84cc16', 600: '#65a30d' },
  yellow: { 200: '#fef08a', 300: '#fde047', 400: '#facc15', 500: '#eab308', 600: '#ca8a04' },
  amber: { 200: '#fde68a', 300: '#fcd34d', 400: '#fbbf24', 500: '#f59e0b', 600: '#d97706' },
  orange: { 200: '#fed7aa', 300: '#fdba74', 400: '#fb923c', 500: '#f97316', 600: '#ea580c' },
  red: { 200: '#fecaca', 300: '#fca5a5', 400: '#f87171', 500: '#ef4444', 600: '#dc2626' }
}

// Helper function to convert hex to rgba
const hexToRgba = (hex, alpha) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha / 100})`
}

// Possible gradient positions
const GRADIENT_POSITIONS = [
  'top left',
  'top center',
  'top right',
  'center left',
  'center',
  'center right',
  'bottom left',
  'bottom center',
  'bottom right',
  '20% 30%',
  '80% 20%',
  '30% 70%',
  '70% 80%',
  '40% 40%',
  '60% 60%'
]

// Helper function to generate gradient styles
const generateGradientStyle = (color, index, isDark = false, position = 'center') => {
  const opacities = [
    { from: 25, via1: 5, via2: 2 },
    { from: 22, via1: 4, via2: 2 },
    { from: 20, via1: 4, via2: 1 },
    { from: 18, via1: 3, via2: 1 }
  ]

  const darkOpacities = [
    { from: 30, via1: 8, via2: 3 },
    { from: 28, via1: 7, via2: 3 },
    { from: 26, via1: 6, via2: 2 },
    { from: 24, via1: 5, via2: 2 }
  ]

  const op = isDark ? darkOpacities[index] : opacities[index]
  const gradientType = index < 2 ? 'ellipse' : 'circle'
  const colorSet = tailwindColors[color]

  const fromColor = isDark ? colorSet[600] : colorSet[500]
  const via1Color = isDark ? colorSet[500] : colorSet[300]
  const via2Color = isDark ? colorSet[400] : colorSet[200]

  if (index < 2) {
    return `radial-gradient(${gradientType} at ${position}, ${hexToRgba(fromColor, op.from)} 10%, ${hexToRgba(via1Color, op.via1)} 25%, ${hexToRgba(via2Color, op.via2)} 40%, transparent 70%)`
  } else {
    return `radial-gradient(${gradientType} at ${position}, ${hexToRgba(fromColor, op.from)} 10%, ${hexToRgba(via1Color, op.via1)} 22%, ${hexToRgba(via2Color, op.via2)} 38%, transparent 65%)`
  }
}

export default function Home() {
  const [displayedItems, setDisplayedItems] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const [githubStats, setGithubStats] = useState({ stars: null, contributors: [] })
  const [sortBy, setSortBy] = useState('popular')
  const observerTarget = useRef(null)
  const [isDark, setIsDark] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  // Select a random color palette on mount
  const [colorPalette] = useState(() => {
    const randomIndex = Math.floor(Math.random() * COLOR_PALETTES.length)
    return COLOR_PALETTES[randomIndex]
  })

  // Select random positions for each gradient
  const [gradientPositions] = useState(() => {
    return [
      GRADIENT_POSITIONS[Math.floor(Math.random() * GRADIENT_POSITIONS.length)],
      GRADIENT_POSITIONS[Math.floor(Math.random() * GRADIENT_POSITIONS.length)],
      GRADIENT_POSITIONS[Math.floor(Math.random() * GRADIENT_POSITIONS.length)],
      GRADIENT_POSITIONS[Math.floor(Math.random() * GRADIENT_POSITIONS.length)]
    ]
  })

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
    }

    checkDarkMode()

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  // Sort resources based on selected option
  const allResources = sortResources(allResourcesRaw, sortBy)

  // Fetch GitHub stats
  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const [repoRes, contributorsRes] = await Promise.all([
          fetch('https://api.github.com/repos/selfishprimate/curated-design-resources'),
          fetch('https://api.github.com/repos/selfishprimate/curated-design-resources/contributors')
        ])

        const repoData = await repoRes.json()
        const contributorsData = await contributorsRes.json()

        // Filter out bot accounts and take max 8 contributors
        const filteredContributors = contributorsData
          .filter(contributor => contributor.type !== 'Bot' && !contributor.login.includes('[bot]'))
          .slice(0, 8)

        setGithubStats({
          stars: repoData.stargazers_count,
          contributors: filteredContributors
        })
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error)
      }
    }

    fetchGitHubStats()
  }, [])

  const loadMore = useCallback(() => {
    if (displayedItems >= allResources.length) return

    setIsLoading(true)
    setTimeout(() => {
      setDisplayedItems(prev => Math.min(prev + ITEMS_PER_PAGE, allResources.length))
      setIsLoading(false)
    }, 300)
  }, [displayedItems])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1 }
    )

    if (observerTarget.current) {
      observer.observe(observerTarget.current)
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current)
      }
    }
  }, [loadMore, isLoading])

  const visibleResources = allResources.slice(0, displayedItems)

  return (
    <div className="bg-white text-gray-900 dark:bg-gray-950 dark:text-white">
      <SEO />
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 px-8 py-32 dark:border-gray-800/50">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-950" />

        {/* Animated Gradients - Multi-directional orbital movement */}
        {colorPalette.colors.map((color, index) => {
          const animationClasses = [
            'animate-gradient-orbit-1',
            'animate-gradient-orbit-2',
            'animate-gradient-orbit-3',
            'animate-gradient-orbit-4'
          ]
          return (
            <div
              key={index}
              className={`absolute inset-0 ${animationClasses[index]}`}
              style={{
                backgroundImage: generateGradientStyle(color, index, isDark, gradientPositions[index])
              }}
            />
          )
        })}

        {/* Content */}
        <div className="relative mx-auto max-w-7xl text-center">
          <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:leading-[1.2] md:text-7xl dark:from-white dark:via-gray-100 dark:to-white">
            Curated Design Resources
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
            A comprehensive collection of handpicked design tools, libraries, and resources
            for designers and developers.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="https://github.com/selfishprimate/curated-design-resources"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-4 font-semibold text-white shadow-lg shadow-gray-900/20 transition-all hover:scale-105 hover:bg-gray-800 hover:shadow-xl sm:w-auto dark:bg-white dark:text-gray-900 dark:shadow-white/20 dark:hover:bg-gray-100"
            >
              <Github className="h-5 w-5" />
              View on GitHub
            </a>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200/60 bg-white px-5 py-4 font-semibold text-gray-900 shadow-sm shadow-gray-900/5 transition-all hover:scale-105 hover:border-gray-200/80 hover:shadow sm:w-auto dark:border-gray-700/40 dark:bg-gray-900/40 dark:text-white dark:backdrop-blur-sm dark:hover:border-gray-700/60 dark:hover:bg-gray-900/50"
            >
              <Send className="h-4 w-4" />
              Submit a Resource
            </button>
          </div>

          {/* GitHub Stats */}
          <div className="mt-10 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
            {/* Contributors */}
            {githubStats.contributors.length > 0 && (
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <div className="flex -space-x-4">
                  {githubStats.contributors.map((contributor) => (
                    <a
                      key={contributor.id}
                      href={contributor.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative inline-block"
                      title={contributor.login}
                    >
                      <img
                        src={contributor.avatar_url}
                        alt={contributor.login}
                        className="h-12 w-12 rounded-full border-[4px] border-white/40 transition-transform hover:scale-110 hover:z-10 dark:border-white/20"
                      />
                    </a>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                  <Users className="h-4 w-4" />
                  <span className="font-medium">{githubStats.contributors.length}+ contributors</span>
                </div>
              </div>
            )}

            {/* Stars */}
            {githubStats.stars !== null && (
              <div className="flex items-center gap-2 rounded-full bg-white/30 px-4 py-2 backdrop-blur-sm dark:bg-white/10">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900 dark:text-white">
                  {githubStats.stars.toLocaleString()}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">stars</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Sort & Filter */}
      <SortFilter
        sortBy={sortBy}
        onSortChange={(value) => {
          setSortBy(value)
          setDisplayedItems(ITEMS_PER_PAGE)
        }}
        totalCount={allResources.length}
        displayedCount={Math.min(displayedItems, allResources.length)}
      />

      {/* Resources Grid */}
      <section className="flex-1">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl5:grid-cols-5 xxl:grid-cols-6 3xl:grid-cols-8">
          {visibleResources.map((resource, index) => (
            <ResourceCard
              key={`${resource.category.id}-${index}`}
              resource={resource}
              showCategory={true}
            />
          ))}
        </div>

        {/* Loading indicator / Observer target */}
        {displayedItems < allResources.length && (
          <div ref={observerTarget} className="border-b border-r border-gray-200 p-8 text-center dark:border-gray-800/50">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {isLoading ? 'Loading more...' : 'Scroll to load more'}
            </div>
          </div>
        )}
      </section>

      {/* Submit Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onShowToast={showToast}
      />

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  )
}
