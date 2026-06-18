'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { CheckIcon } from '@/components/ui/icons'

interface StaffPickerProps {
  onBack: () => void
  onNext: (staff: string) => void
}

// ⬇️ EDITA AQUI: profissionais disponíveis para marcação
const staff = [
  { name: 'Carla', role: 'Cabeleireira' },
  { name: 'Francisca', role: 'Cabeleireira' },
  { name: 'Sofıa', role: 'Cabeleireira' },
  { name: 'Sandrinha', role: 'Esteticista' },
]

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export default function StaffPicker({ onBack, onNext }: StaffPickerProps) {
  const [selected, setSelected] = useState<string | null>(null)

  return (
    <div>
      <h2 className="mb-1 text-xl font-semibold text-brown-800">Escolha o profissional</h2>
      <p className="mb-6 text-sm text-brown-400">Com quem prefere ser atendida?</p>

      <div className="grid gap-3 sm:grid-cols-2">
        {staff.map((person) => {
          const isSelected = selected === person.name
          return (
            <button
              key={person.name}
              type="button"
              onClick={() => setSelected(person.name)}
              aria-pressed={isSelected}
              className={`flex items-center gap-4 rounded-2xl border p-4 text-left transition-colors ${
                isSelected
                  ? 'border-brown-600 bg-cream-50 ring-1 ring-brown-600'
                  : 'border-cream-200 bg-white hover:border-brown-300'
              }`}
            >
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brown-300 to-brown-500 font-bold text-white">
                {initials(person.name)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-brown-800">{person.name}</span>
                <span className="block text-sm text-brown-400">{person.role}</span>
              </span>
              <span
                className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border transition-colors ${
                  isSelected ? 'border-brown-600 bg-brown-600 text-white' : 'border-cream-300'
                }`}
              >
                {isSelected && <CheckIcon className="h-3 w-3" strokeWidth={3} />}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 flex gap-3">
        <Button variant="outline" onClick={onBack}>
          Voltar
        </Button>
        <Button onClick={() => selected && onNext(selected)} disabled={!selected}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
