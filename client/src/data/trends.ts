// Tendências por estação do ano — cortes/looks que a equipa considera tendência.
// As fotos são tiradas pela própria equipa do CF Cabeleireiro.
//
// ⬇️ COMO ADICIONAR UM LOOK A UMA ESTAÇÃO:
// 1. Coloca a foto em /client/public/tendencias/ (cria a pasta se não existir).
// 2. Adiciona um objeto ao array `looks` da estação:
//      { name: 'Nome do corte', description: 'Breve descrição', image: '/tendencias/foto.jpg', width: 1080, height: 1350 }
// 3. `width`/`height` são as dimensões reais da foto (para manter a proporção certa).
//    Enquanto não houver foto, aparece um espaço com "Foto em breve".

export type TrendLook = {
  name: string
  description?: string
  image?: string
  width?: number
  height?: number
}

export type Season = {
  slug: 'primavera' | 'verao' | 'outono' | 'inverno'
  name: string
  period: string // época do ano
  intro: string // pequena introdução à estação
  looks: TrendLook[]
}

export const seasons: Season[] = [
  {
    slug: 'primavera',
    name: 'Primavera',
    period: 'Março a Maio',
    intro:
      'Cortes leves e luminosos que acompanham a renovação da estação — frescura, movimento e tons naturais.',
    looks: [],
  },
  {
    slug: 'verao',
    name: 'Verão',
    period: 'Junho a Setembro',
    intro:
      'Com o calor, o cabelo pede leveza. No verão apostamos em cortes soltos e cores iluminadas pelo sol, fáceis de cuidar mesmo nos dias de praia.',
    looks: [
      {
        name: 'Ondas Naturais',
        description: 'Ondas soltas com efeito praia, cheias de movimento.',
        image: '/tendencias/verao/1.jpg',
        width: 4000,
        height: 5000,
      },
      {
        name: 'Efeito Molhado',
        description: 'Wet look penteado para trás, fresco e sofisticado.',
        image: '/tendencias/verao/2.jpg',
        width: 3701,
        height: 4626,
      },
      {
        name: 'Ondas Suaves',
        description: 'Ondas amplas e brilhantes, modeladas ao detalhe.',
        image: '/tendencias/verao/3.jpg',
        width: 4000,
        height: 5000,
      },
      {
        name: 'Morena Iluminada',
        description: 'Cabelo escuro com ondas leves e reflexos de sol.',
        image: '/tendencias/verao/4.jpg',
        width: 3069,
        height: 3836,
      },
      {
        name: 'Loiro de Verão',
        description: 'Loiro liso iluminado, com aquele brilho de estação.',
        image: '/tendencias/verao/5.jpg',
        width: 3752,
        height: 4690,
      },
      {
        name: 'Ondas de Praia',
        description: 'Ondas descontraídas com risca ao meio, leveza total.',
        image: '/tendencias/verao/6.jpg',
        width: 3752,
        height: 4690,
      },
    ],
  },
  {
    slug: 'outono',
    name: 'Outono',
    period: 'Setembro a Dezembro',
    intro:
      'Tons quentes e cortes elegantes que marcam o regresso à rotina — sofisticação e profundidade de cor.',
    looks: [],
  },
  {
    slug: 'inverno',
    name: 'Inverno',
    period: 'Dezembro a Março',
    intro:
      'Cortes intemporais e cuidados intensos para proteger o cabelo do frio — brilho, definição e elegância.',
    looks: [],
  },
]
