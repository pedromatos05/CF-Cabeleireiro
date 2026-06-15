import Image from 'next/image'

type Brand = {
  name: string
  logo: string
  description: string
  imgClass?: string // ajuste fino de posição do logótipo dentro do círculo
}

// ⬇️ EDITA AQUI: para adicionar uma marca, basta acrescentar uma entrada a esta lista.
const brands: Brand[] = [
  {
    name: 'System Professional',
    logo: '/unnamed-removebg-preview.png',
    description: 'Cuidados capilares de alta performance e personalizados para o seu cabelo. Utilizamos fórmulas científicas avançadas para reparar profundamente a fibra capilar e garantir um brilho saudável e duradouro.',
    imgClass: '-translate-y-[7%]',
  },
  {
    name: 'Sebastian Professional',
    logo: '/images/brands/sebastian-professional.webp',
    description: 'Produtos inovadores para styling irreverente e texturas únicas. Ideais para criar looks modernos, combinando fixação flexível e movimento sem comprometer a saúde do seu cabelo.',
  },
]

export default function BrandLogos() {
  return (
    <section className="bg-gradient-to-b from-cream-50 to-white py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-brown-800 sm:text-4xl">
            As marcas que utilizamos
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
          <p className="mx-auto mt-4 max-w-xl text-brown-400">
            Trabalhamos apenas com produtos profissionais de alta qualidade.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {brands.map((brand) => (
            <div key={brand.name} className="group flex max-w-xs flex-col items-center text-center">
              <div
                className="flex h-48 w-48 items-center justify-center rounded-full border border-cream-200 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-brown-200 hover:shadow-xl sm:h-56 sm:w-56"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={180}
                  height={180}
                  className={`h-full w-full object-contain grayscale transition-all duration-500 group-hover:scale-110 group-hover:grayscale-0 ${brand.imgClass ?? ''}`}
                />
              </div>
              <h3 className="mt-6 text-lg font-bold text-brown-800">{brand.name}</h3>
              <p className="mt-2 text-sm text-brown-500">{brand.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
