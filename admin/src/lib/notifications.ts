import type { Appointment, ConfirmationChannel } from './mockData'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export interface SendResult {
  ok: boolean
  error?: string
}

type ConfirmationBooking = Appointment & {
  clientEmail?: string
  serviceName: string
  staffName: string
}

/**
 * Envia a confirmação da marcação ao cliente.
 *
 * - canal "email": faz POST real ao backend (Resend) → email "Marcação confirmada".
 * - canal "whatsapp": ainda simulado (sem API paga ligada).
 *
 * TODO(Supabase): quando as marcações forem reais, enviar apenas o id e deixar
 * o backend ler os dados da BD em vez de receber tudo no body.
 */
export async function sendConfirmation(
  booking: ConfirmationBooking,
  channel: ConfirmationChannel
): Promise<SendResult> {
  if (channel === 'whatsapp') {
    // TODO(Twilio/WhatsApp): ligar a API de WhatsApp. Por agora apenas simula.
    console.log(`[sendConfirmation] (WhatsApp simulado) para ${booking.clientPhone}: ${booking.serviceName}`)
    return { ok: true }
  }

  if (!booking.clientEmail) {
    return { ok: false, error: 'A cliente não tem email registado.' }
  }

  const start = new Date(booking.start)
  const date = start.toLocaleDateString('pt-PT', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
  const time = start.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })

  try {
    const res = await fetch(`${API_URL}/api/notifications/send-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        clientName: booking.clientName,
        clientEmail: booking.clientEmail,
        service: booking.serviceName,
        date,
        time,
        staffName: booking.staffName,
      }),
    })

    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      return { ok: false, error: data.error || `Erro ${res.status} do servidor.` }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Não foi possível contactar o servidor de email.' }
  }
}
