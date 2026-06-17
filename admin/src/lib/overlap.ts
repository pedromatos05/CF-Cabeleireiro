// ---------------------------------------------------------------------------
// Helpers puros para validar a colocação de marcações na agenda.
// Sem React/DOM — fácil de testar e de replicar no backend quando o Supabase
// for ligado (a mesma regra deve correr do lado do servidor).
// ---------------------------------------------------------------------------

const MS_PER_MIN = 60_000

/** Serviço que ocupa um bloco longo mas deixa a profissional livre no meio. */
export interface FreeWindowSpec {
  /** minutos de trabalho ativo no início do bloco */
  activeBefore: number
  /** minutos livres no meio (onde cabe outra marcação) */
  freeWindow: number
  /** minutos de trabalho ativo no fim do bloco */
  activeAfter: number
}

export interface PlacementCandidate {
  /** indefinido ao criar; preenchido ao mover (para se excluir a si próprio) */
  id?: string
  start: string // ISO local "YYYY-MM-DDTHH:mm:ss"
  end: string
}

export interface ExistingBooking {
  id: string
  start: string
  end: string
  /** definido apenas para serviços com janela livre (ex.: Madeixas) */
  freeWindow?: FreeWindowSpec | null
}

export interface PlacementResult {
  ok: boolean
  reason?: string
}

export const PLACEMENT_MESSAGES = {
  freeWindow: 'Não cabe na janela livre desta marcação.',
  overlap: 'Sobreposição com outra marcação.',
  invalid: 'Duração inválida.',
} as const

type Interval = [start: number, end: number]

function toMs(iso: string): number {
  return new Date(iso).getTime()
}

/** Intervalos "bloqueados" (onde nada se pode sobrepor) de uma marcação. */
function blockedIntervals(b: ExistingBooking): Interval[] {
  const start = toMs(b.start)
  const end = toMs(b.end)
  if (!b.freeWindow) return [[start, end]] // bloco sólido: tudo bloqueado
  const { activeBefore, activeAfter } = b.freeWindow
  // Só as pontas ativas bloqueiam — o meio (janela livre) fica disponível.
  return [
    [start, start + activeBefore * MS_PER_MIN],
    [end - activeAfter * MS_PER_MIN, end],
  ]
}

/** Sobreposição estrita: tocar nas extremidades (fim === início) é permitido. */
function overlaps(a: Interval, b: Interval): boolean {
  return a[0] < b[1] && b[0] < a[1]
}

/**
 * Decide se `candidate` pode ser colocado, dadas as marcações existentes da
 * MESMA profissional. Regras:
 *  - blocos sólidos rejeitam qualquer sobreposição;
 *  - serviços com janela livre só aceitam marcações inteiramente dentro do
 *    meio livre (as pontas ativas continuam a bloquear);
 *  - cada marcação colocada dentro de uma janela passa a ser um bloco sólido,
 *    pelo que o tempo restante da janela continua disponível para outra
 *    (sub-intervalos ocupados/livres são tratados automaticamente).
 */
export function canPlaceBooking(
  candidate: PlacementCandidate,
  existing: ExistingBooking[],
): PlacementResult {
  const cand: Interval = [toMs(candidate.start), toMs(candidate.end)]
  if (cand[1] <= cand[0]) return { ok: false, reason: PLACEMENT_MESSAGES.invalid }

  for (const booking of existing) {
    if (candidate.id && booking.id === candidate.id) continue // não colide consigo
    for (const block of blockedIntervals(booking)) {
      if (overlaps(cand, block)) {
        return {
          ok: false,
          reason: booking.freeWindow
            ? PLACEMENT_MESSAGES.freeWindow
            : PLACEMENT_MESSAGES.overlap,
        }
      }
    }
  }
  return { ok: true }
}
