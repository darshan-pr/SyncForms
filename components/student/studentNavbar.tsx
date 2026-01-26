'use client';
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
  return (
    <>
      <nav className="bg-white border-b px-5 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-800">
          Student Portal
        </h1>

        <button
          onClick={() => setShowProfile(true)}
          className="flex items-center"
        >
          <div className="h-9 w-9 rounded-full bg-indigo-600
                          text-white flex items-center justify-center
                          font-semibold">
            {user?.email?.[0]?.toUpperCase() || 'S'}
          </div>
        </button>
      </nav>

      {/* Mobile Profile Panel */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-50 bg-white p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800">
                Profile
              </h2>
              <button onClick={() => setShowProfile(false)}>
                <X />
              </button>
            </div>

            <div className="space-y-3 text-sm">
              <p className="text-slate-700">
                <span className="font-medium">Name:</span>{' '}
                {user?.user_metadata?.name || 'Student'}
              </p>
              <p className="text-slate-700">
                <span className="font-medium">Email:</span>{' '}
                {user?.email}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
