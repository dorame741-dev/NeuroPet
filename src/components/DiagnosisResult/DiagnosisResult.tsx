import { motion } from 'framer-motion'
import { Droplets, ChefHat, Clock, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../shared/Card'
import { ProgressBar } from '../shared/ProgressBar'
import { RecipeModal } from './RecipeModal'
import type { Diagnostico, PetProfile } from '../../types'

const ESTAGIO_COR: Record<Diagnostico['estagio'], string> = {
  Leve: '#10B981',
  Moderado: '#F59E0B',
  Avançado: '#DC2626',
}

export function DiagnosisResult({
  pet,
  diagnostico,
  onRefazer,
}: {
  pet: PetProfile
  diagnostico: Diagnostico
  onRefazer: () => void
}) {
  const [recipeOpen, setRecipeOpen] = useState(false)
  const { ingredientes } = diagnostico

  return (
    <div className="space-y-4 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-1"
      >
        <div>
          <p className="text-xs text-navy/50 font-medium">Relatório de</p>
          <h2 className="text-lg font-bold text-navy">{pet.nome || 'seu pet'}</h2>
        </div>
        <button
          onClick={onRefazer}
          className="flex items-center gap-1.5 text-xs font-semibold text-navy/50 bg-slatebg px-3 py-2 rounded-full"
        >
          <RotateCcw size={13} /> Refazer
        </button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold text-navy/50 uppercase tracking-wide">Nível de Apagão Cerebral</h3>
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
              style={{ background: ESTAGIO_COR[diagnostico.estagio] }}
            >
              Estágio {diagnostico.estagio === 'Leve' ? '1' : diagnostico.estagio === 'Moderado' ? '2' : '3'} · {diagnostico.estagio}
            </span>
          </div>
          <ProgressBar
            percent={diagnostico.quedaNAD}
            color={ESTAGIO_COR[diagnostico.estagio]}
            label={`-${diagnostico.quedaNAD}% de Combustível Neural (NAD+)`}
          />
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card accent className="text-center">
          <h3 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-3">Dosagem Milimétrica do Elixir</h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Droplets size={34} className="text-emerald" strokeWidth={2.2} />
            <span className="text-5xl font-extrabold text-navy tabular-nums">{diagnostico.gotasPorDia}</span>
          </div>
          <p className="text-sm font-bold text-emerald-dark mb-3">GOTAS POR DIA</p>
          <div className="flex items-center justify-center gap-1.5 text-xs text-navy/60 bg-slatebg rounded-full py-2 px-3 mx-auto w-fit">
            <Clock size={13} />
            Administrar junto à primeira refeição matinal
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Card>
          <h3 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-4">Receita Caseira do Elixir</h3>
          <ul className="space-y-2.5 mb-4">
            <IngredienteLinha label="Óleo de Coco Extra Virgem (TCM)" valor={`${ingredientes.oleoMl} ml`} />
            <IngredienteLinha label="Levedura Nutricional" valor={`${ingredientes.levaduraG} g`} />
            <IngredienteLinha label="Mirtilo com Cúrcuma" valor={`${ingredientes.mirtiloG} g`} />
            <IngredienteLinha label="Gema de Ovo Caipira" valor={`${ingredientes.gemas} un.`} />
          </ul>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setRecipeOpen(true)}
            className="w-full flex items-center justify-center gap-2 bg-emerald text-white font-bold text-sm py-3.5 rounded-xl"
          >
            <ChefHat size={17} />
            Ver Passo a Passo de Preparo em 3 Minutos
          </motion.button>
        </Card>
      </motion.div>

      <RecipeModal open={recipeOpen} onClose={() => setRecipeOpen(false)} diagnostico={diagnostico} pet={pet} />
    </div>
  )
}

function IngredienteLinha({ label, valor }: { label: string; valor: string }) {
  return (
    <li className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <span className="text-sm text-navy/70">{label}</span>
      <span className="text-sm font-bold text-navy">{valor}</span>
    </li>
  )
}
