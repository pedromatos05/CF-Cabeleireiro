import Image from 'next/image'

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
          CF Cabeleireiro
        </p>
        <h1 className="text-5xl font-bold tracking-tight text-white">
          O seu salão de confiança{' '}
          <span className="text-cream-300">em Braga</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-cream-200">
          Um espaço familiar e acolhedor onde cuidamos da saúde do seu cabelo sem pressas. 
          Venha relaxar e sinta-se em casa.
        </p>
      </div>
    </section>
  )
}
