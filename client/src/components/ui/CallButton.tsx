import { business } from '@/data/legal'
import { PhoneIcon } from '@/components/ui/icons'

// Botão "Ligar para Marcar" — usado na página inicial e na página de Noivas.
export default function CallButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={business.phoneHref}
      className={`inline-flex items-center justify-center gap-2 rounded-full bg-brown-700 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-brown-800 ${className}`}
    >
      <PhoneIcon className="h-5 w-5" />
      Ligar para Marcar
    </a>
  )
}
