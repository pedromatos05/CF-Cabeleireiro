import type { Metadata } from 'next'
import ServiceGallery, { type Service } from '@/components/trabalhos/ServiceGallery'

export const metadata: Metadata = {
  title: 'Trabalhos',
  description: 'Portfólio do CF Cabeleireiro — resultados reais de cor, cortes, penteados e tratamentos.',
}

/* -------------------------------------------------------------------------- */
/*  Serviços com fotos                                                         */
/*                                                                            */
/*  ⬇️ EDITA AQUI: cada serviço tem uma pasta em /client/public/servicos/.     */
/*  A 1ª foto do array é a CAPA mostrada na grelha; ao clicar na capa abre-se  */
/*  o serviço e vê-se as restantes fotos.                                      */
/* -------------------------------------------------------------------------- */

const services: Service[] = [
  {
    name: 'Balayage',
    photos: [
      { src: '/servicos/balayage/1.jpg', alt: 'Balayage — CF Cabeleireiro' },
      { src: '/servicos/balayage/2.jpg', alt: 'Balayage — resultado' },
    ],
  },
  {
    name: 'Blond Balayage',
    photos: [
      { src: '/servicos/blond-balayage/1.jpg', alt: 'Blond balayage — CF Cabeleireiro' },
      { src: '/servicos/blond-balayage/2.jpg', alt: 'Blond balayage — resultado' },
      { src: '/servicos/blond-balayage/3.jpg', alt: 'Blond balayage — detalhe' },
    ],
  },
  {
    name: 'Coloração',
    photos: [
      { src: '/servicos/coloracao/1.jpg', alt: 'Coloração — CF Cabeleireiro' },
      { src: '/servicos/coloracao/2.jpg', alt: 'Coloração — resultado' },
    ],
  },
  {
    name: 'Alisamento',
    photos: [
      { src: '/servicos/alisamento/1.jpg', alt: 'Alisamento — CF Cabeleireiro' },
      { src: '/servicos/alisamento/2.jpg', alt: 'Alisamento — resultado' },
    ],
  },
  {
    name: 'Hidratação Botox',
    photos: [
      { src: '/servicos/hidratacao-botox/1.jpg', alt: 'Hidratação Botox — CF Cabeleireiro' },
      { src: '/servicos/hidratacao-botox/2.jpg', alt: 'Hidratação Botox — resultado' },
    ],
  },
  {
    name: 'Penteado',
    photos: [
      { src: '/servicos/penteado/1.jpg', alt: 'Penteado — CF Cabeleireiro' },
      { src: '/servicos/penteado/2.jpg', alt: 'Penteado — resultado' },
    ],
  },
  {
    name: 'Penteado Infantil',
    photos: [
      { src: '/servicos/penteado-infantil/1.jpg', alt: 'Penteado infantil — CF Cabeleireiro' },
      { src: '/servicos/penteado-infantil/2.jpg', alt: 'Penteado infantil — resultado' },
    ],
  },
]

/* -------------------------------------------------------------------------- */

export default function TrabalhosPage() {
  return (
    <div className="bg-gradient-to-b from-white to-cream-50">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Portfólio
          </p>
          <h1 className="text-3xl font-bold text-brown-800 sm:text-4xl">Os nossos trabalhos</h1>
          <p className="mt-3 text-brown-500">
            Resultados reais do nosso salão. Clique num serviço para ver mais fotos
          </p>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <ServiceGallery services={services} />
      </div>
    </div>
  )
}
