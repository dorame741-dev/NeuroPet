import { ChevronDown } from 'lucide-react'
import { useMemo, useState } from 'react'
import { RACAS } from '../../lib/racas'

export function BreedSelect({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)

  const filtradas = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return RACAS
    return RACAS.filter((r) => r.toLowerCase().includes(q))
  }, [query])

  return (
    <div className="relative">
      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            onChange(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder="Digite ou selecione a raça"
          className="w-full rounded-xl border border-border bg-white px-4 py-3 pr-10 text-sm text-navy focus:outline-none focus:ring-2 focus:ring-emerald/40"
        />
        <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 pointer-events-none" />
      </div>
      {open && filtradas.length > 0 && (
        <div className="absolute z-20 mt-1 w-full max-h-52 overflow-y-auto rounded-xl border border-border bg-white shadow-card">
          {filtradas.map((r) => (
            <button
              key={r}
              type="button"
              onMouseDown={() => {
                setQuery(r)
                onChange(r)
                setOpen(false)
              }}
              className="w-full text-left px-4 py-2.5 text-sm text-navy hover:bg-slatebg"
            >
              {r}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
