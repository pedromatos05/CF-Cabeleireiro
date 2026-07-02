'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import type { TrendLook } from '@/data/trends'

const PLACEHOLDERS = 4
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
  const items = [...base, ...base]

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

  const pauseFor = (ms: number) => {
    pausedRef.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => { pausedRef.current = false }, ms)
  }

  return (
    /* h-full: preenche o espaço que o pai lhe der */
    <div
      ref={trackRef}
      onTouchStart={() => { pausedRef.current = true }}
      onTouchEnd={() => pauseFor(4000)}
      className="flex h-full w-full gap-3 overflow-x-auto sm:gap-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {items.map((look, i) => (
        <article
          key={look ? `${look.name}-${i}` : i}
          aria-hidden={i >= base.length}
          /* h-full + flex-col para a imagem ocupar o espaço restante */
          className="group flex h-full w-[42vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm sm:w-[260px]"
        >
          {/* Imagem — flex-1 + min-h-0 para crescer sem transbordar */}
          <div className="relative min-h-0 flex-1 bg-cream-100">
            {look?.image ? (
              <Image
                src={look.image}
                alt={`${look.name} — tendência ${seasonName}`}
                fill
                sizes="(max-width: 640px) 80vw, 260px"
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

          {/* Legenda — altura fixa, não cresce */}
          {look && (
            <div className="shrink-0 border-t border-cream-100 px-4 py-3 text-center">
              <h3 className="font-display text-sm text-brown-800 sm:text-base">{look.name}</h3>
              {look.description && (
                <p className="mt-1 text-xs leading-relaxed text-brown-500 sm:text-sm">
                  {look.description}
                </p>
              )}
            </div>
          )}
        </article>
      ))}
    </div>
  )
}
