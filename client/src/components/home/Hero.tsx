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
      <div className="relative z-10 container mx-auto px-4 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-cream-200">
          Braga
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          O seu cabelo,{' '}
          <span className="text-cream-300">a nossa arte</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-cream-200">
          Placeholder — headline e subtítulo do salão, com chamada para marcação e imagem de fundo.
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Link
            href="/booking"
            className="rounded-lg bg-brown-600 px-6 py-3 font-medium text-white hover:bg-brown-700"
          >
            Marcar agora
          </Link>
          <Link
            href="/services"
            className="rounded-lg border border-white/50 px-6 py-3 font-medium text-white hover:bg-white/10"
          >
            Ver serviços
          </Link>
        </div>
      </div>
    </section>
  )
}
