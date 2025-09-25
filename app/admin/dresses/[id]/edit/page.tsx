'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getDressById, updateDress, getCollections } from '@/lib/supabase/queries'
import type { DressWithCollection, Collection } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditDressPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dress, setDress] = useState<DressWithCollection | null>(null)
  const [collections, setCollections] = useState<Collection[]>([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    collection_id: ''
  })

  useEffect(() => {
    loadData()
  }, [params.id])

  const loadData = async () => {
    try {
      const [dressData, collectionsData] = await Promise.all([
        getDressById(params.id as string),
        getCollections()
      ])
      
      if (dressData) {
        setDress(dressData)
        setFormData({
          name: dressData.name,
          description: dressData.description,
          price: dressData.price.toString(),
          image: dressData.image,
          collection_id: dressData.collection_id
        })
      }
      setCollections(collectionsData)
    } catch (error) {
      console.error('Error loading data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const updatedDress = await updateDress(params.id as string, {
        ...formData,
        price: parseInt(formData.price)
      })
      if (updatedDress) {
        router.push('/admin/dresses')
      }
    } catch (error) {
      console.error('Error updating dress:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading dress...</div>
        </div>
      </div>
    )
  }

  if (!dress) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Dress not found</div>
        </div>
      </div>
    )
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
          <h1 className="text-3xl font-bold">Edit Dress</h1>
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
                <ImageUpload
                  value={formData.image}
                  onChange={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  placeholder="Enter image URL or upload a file"
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" disabled={saving}>
                  <Save className="w-4 h-4 mr-2" />
                  {saving ? 'Saving...' : 'Save Changes'}
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
