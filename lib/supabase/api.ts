import { createClient } from './server-client'
import { Database } from './types'

type Collection = Database['public']['Tables']['collections']['Row']
type Dress = Database['public']['Tables']['dresses']['Row']

// Collections API
export async function getCollections() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Collection[]
}

export async function getFeaturedCollections() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as Collection[]
}

export async function getCollectionBySlug(slug: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) throw error
  return data as Collection
}

// Dresses API
export async function getDresses(collectionId?: string) {
  const supabase = createClient()
  const query = supabase
    .from('dresses')
    .select('*, collections(*)')
    .order('created_at', { ascending: false })

  if (collectionId) {
    query.eq('collection_id', collectionId)
  }

  const { data, error } = await query

  if (error) throw error
  return data as (Dress & { collections: Collection })[]
}

export async function getFeaturedDresses() {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .select('*, collections(*)')
    .eq('is_featured', true)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data as (Dress & { collections: Collection })[]
}

export async function getDressById(id: string) {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .select('*, collections(*)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as (Dress & { collections: Collection })
}