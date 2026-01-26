'use client'

import { useEffect, useState, use } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus } from 'lucide-react'
import {
  addFormField,
  fetchFormFields,
  deleteFormField,
} from '@/lib/formService'

type FieldType = 'text' | 'textarea' | 'number' | 'select'

export default function EditFormPage({
  params,
}: {
  params: Promise<{ formId: string }>
}) {
  const { formId } = use(params)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [fields, setFields] = useState<any[]>([])
  const [label, setLabel] = useState('')
  const [type, setType] = useState<FieldType>('text')
  const [required, setRequired] = useState(false)
  const [options, setOptions] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingFields, setLoadingFields] = useState(true)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    if (formId) loadFields()
  }, [formId])

  async function loadFields() {
    setLoadingFields(true)
    const data = await fetchFormFields(formId)
    setFields(data || [])
    setLoadingFields(false)
  }

  async function handleAddField() {
    if (!label.trim()) return

    setLoading(true)

    const newField = await addFormField(
      formId,
      label,
      type,
      required,
      type === 'select'
        ? options.split(',').map(o => o.trim())
        : undefined
    )

    setFields(prev => [...prev, newField])

    setLabel('')
    setOptions('')
    setRequired(false)
    setType('text')
    setLoading(false)
  }

  async function handleDeleteField(fieldId: string) {
    await deleteFormField(fieldId)
    setFields(prev => prev.filter(f => f.id !== fieldId))
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b px-8 py-5">
        <h1 className="text-2xl font-semibold text-slate-800">
          Form Builder
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Add questions and build your form structure
        </p>
      </header>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ADD QUESTION PANEL */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 bg-white border border-slate-200 
                       rounded-2xl p-6 sticky top-6 h-fit shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-800 mb-4">
              Add Question
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Question Label
                </label>
                <input
                  value={label}
                  onChange={e => setLabel(e.target.value)}
                  placeholder="e.g. What is your name?"
                  className="w-full px-4 py-2.5 rounded-xl
                             border border-slate-300 text-sm text-slate-900
                             placeholder:text-slate-400
                             focus:ring-2 focus:ring-indigo-500
                             focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Field Type
                </label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as FieldType)}
                  className="w-full px-4 py-2.5 rounded-xl
                             border border-slate-300 text-sm text-slate-800
                             bg-white focus:ring-2 focus:ring-indigo-500
                             focus:outline-none"
                >
                  <option value="text">Short answer</option>
                  <option value="textarea">Paragraph</option>
                  <option value="number">Number</option>
                  <option value="select">Dropdown</option>
                </select>
              </div>

              <AnimatePresence>
                {type === 'select' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Options
                    </label>
                    <input
                      value={options}
                      onChange={e => setOptions(e.target.value)}
                      placeholder="Option 1, Option 2, Option 3"
                      className="w-full px-4 py-2.5 rounded-xl
                                 border border-slate-300 text-sm text-slate-900
                                 placeholder:text-slate-400
                                 focus:ring-2 focus:ring-indigo-500
                                 focus:outline-none"
                    />
                    <p className="text-xs text-slate-500 mt-1.5">
                      Separate options with commas
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={required}
                  onChange={e => setRequired(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                Required field
              </label>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddField}
                disabled={loading || !label.trim()}
                className={`w-full py-2.5 rounded-xl text-sm font-medium text-white
                  flex items-center justify-center gap-2
                  ${
                    loading || !label.trim()
                      ? 'bg-indigo-300 cursor-not-allowed'
                      : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
              >
                <Plus size={16} />
                {loading ? 'Adding…' : 'Add Question'}
              </motion.button>
            </div>
          </motion.div>

          {/* QUESTIONS LIST PANEL */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">
                  Questions
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  {fields.length} {fields.length === 1 ? 'question' : 'questions'} added
                </p>
              </div>
            </div>

            {loadingFields ? (
              <div className="flex justify-center py-20">
                <div className="h-8 w-8 border-4 border-indigo-500
                                border-t-transparent rounded-full animate-spin" />
              </div>
            ) : fields.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
                <img
                  src="https://almightyfila.com/wp-content/uploads/2024/12/faqs.svg"
                  alt="No questions"
                  className="w-64 h-64 opacity-80 mb-4"
                />
                <p className="text-slate-600 font-medium text-lg mb-1">
                  No questions yet
                </p>
                <p className="text-sm text-slate-500">
                  Add your first question using the panel on the left
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -2 }}
                    className="bg-white border border-slate-200
                               rounded-xl p-5 flex items-start justify-between
                               shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 
                                         px-2 py-1 rounded">
                          Q{index + 1}
                        </span>
                        {field.required && (
                          <span className="text-xs font-medium text-red-600 bg-red-50 
                                           px-2 py-1 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="font-medium text-slate-800 mt-2">
                        {field.label}
                      </p>
                      <p className="text-xs text-slate-500 mt-1 capitalize">
                        {field.field_type === 'textarea' ? 'Paragraph' : 
                         field.field_type === 'select' ? 'Dropdown' :
                         field.field_type === 'number' ? 'Number' : 'Short answer'}
                      </p>
                      {field.field_type === 'select' && field.options && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {field.options.map((opt: string, i: number) => (
                            <span 
                              key={i}
                              className="text-xs bg-slate-100 text-slate-600 
                                         px-2 py-0.5 rounded"
                            >
                              {opt}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteField(field.id)}
                      className="ml-4 p-2 text-red-500 hover:bg-red-50 
                                 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}