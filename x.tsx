'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function FormResponsesPage() {
  const params = useParams()
  const formId = params.formId as string

  const [fieldsMap, setFieldsMap] = useState<Record<string, string>>({})
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [responses, setResponses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!formId) return

    async function loadData() {
      /* Load fields */
      const { data: fields } = await supabase
        .from('erp_form_fields')
        .select('id, label')
        .eq('form_id', formId)

      const map: Record<string, string> = {}
      fields?.forEach(f => (map[f.id] = f.label))
      setFieldsMap(map)

      /* Load responses (NO JOIN) */
      const { data, error } = await supabase
        .from('erp_form_responses')
        .select('id, student_name, response, submitted_at')
        .eq('form_id', formId)
        .order('submitted_at', { ascending: false })

      if (error) {
        console.error(error)
        alert('Failed to load responses')
        return
      }

      setResponses(data || [])
      setLoading(false)
    }

    loadData()
  }, [formId])

  if (loading) return <p>Loading responses...</p>

  if (responses.length === 0) {
    return <p>No responses yet.</p>
  }

  return (
    <div>
      <h2>Form Responses</h2>

      {responses.map(res => (
        <div key={res.id} className="response-card">
          <h4>Student: {res.student_name}</h4>

          <table>
            <tbody>
              {Object.entries(res.response).map(
                ([fieldId, value]) => (
                  <tr key={fieldId}>
                    <td>
                      <strong>
                        {fieldsMap[fieldId] || 'Unknown'}
                      </strong>
                    </td>
                    <td>{String(value)}</td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          <small>
            Submitted:{' '}
            {new Date(res.submitted_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  fetchAllAdminForms,
  deleteAdminForm,
  createAdminForm,
} from '@/lib/formService'
import { supabase } from '@/lib/supabaseClient'

export default function AdminFormsPage() {
  const router = useRouter()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [forms, setForms] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingForms, setLoadingForms] = useState(true)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formToDelete, setFormToDelete] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)



async function loadForms() {
  setLoadingForms(true)
  const data = await fetchAllAdminForms()
  setForms(data)
  setLoadingForms(false)
}


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadForms()
  }, [])

  async function confirmDelete() {
  if (!formToDelete) return

  setDeleting(true)
  await deleteAdminForm(formToDelete)
  setDeleting(false)

  setShowDeleteModal(false)
  setFormToDelete(null)

  loadForms()
}

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

    setShowModal(false)
    setTitle('')
    setDescription('')
    setLoading(false)

    router.push(`/admin/forms/edit/${form.id}`)
  }

  return (
    <div className="min-h-screen bg-white p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-slate-800">
          Forms
        </h1>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700
                     text-white px-5 py-2.5 rounded-lg text-sm font-medium"
        >
          + Create New Form
        </motion.button>
      </div>

        {loadingForms ? (
        <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-4 border-indigo-500
                            border-t-transparent rounded-full animate-spin" />
        </div>
        ) : forms.length === 0 ? (
        <p className="text-sm text-slate-500">
            No forms created yet.
        </p>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map(form => (
            <motion.div
              key={form.id}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-slate-200
                         shadow-sm p-6 transition"
            >
              <h3 className="text-lg font-semibold text-slate-800">
                {form.title}
              </h3>

              {form.description && (
                <p className="text-sm text-slate-500 mt-2">
                  {form.description}
                </p>
              )}

              <div className="flex items-center gap-3 mt-6">
                <button
                  onClick={() =>
                    router.push(`/admin/forms/${form.id}`)
                  }
                  className="px-4 py-2 text-sm rounded-lg
                            border border-slate-300
                            text-slate-700 bg-white
                            hover:bg-slate-100"
                >
                  View
                </button>

                <button
                  onClick={() =>
                    router.push(`/admin/forms/edit/${form.id}`)
                  }
                  className="px-4 py-2 text-sm rounded-lg
                             bg-indigo-600 text-white
                             hover:bg-indigo-700"
                >
                  Edit
                </button>

                <button
                  onClick={() => {
                                setFormToDelete(form.id)
                                setShowDeleteModal(true)
                                }}
                  className="ml-auto text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Create Form Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50
                       bg-black/40 backdrop-blur-md
                       flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-xl
                         rounded-2xl p-8 shadow-xl"
            >
              <h2 className="text-2xl font-bold text-slate-800">
                Create New Form
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                Set up basic details. You can add questions next.
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Form Title
                  </label>
                  <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Student Feedback Form"
                    className="w-full rounded-xl border border-slate-300
                               px-4 py-3 text-sm text-slate-900
                                placeholder:text-slate-400
                               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Brief description of the form purpose"
                    className="w-full rounded-xl border border-slate-300
                               px-4 py-3 text-sm resize-none  text-slate-900
                                placeholder:text-slate-400
                               focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
                <button
                  onClick={() => setShowModal(false)}
                  className="text-sm px-4 py-2 rounded-lg
                             hover:bg-slate-100  text-slate-900"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCreate}
                  disabled={loading || !title.trim()}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white
                    ${
                      loading || !title.trim()
                        ? 'bg-indigo-300 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700'
                    }`}
                >
                  {loading ? 'Creating...' : 'Create & Add Questions'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>


      {/* Delete Confirmation Modal */}
      <AnimatePresence>
  {showDeleteModal && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50
                 bg-black/30 backdrop-blur-sm
                 flex items-center justify-center"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl
                   w-full max-w-md p-6 shadow-xl"
      >
        <h3 className="text-lg font-semibold text-slate-800">
          Delete Form
        </h3>

        <p className="text-sm text-slate-600 mt-2">
          Are you sure you want to delete this form?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowDeleteModal(false)}
            className="px-4 py-2 text-sm rounded-lg
                       text-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            onClick={confirmDelete}
            disabled={deleting}
            className={`px-5 py-2 text-sm rounded-lg font-medium text-white
              ${
                deleting
                  ? 'bg-red-300 cursor-not-allowed'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  )
}


show all the forms on left side like side bar and on click view them in right side ..now need of new forms route...
for each form in sidebar add action button ..
add proper loading states .
Upgrade UI + motion + typography.

