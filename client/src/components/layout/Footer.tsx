'use client'

import { usePathname } from 'next/navigation'

export default function Footer() {
  const pathname = usePathname()

  // A área de conta ocupa o ecrã todo — sem rodapé
  if (pathname?.startsWith('/account')) return null

  return (
    <footer className="bg-brown-900">
      <div className="container mx-auto px-4 py-4 text-center sm:px-6 lg:px-8">
        <p className="text-sm font-medium text-cream-200/80">
          © {new Date().getFullYear()}{' '}
          <span className="font-bold text-cream-100 transition-colors hover:text-white">CF Cabeleireiro</span>. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  )
}
