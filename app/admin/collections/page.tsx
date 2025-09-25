'use client'

import Link from "next/link"
import { useEffect, useState } from "react"
import { getCollections, deleteCollection } from "@/lib/supabase/queries"
import type { Collection } from "@/lib/types/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus } from "lucide-react"

export default function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCollections()
  }, [])

  const loadCollections = async () => {
    try {
      const data = await getCollections()
      setCollections(data)
    } catch (error) {
      console.error('Error loading collections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      const success = await deleteCollection(id)
      if (success) {
        setCollections(collections.filter(c => c.id !== id))
      }
    }
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading collections...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Collections</h1>
          <div className="flex gap-2">
            <Link href="/admin/collections/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Collection
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline">Back to Admin</Button>
            </Link>
          </div>
        </div>

        {collections.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No collections found. Create your first collection!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Card key={collection.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{collection.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {collection.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary">
                      ID: {collection.id}
                    </Badge>
                    <div className="flex gap-2">
                      <Link href={`/admin/collections/${collection.id}/edit`}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(collection.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}