import { getDressById } from '@/lib/supabase/queries'
import type { DressWithCollection } from '@/lib/types/database'
import Image from 'next/image'
import Link from 'next/link'
import { ThemeToggle } from '@/components/theme-toggle'
import { formatCurrency } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default async function DressPage({ params }: { params: { id: string } }) {
  const dress: DressWithCollection | null = await getDressById(params.id)

  if (!dress) {
    return (
      <div className="container py-8">
        <h1 className="text-2xl font-bold">Dress not found</h1>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-[#D4B098] to-[#C19B7C] rounded-lg flex items-center justify-center">
                <span className="text-white font-serif italic text-lg">F</span>
              </div>
              <div>
                <Link href="/" className="text-xl font-serif italic">FAUNi Bridals</Link>
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

      <main className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
            <Image src={dress.image} alt={dress.name} fill className="object-cover" />
            {/* Collection Badge on Image */}
            {dress.collections && (
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 text-[#C19B7C] font-serif backdrop-blur-sm">
                  {dress.collections.title}
                </Badge>
              </div>
            )}
          </div>

          <div>
            <div className="mb-4">
              {/* Collection Badge above title */}
              {dress.collections && (
                <Badge variant="secondary" className="mb-3 font-serif">
                  {dress.collections.title}
                </Badge>
              )}
              <h1 className="text-3xl font-serif mb-2">{dress.name}</h1>
            </div>
            
            <p className="text-muted-foreground text-lg mb-4">{formatCurrency(dress.price)}</p>
            <p className="mb-6">{dress.description}</p>

            <div className="flex items-center gap-4">
              <Button>Book Appointment</Button>
              <Link href="/dresses">
                <Button variant="outline">Back to Dresses</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-br from-[#D4B098] to-[#C19B7C] rounded-lg flex items-center justify-center">
                  <span className="text-white font-serif italic text-sm">F</span>
                </div>
                <div>
                  <span className="text-xl font-serif italic text-foreground">FAUNi Bridals</span>
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
