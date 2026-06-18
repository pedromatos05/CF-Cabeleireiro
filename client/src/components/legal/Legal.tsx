import type { ReactNode } from 'react'
import Link from 'next/link'
import { ChevronLeftIcon } from '@/components/ui/icons'

export function LegalPage({
  title,
  lastUpdated,
  children,
}: {
  title: string
  lastUpdated: string
  children: ReactNode
}) {
  return (
    <div className="bg-cream-50">
      {/* Cabeçalho */}
      <header className="border-b border-cream-200 bg-gradient-to-b from-white to-cream-50">
        <div className="container mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Informação legal
          </p>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">{title}</h1>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
          <p className="mt-4 text-sm text-brown-400">Última atualização: {lastUpdated}</p>
        </div>
      </header>

      {/* Conteúdo */}
      <div className="container mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="divide-y divide-cream-100 rounded-3xl border border-cream-200 bg-white p-6 shadow-sm sm:p-10">
          {children}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brown-600 transition-colors hover:text-brown-900"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  )
}

export function LegalSection({
  n,
  title,
  children,
}: {
  n: number
  title: string
  children: ReactNode
}) {
  return (
    <section className="py-6 first:pt-0 last:pb-0">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-cream-100 text-sm font-semibold text-brown-600 ring-1 ring-cream-200">
          {n}
        </span>
        <h2 className="text-lg font-semibold text-brown-800 sm:text-xl">{title}</h2>
      </div>
      <div className="space-y-3 pl-10 leading-relaxed text-brown-600">{children}</div>
    </section>
  )
}
