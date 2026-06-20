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
    period: 'Março – Maio',
    intro:
      'Cortes leves e luminosos que acompanham a renovação da estação — frescura, movimento e tons naturais.',
    looks: [],
  },
  {
    slug: 'verao',
    name: 'Verão',
    period: 'Junho – Setembro',
    intro:
      'Looks práticos e cheios de vida, pensados para o calor — texturas soltas, reflexos solares e fácil manutenção.',
    looks: [],
  },
  {
    slug: 'outono',
    name: 'Outono',
    period: 'Setembro – Dezembro',
    intro:
      'Tons quentes e cortes elegantes que marcam o regresso à rotina — sofisticação e profundidade de cor.',
    looks: [],
  },
  {
    slug: 'inverno',
    name: 'Inverno',
    period: 'Dezembro – Março',
    intro:
      'Cortes intemporais e cuidados intensos para proteger o cabelo do frio — brilho, definição e elegância.',
    looks: [],
  },
]
