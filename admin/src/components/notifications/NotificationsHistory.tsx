'use client'

import Modal from '@/components/ui/Modal'
import { formatRequestedStart } from './NotificationCard'
import { type HandledNotification, type Service, serviceById } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface NotificationsHistoryProps {
  isOpen: boolean
  onClose: () => void
  history: HandledNotification[]
  services: Service[]
  onRestore: (requestId: string) => void
}

export default function NotificationsHistory({
  isOpen,
  onClose,
  history,
  services,
  onRestore,
}: NotificationsHistoryProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Histórico de notificações">
      {history.length === 0 ? (
        <p className="py-6 text-center text-sm text-brown-400">Ainda não há notificações tratadas.</p>
      ) : (
        <ul className="max-h-96 space-y-2 overflow-y-auto">
          {history.map(({ request, outcome, handledAt }) => (
            <li
              key={request.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-brown-100 bg-brown-50/50 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-brown-800">
                  {request.clientName}
                  <span className="ml-2 font-normal text-brown-500">
                    {serviceById(services, request.serviceId)?.name ?? 'Serviço'}
                  </span>
                </p>
                <p className="text-xs capitalize text-brown-400">
                  Pedido para {formatRequestedStart(request.requestedStart)} · tratado a{' '}
                  {formatRequestedStart(handledAt)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className={cn(
                    'rounded-full px-2 py-0.5 text-[11px] font-semibold',
                    outcome === 'accepted' ? 'bg-brown-600 text-cream-50' : 'bg-cream-200 text-brown-600'
                  )}
                >
                  {outcome === 'accepted' ? 'Aceite' : 'Rejeitada'}
                </span>
                <button
                  onClick={() => onRestore(request.id)}
                  title="Repor nas notificações pendentes"
                  className="rounded-lg border border-brown-200 px-2.5 py-1 text-xs font-medium text-brown-600 hover:bg-white"
                >
                  Restaurar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Modal>
  )
}
