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
        <p className="animate-rise mb-3 text-xs font-medium uppercase tracking-widest text-cream-200 sm:text-sm">
          CF Cabeleireiro
        </p>
        <h1 className="animate-rise rise-delay-1 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          O seu salão de confiança{' '}
          <span className="text-cream-300">em Braga</span>
        </h1>
        <p className="animate-rise rise-delay-2 mx-auto mt-5 max-w-xl text-base text-cream-200 sm:mt-6 sm:text-lg">
          Um espaço familiar e acolhedor onde cuidamos da saúde do seu cabelo sem pressas.
          Venha relaxar e sinta-se em casa.
        </p>
      </div>

      {/* Botão de tendências e indicador de scroll (agrupados e centrados em baixo) */}
      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-8">
        <Link
          href="/tendencias"
          className="animate-aura block whitespace-nowrap rounded-full bg-brown-700 px-6 py-3 text-sm font-semibold text-white ring-1 ring-black/10 transition-colors hover:bg-brown-800"
        >
          Tendências da Estação
        </Link>
        {/* Indicador de scroll — desaparece ao fazer scroll */}
        <div className="animate-bounce opacity-60">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
