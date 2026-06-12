import Image from 'next/image'
import Link from 'next/link'
import { serviceCategories } from '@/data/services'

export default function ServiceHighlights() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-3 text-center text-3xl font-bold text-brown-800">Os nossos serviços</h2>
        <p className="mb-12 text-center text-brown-400">
          Cuidados pensados para o seu cabelo
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/booking?category=${category.slug}`}
              className="group block w-full overflow-hidden rounded-xl border border-cream-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.125rem)]"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-brown-800">{category.name}</h3>
                <p className="mt-1 text-sm text-brown-400">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-lg border border-brown-300 px-6 py-3 font-medium text-brown-600 transition-colors hover:bg-cream-50"
          >
            Ver tabela de preços completa →
          </Link>
        </div>
      </div>
    </section>
  )
}
