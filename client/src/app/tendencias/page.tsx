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
    /* Ocupa exatamente o ecrã abaixo da navbar (o <main> já tem pt-16),
       sem scroll vertical */
    <div className="flex h-[calc(100vh-4rem)] flex-col overflow-hidden">
      {/* Cabeçalho compacto */}
      <header className="shrink-0 border-b border-cream-200 bg-gradient-to-b from-white to-cream-50">
        <div className="container mx-auto max-w-3xl px-4 py-4 text-center sm:py-5 sm:px-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Inspiração de estação
          </p>
          <h1 className="font-display text-2xl font-bold text-brown-800 sm:text-3xl">
            Tendências de <span className="text-brown-500">{season.name}</span>
          </h1>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-brown-300">
            {season.period}
          </p>
          <div className="mx-auto mt-3 h-px w-10 bg-brown-300" />
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-brown-500">
            {season.intro}
          </p>
        </div>
      </header>

      {/* Carrossel preenche o espaço restante */}
      <div className="flex min-h-0 flex-1 items-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6">
        <TrendCarousel looks={season.looks} seasonName={season.name} />
      </div>
    </div>
  )
}
