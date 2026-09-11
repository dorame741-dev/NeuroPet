import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../shared/Card'
import { BreedSelect } from './BreedSelect'
import { SymptomsChecklist } from './SymptomsChecklist'
import type { PetProfile } from '../../types'

export function CalculatorForm({
  pet,
  onChange,
  onSubmit,
}: {
  pet: PetProfile
  onChange: (pet: PetProfile) => void
  onSubmit: () => void
}) {
  const [erro, setErro] = useState<string | null>(null)

  const toggleSintoma = (id: string) => {
    const has = pet.sintomas.includes(id)
    onChange({ ...pet, sintomas: has ? pet.sintomas.filter((s) => s !== id) : [...pet.sintomas, id] })
  }

  const handleSubmit = () => {
    if (!pet.nome.trim()) {
      setErro('Digite o nome do seu pet para continuar.')
      return
    }
    if (!pet.peso || pet.peso <= 0) {
      setErro('Informe um peso válido.')
      return
    }
    setErro(null)
    onSubmit()
  }

  return (
    <div className="space-y-4 pb-4">
      <Card>
        <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-4">Dados do Pet</h2>

        <label className="block text-xs font-semibold text-navy/60 mb-1.5">Nome do Pet</label>
        <input
          value={pet.nome}
          onChange={(e) => onChange({ ...pet, nome: e.target.value })}
          placeholder="Ex: Thor"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy mb-4 focus:outline-none focus:ring-2 focus:ring-emerald/40"
        />

        <label className="block text-xs font-semibold text-navy/60 mb-1.5">Raça</label>
        <div className="mb-4">
          <BreedSelect value={pet.raca} onChange={(v) => onChange({ ...pet, raca: v })} />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-1">
          <div>
            <label className="block text-xs font-semibold text-navy/60 mb-1.5">Idade (anos)</label>
            <input
              type="number"
              min={0}
              step="0.5"
              value={pet.idade}
              onChange={(e) => onChange({ ...pet, idade: e.target.value })}
              placeholder="Ex: 12"
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-emerald/40"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy/60 mb-1.5">Peso (kg)</label>
            <input
              type="number"
              min={0.5}
              step="0.5"
              value={pet.peso}
              onChange={(e) => onChange({ ...pet, peso: Number(e.target.value) })}
              className="w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-emerald/40"
            />
          </div>
        </div>
        <input
          type="range"
          min={0.5}
          max={60}
          step="0.5"
          value={pet.peso}
          onChange={(e) => onChange({ ...pet, peso: Number(e.target.value) })}
          className="w-full mt-2"
        />
      </Card>

      <Card>
        <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-1">Questionário Rápido</h2>
        <p className="text-xs text-navy/50 mb-4">Marque os sinais que você já percebeu no seu pet</p>
        <SymptomsChecklist selecionados={pet.sintomas} onToggle={toggleSintoma} />
      </Card>

      {erro && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-red-600 font-medium px-1">
          {erro}
        </motion.p>
      )}

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSubmit}
        className="w-full flex items-center justify-center gap-2 bg-navy text-white font-bold text-sm tracking-wide uppercase py-4 rounded-2xl shadow-card"
      >
        <Sparkles size={18} className="text-emerald" />
        Gerar Diagnóstico & Dosagem Exata
      </motion.button>
    </div>
  )
}
