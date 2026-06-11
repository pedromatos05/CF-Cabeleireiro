export default function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
      <p className="text-sm text-gray-500">
        {new Date().toLocaleDateString('pt-PT', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-gray-200" />
      </div>
    </header>
  )
}
