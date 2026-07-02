'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  /** 'up' (padrão) ou 'left' */
  variant?: 'up' | 'left'
}

/**
 * Envolve qualquer conteúdo e anima a sua entrada (fade + subir) quando entra
 * no ecrã. Usa IntersectionObserver, por isso funciona bem em mobile com o
 * scroll por toque. Anima apenas uma vez.
 */
export default function Reveal({ children, delay = 0, className = '', variant = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Se o browser não suportar, mostra logo o conteúdo.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -10% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${variant === 'left' ? 'reveal-left' : ''} ${visible ? 'is-visible' : ''} ${className}`}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
