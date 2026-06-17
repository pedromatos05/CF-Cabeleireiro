import * as React from 'react'
import { render } from '@react-email/render'
import { Text, Section, Row, Column } from '@react-email/components'
import { BaseLayout } from './components/BaseLayout'
import { brand } from './theme'

export interface ConfirmationEmailProps {
  clientName: string
  service: string
  date: string
  time: string
  staffName: string
}

/** Email "Marcação confirmada". Usa o layout base partilhado. */
export default function ConfirmationEmail({
  clientName,
  service,
  date,
  time,
  staffName,
}: ConfirmationEmailProps) {
  return (
    <BaseLayout previewText={`Marcação confirmada — ${service} a ${date}`}>
      <Text style={greetingStyle}>Olá {clientName},</Text>
      <Text style={paragraphStyle}>
        Temos boas notícias: a sua marcação está <strong>confirmada</strong>. Deixamos aqui os
        detalhes:
      </Text>

      <Section style={detailsBoxStyle}>
        <DetailRow label="Serviço" value={service} />
        <DetailRow label="Data" value={date} />
        <DetailRow label="Hora" value={time} />
        <DetailRow label="Profissional" value={staffName} />
      </Section>

      <Text style={paragraphStyle}>
        Se precisar de remarcar ou tiver alguma questão, é só responder a este email. Estamos a
        contar consigo!
      </Text>
      <Text style={signoffStyle}>Até breve,<br />Equipa CF Cabeleireiro</Text>
    </BaseLayout>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <Row style={detailRowStyle}>
      <Column style={detailLabelStyle}>{label}</Column>
      <Column style={detailValueStyle}>{value}</Column>
    </Row>
  )
}

// Props de pré-visualização para o `react-email dev` (opcional, só para DX).
ConfirmationEmail.PreviewProps = {
  clientName: 'Maria Silva',
  service: 'Coloração',
  date: 'sexta-feira, 20 de junho',
  time: '14:30',
  staffName: 'Funcionária 1',
} satisfies ConfirmationEmailProps

/**
 * Renderiza o template para HTML pronto a enviar.
 * Reutilizável: o controller chama esta função e passa o HTML ao mailer.
 */
export async function renderConfirmationEmail(props: ConfirmationEmailProps): Promise<string> {
  return render(<ConfirmationEmail {...props} />, { pretty: true })
}

// ---- Estilos inline --------------------------------------------------------

const greetingStyle: React.CSSProperties = {
  color: brand.brown800,
  fontSize: 18,
  fontWeight: 600,
  margin: '0 0 12px',
}

const paragraphStyle: React.CSSProperties = {
  color: brand.brown700,
  fontSize: 15,
  lineHeight: '24px',
  margin: '0 0 16px',
}

const detailsBoxStyle: React.CSSProperties = {
  backgroundColor: brand.cream50,
  border: `1px solid ${brand.brown100}`,
  borderRadius: 10,
  padding: '8px 16px',
  margin: '8px 0 20px',
}

const detailRowStyle: React.CSSProperties = {
  borderBottom: `1px solid ${brand.brown100}`,
}

const detailLabelStyle: React.CSSProperties = {
  color: brand.brown400,
  fontSize: 13,
  fontWeight: 600,
  padding: '10px 0',
  width: '40%',
  verticalAlign: 'top',
}

const detailValueStyle: React.CSSProperties = {
  color: brand.brown800,
  fontSize: 14,
  fontWeight: 600,
  padding: '10px 0',
  textAlign: 'right',
}

const signoffStyle: React.CSSProperties = {
  color: brand.brown700,
  fontSize: 15,
  lineHeight: '24px',
  margin: '24px 0 0',
}
