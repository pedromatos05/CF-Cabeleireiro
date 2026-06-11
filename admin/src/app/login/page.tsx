export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-4 text-3xl font-bold">Acesso Admin</h1>
        <p className="text-gray-600">
          Autenticação do administrador via Supabase Auth — restrito a contas com perfil de staff ou
          admin.
        </p>
      </div>
    </div>
  )
}
