// Tendências da estação atual — os looks que a equipa do CF Cabeleireiro elege
// como tendência. Todas as fotos são captadas no nosso salão, em clientes reais.
//
// ⬇️ COMO ATUALIZAR (ex.: mudar de estação):
// 1. Coloca as fotos em /client/public/tendencias/<estacao>/.
// 2. Atualiza `name`, `period`, `intro` e a lista `images` em baixo.
//    As imagens aparecem num carrossel que roda automaticamente.

export type SeasonTrends = {
  name: string
  period: string // época do ano
  intro: string // pequena introdução à estação
  images: string[] // fotos que rodam no carrossel
}

export const currentSeason: SeasonTrends = {
  name: 'Verão',
  period: 'Junho – Setembro',
  intro:
    'Looks práticos e cheios de vida, pensados para o calor — texturas soltas, reflexos solares e fácil manutenção.',
  images: [
    '/tendencias/verao/verao-1.jpg',
    '/tendencias/verao/verao-2.jpg',
    '/tendencias/verao/verao-3.jpg',
    '/tendencias/verao/verao-4.jpg',
    '/tendencias/verao/verao-5.jpg',
    '/tendencias/verao/verao-6.jpg',
  ],
}
