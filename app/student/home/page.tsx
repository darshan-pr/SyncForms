/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText,
  CalendarDays,
  ClipboardList,
  GraduationCap,
  ChevronDown,
} from 'lucide-react'
import { supabase } from '@/lib/supabaseClient'
import { fetchAvailableForms } from '@/lib/formService'
import StudentNavbar from '@/components/student/studentNavbar'

export default function StudentHome() {
  const router = useRouter()

  const [forms, setForms] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  const [openFeature, setOpenFeature] = useState<string | null>(null)
  const [showProfile, setShowProfile] = useState(false)

  useEffect(() => {
    async function loadData() {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)

      const data = await fetchAvailableForms()
      setForms(data || [])
      setLoading(false)
    }

    loadData()
  }, [])

  const features = [
    {
      id: 'forms',
      title: 'Feedback & Forms',
      short: 'Submit feedback and academic forms',
      description:
        'Submit feedback and academic forms assigned by your institution.',
      icon: FileText,
      available: true,
    },
    {
      id: 'attendance',
      title: 'Attendance',
      short: 'Track your class attendance',
      description:
        'View subject-wise attendance and overall percentage.',
      icon: ClipboardList,
      available: false,
    },
    {
      id: 'exams',
      title: 'Examinations',
      short: 'Exam schedules and results',
      description:
        'Access exam timetables, results, and notifications.',
      icon: GraduationCap,
      available: false,
    },
    {
      id: 'timetable',
      title: 'Time Table',
      short: 'Daily & weekly schedule',
      description:
        'Check your daily and weekly class schedules.',
      icon: CalendarDays,
      available: false,
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Navbar as Component */}
      <StudentNavbar
        user={user}
        showProfile={showProfile}
        setShowProfile={setShowProfile}
      />

      {/* Content */}
      <main className="px-5 py-10 max-w-4xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-slate-800">
            Student Services
          </h2>
          <p className="text-slate-500 mt-1 text-sm">
            Access all academic services from one place
          </p>
        </div>

        <div className="space-y-5">
          {features.map(feature => {
            const Icon = feature.icon
            const open = openFeature === feature.id

            return (
              <div
                key={feature.id}
                className="bg-white border rounded-2xl
                           hover:shadow-sm transition-shadow"
              >
                {/* Header */}
                <button
                  onClick={() =>
                    setOpenFeature(open ? null : feature.id)
                  }
                  className="w-full flex items-start justify-between
                             p-5 text-left"
                >
                  <div className="flex gap-4">
                    <div
                      className="h-10 w-10 rounded-xl
                                 bg-indigo-50 text-indigo-600
                                 flex items-center justify-center"
                    >
                      <Icon size={20} />
                    </div>

                    <div>
                      <p className="font-medium text-slate-800">
                        {feature.title}
                      </p>
                      <p className="text-sm text-slate-500 mt-0.5">
                        {feature.short}
                      </p>
                    </div>
                  </div>

                  <ChevronDown
                    className={`mt-1 transition-transform duration-200
                      ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Body */}
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="px-6 pb-5"
                      style={{ willChange: 'transform, opacity' }}
                    >
                      <p className="text-sm text-slate-600">
                        {feature.description}
                      </p>

                      {!feature.available && (
                        <p className="mt-2 text-sm text-indigo-600">
                          This feature will be available soon.
                        </p>
                      )}

                      {feature.id === 'forms' && feature.available && (
                        <div className="mt-4 space-y-3">
                          {loading ? (
                            <div className="h-10 bg-slate-100 rounded animate-pulse" />
                          ) : forms.length === 0 ? (
                            <p className="text-sm text-slate-500">
                              No forms available.
                            </p>
                          ) : (
                            forms.map(form => (
                              <div
                                key={form.id}
                                className="flex justify-between items-center
                                           bg-slate-50 border rounded-xl
                                           px-4 py-3"
                              >
                                <span className="text-sm text-slate-800">
                                  {form.title}
                                </span>
                                <button
                                  onClick={() =>
                                    router.push(`/student/forms/${form.id}`)
                                  }
                                  className="text-sm font-medium
                                             text-indigo-600"
                                >
                                  Open
                                </button>
                              </div>
                            ))
                          )}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
