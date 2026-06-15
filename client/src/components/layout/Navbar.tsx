import Link from 'next/link'
import { UserIcon } from '@/components/ui/icons'

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-cream-200/40 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-display text-2xl font-bold tracking-tight text-brown-700">
          CF Cabeleireiro
        </Link>
        <nav className="hidden gap-8 text-base font-semibold text-brown-700 md:flex">
          <Link href="/#sobre" className="hover:text-brown-900">Espaço</Link>
          <Link href="/#servicos" className="hover:text-brown-900">Serviços</Link>
          <Link href="/#contacto" className="hover:text-brown-900">Contactos</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            aria-label="A minha conta"
            title="A minha conta"
            className="flex h-10 w-10 items-center justify-center rounded-full text-brown-500 transition-colors hover:bg-cream-100 hover:text-brown-700"
          >
            <UserIcon className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  )
}
