import type { DiarioState } from '../types'

export function addDias(dataISO: string, dias: number): string {
  const d = new Date(dataISO + 'T00:00:00')
  d.setDate(d.getDate() + dias)
  return d.toISOString().slice(0, 10)
}

export function gerarGrade30Dias(inicio: string): string[] {
  return Array.from({ length: 30 }, (_, i) => addDias(inicio, i))
}

export function pontuacaoDia(diario: DiarioState, data: string): number {
  const dia = diario[data]
  if (!dia) return 0
  return [dia.gotas, dia.dormiuBem, dia.olharFocado].filter(Boolean).length
}

export function calcularStreakGotas(diario: DiarioState, hojeISO: string): number {
  let streak = 0
  let cursor = hojeISO
  while (diario[cursor]?.gotas) {
    streak += 1
    cursor = addDias(cursor, -1)
  }
  return streak
}
