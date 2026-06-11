interface OccupancyChartProps {
  data?: { label: string; value: number }[]
}

export default function OccupancyChart({ data = [] }: OccupancyChartProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      {data.length === 0 ? (
        <p className="py-8 text-center text-sm text-gray-400">
          Placeholder — gráfico de ocupação (%) por dia da semana ou por profissional.
        </p>
      ) : (
        <ul className="space-y-2">
          {data.map((d) => (
            <li key={d.label}>
              <div className="mb-1 flex justify-between text-xs text-gray-600">
                <span>{d.label}</span>
                <span>{d.value}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-gray-900"
                  style={{ width: `${d.value}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
