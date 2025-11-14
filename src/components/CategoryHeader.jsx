import Breadcrumbs from '@/components/Breadcrumbs'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function CategoryHeader({ title, description, type = 'default' }) {
  const breadcrumbItems = [
    { name: 'Home', path: '/' },
    { name: title, path: null } // Current page, no link
  ]

  // Type styles
  const isNatural = type === 'natural'
  const containerClasses = isNatural
    ? 'categoryHeader relative overflow-hidden px-8 pt-36 pb-[496px] -mb-[446px] md:-mb-[464px]'
    : 'categoryHeader relative overflow-hidden border-b border-gray-200 px-8 pt-28 pb-8 dark:border-gray-800/50'

  return (
    <div className={containerClasses}>
      {/* Animated Background */}
      <AnimatedBackground type={type} />

      {/* Content */}
      <div className="relative z-10">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="categoryInfo">
          <h1 className="categoryTitle text-4xl font-bold">{title}</h1>
          <p className="categorySubtitle mt-2 text-lg text-gray-600 dark:text-white/90">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}
