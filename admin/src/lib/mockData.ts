// ---------------------------------------------------------------------------
// Mock data + tipos do dashboard.
// Para ligar ao Supabase: manter os tipos, substituir os arrays exportados
// por queries (ver TODOs em src/app/page.tsx).
// ---------------------------------------------------------------------------

export interface StaffMember {
  id: string
  name: string
  phone: string
  /** Texto livre por agora, ex.: "Ter–Sáb, 09:00–19:00" */
  workingHours?: string
}

/** Serviço que ocupa um bloco longo mas deixa a profissional livre no meio. */
export interface FreeWindow {
  /** minutos de trabalho ativo no início */
  activeBefore: number
  /** minutos livres no meio (onde cabe outra marcação) */
  freeWindow: number
  /** minutos de trabalho ativo no fim */
  activeAfter: number
}

export interface Service {
  id: string
  name: string
  /** duração total do bloco (= activeBefore + freeWindow + activeAfter quando há janela) */
  durationMinutes: number
  /** definido só para serviços tipo Madeixas; ausente = bloco sólido */
  freeWindow?: FreeWindow
}

export type ConfirmationChannel = 'email' | 'whatsapp'

export interface Appointment {
  id: string
  staffId: string
  serviceId: string
  clientName: string
  clientPhone: string
  clientEmail?: string
  /** ISO local "YYYY-MM-DDTHH:mm:ss" (sem fuso, interpretado como hora local) */
  start: string
  end: string
  notes?: string
  /** Preenchido quando a marcação nasceu de um pedido online (permite undo) */
  sourceRequestId?: string
}

/** Pedido de marcação feito pelo cliente no site (pendente de aprovação). */
export interface BookingRequest {
  id: string
  clientName: string
  clientPhone: string
  clientEmail: string
  serviceId: string
  /** Profissional preferida (opcional) */
  staffId?: string
  requestedStart: string
  createdAt: string
}

export interface HandledNotification {
  request: BookingRequest
  outcome: 'accepted' | 'rejected'
  handledAt: string
}

// ---- Helpers de datas (mock gerado à volta da semana atual) ----------------

/** Formata uma Date como ISO local, sem fuso — o FullCalendar lê como hora local. */
export function toLocalISO(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}` +
    `T${pad(date.getHours())}:${pad(date.getMinutes())}:00`
  )
}

/** ISO local para daqui a `dayOffset` dias, à hora "HH:mm". */
function at(dayOffset: number, time: string): string {
  const d = new Date()
  d.setDate(d.getDate() + dayOffset)
  const [h, m] = time.split(':').map(Number)
  d.setHours(h, m, 0, 0)
  return toLocalISO(d)
}

export function addMinutesISO(localISO: string, minutes: number): string {
  const d = new Date(localISO)
  d.setMinutes(d.getMinutes() + minutes)
  return toLocalISO(d)
}

// ---- Dados mock -------------------------------------------------------------

export const mockStaff: StaffMember[] = [
  { id: 'staff-1', name: 'Funcionária 1', phone: '912 345 671', workingHours: 'Ter–Sáb, 09:00–19:00' },
  { id: 'staff-2', name: 'Funcionária 2', phone: '912 345 672', workingHours: 'Ter–Sáb, 09:00–19:00' },
  { id: 'staff-3', name: 'Funcionária 3', phone: '912 345 673', workingHours: 'Qua–Sáb, 10:00–18:00' },
]

export const mockServices: Service[] = [
  { id: 'serv-1', name: 'Corte de Cabelo', durationMinutes: 45 },
  { id: 'serv-2', name: 'Coloração', durationMinutes: 120 },
  { id: 'serv-3', name: 'Brushing', durationMinutes: 30 },
  // Bloco de 240 min mas a profissional só trabalha a 1ª e a última hora;
  // as 2h do meio são janela livre (valores placeholder — ajustar depois).
  {
    id: 'serv-4',
    name: 'Madeixas',
    durationMinutes: 240,
    freeWindow: { activeBefore: 60, freeWindow: 120, activeAfter: 60 },
  },
  { id: 'serv-5', name: 'Tratamento Capilar', durationMinutes: 60 },
]

export const mockAppointments: Appointment[] = [
  {
    id: 'appt-1',
    staffId: 'staff-1',
    serviceId: 'serv-1',
    clientName: 'Maria Silva',
    clientPhone: '961 111 111',
    clientEmail: 'maria.silva@email.pt',
    start: at(0, '10:00'),
    end: at(0, '10:45'),
    notes: 'Prefere corte mais curto nas laterais.',
  },
  {
    id: 'appt-2',
    staffId: 'staff-1',
    serviceId: 'serv-2',
    clientName: 'Joana Pereira',
    clientPhone: '961 222 222',
    start: at(0, '14:00'),
    end: at(0, '16:00'),
  },
  {
    id: 'appt-3',
    staffId: 'staff-1',
    serviceId: 'serv-3',
    clientName: 'Carla Mendes',
    clientPhone: '961 333 333',
    start: at(1, '11:30'),
    end: at(1, '12:00'),
  },
  {
    id: 'appt-4',
    staffId: 'staff-2',
    serviceId: 'serv-4', // Madeixas: livre entre as 11:00 e as 13:00
    clientName: 'Ana Costa',
    clientPhone: '961 444 444',
    clientEmail: 'ana.costa@email.pt',
    start: at(0, '10:00'),
    end: at(0, '14:00'),
    notes: 'Janela livre 11:00–13:00 — pode encaixar outro serviço.',
  },
  {
    id: 'appt-5',
    staffId: 'staff-2',
    serviceId: 'serv-1',
    clientName: 'Rita Fonseca',
    clientPhone: '961 555 555',
    start: at(2, '15:00'),
    end: at(2, '15:45'),
  },
  {
    id: 'appt-6',
    staffId: 'staff-3',
    serviceId: 'serv-5',
    clientName: 'Beatriz Ramos',
    clientPhone: '961 666 666',
    start: at(1, '10:00'),
    end: at(1, '11:00'),
  },
  {
    id: 'appt-7',
    staffId: 'staff-3',
    serviceId: 'serv-2',
    clientName: 'Sofia Almeida',
    clientPhone: '961 777 777',
    start: at(3, '14:30'),
    end: at(3, '16:30'),
  },
]

export const mockPendingRequests: BookingRequest[] = [
  {
    id: 'req-1',
    clientName: 'Inês Tavares',
    clientPhone: '963 111 111',
    clientEmail: 'ines.tavares@email.pt',
    serviceId: 'serv-1',
    staffId: 'staff-1',
    requestedStart: at(1, '15:00'),
    createdAt: at(-1, '20:14'),
  },
  {
    id: 'req-2',
    clientName: 'Helena Duarte',
    clientPhone: '963 222 222',
    clientEmail: 'helena.duarte@email.pt',
    serviceId: 'serv-2',
    staffId: 'staff-2',
    requestedStart: at(2, '10:00'),
    createdAt: at(-1, '21:40'),
  },
  {
    id: 'req-3',
    clientName: 'Marta Lopes',
    clientPhone: '963 333 333',
    clientEmail: 'marta.lopes@email.pt',
    serviceId: 'serv-3',
    requestedStart: at(2, '17:30'),
    createdAt: at(0, '08:05'),
  },
  {
    id: 'req-4',
    clientName: 'Cláudia Nunes',
    clientPhone: '963 444 444',
    clientEmail: 'claudia.nunes@email.pt',
    serviceId: 'serv-5',
    staffId: 'staff-3',
    requestedStart: at(3, '11:00'),
    createdAt: at(0, '09:32'),
  },
  {
    id: 'req-5',
    clientName: 'Teresa Faria',
    clientPhone: '963 555 555',
    clientEmail: 'teresa.faria@email.pt',
    serviceId: 'serv-4',
    requestedStart: at(4, '09:30'),
    createdAt: at(0, '10:18'),
  },
]

export const mockHistory: HandledNotification[] = [
  {
    request: {
      id: 'req-h1',
      clientName: 'Patrícia Gomes',
      clientPhone: '963 666 666',
      clientEmail: 'patricia.gomes@email.pt',
      serviceId: 'serv-1',
      staffId: 'staff-1',
      requestedStart: at(-1, '16:00'),
      createdAt: at(-2, '12:00'),
    },
    outcome: 'accepted',
    handledAt: at(-2, '14:30'),
  },
  {
    request: {
      id: 'req-h2',
      clientName: 'Vera Matos',
      clientPhone: '963 777 777',
      clientEmail: 'vera.matos@email.pt',
      serviceId: 'serv-2',
      requestedStart: at(-1, '09:00'),
      createdAt: at(-3, '18:45'),
    },
    outcome: 'rejected',
    handledAt: at(-2, '10:05'),
  },
]

// ---- Lookups ---------------------------------------------------------------

export function serviceById(services: Service[], id: string): Service | undefined {
  return services.find((s) => s.id === id)
}

export function staffById(staff: StaffMember[], id: string): StaffMember | undefined {
  return staff.find((s) => s.id === id)
}
