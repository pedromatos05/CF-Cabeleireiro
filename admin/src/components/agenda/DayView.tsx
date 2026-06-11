interface DayViewProps {
  date: Date
}

const HOURS = Array.from({ length: 12 }, (_, i) => i + 8)

export default function DayView({ date }: DayViewProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-4 py-3">
        <p className="font-semibold text-gray-900">
          {date.toLocaleDateString('pt-PT', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>
      <div className="divide-y divide-gray-50">
        {HOURS.map((hour) => (
          <div key={hour} className="flex items-start gap-4 px-4 py-3">
            <span className="w-12 text-xs text-gray-400">{hour}:00</span>
            <div className="flex-1" />
          </div>
        ))}
      </div>
    </div>
  )
}
