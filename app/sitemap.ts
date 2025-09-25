import { MetadataRoute } from 'next'
import { getCollections, getDresses } from '@/lib/supabase/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com' // Replace with your actual domain
  
  // Get dynamic data
  const [collections, dresses] = await Promise.all([
    getCollections(),
    getDresses()
  ])

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/collections`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/dresses`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/appointments`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  // Collection pages
  const collectionPages = collections.map((collection) => ({
    url: `${baseUrl}/collections/${collection.id}`,
    lastModified: new Date(collection.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Dress pages
  const dressPages = dresses.map((dress) => ({
    url: `${baseUrl}/dresses/${dress.id}`,
    lastModified: new Date(dress.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...collectionPages, ...dressPages]
}
