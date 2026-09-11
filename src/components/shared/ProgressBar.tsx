import { motion } from 'framer-motion'

export function ProgressBar({
  percent,
  color = '#10B981',
  label,
}: {
  percent: number
  color?: string
  label?: string
}) {
  return (
    <div>
      {label && <div className="flex justify-between text-xs font-medium text-navy/60 mb-1">{label}</div>}
      <div className="h-3 w-full bg-slatebg rounded-full overflow-hidden border border-border">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, percent))}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}
