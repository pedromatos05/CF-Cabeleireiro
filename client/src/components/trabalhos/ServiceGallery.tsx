'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

export type ServicePhoto = {
  src: string
  alt: string
}

export type Service = {
  name: string
  // A 1ª foto do array é a capa; as restantes aparecem ao clicar na capa.
  photos: ServicePhoto[]
}

export default function ServiceGallery({ services }: { services: Service[] }) {
  // Índice do serviço aberto no lightbox (null = fechado) + foto ativa.
  const [openService, setOpenService] = useState<number | null>(null)
  const [photoIndex, setPhotoIndex] = useState(0)

  const close = useCallback(() => setOpenService(null), [])

  const showRelative = useCallback(
    (delta: number) => {
      setPhotoIndex((current) => {
        if (openService === null) return current
        const total = services[openService].photos.length
        return (current + delta + total) % total
      })
    },
    [openService, services],
  )

  const openAt = (serviceIndex: number) => {
    setOpenService(serviceIndex)
    setPhotoIndex(0)
  }

  // Navegação por teclado e bloqueio do scroll de fundo
  useEffect(() => {
    if (openService === null) return
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
  }, [openService, close, showRelative])

  const active = openService !== null ? services[openService] : null
  const activePhoto = active ? active.photos[photoIndex] : null

  return (
    <>
      {/* Grelha de capas — uma por serviço */}
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {services.map((service, serviceIndex) => {
          const cover = service.photos[0]
          const extra = service.photos.length - 1
          return (
            <button
              key={service.name}
              type="button"
              onClick={() => openAt(serviceIndex)}
              className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-cream-100 shadow-sm transition duration-300 ease-out hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-2"
              aria-label={`Ver fotos de ${service.name}`}
            >
              <Image
                src={cover.src}
                alt={cover.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradiente para o nome ficar legível */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-900/70 via-brown-900/10 to-transparent" />

              {/* Contador de fotos extra (só quando há mais do que a capa) */}
              {extra > 0 && (
                <span className="absolute right-2 top-2 rounded-full bg-white/85 px-2 py-0.5 text-xs font-semibold text-brown-700 shadow-sm">
                  +{extra}
                </span>
              )}

              {/* Nome do serviço */}
              <span className="absolute inset-x-0 bottom-0 p-3 text-center text-sm font-bold uppercase tracking-wider text-white drop-shadow sm:text-base">
                {service.name}
              </span>
            </button>
          )
        })}
      </div>

      {/* Lightbox — navega pelas fotos do serviço aberto */}
      {active && activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/80 p-4 backdrop-blur-sm"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          {/* Fechar */}
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
          >
            ✕
          </button>

          {/* Anterior — só quando o serviço tem mais do que uma foto */}
          {active.photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showRelative(-1)
              }}
              aria-label="Anterior"
              className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
            >
              ‹
            </button>
          )}

          {/* Imagem + legenda + miniaturas das restantes fotos */}
          <div
            className="relative flex h-[85vh] w-full max-w-4xl flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full flex-1">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </div>

            <p className="mt-3 shrink-0 text-sm font-medium uppercase tracking-wider text-white/90">
              {active.name}
              {active.photos.length > 1 && (
                <span className="ml-2 text-white/60">
                  {photoIndex + 1} / {active.photos.length}
                </span>
              )}
            </p>

            {/* Tira de miniaturas — todas as fotos do serviço, clicáveis */}
            {active.photos.length > 1 && (
              <div className="mt-3 flex shrink-0 justify-center gap-2">
                {active.photos.map((photo, i) => (
                  <button
                    key={photo.src}
                    type="button"
                    onClick={() => setPhotoIndex(i)}
                    aria-label={`Ver foto ${i + 1}`}
                    aria-current={i === photoIndex}
                    className={`relative h-16 w-14 overflow-hidden rounded-md transition sm:h-20 sm:w-16 ${
                      i === photoIndex
                        ? 'ring-2 ring-white'
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image src={photo.src} alt={photo.alt} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Seguinte */}
          {active.photos.length > 1 && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                showRelative(1)
              }}
              aria-label="Seguinte"
              className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-2xl text-white transition-colors hover:bg-white/20"
            >
              ›
            </button>
          )}
        </div>
      )}
    </>
  )
}
