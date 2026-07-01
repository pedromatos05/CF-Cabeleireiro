'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import MobileMenu from '@/components/layout/MobileMenu'

const links = [
  { href: '/#sobre', label: 'Espaço' },
  { href: '/#marcas', label: 'Produtos' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/trabalhos', label: 'Trabalhos' },
  { href: '/#contacto', label: 'Contactos' },
  { href: '/noivas', label: 'Noivas' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Só na homepage, no topo, o menu fica transparente por cima do hero (escuro).
  const overHero = pathname === '/' && !scrolled

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-colors duration-300 ${
        overHero ? 'border-transparent' : 'border-cream-200/40'
      }`}
    >
      {/* Fundo desfocado numa camada à parte (não envolve os botões) para
          evitar o bug do iOS Safari em que backdrop-filter + position:fixed
          impede o registo de toques nos elementos-filho. */}
      <div
        className={`absolute inset-0 -z-10 bg-white/80 backdrop-blur-sm transition-opacity duration-300 ${
          overHero ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="container relative mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={`font-display text-xl font-bold tracking-tight transition-colors sm:text-2xl ${
            overHero ? 'text-white' : 'text-brown-700'
          }`}
        >
          CF Cabeleireiro
        </Link>

        {/* Navegação — centrada na barra (apenas desktop) */}
        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 gap-5 text-base font-semibold transition-colors md:flex lg:gap-8 ${
            overHero ? 'text-white' : 'text-brown-700'
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={overHero ? 'hover:text-cream-200' : 'hover:text-brown-900'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Menu das três barras (apenas telemóvel) */}
        <MobileMenu links={links} overHero={overHero} />
      </div>
    </header>
  )
}
