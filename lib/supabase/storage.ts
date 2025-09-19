import { createClient } from './client'
import { v4 as uuidv4 } from 'uuid'

const COLLECTION_IMAGES_BUCKET = 'collection-images'
const DRESS_IMAGES_BUCKET = 'dress-images'

// Initialize storage buckets if they don't exist
export async function initStorage() {
  const supabase = createClient()

  // Create collection images bucket if it doesn't exist
  const { error: collectionError } = await supabase
    .storage
    .createBucket(COLLECTION_IMAGES_BUCKET, {
      public: true,
      fileSizeLimit: 1024 * 1024 * 2, // 2MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    })

  if (collectionError && collectionError.message !== 'Bucket already exists') {
    throw collectionError
  }

  // Create dress images bucket if it doesn't exist
  const { error: dressError } = await supabase
    .storage
    .createBucket(DRESS_IMAGES_BUCKET, {
      public: true,
      fileSizeLimit: 1024 * 1024 * 2, // 2MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    })

  if (dressError && dressError.message !== 'Bucket already exists') {
    throw dressError
  }
}

import type { SupabaseClient } from '@supabase/supabase-js'

async function ensureBucketExists(supabase: SupabaseClient, bucketName: string) {
  try {
    // Try to get bucket (to check if it exists)
    const { data: bucket } = await supabase
      .storage
      .getBucket(bucketName)

    if (!bucket) {
      // Bucket doesn't exist, create it
      const { error: createError } = await supabase
        .storage
        .createBucket(bucketName, {
          public: true,
          fileSizeLimit: 1024 * 1024 * 2, // 2MB
          allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
        })

      if (createError) throw createError
    }
  } catch (error) {
    console.error(`Error ensuring bucket ${bucketName} exists:`, error)
    throw error
  }
}

export async function uploadCollectionImage(file: File) {
  const supabase = createClient()
  
  // Ensure bucket exists before upload
  await ensureBucketExists(supabase, COLLECTION_IMAGES_BUCKET)

  // Generate a unique file name
  const fileExt = file.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`

  // Upload the file
  const { error } = await supabase
    .storage
    .from(COLLECTION_IMAGES_BUCKET)
    .upload(fileName, file)

  if (error) throw error

  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from(COLLECTION_IMAGES_BUCKET)
    .getPublicUrl(fileName)

  return publicUrl
}

export async function uploadDressImage(file: File) {
  const supabase = createClient()
  
  // Ensure bucket exists before upload
  await ensureBucketExists(supabase, DRESS_IMAGES_BUCKET)

  // Generate a unique file name
  const fileExt = file.name.split('.').pop()
  const fileName = `${uuidv4()}.${fileExt}`

  // Upload the file
  const { error } = await supabase
    .storage
    .from(DRESS_IMAGES_BUCKET)
    .upload(fileName, file)

  if (error) throw error

  // Get the public URL
  const { data: { publicUrl } } = supabase
    .storage
    .from(DRESS_IMAGES_BUCKET)
    .getPublicUrl(fileName)

  return publicUrl
}