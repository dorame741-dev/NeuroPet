export interface IngredienteInfo {
  nome: string
  seguro: boolean
  explicacao: string
}

export const VENENOS_NEURAIS: IngredienteInfo[] = [
  {
    nome: 'BHA (Butil-hidroxianisol)',
    seguro: false,
    explicacao:
      'Conservante sintético associado a estresse oxidativo no tecido nervoso, acelerando o desgaste de neurônios já fragilizados pela idade.',
  },
  {
    nome: 'BHT (Butil-hidroxitolueno)',
    seguro: false,
    explicacao:
      'Primo químico do BHA, usado para prolongar validade da ração. Se acumula no organismo e sobrecarrega o fígado, órgão que ajuda a proteger o cérebro de toxinas.',
  },
  {
    nome: 'Corante Amarelo 5',
    seguro: false,
    explicacao:
      'Corante artificial sem valor nutricional, ligado a reações de hipersensibilidade que pioram processos inflamatórios, incluindo os que afetam a barreira cerebral.',
  },
  {
    nome: 'Corante Vermelho 40',
    seguro: false,
    explicacao:
      'Usado só para deixar a ração com "cara" mais apetitosa aos olhos humanos. Estudos associam corantes azo a maior estresse oxidativo sistêmico.',
  },
  {
    nome: 'Propilenoglicol',
    seguro: false,
    explicacao:
      'Umectante que mantém a ração macia. Em excesso, sobrecarrega o metabolismo hepático e renal do cão idoso, órgãos essenciais para filtrar toxinas antes que cheguem ao cérebro.',
  },
  {
    nome: 'Farinha de Penas / Subprodutos não identificados',
    seguro: false,
    explicacao:
      'Fonte proteica de baixíssima digestibilidade e qualidade inconsistente. Gera mais inflamação sistêmica de baixo grau, um dos fatores associados ao declínio cognitivo canino.',
  },
  {
    nome: 'Excesso de Sódio / Glutamato Monossódico',
    seguro: false,
    explicacao:
      'Em excesso, contribui para desidratação celular e pode interferir na transmissão de sinais elétricos entre neurônios, especialmente em cães com função renal já reduzida pela idade.',
  },
]

export const INGREDIENTES_SEGUROS: IngredienteInfo[] = [
  { nome: 'Óleo de Coco Extra Virgem', seguro: true, explicacao: 'Fonte de TCM, combustível alternativo eficiente para neurônios envelhecidos.' },
  { nome: 'Levedura Nutricional', seguro: true, explicacao: 'Rica em precursores de NAD+ e vitaminas do complexo B.' },
  { nome: 'Mirtilo (Blueberry)', seguro: true, explicacao: 'Antioxidante natural, ajuda a combater o estresse oxidativo cerebral.' },
  { nome: 'Cúrcuma', seguro: true, explicacao: 'Composto anti-inflamatório natural, estudado por seu potencial neuroprotetor.' },
  { nome: 'Gema de Ovo Caipira', seguro: true, explicacao: 'Fonte de fosfatidilcolina, componente estrutural das membranas neuronais.' },
  { nome: 'Salmão / Óleo de Peixe', seguro: true, explicacao: 'Rico em Ômega-3 (DHA), essencial para a saúde da membrana dos neurônios.' },
  { nome: 'Abóbora', seguro: true, explicacao: 'Fibra solúvel de fácil digestão, sem aditivos artificiais.' },
  { nome: 'Frango (peito, sem tempero)', seguro: true, explicacao: 'Proteína magra de alta digestibilidade quando fonte identificada e não ultraprocessada.' },
]

export const BASE_INGREDIENTES = [...VENENOS_NEURAIS, ...INGREDIENTES_SEGUROS]

export function buscarIngrediente(query: string): IngredienteInfo | null {
  const q = query.trim().toLowerCase()
  if (!q) return null
  return (
    BASE_INGREDIENTES.find((i) => i.nome.toLowerCase().includes(q) || q.includes(i.nome.toLowerCase().split(' ')[0])) ??
    null
  )
}
