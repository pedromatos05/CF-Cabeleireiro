export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Perfil do Profissional</h1>
      <p className="text-gray-600">
        Perfil detalhado do profissional <strong>{id}</strong> — dados de contacto, horário de
        trabalho por dia da semana e marcações atribuídas.
      </p>
    </div>
  )
}
