'use client'

import type { StaffMember } from '@/lib/mockData'
import { cn } from '@/lib/utils'

interface TopBarProps {
  staff: StaffMember[]
  selectedStaffId: string
  onSelectStaff: (id: string) => void
  onManageStaff: () => void
}

export default function TopBar({ staff, selectedStaffId, onSelectStaff, onManageStaff }: TopBarProps) {
  return (
    <header className="border-b border-brown-100 bg-white">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-baseline gap-3">
          <h1 className="text-xl font-bold tracking-tight text-brown-800">CF Cabeleireiro</h1>
          <span className="text-sm text-brown-400">Back-office</span>
        </div>

        <div className="flex items-center gap-2">
          <nav className="flex rounded-lg border border-brown-100 bg-brown-50 p-1" aria-label="Profissional">
            {staff.map((member) => (
              <button
                key={member.id}
                onClick={() => onSelectStaff(member.id)}
                className={cn(
                  'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
                  member.id === selectedStaffId
                    ? 'bg-brown-600 text-cream-50 shadow-sm'
                    : 'text-brown-500 hover:bg-brown-100 hover:text-brown-700'
                )}
              >
                {member.name}
              </button>
            ))}
          </nav>

          <button
            onClick={onManageStaff}
            title="Gerir equipa"
            aria-label="Gerir equipa"
            className="rounded-lg border border-brown-200 bg-white p-2 text-brown-500 transition-colors hover:bg-brown-50 hover:text-brown-700"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.34 4.06c.4-1.65 2.92-1.65 3.32 0a1.72 1.72 0 0 0 2.57 1.07c1.46-.89 3.24.89 2.35 2.35a1.72 1.72 0 0 0 1.06 2.57c1.65.4 1.65 2.92 0 3.32a1.72 1.72 0 0 0-1.06 2.57c.89 1.46-.89 3.24-2.35 2.35a1.72 1.72 0 0 0-2.57 1.06c-.4 1.65-2.92 1.65-3.32 0a1.72 1.72 0 0 0-2.57-1.06c-1.46.89-3.24-.89-2.35-2.35a1.72 1.72 0 0 0-1.06-2.57c-1.65-.4-1.65-2.92 0-3.32a1.72 1.72 0 0 0 1.06-2.57c-.89-1.46.89-3.24 2.35-2.35.97.59 2.27.07 2.57-1.07Z"
              />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
