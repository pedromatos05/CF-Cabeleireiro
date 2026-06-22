import { business, siteUrl } from '@/lib/site'

// Dados estruturados (schema.org) para o Google reconhecer o salão como
// negócio local: mostra morada, telefone, horário e liga ao Google Maps.
export default function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    '@id': `${siteUrl}/#salon`,
    name: business.name,
    description: business.description,
    url: siteUrl,
    image: `${siteUrl}/opengraph-image`,
    telephone: business.phone,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      postalCode: business.address.postalCode,
      addressLocality: business.address.city,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: business.openingHours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
      opens: h.opens,
      closes: h.closes,
    })),
    sameAs: [business.instagram],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
