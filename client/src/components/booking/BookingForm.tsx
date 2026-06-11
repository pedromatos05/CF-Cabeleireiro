'use client'

import { useState } from 'react'
import ServicePicker from './ServicePicker'
import StaffPicker from './StaffPicker'
import DateTimePicker from './DateTimePicker'
import BookingSummary from './BookingSummary'

const STEPS = ['Serviço', 'Profissional', 'Data & Hora', 'Confirmação']

export default function BookingForm() {
  const [step, setStep] = useState(0)

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                i <= step
                  ? 'bg-brown-600 text-white'
                  : 'bg-cream-100 text-brown-400'
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`text-sm ${
                i === step ? 'font-medium text-brown-800' : 'text-brown-300'
              }`}
            >
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="h-px w-8 bg-cream-200" />}
          </div>
        ))}
      </div>

      {step === 0 && <ServicePicker onNext={() => setStep(1)} />}
      {step === 1 && <StaffPicker onBack={() => setStep(0)} onNext={() => setStep(2)} />}
      {step === 2 && <DateTimePicker onBack={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <BookingSummary onBack={() => setStep(2)} />}
    </div>
  )
}
