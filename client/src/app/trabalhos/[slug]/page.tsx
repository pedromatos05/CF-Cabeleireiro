import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { workCategories, getWorkCategory } from '@/data/works'
import { ChevronLeftIcon } from '@/components/ui/icons'
import WorkGallery from '@/components/trabalhos/WorkGallery'

export function generateStaticParams() {
  return workCategories.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getWorkCategory(slug)
  if (!category) return {}
  return {
    title: `${category.name} — Trabalhos`,
    description: `Trabalhos de ${category.name} realizados no CF Cabeleireiro — resultados reais do nosso salão.`,
  }
}

export default async function WorkCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getWorkCategory(slug)
  if (!category) notFound()

  return (
    <div className="bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Portfólio
          </p>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">{category.name}</h1>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <div className="mx-auto max-w-7xl">
          <WorkGallery name={category.name} photos={category.photos} />

          <div className="mt-12 text-center">
            <Link
              href="/trabalhos"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brown-600 transition-colors hover:text-brown-900"
            >
              <ChevronLeftIcon className="h-4 w-4" />
              Voltar aos trabalhos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
