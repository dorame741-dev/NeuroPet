import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { SINTOMAS } from '../../lib/dosagem'

export function SymptomsChecklist({
  selecionados,
  onToggle,
}: {
  selecionados: string[]
  onToggle: (id: string) => void
}) {
  return (
    <div className="space-y-2.5">
      {SINTOMAS.map((s) => {
        const checked = selecionados.includes(s.id)
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => onToggle(s.id)}
            className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-colors ${
              checked ? 'bg-emerald/10 border-emerald' : 'bg-white border-border'
            }`}
          >
            <motion.div
              className={`flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center ${
                checked ? 'bg-emerald border-emerald' : 'border-navy/20'
              }`}
              animate={checked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 0.25 }}
            >
              {checked && <Check size={14} className="text-white" strokeWidth={3} />}
            </motion.div>
            <span className={`text-sm leading-snug ${checked ? 'text-navy font-medium' : 'text-navy/70'}`}>
              {s.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
