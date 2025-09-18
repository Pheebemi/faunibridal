import { createClient } from './client'
import { Database } from './types'

type Collection = Database['public']['Tables']['collections']['Row']
type Dress = Database['public']['Tables']['dresses']['Row']

// Collections API
export async function addCollection(collection: Partial<Collection>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .insert([collection])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateCollection(id: string, collection: Partial<Collection>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .update(collection)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteCollection(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', id)

  if (error) throw error
}

// Dresses API
export async function addDress(dress: Partial<Dress>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .insert([dress])
    .select()
    .single()

  if (error) throw error
  return data
}

export async function updateDress(id: string, dress: Partial<Dress>) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .update(dress)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function deleteDress(id: string) {
  const supabase = createClient()
  const { error } = await supabase
    .from('dresses')
    .delete()
    .eq('id', id)

  if (error) throw error
}