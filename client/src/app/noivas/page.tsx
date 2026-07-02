import type { Metadata } from 'next'
import PortfolioGallery, { type PortfolioCategory } from '@/components/trabalhos/PortfolioGallery'
import CallButton from '@/components/ui/CallButton'

export const metadata: Metadata = {
  title: 'Noivas',
  description:
    'Penteados e maquilhagem de noiva no CF Cabeleireiro — cuidamos de cada detalhe para o seu grande dia.',
}

// Serviços que o salão faz para casamentos.
const servicos = [
  'Penteado de noiva',
  'Maquilhagem de noiva',
  'Ao domicílio ou no salão',
  'Prova / ensaio prévio',
]

/* -------------------------------------------------------------------------- */
/*  ⬇️ EDITA AQUI: fotos de casamentos em /client/public/noivas/.              */
/* -------------------------------------------------------------------------- */

const noivas: PortfolioCategory[] = [
  {
    // Sem nome: a galeria não mostra cabeçalho (a página já se chama "Noivas").
    name: '',
    photos: [
      { src: '/noivas/1.jpg', alt: 'Penteado de noiva no CF Cabeleireiro' },
      { src: '/noivas/2.jpg', alt: 'Noiva pronta para o grande dia' },
      { src: '/noivas/3.jpg', alt: 'Penteado e maquilhagem de noiva' },
    ],
  },
]

export default function NoivasPage() {
  return (
    <div className="bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            O seu grande dia
          </p>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">Noivas</h1>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        {/* Descrição dos serviços para casamentos */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <p className="leading-relaxed text-brown-500">
            No dia do seu casamento, cuidamos de si do início ao fim. Fazemos penteado e maquilhagem
            de noiva, no nosso salão ou no conforto da sua casa, sempre com uma prova prévia para
            acertarmos cada pormenor consigo.
          </p>
          <ul className="mt-7 flex flex-wrap justify-center gap-3">
            {servicos.map((s) => (
              <li
                key={s}
                className="rounded-full border border-cream-200 bg-white px-4 py-1.5 text-sm font-medium text-brown-700 shadow-sm"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        {/* Galeria de casamentos */}
        <PortfolioGallery categories={noivas} />

        {/* Mais informações / estimativa de preço */}
        <div className="mt-16 text-center">
          <p className="mx-auto mb-6 max-w-xl leading-relaxed text-brown-500">
            Para mais informações e uma estimativa de preço, clique no botão abaixo.
          </p>
          <CallButton />
        </div>
      </div>
    </div>
  )
}
