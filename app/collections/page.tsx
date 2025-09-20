import collections from '@/data/collections.json'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/header'
import Footer from '@/components/footer'

export const metadata = {
  title: 'Collections — Fauni Bridal',
  description: 'Explore our curated collections.',
}

export default function CollectionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto py-12 px-4 flex-1">
        <header className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl font-semibold">Fauni Bridal Collections</h1>
          <p className="mt-3 text-muted-foreground">Discover curated collections for every moment of your wedding journey.</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c) => (
            <article key={c.id} className="rounded-lg overflow-hidden bg-card shadow-sm">
              <div className="relative h-64 w-full">
                <Image src={c.image} alt={c.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{c.title}</h3>
                <p className="text-muted-foreground mb-4">{c.description}</p>
                <div className="flex items-center justify-between">
                  <Link href="/dresses" className="text-sm underline">View Dresses</Link>
                  <Link href={`/collections/${c.id}`} className="text-sm underline">Learn more</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
