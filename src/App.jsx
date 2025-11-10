import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, lazy, Suspense } from 'react'
import Navigation from '@/components/Navigation'
import MenuDesktop from '@/components/MenuDesktop'
import MenuMobile from '@/components/MenuMobile'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'
import ScrollToTop from '@/components/ScrollToTop'

// Lazy load heavy components
const SubmitModal = lazy(() => import('@/components/SubmitModal'))
const Home = lazy(() => import('@/pages/Home'))
const Category = lazy(() => import('@/pages/Category'))

function App() {
  const [toast, setToast] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navigation onToggleSidebar={toggleSidebar} onOpenSubmitModal={openSubmitModal} />

        <div className="flex pt-20">
          <MenuDesktop />
          <MenuMobile
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSubmit={openSubmitModal}
          />
          <div className="ml-0 flex min-h-[calc(100vh-5rem)] flex-1 flex-col lg:ml-64">
            <main className="flex-1">
              <Suspense fallback={<div className="flex items-center justify-center min-h-[400px]"><div className="text-gray-500">Loading...</div></div>}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/:id" element={<Category />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <Suspense fallback={null}>
          <SubmitModal
            isOpen={isSubmitModalOpen}
            onClose={() => setIsSubmitModalOpen(false)}
            onShowToast={showToast}
          />
        </Suspense>
      )}

      {/* Global Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </BrowserRouter>
  )
}

export default App
