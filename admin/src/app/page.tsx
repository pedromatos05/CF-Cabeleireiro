'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import TopBar from '@/components/layout/TopBar'
import NewBookingModal, { type NewBookingForm } from '@/components/agenda/NewBookingModal'
import AppointmentDetailsModal from '@/components/agenda/AppointmentDetailsModal'
import DayOverview from '@/components/agenda/DayOverview'
import NotificationsPanel from '@/components/notifications/NotificationsPanel'
import NotificationsHistory from '@/components/notifications/NotificationsHistory'
import StaffManagerModal from '@/components/staff/StaffManagerModal'
import { cn } from '@/lib/utils'
import { sendConfirmation } from '@/lib/notifications'
import { canPlaceBooking, type ExistingBooking, type PlacementResult } from '@/lib/overlap'
import {
  addMinutesISO,
  mockAppointments,
  mockHistory,
  mockPendingRequests,
  mockServices,
  mockStaff,
  serviceById,
  staffById,
  toLocalISO,
  type Appointment,
  type BookingRequest,
  type ConfirmationChannel,
  type HandledNotification,
  type StaffMember,
} from '@/lib/mockData'

// FullCalendar manipula o DOM diretamente — carregar só no cliente.
const AgendaCalendar = dynamic(() => import('@/components/agenda/AgendaCalendar'), { ssr: false })

/** Converte uma marcação para o formato esperado pelo validador de sobreposição. */
function toExistingBooking(appointment: Appointment): ExistingBooking {
  const service = serviceById(mockServices, appointment.serviceId)
  return {
    id: appointment.id,
    start: appointment.start,
    end: appointment.end,
    freeWindow: service?.freeWindow ?? null,
  }
}

export default function DashboardPage() {
  // ---- Estado (TODO Supabase: substituir os valores iniciais por fetch e os
  // setters por mutações via src/lib/api.ts; a forma dos dados mantém-se) ----
  const [staff, setStaff] = useState<StaffMember[]>(mockStaff)
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments)
  const [pendingRequests, setPendingRequests] = useState<BookingRequest[]>(mockPendingRequests)
  const [history, setHistory] = useState<HandledNotification[]>(mockHistory)

  const [selectedStaffId, setSelectedStaffId] = useState(mockStaff[0].id)
  const [channel, setChannel] = useState<ConfirmationChannel>('email')
  const [view, setView] = useState<'day' | 'agenda'>('agenda')

  const [isBookingModalOpen, setBookingModalOpen] = useState(false)
  const [isStaffModalOpen, setStaffModalOpen] = useState(false)
  const [isHistoryOpen, setHistoryOpen] = useState(false)
  const [detailsAppointmentId, setDetailsAppointmentId] = useState<string | null>(null)

  const [isDraggingEvent, setIsDraggingEvent] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  // Painel de notificações: usado para detetar largadas de marcações sobre ele.
  const notificationsRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(null), 4000)
    return () => clearTimeout(timer)
  }, [toast])

  const selectedStaff = staffById(staff, selectedStaffId)
  const visibleAppointments = useMemo(
    () => appointments.filter((a) => a.staffId === selectedStaffId),
    [appointments, selectedStaffId]
  )
  const detailsAppointment = useMemo(
    () => appointments.find((a) => a.id === detailsAppointmentId) ?? null,
    [appointments, detailsAppointmentId]
  )

  function showToast(message: string) {
    setToast(message)
  }

  /** Dispara o envio da confirmação (email real / WhatsApp simulado) e dá feedback. */
  function dispatchConfirmation(
    booking: Parameters<typeof sendConfirmation>[0],
    successPrefix: string
  ) {
    void sendConfirmation(booking, channel).then((result) => {
      if (!result.ok) {
        showToast(`Falha ao enviar confirmação: ${result.error ?? 'erro desconhecido'}.`)
        return
      }
      showToast(
        channel === 'email'
          ? `${successPrefix} por email a ${booking.clientName}.`
          : `${successPrefix} por WhatsApp (simulado).`
      )
    })
  }

  /** Marcações de uma profissional, prontas para o validador de sobreposição. */
  function existingFor(staffId: string): ExistingBooking[] {
    return appointments.filter((a) => a.staffId === staffId).map(toExistingBooking)
  }

  // ---- Marcações -----------------------------------------------------------

  function createAppointment(form: NewBookingForm): PlacementResult {
    const service = serviceById(mockServices, form.serviceId)
    const start = `${form.date}T${form.time}:00`
    const end = addMinutesISO(start, service?.durationMinutes ?? 60)

    const result = canPlaceBooking({ start, end }, existingFor(form.staffId))
    if (!result.ok) return result

    setAppointments((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        staffId: form.staffId,
        serviceId: form.serviceId,
        clientName: form.clientName,
        clientPhone: form.clientPhone,
        start,
        end,
      },
    ])
    setSelectedStaffId(form.staffId)
    return result
  }

  function moveAppointment(appointmentId: string, start: string, end: string): PlacementResult {
    const appointment = appointments.find((a) => a.id === appointmentId)
    if (!appointment) return { ok: false }

    const result = canPlaceBooking({ id: appointmentId, start, end }, existingFor(appointment.staffId))
    if (!result.ok) {
      showToast(result.reason ?? 'Não é possível mover para aqui.')
      return result
    }
    setAppointments((prev) => prev.map((a) => (a.id === appointmentId ? { ...a, start, end } : a)))
    return result
  }

  // ---- Notificações --------------------------------------------------------

  function acceptRequest(requestId: string, options?: { start?: string; staffId?: string }): PlacementResult {
    const request = pendingRequests.find((r) => r.id === requestId)
    if (!request) return { ok: false }

    const service = serviceById(mockServices, request.serviceId)
    const start = options?.start ?? request.requestedStart
    const staffId = options?.staffId ?? request.staffId ?? selectedStaffId
    const end = addMinutesISO(start, service?.durationMinutes ?? 60)

    const result = canPlaceBooking({ start, end }, existingFor(staffId))
    if (!result.ok) {
      showToast(result.reason ?? 'Não é possível agendar aqui.')
      return result
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      staffId,
      serviceId: request.serviceId,
      clientName: request.clientName,
      clientPhone: request.clientPhone,
      clientEmail: request.clientEmail,
      start,
      end,
      sourceRequestId: request.id,
    }

    setAppointments((prev) => [...prev, appointment])
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId))
    setHistory((prev) => [{ request, outcome: 'accepted', handledAt: toLocalISO(new Date()) }, ...prev])
    setSelectedStaffId(staffId)

    dispatchConfirmation(
      {
        ...appointment,
        clientEmail: request.clientEmail,
        serviceName: service?.name ?? 'Serviço',
        staffName: staffById(staff, staffId)?.name ?? 'a nossa equipa',
      },
      'Confirmação enviada'
    )
    return result
  }

  /** Cartão largado na agenda: aceita + agenda no horário do drop, para a profissional visível. */
  function handleRequestDrop(requestId: string, start: string): PlacementResult {
    return acceptRequest(requestId, { start, staffId: selectedStaffId })
  }

  function rejectRequest(requestId: string) {
    const request = pendingRequests.find((r) => r.id === requestId)
    if (!request) return
    setPendingRequests((prev) => prev.filter((r) => r.id !== requestId))
    setHistory((prev) => [{ request, outcome: 'rejected', handledAt: toLocalISO(new Date()) }, ...prev])
  }

  /** Repõe uma notificação do histórico nas pendentes; se tinha sido aceite, desfaz a marcação. */
  function restoreFromHistory(requestId: string) {
    const entry = history.find((h) => h.request.id === requestId)
    if (!entry) return
    setHistory((prev) => prev.filter((h) => h.request.id !== requestId))
    if (entry.outcome === 'accepted') {
      setAppointments((prev) => prev.filter((a) => a.sourceRequestId !== requestId))
    }
    setPendingRequests((prev) => [entry.request, ...prev])
  }

  /** Arrastar uma marcação da agenda de volta para o painel: remove e devolve a pendente. */
  function returnAppointmentToPending(appointmentId: string) {
    const appointment = appointments.find((a) => a.id === appointmentId)
    if (!appointment) return

    const request: BookingRequest = {
      // Reutiliza o id de origem para se comportar como o pedido original.
      id: appointment.sourceRequestId ?? crypto.randomUUID(),
      clientName: appointment.clientName,
      clientPhone: appointment.clientPhone,
      clientEmail: appointment.clientEmail ?? '',
      serviceId: appointment.serviceId,
      staffId: appointment.staffId,
      requestedStart: appointment.start,
      createdAt: toLocalISO(new Date()),
    }

    setAppointments((prev) => prev.filter((a) => a.id !== appointmentId))
    setPendingRequests((prev) => [request, ...prev])
    showToast('Marcação devolvida às notificações.')
  }

  function resendConfirmation(appointment: Appointment) {
    const service = serviceById(mockServices, appointment.serviceId)
    dispatchConfirmation(
      {
        ...appointment,
        serviceName: service?.name ?? 'Serviço',
        staffName: staffById(staff, appointment.staffId)?.name ?? 'a nossa equipa',
      },
      'Confirmação reenviada'
    )
  }

  function isPointerOverNotifications(x: number, y: number): boolean {
    const rect = notificationsRef.current?.getBoundingClientRect()
    return !!rect && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
  }

  // ---- Equipa --------------------------------------------------------------

  function addStaff(member: Omit<StaffMember, 'id'>) {
    setStaff((prev) => [...prev, { ...member, id: crypto.randomUUID() }])
  }

  function removeStaff(staffId: string) {
    setStaff((prev) => {
      const next = prev.filter((m) => m.id !== staffId)
      if (staffId === selectedStaffId && next.length > 0) {
        setSelectedStaffId(next[0].id)
      }
      return next
    })
  }

  // ---- Render ---------------------------------------------------------------

  return (
    <div className="flex min-h-screen flex-col bg-cream-50">
      <TopBar
        staff={staff}
        selectedStaffId={selectedStaffId}
        onSelectStaff={setSelectedStaffId}
        onManageStaff={() => setStaffModalOpen(true)}
      />

      {/* Alternância de vista: panorâmica de todos vs. agenda individual */}
      <div className="px-4 pt-4 sm:px-6">
        <nav className="inline-flex rounded-lg border border-brown-100 bg-brown-50 p-1" aria-label="Vista">
          {(
            [
              ['day', 'Dia (todos)'],
              ['agenda', 'Agenda'],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                view === key ? 'bg-brown-600 text-cream-50 shadow-sm' : 'text-brown-500 hover:text-brown-700'
              )}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>

      {view === 'day' ? (
        <div className="flex-1 p-4 sm:p-6">
          {/* Vista panorâmica só de leitura — clicar abre os detalhes da marcação. */}
          <DayOverview
            staff={staff}
            appointments={appointments}
            services={mockServices}
            onAppointmentClick={setDetailsAppointmentId}
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-4 p-4 sm:p-6 xl:flex-row">
          <main className="min-w-0 flex-1 rounded-2xl border border-brown-100 bg-white p-4 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-brown-800">
                Agenda — {selectedStaff?.name ?? '—'}
              </h2>
              <button
                onClick={() => setBookingModalOpen(true)}
                className="rounded-lg bg-brown-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-brown-700"
              >
                + Nova marcação
              </button>
            </div>
            <AgendaCalendar
              appointments={visibleAppointments}
              services={mockServices}
              onAppointmentMove={moveAppointment}
              onRequestDrop={handleRequestDrop}
              onAppointmentClick={setDetailsAppointmentId}
              onAppointmentReturn={returnAppointmentToPending}
              onEventDragStateChange={setIsDraggingEvent}
              isPointerOverNotifications={isPointerOverNotifications}
            />
          </main>

          <aside ref={notificationsRef} className="w-full shrink-0 xl:w-80 2xl:w-96">
            <NotificationsPanel
              requests={pendingRequests}
              services={mockServices}
              staff={staff}
              channel={channel}
              onChannelChange={setChannel}
              onAccept={(id) => acceptRequest(id)}
              onReject={rejectRequest}
              onOpenHistory={() => setHistoryOpen(true)}
              highlightDrop={isDraggingEvent}
            />
          </aside>
        </div>
      )}

      <NewBookingModal
        key={`${selectedStaffId}-${isBookingModalOpen}`}
        isOpen={isBookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        staff={staff}
        services={mockServices}
        defaultStaffId={selectedStaffId}
        onCreate={createAppointment}
      />

      <AppointmentDetailsModal
        appointment={detailsAppointment}
        services={mockServices}
        staff={staff}
        channel={channel}
        onClose={() => setDetailsAppointmentId(null)}
        onResend={resendConfirmation}
      />

      <StaffManagerModal
        isOpen={isStaffModalOpen}
        onClose={() => setStaffModalOpen(false)}
        staff={staff}
        onAdd={addStaff}
        onRemove={removeStaff}
      />

      <NotificationsHistory
        isOpen={isHistoryOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        services={mockServices}
        onRestore={restoreFromHistory}
      />

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
          <div className="rounded-xl border border-brown-200 bg-brown-800 px-4 py-2.5 text-sm font-medium text-cream-50 shadow-lg">
            {toast}
          </div>
        </div>
      )}
    </div>
  )
}
