/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import {
  fetchFormWithFields,
  submitFormResponse,
} from '@/lib/formService'
import { supabase } from '@/lib/supabaseClient'
import StudentNavbar from '@/components/student/studentNavbar'

export default function StudentFillForm() {
  const router = useRouter()
  const params = useParams()
  const formId = params.formId as string

  const STORAGE_KEY = `student-form-draft-${formId}`

  const [form, setForm] = useState<any>(null)
  const [fields, setFields] = useState<any[]>([])
  const [answers, setAnswers] = useState<Record<string, any>>({})
  const [currentIndex, setCurrentIndex] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)

  /* ---------- LOAD USER ---------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  /* ---------- LOAD FORM ---------- */
  useEffect(() => {
    if (!formId) return

    fetchFormWithFields(formId)
      .then(data => {
        setForm(data.form)
        setFields(data.fields)

        // 🔄 Restore cached draft
        const cached = localStorage.getItem(STORAGE_KEY)
        if (cached) {
          const parsed = JSON.parse(cached)
          setAnswers(parsed.answers || {})
          setCurrentIndex(parsed.currentIndex || 0)
        }
      })
      .catch(() => alert('Failed to load form'))
      .finally(() => setLoading(false))
  }, [formId])

  /* ---------- CACHE ON CHANGE ---------- */
  useEffect(() => {
    if (!fields.length) return

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        answers,
        currentIndex,
      })
    )
  }, [answers, currentIndex, fields.length])

  function handleChange(fieldId: string, value: any) {
    setAnswers(prev => ({ ...prev, [fieldId]: value }))
  }

  const field = fields[currentIndex]
  const isLast = currentIndex === fields.length - 1

  /* ---------- SUBMIT ---------- */
  async function handleSubmit() {
    for (const f of fields) {
      if (f.required && !answers[f.id]) {
        alert(`"${f.label}" is required`)
        return
      }
    }

    setSubmitting(true)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push('/student/login')
        return
      }

      await submitFormResponse(formId, user.id, answers)

      // 🧹 Clear cache after successful submit
      localStorage.removeItem(STORAGE_KEY)

      router.push('/student/home')
    } catch {
      alert('Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ✅ SHARED NAVBAR */}
      <StudentNavbar
        user={user}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />

      <main className="max-w-xl mx-auto px-5 py-10">

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 border-4 border-indigo-500
                            border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {!loading && form && fields.length > 0 && (
          <>

            {/* Form Header */}
            {/* Progress */}
            <div className="header-progress mb-3 flex flex-row justify-between text-slate-700 text-sm">
                <p>{form.title}</p>
                <p>Question {currentIndex + 1} of {fields.length}</p>
            </div>

            <div className="h-1 bg-slate-200 rounded-full mb-8">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{
                  width: `${((currentIndex + 1) / fields.length) * 100}%`,
                }}
              />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={field.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="bg-white border rounded-2xl p-6 shadow-sm"
              >
                <label className="block text-lg font-medium text-black">
                  {field.label}
                  {field.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>

                <div className="mt-4">
                  {field.field_type === 'text' && (
                    <input
                      value={answers[field.id] || ''}
                      onChange={e =>
                        handleChange(field.id, e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3
                                 text-sm focus:ring-2 focus:ring-indigo-500 text-slate-800"
                    />
                  )}

                  {field.field_type === 'textarea' && (
                    <textarea
                      rows={4}
                      value={answers[field.id] || ''}
                      onChange={e =>
                        handleChange(field.id, e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3
                                 resize-none text-sm
                                 focus:ring-2 focus:ring-indigo-500 text-slate-800"
                    />
                  )}

                  {field.field_type === 'number' && (
                    <input
                      type="number"
                      value={answers[field.id] || ''}
                      onChange={e =>
                        handleChange(field.id, e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3
                                 text-sm focus:ring-2 focus:ring-indigo-500 text-slate-800"
                    />
                  )}

                  {field.field_type === 'select' && (
                    <select
                      value={answers[field.id] || ''}
                      onChange={e =>
                        handleChange(field.id, e.target.value)
                      }
                      className="w-full border rounded-xl px-4 py-3
                                 bg-white text-sm
                                 focus:ring-2 focus:ring-indigo-500 text-slate-800"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((opt: string) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={() => setCurrentIndex(i => i - 1)}
                disabled={currentIndex === 0}
                className="flex items-center gap-2 px-4 py-2
                           rounded-lg text-sm border
                           disabled:opacity-40 text-slate-700"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {!isLast ? (
                <button
                  onClick={() => setCurrentIndex(i => i + 1)}
                  className="flex items-center gap-2 px-5 py-2
                             bg-indigo-600 text-white
                             rounded-lg text-sm font-medium
                             hover:bg-indigo-700"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-6 py-2 bg-indigo-600
                             text-white rounded-lg
                             text-sm font-medium
                             hover:bg-indigo-700
                             disabled:opacity-50"
                >
                  {submitting ? 'Submitting…' : 'Submit'}
                </button>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  )
}
