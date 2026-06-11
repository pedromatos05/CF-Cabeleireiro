import { Request, Response } from 'express'
import { supabase } from '../lib/supabase'

export async function getClients(_req: Request, res: Response) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('name', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export async function getClient(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', req.params.id)
    .single()
  if (error) return res.status(404).json({ error: 'Client not found' })
  res.json(data)
}

export async function createClient(req: Request, res: Response) {
  const { data, error } = await supabase.from('clients').insert(req.body).select().single()
  if (error) return res.status(400).json({ error: error.message })
  res.status(201).json(data)
}

export async function updateClient(req: Request, res: Response) {
  const { data, error } = await supabase
    .from('clients')
    .update(req.body)
    .eq('id', req.params.id)
    .select()
    .single()
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
}

export async function deleteClient(req: Request, res: Response) {
  const { error } = await supabase.from('clients').delete().eq('id', req.params.id)
  if (error) return res.status(400).json({ error: error.message })
  res.status(204).send()
}
