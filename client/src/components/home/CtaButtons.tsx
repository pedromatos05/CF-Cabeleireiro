import Link from 'next/link'
import { ChevronRightIcon } from '@/components/ui/icons'
import CallButton from '@/components/ui/CallButton'

export default function CtaButtons() {
  return (
    <section className="bg-cream-50 py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Esquerda — Ligar para Marcar */}
          <CallButton className="w-full sm:w-auto" />

          {/* Direita — Ver Trabalhos */}
          <Link
            href="/trabalhos"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-brown-700 bg-transparent px-8 py-3 text-sm font-semibold text-brown-700 transition-colors hover:bg-brown-700 hover:text-white sm:w-auto"
          >
            Ver Trabalhos
            <ChevronRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
