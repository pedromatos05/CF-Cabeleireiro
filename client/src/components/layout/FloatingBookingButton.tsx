'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { CalendarIcon } from '@/components/ui/icons'

export default function FloatingBookingButton() {
  const pathname = usePathname()

  // Não mostrar na marcação (já se está a marcar) nem na área de conta
  if (pathname?.startsWith('/booking') || pathname?.startsWith('/account')) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <Link
        href="/booking"
        className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-brown-700 px-8 py-3.5 font-semibold text-white shadow-lg ring-1 ring-black/10 transition-colors hover:bg-brown-800"
      >
        <CalendarIcon className="h-5 w-5" />
        Fazer Marcação
      </Link>
    </div>
  )
}
