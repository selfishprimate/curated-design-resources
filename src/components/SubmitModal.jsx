import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { categories } from '@/data/categories'

export default function SubmitModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    category: '',
    resourceName: '',
    resourceUrl: '',
    description: '',
    submitterName: '',
    submitterEmail: '',
    submitterGithub: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/.netlify/functions/submit-resource', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        // Reset form
        setFormData({
          category: '',
          resourceName: '',
          resourceUrl: '',
          description: '',
          submitterName: '',
          submitterEmail: '',
          submitterGithub: ''
        })

        // Close modal after 2 seconds
        setTimeout(() => {
          onClose()
          setSubmitStatus(null)
        }, 2000)
      } else {
        setSubmitStatus('error')
        console.error('Submission error:', data)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const isFormValid = formData.category && formData.resourceName && formData.resourceUrl && formData.description

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-white/85 backdrop-blur-md dark:bg-gray-950/85">
      {/* Close button - top right corner */}
      <button
        onClick={onClose}
        className="fixed right-6 top-6 z-20 rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-800"
        aria-label="Close modal"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Form Content */}
      <div className="mx-auto max-w-xl px-6 py-12">
        <div className="mb-8">
          <h2 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
            Submit a Resource
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Share a design resource with the community. All submissions will be reviewed before being added to the collection.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-300">
              ✅ Thank you! Your submission has been sent for review.
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-300">
              ❌ Something went wrong. Please try again or contact us directly.
            </div>
          )}

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-blue-400"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: 'right 0.75rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em'
              }}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.title}</option>
              ))}
            </select>
          </div>

          {/* Resource Name */}
          <div>
            <label htmlFor="resourceName" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              Resource Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="resourceName"
              name="resourceName"
              value={formData.resourceName}
              onChange={handleChange}
              required
              placeholder="e.g., Figma"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Resource URL */}
          <div>
            <label htmlFor="resourceUrl" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              Resource URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="resourceUrl"
              name="resourceUrl"
              value={formData.resourceUrl}
              onChange={handleChange}
              required
              placeholder="https://example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of the resource..."
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 dark:border-gray-800" />
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Optional: Help us credit you for this submission
          </p>

          {/* Submitter Name */}
          <div>
            <label htmlFor="submitterName" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              Your Name
            </label>
            <input
              type="text"
              id="submitterName"
              name="submitterName"
              value={formData.submitterName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Submitter Email */}
          <div>
            <label htmlFor="submitterEmail" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              Email
            </label>
            <input
              type="email"
              id="submitterEmail"
              name="submitterEmail"
              value={formData.submitterEmail}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Submitter GitHub */}
          <div>
            <label htmlFor="submitterGithub" className="block text-sm font-medium text-gray-900 mb-2 dark:text-white">
              GitHub Username
            </label>
            <input
              type="text"
              id="submitterGithub"
              name="submitterGithub"
              value={formData.submitterGithub}
              onChange={handleChange}
              placeholder="johndoe"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 transition-colors focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:focus:border-blue-400"
            />
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:border-blue-600 focus:outline-none dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:border-blue-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className="flex-1 rounded-lg border-2 border-blue-600 bg-blue-600 px-4 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 hover:border-blue-700 focus:border-blue-800 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:border-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:focus:border-blue-300"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Resource'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  )
}
