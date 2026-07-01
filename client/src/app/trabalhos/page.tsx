import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { workCategories } from '@/data/works'

export const metadata: Metadata = {
  title: 'Trabalhos',
  description:
    'O portfólio do CF Cabeleireiro — balayage, coloração, penteados de noiva, tratamentos e muito mais. Resultados reais do nosso salão.',
}

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
          <p className="mt-3 text-brown-500">Escolha um tema para ver mais resultados reais</p>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        {/* Grelha de temas — cada capa abre a galeria do tema */}
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {workCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/trabalhos/${category.slug}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-100 shadow-sm transition-shadow hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-2"
            >
              <Image
                src={category.cover}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
              {/* Gradiente + título */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-brown-900/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                <h2 className="font-display text-lg text-white drop-shadow-sm sm:text-xl">
                  {category.name}
                </h2>
                <span className="mt-1 inline-block text-xs font-medium uppercase tracking-[0.2em] text-cream-100/90">
                  Ver fotos
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
