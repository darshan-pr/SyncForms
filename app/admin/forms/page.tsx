/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MoreVertical, RefreshCw, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import {
  fetchAllAdminForms,
  deleteAdminForm,
  createAdminForm,
} from '@/lib/formService'

export default function AdminFormsDashboard() {
  const router = useRouter()

  const [forms, setForms] = useState<any[]>([])
  const [selectedForm, setSelectedForm] = useState<any | null>(null)
  const [responses, setResponses] = useState<any[]>([])
  const [fieldsMap, setFieldsMap] = useState<Record<string, string>>({})

  const [loadingForms, setLoadingForms] = useState(true)
  const [loadingResponses, setLoadingResponses] = useState(false)

  const [openResponseId, setOpenResponseId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState<string | null>(null)

  /* Modals (OLD ones reused) */
  const [showModal, setShowModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [formToDelete, setFormToDelete] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function loadForms() {
    setLoadingForms(true)
    const data = await fetchAllAdminForms()
    setForms(data || [])
    setLoadingForms(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadForms()
  }, [])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as HTMLElement
      if (menuOpen && !target.closest('.menu-container')) {
        setMenuOpen(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [menuOpen])

  useEffect(() => {
    if (!selectedForm) return

    async function loadResponses() {
      setLoadingResponses(true)

      const { data: fields } = await supabase
        .from('erp_form_fields')
        .select('id, label')
        .eq('form_id', selectedForm.id)

      const map: Record<string, string> = {}
      fields?.forEach(f => (map[f.id] = f.label))
      setFieldsMap(map)

      const { data } = await supabase
        .from('erp_form_responses')
        .select('*')
        .eq('form_id', selectedForm.id)
        .order('submitted_at', { ascending: false })

      setResponses(data || [])
      setLoadingResponses(false)
    }

    loadResponses()
  }, [selectedForm])

  async function handleCreate() {
    if (!title.trim()) return
    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    const form = await createAdminForm(title, description, user!.id)

    setShowModal(false)
    setTitle('')
    setDescription('')
    setLoading(false)
    loadForms()

    router.push(`/admin/forms/edit/${form.id}`)
  }

  async function confirmDelete() {
    if (!formToDelete) return
    setDeleting(true)

    await deleteAdminForm(formToDelete)

    if (selectedForm?.id === formToDelete) {
      setSelectedForm(null)
    }

    setDeleting(false)
    setShowDeleteModal(false)
    setFormToDelete(null)
    loadForms()
  }

  async function refreshResponses() {
    if (!selectedForm) return
    setLoadingResponses(true)

    const { data: fields } = await supabase
      .from('erp_form_fields')
      .select('id, label')
      .eq('form_id', selectedForm.id)

    const map: Record<string, string> = {}
    fields?.forEach(f => (map[f.id] = f.label))
    setFieldsMap(map)

    const { data } = await supabase
      .from('erp_form_responses')
      .select('*')
      .eq('form_id', selectedForm.id)
      .order('submitted_at', { ascending: false })

    setResponses(data || [])
    setLoadingResponses(false)
  }

  return (
    <div className="h-screen flex flex-col bg-slate-50">

      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 bg-white border-b">
        <div>
          <h1 
            className="text-2xl font-semibold text-slate-800 cursor-pointer hover:text-indigo-600 transition-colors"
            onClick={() => setSelectedForm(null)}
          >
            Forms & Responses
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Create, edit, delete forms
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl
                     text-sm font-medium hover:bg-indigo-700"
        >
          + Create Form
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* LEFT SIDEBAR (UPDATED COLOR) */}
        <aside className="w-80 bg-indigo-50 border-r overflow-y-auto">
          {loadingForms ? (
            <div className="p-4 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-white rounded-xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="p-4 space-y-3">
              {forms.map(form => (
                <div
                  key={form.id}
                  onClick={() => {
                    if (selectedForm?.id === form.id) {
                      setSelectedForm(null)
                    } else {
                      setSelectedForm(form)
                    }
                  }}
                  className={`relative p-4 rounded-xl border cursor-pointer transition-all
                    ${
                      selectedForm?.id === form.id
                        ? 'bg-white border-indigo-500 shadow-sm'
                        : 'bg-white border-indigo-200 hover:border-indigo-300 hover:shadow-sm'
                    }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-slate-800">
                        {form.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">
                        {form.description}
                      </p>
                    </div>

                    {/* 3 DOT MENU */}
                    <div className="menu-container">
                      <button
                        onClick={e => {
                          e.stopPropagation()
                          setMenuOpen(menuOpen === form.id ? null : form.id)
                        }}
                      >
                        <MoreVertical size={18} style={{color:'purple'}}/>
                      </button>

                      <AnimatePresence>
                        {menuOpen === form.id && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute right-0 top-10 bg-white border
                                       rounded-lg shadow-lg z-20 min-w-[140px]"
                          >
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/admin/forms/${form.id}`)
                              }}
                              className="block w-full px-4 py-2 text-sm text-left hover:bg-slate-100 text-slate-800"
                            >
                              View
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                router.push(`/admin/forms/edit/${form.id}`)
                              }}
                              className="block w-full px-4 py-2 text-sm text-left hover:bg-slate-100 text-slate-800"
                            >
                              Edit
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setFormToDelete(form.id)
                                setShowDeleteModal(true)
                                setMenuOpen(null)
                              }}
                              className="block w-full px-4 py-2 text-sm text-left text-red-600
                                         hover:bg-red-50"
                            >
                              Delete
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>

        {/* RIGHT PANEL */}
        <main className="flex-1 p-8 overflow-y-auto bg-slate-50">

          {!selectedForm && (
            <div className="h-full flex flex-col items-center justify-center">
              <img
                src="https://storage.googleapis.com/cm-deployment-prod/explore/src/assets/login/loginPic_3.png"
                className="w-[420px]"
              />
              <p className="mt-6 text-slate-500 text-sm">
                Select a form from the left to view responses
              </p>
            </div>
          )}

          {selectedForm && (
            <>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-800">
                  {selectedForm.title}
                </h2>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => router.push(`/admin/forms/edit/${selectedForm.id}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 
                               text-white rounded-lg text-sm font-medium 
                               hover:bg-indigo-700 transition-colors"
                  >
                    <Plus size={16} />
                    Add Questions
                  </button>

                  <button
                    onClick={refreshResponses}
                    disabled={loadingResponses}
                    className="flex items-center gap-2 px-4 py-2 border 
                               border-slate-300 rounded-lg text-sm font-medium 
                               text-slate-700 hover:bg-slate-100 transition-colors
                               disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <RefreshCw size={16} className={loadingResponses ? 'animate-spin' : ''} />
                    Refresh
                  </button>
                </div>
              </div>

              {loadingResponses ? (
                <div className="flex justify-center py-20">
                  <div className="h-8 w-8 border-4 border-indigo-500
                                  border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  {responses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <img
                        src="https://almightyfila.com/wp-content/uploads/2024/12/faqs.svg"
                        alt="No responses"
                        className="w-64 h-64 opacity-80"
                      />
                      <p className="text-slate-500 mt-6 text-lg">No responses yet</p>
                      <p className="text-slate-400 text-sm mt-2">Responses will appear here once submitted</p>
                    </div>
                  ) : (
                    responses.map(res => {
                      const open = openResponseId === res.id

                      return (
                        <div key={res.id} className="bg-white border rounded-2xl">
                          <button
                            onClick={() => {
                              setOpenResponseId(open ? null : res.id)
                            }}
                            className="w-full p-5 flex justify-between"
                          >
                            <div>
                              <p className="font-medium text-slate-800">
                                {res.student_name}
                              </p>
                              <p className="text-xs text-slate-400">
                                {new Date(res.submitted_at).toLocaleString()}
                              </p>
                            </div>
                            <span className="text-indigo-600 text-sm">
                              {open ? 'Hide' : 'View'}
                            </span>
                          </button>

                          <AnimatePresence initial={false}>
                            {open && (
                                <motion.div
                                initial={{ opacity: 0, y: -8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -8 }}
                                transition={{ duration: 0.18, ease: 'easeOut' }}
                                className="px-6 pb-6"
                                style={{ willChange: 'transform, opacity' }}
                                >
                                <div className="overflow-hidden">
                                    <table className="w-full text-sm">
                                    <tbody className="divide-y">
                                        {Object.entries(res.response).map(
                                        ([fid, val]) => (
                                            <tr key={fid}>
                                            <td className="py-3 font-medium text-slate-700 w-1/2">
                                                {fieldsMap[fid]}
                                            </td>
                                            <td className="py-3 text-slate-600">
                                                {String(val)}
                                            </td>
                                            </tr>
                                        )
                                        )}
                                    </tbody>
                                    </table>
                                </div>
                                </motion.div>
                            )}
                            </AnimatePresence>

                        </div>
                      )
                    })
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>

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