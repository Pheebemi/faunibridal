'use client'

import Link from 'next/link'
import { useEffect, useState } from "react"
import { getDresses, deleteDress } from "@/lib/supabase/queries"
import type { DressWithCollection } from "@/lib/types/database"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus } from "lucide-react"

export default function DressesAdminPage() {
  const [dresses, setDresses] = useState<DressWithCollection[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDresses()
  }, [])

  const loadDresses = async () => {
    try {
      const data = await getDresses()
      setDresses(data)
    } catch (error) {
      console.error('Error loading dresses:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this dress?')) {
      const success = await deleteDress(id)
      if (success) {
        setDresses(dresses.filter(d => d.id !== id))
      }
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(price)
  }

  if (loading) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">Loading dresses...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dresses</h1>
          <div className="flex gap-2">
            <Link href="/admin/dresses/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Dress
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline">Back to Admin</Button>
            </Link>
          </div>
        </div>

        {dresses.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">No dresses found. Add your first dress!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dresses.map((dress) => (
              <Card key={dress.id} className="overflow-hidden">
                <div className="aspect-square relative">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{dress.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {dress.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold text-green-600">
                        {formatPrice(dress.price)}
                      </span>
                      <Badge variant="secondary">
                        {dress.collections?.title || 'No Collection'}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Link href={`/admin/dresses/${dress.id}/edit`} className="flex-1">
                        <Button size="sm" variant="outline" className="w-full">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(dress.id)}
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