import type { Metadata } from 'next'
import PortfolioGallery, { type PortfolioCategory } from '@/components/trabalhos/PortfolioGallery'

export const metadata: Metadata = {
  title: 'Trabalhos',
  description: 'Portfólio do CF Cabeleireiro — resultados reais de cor, cortes, penteados e tratamentos.',
}

/* -------------------------------------------------------------------------- */
/*  Dados do portfólio                                                         */
/*                                                                            */
/*  ⬇️ EDITA AQUI: cada secção (título) corresponde a uma pasta em            */
/*  /client/public/images/trabalhos/<pasta>/. Para adicionar fotos, coloca-as  */
/*  na pasta respetiva e acrescenta um objeto { src, alt } ao array.           */
/* -------------------------------------------------------------------------- */

const portfolio: PortfolioCategory[] = [
  {
    name: 'Balayage',
    photos: [
      { src: '/images/trabalhos/balayage/1.jpg', alt: 'Balayage' },
      { src: '/images/trabalhos/balayage/2.jpg', alt: 'Balayage' },
    ],
  },
  {
    name: 'Blond Balayage',
    photos: [
      { src: '/images/trabalhos/blond-balayage/1.jpg', alt: 'Blond balayage' },
      { src: '/images/trabalhos/blond-balayage/2.jpg', alt: 'Blond balayage' },
      { src: '/images/trabalhos/blond-balayage/3.jpg', alt: 'Blond balayage' },
    ],
  },
  {
    name: 'Coloração',
    photos: [
      { src: '/images/trabalhos/coloracao/1.jpg', alt: 'Coloração' },
      { src: '/images/trabalhos/coloracao/2.jpg', alt: 'Coloração' },
    ],
  },
  {
    name: 'Hidratação Botox',
    photos: [
      { src: '/images/trabalhos/hidratacao-botox/1.jpg', alt: 'Hidratação botox' },
      { src: '/images/trabalhos/hidratacao-botox/2.jpg', alt: 'Hidratação botox' },
    ],
  },
  {
    name: 'Lisos',
    photos: [
      { src: '/images/trabalhos/lisos/1.jpg', alt: 'Cabelo liso' },
      { src: '/images/trabalhos/lisos/2.jpg', alt: 'Cabelo liso' },
    ],
  },
  {
    name: 'Noiva',
    photos: [
      { src: '/images/trabalhos/noiva/1.jpg', alt: 'Penteado de noiva' },
      { src: '/images/trabalhos/noiva/2.jpg', alt: 'Penteado de noiva' },
      { src: '/images/trabalhos/noiva/3.jpg', alt: 'Penteado de noiva' },
    ],
  },
  {
    name: 'Penteado',
    photos: [
      { src: '/images/trabalhos/penteado/1.jpg', alt: 'Penteado' },
      { src: '/images/trabalhos/penteado/2.jpg', alt: 'Penteado' },
    ],
  },
  {
    name: 'Penteado Infantil',
    photos: [
      { src: '/images/trabalhos/penteado-infantil/1.jpg', alt: 'Penteado infantil' },
      { src: '/images/trabalhos/penteado-infantil/2.jpg', alt: 'Penteado infantil' },
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
