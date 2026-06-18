'use client'

import { useState } from 'react'
import ServicePicker from './ServicePicker'
import StaffPicker from './StaffPicker'
import DateTimePicker from './DateTimePicker'
import BookingSummary from './BookingSummary'

const STEPS = ['Serviço', 'Profissional', 'Data & Hora', 'Pedido']

export type Booking = {
  services: string[]
  staff: string | null
  date: Date | null
  time: string | null
}

export default function BookingForm({ initialCategory }: { initialCategory?: string }) {
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState<Booking>({
    services: [],
    staff: null,
    date: null,
    time: null,
  })

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center justify-center gap-2 sm:justify-start">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 flex-none items-center justify-center rounded-full text-sm font-medium ${
                i <= step ? 'bg-brown-600 text-white' : 'bg-cream-100 text-brown-400'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`hidden text-sm sm:inline ${i === step ? 'font-medium text-brown-800' : 'text-brown-300'}`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="h-px w-6 bg-cream-200 sm:w-8" />}
          </div>
        ))}
      </div>

      {/* Etiqueta do passo atual — apenas mobile */}
      <p className="-mt-4 mb-6 text-center text-sm font-semibold uppercase tracking-wider text-brown-500 sm:hidden">
        {step + 1}. {STEPS[step]}
      </p>

      {step === 0 && (
        <ServicePicker
          category={initialCategory}
          onNext={(services) => {
            setBooking((b) => ({ ...b, services }))
            setStep(1)
          }}
        />
      )}
      {step === 1 && (
        <StaffPicker
          onBack={() => setStep(0)}
          onNext={(staff) => {
            setBooking((b) => ({ ...b, staff }))
            setStep(2)
          }}
        />
      )}
      {step === 2 && (
        <DateTimePicker
          onBack={() => setStep(1)}
          onNext={(date, time) => {
            setBooking((b) => ({ ...b, date, time }))
            setStep(3)
          }}
        />
      )}
      {step === 3 && <BookingSummary booking={booking} onBack={() => setStep(2)} />}
    </div>
  )
}
