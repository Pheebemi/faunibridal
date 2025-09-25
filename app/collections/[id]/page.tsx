import Header from '@/components/header'
import Footer from '@/components/footer'
import { getCollectionById, getDressesByCollection } from '@/lib/supabase/queries'
import Image from 'next/image'
import Link from 'next/link'
import { formatCurrency } from '@/lib/utils'

export default async function CollectionDetail({ params }: { params: { id: string } }) {
  const [collection, items] = await Promise.all([
    getCollectionById(params.id),
    getDressesByCollection(params.id)
  ])
  
  if (!collection) return <div className="container py-12">Collection not found</div>

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto py-12 px-4 flex-1">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-semibold">{collection.title}</h1>
          <p className="mt-3 text-muted-foreground">{collection.description}</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          {items.length === 0 && <p className="text-center">No dresses found for this collection.</p>}
          {items.map((dress) => (
            <div key={dress.id} className="group relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-500">
              <div className="aspect-[3/4] relative">
                <Image src={dress.image} alt={dress.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-2xl text-white mb-2">{dress.name}</h3>
                  <p className="text-white/80 mb-4 text-sm">{dress.description}</p>
                  <div className="flex items-center justify-between">
                    <Link href={`/dresses/${dress.id}`} className="text-white underline">View Dress</Link>
                    <div className="text-white/90">{formatCurrency(dress.price)}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
