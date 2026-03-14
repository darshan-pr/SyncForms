'use client'
import { motion } from 'framer-motion'
import Sidebar from '@/components/admin/Sidebar'
import Navbar from '@/components/admin/Navbar'
import FeatureCard from '@/components/admin/FeatureCard'

export default function AdminDashboard() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-64 w-full min-h-screen bg-slate-100">
        <Navbar />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6"
        >
          <h1 className="text-2xl font-bold mb-6 text-slate-800">
            Form Management Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              title="Manage Forms"
              description="Create, edit and manage ERP forms used by students and staff."
              active
              link="/admin/forms"
            />
            <FeatureCard
              title="Student Management"
              description="Centralized student profiles, enrollment and records."
            />
            <FeatureCard
              title="Faculty Management"
              description="Faculty onboarding, roles and academic mapping."
            />
            <FeatureCard
              title="Attendance Tracking"
              description="Daily attendance with reports and analytics."
            />
            <FeatureCard
              title="Fees & Payments"
              description="Fee structure, online payments and reconciliation."
            />
            <FeatureCard
              title="Reports & Analytics"
              description="Institution-wide insights and performance metrics."
            />
          </div>
        </motion.main>
      </div>
    </div>
  )
}
