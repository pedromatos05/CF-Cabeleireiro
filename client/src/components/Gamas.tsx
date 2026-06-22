import Image from 'next/image'
import React from 'react'

// NOTA: Atualize esta lista com as informações e nomes de ficheiros corretos
const gamas = [
  {
    nome: 'Gama Nutritive',
    imagem: '', // Quando tiver a imagem, coloque aqui: '/images/gamas/gama-nutritive.jpg'
  },
  {
    nome: 'Gama Résistance',
    imagem: '', 
  },
  {
    nome: 'Gama Blond Absolu',
    imagem: '', 
  },
  // Adicione aqui as outras gamas do seu PDF
]

export default function Gamas() {
  return (
    <section id="gamas" className="py-16 bg-cream-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-brown-800 mb-10">
          As Nossas Gamas de Produtos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gamas.map((gama) => (
            <div key={gama.nome} className="bg-white rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-56 w-full">
                {gama.imagem ? (
                  <Image src={gama.imagem} alt={`Imagem da ${gama.nome}`} fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-cream-200">
                    <span className="text-sm font-medium uppercase tracking-wider text-brown-400">Em breve</span>
                  </div>
                )}
              </div>
              <div className="p-5 text-center">
                <h3 className="text-xl font-semibold text-brown-700">{gama.nome}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}