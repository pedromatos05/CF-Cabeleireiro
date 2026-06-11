import Button from '@/components/ui/Button'

interface DateTimePickerProps {
  onBack: () => void
  onNext: () => void
}

export default function DateTimePicker({ onBack, onNext }: DateTimePickerProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Escolha a data e hora</h2>
      <p className="mb-6 text-gray-500">
        Placeholder — calendário para selecionar data e grelha de slots horários disponíveis para o
        profissional escolhido.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Voltar</Button>
        <Button onClick={onNext}>Continuar</Button>
      </div>
    </div>
  )
}
