import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export async function getBookings(_req: Request, res: Response) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('date', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function getBooking(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ error: 'Booking not found' })
  res.json(data)
}

export async function createBooking(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('bookings')
    .insert(req.body)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

export async function updateBooking(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('bookings')
    .update({ ...req.body, updated_at: new Date().toISOString() })
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function deleteBooking(req: Request, res: Response) {
  const { error } = await supabase.from('bookings').delete().eq('id', req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.status(204).send()
}
