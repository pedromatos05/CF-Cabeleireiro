// URL público do site (usado em metadata, sitemap e robots).
//
// ⬇️ EM PRODUÇÃO: idealmente define a variável de ambiente NEXT_PUBLIC_SITE_URL
// com o domínio final. Se não existir, usa-se o domínio real abaixo.
// IMPORTANTE: tem de ser EXATAMENTE o domínio que serve o site (com/sem www),
// senão os canonical/sitemap apontam para o sítio errado e prejudicam o SEO.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cf-cabeleireiro.pt'
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
