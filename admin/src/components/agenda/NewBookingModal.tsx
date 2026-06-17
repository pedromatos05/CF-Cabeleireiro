'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import type { Service, StaffMember } from '@/lib/mockData'
import type { PlacementResult } from '@/lib/overlap'

export interface NewBookingForm {
  clientName: string
  clientPhone: string
  serviceId: string
  staffId: string
  date: string
  time: string
}

interface NewBookingModalProps {
  isOpen: boolean
  onClose: () => void
  staff: StaffMember[]
  services: Service[]
  defaultStaffId: string
  /** Devolve o resultado da validação; se ok:false, o modal mostra o motivo. */
  onCreate: (form: NewBookingForm) => PlacementResult
}

const inputClass =
  'w-full rounded-lg border border-brown-200 bg-white px-3 py-2 text-sm text-brown-800 ' +
  'placeholder-brown-300 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400'

const labelClass = 'mb-1 block text-sm font-medium text-brown-600'

export default function NewBookingModal({
  isOpen,
  onClose,
  staff,
  services,
  defaultStaffId,
  onCreate,
}: NewBookingModalProps) {
  const [form, setForm] = useState<NewBookingForm>({
    clientName: '',
    clientPhone: '',
    serviceId: services[0]?.id ?? '',
    staffId: defaultStaffId,
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
  })
  const [error, setError] = useState<string | null>(null)

  function set<K extends keyof NewBookingForm>(key: K, value: NewBookingForm[K]) {
    setForm((f) => ({ ...f, [key]: value }))
    setError(null)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const result = onCreate({ ...form, staffId: form.staffId || defaultStaffId })
    if (!result.ok) {
      setError(result.reason ?? 'Não foi possível criar a marcação.')
      return
    }
    setError(null)
    setForm((f) => ({ ...f, clientName: '', clientPhone: '' }))
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Nova marcação">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="nb-name" className={labelClass}>Nome da cliente</label>
            <input
              id="nb-name"
              required
              value={form.clientName}
              onChange={(e) => set('clientName', e.target.value)}
              placeholder="Ex.: Maria Silva"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="nb-phone" className={labelClass}>Telefone</label>
            <input
              id="nb-phone"
              required
              type="tel"
              value={form.clientPhone}
              onChange={(e) => set('clientPhone', e.target.value)}
              placeholder="9xx xxx xxx"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="nb-service" className={labelClass}>Serviço</label>
            <select
              id="nb-service"
              value={form.serviceId}
              onChange={(e) => set('serviceId', e.target.value)}
              className={inputClass}
            >
              {services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.durationMinutes} min)
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nb-staff" className={labelClass}>Profissional</label>
            <select
              id="nb-staff"
              value={form.staffId}
              onChange={(e) => set('staffId', e.target.value)}
              className={inputClass}
            >
              {staff.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="nb-date" className={labelClass}>Data</label>
            <input
              id="nb-date"
              required
              type="date"
              value={form.date}
              onChange={(e) => set('date', e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="nb-time" className={labelClass}>Hora</label>
            <input
              id="nb-time"
              required
              type="time"
              min="09:00"
              max="19:00"
              step={900}
              value={form.time}
              onChange={(e) => set('time', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-brown-300 bg-cream-100 px-3 py-2 text-sm font-medium text-brown-700">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-brown-200 px-4 py-2 text-sm font-medium text-brown-600 hover:bg-brown-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="rounded-lg bg-brown-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-brown-700"
          >
            Criar marcação
          </button>
        </div>
      </form>
    </Modal>
  )
}
