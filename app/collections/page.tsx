import collections from '@/data/collections.json'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Collections — FAUNi Bridals',
  description: 'Explore our curated collections.',
}

export default function CollectionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto py-12 px-4 flex-1">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-semibold">FAUNi Bridals Collections</h1>
          <p className="mt-3 text-muted-foreground">Discover curated collections for every moment of your wedding journey.</p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {collections.map((col) => (
            <div key={col.id} className="group relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-500">
              <div className="aspect-[3/4] relative">
                <Image src={col.image} alt={col.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="font-serif text-2xl text-white mb-2">{col.title}</h3>
                  <p className="text-white/80 mb-4 text-sm">{col.description}</p>
                  <div className="flex gap-3">
                    <Link href={`/collections/${col.id}`}>
                      <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-[#C19B7C] hover:text-[#D4B098] font-serif">Learn More</Button>
                    </Link>
                    <Link href={`/dresses?collection=${col.id}`}>
                      <Button variant="outline" size="sm" className="font-serif text-[#C19B7C] hover:text-[#D4B098] border-[#C19B7C]">View Dresses</Button>
                    </Link>
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
