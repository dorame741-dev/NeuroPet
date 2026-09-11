import { motion } from 'framer-motion'
import { Check, Flame } from 'lucide-react'
import { Card } from '../shared/Card'
import { pontuacaoDia } from '../../lib/diario'
import type { DiarioState } from '../../types'

const DIAS_SEMANA = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

function diaDaSemana(iso: string) {
  return new Date(iso + 'T00:00:00').getDay()
}

export function CalendarGrid({ dias, diario, hoje }: { dias: string[]; diario: DiarioState; hoje: string }) {
  const diasCompletos = dias.filter((d) => d <= hoje && pontuacaoDia(diario, d) === 3).length
  const diasPassados = dias.filter((d) => d <= hoje).length
  const progresso = diasPassados > 0 ? Math.round((diasCompletos / 30) * 100) : 0

  const offsetInicio = diaDaSemana(dias[0])
  const celulasVazias = Array.from({ length: offsetInicio })

  return (
    <Card>
      <div className="flex items-center justify-between mb-1">
        <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide">Jornada de 30 Dias</h2>
        <div className="flex items-center gap-1 text-xs font-bold text-amber">
          <Flame size={14} fill="#F59E0B" />
          {diasCompletos}
        </div>
      </div>
      <p className="text-xs text-navy/40 mb-4">{diasCompletos} de 30 dias completos · {progresso}%</p>

      <div className="grid grid-cols-7 gap-1.5 mb-2">
        {DIAS_SEMANA.map((d, i) => (
          <div key={i} className="text-center text-[10px] font-bold text-navy/30">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {celulasVazias.map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {dias.map((data, i) => {
          const pontos = pontuacaoDia(diario, data)
          const isFuture = data > hoje
          const isHoje = data === hoje
          const completo = !isFuture && pontos === 3
          const parcial = !isFuture && pontos > 0 && pontos < 3

          return (
            <motion.div
              key={data}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: Math.min(i * 0.012, 0.3), duration: 0.25 }}
              title={data}
              className="relative"
            >
              <div
                className={`aspect-square rounded-xl flex items-center justify-center text-[11px] font-bold transition-colors ${
                  completo
                    ? 'bg-gradient-to-br from-emerald to-emerald-dark text-white shadow-sm shadow-emerald/30'
                    : parcial
                    ? 'bg-emerald/15 text-emerald-dark border border-emerald/30'
                    : isFuture
                    ? 'bg-transparent text-navy/20 border border-dashed border-border'
                    : 'bg-slatebg text-navy/35 border border-border'
                } ${isHoje ? 'ring-2 ring-amber ring-offset-1 ring-offset-white' : ''}`}
              >
                {completo ? <Check size={14} strokeWidth={3} /> : i + 1}
              </div>
            </motion.div>
          )
        })}
      </div>

      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border text-[11px] text-navy/50">
        <LegendaItem cor="bg-gradient-to-br from-emerald to-emerald-dark" label="Completo" />
        <LegendaItem cor="bg-emerald/15 border border-emerald/30" label="Parcial" />
        <LegendaItem cor="bg-slatebg border border-border" label="Sem registro" />
      </div>
    </Card>
  )
}

function LegendaItem({ cor, label }: { cor: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-md ${cor}`} />
      {label}
    </div>
  )
}
