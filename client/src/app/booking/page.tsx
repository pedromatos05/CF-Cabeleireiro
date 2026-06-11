import BookingForm from '@/components/booking/BookingForm'

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="mb-4 text-4xl font-bold text-brown-800">Marcar Consulta</h1>
      <p className="mb-8 text-brown-500">
        Escolha o serviço, o profissional, a data e a hora — em apenas 4 passos.
      </p>
      <BookingForm />
    </div>
  )
}
