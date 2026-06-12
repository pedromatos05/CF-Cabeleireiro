import Image from 'next/image'

type Brand = {
  name: string
  logo: string
}

// ⬇️ EDITA AQUI: para adicionar uma marca, basta acrescentar uma entrada a esta lista.
const brands: Brand[] = [
  {
    name: 'System Professional',
    logo: '/images/brands/system-professional.jpg',
  },
  {
    name: 'Sebastian Professional',
    logo: '/images/brands/sebastian-professional.webp',
  },
]

export default function BrandLogos() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-brown-300">
          Marcas que utilizamos
        </p>
        <p className="mb-12 text-center text-brown-400">
          Trabalhamos apenas com produtos profissionais de alta qualidade.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex h-40 w-40 items-center justify-center rounded-2xl border border-cream-200 bg-white p-6 shadow-sm sm:h-44 sm:w-44"
            >
              <Image
                src={brand.logo}
                alt={brand.name}
                width={160}
                height={160}
                className="h-full w-full object-contain grayscale opacity-70 transition duration-300 hover:grayscale-0 hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
