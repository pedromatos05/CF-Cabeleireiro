import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export async function getServices(_req: Request, res: Response) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('name', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function getService(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('services')
    .select('*')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ error: 'Service not found' })
  res.json(data)
}

export async function createService(req: Request, res: Response) {
  const { data, error } = await supabase.from('services').insert(req.body).select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

export async function updateService(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('services')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function deleteService(req: Request, res: Response) {
  const { error } = await supabase
    .from('services')
    .update({ is_active: false })
    .eq('id', req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.status(204).send()
}
