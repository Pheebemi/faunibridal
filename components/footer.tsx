import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
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
            <p className="text-muted-foreground text-sm">Creating timeless moments with exquisite bridal wear that celebrates your unique style and beauty.</p>
          </div>
          <div>
            <h3 className="font-serif text-foreground mb-4">Dresses</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/dresses" className="underline">New Arrivals</Link></li>
                <li><Link href="/dresses" className="underline">Best Sellers</Link></li>
                <li><Link href="/dresses" className="underline">Exclusive</Link></li>
                <li><Link href="/dresses" className="underline">Accessories</Link></li>
              </ul>
          </div>
          <div>
            <h3 className="font-serif text-foreground mb-4">Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Book Appointment</li>
              <li>Size Guide</li>
              <li>Wedding Timeline</li>
              <li>FAQs</li>
              <li>Our Story</li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:fauninigeria@gmail.com" className="underline">fauninigeria@gmail.com</a></li>
              <li>08066337880</li>
              <li>Shop No. 1 JBJ Complex, adjacent Mayogwoi Bridge, Hammaruwa Way, Jalingo</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-8">
        <div className="text-center text-sm text-muted-foreground">© {year} Fauni Bridal. All rights reserved. | Luxury Wedding Dresses • Bridal Accessories • Bespoke Service</div>
      </div>
    </footer>
  )
}
