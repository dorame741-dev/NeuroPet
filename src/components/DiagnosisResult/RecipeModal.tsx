import { Modal } from '../shared/Modal'
import type { Diagnostico, PetProfile } from '../../types'

export function RecipeModal({
  open,
  onClose,
  diagnostico,
  pet,
}: {
  open: boolean
  onClose: () => void
  diagnostico: Diagnostico
  pet: PetProfile
}) {
  const { ingredientes } = diagnostico

  const passos = [
    `Separe ${ingredientes.oleoMl} ml de óleo de coco extra virgem (ou TCM) e derreta em banho-maria em fogo baixo.`,
    `Misture ${ingredientes.levaduraG} g de levedura nutricional ao óleo morno, mexendo até dissolver completamente.`,
    `Amasse ${ingredientes.mirtiloG} g de mirtilo (ou amora) com uma pitada de cúrcuma até formar uma polpa homogênea.`,
    `Incorpore ${ingredientes.gemas} gema(s) de ovo caipira à mistura, batendo bem até emulsionar.`,
    'Despeje em um recipiente de vidro pequeno com tampa e leve à geladeira por 20 minutos até firmar levemente.',
    `Administre a dose diária de ${diagnostico.gotasPorDia} gotas junto à primeira refeição de ${pet.nome || 'seu pet'}.`,
  ]

  return (
    <Modal open={open} onClose={onClose} title="Preparo em 3 Minutos">
      <ol className="space-y-3 mb-5">
        {passos.map((p, i) => (
          <li key={i} className="flex gap-3 text-sm text-navy/80 leading-relaxed">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald/10 text-emerald font-bold text-xs flex items-center justify-center">
              {i + 1}
            </span>
            <span className="pt-0.5">{p}</span>
          </li>
        ))}
      </ol>
      <div className="bg-amber/10 border border-amber/30 rounded-xl p-3.5">
        <p className="text-xs text-navy/70 leading-relaxed">
          <strong className="text-amber font-bold">Conservação:</strong> guarde sempre em geladeira, em pote fechado,
          por até 5 dias. Agite levemente antes de cada uso, já que os ingredientes naturais podem decantar.
        </p>
      </div>
    </Modal>
  )
}
