import Link from 'next/link'
import { livroReclamacoes } from '@/data/legal'

export default function Footer() {
  return (
    <footer className="bg-brown-900">
      <div className="container mx-auto px-4 py-2.5 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-cream-200/80">
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
