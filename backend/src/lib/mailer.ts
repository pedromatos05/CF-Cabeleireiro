import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Endereço de remetente ("from").
 *
 * IMPORTANTE: tem de pertencer a um domínio VERIFICADO na Resend
 * (painel Resend → Domains → adicionar `cfcabeleireiro.pt` e configurar os
 * registos DNS de SPF/DKIM). Enquanto o domínio não estiver verificado, a
 * Resend só permite enviar a partir de `onboarding@resend.dev` e apenas para
 * o email da própria conta — usar isso só para testes.
 *
 * Em produção, definir EMAIL_FROM no .env, ex.: "CF Cabeleireiro <marcacoes@cfcabeleireiro.pt>".
 */
const FROM = process.env.EMAIL_FROM || 'CF Cabeleireiro <marcacoes@cfcabeleireiro.pt>'

export async function sendEmail(to: string, subject: string, html: string) {
  return resend.emails.send({ from: FROM, to, subject, html })
}
