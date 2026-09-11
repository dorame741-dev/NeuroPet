import React from 'react'

export function Card({
  children,
  className = '',
  accent = false,
}: {
  children: React.ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <div
      className={`bg-white rounded-2xl border border-border shadow-card p-5 ${
        accent ? 'ring-1 ring-emerald/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
