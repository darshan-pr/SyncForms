"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { loginStudentAccount } from '@/lib/authService'
import { poppins } from '@/lib/fonts'

export default function StudentLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() { try { setError('') 
    setLoading(true) 
    await loginStudentAccount(email, password) 
    router.push('/student/home') 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any 
    } catch (err: any) { setError(err.message) } 
    finally { setLoading(false) } 
}

  return (
    <div
      className={`${poppins.className} min-h-screen flex items-center justify-center bg-blue-50 px-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl p-6 sm:p-8 grid gap-8 md:grid-cols-2 items-center"
      >
        {/* LEFT – LOGIN FORM */}
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#ff7546" }}>
            Student Login
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Access your student dashboard
          </p>

          {error && (
            <div className="mt-4 rounded-md bg-red-100 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5
                         placeholder-gray-400
                         focus:outline-none focus:ring-4 focus:ring-blue-300/50"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5
                         placeholder-gray-400
                         focus:outline-none focus:ring-4 focus:ring-blue-300/50"
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full rounded-lg  py-3.5
                       text-white font-semibold
                       hover:bg-blue-700 transition
                       disabled:opacity-60"
          style={{backgroundColor:'#ff7546'}}>
            {loading ? 'Logging in…' : 'Login'}
          </button>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Students only
            </p>

            <button
              onClick={() => router.push('/auth/signup')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Create account
            </button>
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex justify-center"
        >
          <img
            src="https://portal.edustreak.com/wp-content/uploads/2023/10/login.png"
            alt="Secure login"
            className="max-w-sm w-full"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
