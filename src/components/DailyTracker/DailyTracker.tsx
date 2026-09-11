import { AnimatePresence, motion } from 'framer-motion'
import { PartyPopper } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNeuroPet } from '../../context/NeuroPetContext'
import { todayISO } from '../../hooks/usePersistedState'
import { calcularStreakGotas, gerarGrade30Dias } from '../../lib/diario'
import { CalendarGrid } from './CalendarGrid'
import { Confetti } from './Confetti'
import { DailyChecklist } from './DailyChecklist'
import { LucidityChart } from './LucidityChart'
import type { DiaDiario } from '../../types'

export function DailyTracker() {
  const { pet, diario, setDiario, diarioInicio, setDiarioInicio } = useNeuroPet()
  const hoje = todayISO()
  const [confettiVisivel, setConfettiVisivel] = useState(false)
  const streakCelebrada = useRef(0)

  useEffect(() => {
    if (!diarioInicio) setDiarioInicio(hoje)
  }, [diarioInicio, hoje, setDiarioInicio])

  const inicio = diarioInicio ?? hoje
  const dias = gerarGrade30Dias(inicio)
  const streak = calcularStreakGotas(diario, hoje)

  const toggle = (campo: keyof DiaDiario) => {
    setDiario((prev) => {
      const atual = prev[hoje] ?? { gotas: false, dormiuBem: false, olharFocado: false }
      const novoDia = { ...atual, [campo]: !atual[campo] }
      const novoDiario = { ...prev, [hoje]: novoDia }

      const novoStreak = calcularStreakGotas(novoDiario, hoje)
      if (campo === 'gotas' && novoStreak > 0 && novoStreak % 7 === 0 && streakCelebrada.current !== novoStreak) {
        streakCelebrada.current = novoStreak
        setConfettiVisivel(true)
        setTimeout(() => setConfettiVisivel(false), 1800)
      }

      return novoDiario
    })
  }

  return (
    <div className="px-4 pt-4 space-y-4 pb-4">
      <AnimatePresence>{confettiVisivel && <Confetti />}</AnimatePresence>

      {streak >= 7 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 bg-emerald text-white rounded-2xl px-4 py-3.5"
        >
          <PartyPopper size={20} className="flex-shrink-0" />
          <p className="text-sm font-semibold leading-snug">
            Parabéns! O cérebro de {pet.nome || 'seu pet'} já está há {streak} dias recebendo combustível NAD+ contínuo.
          </p>
        </motion.div>
      )}

      <DailyChecklist hoje={hoje} respostas={diario[hoje]} onToggle={toggle} />
      <LucidityChart dias={dias} diario={diario} nomePet={pet.nome} />
      <CalendarGrid dias={dias} diario={diario} hoje={hoje} />
    </div>
  )
}
