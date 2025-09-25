'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { getCollectionById, updateCollection } from '@/lib/supabase/queries'
import type { Collection } from '@/lib/types/database'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from '@/components/ui/image-upload'
import { ArrowLeft, Save } from 'lucide-react'

export default function EditCollectionPage() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [collection, setCollection] = useState<Collection | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: ''
  })

  useEffect(() => {
    loadCollection()
  }, [params.id])

  const loadCollection = async () => {
    try {
      const data = await getCollectionById(params.id as string)
      if (data) {
        setCollection(data)
        setFormData({
          title: data.title,
          description: data.description,
          image: data.image
        })
      }
    } catch (error) {
      console.error('Error loading collection:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const updatedCollection = await updateCollection(params.id as string, formData)
      if (updatedCollection) {
        router.push('/admin/collections')
      }
    } catch (error) {
      console.error('Error updating collection:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Loading collection...</div>
        </div>
      </div>
    )
  }

  if (!collection) {
    return (
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">Collection not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/collections">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Edit Collection</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Collection Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Dresses for Sale"
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
                  placeholder="Describe this collection..."
                  rows={4}
                  required
                />
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
                <Link href="/admin/collections">
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
