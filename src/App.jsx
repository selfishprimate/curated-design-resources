import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import MenuDesktop from '@/components/MenuDesktop'
import MenuMobile from '@/components/MenuMobile'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'
import ScrollToTop from '@/components/ScrollToTop'
import Home from '@/pages/Home'
import Category from '@/pages/Category'
import SubmitModal from '@/components/SubmitModal'

function App() {
  const [toast, setToast] = useState(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Initialize from localStorage or default to false (expanded)
    const saved = localStorage.getItem('sidebarCollapsed')
    return saved === 'true'
  })

  // Save sidebar collapse state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed)
  }, [isSidebarCollapsed])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed)
  }

  const openSubmitModal = () => {
    setIsSubmitModalOpen(true)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen overflow-x-hidden bg-white dark:bg-gray-950">
        <Navigation
          onToggleSidebar={toggleSidebar}
          onToggleSidebarCollapse={toggleSidebarCollapse}
          isSidebarCollapsed={isSidebarCollapsed}
          onOpenSubmitModal={openSubmitModal}
        />

        <div className="mainWrapper">
          <MenuDesktop isCollapsed={isSidebarCollapsed} />
          <MenuMobile
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSubmit={openSubmitModal}
          />
          <main className={`ml-0 flex min-h-[calc(100vh-5rem)] flex-1 flex-col pb-20 transition-all duration-300 ease-in-out ${
            isSidebarCollapsed ? 'lg:ml-0' : 'lg:ml-64'
          }`}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Category />} />
            </Routes>
            <Footer isSidebarCollapsed={isSidebarCollapsed} />
          </main>
        </div>
      </div>

      {/* Submit Modal */}
      {isSubmitModalOpen && (
        <SubmitModal
          isOpen={isSubmitModalOpen}
          onClose={() => setIsSubmitModalOpen(false)}
          onShowToast={showToast}
        />
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
