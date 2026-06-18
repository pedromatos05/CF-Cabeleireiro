import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CookieBanner from '@/components/layout/CookieBanner'

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'CF Cabeleireiro · Cabeleireiro e Estética em Braga',
    template: '%s · CF Cabeleireiro',
  },
  description:
    'CF Cabeleireiro — salão de cabeleireiro e estética em Braga. Corte, cor, tratamentos, massagens, manicure, epilação e maquilhagem. Faça o seu pedido de marcação online.',
  keywords: [
    'cabeleireiro Braga',
    'estética Braga',
    'salão de beleza Braga',
    'marcação online',
    'CF Cabeleireiro',
  ],
  applicationName: 'CF Cabeleireiro',
  openGraph: {
    title: 'CF Cabeleireiro · Cabeleireiro e Estética em Braga',
    description:
      'Salão de cabeleireiro e estética em Braga. Faça o seu pedido de marcação online.',
    locale: 'pt_PT',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt"
      data-scroll-behavior="smooth"
      className={`${sans.variable} ${display.variable}`}
    >
      <body>
        <Navbar />
        <main className="pt-16">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  )
}
