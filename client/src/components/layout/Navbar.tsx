import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-cream-200/40 bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-brown-700">
          CF Cabeleireiro
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-brown-500 md:flex">
          <Link href="/services" className="hover:text-brown-700">Serviços</Link>
          <Link href="/gallery" className="hover:text-brown-700">Galeria</Link>
          <Link href="/about" className="hover:text-brown-700">Sobre</Link>
          <Link href="/contact" className="hover:text-brown-700">Contacto</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="text-sm font-medium text-brown-500 hover:text-brown-700"
          >
            A minha conta
          </Link>
          <Link
            href="/booking"
            className="rounded-lg bg-brown-600 px-4 py-2 text-sm font-medium text-white hover:bg-brown-700"
          >
            Marcar
          </Link>
        </div>
      </div>
    </header>
  )
}
