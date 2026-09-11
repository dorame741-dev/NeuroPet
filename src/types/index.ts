export interface PetProfile {
  nome: string
  raca: string
  idade: string
  peso: number
  sintomas: string[]
}

export interface ExercicioProgresso {
  concluidoEm: string | null // data ISO (yyyy-mm-dd) da última conclusão
  pontosLucidez: number
}

export type ExerciciosState = Record<string, ExercicioProgresso>

export interface DiaDiario {
  gotas: boolean
  dormiuBem: boolean
  olharFocado: boolean
}

export type DiarioState = Record<string, DiaDiario> // chave = data ISO

export interface NeuroPetState {
  pet: PetProfile
  exercicios: ExerciciosState
  diario: DiarioState
  diarioInicio: string | null // primeira data em que o diário foi aberto
}

export interface Diagnostico {
  estagio: 'Leve' | 'Moderado' | 'Avançado'
  quedaNAD: number // percentual
  gotasPorDia: number
  ingredientes: {
    oleoMl: number
    levaduraG: number
    mirtiloG: number
    gemas: number
  }
}
