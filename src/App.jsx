import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from '@/components/Sidebar'
import Footer from '@/components/Footer'
import Home from '@/pages/Home'
import Category from '@/pages/Category'

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-white dark:bg-gray-950">
        <Sidebar />
        <div className="ml-64 flex min-h-screen flex-1 flex-col">
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/category/:id" element={<Category />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
