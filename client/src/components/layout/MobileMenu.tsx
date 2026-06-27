'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'

type NavLink = { href: string; label: string }

export default function MobileMenu({
  links,
  scrolled = true,
  onToggle,
}: {
  links: NavLink[]
  scrolled?: boolean
  onToggle?: (isOpen: boolean) => void
}) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  function setMenu(next: boolean) {
    setOpen(next)
    onToggle?.(next)
  }

  // Bloqueia o scroll do fundo enquanto o menu está aberto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <div className="ml-auto md:hidden">
      {/* Botão ☰ / ✕ — fica sempre acima do painel do portal (z-[60]) */}
      <button
        type="button"
        onClick={() => setMenu(!open)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        className={`relative z-[60] flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
          open || scrolled
            ? 'text-brown-700 hover:bg-cream-100'
            : 'text-white drop-shadow hover:bg-white/20'
        }`}
      >
        {/* Ícone hambúrguer animado */}
        <div className="relative h-5 w-5">
          <span className={`absolute block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'}`} />
          <span className={`absolute top-1/2 block h-0.5 w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`absolute block h-0.5 w-full rounded-full bg-current transition-all duration-300 ${open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'}`} />
        </div>
      </button>

      {/* Portal: renderizado em document.body para não interferir com o z-index
          do header — assim o header (z-50) fica sempre acima do painel (z-40) */}
      {mounted && open &&
        createPortal(
          <div className="fixed inset-0 z-40">
            {/* Fundo escurecido — clicar fecha */}
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setMenu(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-brown-900/40"
            />
            {/* Painel com os links — começa abaixo do header (pt-16) */}
            <div className="absolute inset-x-0 top-0 z-10 border-b border-cream-200 bg-cream-50 pt-16 shadow-xl">
              <nav className="container mx-auto flex flex-col px-6 py-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenu(false)}
                    className="border-b border-brown-200/40 py-4 text-center text-base font-semibold text-brown-700 transition-colors last:border-0 hover:text-brown-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>,
          document.body,
        )
      }
    </div>
  )
}
