import { useState, useEffect } from 'react'

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

export default function AnimatedBackground({ type = 'default' }) {
  const [isDark, setIsDark] = useState(false)

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

  // Generate gradient styles once on mount and dark mode change
  const [gradientStyles, setGradientStyles] = useState([])

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)

      // Regenerate gradient styles only when dark mode changes
      const newStyles = colorPalette.colors.map((color, index) =>
        generateGradientStyle(color, index, isDarkMode, gradientPositions[index])
      )
      setGradientStyles(newStyles)
    }

    checkDarkMode()

    // Watch for dark mode changes
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [colorPalette.colors, gradientPositions])

  const minHeightClass = type === 'natural' ? 'min-h-[500px]' : 'min-h-[400px]'

  return (
    <>
      {/* Background */}
      <div className={`animatedBackground gradient-layer absolute inset-0 ${minHeightClass} bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-950`} />

      {/* Animated Gradients - Simplified to 2 layers for better performance */}
      {gradientStyles.length > 0 && (
        <>
          <div
            className={`animatedBackground gradient-layer absolute inset-0 ${minHeightClass} animate-gradient-orbit-1`}
            style={{
              backgroundImage: gradientStyles[0]
            }}
          />
          <div
            className={`animatedBackground gradient-layer absolute inset-0 ${minHeightClass} animate-gradient-orbit-2`}
            style={{
              backgroundImage: gradientStyles[1]
            }}
          />
        </>
      )}

      {/* Bottom Fade Mask - Only for natural type */}
      {type === 'natural' && (
        <div
          className="backgroundMask gradient-mask absolute left-0 right-0 pointer-events-none bg-gradient-to-t from-white to-transparent dark:from-gray-950 bottom-0 h-48 md:h-48"
        />
      )}
    </>
  )
}
