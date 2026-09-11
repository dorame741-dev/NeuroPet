import { AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useNeuroPet } from '../../context/NeuroPetContext'
import { calcularDiagnostico } from '../../lib/dosagem'
import { DiagnosisResult } from '../DiagnosisResult/DiagnosisResult'
import { CalculatorForm } from './CalculatorForm'
import { ProcessingOverlay } from './ProcessingOverlay'

type ViewState = 'form' | 'processing' | 'result'

export function DiagnosticoModule() {
  const { pet, setPet, diagnosticoGerado, setDiagnosticoGerado } = useNeuroPet()
  const [view, setView] = useState<ViewState>(diagnosticoGerado ? 'result' : 'form')

  const diagnostico = useMemo(() => calcularDiagnostico(pet), [pet])

  return (
    <div className="px-4 pt-4">
      {view === 'form' && (
        <CalculatorForm pet={pet} onChange={setPet} onSubmit={() => setView('processing')} />
      )}

      {view === 'result' && (
        <DiagnosisResult
          pet={pet}
          diagnostico={diagnostico}
          onRefazer={() => {
            setDiagnosticoGerado(false)
            setView('form')
          }}
        />
      )}

      <AnimatePresence>
        {view === 'processing' && (
          <ProcessingOverlay
            onDone={() => {
              setDiagnosticoGerado(true)
              setView('result')
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
