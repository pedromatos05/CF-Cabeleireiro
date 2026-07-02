'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import MobileMenu from '@/components/layout/MobileMenu'

const links = [
  { href: '/#sobre', label: 'Espaço' },
  { href: '/#marcas', label: 'Produtos' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#contacto', label: 'Contactos' },
  { href: '/noivas', label: 'Noivas' },
]

export default function Navbar() {
  const pathname = usePathname()
  // A barra transparente no topo só faz sentido na homepage, que tem a hero
  // escura por trás. Nas restantes páginas (fundo claro) mostra-se sempre a
  // barra branca para os links continuarem legíveis.
  const hasHero = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    if (!hasHero) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hasHero])

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? 'border-b border-cream-200/40' : 'border-b border-transparent'
      }`}
    >
      {/* Fundo desfocado numa camada à parte (não envolve os botões) para
          evitar o bug do iOS Safari em que backdrop-filter + position:fixed
          impede o registo de toques nos elementos-filho. A barra branca só
          aparece depois de fazer scroll; no topo fica transparente. */}
      <div
        className={`absolute inset-0 -z-10 bg-white/80 backdrop-blur-sm transition-opacity duration-300 ${
          scrolled || mobileMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <div className="container relative mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label="CF Cabeleireiro — início" className="flex items-center md:ml-12 lg:ml-20">
          <Image
            src="/logo-cf.png"
            alt="CF Cabeleireiro"
            width={292}
            height={189}
            priority
            className={`relative top-px left-px h-8 w-auto transition-all duration-300 sm:h-10 ${
              scrolled || mobileMenuOpen ? '' : 'brightness-0 invert drop-shadow'
            }`}
          />
        </Link>

        {/* Navegação — centrada na barra (apenas desktop) */}
        <nav
          className={`absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 text-base font-medium transition-colors md:flex ${
            scrolled || mobileMenuOpen ? 'text-brown-700' : 'text-white drop-shadow'
          }`}
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative py-1 transition-colors ${
                scrolled || mobileMenuOpen
                  ? 'hover:text-brown-900'
                  : 'hover:text-cream-200'
              }`}
            >
              {link.label}
              {/* Sublinhado animado que cresce do centro ao passar o rato */}
              <span className="absolute -bottom-0.5 left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 ease-out group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Menu das três barras (apenas telemóvel) */}
        <MobileMenu links={links} scrolled={scrolled} onToggle={setMobileMenuOpen} />
      </div>
    </header>
  )
}
