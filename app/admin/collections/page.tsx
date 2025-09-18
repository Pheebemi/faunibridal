import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getCollections } from "@/lib/supabase/api"
import { Database } from "@/lib/supabase/types"

type Collection = Database['public']['Tables']['collections']['Row']

export default async function CollectionsPage() {
  let collections: Collection[] = []
  try {
    collections = await getCollections()
  } catch (error) {
    console.error('Error fetching collections:', error)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Collections</h1>
        <Button asChild>
          <Link href="/admin/collections/new">Add Collection</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Card key={collection.id}>
            <CardHeader>
              <CardTitle>{collection.name}</CardTitle>
              <CardDescription>{collection.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {collection.image_url && (
                <div className="relative aspect-[16/9] mb-4">
                  <Image
                    src={collection.image_url}
                    alt={collection.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div className="flex items-center gap-4">
                <Button variant="outline" asChild>
                  <Link href={`/admin/collections/${collection.id}`}>Edit</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href={`/admin/collections/${collection.id}/dresses`}>
                    View Dresses
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}