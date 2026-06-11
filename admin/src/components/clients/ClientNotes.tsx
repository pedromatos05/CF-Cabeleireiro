'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface ClientNotesProps {
  notes: string | null
  onSave: (notes: string) => Promise<void>
}

export default function ClientNotes({ notes, onSave }: ClientNotesProps) {
  const [value, setValue] = useState(notes ?? '')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    await onSave(value)
    setSaving(false)
  }

  return (
    <div>
      <h3 className="mb-2 font-semibold text-gray-900">Notas de cabelo</h3>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={5}
        placeholder="Fórmulas de cor, diagnóstico, preferências..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
      />
      <div className="mt-2 flex justify-end">
        <Button size="sm" onClick={handleSave} disabled={saving}>
          {saving ? 'A guardar...' : 'Guardar'}
        </Button>
      </div>
    </div>
  )
}
