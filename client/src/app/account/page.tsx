'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  UserIcon,
  MailIcon,
  PhoneIcon,
  ShieldCheckIcon,
  TrashIcon,
  ScissorsIcon,
  CheckIcon,
  XIcon,
} from '@/components/ui/icons'

type Profile = {
  name: string
  email: string
  phone: string
}

// Marcação pronta para mostrar (resulta de juntar Booking + Service + Staff do Supabase)
type BookingView = {
  id: string
  service: string
  staff: string
  date: string
  time: string
}

export default function AccountPage() {
  // TODO(Supabase): carregar o perfil do utilizador autenticado em vez de começar vazio.
  // Nome e email são constantes (vêm da conta); só o telemóvel é editável.
  const [profile, setProfile] = useState<Profile>({ name: '', email: '', phone: '' })
  const [editingPhone, setEditingPhone] = useState(false)
  const [phoneForm, setPhoneForm] = useState('')

  // TODO(Supabase): carregar as marcações reais do utilizador (sem dados de exemplo).
  const upcomingBookings: BookingView[] = []
  const pastBookings: BookingView[] = []

  const isPhoneValid = /^\d{9}$/.test(phoneForm)

  function startEditingPhone() {
    setPhoneForm(profile.phone)
    setEditingPhone(true)
  }

  function handleSavePhone(e: React.FormEvent) {
    e.preventDefault()
    if (!isPhoneValid) return
    // TODO(Supabase): guardar o novo telemóvel na base de dados.
    setProfile({ ...profile, phone: phoneForm })
    setEditingPhone(false)
  }

  function handleDeleteAccount() {
    // TODO(Supabase): apagar a conta e os dados do utilizador.
  }

  return (
    <div className="lg:h-[calc(100vh_-_4rem)] lg:overflow-hidden">
      <div className="mx-auto flex h-full max-w-[1500px] flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid min-h-0 flex-1 gap-6 lg:grid-cols-12">
          {/* Dados pessoais — esquerda */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col rounded-3xl border border-cream-200 bg-white p-8 shadow-sm">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-100 text-brown-500">
                <UserIcon className="h-7 w-7" />
              </div>

              <p className="mt-6 break-words text-3xl font-bold leading-tight text-brown-800">
                {profile.name || 'Cliente'}
              </p>

              <div className="mt-6 space-y-4">
                {/* Email — constante */}
                <div className="flex items-center gap-3">
                  <MailIcon className="h-5 w-5 flex-none text-brown-400" />
                  <span
                    className={`truncate ${profile.email ? 'text-brown-700' : 'italic text-brown-300'}`}
                  >
                    {profile.email || 'Email por preencher'}
                  </span>
                </div>

                {/* Telemóvel — editável */}
                <div>
                  <div className="flex items-center gap-3">
                    <PhoneIcon className="h-5 w-5 flex-none text-brown-400" />
                    {editingPhone ? (
                      <form onSubmit={handleSavePhone} className="flex flex-1 items-center gap-2">
                        <input
                          type="tel"
                          inputMode="numeric"
                          value={phoneForm}
                          onChange={(e) =>
                            setPhoneForm(e.target.value.replace(/\D/g, '').slice(0, 9))
                          }
                          placeholder="912345678"
                          autoFocus
                          className="w-full rounded-lg border border-cream-300 px-3 py-2 tracking-wide text-brown-800 shadow-sm transition-colors placeholder:text-brown-300 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:ring-offset-1"
                        />
                        <button
                          type="submit"
                          disabled={!isPhoneValid}
                          aria-label="Guardar"
                          title="Guardar"
                          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-green-500 text-white shadow-sm transition hover:bg-green-600 disabled:bg-cream-200 disabled:text-brown-300 disabled:shadow-none"
                        >
                          <CheckIcon className="h-4 w-4" strokeWidth={3} />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingPhone(false)}
                          aria-label="Cancelar"
                          title="Cancelar"
                          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-red-500 text-white shadow-sm transition hover:bg-red-600"
                        >
                          <XIcon className="h-4 w-4" strokeWidth={3} />
                        </button>
                      </form>
                    ) : (
                      <div className="flex flex-1 items-center justify-between gap-2">
                        <span
                          className={`font-medium ${profile.phone ? 'text-brown-700' : 'italic text-brown-300'}`}
                        >
                          {profile.phone || 'Sem telemóvel'}
                        </span>
                        <button
                          type="button"
                          onClick={startEditingPhone}
                          className="text-sm font-medium text-brown-400 underline-offset-2 hover:text-brown-700 hover:underline"
                        >
                          {profile.phone ? 'Alterar' : 'Adicionar'}
                        </button>
                      </div>
                    )}
                  </div>
                  {editingPhone && phoneForm.length > 0 && !isPhoneValid && (
                    <p className="mt-1.5 pl-8 text-xs text-red-500">
                      O número tem de ter 9 dígitos.
                    </p>
                  )}
                </div>
              </div>

              <div className="my-7 h-px bg-cream-100" />

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brown-300">
                <ShieldCheckIcon className="h-4 w-4 flex-none" />
                Acesso seguro CF Cabeleireiro
              </div>

              <button
                onClick={handleDeleteAccount}
                className="mt-auto flex items-center justify-center gap-2 rounded-full border border-red-200 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-red-500 transition-colors hover:bg-red-50"
              >
                <TrashIcon className="h-4 w-4" />
                Apagar conta e dados
              </button>
            </div>
          </div>

          {/* Marcações — direita (único sítio com scroll) */}
          <div className="flex min-h-0 flex-col lg:col-span-8">
            <div className="min-h-0 flex-1 space-y-8 overflow-y-auto pb-2 lg:pr-2">
              <section>
                <SectionLabel>Próximas marcações</SectionLabel>
                {upcomingBookings.length === 0 ? (
                  <EmptyState
                    title="Ainda não tem marcações"
                    description="Quando marcar uma consulta, ela aparece aqui."
                    cta
                  />
                ) : (
                  <div className="space-y-3">
                    {upcomingBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} upcoming />
                    ))}
                  </div>
                )}
              </section>

              <section>
                <SectionLabel>Histórico</SectionLabel>
                {pastBookings.length === 0 ? (
                  <EmptyState
                    title="Sem marcações anteriores"
                    description="O histórico das suas visitas vai aparecer aqui."
                  />
                ) : (
                  <div className="space-y-3">
                    {pastBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} past />
                    ))}
                  </div>
                )}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center gap-3">
      <span className="h-px w-8 bg-brown-400" />
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-brown-400">{children}</p>
    </div>
  )
}

function EmptyState({
  title,
  description,
  cta,
}: {
  title: string
  description: string
  cta?: boolean
}) {
  return (
    <div className="rounded-2xl border border-dashed border-cream-300 bg-white/60 px-6 py-12 text-center">
      <p className="font-semibold text-brown-700">{title}</p>
      <p className="mt-1 text-sm text-brown-400">{description}</p>
      {cta && (
        <Link
          href="/booking"
          className="mt-5 inline-flex items-center justify-center rounded-full bg-brown-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brown-800"
        >
          Fazer marcação
        </Link>
      )}
    </div>
  )
}

function BookingCard({
  booking,
  upcoming,
  past,
}: {
  booking: BookingView
  upcoming?: boolean
  past?: boolean
}) {
  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border border-cream-200 bg-white p-5 shadow-sm ${past ? 'opacity-70' : ''}`}
    >
      <div
        className={`flex h-14 w-14 flex-none items-center justify-center rounded-2xl ${past ? 'bg-cream-100 text-brown-300' : 'bg-brown-800 text-white'}`}
      >
        <ScissorsIcon className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold uppercase tracking-wide text-brown-800">{booking.service}</p>
        <p className="mt-1 text-sm">
          <span className="font-semibold text-brown-500">{booking.date}</span>{' '}
          <span className="font-semibold text-brown-800">{booking.time}</span>{' '}
          <span className="uppercase tracking-wide text-brown-400">com {booking.staff}</span>
        </p>
      </div>
      {upcoming && (
        <button
          type="button"
          aria-label="Cancelar marcação"
          className="flex-none text-brown-300 transition-colors hover:text-red-500"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
