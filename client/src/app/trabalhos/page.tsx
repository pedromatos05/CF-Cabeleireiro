'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

/* -------------------------------------------------------------------------- */
/*  Dados do portfólio                                                         */
/*                                                                            */
/*  ⬇️ EDITA AQUI: para adicionar/remover fotos basta editar os arrays abaixo. */
/*  As imagens vão para /client/public/images/trabalhos/ com estes nomes.      */
/*                                                                            */
/*  TODO (Instagram): no futuro, em vez destes caminhos estáticos, esta lista  */
/*  pode ser preenchida a partir do feed de Instagram do salão. Substituir o   */
/*  array `portfolio` por dados vindos da API do Instagram (mantendo a mesma   */
/*  forma: { category, photos: [{ src, alt }] }) é tudo o que será necessário. */
/* -------------------------------------------------------------------------- */

type PortfolioPhoto = {
  src: string
  alt: string
}

type PortfolioCategory = {
  name: string
  photos: PortfolioPhoto[]
}

const portfolio: PortfolioCategory[] = [
  {
    name: 'Cor',
    photos: [
      { src: '/images/trabalhos/cor-1.jpg', alt: 'Trabalho de coloração 1' },
      { src: '/images/trabalhos/cor-2.jpg', alt: 'Balayage 2' },
      { src: '/images/trabalhos/cor-3.jpg', alt: 'Blond balayage 3' },
      { src: '/images/trabalhos/cor-4.jpg', alt: 'Madeixas 4' },
    ],
  },
  {
    name: 'Cortes',
    photos: [
      { src: '/images/trabalhos/cortes-1.jpg', alt: 'Corte 1' },
      { src: '/images/trabalhos/cortes-2.jpg', alt: 'Corte 2' },
      { src: '/images/trabalhos/cortes-3.jpg', alt: 'Corte 3' },
    ],
  },
  {
    name: 'Penteados',
    photos: [
      { src: '/images/trabalhos/penteados-1.jpg', alt: 'Penteado 1' },
      { src: '/images/trabalhos/penteados-2.jpg', alt: 'Penteado de noiva 2' },
      { src: '/images/trabalhos/penteados-3.jpg', alt: 'Penteado para evento 3' },
    ],
  },
  {
    name: 'Tratamentos',
    photos: [
      { src: '/images/trabalhos/tratamentos-1.jpg', alt: 'Tratamento 1' },
      { src: '/images/trabalhos/tratamentos-2.jpg', alt: 'Tratamento 2' },
    ],
  },
]

/* -------------------------------------------------------------------------- */

type LightboxState = {
  categoryIndex: number
  photoIndex: number
}

export default function TrabalhosPage() {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const showRelative = useCallback((delta: number) => {
    setLightbox((current) => {
      if (!current) return current
      const photos = portfolio[current.categoryIndex].photos
      const nextIndex = (current.photoIndex + delta + photos.length) % photos.length
      return { ...current, photoIndex: nextIndex }
    })
  }, [])

  // Navegação por teclado dentro da categoria
  useEffect(() => {
    if (!lightbox) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowRight') showRelative(1)
      else if (e.key === 'ArrowLeft') showRelative(-1)
    }
    document.addEventListener('keydown', handleKey)
    // Evita scroll do fundo enquanto o lightbox está aberto
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, closeLightbox, showRelative])

  const activePhoto =
    lightbox && portfolio[lightbox.categoryIndex].photos[lightbox.photoIndex]

  return (
    <div className="bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Portfólio
          </p>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">
            Os nossos trabalhos
          </h1>
          <p className="mt-3 text-brown-500">Resultados reais do nosso salão</p>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        {/* Secções por categoria */}
        <div className="mx-auto max-w-7xl space-y-16">
          {portfolio.map((category, categoryIndex) => (
            <section key={category.name}>
              <h2 className="text-center text-lg font-bold uppercase tracking-[0.2em] text-brown-700">
                {category.name}
              </h2>
              <span className="mx-auto mt-2 mb-8 block h-px w-10 bg-brown-300" />

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.photos.map((photo, photoIndex) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setLightbox({ categoryIndex, photoIndex })}
                    className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-cream-100 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-2"
                    aria-label={`Ver ${photo.alt}`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>

      </div>

      {/* Lightbox */}
      {lightbox && activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/80 p-4 backdrop-blur-sm"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.alt}
        >
          {/* Fechar */}
          <button
            type="button"
            onClick={closeLightbox}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {/* Anterior */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showRelative(-1)
            }}
            aria-label="Anterior"
            className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ‹
          </button>

          {/* Imagem */}
          <div
            className="relative h-[80vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {/* Seguinte */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              showRelative(1)
            }}
            aria-label="Seguinte"
            className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20 sm:right-20"
          >
            ›
          </button>
        </div>
      )}
    </div>
  )
}
