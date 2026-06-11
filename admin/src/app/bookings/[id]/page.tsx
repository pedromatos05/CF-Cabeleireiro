export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Detalhe da Marcação</h1>
      <p className="text-gray-600">
        Detalhe completo da marcação <strong>{id}</strong> — serviço, cliente, profissional,
        data/hora, estado e notas. Permite editar ou cancelar.
      </p>
    </div>
  )
}
