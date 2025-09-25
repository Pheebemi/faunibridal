'use client'

import { useEffect, useState } from 'react'
import { getCollections } from '@/lib/supabase/queries'

export default function DebugPage() {
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('Testing Supabase connection...')
        console.log('SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('SUPABASE_ANON_KEY:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing')
        
        const data = await getCollections()
        console.log('Collections data:', data)
        setCollections(data)
      } catch (err) {
        console.error('Connection error:', err)
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    testConnection()
  }, [])

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Connection Error</h1>
        <p className="text-red-500">{error}</p>
        <div className="mt-4">
          <h2 className="font-bold">Environment Variables:</h2>
          <p>SUPABASE_URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || 'Missing'}</p>
          <p>SUPABASE_ANON_KEY: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing'}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug - Collections Data</h1>
      <p className="mb-4">Found {collections.length} collections</p>
      
      <div className="space-y-4">
        {collections.map((col) => (
          <div key={col.id} className="border p-4 rounded">
            <h3 className="font-bold">{col.title}</h3>
            <p className="text-sm text-gray-600">{col.description}</p>
            <p className="text-sm text-blue-600">Image: {col.image}</p>
            <p className="text-sm text-gray-500">ID: {col.id}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
