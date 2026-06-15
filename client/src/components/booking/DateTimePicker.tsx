'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { ChevronLeftIcon } from '@/components/ui/icons'

interface DateTimePickerProps {
  onBack: () => void
  onNext: (date: Date, time: string) => void
}

const WEEKDAYS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const WEEKDAYS_FULL = [
  'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
  'Quinta-feira', 'Sexta-feira', 'Sábado',
]
const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
]

// Horário do salão por dia da semana (0=Dom … 6=Sáb). Vazio = encerrado.
const openingHours: Record<number, { start: string; end: string }[]> = {
  0: [],
  1: [],
  2: [{ start: '09:30', end: '13:00' }, { start: '14:30', end: '19:00' }],
  3: [{ start: '09:30', end: '13:00' }, { start: '14:30', end: '19:00' }],
  4: [{ start: '09:30', end: '13:00' }, { start: '14:30', end: '19:00' }],
  5: [{ start: '09:30', end: '13:00' }, { start: '14:30', end: '19:00' }],
  6: [{ start: '08:00', end: '16:00' }],
}

const SLOT_MINUTES = 30

const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}
const toLabel = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`

function generateSlots(weekday: number): string[] {
  const slots: string[] = []
  for (const range of openingHours[weekday] ?? []) {
    for (let t = toMinutes(range.start); t + SLOT_MINUTES <= toMinutes(range.end); t += SLOT_MINUTES) {
      slots.push(toLabel(t))
    }
  }
  return slots
}

const isClosed = (weekday: number) => (openingHours[weekday]?.length ?? 0) === 0
const gridIndex = (jsDay: number) => (jsDay + 6) % 7

export default function DateTimePicker({ onBack, onNext }: DateTimePickerProps) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [viewMonth, setViewMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)

  const year = viewMonth.getFullYear()
  const month = viewMonth.getMonth()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const firstWeekday = gridIndex(new Date(year, month, 1).getDay())
  const canGoPrev = viewMonth > new Date(today.getFullYear(), today.getMonth(), 1)

  const changeMonth = (delta: number) => setViewMonth(new Date(year, month + delta, 1))

  const slots = selectedDate ? generateSlots(selectedDate.getDay()) : []
  const periods = [
    { label: 'Manhã', slots: slots.filter((s) => Number(s.slice(0, 2)) < 13) },
    { label: 'Tarde', slots: slots.filter((s) => Number(s.slice(0, 2)) >= 13) },
  ].filter((p) => p.slots.length > 0)

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-brown-800">Escolha a data e a hora</h2>
      <p className="mb-6 text-sm text-brown-400">
        Selecione um dia disponível e o horário que prefere.
      </p>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Calendário */}
        <div className="rounded-2xl border border-cream-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => changeMonth(-1)}
              disabled={!canGoPrev}
              aria-label="Mês anterior"
              className="flex h-9 w-9 items-center justify-center rounded-full text-brown-500 transition-colors hover:bg-cream-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <p className="font-semibold text-brown-800">
              {MONTHS[month]} {year}
            </p>
            <button
              type="button"
              onClick={() => changeMonth(1)}
              aria-label="Mês seguinte"
              className="flex h-9 w-9 items-center justify-center rounded-full text-brown-500 transition-colors hover:bg-cream-100"
            >
              <ChevronLeftIcon className="h-5 w-5 rotate-180" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wide text-brown-300">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {Array.from({ length: firstWeekday }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1
              const date = new Date(year, month, day)
              const disabled = date < today || isClosed(date.getDay())
              const isSelected = !!selectedDate && date.getTime() === selectedDate.getTime()
              const isToday = date.getTime() === today.getTime()
              return (
                <button
                  key={day}
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    setSelectedDate(date)
                    setSelectedTime(null)
                  }}
                  className={`flex h-10 items-center justify-center rounded-lg text-sm transition-colors ${
                    isSelected
                      ? 'bg-brown-600 font-semibold text-white'
                      : disabled
                        ? 'cursor-not-allowed text-brown-200'
                        : isToday
                          ? 'font-semibold text-brown-700 ring-1 ring-inset ring-brown-300 hover:bg-cream-100'
                          : 'text-brown-700 hover:bg-cream-100'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <p className="mt-4 border-t border-cream-100 pt-3 text-center text-xs text-brown-300">
            Encerrado aos domingos e segundas
          </p>
        </div>

        {/* Horas disponíveis */}
        <div className="flex flex-col rounded-2xl border border-cream-200 bg-white p-5 shadow-sm">
          {!selectedDate ? (
            <div className="flex flex-1 flex-col items-center justify-center py-10 text-center">
              <p className="font-medium text-brown-700">Escolha um dia</p>
              <p className="mt-1 text-sm text-brown-400">
                As horas disponíveis aparecem aqui.
              </p>
            </div>
          ) : (
            <>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-brown-300">
                {WEEKDAYS_FULL[selectedDate.getDay()]}
              </p>
              <p className="mb-5 text-lg font-semibold text-brown-800">
                {selectedDate.getDate()} de {MONTHS[selectedDate.getMonth()]}
              </p>

              {periods.length === 0 ? (
                <p className="text-sm text-brown-400">Sem horários disponíveis neste dia.</p>
              ) : (
                <div className="space-y-5">
                  {periods.map((period) => (
                    <div key={period.label}>
                      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-brown-400">
                        {period.label}
                      </p>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {period.slots.map((slot) => {
                          const active = selectedTime === slot
                          return (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setSelectedTime(slot)}
                              className={`rounded-lg border py-2 text-sm font-medium transition-colors ${
                                active
                                  ? 'border-brown-600 bg-brown-600 text-white'
                                  : 'border-cream-200 text-brown-700 hover:border-brown-300 hover:bg-cream-50'
                              }`}
                            >
                              {slot}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          <p className="mt-auto pt-5 text-xs text-brown-300">
            {/* TODO(Supabase): remover as horas já ocupadas e ajustar à duração do serviço. */}
            Horários de acordo com o horário do salão.
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button
          onClick={() => selectedDate && selectedTime && onNext(selectedDate, selectedTime)}
          disabled={!selectedDate || !selectedTime}
        >
          Continuar
        </Button>
      </div>
    </div>
  )
}
