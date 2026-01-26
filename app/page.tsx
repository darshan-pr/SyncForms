'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-700">
          Student ERP
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 text-sm font-medium">
          <span className="cursor-pointer hover:text-blue-600">Home</span>
          <span className="cursor-pointer hover:text-blue-600">Features</span>
          <span className="cursor-pointer hover:text-blue-600">About</span>
          <span className="cursor-pointer hover:text-blue-600">Contact</span>
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => window.location.href = 'auth/login'}
          className="hidden md:block px-5 py-2 rounded-lg bg-blue-600
                     text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </button>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMenuOpen(true)}
        >
          <Menu />
        </button>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white p-6"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold text-blue-700">
                Student ERP
              </span>
              <button onClick={() => setMenuOpen(false)}>
                <X />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-base font-medium">
              <span>Home</span>
              <span>Features</span>
              <span>About</span>
              <span>Contact</span>

              <button
                onClick={() => window.location.href = 'auth/login'}
                className="mt-6 px-6 py-3 rounded-lg bg-blue-600
                           text-white font-semibold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6
                          pt-24 pb-24
                          md:pt-36 md:pb-40
                          grid gap-12 md:grid-cols-2 items-center">

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl
                         font-extrabold leading-tight">
            Smart ERP System for <br />
            <span className="text-blue-600">Modern Education</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-lg">
            A centralized student ERP platform designed to manage academic forms,
            attendance, results, feedback, and institutional workflows digitally
            with accuracy and transparency.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = 'auth/login'}
              className="px-6 py-3 rounded-lg bg-blue-600
                         text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <button
              onClick={() => window.location.href = 'auth/signup'}
              className="px-6 py-3 rounded-lg border border-blue-600
                         text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.img
          src="https://img.freepik.com/premium-vector/people-read-search-knowledge-books-internet-concept-flat-illustratiuon_720185-2476.jpg"
          alt="ERP Illustration"
          className="w-full max-w-sm md:max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl
                         font-extrabold text-center">
            ERP Features
          </h2>

          <p className="mt-4 text-center text-gray-500 text-sm sm:text-base">
            Everything students and administrators need, in one platform
          </p>

          <div className="mt-14 sm:mt-20
                          grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ['Academic Forms', 'Submit and track academic forms online without paperwork.'],
              ['Attendance Management', 'View real-time attendance and eligibility status.'],
              ['Results & Grades', 'Secure access to internal marks and semester results.'],
              ['Feedback System', 'Anonymous student feedback for faculty improvement.'],
              ['Notifications', 'Instant updates on circulars, deadlines, and announcements.'],
              ['Admin Dashboard', 'Manage students, approvals, and academic data efficiently.']
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl p-6 sm:p-8
                           border border-gray-200
                           hover:shadow-lg hover:-translate-y-1
                           transition-all duration-300"
              >
                <h3 className="text-base sm:text-lg font-semibold">
                  {title}
                </h3>
                <p className="mt-3 text-sm text-gray-600">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Start Using the ERP Portal Today
        </h2>
        <p className="mt-4 text-gray-600 max-w-xl mx-auto">
          Digitalize academic processes and improve efficiency.
        </p>

        <button
          onClick={() => window.location.href = 'auth/login'}
          className="mt-8 px-8 py-4 rounded-lg bg-blue-600
                     text-white font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Student ERP System. All rights reserved.
      </footer>
    </div>
  )
}
