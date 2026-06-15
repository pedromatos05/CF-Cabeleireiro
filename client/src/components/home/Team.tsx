import Image from 'next/image'

// ⬇️ EDITA AQUI: caminho da foto das fundadoras em /client/public/
const donasPhoto = '/FotoDonas.jpg'

// ⬇️ EDITA AQUI: nomes e funções das fundadoras
const founders = [
  { name: 'Francisca', role: 'Cabeleireira & Fundadora' },
  { name: 'Carla', role: 'Cabeleireira & Fundadora' },
]

export default function Team() {
  return (
    <section id="equipa" className="scroll-mt-20 bg-cream-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Quem somos
          </p>
          <h2 className="text-3xl font-bold text-brown-800 sm:text-4xl">A nossa equipa</h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-2 lg:gap-12">
          {/* Foto das fundadoras */}
          <div className="relative aspect-square overflow-hidden rounded-2xl border border-cream-200 bg-gradient-to-br from-brown-200 to-brown-400 shadow-sm">
            {donasPhoto ? (
              <Image
                src={donasPhoto}
                alt="As fundadoras do CF Cabeleireiro"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center px-6 text-center">
                <span className="text-sm font-medium uppercase tracking-wider text-white/90">
                  Foto das fundadoras
                </span>
              </div>
            )}
          </div>

          {/* Texto */}
          <div>
            
            <p className="mt-5 leading-relaxed text-brown-500">
              O CF Cabeleireiro nasce da visão partilhada pela Francisca e pela Carla: criar um espaço de referência 
              onde o cuidado capilar se alia à técnica de excelência. Com uma aposta forte na formação contínua e no 
              uso de produtos de alta cosmética, dedicam-se a proporcionar diagnósticos precisos e resultados de máxima qualidade.
            </p>
            <ul className="mt-6 space-y-3">
              {founders.map((founder, index) => (
                <li key={index} className="border-l-2 border-brown-300 pl-4">
                  <p className="font-bold text-brown-800">{founder.name}</p>
                  <p className="text-sm uppercase tracking-wider text-brown-300">{founder.role}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
