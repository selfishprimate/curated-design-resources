import { Link, useLocation } from 'react-router-dom'

// Logo SVG Component - Using external SVG file
function LogoMark() {
  return (
    <img src="/logomark.svg" alt="Mossaique Logo" className="h-full w-full" />
  )
}

export default function Logo() {
  const location = useLocation()

  const handleClick = (e) => {
    // If we're already on the home page, scroll to top smoothly
    if (location.pathname === '/') {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    // Otherwise, let the Link component handle navigation (ScrollToTop will handle the scroll)
  }

  return (
    <Link
      to="/"
      onClick={handleClick}
      className="logo flex min-w-0 items-center gap-1.5 text-gray-900 transition-opacity hover:opacity-80 dark:text-white"
    >
      <div className="logoMark flex-shrink-0">
        <div className="h-6 w-6">
          <LogoMark />
        </div>
      </div>
      <div className="logoText truncate text-base font-medium">
        Mossaique
      </div>
    </Link>
  )
}
