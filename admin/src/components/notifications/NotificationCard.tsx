'use client'

import { type BookingRequest, type Service, type StaffMember, serviceById, staffById } from '@/lib/mockData'

interface NotificationCardProps {
  request: BookingRequest
  services: Service[]
  staff: StaffMember[]
  onAccept: (requestId: string) => void
  onReject: (requestId: string) => void
}

export function formatRequestedStart(localISO: string): string {
  return new Date(localISO).toLocaleString('pt-PT', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function NotificationCard({
  request,
  services,
  staff,
  onAccept,
  onReject,
}: NotificationCardProps) {
  const service = serviceById(services, request.serviceId)
  const preferredStaff = request.staffId ? staffById(staff, request.staffId) : undefined

  return (
    <li
      // Atributos lidos pelo Draggable do FullCalendar (ver NotificationsPanel)
      data-request-id={request.id}
      data-title={request.clientName}
      data-duration={service?.durationMinutes ?? 60}
      className="cursor-grab rounded-xl border border-brown-100 bg-white p-3 shadow-sm transition-shadow hover:shadow-md active:cursor-grabbing"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-brown-800">{request.clientName}</p>
          <p className="text-sm text-brown-500">{service?.name ?? 'Serviço'}</p>
        </div>
        <span className="shrink-0 rounded-full bg-cream-100 px-2 py-0.5 text-[11px] font-medium text-brown-600">
          Pendente
        </span>
      </div>

      <dl className="mt-2 space-y-0.5 text-xs text-brown-500">
        <div className="flex gap-1">
          <dt className="font-medium text-brown-600">Quando:</dt>
          <dd className="capitalize">{formatRequestedStart(request.requestedStart)}</dd>
        </div>
        {preferredStaff && (
          <div className="flex gap-1">
            <dt className="font-medium text-brown-600">Prefere:</dt>
            <dd>{preferredStaff.name}</dd>
          </div>
        )}
        <div className="flex gap-1">
          <dt className="font-medium text-brown-600">Tel.:</dt>
          <dd>{request.clientPhone}</dd>
        </div>
        <div className="flex gap-1">
          <dt className="font-medium text-brown-600">Email:</dt>
          <dd className="truncate">{request.clientEmail}</dd>
        </div>
      </dl>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => onAccept(request.id)}
          className="flex-1 rounded-lg bg-brown-600 px-3 py-1.5 text-xs font-semibold text-cream-50 hover:bg-brown-700"
        >
          Aceitar
        </button>
        <button
          onClick={() => onReject(request.id)}
          className="flex-1 rounded-lg border border-brown-200 px-3 py-1.5 text-xs font-semibold text-brown-500 hover:bg-brown-50 hover:text-brown-700"
        >
          Rejeitar
        </button>
      </div>

      <p className="mt-2 text-center text-[11px] text-brown-300">
        ou arraste o cartão para a agenda para agendar
      </p>
    </li>
  )
}
