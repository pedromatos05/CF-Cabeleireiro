'use client'

import { useEffect, useRef } from 'react'
import { Draggable } from '@fullcalendar/interaction'
import NotificationCard from './NotificationCard'
import type { BookingRequest, ConfirmationChannel, Service, StaffMember } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface NotificationsPanelProps {
  requests: BookingRequest[]
  services: Service[]
  staff: StaffMember[]
  channel: ConfirmationChannel
  onChannelChange: (channel: ConfirmationChannel) => void
  onAccept: (requestId: string) => void
  onReject: (requestId: string) => void
  onOpenHistory: () => void
  /** true enquanto se arrasta uma marcação da agenda — realça o painel como alvo. */
  highlightDrop?: boolean
}

export default function NotificationsPanel({
  requests,
  services,
  staff,
  channel,
  onChannelChange,
  onAccept,
  onReject,
  onOpenHistory,
  highlightDrop = false,
}: NotificationsPanelProps) {
  const listRef = useRef<HTMLUListElement>(null)

  // Torna os cartões arrastáveis para dentro do FullCalendar.
  useEffect(() => {
    if (!listRef.current) return
    const draggable = new Draggable(listRef.current, {
      itemSelector: '[data-request-id]',
      eventData: (el) => ({
        title: el.getAttribute('data-title') ?? '',
        duration: { minutes: Number(el.getAttribute('data-duration')) || 60 },
        extendedProps: { requestId: el.getAttribute('data-request-id') },
      }),
    })
    return () => draggable.destroy()
  }, [])

  return (
    <section
      data-notifications-dropzone
      className={cn(
        'flex h-full flex-col rounded-2xl border bg-white shadow-sm transition-colors',
        highlightDrop ? 'border-brown-400 bg-brown-50/40 ring-2 ring-brown-300' : 'border-brown-100'
      )}
    >
      {highlightDrop && (
        <div className="rounded-t-2xl border-b border-brown-200 bg-brown-100 px-4 py-2 text-center text-xs font-semibold text-brown-700">
          Largar aqui para devolver às notificações
        </div>
      )}
      <header className="border-b border-brown-100 p-4">
        <div className="flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-semibold text-brown-800">
            Notificações
            {requests.length > 0 && (
              <span className="rounded-full bg-brown-600 px-2 py-0.5 text-xs font-semibold text-cream-50">
                {requests.length}
              </span>
            )}
          </h2>
          <button
            onClick={onOpenHistory}
            className="text-xs font-medium text-brown-400 underline-offset-2 hover:text-brown-600 hover:underline"
          >
            Histórico
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2 text-xs text-brown-500">
          <span>Confirmar por:</span>
          <div className="flex rounded-lg border border-brown-100 bg-brown-50 p-0.5">
            {(['email', 'whatsapp'] as const).map((c) => (
              <button
                key={c}
                onClick={() => onChannelChange(c)}
                className={cn(
                  'rounded-md px-2.5 py-1 font-medium capitalize transition-colors',
                  channel === c ? 'bg-brown-600 text-cream-50' : 'text-brown-500 hover:text-brown-700'
                )}
              >
                {c === 'email' ? 'Email' : 'WhatsApp'}
              </button>
            ))}
          </div>
        </div>
      </header>

      <ul ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {requests.length === 0 && (
          <li className="rounded-xl border border-dashed border-brown-200 p-6 text-center text-sm text-brown-400">
            Sem pedidos pendentes 🎉
          </li>
        )}
        {requests.map((request) => (
          <NotificationCard
            key={request.id}
            request={request}
            services={services}
            staff={staff}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))}
      </ul>
    </section>
  )
}
