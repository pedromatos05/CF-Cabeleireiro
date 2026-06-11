interface RevenueChartProps {
  data?: { label: string; value: number }[]
}

export default function RevenueChart({ data = [] }: RevenueChartProps) {
  return (
    <div className="flex h-48 items-end gap-2 rounded-xl border border-gray-200 bg-white p-4">
      {data.length === 0 ? (
        <p className="m-auto text-sm text-gray-400">
          Placeholder — gráfico de barras de receita por período.
        </p>
      ) : (
        data.map((d) => (
          <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full rounded-t bg-gray-900"
              style={{ height: `${Math.max(4, d.value)}%` }}
            />
            <span className="text-xs text-gray-500">{d.label}</span>
          </div>
        ))
      )}
    </div>
  )
}
