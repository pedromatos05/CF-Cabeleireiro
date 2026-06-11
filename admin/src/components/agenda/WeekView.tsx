interface WeekViewProps {
  date: Date
}

function getWeekDays(anchor: Date): Date[] {
  const start = new Date(anchor)
  start.setDate(anchor.getDate() - anchor.getDay() + 1)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8)

export default function WeekView({ date }: WeekViewProps) {
  const days = getWeekDays(date)

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
      <div className="grid min-w-[640px] grid-cols-8">
        <div className="border-b border-gray-100 p-3" />
        {days.map((d) => (
          <div key={d.toISOString()} className="border-b border-l border-gray-100 p-3 text-center">
            <p className="text-xs font-medium text-gray-500">
              {d.toLocaleDateString('pt-PT', { weekday: 'short' })}
            </p>
            <p className="text-sm font-semibold text-gray-900">{d.getDate()}</p>
          </div>
        ))}
        {HOURS.map((hour) => (
          <>
            <div key={`h-${hour}`} className="border-t border-gray-50 px-2 py-3 text-xs text-gray-400">
              {hour}:00
            </div>
            {days.map((d) => (
              <div
                key={`${d.toISOString()}-${hour}`}
                className="border-l border-t border-gray-50 py-3"
              />
            ))}
          </>
        ))}
      </div>
    </div>
  )
}
