'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { createAdminForm } from '@/lib/formService'
import { supabase } from '@/lib/supabaseClient'

export default function CreateFormPage() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    if (!title.trim()) return

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const form = await createAdminForm(
      title,
      description,
      user!.id
    )

    router.push(`/admin/forms/edit/${form.id}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-slate-100 flex items-center justify-center p-6"
    >
      <div className="w-full max-w-2xl bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            Create New Form
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Set up basic details. You can add questions in the next step.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Form Title
            </label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Student Feedback Form"
              className="w-full rounded-xl border border-slate-300 
                         px-4 py-3 text-sm
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Brief description of the form purpose"
              rows={4}
              className="w-full rounded-xl border border-slate-300 
                         px-4 py-3 text-sm resize-none
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              onClick={() => router.back()}
              className="px-5 py-2.5 rounded-lg text-sm 
                         text-slate-600 hover:bg-slate-100"
            >
              Cancel
            </button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading || !title.trim()}
              onClick={handleCreate}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white
                ${loading || !title.trim()
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'}
              `}
            >
              {loading ? 'Creating...' : 'Create & Add Questions'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
