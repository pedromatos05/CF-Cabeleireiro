import Button from '@/components/ui/Button'

interface BookingSummaryProps {
  onBack: () => void
}

export default function BookingSummary({ onBack }: BookingSummaryProps) {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Confirmação</h2>
      <p className="mb-6 text-gray-500">
        Placeholder — resumo completo da marcação (serviço, profissional, data e hora) antes de
        confirmar.
      </p>
      <div className="flex gap-3">
        <Button variant="outline" onClick={onBack}>Voltar</Button>
        <Button>Confirmar marcação</Button>
      </div>
    </div>
  )
}
