import React, { createContext, useContext } from 'react'
import { usePersistedState } from '../hooks/usePersistedState'
import type { DiarioState, ExerciciosState, NeuroPetState, PetProfile } from '../types'

const DEFAULT_PET: PetProfile = {
  nome: '',
  raca: '',
  idade: '',
  peso: 10,
  sintomas: [],
}

const DEFAULT_STATE: NeuroPetState = {
  pet: DEFAULT_PET,
  exercicios: {},
  diario: {},
  diarioInicio: null,
}

interface NeuroPetContextValue {
  pet: PetProfile
  setPet: (pet: PetProfile) => void
  exercicios: ExerciciosState
  setExercicios: (updater: ExerciciosState | ((prev: ExerciciosState) => ExerciciosState)) => void
  diario: DiarioState
  setDiario: (updater: DiarioState | ((prev: DiarioState) => DiarioState)) => void
  diarioInicio: string | null
  setDiarioInicio: (data: string) => void
  diagnosticoGerado: boolean
  setDiagnosticoGerado: (v: boolean) => void
}

const NeuroPetContext = createContext<NeuroPetContextValue | null>(null)

export function NeuroPetProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = usePersistedState<NeuroPetState>('neuropet_state', DEFAULT_STATE)
  const [diagnosticoGerado, setDiagnosticoGerado] = usePersistedState<boolean>('neuropet_diagnostico_gerado', false)

  const setPet = (pet: PetProfile) => setState((prev) => ({ ...prev, pet }))

  const setExercicios = (updater: ExerciciosState | ((prev: ExerciciosState) => ExerciciosState)) =>
    setState((prev) => ({
      ...prev,
      exercicios: typeof updater === 'function' ? (updater as (p: ExerciciosState) => ExerciciosState)(prev.exercicios) : updater,
    }))

  const setDiario = (updater: DiarioState | ((prev: DiarioState) => DiarioState)) =>
    setState((prev) => ({
      ...prev,
      diario: typeof updater === 'function' ? (updater as (p: DiarioState) => DiarioState)(prev.diario) : updater,
    }))

  const setDiarioInicio = (data: string) => setState((prev) => (prev.diarioInicio ? prev : { ...prev, diarioInicio: data }))

  return (
    <NeuroPetContext.Provider
      value={{
        pet: state.pet,
        setPet,
        exercicios: state.exercicios,
        setExercicios,
        diario: state.diario,
        setDiario,
        diarioInicio: state.diarioInicio,
        setDiarioInicio,
        diagnosticoGerado,
        setDiagnosticoGerado,
      }}
    >
      {children}
    </NeuroPetContext.Provider>
  )
}

export function useNeuroPet() {
  const ctx = useContext(NeuroPetContext)
  if (!ctx) throw new Error('useNeuroPet deve ser usado dentro de NeuroPetProvider')
  return ctx
}
