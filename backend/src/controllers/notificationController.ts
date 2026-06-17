import { Request, Response } from 'express'
import { sendEmail } from '../lib/mailer'
import { sendSMS } from '../lib/sms'
import { renderConfirmationEmail } from '../emails/ConfirmationEmail'

/**
 * Envia o email "Marcação confirmada" ao cliente, usando o template
 * React Email (ConfirmationEmail). Chamado pelo admin quando a profissional
 * ACEITA uma marcação (botão, arrastar para a agenda ou "Reenviar confirmação").
 *
 * Body: { clientName, clientEmail, service, date, time, staffName }
 *
 * TODO(Supabase): registar o envio na BD e ler os dados reais da marcação
 * em vez de receber tudo no body.
 */
export async function sendConfirmationEmail(req: Request, res: Response) {
  const { clientName, clientEmail, service, date, time, staffName } = req.body

  if (!clientEmail || !clientName || !service) {
    res.status(400).json({ error: 'Campos em falta: clientEmail, clientName e service são obrigatórios.' })
    return
  }

  try {
    const html = await renderConfirmationEmail({ clientName, service, date, time, staffName })
    const { error } = await sendEmail(clientEmail, 'Marcação confirmada — CF Cabeleireiro', html)

    if (error) {
      console.error('[send-confirmation] Resend recusou o envio:', error)
      res.status(502).json({ error: 'O fornecedor de email recusou o envio.' })
      return
    }

    res.json({ success: true })
  } catch (err) {
    console.error('[send-confirmation] erro inesperado:', err)
    res.status(500).json({ error: 'Falha ao enviar o email de confirmação.' })
  }
}

export async function sendBookingConfirmation(req: Request, res: Response) {
  const { email, phone, clientName, serviceName, date, time } = req.body

  try {
    await Promise.all([
      sendEmail(
        email,
        'Marcação confirmada — CF Cabeleireiro',
        `<p>Olá ${clientName},</p><p>A sua marcação de <strong>${serviceName}</strong> foi confirmada para <strong>${date} às ${time}</strong>.</p><p>Até breve!<br>CF Cabeleireiro</p>`
      ),
      sendSMS(
        phone,
        `CF Cabeleireiro: Marcação confirmada — ${serviceName} a ${date} às ${time}. Até breve!`
      ),
    ])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notifications' })
  }
}

export async function sendBookingReminder(req: Request, res: Response) {
  const { email, phone, clientName, serviceName, date, time } = req.body

  try {
    await Promise.all([
      sendEmail(
        email,
        'Lembrete de marcação — CF Cabeleireiro',
        `<p>Olá ${clientName},</p><p>Lembramos que tem <strong>${serviceName}</strong> agendado para amanhã, <strong>${date} às ${time}</strong>.</p><p>CF Cabeleireiro</p>`
      ),
      sendSMS(
        phone,
        `CF Cabeleireiro: Lembrete — ${serviceName} amanhã às ${time}. Até breve!`
      ),
    ])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notifications' })
  }
}

export async function sendBookingCancellation(req: Request, res: Response) {
  const { email, phone, clientName, serviceName, date, time } = req.body

  try {
    await Promise.all([
      sendEmail(
        email,
        'Marcação cancelada — CF Cabeleireiro',
        `<p>Olá ${clientName},</p><p>A sua marcação de <strong>${serviceName}</strong> a ${date} às ${time} foi cancelada.</p><p>CF Cabeleireiro</p>`
      ),
      sendSMS(phone, `CF Cabeleireiro: Marcação de ${serviceName} a ${date} às ${time} cancelada.`),
    ])
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: 'Failed to send notifications' })
  }
}
