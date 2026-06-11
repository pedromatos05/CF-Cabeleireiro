import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-cream-200 bg-cream-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-brown-700">CF Cabeleireiro</p>
            <p className="mt-2 text-sm text-brown-400">Salão de cabeleireiro em Braga.</p>
          </div>
          <div>
            <p className="font-semibold text-brown-700">Navegação</p>
            <ul className="mt-3 space-y-2 text-sm text-brown-400">
              <li><Link href="/services" className="hover:text-brown-600">Serviços</Link></li>
              <li><Link href="/gallery" className="hover:text-brown-600">Galeria</Link></li>
              <li><Link href="/about" className="hover:text-brown-600">Sobre</Link></li>
              <li><Link href="/contact" className="hover:text-brown-600">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-brown-700">Conta</p>
            <ul className="mt-3 space-y-2 text-sm text-brown-400">
              <li><Link href="/login" className="hover:text-brown-600">Entrar</Link></li>
              <li><Link href="/account" className="hover:text-brown-600">A minha conta</Link></li>
              <li><Link href="/booking" className="hover:text-brown-600">Marcar consulta</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-brown-300">
          © {new Date().getFullYear()} CF Cabeleireiro. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
