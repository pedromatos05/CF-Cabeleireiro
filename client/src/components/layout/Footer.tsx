'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { livroReclamacoes } from '@/data/legal'

export default function Footer() {
  const pathname = usePathname()

  // A área de conta ocupa o ecrã todo — sem rodapé
  if (pathname?.startsWith('/account')) return null

  return (
    <footer className="bg-brown-900">
      <div className="container mx-auto px-4 py-5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream-200/80">
          <Link href="/privacidade" className="transition-colors hover:text-cream-100">
            Política de Privacidade
          </Link>
          <span className="hidden text-cream-200/30 sm:inline">·</span>
          <Link href="/termos" className="transition-colors hover:text-cream-100">
            Termos e Condições
          </Link>
          <span className="hidden text-cream-200/30 sm:inline">·</span>
          <a
            href={livroReclamacoes}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-cream-100"
          >
            Livro de Reclamações
          </a>
        </nav>
      </div>
    </footer>
  )
}
