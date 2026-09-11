export interface Exercicio {
  id: string
  titulo: string
  dificuldade: 'Iniciante' | 'Intermediário' | 'Avançado'
  tempo: string
  materiais: string[]
  passos: string[]
  descricao: string
}

export const EXERCICIOS: Exercicio[] = [
  {
    id: 'pano-enrolado',
    titulo: 'O Desafio do Pano Enrolado',
    dificuldade: 'Iniciante',
    tempo: '3 min',
    descricao: 'Estimulação olfativa para reativar o córtex frontal através da busca por recompensas escondidas.',
    materiais: ['1 pano ou toalha de mão', 'Petiscos pequenos'],
    passos: [
      'Espalhe 4 a 6 petiscos pequenos sobre o pano.',
      'Enrole o pano como um rocambole, prendendo os petiscos dentro das dobras.',
      'Apresente o rolo ao cão e incentive-o a desenrolar com o focinho e as patas.',
      'Elogie verbalmente cada petisco encontrado para reforçar positivamente.',
    ],
  },
  {
    id: 'labirinto-ovos',
    titulo: 'O Labirinto da Caixa de Ovos',
    dificuldade: 'Intermediário',
    tempo: '4 min',
    descricao: 'Resolução de problemas espaciais para destravar o cão de comportamentos repetitivos como encarar cantos.',
    materiais: ['1 caixa de ovos vazia (cartão)', 'Petiscos pequenos'],
    passos: [
      'Coloque um petisco em metade das cavidades da caixa de ovos.',
      'Feche parcialmente as abas ou deixe aberto para o nível iniciante.',
      'Apresente a caixa e deixe o cão usar o focinho para localizar e retirar os petiscos.',
      'Aumente a dificuldade fechando mais as abas em sessões futuras.',
    ],
  },
  {
    id: 'toque-conexao',
    titulo: 'O Toque de Conexão Neural',
    dificuldade: 'Iniciante',
    tempo: '2 min',
    descricao: 'Ponto de massagem auricular para indução de serotonina e relaxamento noturno, útil antes de dormir.',
    materiais: ['Ambiente calmo', 'Nenhum material adicional'],
    passos: [
      'Sente-se com o cão em um ambiente silencioso e com pouca luz.',
      'Com a ponta dos dedos, faça movimentos circulares suaves na base das orelhas.',
      'Mantenha o toque constante por cerca de 2 minutos, observando sinais de relaxamento.',
      'Encerre com um carinho calmo na cabeça, sem estímulos bruscos em seguida.',
    ],
  },
]
