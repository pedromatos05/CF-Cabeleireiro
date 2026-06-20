import type { Metadata } from 'next'
import Image from 'next/image'
import { seasons } from '@/data/trends'

export const metadata: Metadata = {
  title: 'Tendências',
  description:
    'As tendências de cada estação do ano no CF Cabeleireiro — os cortes e looks que a nossa equipa elege como tendência, com fotos do nosso salão.',
}

// Nº de espaços a mostrar quando uma estação ainda não tem fotos.
const PLACEHOLDERS = 3

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

      {/* Estações */}
      <div className="container mx-auto max-w-6xl space-y-20 px-4 py-16 sm:px-6 lg:px-8">
        {seasons.map((season) => (
          <section key={season.slug} id={season.slug} className="scroll-mt-24">
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl font-bold text-brown-800 sm:text-4xl">
                Tendências de <span className="text-brown-500">{season.name}</span>
              </h2>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-brown-300">
                {season.period}
              </p>
              <span className="mx-auto mt-4 block h-px w-12 bg-brown-300" />
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brown-500 sm:text-base">
                {season.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {season.looks.length > 0
                ? season.looks.map((look) => (
                    <article
                      key={look.name}
                      className="group overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[4/5] w-full bg-cream-100">
                        {look.image ? (
                          <Image
                            src={look.image}
                            alt={`${look.name} — tendência ${season.name}`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            quality={90}
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center px-4 text-center">
                            <span className="text-sm font-medium uppercase tracking-wider text-brown-300">
                              Foto em breve
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="border-t border-cream-100 px-4 py-4 text-center">
                        <h3 className="font-display text-base text-brown-800 sm:text-lg">
                          {look.name}
                        </h3>
                        {look.description && (
                          <p className="mt-1.5 text-sm leading-relaxed text-brown-500">
                            {look.description}
                          </p>
                        )}
                      </div>
                    </article>
                  ))
                : Array.from({ length: PLACEHOLDERS }).map((_, i) => (
                    <div
                      key={i}
                      className="overflow-hidden rounded-2xl border border-dashed border-cream-200 bg-white/60"
                    >
                      <div className="flex aspect-[4/5] w-full items-center justify-center bg-cream-100 px-4 text-center">
                        <span className="text-sm font-medium uppercase tracking-wider text-brown-300">
                          Foto em breve
                        </span>
                      </div>
                    </div>
                  ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
