'use client'

import { useState } from 'react'
import ServicePicker from './ServicePicker'
import StaffPicker from './StaffPicker'
import DateTimePicker from './DateTimePicker'
import BookingSummary from './BookingSummary'

const STEPS = ['Serviço', 'Profissional', 'Data & Hora', 'Confirmação']

export type Booking = {
  service: string | null
  staff: string | null
  date: Date | null
  time: string | null
}

export default function BookingForm({ initialCategory }: { initialCategory?: string }) {
  const [step, setStep] = useState(0)
  const [booking, setBooking] = useState<Booking>({
    service: null,
    staff: null,
    date: null,
    time: null,
  })

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= step ? 'bg-brown-600 text-white' : 'bg-cream-100 text-brown-400'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${i === step ? 'font-medium text-brown-800' : 'text-brown-300'}`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="h-px w-8 bg-cream-200" />}
          </div>
        ))}
      </div>

      {step === 0 && (
        <ServicePicker
          category={initialCategory}
          onNext={(service) => {
            setBooking((b) => ({ ...b, service }))
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
