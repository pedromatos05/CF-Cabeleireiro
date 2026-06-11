import Button from '@/components/ui/Button'

interface StaffPickerProps {
  onBack: () => void
  onNext: () => void
}

export default function StaffPicker({ onBack, onNext }: StaffPickerProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Escolha o profissional</h2>
      <p className="mb-6 text-gray-500">
        Placeholder — lista de profissionais disponíveis para o serviço selecionado, com foto e
        especialidade.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Voltar</Button>
        <Button onClick={onNext}>Continuar</Button>
      </div>
    </div>
  )
}
