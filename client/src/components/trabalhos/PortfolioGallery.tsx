'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

export type PortfolioPhoto = {
  // Sem `src` => mostra um espaço "Foto em breve" (ainda sem foto).
  src?: string
  alt: string
}

export type PortfolioCategory = {
  name: string
  photos: PortfolioPhoto[]
}

type LightboxState = {
  categoryIndex: number
  photoIndex: number
}

const realPhotosOf = (cat: PortfolioCategory) =>
  cat.photos.filter((p): p is PortfolioPhoto & { src: string } => Boolean(p.src))

const tileClass =
  'aspect-[4/5] w-[calc(50%-0.5rem)] overflow-hidden rounded-xl sm:w-[220px] lg:w-[240px]'

export default function PortfolioGallery({ categories }: { categories: PortfolioCategory[] }) {
  const [lightbox, setLightbox] = useState<LightboxState | null>(null)

  const closeLightbox = useCallback(() => setLightbox(null), [])

  const showRelative = useCallback(
    (delta: number) => {
      setLightbox((current) => {
        if (!current) return current
        const photos = realPhotosOf(categories[current.categoryIndex])
        const nextIndex = (current.photoIndex + delta + photos.length) % photos.length
        return { ...current, photoIndex: nextIndex }
      })
    },
    [categories],
  )

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

  const activePhoto = lightbox ? realPhotosOf(categories[lightbox.categoryIndex])[lightbox.photoIndex] : null

  return (
    <>
      <div className="mx-auto max-w-7xl space-y-16">
        {categories.map((category, categoryIndex) => {
          let realCounter = -1
          return (
            <section key={category.name}>
              <h2 className="text-center text-lg font-bold uppercase tracking-[0.2em] text-brown-700">
                {category.name}
              </h2>
              <span className="mx-auto mt-2 mb-8 block h-px w-10 bg-brown-300" />

              {/* Fotos centradas — as linhas incompletas ficam ao centro */}
              <div className="flex flex-wrap justify-center gap-4">
                {category.photos.map((photo, i) => {
                  // Espaço reservado (ainda sem foto)
                  if (!photo.src) {
                    return (
                      <div
                        key={`ph-${i}`}
                        className={`flex items-center justify-center border border-dashed border-cream-200 bg-cream-100 px-4 text-center ${tileClass}`}
                      >
                        <span className="text-sm font-medium uppercase tracking-wider text-brown-300">
                          Foto em breve
                        </span>
                      </div>
                    )
                  }

                  realCounter += 1
                  const photoIndex = realCounter
                  return (
                    <button
                      key={photo.src}
                      type="button"
                      onClick={() => setLightbox({ categoryIndex, photoIndex })}
                      className={`relative bg-cream-100 shadow-sm transition duration-300 ease-out hover:z-10 hover:scale-[1.04] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-2 ${tileClass}`}
                      aria-label={`Ver ${photo.alt}`}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 50vw, 240px"
                        className="object-cover"
                      />
                    </button>
                  )
                })}
              </div>
            </section>
          )
        })}
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
          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
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
    </>
  )
}
