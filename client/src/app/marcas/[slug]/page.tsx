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

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = getBrand(slug)
  if (!brand) notFound()

  return (
    <div className="bg-cream-50">
      {/* Cabeçalho */}
      <header className="border-b border-cream-200 bg-gradient-to-b from-white to-cream-50">
        <div className="container mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full border border-cream-200 bg-white p-6 shadow-sm sm:h-36 sm:w-36">
            <Image
              src={brand.logo}
              alt={brand.name}
              width={140}
              height={140}
              className={`h-full w-full object-contain ${brand.imgClass ?? ''}`}
            />
          </div>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">{brand.name}</h1>
          {brand.parent && (
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.25em] text-brown-300">
              Sub-marca da {brand.parent}
            </p>
          )}
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-brown-500">{brand.intro}</p>
        </div>
      </header>

      {/* Gamas */}
      <div className="container mx-auto max-w-5xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.25em] text-brown-400">
          Gamas de produtos
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {brand.gamas.map((gama) => (
            <div
              key={gama.name}
              className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-square w-full bg-cream-100">
                {gama.image ? (
                  <Image
                    src={gama.image}
                    alt={`Produtos ${brand.name} ${gama.name}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              <div className="p-4 text-center">
                <h3 className="font-bold text-brown-800">{gama.name}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/#servicos"
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
