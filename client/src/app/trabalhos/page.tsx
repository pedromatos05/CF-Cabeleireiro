import type { Metadata } from 'next'
import PortfolioGallery, { type PortfolioCategory } from '@/components/trabalhos/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Trabalhos',
  description: 'Portfólio do CF Cabeleireiro — resultados reais de cor, cortes, penteados e tratamentos.',
}

/* -------------------------------------------------------------------------- */
/*  Dados do portfólio                                                         */
/*                                                                            */
/*  ⬇️ EDITA AQUI: para adicionar/remover fotos basta editar os arrays abaixo. */
/*  As imagens vão para /client/public/images/trabalhos/ com estes nomes.      */
/*                                                                            */
/*  NOTA: enquanto a foto não estiver em /public/images/trabalhos/, deixa o    */
/*  `src` comentado — assim aparece o espaço "Foto em breve" em vez de uma     */
/*  imagem partida. Quando adicionares a foto, descomenta o `src` respetivo.   */
/* -------------------------------------------------------------------------- */

const portfolio: PortfolioCategory[] = [
  {
    name: 'Cor',
    photos: [
      { /* src: '/images/trabalhos/cor-1.jpg', */ alt: 'Trabalho de coloração 1' },
      { /* src: '/images/trabalhos/cor-2.jpg', */ alt: 'Balayage 2' },
      { /* src: '/images/trabalhos/cor-3.jpg', */ alt: 'Blond balayage 3' },
      { /* src: '/images/trabalhos/cor-4.jpg', */ alt: 'Madeixas 4' },
    ],
  },
  {
    name: 'Cortes',
    photos: [
      { /* src: '/images/trabalhos/cortes-1.jpg', */ alt: 'Corte 1' },
      { /* src: '/images/trabalhos/cortes-2.jpg', */ alt: 'Corte 2' },
      { /* src: '/images/trabalhos/cortes-3.jpg', */ alt: 'Corte 3' },
    ],
  },
  {
    name: 'Penteados',
    photos: [
      { /* src: '/images/trabalhos/penteados-1.jpg', */ alt: 'Penteado 1' },
      { /* src: '/images/trabalhos/penteados-3.jpg', */ alt: 'Penteado para evento 3' },
    ],
  },
  {
    name: 'Tratamentos',
    photos: [
      { /* src: '/images/trabalhos/tratamentos-1.jpg', */ alt: 'Tratamento 1' },
      { /* src: '/images/trabalhos/tratamentos-2.jpg', */ alt: 'Tratamento 2' },
    ],
  },
]

/* -------------------------------------------------------------------------- */

export default function TrabalhosPage() {
  return (
    <div className="bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Portfólio
          </p>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">Os nossos trabalhos</h1>
          <p className="mt-3 text-brown-500">Resultados reais do nosso salão</p>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <PortfolioGallery categories={portfolio} />
      </div>
    </div>
  )
}
