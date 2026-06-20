import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative -mt-16 min-h-screen flex items-center justify-center overflow-hidden bg-brown-900">
      <Image
        src="/FotoSalão.png"
        alt="Salão CF Cabeleireiro"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 container mx-auto px-6 text-center">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-cream-200 sm:text-sm">
          CF Cabeleireiro
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          O seu salão de confiança{' '}
          <span className="text-cream-300">em Braga</span>
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base text-cream-200 sm:mt-6 sm:text-lg">
          Um espaço familiar e acolhedor onde cuidamos da saúde do seu cabelo sem pressas.
          Venha relaxar e sinta-se em casa.
        </p>
      </div>

      {/* Botão para a página de tendências — fixo em baixo, ao centro */}
      <Link
        href="/tendencias"
        className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full bg-brown-700 px-7 py-3 text-sm font-semibold text-white shadow-lg ring-1 ring-black/10 transition-colors hover:bg-brown-800"
      >
        Tendências da Estação
      </Link>
    </section>
  )
}
