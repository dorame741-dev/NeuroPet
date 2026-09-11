import { motion } from 'framer-motion'
import { Check, Droplets, Eye, Moon } from 'lucide-react'
import { Card } from '../shared/Card'
import type { DiaDiario } from '../../types'

const PERGUNTAS: { id: keyof DiaDiario; label: string; icon: typeof Droplets }[] = [
  { id: 'gotas', label: 'Pingou as gotas hoje?', icon: Droplets },
  { id: 'dormiuBem', label: 'Dormiu sem chorar/vagar à noite?', icon: Moon },
  { id: 'olharFocado', label: 'Apresentou olhar focado / reconheceu a família?', icon: Eye },
]

export function DailyChecklist({
  hoje,
  respostas,
  onToggle,
}: {
  hoje: string
  respostas: DiaDiario | undefined
  onToggle: (campo: keyof DiaDiario) => void
}) {
  return (
    <Card>
      <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-1">Checklist de Hoje</h2>
      <p className="text-xs text-navy/50 mb-4">{formatarData(hoje)}</p>
      <div className="space-y-2.5">
        {PERGUNTAS.map((p) => {
          const checked = !!respostas?.[p.id]
          const Icon = p.icon
          return (
            <button
              key={p.id}
              onClick={() => onToggle(p.id)}
              className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-colors ${
                checked ? 'bg-emerald/10 border-emerald' : 'bg-white border-border'
              }`}
            >
              <Icon size={18} className={checked ? 'text-emerald' : 'text-navy/30'} />
              <span className={`flex-1 text-sm ${checked ? 'text-navy font-medium' : 'text-navy/70'}`}>{p.label}</span>
              <motion.div
                className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  checked ? 'bg-emerald border-emerald' : 'border-navy/20'
                }`}
                animate={checked ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.25 }}
              >
                {checked && <Check size={12} className="text-white" strokeWidth={3} />}
              </motion.div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}

function formatarData(iso: string) {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}
