import type { ReactNode } from 'react'
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
    // TODO(Supabase): guardar a marcação na base de dados e enviar a confirmação.
  }

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-brown-800">Confirmação</h2>
      <p className="mb-6 text-sm text-brown-400">
        Reveja os detalhes antes de confirmar a sua marcação.
      </p>

      <div className="overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-sm">
        <Row icon={<ScissorsIcon className="h-5 w-5" />} label="Serviço" value={booking.service} />
        <Row icon={<UserIcon className="h-5 w-5" />} label="Profissional" value={booking.staff} />
        <Row
          icon={<CalendarIcon className="h-5 w-5" />}
          label="Data"
          value={booking.date ? formatDate(booking.date) : null}
        />
        <Row icon={<ClockIcon className="h-5 w-5" />} label="Hora" value={booking.time} />
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={handleConfirm}>Confirmar marcação</Button>
      </div>
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
  value: string | null
}) {
  return (
    <div className="flex items-center gap-4 border-b border-cream-100 px-5 py-4 last:border-0">
      <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-cream-100 text-brown-500 ring-1 ring-cream-200">
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brown-300">{label}</p>
        <p className={`mt-0.5 font-medium ${value ? 'text-brown-800' : 'italic text-brown-300'}`}>
          {value || '—'}
        </p>
      </div>
    </div>
  )
}
