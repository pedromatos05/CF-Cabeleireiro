'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { serviceCategories, serviceMenu } from '@/data/services'
import { withAmp } from '@/lib/text'

interface ServicePickerProps {
  category?: string
  onNext: (service: string) => void
}

export default function ServicePicker({ category, onNext }: ServicePickerProps) {
  const initialName = category
    ? serviceCategories.find((c) => c.slug === category)?.name
    : undefined

  const [activeCategory, setActiveCategory] = useState<string | undefined>(initialName)
  const [selected, setSelected] = useState<string | null>(null)

  const visibleCategories = activeCategory
    ? serviceMenu.filter((c) => c.name === activeCategory)
    : serviceMenu

  return (
    <div className="pb-28">
      <h2 className="mb-4 text-xl font-semibold text-brown-800">Escolha o serviço</h2>

      {activeCategory && (
        <p className="mb-6 text-sm text-brown-400">
          A mostrar apenas serviços de{' '}
          <span className="font-medium text-brown-600">{activeCategory}</span>.{' '}
          <button
            type="button"
            onClick={() => setActiveCategory(undefined)}
            className="font-medium text-brown-600 underline hover:text-brown-700"
          >
            Ver todos os serviços
          </button>
        </p>
      )}

      <div className="space-y-8">
        {visibleCategories.map((cat) => (
          <div key={cat.name}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-widest text-brown-300">
              {withAmp(cat.name)}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {cat.items.map((item) => {
                const isSelected = selected === item
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setSelected(item)}
                    aria-pressed={isSelected}
                    className={`flex items-center justify-between gap-3 rounded-lg border p-4 text-left transition-colors ${
                      isSelected
                        ? 'border-brown-600 bg-cream-50 ring-1 ring-brown-600'
                        : 'border-cream-200 bg-white hover:border-brown-300'
                    }`}
                  >
                    <span
                      className={`font-medium ${isSelected ? 'text-brown-800' : 'text-brown-700'}`}
                    >
                      {item}
                    </span>
                    <span
                      className={`flex h-5 w-5 flex-none items-center justify-center rounded-full border transition-colors ${
                        isSelected
                          ? 'border-brown-600 bg-brown-600 text-white'
                          : 'border-cream-300'
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="h-3 w-3"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Barra fixa em baixo com o serviço selecionado */}
      {selected && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream-200 bg-white/95 shadow-[0_-4px_20px_rgba(38,21,8,0.06)] backdrop-blur-sm">
          <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-4 py-4">
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-[0.2em] text-brown-300">
                Serviço selecionado
              </p>
              <p className="truncate font-semibold text-brown-800">{selected}</p>
            </div>
            <Button onClick={() => selected && onNext(selected)}>Continuar</Button>
          </div>
        </div>
      )}
    </div>
  )
}
