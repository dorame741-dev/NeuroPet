import { Card } from '../shared/Card'
import { pontuacaoDia } from '../../lib/diario'
import type { DiarioState } from '../../types'

export function LucidityChart({ dias, diario, nomePet }: { dias: string[]; diario: DiarioState; nomePet: string }) {
  const W = 300
  const H = 100
  const pad = 8
  const pontos = dias.map((d) => pontuacaoDia(diario, d))
  const max = 3

  const coords = pontos.map((p, i) => {
    const x = pad + (i / (dias.length - 1)) * (W - pad * 2)
    const y = H - pad - (p / max) * (H - pad * 2)
    return `${x},${y}`
  })

  const path = coords.join(' ')
  const areaPath = `${pad},${H - pad} ${path} ${W - pad},${H - pad}`

  return (
    <Card>
      <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-1">
        Curva de Lucidez de {nomePet || 'seu pet'}
      </h2>
      <p className="text-xs text-navy/50 mb-4">Pontuação diária (0 a 3) ao longo dos 30 dias</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-28">
        <polygon points={areaPath} fill="#10B981" fillOpacity={0.12} />
        <polyline points={path} fill="none" stroke="#10B981" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {coords.map((c, i) => {
          const [x, y] = c.split(',')
          return <circle key={i} cx={x} cy={y} r={pontos[i] > 0 ? 2.2 : 0} fill="#059669" />
        })}
      </svg>
    </Card>
  )
}
