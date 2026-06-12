'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import { serviceCategories, services } from '@/data/services'
import { formatPrice } from '@/lib/utils'

interface ServicePickerProps {
  category?: string
  onNext: () => void
}

export default function ServicePicker({ category, onNext }: ServicePickerProps) {
  const [activeCategory, setActiveCategory] = useState(category)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const visibleCategories = activeCategory
    ? serviceCategories.filter((c) => c.slug === activeCategory)
    : serviceCategories

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold text-brown-800">Escolha o serviço</h2>

      {activeCategory && (
        <p className="mb-6 text-sm text-brown-400">
          A mostrar apenas serviços de{' '}
          <span className="font-medium text-brown-600">
            {visibleCategories[0]?.name}
          </span>
          .{' '}
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
          <div key={cat.slug}>
            <h3 className="mb-3 text-sm font-medium uppercase tracking-widest text-brown-300">
              {cat.name}
            </h3>
            <div className="space-y-2">
              {services
                .filter((service) => service.category === cat.slug)
                .map((service) => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedId(service.id)}
                    className={`flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors ${
                      selectedId === service.id
                        ? 'border-brown-600 bg-cream-50'
                        : 'border-cream-200 bg-white hover:border-brown-300'
                    }`}
                  >
                    <div>
                      <p className="font-medium text-brown-800">{service.name}</p>
                      <p className="text-sm text-brown-400">{service.duration} min</p>
                    </div>
                    <span className="font-semibold text-brown-700">
                      {formatPrice(service.price)}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Button onClick={onNext} disabled={!selectedId}>
          Continuar
        </Button>
      </div>
    </div>
  )
}
