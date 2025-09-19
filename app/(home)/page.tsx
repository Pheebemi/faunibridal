"use client"

import Image from "next/image"
import Link from 'next/link'
import dressesData from '@/data/dresses.json'
import { formatCurrency } from '@/lib/utils'
import { useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Heart,
  Sparkles,
  CalendarHeart,
  Crown,
} from "lucide-react"

export default function HomePage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-to-br from-[#D4B098] to-[#C19B7C] rounded-lg flex items-center justify-center">
                <span className="text-white font-serif italic text-lg">F</span>
              </div>
              <div>
                <span className="text-xl font-serif italic text-foreground">Fauni Bridal</span>
                <div className="text-xs text-muted-foreground -mt-1">Luxury Wedding Dresses</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/collections" className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                    Collections
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/appointments" className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                    Book Appointment
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                    Our Story
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/gallery" className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                    Gallery
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/contact" className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary">
                    Contact
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Button size="sm">Get Started</Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur">
              <div className="px-4 py-4 space-y-2">
                {[
                  { href: "/collections", label: "Collections" },
                  { href: "/appointments", label: "Book Appointment" },
                  { href: "/about", label: "Our Story" },
                  { href: "/gallery", label: "Gallery" },
                  { href: "/contact", label: "Contact" },
                ].map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <div className="pt-4 border-t">
                  <Button className="w-full bg-[#D4B098] hover:bg-[#C19B7C] text-white">Book Appointment</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Carousel Section */}
      <section className="relative min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] overflow-hidden">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {/* Slide 1 */}
            <CarouselItem className="relative h-full">
              <div className="relative h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/dresses/6.jpg')" }}></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0">
                  <div className="absolute top-20 left-10 w-72 h-72 bg-[#D4B098]/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#C19B7C]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pb-20">
                  <div className="mb-8">
                    <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm text-sm px-4 py-2 font-serif">
                      Elegance • Grace • Timeless Beauty
                    </Badge>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight font-serif">
                    <span className="block">Find Your Perfect</span>
                    <span className="block italic text-[#D4B098]">Wedding Dress</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
                    Discover our exquisite collection of handcrafted wedding dresses,
                    designed to make your special day unforgettable.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/dresses">
                      <Button size="lg" className="text-lg px-8 py-6 bg-[#D4B098] hover:bg-[#C19B7C] text-white font-serif">
                        View Dresses
                      </Button>
                    </Link>
                    <Link href="/appointments">
                      <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 border-white/30 text-white hover:bg-white hover:text-[#C19B7C] backdrop-blur-sm font-serif transition-all duration-300">
                        Book Appointment
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 2 */}
            <CarouselItem className="relative h-full">
              <div className="relative h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/dresses/2.jpg')" }}></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0">
                  <div className="absolute top-32 right-20 w-80 h-80 bg-[#D4B098]/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-32 left-20 w-72 h-72 bg-[#C19B7C]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pb-20">
                  <div className="mb-8">
                    <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm text-sm px-4 py-2 font-serif">
                      Classic • Timeless • Elegant
                    </Badge>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight font-serif">
                    <span className="block">Classic Collection</span>
                    <span className="block italic text-[#D4B098]">2025</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
                    Timeless silhouettes and traditional designs that never go out of style.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/dresses">
                      <Button size="lg" className="text-lg px-8 py-6 bg-[#D4B098] hover:bg-[#C19B7C] text-white font-serif">
                        View Dresses
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>

            {/* Slide 3 */}
            <CarouselItem className="relative h-full">
              <div className="relative h-full flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/dresses/3.jpg')" }}></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0">
                  <div className="absolute top-20 right-10 w-96 h-96 bg-[#D4B098]/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute bottom-20 left-10 w-80 h-80 bg-[#C19B7C]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto pb-20">
                  <div className="mb-8">
                    <Badge variant="secondary" className="mb-6 bg-white/10 text-white border-white/20 backdrop-blur-sm text-sm px-4 py-2 font-serif">
                      Modern • Chic • Sophisticated
                    </Badge>
                  </div>
                  <h1 className="text-6xl md:text-8xl font-light mb-8 leading-tight font-serif">
                    <span className="block">Modern Romance</span>
                    <span className="block italic text-[#D4B098]">Collection</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed font-light">
                    Contemporary designs for the modern bride who dares to be different.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link href="/dresses">
                      <Button size="lg" className="text-lg px-8 py-6 bg-[#D4B098] hover:bg-[#C19B7C] text-white font-serif">
                        View Dresses
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </CarouselItem>
          </CarouselContent>

          <CarouselPrevious className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110" />
          <CarouselNext className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-110" />

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
            <div className="flex flex-col items-center space-y-2 text-white/70">
              <span className="text-sm font-medium">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
              </div>
            </div>
          </div>
        </Carousel>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-4 font-serif">Our Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At Fauni Bridal, we believe every bride deserves to feel extraordinary on her special day. Our collection of handcrafted wedding dresses combines timeless elegance with modern sophistication.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#D4B098]/10 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-[#D4B098]" />
                </div>
                <CardTitle className="font-serif">Bespoke Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Each dress is crafted with meticulous attention to detail, ensuring a perfect fit for your unique style.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#D4B098]/10 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-[#D4B098]" />
                </div>
                <CardTitle className="font-serif">Premium Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Using only the finest fabrics and materials to create gowns that feel as luxurious as they look.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#D4B098]/10 rounded-lg flex items-center justify-center mb-4">
                  <CalendarHeart className="h-6 w-6 text-[#D4B098]" />
                </div>
                <CardTitle className="font-serif">Personal Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Our experienced consultants provide personalized styling advice to help you find your dream dress.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-[#D4B098]/10 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="h-6 w-6 text-[#D4B098]" />
                </div>
                <CardTitle className="font-serif">Timeless Elegance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Creating memories that last a lifetime with designs that never go out of style.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Dresses Section */}
      <section id="featured-dresses" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-foreground mb-4 font-serif">Featured Dresses</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Handpicked gowns to inspire your wedding day look.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {dressesData.slice(0, 3).map((dress) => (
              <div key={dress.id} className="group relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-500">
                <div className="aspect-[3/4] relative">
                  <Image src={dress.image} alt={dress.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="font-serif text-2xl text-white mb-2">{dress.name}</h3>
                      <p className="text-white/80 mb-4 text-sm">{formatCurrency(dress.price)}</p>
                      <Link href={`/dresses/${dress.id}`}>
                        <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white text-[#C19B7C] hover:text-[#D4B098] font-serif">View Dress</Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/dresses">
              <Button variant="outline" size="lg" className="font-serif text-[#C19B7C] hover:text-[#D4B098] border-[#C19B7C] hover:border-[#D4B098]">
                View All Dresses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Collections section removed — site now shows dresses only */}



      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-[#D4B098]/5">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl font-light text-foreground mb-4 font-serif">Real Brides</h2>
              <p className="text-xl text-muted-foreground">Hear from our beautiful brides about their experience with Fauni Bridal.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="/dresses/1.jpg"
                      alt="Sarah Johnson"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="font-serif">Sarah Johnson</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    &quot;I felt like a princess in my Fauni Bridal gown. The attention to detail and personalized service made my dress shopping experience unforgettable.&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&h=300&q=80"
                      alt="Emily Chen"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="font-serif">Emily Chen</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    &quot;The team at Fauni Bridal helped me find the perfect dress that matched my style perfectly. I couldn&#39;t be happier with my choice!&quot;
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center p-6 hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=300&h=300&q=80"
                      alt="Lauren Taylor"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardTitle className="font-serif">Lauren Taylor</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground italic">
                    &quot;From the moment I walked in, I knew I was in good hands. The collection is stunning and the service is exceptional.&quot;
                  </p>
                </CardContent>
              </Card>
            </div>

            <Button
              variant="outline"
              size="lg"
              className="font-serif text-[#C19B7C] hover:text-[#D4B098] border-[#C19B7C] hover:border-[#D4B098]"
            >
              Read More Stories
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Get In Touch</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to find your dream dress? Visit our showroom or reach out using the contact details below.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Email Us</h3>
                  <p className="text-muted-foreground">fauninigeria@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Call Us</h3>
                  <p className="text-muted-foreground">08066337880 • 08027289376</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Visit Us</h3>
                  <p className="text-muted-foreground">Shop No. 1 JBJ Complex, adjacent Mayogwoi Bridge, Hammaruwa Way, Jalingo</p>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>We&#39;d love to hear from you. Send us a message and we&#39;ll respond as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                  <input type="text" placeholder="Last Name" className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                </div>
                <input type="email" placeholder="Email Address" className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <textarea placeholder="Your Message" rows={4} className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                <li>Our Story</li>
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
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">© 2025 Fauni Bridal. All rights reserved. | Luxury Wedding Dresses • Bridal Accessories • Bespoke Service</div>
        </div>
      </footer>
    </div>
  )
}


