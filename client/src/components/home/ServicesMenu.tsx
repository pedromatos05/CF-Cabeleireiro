import { serviceMenu } from '@/data/services'
import { withAmp } from '@/lib/text'

export default function ServicesMenu() {
  return (
    <section id="servicos" className="scroll-mt-20 bg-gradient-to-b from-white to-cream-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-brown-300">
            Tabela de Serviços
          </p>
          <h2 className="text-3xl font-bold text-brown-800 sm:text-4xl">Os nossos serviços</h2>
          <div className="mx-auto mt-4 h-px w-16 bg-brown-300" />
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {serviceMenu.map((category) => (
            <div key={category.name}>
              <h3 className="text-center text-lg font-bold uppercase tracking-[0.2em] text-brown-700">
                {withAmp(category.name)}
              </h3>
              <span className="mx-auto mt-2 block h-px w-10 bg-brown-300" />
              <ul className="mt-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="group border-b border-dashed border-cream-200 py-2.5 text-center last:border-0"
                  >
                    <span className="relative inline-block text-brown-500 transition-colors duration-300 group-hover:text-brown-800">
                      {item}
                      <span className="absolute -bottom-px left-1/2 h-px w-0 -translate-x-1/2 bg-brown-300 transition-all duration-300 group-hover:w-full" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
