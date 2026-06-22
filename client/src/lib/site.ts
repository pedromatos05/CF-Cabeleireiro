// URL público do site (usado em metadata, sitemap e robots).
//
// ⬇️ EM PRODUÇÃO: define a variável de ambiente NEXT_PUBLIC_SITE_URL com o
// domínio final (ex.: https://www.cfcabeleireiro.pt). Enquanto não existir,
// usa-se o valor abaixo como placeholder — atualiza-o quando tiveres o domínio.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.cfcabeleireiro.pt'
).replace(/\/$/, '')

// Dados do salão usados nos dados estruturados (JSON-LD) e na partilha.
// ⬇️ Mantém estes valores em sintonia com o componente de contactos (ContactMap).
export const business = {
  name: 'CF Cabeleireiro',
  description:
    'Salão de cabeleireiro e estética em Braga. Corte, cor, tratamentos, massagens, manicure, epilação e maquilhagem.',
  phone: '+351962902306',
  instagram: 'https://www.instagram.com/cf.cabeleireiroo',
  address: {
    street: 'R. Victor de Sá, 59',
    postalCode: '4715-213',
    city: 'Braga',
    country: 'PT',
  },
  // Horário (formato schema.org: 24h). Domingo e Segunda encerrado.
  openingHours: [
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:30', closes: '13:00' },
    { days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '14:30', closes: '19:00' },
    { days: ['Saturday'], opens: '08:00', closes: '16:00' },
  ],
} as const
