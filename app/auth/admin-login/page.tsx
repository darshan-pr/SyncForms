"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdminAccount } from '@/lib/authService'
import { poppins } from '@/lib/fonts'

export default function AdminLogin() {
  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAdminLogin() {
    if (!email || !password) {
      setError('Credentials required')
      return
    }

    try {
      setError('')
      setLoading(true)
      await loginAdminAccount(email, password)
      router.push('/admin/dashboard')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`${poppins.className} relative min-h-screen flex items-center justify-center 
                 bg-white px-4 sm:px-6`}
    >
      {/* Card */}
      <div
        className="w-full max-w-md rounded-2xl 
                   bg-gray-300/80
                   border border-white/30 
                   shadow-2xl
                   p-6 sm:p-8"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold 
                     text-black text-center tracking-tight"
        >
          Admin Login
        </h2>

        <p
          className="text-sm sm:text-base 
                     text-black/80 text-center mt-2"
        >
          Secure access to the control panel
        </p>

        {error && (
          <div
            className="mt-4 rounded-md bg-red-500/20 
                       border border-red-400/40 
                       text-black text-sm px-3 py-2"
          >
            {error}
          </div>
        )}

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/90 
                       px-4 py-3.5 text-sm sm:text-base
                       placeholder-gray-600
                       border border-gray-300
                       focus:outline-none 
                       focus:ring-4 focus:ring-blue-400/50"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/90 
                       px-4 py-3.5 text-sm sm:text-base
                       placeholder-gray-600
                       border border-gray-300
                       focus:outline-none 
                       focus:ring-4 focus:ring-purple-400/50"
          />
        </div>

        <button
          onClick={handleAdminLogin}
          disabled={loading}
          className="relative mt-6 w-full rounded-lg
                     px-4 py-3.5 text-sm sm:text-base font-semibold
                     text-black
                     border border-blue-500/40
                     bg-blue-300/50
                     shadow-lg shadow-blue-500/30
                     hover:scale-[1.02] transition
                     active:scale-[0.98]
                     disabled:opacity-60 
                     disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
              Authenticating
            </span>
          ) : (
            'Login'
          )}
        </button>

        <p className="mt-6 text-center text-xs sm:text-sm text-black/60">
          Authorized personnel only
        </p>
      </div>
    </div>
  )
}
