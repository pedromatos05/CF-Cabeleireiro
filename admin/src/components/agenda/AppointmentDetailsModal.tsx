'use client'

import Modal from '@/components/ui/Modal'
import {
  type Appointment,
  type ConfirmationChannel,
  type Service,
  type StaffMember,
  serviceById,
  staffById,
} from '@/lib/mockData'

interface AppointmentDetailsModalProps {
  appointment: Appointment | null
  services: Service[]
  staff: StaffMember[]
  channel: ConfirmationChannel
  onClose: () => void
  onResend: (appointment: Appointment) => void
}

function minutesBetween(start: string, end: string): number {
  return Math.round((new Date(end).getTime() - new Date(start).getTime()) / 60000)
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })
}

export default function AppointmentDetailsModal({
  appointment,
  services,
  staff,
  channel,
  onClose,
  onResend,
}: AppointmentDetailsModalProps) {
  if (!appointment) return null

  const service = serviceById(services, appointment.serviceId)
  const member = staffById(staff, appointment.staffId)
  const totalMinutes = minutesBetween(appointment.start, appointment.end)

  const rows: Array<[string, string]> = [
    ['Cliente', appointment.clientName],
    ['Telefone', appointment.clientPhone],
    ['Email', appointment.clientEmail || '—'],
    ['Serviço', service?.name ?? '—'],
    ['Duração total', `${totalMinutes} min`],
    ['Data', formatDate(appointment.start)],
    ['Horário', `${formatTime(appointment.start)} – ${formatTime(appointment.end)}`],
    ['Profissional', member?.name ?? '—'],
    ['Notas', appointment.notes || '—'],
  ]

  return (
    <Modal isOpen onClose={onClose} title="Detalhes da marcação">
      <dl className="divide-y divide-brown-100">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-2">
            <dt className="shrink-0 text-sm font-medium text-brown-500">{label}</dt>
            <dd className="text-right text-sm text-brown-800">{value}</dd>
          </div>
        ))}
      </dl>

      {service?.freeWindow && (
        <p className="mt-3 rounded-lg bg-cream-100 px-3 py-2 text-xs text-brown-600">
          Janela livre de {service.freeWindow.freeWindow} min no meio — pode receber outra marcação.
        </p>
      )}

      <div className="mt-5 flex justify-end gap-2">
        <button
          onClick={onClose}
          className="rounded-lg border border-brown-200 px-4 py-2 text-sm font-medium text-brown-600 hover:bg-brown-50"
        >
          Fechar
        </button>
        <button
          onClick={() => onResend(appointment)}
          className="rounded-lg bg-brown-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-brown-700"
        >
          Reenviar confirmação ({channel === 'email' ? 'Email' : 'WhatsApp'})
        </button>
      </div>
    </Modal>
  )
}
