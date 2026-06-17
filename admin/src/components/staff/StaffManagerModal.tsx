'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import type { StaffMember } from '@/lib/mockData'

interface StaffManagerModalProps {
  isOpen: boolean
  onClose: () => void
  staff: StaffMember[]
  onAdd: (member: Omit<StaffMember, 'id'>) => void
  onRemove: (staffId: string) => void
}

const inputClass =
  'w-full rounded-lg border border-brown-200 bg-white px-3 py-2 text-sm text-brown-800 ' +
  'placeholder-brown-300 focus:border-brown-400 focus:outline-none focus:ring-1 focus:ring-brown-400'

export default function StaffManagerModal({ isOpen, onClose, staff, onAdd, onRemove }: StaffManagerModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [workingHours, setWorkingHours] = useState('')
  const [confirmingRemoveId, setConfirmingRemoveId] = useState<string | null>(null)

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    onAdd({ name: name.trim(), phone: phone.trim(), workingHours: workingHours.trim() || undefined })
    setName('')
    setPhone('')
    setWorkingHours('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Gerir equipa">
      <ul className="space-y-2">
        {staff.map((member) => (
          <li
            key={member.id}
            className="flex items-center justify-between gap-3 rounded-xl border border-brown-100 bg-brown-50/50 p-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-brown-800">{member.name}</p>
              <p className="truncate text-xs text-brown-400">
                {member.phone}
                {member.workingHours ? ` · ${member.workingHours}` : ''}
              </p>
            </div>
            {confirmingRemoveId === member.id ? (
              <div className="flex shrink-0 items-center gap-2">
                <span className="text-xs text-brown-500">Remover?</span>
                <button
                  onClick={() => {
                    onRemove(member.id)
                    setConfirmingRemoveId(null)
                  }}
                  className="rounded-lg bg-brown-700 px-2.5 py-1 text-xs font-semibold text-cream-50 hover:bg-brown-800"
                >
                  Sim
                </button>
                <button
                  onClick={() => setConfirmingRemoveId(null)}
                  className="rounded-lg border border-brown-200 px-2.5 py-1 text-xs font-medium text-brown-600 hover:bg-white"
                >
                  Não
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmingRemoveId(member.id)}
                disabled={staff.length <= 1}
                title={staff.length <= 1 ? 'Tem de existir pelo menos uma profissional' : 'Remover'}
                className="shrink-0 rounded-lg border border-brown-200 px-2.5 py-1 text-xs font-medium text-brown-500 hover:bg-white hover:text-brown-700 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Remover
              </button>
            )}
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="mt-4 space-y-3 border-t border-brown-100 pt-4">
        <h3 className="text-sm font-semibold text-brown-700">Adicionar profissional</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome"
            className={inputClass}
          />
          <input
            required
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Telefone"
            className={inputClass}
          />
        </div>
        <input
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          placeholder="Horário (opcional) — ex.: Ter–Sáb, 09:00–19:00"
          className={inputClass}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            className="rounded-lg bg-brown-600 px-4 py-2 text-sm font-medium text-cream-50 hover:bg-brown-700"
          >
            Adicionar
          </button>
        </div>
      </form>
    </Modal>
  )
}
