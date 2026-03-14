'use client'
import { motion } from 'framer-motion'
import { useRouter, usePathname } from 'next/navigation'

const menuItems = [
  { label: 'Dashboard', path: '/admin/dashboard' },
  { label: 'Manage Forms', path: '/admin/forms' },
  { label: 'Students', comingSoon: true },
  { label: 'Faculty', comingSoon: true },
  { label: 'Attendance', comingSoon: true },
  { label: 'Fees & Payments', comingSoon: true },
  { label: 'Reports', comingSoon: true },
]

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <aside className="h-screen w-64 bg-slate-900 text-white fixed left-0 top-0">
      
      {/* SAME HEIGHT AS NAVBAR */}
      <div className="h-16 flex items-center px-6 
                      text-xl font-bold border-b border-slate-700">
        College ERP
      </div>

      <nav className="p-4 space-y-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path

          return (
            <motion.div
              key={index}
              whileHover={{ x: 4 }}
              className={`flex items-center justify-between
                px-4 py-3 rounded-lg cursor-pointer text-sm
                ${isActive ? 'bg-indigo-600' : 'hover:bg-slate-800'}
                ${item.comingSoon && 'opacity-50 cursor-not-allowed'}
              `}
              onClick={() => item.path && !item.comingSoon && router.push(item.path)}
            >
              <span>{item.label}</span>
              {item.comingSoon && (
                <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">
                  Soon
                </span>
              )}
            </motion.div>
          )
        })}
      </nav>
    </aside>
  )
}
