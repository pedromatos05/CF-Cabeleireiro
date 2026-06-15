import { MapPinIcon, PhoneIcon, InstagramIcon, ClockIcon } from '@/components/ui/icons'

// ⬇️ EDITA AQUI: dados de contacto do CF Cabeleireiro
const contact = {
  addressLine1: 'R. Victor de Sá, 59',
  addressLine2: '4715-213 Braga',
  phone: '+351 962 902 306',
  phoneHref: 'tel:+351962902306',
  instagram: '@cf.cabeleireiroo',
  instagramUrl: 'https://www.instagram.com/cf.cabeleireiroo',
}

// ⬇️ EDITA AQUI: horário de funcionamento
const schedule = [
  { days: 'Terça a Sexta', hours: '9h30 – 13h00 · 14h30 – 19h00' },
  { days: 'Sábado', hours: '8h00 – 16h00' },
  { days: 'Domingo e Segunda', hours: 'Encerrado' },
]

// ⬇️ EDITA AQUI: troca a morada pela do salão (o mapa atualiza automaticamente)
const mapQuery = 'CF Cabeleireiro, R. Victor de Sá 59, Braga'
const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brown-400 to-brown-600 text-white shadow-md shadow-brown-900/10 ring-1 ring-white/30">
      {children}
    </span>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brown-300">{children}</p>
  )
}

export default function ContactMap() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-gradient-to-b from-white to-cream-50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Onde estamos
          </p>
          <h2 className="text-3xl font-bold text-brown-800 sm:text-4xl">
            Contactos
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <div className="mx-auto grid max-w-6xl items-stretch gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contactos — esquerda */}
          <div>
            <ul className="space-y-7">
              <li className="flex items-start gap-4">
                <IconBadge>
                  <MapPinIcon />
                </IconBadge>
                <div>
                  <Label>Morada</Label>
                  <p className="mt-1 font-semibold uppercase tracking-wide text-brown-800">
                    {contact.addressLine1}
                  </p>
                  <p className="text-sm uppercase tracking-wide text-brown-400">
                    {contact.addressLine2}
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <IconBadge>
                  <PhoneIcon />
                </IconBadge>
                <div>
                  <Label>Telefone</Label>
                  <a
                    href={contact.phoneHref}
                    className="mt-1 block font-semibold tracking-wide text-brown-800 transition-colors hover:text-brown-500"
                  >
                    {contact.phone}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <IconBadge>
                  <InstagramIcon />
                </IconBadge>
                <div>
                  <Label>Instagram</Label>
                  <a
                    href={contact.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-semibold uppercase tracking-wide text-brown-800 transition-colors hover:text-brown-500"
                  >
                    {contact.instagram}
                  </a>
                </div>
              </li>

              <li className="flex items-start gap-4">
                <IconBadge>
                  <ClockIcon />
                </IconBadge>
                <div className="w-full">
                  <Label>Horário</Label>
                  <ul className="mt-2 space-y-1.5">
                    {schedule.map((entry) => (
                      <li
                        key={entry.days}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5"
                      >
                        <span className="font-medium text-brown-700">{entry.days}</span>
                        <span
                          className={
                            entry.hours === 'Encerrado'
                              ? 'text-sm italic text-brown-300'
                              : 'text-sm font-medium text-brown-500'
                          }
                        >
                          {entry.hours}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          {/* Mapa — direita */}
          <div className="min-h-[360px] overflow-hidden rounded-3xl border border-cream-200 shadow-lg shadow-brown-900/5 lg:min-h-[460px]">
            <iframe
              src={mapSrc}
              title="Localização do CF Cabeleireiro no Google Maps"
              className="h-full w-full"
              style={{ border: 0, minHeight: 360 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}
