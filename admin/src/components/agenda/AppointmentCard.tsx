import type { Booking } from '@/types'

interface AppointmentCardProps {
  booking: Booking
  onClick?: () => void
}

const statusColor = {
  pending: 'border-l-yellow-400 bg-yellow-50',
  confirmed: 'border-l-green-400 bg-green-50',
  cancelled: 'border-l-red-400 bg-red-50',
  completed: 'border-l-gray-300 bg-gray-50',
}

export default function AppointmentCard({ booking, onClick }: AppointmentCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full rounded-lg border-l-4 p-3 text-left shadow-sm transition-opacity hover:opacity-80 ${statusColor[booking.status]}`}
    >
      <p className="text-xs font-semibold text-gray-700">
        {booking.start_time.slice(0, 5)} – {booking.end_time.slice(0, 5)}
      </p>
      <p className="mt-0.5 text-xs text-gray-500">Booking #{booking.id.slice(0, 8)}</p>
    </button>
  )
}
