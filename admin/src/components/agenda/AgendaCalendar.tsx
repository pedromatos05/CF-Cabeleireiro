'use client'

import { useMemo, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ptLocale from '@fullcalendar/core/locales/pt'
import type { EventClickArg, EventDropArg } from '@fullcalendar/core'
import type { EventReceiveArg } from '@fullcalendar/interaction'
import { type Appointment, type Service, serviceById, toLocalISO } from '@/lib/mockData'
import type { PlacementResult } from '@/lib/overlap'

interface AgendaCalendarProps {
  appointments: Appointment[]
  services: Service[]
  /** Marcação arrastada para outro horário; devolve se a colocação é válida. */
  onAppointmentMove: (appointmentId: string, start: string, end: string) => PlacementResult
  /** Notificação largada na agenda (aceitar + agendar num gesto). */
  onRequestDrop: (requestId: string, start: string) => PlacementResult
  /** Clique numa marcação → abrir detalhes. */
  onAppointmentClick: (appointmentId: string) => void
  /** Marcação arrastada para fora, sobre o painel de notificações. */
  onAppointmentReturn: (appointmentId: string) => void
  /** Sinaliza início/fim de arrasto de uma marcação (para destacar o painel). */
  onEventDragStateChange: (dragging: boolean) => void
  /** Indica se um ponto do ecrã está sobre o painel de notificações. */
  isPointerOverNotifications: (x: number, y: number) => boolean
}

export default function AgendaCalendar({
  appointments,
  services,
  onAppointmentMove,
  onRequestDrop,
  onAppointmentClick,
  onAppointmentReturn,
  onEventDragStateChange,
  isPointerOverNotifications,
}: AgendaCalendarProps) {
  const calendarRef = useRef<FullCalendar>(null)

  const events = useMemo(
    () =>
      appointments.map((appt) => {
        const service = serviceById(services, appt.serviceId)
        return {
          id: appt.id,
          title: appt.clientName,
          start: appt.start,
          end: appt.end,
          extendedProps: {
            serviceName: service?.name ?? 'Serviço',
            // Bloco com janela livre continua a ser UM evento; só mostramos uma dica.
            freeWindowMinutes: service?.freeWindow?.freeWindow,
          },
        }
      }),
    [appointments, services]
  )

  function handleEventDrop(info: EventDropArg) {
    if (!info.event.start || !info.event.end) {
      info.revert()
      return
    }
    const result = onAppointmentMove(
      info.event.id,
      toLocalISO(info.event.start),
      toLocalISO(info.event.end)
    )
    if (!result.ok) info.revert()
  }

  // Cartão de notificação largado na agenda: o FullCalendar cria um evento
  // temporário — removemo-lo e deixamos o estado React criar a marcação real
  // (caso a colocação seja válida).
  function handleEventReceive(info: EventReceiveArg) {
    const requestId = info.event.extendedProps.requestId as string | undefined
    const start = info.event.start
    info.event.remove()
    if (requestId && start) onRequestDrop(requestId, toLocalISO(start))
  }

  function handleEventClick(arg: EventClickArg) {
    onAppointmentClick(arg.event.id)
  }

  return (
    <FullCalendar
      ref={calendarRef}
      plugins={[timeGridPlugin, dayGridPlugin, interactionPlugin]}
      locale={ptLocale}
      initialView="timeGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'timeGridDay,timeGridWeek',
      }}
      slotMinTime="09:00:00"
      slotMaxTime="19:00:00"
      slotDuration="00:30:00"
      allDaySlot={false}
      height="auto"
      nowIndicator
      editable
      eventDurationEditable={false}
      droppable
      events={events}
      eventClick={handleEventClick}
      eventDrop={handleEventDrop}
      eventReceive={handleEventReceive}
      eventDragStart={() => onEventDragStateChange(true)}
      eventDragStop={(arg) => {
        onEventDragStateChange(false)
        // Largado sobre o painel de notificações → devolver à lista de pendentes.
        if (isPointerOverNotifications(arg.jsEvent.clientX, arg.jsEvent.clientY)) {
          onAppointmentReturn(arg.event.id)
        }
      }}
      eventContent={(arg) => (
        <div className="overflow-hidden px-1 py-0.5 leading-tight">
          <p className="truncate text-xs font-semibold">{arg.event.title}</p>
          <p className="truncate text-[11px] opacity-80">{arg.event.extendedProps.serviceName}</p>
          {arg.event.extendedProps.freeWindowMinutes ? (
            <p className="truncate text-[10px] italic opacity-70">
              janela livre {arg.event.extendedProps.freeWindowMinutes}m
            </p>
          ) : null}
        </div>
      )}
    />
  )
}
