"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto px-5 sm:px-6 py-4 flex items-center justify-between">
        <div className="text-lg sm:text-xl font-bold text-blue-700">
          Sync Forms
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
          onClick={() => window.location.href = "auth/login"}
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
          <Menu size={24} />
        </button>
      </header>

      {/* MOBILE MENU */}
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
                Sync Forms
              </span>
              <button onClick={() => setMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-6 text-base font-medium">
              <span>Home</span>
              <span>Features</span>
              <span>About</span>
              <span>Contact</span>

              <button
                onClick={() => window.location.href = "auth/login"}
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
      <section
        className="max-w-7xl mx-auto px-5 sm:px-6
                   pt-16 pb-20
                   sm:pt-24 sm:pb-28
                   md:pt-36 md:pb-40
                   grid gap-14 md:grid-cols-2 items-center"
      >

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            className="text-2xl sm:text-4xl md:text-5xl
                       font-extrabold leading-snug sm:leading-tight"
          >
            Streamlined Form Management for <br />
            <span className="text-blue-600">Modern Organizations</span>
          </h1>

          <p
            className="mt-6 sm:mt-6
                       text-sm sm:text-lg
                       text-gray-600 max-w-lg"
          >
            A comprehensive form management platform designed to streamline data collection,
            automate workflows, and enhance productivity with secure, real-time synchronization
            and intuitive administration tools.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => window.location.href = "auth/login"}
              className="px-6 py-3 rounded-lg bg-blue-600
                         text-sm sm:text-base
                         text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <button
              onClick={() => window.location.href = "auth/signup"}
              className="px-6 py-3 rounded-lg border border-blue-600
                         text-sm sm:text-base
                         text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="https://img.freepik.com/premium-vector/people-read-search-knowledge-books-internet-concept-flat-illustratiuon_720185-2476.jpg"
            alt="ERP Illustration"
            className="
              w-full
              max-w-[280px]
              sm:max-w-[360px]
              md:max-w-md
              object-contain
            "
          />
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-34">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <h2
            className="text-xl sm:text-3xl md:text-4xl
                       font-extrabold text-center"
          >
            ERP Features
          </h2>

          <p
            className="mt-3 text-center
                       text-xs sm:text-base text-gray-500"
          >
            Everything students and administrators need, in one platform
          </p>

          <div
            className="mt-12 sm:mt-16
                       grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {[
              ["Academic Forms", "Submit and track academic forms online without paperwork."],
              ["Attendance Management", "View real-time attendance and eligibility status."],
              ["Results & Grades", "Secure access to internal marks and semester results."],
              ["Feedback System", "Anonymous student feedback for faculty improvement."],
              ["Notifications", "Instant updates on circulars, deadlines, and announcements."],
              ["Admin Dashboard", "Manage students, approvals, and academic data efficiently."]
            ].map(([title, desc], i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl p-6
                           border border-gray-200
                           hover:shadow-lg hover:-translate-y-1
                           transition-all duration-300"
              >
                <h3 className="text-sm sm:text-lg font-semibold">
                  {title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600">
                  {desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gray-50 text-center px-5 sm:px-6">
        <h2 className="text-xl sm:text-3xl font-bold">
          Start Using the ERP Portal Today
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
          Digitalize academic processes and improve efficiency.
        </p>

        <button
          onClick={() => window.location.href = "auth/login"}
          className="mt-8 px-8 py-4 rounded-lg bg-blue-600
                     text-sm sm:text-base
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
