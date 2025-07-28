'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import Card from '@/components/ui/Card'

interface DashboardCardProps {
  title: string
  children: ReactNode
  action?: ReactNode
  className?: string
}

export default function DashboardCard({ title, children, action, className = '' }: DashboardCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          {action}
        </div>
        {children}
      </Card>
    </motion.div>
  )
}