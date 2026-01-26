'use client'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

interface Props {
  title: string
  description: string
  active?: boolean
  link?: string
}

export default function FeatureCard({
  title,
  description,
  active,
  link,
}: Props) {
  const router = useRouter()

  return (
    <motion.div
      whileHover={{
        y: -8,
        boxShadow: '0px 20px 40px rgba(99,102,241,0.15)',
      }}
      whileTap={{ scale: 0.98 }}
      onClick={() => active && link && router.push(link)}
      className={`p-6 rounded-2xl border cursor-pointer
        transition-all duration-300
        ${active
          ? 'border-indigo-500 bg-indigo-50'
          : 'bg-white border-slate-200 cursor-default'}
      `}
    >
      <h3 className="text-lg font-semibold text-slate-800">
        {title}
      </h3>

      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
        {description}
      </p>

      {!active && (
        <span className="inline-block mt-4 text-xs 
                         bg-slate-100 text-slate-500 
                         px-3 py-1 rounded-full">
          Coming Soon
        </span>
      )}
    </motion.div>
  )
}
