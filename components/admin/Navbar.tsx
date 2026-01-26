'use client'
import { motion } from 'framer-motion'
import {logoutAdminAccount} from '@/lib/authService'
import React from 'react'
import { useState } from 'react'


export default function Navbar() {
    const [isloding, setIsloding] = useState(false);

    async function handleLogout() {
    try {
        await logoutAdminAccount()
        setIsloding(true);
        window.location.href = '/auth/admin-login'
    } catch (err) {
        alert('Logout failed. Please try again.')
    }
}
    
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="h-16 bg-white border-b border-slate-200 
                 flex items-center justify-between px-6
                 sticky top-0 z-40"
    >
      <h2 className="text-lg font-semibold text-slate-800">
        Admin Dashboard
      </h2>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-red-500 hover:bg-red-600 
                   text-white px-4 py-2 rounded-lg text-sm font-medium"
      >

        <span onClick={handleLogout}>
          {isloding ? 'Logging out...' : 'Logout'}
        </span>

      </motion.button>
    </motion.header>
  )
}
