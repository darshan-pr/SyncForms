'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { logoutStudentAccount } from '@/lib/authService'
import { supabase } from '@/lib/supabaseClient'

export default function StudentNavbar({
  user,
  showProfile,
  setShowProfile,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any
  showProfile: boolean
  setShowProfile: (v: boolean) => void
}) {
  const [isLoading, setIsLoading] = useState(false)
  const [fullName, setFullName] = useState<string>('Student')

  /* 🔹 Fetch student profile */
  useEffect(() => {
    if (!user?.id) return

    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single()

      if (!error && data?.full_name) {
        setFullName(data.full_name)
      }
    }

    fetchProfile()
  }, [user])

  async function handleStudentLogout() {
    try {
      setIsLoading(true)
      await logoutStudentAccount()
      window.location.href = '/auth/login'
    } catch (err) {
      alert('Logout failed. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="bg-white border-b px-5 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800">
          Student Portal
        </h1>

        <button onClick={() => setShowProfile(true)}>
          <div
            className="h-9 w-9 rounded-full bg-indigo-600
                       text-white flex items-center justify-center
                       font-semibold text-sm"
          >
            {fullName?.[0]?.toUpperCase() || 'S'}
          </div>
        </button>
      </nav>

      {/* PROFILE OVERLAY */}
      <AnimatePresence>
        {showProfile && (
          <>
            {/* BACKDROP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowProfile(false)}
              className="fixed inset-0 z-40 bg-black/30"
            />

            {/* PROFILE CARD */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed bottom-0 left-0 right-0 z-50
                         mx-auto w-full max-w-md
                         bg-white rounded-t-2xl
                         shadow-2xl p-6"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-slate-800">
                  Profile
                </h2>
                <button onClick={() => setShowProfile(false)}>
                  <X size={18} />
                </button>
              </div>

              {/* USER INFO */}
              <div className="flex items-center gap-4 mb-5">
                <div
                  className="h-12 w-12 rounded-full bg-indigo-600
                             text-white flex items-center justify-center
                             font-semibold text-lg"
                >
                  {fullName?.[0]?.toUpperCase() || 'S'}
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    {fullName}
                  </p>
                  <p className="text-xs text-slate-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* ACTIONS */}
              <div className="border-t pt-4 flex flex-col gap-3">
                <button
                  className="text-left text-sm text-slate-700
                             hover:text-indigo-600 transition"
                >
                  Edit Profile
                </button>

                <button
                  onClick={handleStudentLogout}
                  disabled={isLoading}
                  className="text-left text-sm text-red-600
                             hover:underline disabled:opacity-60"
                >
                  {isLoading ? 'Logging out…' : 'Logout'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
