import { Card } from '../shared/Card'
import { pontuacaoDia } from '../../lib/diario'
import type { DiarioState } from '../../types'

export function CalendarGrid({ dias, diario, hoje }: { dias: string[]; diario: DiarioState; hoje: string }) {
  return (
    <Card>
      <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-4">Jornada de 30 Dias</h2>
      <div className="grid grid-cols-6 gap-2">
        {dias.map((data, i) => {
          const pontos = pontuacaoDia(diario, data)
          const isFuture = data > hoje
          const isHoje = data === hoje
          return (
            <div
              key={data}
              className={`aspect-square rounded-lg flex items-center justify-center text-[11px] font-bold relative ${
                isFuture
                  ? 'bg-slatebg text-navy/25'
                  : pontos === 3
                  ? 'bg-emerald text-white'
                  : pontos > 0
                  ? 'bg-emerald/25 text-emerald-dark'
                  : 'bg-border/60 text-navy/40'
              } ${isHoje ? 'ring-2 ring-amber' : ''}`}
              title={data}
            >
              {i + 1}
            </div>
          )
        })}
      </div>
      <div className="flex items-center gap-4 mt-4 text-[11px] text-navy/50">
        <LegendaItem cor="bg-emerald" label="Completo" />
        <LegendaItem cor="bg-emerald/25" label="Parcial" />
        <LegendaItem cor="bg-border/60" label="Sem registro" />
      </div>
    </Card>
  )
}

function LegendaItem({ cor, label }: { cor: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`w-2.5 h-2.5 rounded-sm ${cor}`} />
      {label}
    </div>
  )
}
