'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cf-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      // Leitura do localStorage só é possível no cliente e depois da hidratação,
      // por isso o setState aqui é intencional (evita mismatch de SSR).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
    } catch {
      // localStorage indisponível — não mostra o banner
    }
  }, [])

  function accept() {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted')
    } catch {
      /* ignora */
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto flex max-w-xl flex-col items-center gap-3 rounded-xl border border-cream-200 bg-white/95 px-4 py-3 text-center shadow-lg shadow-brown-900/10 backdrop-blur-sm sm:flex-row sm:gap-4 sm:text-left">
        <p className="text-xs leading-snug text-brown-600 sm:text-sm">
          Usamos apenas cookies essenciais ao funcionamento do site.{' '}
          <Link
            href="/privacidade"
            className="whitespace-nowrap font-medium text-brown-700 underline underline-offset-2 hover:text-brown-900"
          >
            Saber mais
          </Link>
        </p>
        <button
          onClick={accept}
          className="flex-none rounded-full bg-brown-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brown-800"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
