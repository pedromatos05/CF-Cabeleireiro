import type { ReactNode } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import { ScissorsIcon, UserIcon, CalendarIcon, ClockIcon } from '@/components/ui/icons'
import type { Booking } from './BookingForm'

const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
]

function formatDate(d: Date) {
  return `${d.getDate()} de ${MONTHS[d.getMonth()]} de ${d.getFullYear()}`
}

export default function BookingSummary({
  booking,
  onBack,
}: {
  booking: Booking
  onBack: () => void
}) {
  function handleConfirm() {
    // TODO(Supabase): guardar o pedido de marcação e notificar a profissional escolhida.
  }

  const professional = booking.staff || 'a profissional escolhida'

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-brown-800">Pedido de marcação</h2>
      <p className="mb-6 text-sm text-brown-400">
        Reveja os detalhes antes de enviar o seu pedido.
      </p>

      <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm">
        <Row
          icon={<ScissorsIcon className="h-5 w-5" />}
          label={booking.services.length > 1 ? 'Serviços' : 'Serviço'}
          value={booking.services.length > 0 ? booking.services : null}
        />
        <Row icon={<UserIcon className="h-5 w-5" />} label="Profissional" value={booking.staff} />
        <Row
          icon={<CalendarIcon className="h-5 w-5" />}
          label="Data"
          value={booking.date ? formatDate(booking.date) : null}
        />
        <Row icon={<ClockIcon className="h-5 w-5" />} label="Hora" value={booking.time} />
      </div>

      {/* Aviso: isto é um pedido, sujeito a aceitação */}
      <div className="mt-5 rounded-2xl border border-cream-200 bg-cream-50 p-5">
        <p className="text-sm leading-relaxed text-brown-600">
          Este é um <span className="font-semibold text-brown-800">pedido de marcação</span>. O
          pedido será <span className="font-semibold text-brown-800">aceite ou recusado</span> por{' '}
          <span className="font-semibold text-brown-800">{professional}</span>, a quem o serviço foi
          pedido. Receberá em breve a resposta por <span className="font-semibold text-brown-800">email</span>{' '}
          ou na sua <span className="font-semibold text-brown-800">área de cliente</span> no site.
        </p>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={handleConfirm}>Enviar pedido</Button>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-brown-400">
        Ao enviar o pedido, os seus dados serão tratados de acordo com a nossa{' '}
        <Link href="/privacidade" className="underline hover:text-brown-600">
          Política de Privacidade
        </Link>
        .
      </p>
    </div>
  )
}

function Row({
  icon,
  label,
  value,
}: {
  icon: ReactNode
  label: string
  value: string | string[] | null
}) {
  const isList = Array.isArray(value)
  return (
    <div className="flex items-center gap-4 border-b border-cream-100 px-5 py-4 last:border-0">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream-100 text-brown-500 ring-1 ring-cream-200">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brown-300">{label}</p>
        {isList ? (
          <ul className="mt-0.5 space-y-0.5">
            {(value as string[]).map((v) => (
              <li key={v} className="font-medium text-brown-800">
                {v}
              </li>
            ))}
          </ul>
        ) : (
          <p className={`mt-0.5 font-medium ${value ? 'text-brown-800' : 'italic text-brown-300'}`}>
            {value || '—'}
          </p>
        )}
      </div>
    </div>
  )
}
