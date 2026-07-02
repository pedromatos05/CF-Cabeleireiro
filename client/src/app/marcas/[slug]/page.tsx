import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { brands, getBrand } from '@/data/brands'
import { ChevronLeftIcon } from '@/components/ui/icons'

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) return {}
  return {
    title: brand.name,
    description: `${brand.name} (${brand.parent}) — gamas de produtos utilizadas no CF Cabeleireiro.`,
  }
}

const isWideGama = (g: { width?: number; height?: number }) =>
  !!g.width && !!g.height && g.width / g.height > 1.5

// Largura da máscara preta que esconde a etiqueta "PRODUTO:" em cada imagem panorâmica
// (varia porque a posição da etiqueta muda com o nº de produtos).
const PRODUTO_MASK: Record<string, string> = {
  'Dark Oil': '15%',
  'No Breaker': '14%',
  Penetraitt: '23%',
  Hydre: '23%',
  Volupt: '15%',
  Twisted: '24%',
  'Texturizers · Sprays': '15%',
  'Texturizers · Géis & Mousse': '15%',
  'Texturizers · Ceras': '25%',
  Specialists: '24%',
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  const wideGamas = brand.gamas.filter(isWideGama)
  const narrowGamas = brand.gamas.filter((g) => !isWideGama(g))

  return (
    <div className="bg-cream-50">
      {/* Cabeçalho */}
      <header className="border-b border-cream-200 bg-gradient-to-b from-white to-cream-50">
        <div className="container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:gap-10 sm:text-left">
            {/* Logótipo — esquerda */}
            <div className="mt-2 flex h-32 w-32 flex-none items-center justify-center rounded-full border border-cream-200 bg-white p-5 shadow-sm sm:mt-0 sm:h-40 sm:w-40 sm:p-6">
              <Image
                src={brand.logo}
                alt={brand.name}
                width={140}
                height={140}
                className={`h-full w-full object-contain ${brand.imgClass ?? ''}`}
              />
            </div>
            {/* Texto — direita */}
            <div>
              <h1 className="text-2xl font-bold text-brown-800 sm:text-3xl">{brand.name}</h1>
              {brand.parent && (
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-brown-300">
                  Sub-marca da {brand.parent}
                </p>
              )}
              <p
                className="mt-3 max-w-2xl text-sm leading-relaxed text-brown-500 sm:text-base"
                dangerouslySetInnerHTML={{ __html: brand.intro }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Gamas */}
      <div className="container mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-base font-semibold uppercase tracking-[0.25em] text-brown-400 sm:text-lg">
          Gamas de produtos
        </h2>

        {brand.productLayout === 'square3' ? (
          /* System Professional — 3 colunas, cartões quadrados */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {brand.gamas.map((gama) => (
              <div
                key={gama.name}
                className="relative overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition duration-300 ease-out hover:z-10 hover:scale-[1.04] hover:shadow-xl"
              >
                <div className="relative aspect-square w-full bg-cream-100">
                  {gama.image ? (
                    <Image
                      src={gama.image}
                      alt={`Produtos ${brand.name} ${gama.name}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={100}
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center px-4 text-center">
                      <span className="text-sm font-medium uppercase tracking-wider text-brown-300">
                        Foto dos produtos
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-t border-cream-100 px-3 py-2.5 text-center">
                  <span className="mx-auto mb-1.5 block h-px w-6 bg-gradient-to-r from-transparent via-brown-300 to-transparent" />
                  <h3 className="font-display text-sm tracking-wide text-brown-800 sm:text-base">
                    {gama.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Sebastian Professional — panorâmicas a toda a largura; verticais lado a lado */
          <div className="mx-auto max-w-6xl space-y-6">
            {/* Panorâmicas — uma por linha, a encher a largura */}
            {wideGamas.map((gama) => (
              <div
                key={gama.name}
                className="relative overflow-hidden rounded-2xl bg-black pb-5 shadow-sm ring-1 ring-black/5 transition duration-300 ease-out hover:z-10 hover:scale-[1.02] hover:shadow-xl"
              >
                {gama.image ? (
                  <div className="relative aspect-[2912/1139] w-full">
                    <Image
                      src={gama.image}
                      alt={`Produtos ${brand.name} ${gama.name}`}
                      fill
                      sizes="(max-width: 1152px) 100vw, 1152px"
                      quality={95}
                      className="object-cover object-top"
                    />
                    {/* Máscara preta para esconder a etiqueta "PRODUTO:" (fundo preto puro) */}
                    <div
                      className="absolute bottom-0 left-0 z-10 aspect-[5/1] bg-black"
                      style={{ width: PRODUTO_MASK[gama.name] ?? '16%' }}
                      aria-hidden="true"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[2912/1139] w-full items-center justify-center bg-cream-100 px-4 text-center">
                    <span className="text-sm font-medium uppercase tracking-wider text-brown-300">
                      {gama.name}
                    </span>
                  </div>
                )}
              </div>
            ))}

            {/* Verticais — lado a lado (Potion 9 um pouco mais estreita) */}
            {narrowGamas.length > 0 && (
              <div className="flex flex-wrap items-stretch justify-center gap-6">
                {narrowGamas.map((gama) => (
                  <div
                    key={gama.name}
                    className={`relative h-[320px] overflow-hidden rounded-2xl bg-black shadow-sm ring-1 ring-black/5 transition duration-300 ease-out hover:z-10 hover:scale-[1.03] hover:shadow-xl sm:h-[440px] ${
                      gama.name === 'Potion 9' ? '' : 'pb-4 sm:pb-6'
                    }`}
                  >
                    {gama.image && gama.width && gama.height ? (
                      gama.name === 'Shapers' ? (
                        // Shapers tem etiqueta "PRODUTO:" e linha "DETALHES" — cortar em baixo e mascarar
                        <div className="relative h-full aspect-[1488/1214]">
                          <Image
                            src={gama.image}
                            alt={`Produtos ${brand.name} ${gama.name}`}
                            fill
                            sizes="600px"
                            quality={95}
                            className="object-cover object-top"
                          />
                          <div
                            className="absolute bottom-0 left-0 z-10 aspect-[5/1] w-[20%] bg-black"
                            aria-hidden="true"
                          />
                        </div>
                      ) : (
                        <Image
                          src={gama.image}
                          alt={`Produtos ${brand.name} ${gama.name}`}
                          width={gama.width}
                          height={gama.height}
                          sizes="600px"
                          quality={95}
                          className="block h-full w-auto"
                        />
                      )
                    ) : (
                      <div className="flex h-full w-64 items-center justify-center bg-cream-100 px-4 text-center">
                        <span className="text-sm font-medium uppercase tracking-wider text-brown-300">
                          {gama.name}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brown-600 transition-colors hover:text-brown-900"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}
