import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown, Clock, ListChecks } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../shared/Card'
import { todayISO } from '../../hooks/usePersistedState'
import type { Exercicio } from '../../lib/exercicios'
import type { ExercicioProgresso } from '../../types'

const DIFICULDADE_COR: Record<Exercicio['dificuldade'], string> = {
  Iniciante: 'bg-emerald/10 text-emerald-dark',
  Intermediário: 'bg-amber/10 text-amber',
  Avançado: 'bg-red-100 text-red-600',
}

export function ExerciseCard({
  exercicio,
  progresso,
  onConcluir,
}: {
  exercicio: Exercicio
  progresso: ExercicioProgresso | undefined
  onConcluir: () => void
}) {
  const [open, setOpen] = useState(false)
  const concluidoHoje = progresso?.concluidoEm === todayISO()

  return (
    <Card className="overflow-hidden">
      <button onClick={() => setOpen((o) => !o)} className="w-full flex items-start justify-between text-left">
        <div className="flex-1 pr-3">
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${DIFICULDADE_COR[exercicio.dificuldade]}`}>
              {exercicio.dificuldade}
            </span>
            <span className="flex items-center gap-1 text-[11px] text-navy/50 font-medium">
              <Clock size={11} /> {exercicio.tempo}
            </span>
          </div>
          <h3 className="text-base font-bold text-navy">{exercicio.titulo}</h3>
          <p className="text-xs text-navy/50 mt-0.5">{exercicio.descricao}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} className="flex-shrink-0 pt-1">
          <ChevronDown size={18} className="text-navy/40" />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-4 mt-4 border-t border-border">
              <div className="flex items-center gap-1.5 text-xs font-bold text-navy/50 uppercase tracking-wide mb-2">
                <ListChecks size={13} /> Materiais
              </div>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {exercicio.materiais.map((m) => (
                  <span key={m} className="text-xs bg-slatebg text-navy/70 px-2.5 py-1 rounded-full">
                    {m}
                  </span>
                ))}
              </div>

              <ol className="space-y-2 mb-4">
                {exercicio.passos.map((p, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-navy/80">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald/10 text-emerald font-bold text-[11px] flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>

              <motion.button
                whileTap={{ scale: 0.97 }}
                disabled={concluidoHoje}
                onClick={onConcluir}
                className={`w-full flex items-center justify-center gap-2 font-bold text-sm py-3 rounded-xl transition-colors ${
                  concluidoHoje ? 'bg-emerald/10 text-emerald-dark' : 'bg-navy text-white'
                }`}
              >
                <Check size={16} />
                {concluidoHoje ? 'Concluído hoje' : 'Concluir Exercício Hoje (+1 Ponto de Lucidez)'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  )
}
