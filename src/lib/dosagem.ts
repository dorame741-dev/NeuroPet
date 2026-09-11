import type { Diagnostico, PetProfile } from '../types'

export const SINTOMAS = [
  { id: 'circulos', label: 'Anda em círculos ou fica desorientado de madrugada' },
  { id: 'travado', label: 'Fica travado encarando cantos de parede ou portas' },
  { id: 'nome', label: 'Não responde mais com rapidez ao ouvir o próprio nome' },
  { id: 'necessidades', label: 'Faz necessidades fisiológicas no lugar errado por confusão' },
  { id: 'reconhecer', label: 'Parece não reconhecer o tutor em alguns momentos' },
] as const

export function calcularDiagnostico(pet: PetProfile): Diagnostico {
  const nSintomas = pet.sintomas.length

  let gotasPorDia: number
  if (pet.peso < 8) gotasPorDia = 6
  else if (pet.peso <= 20) gotasPorDia = 14
  else gotasPorDia = 22

  if (nSintomas >= 4) gotasPorDia += 2

  let estagio: Diagnostico['estagio']
  let quedaNAD: number
  if (nSintomas <= 1) {
    estagio = 'Leve'
    quedaNAD = 15 + nSintomas * 8
  } else if (nSintomas <= 3) {
    estagio = 'Moderado'
    quedaNAD = 32 + (nSintomas - 2) * 10
  } else {
    estagio = 'Avançado'
    quedaNAD = 52 + (nSintomas - 4) * 13
  }

  const fatorPeso = Math.max(pet.peso, 1) / 10

  return {
    estagio,
    quedaNAD: Math.min(quedaNAD, 78),
    gotasPorDia,
    ingredientes: {
      oleoMl: Math.round(fatorPeso * 15 * 10) / 10,
      levaduraG: Math.round(fatorPeso * 4 * 10) / 10,
      mirtiloG: Math.round(fatorPeso * 10 * 10) / 10,
      gemas: Math.max(1, Math.round(fatorPeso)),
    },
  }
}
