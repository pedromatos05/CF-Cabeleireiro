import { Request, Response } from 'express'
import { sendEmail } from '../lib/mailer'
import { sendSMS } from '../lib/sms'

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
