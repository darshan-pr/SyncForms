'use client'

import { motion } from 'framer-motion'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-800">

      {/* NAVBAR */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="text-xl font-bold text-blue-700">
          Student ERP
        </div>

        <div className="hidden md:flex gap-8 text-sm font-medium">
          <span className="cursor-pointer hover:text-blue-600">Home</span>
          <span className="cursor-pointer hover:text-blue-600">Features</span>
          <span className="cursor-pointer hover:text-blue-600">About</span>
          <span className="cursor-pointer hover:text-blue-600">Contact</span>
        </div>

        <button
          onClick={() => window.location.href = 'auth/login'}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </button>
      </header>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-38 pb-40 grid gap-12 md:grid-cols-2 items-center">
        
        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Smart ERP System for <br />
            <span className="text-blue-600">Modern Education</span>
          </h1>

          <p className="mt-6 text-gray-600 text-base sm:text-lg max-w-lg">
            A centralized student ERP platform designed to manage academic forms,
            attendance, results, feedback, and institutional workflows digitally
            with accuracy and transparency.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => window.location.href = 'auth/login'}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
            >
              Login
            </button>

            <button
              onClick={() => window.location.href = 'auth/signup'}
              className="px-6 py-3 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
            >
              Sign Up
            </button>
          </div>
        </motion.div>

        {/* IMAGE */}
        <motion.img
          src="https://img.freepik.com/premium-vector/people-read-search-knowledge-books-internet-concept-flat-illustratiuon_720185-2476.jpg"
          alt="ERP Illustration"
          className="w-full max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        />
      </section>

      {/* FEATURES */}
      <section className="bg-gradient-to-b from-white to-gray-50 py-28">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-center tracking-tight">
            ERP Features
          </h2>

          <p className="mt-4 text-center text-gray-500 text-sm sm:text-base">
            Everything students and administrators need, in one platform
          </p>

          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
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
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-gray-200
                           hover:shadow-lg hover:-translate-y-1
                           transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800">
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

      {/* WHO IS IT FOR */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">For Students</h3>
            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>✔ Online form submissions</li>
              <li>✔ Attendance & result tracking</li>
              <li>✔ Academic notifications</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold">For Administrators</h3>
            <ul className="mt-4 space-y-2 text-gray-600 text-sm">
              <li>✔ Student data management</li>
              <li>✔ Approval workflows</li>
              <li>✔ Reports & analytics</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold">
          Start Using the ERP Portal Today
        </h2>
        <p className="mt-4 text-gray-600">
          Digitalize academic processes and improve efficiency.
        </p>

        <button
          onClick={() => window.location.href = 'auth/login'}
          className="mt-8 px-8 py-4 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
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
