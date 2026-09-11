import { Zap } from 'lucide-react'
import { useNeuroPet } from '../../context/NeuroPetContext'
import { todayISO } from '../../hooks/usePersistedState'
import { EXERCICIOS } from '../../lib/exercicios'
import { ExerciseCard } from './ExerciseCard'

export function MentalAcademy() {
  const { exercicios, setExercicios } = useNeuroPet()

  const totalPontos = Object.values(exercicios).reduce((acc, e) => acc + (e?.pontosLucidez ?? 0), 0)

  const concluir = (id: string) => {
    setExercicios((prev) => {
      const atual = prev[id]
      if (atual?.concluidoEm === todayISO()) return prev
      return {
        ...prev,
        [id]: {
          concluidoEm: todayISO(),
          pontosLucidez: (atual?.pontosLucidez ?? 0) + 1,
        },
      }
    })
  }

  return (
    <div className="px-4 pt-4 space-y-4 pb-4">
      <div className="flex items-center justify-between bg-navy rounded-2xl px-5 py-4">
        <div>
          <p className="text-white/60 text-xs font-medium">Academia Mental Canina</p>
          <p className="text-white font-bold text-sm">Exercícios de Neuroplasticidade</p>
        </div>
        <div className="flex items-center gap-1.5 bg-emerald/20 px-3 py-1.5 rounded-full">
          <Zap size={15} className="text-emerald" fill="#10B981" />
          <span className="text-emerald font-bold text-sm tabular-nums">{totalPontos}</span>
        </div>
      </div>

      {EXERCICIOS.map((ex) => (
        <ExerciseCard key={ex.id} exercicio={ex} progresso={exercicios[ex.id]} onConcluir={() => concluir(ex.id)} />
      ))}
    </div>
  )
}
