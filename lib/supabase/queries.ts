import { createClient } from './client'
import type { Collection, Dress, NewCollection, NewDress, DressWithCollection } from '../types/database'

// Collections
export async function getCollections(): Promise<Collection[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching collections:', error)
    return []
  }

  return data || []
}

export async function getCollectionById(id: string): Promise<Collection | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching collection:', error)
    return null
  }

  return data
}

export async function createCollection(collection: NewCollection): Promise<Collection | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .insert(collection)
    .select()
    .single()

  if (error) {
    console.error('Error creating collection:', error)
    return null
  }

  return data
}

export async function updateCollection(id: string, updates: Partial<NewCollection>): Promise<Collection | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('collections')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating collection:', error)
    return null
  }

  return data
}

export async function deleteCollection(id: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('collections')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting collection:', error)
    return false
  }

  return true
}

// Dresses
export async function getDresses(): Promise<DressWithCollection[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .select(`
      *,
      collections (
        id,
        title
      )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching dresses:', error)
    return []
  }

  return data || []
}

export async function getDressesByCollection(collectionId: string): Promise<DressWithCollection[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .select(`
      *,
      collections (
        id,
        title
      )
    `)
    .eq('collection_id', collectionId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching dresses by collection:', error)
    return []
  }

  return data || []
}

export async function getDressById(id: string): Promise<DressWithCollection | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .select(`
      *,
      collections (
        id,
        title
      )
    `)
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching dress:', error)
    return null
  }

  return data
}

export async function createDress(dress: NewDress): Promise<DressWithCollection | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .insert(dress)
    .select(`
      *,
      collections (
        id,
        title
      )
    `)
    .single()

  if (error) {
    console.error('Error creating dress:', error)
    return null
  }

  return data
}

export async function updateDress(id: string, updates: Partial<NewDress>): Promise<DressWithCollection | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('dresses')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      collections (
        id,
        title
      )
    `)
    .single()

  if (error) {
    console.error('Error updating dress:', error)
    return null
  }

  return data
}

export async function deleteDress(id: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase
    .from('dresses')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting dress:', error)
    return false
  }

  return true
}

// Image upload
export async function uploadImage(file: File, path: string): Promise<string | null> {
  const supabase = createClient()
  
  const { data, error } = await supabase.storage
    .from('dress-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    })

  if (error) {
    console.error('Error uploading image:', error)
    return null
  }

  const { data: { publicUrl } } = supabase.storage
    .from('dress-images')
    .getPublicUrl(data.path)

  return publicUrl
}

