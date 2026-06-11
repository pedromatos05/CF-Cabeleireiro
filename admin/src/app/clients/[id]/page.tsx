export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold">Ficha de Cliente</h1>
      <p className="text-gray-600">
        Perfil completo do cliente <strong>{id}</strong> — dados de contacto, notas de cabelo
        (fórmulas de cor, diagnóstico), histórico de visitas e marcações anteriores.
      </p>
    </div>
  )
}
