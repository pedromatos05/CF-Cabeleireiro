import Link from 'next/link'

const links = [
  { href: '/#sobre', label: 'Espaço' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#contacto', label: 'Contactos' },
]

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-cream-200/40 bg-white/80 backdrop-blur-sm">
      <div className="container relative mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-display text-xl font-bold tracking-tight text-brown-700 sm:text-2xl"
        >
          CF Cabeleireiro
        </Link>

        {/* Navegação — centrada na barra (apenas desktop) */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 text-base font-semibold text-brown-700 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brown-900">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
