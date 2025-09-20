import Link from 'next/link'
import { Facebook, Instagram } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/30 py-12 px-4">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-[#D4B098] to-[#C19B7C] rounded-lg flex items-center justify-center">
                <span className="text-white font-serif italic text-lg">F</span>
              </div>
                <div>
                <span className="text-xl font-serif italic text-foreground">FAUNi Bridals</span>
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
              <li><Link href="/appointments" className="underline">Book Appointment</Link></li>
              <li><Link href="/size-guide" className="underline">Size Guide</Link></li>
              <li><Link href="/wedding-timeline" className="underline">Wedding Timeline</Link></li>
              <li><Link href="/faqs" className="underline">FAQs</Link></li>
              <li><Link href="/about" className="underline">Our Story</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-foreground mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="mailto:fauninigeria@gmail.com" className="underline">fauninigeria@gmail.com</a></li>
              <li>08066337880</li>
              <li>Shop No. 1 JBJ Complex, adjacent Mayogwoi Bridge, Hammaruwa Way, Jalingo</li>
            </ul>
              <div className="mt-4 flex items-center space-x-3">
                <a href="https://www.facebook.com/share/17Ri9mS4Bf/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                  <Facebook />
                </a>
                <a href="https://www.instagram.com/faunibridals?igsh=d250M2plMGdiY2w4&utm_source=qr" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                  <Instagram />
                </a>
                <a href="https://wa.me/2348066337880" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-muted-foreground hover:text-foreground">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.373 0 .02 5.354.02 12c0 2.116.553 4.197 1.603 6.02L0 24l6.22-1.617A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.92-.457-3.74-1.48-5.22z" fill="#25D366" opacity="0.06"/>
                    <path d="M17.472 14.382c-.297-.15-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.966-.942 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.15-.174.2-.298.3-.497.099-.198.05-.372-.025-.522-.075-.149-.672-1.62-.922-2.22-.242-.582-.487-.503-.672-.512l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.48 1.064 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487 2.98 1.287 2.98.858 3.52.806.542-.052 1.758-.72 2.006-1.415.248-.695.248-1.29.173-1.415-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
                  </svg>
                </a>
              </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div className="text-center text-sm text-muted-foreground">© {year} FAUNi Bridals. All rights reserved. | Luxury Wedding Dresses • Bridal Accessories • Bespoke Service</div>
      </div>
    </footer>
  )
}
