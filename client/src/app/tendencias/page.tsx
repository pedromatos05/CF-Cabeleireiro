import type { Metadata } from 'next'
import { currentSeason } from '@/data/trends'
import SeasonCarousel from '@/components/tendencias/SeasonCarousel'

export const metadata: Metadata = {
  title: 'Tendências',
  description:
    'As tendências da estação no CF Cabeleireiro — os cortes e looks que a nossa equipa elege como tendência, com fotos do nosso salão.',
}

export default function TendenciasPage() {
  return (
    <div className="bg-cream-50">
      {/* Cabeçalho */}
      <header className="border-b border-cream-200 bg-gradient-to-b from-white to-cream-50">
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Inspiração de estação
          </p>
          <h1 className="font-display text-4xl font-bold text-brown-800 sm:text-5xl">Tendências</h1>
          <div className="mx-auto mt-5 h-px w-16 bg-brown-300" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brown-500">
            Em cada estação do ano, a nossa equipa seleciona os cortes e looks que considera
            tendência. Todas as fotos são captadas no nosso salão, em clientes reais, para que veja
            resultados verdadeiros.
          </p>
        </div>
      </header>

      {/* Estação atual */}
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">
            Tendências de <span className="text-brown-500">{currentSeason.name}</span>
          </h2>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-brown-300">
            {currentSeason.period}
          </p>
          <span className="mx-auto mt-4 block h-px w-12 bg-brown-300" />
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brown-500 sm:text-base">
            {currentSeason.intro}
          </p>
        </div>

        <SeasonCarousel images={currentSeason.images} alt={`Tendência ${currentSeason.name}`} />
      </div>
    </div>
  )
}
