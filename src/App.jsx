import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Toast from '@/components/Toast'
import SubmitModal from '@/components/SubmitModal'
import Home from '@/pages/Home'
import Category from '@/pages/Category'

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
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Header onShowToast={showToast} onToggleSidebar={toggleSidebar} onOpenSubmitModal={openSubmitModal} />

        <div className="flex pt-16 sm:pt-20">
          <Sidebar
            isOpen={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            onSubmit={openSubmitModal}
          />
          <div className="ml-0 flex min-h-[calc(100vh-4rem)] flex-1 flex-col lg:ml-64">
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Category />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </div>
      </div>

      {/* Submit Modal */}
      <SubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onShowToast={showToast}
      />

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
