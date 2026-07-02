import Image from 'next/image'
import Reveal from '@/components/ui/Reveal'

export default function SalonAbout() {
  return (
    <section id="sobre" className="scroll-mt-20 bg-gradient-to-b from-white to-cream-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            O nosso espaço
          </p>
          <h2 className="text-3xl font-bold text-brown-800 sm:text-4xl">
            Um espaço pensado para si
          </h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <div className="mx-auto grid max-w-5xl items-stretch gap-10 md:grid-cols-5 lg:gap-12">
          {/* Texto */}
          <div className="flex flex-col justify-center py-8 md:col-span-3 md:py-12">
            <Reveal delay={0}>
              <p className="text-base leading-relaxed text-brown-500">
                Esqueça a confusão típica dos grandes salões. Criámos o CF Cabeleireiro para ser um
                refúgio no seu dia a dia, onde cada cliente tem a nossa dedicação total e um acompanhamento personalizado.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-4 text-base leading-relaxed text-brown-500">
                Trabalhamos de forma transparente, explicando sempre o que o seu cabelo precisa,
                e utilizamos produtos de gama profissional para garantir um resultado duradouro e saudável.
              </p>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-4 text-base leading-relaxed text-brown-500">
                Acreditamos que uma ida ao cabeleireiro deve ser uma experiência de autocuidado.
                O nosso ambiente foi desenhado ao pormenor para lhe proporcionar momentos de
                tranquilidade e bem-estar.
              </p>
            </Reveal>
          </div>

          {/* Foto */}
          <div className="group relative min-h-[340px] w-full overflow-hidden rounded-2xl border border-cream-200 shadow-sm md:col-span-2">
            {/* ⬇️ EDITA AQUI: foto do espaço do salão */}
            <Image
              src="/espaco_CF.jpeg"
              alt="Espaço do salão CF Cabeleireiro"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
