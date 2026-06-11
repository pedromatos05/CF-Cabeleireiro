import type { Booking } from '@/types'
import Badge from '@/components/ui/Badge'
import { formatDate, formatTime } from '@/lib/utils'

interface ClientHistoryProps {
  bookings: Booking[]
}

const statusVariant: Record<Booking['status'], 'warning' | 'success' | 'danger' | 'default'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'danger',
  completed: 'default',
}

const statusLabel: Record<Booking['status'], string> = {
  pending: 'Pendente',
  confirmed: 'Confirmada',
  cancelled: 'Cancelada',
  completed: 'Concluída',
}

export default function ClientHistory({ bookings }: ClientHistoryProps) {
  if (bookings.length === 0) {
    return <p className="text-sm text-gray-400">Sem marcações anteriores.</p>
  }

  return (
    <ul className="space-y-3">
      {bookings.map((b) => (
        <li key={b.id} className="flex items-center justify-between rounded-lg border border-gray-100 px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {formatDate(b.date)} · {formatTime(b.start_time)}–{formatTime(b.end_time)}
            </p>
          </div>
          <Badge variant={statusVariant[b.status]}>{statusLabel[b.status]}</Badge>
        </li>
      ))}
    </ul>
  )
}
