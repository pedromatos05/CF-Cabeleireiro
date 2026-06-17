'use client'

import { type Appointment, type Service, type StaffMember, serviceById } from '@/lib/mockData'
import { canPlaceBooking, type ExistingBooking } from '@/lib/overlap'
import { cn } from '@/lib/utils'

interface StaffDayColumnProps {
  staff: StaffMember
  /** Marcações já filtradas para esta profissional + dia selecionado. */
  appointments: Appointment[]
  services: Service[]
  dayStartMin: number
  dayEndMin: number
  hourHeight: number
  onAppointmentClick: (appointmentId: string) => void
}

function minutesOfDay(iso: string): number {
  const d = new Date(iso)
  return d.getHours() * 60 + d.getMinutes()
}

function timeOverlap(a: Appointment, b: Appointment): boolean {
  return minutesOfDay(a.start) < minutesOfDay(b.end) && minutesOfDay(b.start) < minutesOfDay(a.end)
}

interface LaidOut {
  appt: Appointment
  top: number
  height: number
  /** Caixa horizontal dentro da coluna, em fração [0..1]. */
  leftFrac: number
  widthFrac: number
  zIndex: number
  /** true quando a marcação está encaixada na janela livre de outra. */
  nested: boolean
}

/**
 * Distribui marcações em "faixas" (lanes) por cluster de sobreposição, usando
 * um algoritmo guloso. Devolve, por id, a faixa e o nº total de faixas.
 * Usado tanto para as marcações de base como, isoladamente, para um grupo de
 * marcações encaixadas no mesmo host.
 */
function packLanes(items: Appointment[]): Map<string, { lane: number; lanes: number }> {
  const sorted = [...items].sort(
    (a, b) => a.start.localeCompare(b.start) || a.end.localeCompare(b.end)
  )
  const out = new Map<string, { lane: number; lanes: number }>()
  let cluster: Appointment[] = []
  let clusterEnd = -Infinity

  const flush = () => {
    if (!cluster.length) return
    const laneEnds: number[] = []
    const laneOf = new Map<string, number>()
    for (const a of cluster) {
      const startMin = minutesOfDay(a.start)
      const endMin = minutesOfDay(a.end)
      let lane = laneEnds.findIndex((end) => startMin >= end)
      if (lane === -1) {
        lane = laneEnds.length
        laneEnds.push(endMin)
      } else {
        laneEnds[lane] = endMin
      }
      laneOf.set(a.id, lane)
    }
    const lanes = laneEnds.length
    for (const a of cluster) out.set(a.id, { lane: laneOf.get(a.id)!, lanes })
    cluster = []
    clusterEnd = -Infinity
  }

  for (const a of sorted) {
    const startMin = minutesOfDay(a.start)
    if (cluster.length && startMin >= clusterEnd) flush()
    cluster.push(a)
    clusterEnd = cluster.length === 1 ? minutesOfDay(a.end) : Math.max(clusterEnd, minutesOfDay(a.end))
  }
  flush()
  return out
}

/**
 * Layout de uma coluna. Distingue dois casos (paridade com a vista "Agenda"):
 *  1. marcação que encaixa na janela livre de outra (host) → desenhada SOBRE
 *     o bloco do host (cartão sobreposto, recuado), não em coluna separada;
 *  2. conflito real de horário (dois blocos sólidos a sobrepor-se) → faixas
 *     lado a lado, para nada ficar escondido.
 *
 * A decisão "encaixa na janela livre" vs "conflito" reutiliza o helper
 * canPlaceBooking de lib/overlap.ts — não é re-derivada aqui.
 */
function layoutColumn(
  appointments: Appointment[],
  services: Service[],
  dayStartMin: number,
  perMin: number,
  totalHeight: number
): LaidOut[] {
  const freeWindowOf = (a: Appointment) => serviceById(services, a.serviceId)?.freeWindow ?? null
  const asExisting = (a: Appointment): ExistingBooking => ({
    id: a.id,
    start: a.start,
    end: a.end,
    freeWindow: freeWindowOf(a),
  })

  // Para cada marcação, encontrar um host cuja janela livre a acolha.
  const hostOf = new Map<string, Appointment>()
  for (const b of appointments) {
    if (freeWindowOf(b)) continue // um host não é, ele próprio, encaixado
    const host = appointments.find(
      (a) =>
        a.id !== b.id &&
        freeWindowOf(a) &&
        timeOverlap(a, b) &&
        canPlaceBooking({ start: b.start, end: b.end }, [asExisting(a)]).ok
    )
    if (host) hostOf.set(b.id, host)
  }

  const yOf = (a: Appointment) => {
    const top = Math.max(0, (minutesOfDay(a.start) - dayStartMin) * perMin)
    const bottom = Math.min(totalHeight, (minutesOfDay(a.end) - dayStartMin) * perMin)
    return { top, height: Math.max(20, bottom - top) }
  }

  // Base: tudo o que NÃO está encaixado (hosts + marcações normais + conflitos reais).
  const base = appointments.filter((a) => !hostOf.has(a.id))
  const basePack = packLanes(base)
  const result: LaidOut[] = []
  const baseBox = new Map<string, { leftFrac: number; widthFrac: number }>()

  for (const a of base) {
    const { lane, lanes } = basePack.get(a.id)!
    const { top, height } = yOf(a)
    const leftFrac = lane / lanes
    const widthFrac = 1 / lanes
    baseBox.set(a.id, { leftFrac, widthFrac })
    result.push({ appt: a, top, height, leftFrac, widthFrac, zIndex: 0, nested: false })
  }

  // Encaixadas: agrupadas por host e sobrepostas dentro da caixa do host.
  const byHost = new Map<string, Appointment[]>()
  for (const b of appointments) {
    const host = hostOf.get(b.id)
    if (!host) continue
    const group = byHost.get(host.id)
    if (group) group.push(b)
    else byHost.set(host.id, [b])
  }

  const INSET_LEFT = 0.2 // recuo à esquerda dentro do bloco do host
  const INSET_WIDTH = 0.76
  for (const [hostId, group] of byHost) {
    const hb = baseBox.get(hostId)
    const groupPack = packLanes(group)
    for (const b of group) {
      const { lane, lanes } = groupPack.get(b.id)!
      const { top, height } = yOf(b)
      let leftFrac: number
      let widthFrac: number
      if (hb) {
        const bandLeft = hb.leftFrac + hb.widthFrac * INSET_LEFT
        const bandWidth = hb.widthFrac * INSET_WIDTH
        leftFrac = bandLeft + bandWidth * (lane / lanes)
        widthFrac = bandWidth * (1 / lanes)
      } else {
        // Fallback improvável (host não posicionado): faixa simples.
        leftFrac = lane / lanes
        widthFrac = 1 / lanes
      }
      result.push({ appt: b, top, height, leftFrac, widthFrac, zIndex: 10, nested: true })
    }
  }

  return result
}

export default function StaffDayColumn({
  staff,
  appointments,
  services,
  dayStartMin,
  dayEndMin,
  hourHeight,
  onAppointmentClick,
}: StaffDayColumnProps) {
  const perMin = hourHeight / 60
  const totalHeight = (dayEndMin - dayStartMin) * perMin
  const positioned = layoutColumn(appointments, services, dayStartMin, perMin, totalHeight)

  const count = appointments.length
  const hourCount = Math.round((dayEndMin - dayStartMin) / 60)

  return (
    <div className="w-56 shrink-0 border-l border-brown-100">
      {/* Cabeçalho da coluna */}
      <div className="flex h-12 flex-col justify-center border-b border-brown-100 bg-brown-50 px-3">
        <p className="truncate text-sm font-semibold text-brown-800">{staff.name}</p>
        <p className="text-[11px] text-brown-400">
          {count} {count === 1 ? 'marcação' : 'marcações'}
        </p>
      </div>

      {/* Corpo: grelha horária + marcações posicionadas */}
      <div className="relative" style={{ height: totalHeight }}>
        {/* Linhas de hora */}
        {Array.from({ length: hourCount + 1 }, (_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 border-t border-brown-100/70"
            style={{ top: i * hourHeight }}
          />
        ))}

        {positioned.map(({ appt, top, height, leftFrac, widthFrac, zIndex, nested }) => {
          const service = serviceById(services, appt.serviceId)
          // Nota: a janela livre é lógica interna (usada para encaixar marcações),
          // NÃO é desenhada como faixas — o bloco é sólido e uniforme, igual à
          // vista "Agenda". Mesmas classes de texto do eventContent do FullCalendar.
          return (
            <button
              key={appt.id}
              onClick={() => onAppointmentClick(appt.id)}
              title={`${appt.clientName} — ${service?.name ?? 'Serviço'}`}
              className={cn(
                // flex-col + justify-start: o conteúdo encosta ao TOPO do bloco
                // (o <button> centra verticalmente por defeito), igual à vista "Agenda".
                'absolute flex flex-col justify-start overflow-hidden rounded-md bg-brown-600 px-1 py-0.5 text-left leading-tight text-cream-50 shadow-sm transition-colors hover:bg-brown-700',
                nested ? 'ring-2 ring-cream-50/80 shadow-md' : 'ring-1 ring-brown-700/30'
              )}
              style={{
                top,
                height,
                left: `calc(${leftFrac * 100}% + 2px)`,
                width: `calc(${widthFrac * 100}% - 4px)`,
                zIndex,
              }}
            >
              <span className="block truncate text-xs font-semibold">{appt.clientName}</span>
              <span className="block truncate text-[11px] opacity-80">{service?.name ?? 'Serviço'}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
