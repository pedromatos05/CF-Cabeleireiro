export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brown-100">
        <span className="text-2xl">✓</span>
      </div>
      <h1 className="mb-4 text-4xl font-bold text-brown-800">Marcação Confirmada</h1>
      <p className="text-brown-500">
        Ecrã de confirmação — resume os detalhes agendados e informa que receberá confirmação
        por email e SMS.
      </p>
    </div>
  )
}
