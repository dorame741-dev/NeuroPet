import { AnimatePresence, motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const TEXTOS = [
  'Analisando perfil metabólico...',
  'Calculando depleção estimada de NAD+...',
  'Ajustando proporção lipídica da receita...',
]

export function ProcessingOverlay({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setStep((s) => Math.min(s + 1, TEXTOS.length - 1))
    }, 650)
    const done = setTimeout(onDone, 2000)
    return () => {
      clearInterval(stepInterval)
      clearTimeout(done)
    }
  }, [onDone])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-navy px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-6 w-16 h-16 rounded-full border-4 border-emerald/20 border-t-emerald flex items-center justify-center"
      >
        <Sparkles size={22} className="text-emerald" />
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.p
          key={step}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-white/90 text-center text-sm font-medium tracking-wide"
        >
          {TEXTOS[step]}
        </motion.p>
      </AnimatePresence>
    </motion.div>
  )
}
