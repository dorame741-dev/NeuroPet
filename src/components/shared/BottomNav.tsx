import { motion } from 'framer-motion'
import { BookHeart, Brain, ScanSearch, Stethoscope } from 'lucide-react'
import type { Tab } from '../../App'

const ITEMS: { id: Tab; label: string; icon: typeof Stethoscope }[] = [
  { id: 'diagnostico', label: 'Diagnóstico', icon: Stethoscope },
  { id: 'academia', label: 'Exercícios', icon: Brain },
  { id: 'scanner', label: 'Scanner', icon: ScanSearch },
  { id: 'diario', label: 'Diário', icon: BookHeart },
]

export function BottomNav({ active, onChange }: { active: Tab; onChange: (tab: Tab) => void }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border safe-bottom">
      <div className="max-w-md mx-auto grid grid-cols-4">
        {ITEMS.map((item) => {
          const isActive = active === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className="relative flex flex-col items-center gap-1 py-2.5"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute top-0 h-0.5 w-8 rounded-full bg-emerald"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={22} strokeWidth={2.2} className={isActive ? 'text-emerald' : 'text-navy/40'} />
              <span className={`text-[10px] font-semibold ${isActive ? 'text-emerald' : 'text-navy/40'}`}>
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
