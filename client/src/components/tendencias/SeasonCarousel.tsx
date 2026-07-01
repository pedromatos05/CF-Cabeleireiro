import Image from 'next/image'

type SeasonCarouselProps = {
  images: string[]
  alt: string
}

// Carrossel infinito: as fotos andam continuamente de um lado para o outro,
// em ciclo. A lista é duplicada para que a animação (translateX de -50%) faça
// um loop perfeito, sem cortes. As dimensões dos cartões são definidas em
// estilo inline para garantir que não colapsam.
export default function SeasonCarousel({ images, alt }: SeasonCarouselProps) {
  if (images.length === 0) return null

  const track = [...images, ...images]

  return (
    <div className="relative overflow-hidden py-2">
      {/* Esbatimento nas pontas para o movimento parecer contínuo */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-50 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-50 to-transparent sm:w-24" />

      <div className="flex animate-marquee gap-4 sm:gap-6" style={{ width: 'max-content' }}>
        {track.map((src, i) => (
          <div
            key={i}
            className="relative shrink-0 overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 shadow-sm"
            style={{ width: 320, height: 440 }}
          >
            <Image
              src={src}
              alt={`${alt} — ${(i % images.length) + 1}`}
              fill
              sizes="320px"
              quality={85}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
