import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

/**
 * Modal component with two variants:
 * - default: Centered modal with backdrop (for dialogs, confirmations, etc.)
 * - fullPage: Full-page overlay modal (for forms, detailed content, etc.)
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  variant = 'default',
  title,
  description,
  showCloseButton = true,
  maxWidth = 'max-w-3xl'
}) {
  // Prevent body scroll when modal is open and handle ESC key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  // Default modal variant (centered with backdrop)
  if (variant === 'default') {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <div className={`relative w-full ${maxWidth} max-h-[80vh] overflow-hidden rounded-2xl bg-white shadow-2xl dark:bg-gray-900`}>
          {/* Header */}
          {(title || showCloseButton) && (
            <div className="sticky top-0 z-10 bg-white px-6 py-4 dark:bg-gray-900">
              <div className="flex items-start justify-between">
                <div>
                  {title && (
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="mt-1 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className="overflow-y-auto p-6" style={{ maxHeight: title || showCloseButton ? 'calc(80vh - 80px)' : '80vh' }}>
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Full page modal variant
  if (variant === 'fullPage') {
    return createPortal(
      <>
        <style>{`
          input:-webkit-autofill,
          input:-webkit-autofill:hover,
          input:-webkit-autofill:focus,
          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 0 transparent inset, 0 0 0px 1000px rgb(243, 244, 246) inset !important;
            box-shadow: 0 0 0 0 transparent inset, 0 0 0px 1000px rgb(243, 244, 246) inset !important;
            -webkit-text-fill-color: rgb(17 24 39) !important;
            caret-color: rgb(17 24 39) !important;
            border-radius: 0.5rem !important;
            background-clip: padding-box !important;
          }

          .dark input:-webkit-autofill,
          .dark input:-webkit-autofill:hover,
          .dark input:-webkit-autofill:focus,
          .dark textarea:-webkit-autofill,
          .dark textarea:-webkit-autofill:hover,
          .dark textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 0 transparent inset, 0 0 0px 1000px rgb(17, 24, 39) inset !important;
            box-shadow: 0 0 0 0 transparent inset, 0 0 0px 1000px rgb(17, 24, 39) inset !important;
            -webkit-text-fill-color: rgb(255 255 255) !important;
            caret-color: rgb(255 255 255) !important;
            border-radius: 0.5rem !important;
            background-clip: padding-box !important;
          }

          select:-webkit-autofill,
          select:-webkit-autofill:hover,
          select:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px rgb(243, 244, 246) inset !important;
            box-shadow: 0 0 0px 1000px rgb(243, 244, 246) inset !important;
            -webkit-text-fill-color: rgb(17 24 39) !important;
            border-radius: 0.5rem !important;
          }

          .dark select:-webkit-autofill,
          .dark select:-webkit-autofill:hover,
          .dark select:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px rgb(17, 24, 39) inset !important;
            box-shadow: 0 0 0px 1000px rgb(17, 24, 39) inset !important;
            -webkit-text-fill-color: rgb(255 255 255) !important;
            border-radius: 0.5rem !important;
          }

          /* Selection colors for light mode */
          input::selection,
          textarea::selection,
          select::selection {
            background-color: rgb(59, 130, 246, 0.3);
            color: rgb(17 24 39);
          }

          /* Selection colors for dark mode */
          .dark input::selection,
          .dark textarea::selection,
          .dark select::selection {
            background-color: rgb(96, 165, 250, 0.3);
            color: rgb(255 255 255);
          }
        `}</style>
        <div className="fixed inset-0 z-[60] overflow-y-auto bg-white/85 backdrop-blur-md dark:bg-gray-950/85">
          {/* Close button - top right corner - sticky */}
          {showCloseButton && (
            <button
              onClick={onClose}
              className="sticky right-6 top-6 z-20 ml-auto mr-6 mt-6 flex rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Close modal"
            >
              <X className="h-6 w-6" />
            </button>
          )}

          {/* Content */}
          <div className={`mx-auto ${maxWidth} px-6 pb-12`}>
            {(title || description) && (
              <div className="mb-8">
                {title && (
                  <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </>,
      document.body
    )
  }

  return null
}
