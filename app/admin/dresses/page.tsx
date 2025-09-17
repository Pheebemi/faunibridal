import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getDresses } from "@/lib/supabase/api"

export default async function DressesPage() {
  const dresses = await getDresses()

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dresses</h1>
        <Button asChild>
          <Link href="/admin/dresses/new">Add Dress</Link>
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dresses.map((dress) => (
          <Card key={dress.id}>
            <CardHeader>
              <CardTitle>{dress.name}</CardTitle>
              <CardDescription>{dress.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {dress.images?.[0] && (
                <img
                  src={dress.images[0]}
                  alt={dress.name}
                  className="aspect-[16/9] object-cover rounded-lg mb-4"
                />
              )}
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Collection: {dress.collections.name}
                </p>
                <p className="text-lg font-semibold">
                  ${dress.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-4">
                  <Button variant="outline" asChild>
                    <Link href={`/admin/dresses/${dress.id}`}>Edit</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}