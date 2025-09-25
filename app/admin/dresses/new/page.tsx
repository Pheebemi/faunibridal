'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createDress, getCollections } from '@/lib/supabase/queries'
import type { Collection } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save } from 'lucide-react'

export default function NewDressPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [collections, setCollections] = useState<Collection[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    collection_id: ''
  })

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      const data = await getCollections()
      setCollections(data)
    } catch (error) {
      console.error('Error loading collections:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const dress = await createDress({
        ...formData,
        price: parseInt(formData.price)
      })
      if (dress) {
        router.push('/admin/dresses')
      }
    } catch (error) {
      console.error('Error creating dress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/dresses">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Add New Dress</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dress Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Dress Name *
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Dress Nhiwo"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe this dress..."
                  rows={4}
                  required
                />
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-2">
                  Price (NGN) *
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="85000"
                  min="0"
                  required
                />
              </div>

              <div>
                <label htmlFor="collection_id" className="block text-sm font-medium mb-2">
                  Collection *
                </label>
                <select
                  id="collection_id"
                  name="collection_id"
                  value={formData.collection_id}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a collection</option>
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id}>
                      {collection.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-2">
                  Image URL *
                </label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  For now, use a URL to an existing image. Image upload will be added later.
                </p>
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Creating...' : 'Create Dress'}
                </Button>
                <Link href="/admin/dresses">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}