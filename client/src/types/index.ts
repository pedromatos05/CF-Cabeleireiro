export interface Booking {
  id: string
  client_id: string
  service_id: string
  staff_id: string
  date: string
  start_time: string
  end_time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  user_id: string
  name: string
  email: string
  phone: string
  hair_notes: string | null
  created_at: string
  last_visit: string | null
}

export interface Service {
  id: string
  name: string
  description: string
  category: string
  duration: number
  price: number
  is_active: boolean
  created_at: string
}

export interface Staff {
  id: string
  user_id: string | null
  name: string
  email: string
  phone: string
  role: string
  working_hours: Record<string, { start: string; end: string }[]>
  is_active: boolean
  created_at: string
}
