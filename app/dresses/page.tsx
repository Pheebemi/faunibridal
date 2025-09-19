"use client"

import Link from 'next/link'
import Image from 'next/image'
import dressesData from '@/data/dresses.json'
import { Badge } from '@/components/ui/badge'
import { ThemeToggle } from '@/components/theme-toggle'

type Dress = {
  id: string
  name: string
  description?: string
  price: number
  image: string
}

const PAGE_SIZE = 6

export default function DressesPage({ searchParams }: { searchParams?: { page?: string } }) {
  const dresses = dressesData as Dress[]
  const page = Math.max(1, Number(searchParams?.page ?? 1))
  const start = (page - 1) * PAGE_SIZE
  const paginated = dresses.slice(start, start + PAGE_SIZE)
  const totalPages = Math.max(1, Math.ceil(dresses.length / PAGE_SIZE))

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-[#D4B098] to-[#C19B7C] rounded-lg flex items-center justify-center">
                <span className="text-white font-serif italic text-lg">F</span>
              </div>
              <div>
                <Link href="/" className="text-xl font-serif italic">Fauni Bridal</Link>
                <div className="text-xs text-muted-foreground -mt-1">Luxury Wedding Dresses</div>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dresses" className="text-sm font-medium">Dresses</Link>
              <Link href="/appointments" className="text-sm font-medium">Book Appointment</Link>
              <Link href="/about" className="text-sm font-medium">Our Story</Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">Featured</Badge>
          <h1 className="text-4xl md:text-5xl font-serif mb-4">Our Dresses</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">Beautifully crafted wedding gowns — browse our selection and click any dress to view details.</p>
        </div>
      </section>

      {/* Grid */}
      <main className="container mx-auto px-4 pb-16">
        <div className="grid gap-8 md:grid-cols-3">
          {paginated.map((dress) => (
            <article key={dress.id} className="group bg-card rounded-lg overflow-hidden shadow-sm">
              <Link href={`/dresses/${dress.id}`} className="block">
                <div className="relative aspect-[4/3]">
                  <Image src={dress.image} alt={dress.name} fill className="object-cover transition-transform group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{dress.name}</h3>
                  <p className="text-muted-foreground mt-1">${dress.price}</p>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <Link key={i} href={`/dresses?page=${i + 1}`} className={`px-3 py-1 rounded ${i + 1 === page ? 'bg-primary text-primary-foreground' : 'bg-muted/10'}`}>
              {i + 1}
            </Link>
          ))}
        </div>
      </main>

      {/* Footer (simplified) */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-[#D4B098] to-[#C19B7C] rounded-lg flex items-center justify-center">
                  <span className="text-white font-serif italic text-sm">F</span>
                </div>
                <div>
                  <span className="text-xl font-serif italic text-foreground">Fauni Bridal</span>
                  <div className="text-xs text-muted-foreground -mt-1">Luxury Wedding Dresses</div>
                </div>
              </div>
              <p className="text-muted-foreground text-sm">Creating timeless moments with exquisite bridal wear.</p>
            </div>
            <div>
              <h3 className="font-serif text-foreground mb-4">Dresses</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>New Arrivals</li>
                <li>Best Sellers</li>
                <li>Exclusive</li>
                <li>Accessories</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-foreground mb-4">Information</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Book Appointment</li>
                <li>Size Guide</li>
                <li>Wedding Timeline</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-foreground mb-4">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>fauninigeria@gmail.com</li>
                <li>08066337880</li>
                <li>Shop No. 1 JBJ Complex, adjacent Mayogwoi Bridge, Hammaruwa Way, Jalingo</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
