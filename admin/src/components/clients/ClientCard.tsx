import Link from 'next/link'
import type { Client } from '@/types'
import { formatDate } from '@/lib/utils'

interface ClientCardProps {
  client: Client
}

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <Link
      href={`/clients/${client.id}`}
      className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold text-gray-600">
        {client.name.charAt(0).toUpperCase()}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-900 truncate">{client.name}</p>
        <p className="text-sm text-gray-500 truncate">{client.email}</p>
      </div>
      {client.last_visit && (
        <p className="text-xs text-gray-400 whitespace-nowrap">
          Última visita: {formatDate(client.last_visit)}
        </p>
      )}
    </Link>
  )
}
