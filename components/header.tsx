"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-0">
            <div className="relative h-12 w-36 md:h-14 md:w-44">
              <Image src="/logo-light.png" alt="FAUNi Bridals logo" fill className="block dark:hidden object-contain" priority />
              <Image src="/logo-dark.png" alt="FAUNi Bridals logo" fill className="hidden dark:block object-contain" priority />
            </div>
            <div className="-ml-13">
              <span className="text-xl font-serif italic text-foreground leading-tight">FAUNi Bridals</span>
              <div className="text-xs text-muted-foreground -mt-1">Luxury Wedding Dresses</div>
            </div>
          </div>

          <nav className="hidden md:flex">
            <div className="flex items-center space-x-4">
              <Link href="/dresses" className="text-sm font-medium">Dresses</Link>
              <Link href="/appointments" className="text-sm font-medium">Book Appointment</Link>
              <Link href="/about" className="text-sm font-medium">Our Story</Link>
              <Link href="/gallery" className="text-sm font-medium">Gallery</Link>
              <Link href="/contact" className="text-sm font-medium">Contact</Link>
            </div>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <Button size="sm">Get Started</Button>
          </div>

          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur">
            <div className="px-4 py-4 space-y-2">
              {[
                { href: "/dresses", label: "Dresses" },
                { href: "/appointments", label: "Book Appointment" },
                { href: "/about", label: "Our Story" },
                { href: "/gallery", label: "Gallery" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t">
                <Button className="w-full bg-[#D4B098] hover:bg-[#C19B7C] text-white">Book Appointment</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
