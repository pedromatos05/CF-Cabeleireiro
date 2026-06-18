'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'cf-cookie-consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
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
    <div className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-cream-200 bg-white/95 p-5 shadow-xl shadow-brown-900/10 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-brown-600">
          Utilizamos cookies essenciais ao funcionamento do site. Ao continuar, aceita a nossa{' '}
          <Link href="/privacidade" className="font-medium text-brown-700 underline hover:text-brown-900">
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          onClick={accept}
          className="flex-none rounded-full bg-brown-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brown-800"
        >
          Aceitar
        </button>
      </div>
    </div>
  )
}
