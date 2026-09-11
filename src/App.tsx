import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BottomNav } from './components/shared/BottomNav'
import { DiagnosticoModule } from './components/Calculator/DiagnosticoModule'
import { MentalAcademy } from './components/MentalAcademy/MentalAcademy'
import { FoodScanner } from './components/FoodScanner/FoodScanner'
import { DailyTracker } from './components/DailyTracker/DailyTracker'
import { NeuroPetProvider } from './context/NeuroPetContext'

export type Tab = 'diagnostico' | 'academia' | 'scanner' | 'diario'

const TITULOS: Record<Tab, string> = {
  diagnostico: 'Diagnóstico & Dose',
  academia: 'Academia Mental',
  scanner: 'Scanner de Ração',
  diario: 'Diário de Melhora',
}

function App() {
  const [tab, setTab] = useState<Tab>('diagnostico')

  return (
    <NeuroPetProvider>
      <div className="min-h-screen bg-slatebg flex flex-col max-w-md mx-auto">
        <header className="safe-top sticky top-0 z-30 bg-slatebg/90 backdrop-blur-md px-4 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald flex items-center justify-center">
              <span className="text-white font-extrabold text-sm">N</span>
            </div>
            <div>
              <p className="text-[10px] font-bold text-emerald-dark tracking-widest uppercase">NeuroPet</p>
              <h1 className="text-base font-bold text-navy leading-none">{TITULOS[tab]}</h1>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.18 }}
            >
              {tab === 'diagnostico' && <DiagnosticoModule />}
              {tab === 'academia' && <MentalAcademy />}
              {tab === 'scanner' && <FoodScanner />}
              {tab === 'diario' && <DailyTracker />}
            </motion.div>
          </AnimatePresence>
        </main>

        <BottomNav active={tab} onChange={setTab} />
      </div>
    </NeuroPetProvider>
  )
}

export default App
