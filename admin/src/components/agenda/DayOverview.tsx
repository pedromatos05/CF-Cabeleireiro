'use client'

import { useMemo, useState } from 'react'
import StaffDayColumn from './StaffDayColumn'
import { type Appointment, type Service, type StaffMember } from '@/lib/mockData'

interface DayOverviewProps {
  /** Equipa ativa — uma coluna por profissional (gerado dinamicamente). */
  staff: StaffMember[]
  appointments: Appointment[]
  services: Service[]
  onAppointmentClick: (appointmentId: string) => void
}

// Janela horária mostrada e escala vertical partilhada por todas as colunas.
const DAY_START_MIN = 9 * 60 // 09:00
const DAY_END_MIN = 19 * 60 // 19:00
const HOUR_HEIGHT = 56 // px por hora

function pad(n: number): string {
  return String(n).padStart(2, '0')
}

function toDateValue(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export default function DayOverview({ staff, appointments, services, onAppointmentClick }: DayOverviewProps) {
  const [selectedDate, setSelectedDate] = useState(() => toDateValue(new Date()))

  function shiftDay(delta: number) {
    const d = new Date(`${selectedDate}T00:00:00`)
    d.setDate(d.getDate() + delta)
    setSelectedDate(toDateValue(d))
  }

  // Marcações do dia, agrupadas por profissional.
  // TODO(Supabase): substituir por uma query `.eq('date', selectedDate)` e
  // agrupar por staff_id no servidor.
  const appointmentsByStaff = useMemo(() => {
    const ofDay = appointments.filter((a) => a.start.slice(0, 10) === selectedDate)
    const map = new Map<string, Appointment[]>()
    for (const member of staff) map.set(member.id, [])
    for (const appt of ofDay) map.get(appt.staffId)?.push(appt)
    return map
  }, [appointments, staff, selectedDate])

  const perMin = HOUR_HEIGHT / 60
  const totalHeight = (DAY_END_MIN - DAY_START_MIN) * perMin
  const hours = Array.from({ length: (DAY_END_MIN - DAY_START_MIN) / 60 + 1 }, (_, i) => 9 + i)

  const dateLabel = new Date(`${selectedDate}T00:00:00`).toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const isToday = selectedDate === toDateValue(new Date())

  return (
    <div className="rounded-2xl border border-brown-100 bg-white p-4 shadow-sm">
      {/* ---- Controlo de data ---- */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-brown-800">Dia (todos)</h2>
          <p className="text-sm capitalize text-brown-400">{dateLabel}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => shiftDay(-1)}
            aria-label="Dia anterior"
            className="rounded-lg border border-brown-200 px-2.5 py-1.5 text-sm font-medium text-brown-600 hover:bg-brown-50"
          >
            ‹
          </button>
          <button
            onClick={() => setSelectedDate(toDateValue(new Date()))}
            disabled={isToday}
            className="rounded-lg border border-brown-200 px-3 py-1.5 text-sm font-medium text-brown-600 hover:bg-brown-50 disabled:cursor-default disabled:opacity-40"
          >
            Hoje
          </button>
          <button
            onClick={() => shiftDay(1)}
            aria-label="Dia seguinte"
            className="rounded-lg border border-brown-200 px-2.5 py-1.5 text-sm font-medium text-brown-600 hover:bg-brown-50"
          >
            ›
          </button>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => e.target.value && setSelectedDate(e.target.value)}
            className="rounded-lg border border-brown-200 bg-white px-2.5 py-1.5 text-sm text-brown-700 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400"
          />
        </div>
      </div>

      {/* ---- Vista panorâmica (scroll horizontal; eixo de tempo fixo) ---- */}
      {staff.length === 0 ? (
        <p className="rounded-xl border border-dashed border-brown-200 p-8 text-center text-sm text-brown-400">
          Sem profissionais. Adicione equipa para ver as agendas.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <div className="flex min-w-max">
            {/* Eixo de tempo (fixo à esquerda durante o scroll) */}
            <div className="sticky left-0 z-20 w-14 shrink-0 bg-white">
              <div className="h-12 border-b border-brown-100" />
              <div className="relative" style={{ height: totalHeight }}>
                {hours.map((h, i) => (
                  <div
                    key={h}
                    className="absolute right-2 -translate-y-1/2 text-[11px] font-medium text-brown-400"
                    style={{ top: i * HOUR_HEIGHT }}
                  >
                    {pad(h)}:00
                  </div>
                ))}
              </div>
            </div>

            {/* Uma coluna por profissional */}
            {staff.map((member) => (
              <StaffDayColumn
                key={member.id}
                staff={member}
                appointments={appointmentsByStaff.get(member.id) ?? []}
                services={services}
                dayStartMin={DAY_START_MIN}
                dayEndMin={DAY_END_MIN}
                hourHeight={HOUR_HEIGHT}
                onAppointmentClick={onAppointmentClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
