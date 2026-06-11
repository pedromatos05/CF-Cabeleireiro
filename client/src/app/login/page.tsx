export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream-50">
      <div className="w-full max-w-md px-4">
        <h1 className="mb-2 text-3xl font-bold text-brown-800">Entrar</h1>
        <p className="text-brown-500">
          Autenticação do cliente via Supabase Auth — login com email e password ou magic link.
        </p>
      </div>
    </div>
  )
}
