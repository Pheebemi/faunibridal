'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { addDress } from '@/lib/supabase/mutations'

export default function NewDressPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [collectionId, setCollectionId] = useState('')
  const [images, setImages] = useState<string[]>([''])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await addDress({
        name,
        description,
        price: parseFloat(price),
        collection_id: collectionId,
        images: images.filter(Boolean), // Remove empty strings
      })

      router.push('/admin/dresses')
      router.refresh()
    } catch (error) {
      console.error('Error adding dress:', error)
    } finally {
      setLoading(false)
    }
  }

  // Function to add more image URL inputs
  function addImageField() {
    setImages([...images, ''])
  }

  // Function to update an image URL at a specific index
  function updateImage(index: number, value: string) {
    const newImages = [...images]
    newImages[index] = value
    setImages(newImages)
  }

  // Function to remove an image URL input
  function removeImage(index: number) {
    const newImages = images.filter((_, i) => i !== index)
    setImages(newImages)
  }

  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Add New Dress</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="description">
                  Description
                </label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="price">
                  Price
                </label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="collectionId">
                  Collection ID
                </label>
                <Input
                  id="collectionId"
                  value={collectionId}
                  onChange={(e) => setCollectionId(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Images</label>
                {images.map((image, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={image}
                      onChange={(e) => updateImage(index, e.target.value)}
                      placeholder="Image URL"
                    />
                    {index > 0 && (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addImageField}
                >
                  Add Image
                </Button>
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Adding...' : 'Add Dress'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}