'use client'

import { useState } from 'react'
import DayView from './DayView'
import WeekView from './WeekView'

type ViewMode = 'day' | 'week'

export default function CalendarView() {
  const [mode, setMode] = useState<ViewMode>('week')
  const [date, setDate] = useState(new Date())

  return (
    <div>
      <div className="mb-4 flex items-center gap-2">
        <button
          onClick={() => setMode('day')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${mode === 'day' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Dia
        </button>
        <button
          onClick={() => setMode('week')}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium ${mode === 'week' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
        >
          Semana
        </button>
      </div>
      {mode === 'day' ? <DayView date={date} /> : <WeekView date={date} />}
    </div>
  )
}
