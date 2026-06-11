import Link from 'next/link'

const NAV = [
  { href: '/', label: 'Dashboard' },
  { href: '/agenda', label: 'Agenda' },
  { href: '/bookings', label: 'Marcações' },
  { href: '/clients', label: 'Clientes' },
  { href: '/services', label: 'Serviços' },
  { href: '/staff', label: 'Equipa' },
  { href: '/reports', label: 'Relatórios' },
  { href: '/notifications', label: 'Notificações' },
  { href: '/settings', label: 'Configurações' },
]

export default function Sidebar() {
  return (
    <aside className="flex w-60 flex-shrink-0 flex-col border-r border-gray-200 bg-white">
      <div className="border-b border-gray-100 px-6 py-5">
        <p className="font-bold text-gray-900">CF Cabeleireiro</p>
        <p className="text-xs text-gray-400">Admin</p>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
