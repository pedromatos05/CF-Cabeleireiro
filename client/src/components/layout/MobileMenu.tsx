'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { MenuIcon, XIcon } from '@/components/ui/icons'

type NavLink = { href: string; label: string }

export default function MobileMenu({
  links,
  overHero = false,
}: {
  links: NavLink[]
  overHero?: boolean
}) {
  const [open, setOpen] = useState(false)

  // Bloqueia o scroll do fundo enquanto o menu está aberto
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="ml-auto md:hidden">
      {/* Botão das três barras */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        className={`relative z-[60] flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
          overHero && !open ? 'text-white hover:bg-white/10' : 'text-brown-700 hover:bg-cream-100'
        }`}
      >
        {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Renderizado fora do header (portal) para o desfoque funcionar */}
      {open &&
        createPortal(
          <div className="fixed inset-x-0 bottom-0 top-16 z-40">
            {/* Fundo escurecido por baixo do painel (clicar fecha) */}
            <button
              type="button"
              aria-label="Fechar menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-brown-900/40"
            />

            {/* Painel compacto com os links */}
            <div className="absolute inset-x-0 top-0 z-10 border-b border-cream-200 bg-cream-50 shadow-xl">
              <nav className="container mx-auto flex flex-col px-6 py-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="border-b border-brown-200/40 py-4 text-center text-base font-semibold text-brown-700 transition-colors last:border-0 hover:text-brown-900"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}
