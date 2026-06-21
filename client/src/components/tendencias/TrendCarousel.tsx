'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { TrendLook } from '@/data/trends'

// Nº de espaços a mostrar enquanto a estação ainda não tem fotos.
const PLACEHOLDERS = 4
// Velocidade do movimento automático (px por frame; ~60fps). Mais alto = mais rápido.
const SPEED = 0.7

export default function TrendCarousel({
  looks,
  seasonName,
}: {
  looks: TrendLook[]
  seasonName: string
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pausedRef = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hasLooks = looks.length > 0
  const base: (TrendLook | null)[] = hasLooks
    ? looks
    : Array.from({ length: PLACEHOLDERS }, () => null)
  // Duplicamos a lista para o movimento ser contínuo (loop sem saltos).
  const items = [...base, ...base]

  // Movimento automático contínuo
  useEffect(() => {
    const el = trackRef.current
    if (!el) return

    let raf = 0
    const tick = () => {
      if (!pausedRef.current) {
        el.scrollLeft += SPEED
        const half = el.scrollWidth / 2
        if (half > 0 && el.scrollLeft >= half) el.scrollLeft -= half
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Pausa o automático momentaneamente enquanto o utilizador desliza (touch)
  const pauseFor = (ms: number) => {
    pausedRef.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false
    }, ms)
  }

  return (
    <div
      ref={trackRef}
      onTouchStart={() => {
        pausedRef.current = true
      }}
      onTouchEnd={() => pauseFor(4000)}
      className="flex gap-3 overflow-x-auto px-1 pb-4 sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((look, i) => (
        <article
          key={look ? `${look.name}-${i}` : i}
          aria-hidden={i >= base.length}
          className="group w-[42vw] shrink-0 overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm sm:w-[300px]"
        >
          <div className="relative aspect-[4/5] w-full bg-cream-100">
            {look?.image ? (
              <Image
                src={look.image}
                alt={`${look.name} — tendência ${seasonName}`}
                fill
                sizes="(max-width: 640px) 80vw, 300px"
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
          {look && (
            <div className="border-t border-cream-100 px-4 py-4 text-center">
              <h3 className="font-display text-base text-brown-800 sm:text-lg">{look.name}</h3>
              {look.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-brown-500">{look.description}</p>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
