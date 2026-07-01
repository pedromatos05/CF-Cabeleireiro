'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

type WorkGalleryProps = {
  name: string
  photos: string[]
}

// Galeria de um tema, com lightbox (setas, teclado e clique no fundo para fechar).
export default function WorkGallery({ name, photos }: WorkGalleryProps) {
  const [index, setIndex] = useState<number | null>(null)

  const close = useCallback(() => setIndex(null), [])

  const showRelative = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (current === null) return current
        return (current + delta + photos.length) % photos.length
      })
    },
    [photos.length]
  )

  useEffect(() => {
    if (index === null) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') showRelative(1)
      else if (e.key === 'ArrowLeft') showRelative(-1)
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [index, close, showRelative])

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/5] w-[calc(50%-0.5rem)] overflow-hidden rounded-xl bg-cream-100 shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-2 sm:w-64 lg:w-72"
            aria-label={`Ver ${name} ${i + 1}`}
          >
            <Image
              src={src}
              alt={`${name} ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/80 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={`${name} ${index + 1}`}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {photos.length > 1 && (
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
          )}

          <div className="relative h-[80vh] w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={photos[index]}
              alt={`${name} ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>

          {photos.length > 1 && (
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
          )}
        </div>
      )}
    </>
  )
}
