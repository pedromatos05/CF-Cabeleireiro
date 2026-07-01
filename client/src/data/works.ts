// Portfólio de trabalhos, organizado por tema. Cada tema tem uma foto de capa
// e uma galeria própria (página /trabalhos/<slug>).
//
// ⬇️ COMO ADICIONAR/EDITAR:
// 1. Coloca as fotos em /client/public/images/trabalhos/<slug>/ (ex.: 1.jpg, 2.jpg…).
// 2. Acrescenta/atualiza um objeto no array `workCategories` em baixo.
//    A `cover` é a foto que aparece na grelha principal; `photos` são todas as
//    fotos mostradas na página do tema.

export type WorkCategory = {
  slug: string
  name: string
  cover: string
  photos: string[]
}

export const workCategories: WorkCategory[] = [
  {
    slug: 'balayage',
    name: 'Balayage',
    cover: '/images/trabalhos/balayage/1.jpg',
    photos: ['/images/trabalhos/balayage/1.jpg', '/images/trabalhos/balayage/2.jpg'],
  },
  {
    slug: 'blond-balayage',
    name: 'Blond Balayage',
    cover: '/images/trabalhos/blond-balayage/1.jpg',
    photos: [
      '/images/trabalhos/blond-balayage/1.jpg',
      '/images/trabalhos/blond-balayage/2.jpg',
      '/images/trabalhos/blond-balayage/3.jpg',
    ],
  },
  {
    slug: 'coloracao',
    name: 'Coloração',
    cover: '/images/trabalhos/coloracao/1.jpg',
    photos: ['/images/trabalhos/coloracao/1.jpg', '/images/trabalhos/coloracao/2.jpg'],
  },
  {
    slug: 'hidratacao-botox',
    name: 'Hidratação Botox',
    cover: '/images/trabalhos/hidratacao-botox/1.jpg',
    photos: [
      '/images/trabalhos/hidratacao-botox/1.jpg',
      '/images/trabalhos/hidratacao-botox/2.jpg',
    ],
  },
  {
    slug: 'lisos',
    name: 'Lisos',
    cover: '/images/trabalhos/lisos/1.jpg',
    photos: ['/images/trabalhos/lisos/1.jpg', '/images/trabalhos/lisos/2.jpg'],
  },
  {
    slug: 'noiva',
    name: 'Noiva',
    cover: '/images/trabalhos/noiva/1.jpg',
    photos: [
      '/images/trabalhos/noiva/1.jpg',
      '/images/trabalhos/noiva/2.jpg',
      '/images/trabalhos/noiva/3.jpg',
    ],
  },
  {
    slug: 'penteado',
    name: 'Penteado',
    cover: '/images/trabalhos/penteado/1.jpg',
    photos: ['/images/trabalhos/penteado/1.jpg', '/images/trabalhos/penteado/2.jpg'],
  },
  {
    slug: 'penteado-infantil',
    name: 'Penteado Infantil',
    cover: '/images/trabalhos/penteado-infantil/1.jpg',
    photos: [
      '/images/trabalhos/penteado-infantil/1.jpg',
      '/images/trabalhos/penteado-infantil/2.jpg',
    ],
  },
]

export function getWorkCategory(slug: string): WorkCategory | undefined {
  return workCategories.find((c) => c.slug === slug)
}
