import Button from '@/components/ui/Button'

interface ServicePickerProps {
  onNext: () => void
}

export default function ServicePicker({ onNext }: ServicePickerProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Escolha o serviço</h2>
      <p className="mb-6 text-gray-500">
        Placeholder — lista de serviços disponíveis agrupados por categoria, com nome, duração e preço.
      </p>
      <Button onClick={onNext}>Continuar</Button>
    </div>
  )
}
