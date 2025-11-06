import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  useEffect(() => {
    // 1 saniye gecikme ile giriş animasyonu
    const showTimer = setTimeout(() => {
      setIsVisible(true)
    }, 1000)

    // Toast'ı gösterdikten sonra duration kadar bekle, sonra çıkış
    if (duration) {
      const hideTimer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          onClose()
        }, 300) // Wait for exit animation
      }, duration + 1000) // 1sn gecikme + duration

      return () => {
        clearTimeout(showTimer)
        clearTimeout(hideTimer)
      }
    }

    return () => clearTimeout(showTimer)
  }, [duration, onClose])

  const handleClose = () => {
    setIsExiting(true)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const icons = {
    success: <CheckCircle className="h-5 w-5 text-green-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />
  }

  const backgrounds = {
    success: 'bg-green-50 dark:bg-green-900/20',
    error: 'bg-red-50 dark:bg-red-900/20',
    info: 'bg-blue-50 dark:bg-blue-900/20'
  }

  const textColors = {
    success: 'text-green-800 dark:text-green-300',
    error: 'text-red-800 dark:text-red-300',
    info: 'text-blue-800 dark:text-blue-300'
  }

  return (
    <div
      className={`fixed left-1/2 top-6 z-[70] -translate-x-1/2 transition-all duration-500 ease-out ${
        isExiting
          ? '-translate-y-24 opacity-0'
          : isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-24 opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 rounded-lg ${backgrounds[type]} px-4 py-3 shadow-lg backdrop-blur-sm border border-black/5 dark:border-white/10`}>
        {icons[type]}
        <p className={`text-sm font-medium ${textColors[type]}`}>{message}</p>
        <button
          onClick={handleClose}
          className={`ml-2 rounded p-0.5 transition-colors hover:bg-black/10 dark:hover:bg-white/10 ${textColors[type]}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
