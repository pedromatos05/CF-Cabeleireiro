import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { seasons, type Season } from '@/data/trends'
import TrendCarousel from '@/components/tendencias/TrendCarousel'

// ⬇️ EDITA AQUI: estação a mostrar de momento ('primavera' | 'verao' | 'outono' | 'inverno')
const CURRENT_SEASON: Season['slug'] = 'verao'

export const metadata: Metadata = {
  title: 'Tendências',
  description:
    'As tendências da estação no CF Cabeleireiro — os cortes e looks que a nossa equipa elege como tendência, com fotos do nosso salão.',
}

export default function TendenciasPage() {
  const season = seasons.find((s) => s.slug === CURRENT_SEASON)
  if (!season) notFound()

  return (
    <div className="bg-cream-50">
      {/* Cabeçalho */}
      <header className="border-b border-cream-200 bg-gradient-to-b from-white to-cream-50">
        <div className="container mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Inspiração de estação
          </p>
          <h1 className="font-display text-4xl font-bold text-brown-800 sm:text-5xl">
            Tendências de <span className="text-brown-500">{season.name}</span>
          </h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.25em] text-brown-300">
            {season.period}
          </p>
          <div className="mx-auto mt-5 h-px w-16 bg-brown-300" />
          <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-brown-500">{season.intro}</p>
        </div>
      </header>

      {/* Carrossel — uma linha */}
      <div className="container mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <TrendCarousel looks={season.looks} seasonName={season.name} />
      </div>
    </div>
  )
}
