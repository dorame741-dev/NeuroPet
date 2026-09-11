import { motion } from 'framer-motion'
import { AlertTriangle, CheckCircle2, Search, ShieldAlert } from 'lucide-react'
import { useState } from 'react'
import { Card } from '../shared/Card'
import { buscarIngrediente, VENENOS_NEURAIS } from '../../lib/ingredientes'

export function FoodScanner() {
  const [query, setQuery] = useState('')
  const [buscou, setBuscou] = useState(false)

  const resultado = buscarIngrediente(query)

  return (
    <div className="px-4 pt-4 space-y-4 pb-4">
      <Card>
        <h2 className="text-sm font-bold text-navy/50 uppercase tracking-wide mb-1">Scanner de Ração</h2>
        <p className="text-xs text-navy/50 mb-4">Digite um ingrediente para saber se ele é seguro para o cérebro do seu pet</p>
        <div className="relative">
          <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/40" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setBuscou(e.target.value.trim().length > 0)
            }}
            placeholder="Ex: BHT, corante, mirtilo..."
            className="w-full rounded-xl border border-border bg-white pl-10 pr-4 py-3 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-emerald/40"
          />
        </div>

        {buscou && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-4 rounded-xl p-4 border ${
              resultado
                ? resultado.seguro
                  ? 'bg-emerald/10 border-emerald/30'
                  : 'bg-red-50 border-red-200'
                : 'bg-slatebg border-border'
            }`}
          >
            {resultado ? (
              <div className="flex gap-3">
                {resultado.seguro ? (
                  <CheckCircle2 size={22} className="text-emerald flex-shrink-0" />
                ) : (
                  <AlertTriangle size={22} className="text-red-600 flex-shrink-0" />
                )}
                <div>
                  <p className={`font-bold text-sm ${resultado.seguro ? 'text-emerald-dark' : 'text-red-600'}`}>
                    {resultado.nome} — {resultado.seguro ? 'Seguro' : 'Tóxico / Neurodegenerativo'}
                  </p>
                  <p className="text-xs text-navy/60 mt-1 leading-relaxed">{resultado.explicacao}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-navy/50">Nenhum resultado exato. Tente outro termo, como "corante" ou "levedura".</p>
            )}
          </motion.div>
        )}
      </Card>

      <div className="px-1 flex items-center gap-2">
        <ShieldAlert size={16} className="text-red-600" />
        <h2 className="text-sm font-bold text-navy uppercase tracking-wide">Lista Vermelha dos Venenos Neurais</h2>
      </div>

      {VENENOS_NEURAIS.map((v) => (
        <Card key={v.nome} className="border-red-100">
          <div className="flex gap-3">
            <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-sm text-navy">{v.nome}</p>
              <p className="text-xs text-navy/60 mt-1 leading-relaxed">{v.explicacao}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
