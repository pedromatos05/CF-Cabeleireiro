import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export async function getStaffList(_req: Request, res: Response) {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function getStaffMember(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ error: 'Staff member not found' })
  res.json(data)
}

export async function createStaffMember(req: Request, res: Response) {
  const { data, error } = await supabase.from('staff').insert(req.body).select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

export async function updateStaffMember(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('staff')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function deleteStaffMember(req: Request, res: Response) {
  const { error } = await supabase
    .from('staff')
    .update({ is_active: false })
    .eq('id', req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.status(204).send()
}
