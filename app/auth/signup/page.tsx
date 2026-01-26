"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { registerStudentAccount } from "@/lib/authService"
import { poppins } from "@/lib/fonts"

export default function StudentSignup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function handleSignup() {
    try {
      setError("")
      setLoading(true)
      await registerStudentAccount(email, password, fullName)
      router.push("/auth/login")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`${poppins.className} min-h-screen flex items-center justify-center bg-green-50 px-4`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl rounded-2xl bg-white shadow-2xl p-6 sm:p-8 grid gap-8 md:grid-cols-2"
      >
        {/* LEFT – FORM */}
        <div className="order-2 md:order-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal-700">
            Student Signup
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Create your student account
          </p>

          {/* IMAGE – MOBILE (BELOW HEADING) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 mb-8 flex justify-center md:hidden"
          >
            <img
              src="https://img.freepik.com/premium-vector/mobile-login-concept-illustration_114360-135.jpg"
              alt="Student signup illustration"
              className="w-full max-w-[220px] object-contain"
            />
          </motion.div>

          {error && (
            <div className="mt-4 rounded-md bg-red-100 text-red-700 text-sm px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-6 space-y-4">
            <input
              placeholder="Full Name"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5
                         placeholder-gray-400 text-slate-800
                         focus:outline-none focus:ring-4 focus:ring-green-300/50"
            />

            <input
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5
                         placeholder-gray-400 text-slate-800
                         focus:outline-none focus:ring-4 focus:ring-green-300/50"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3.5
                         placeholder-gray-400 text-slate-800
                         focus:outline-none focus:ring-4 focus:ring-green-300/50"
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="mt-6 w-full rounded-lg py-3.5 text-white font-semibold
                       transition disabled:opacity-60"
            style={{ backgroundColor: "rgb(5 180 152)" }}
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Student portal access
            </p>

            <button
              onClick={() => router.push("/auth/login")}
              className="text-xs font-semibold text-green-600 hover:underline"
            >
              Already have an account?
            </button>
          </div>
        </div>

        {/* RIGHT – IMAGE (DESKTOP ONLY) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="hidden md:flex justify-center order-1 md:order-2"
        >
          <img
            src="https://img.freepik.com/premium-vector/mobile-login-concept-illustration_114360-135.jpg"
            alt="Student signup illustration"
            className="max-w-sm w-full object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
