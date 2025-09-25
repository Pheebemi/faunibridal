import Image from "next/image"
import Link from 'next/link'
import { getCollections } from '@/lib/supabase/queries'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroCarousel } from "@/components/hero-carousel"
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Sparkles,
  CalendarHeart,
  Crown,
} from "lucide-react"
import Footer from '@/components/footer'
import Header from '@/components/header'
import ContactForm from '@/components/ui/contact-form'

export default async function HomePage() {
  const collections = await getCollections()

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <Header />

      {/* Hero Carousel Section */}
      <HeroCarousel />

      {/* About Section */}
      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-foreground mb-4 font-serif">Our Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At FAUNi, we believe every bride deserves to feel extraordinary on her special day. Our collection of handcrafted wedding dresses combines timeless elegance with modern sophistication.
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

      {/* Collections Section (replaces Featured Dresses) */}
      <section id="collections" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light text-foreground mb-4 font-serif">Collections</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Explore our curated collections crafted for every part of your wedding journey.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {collections.map((col) => (
              <div key={col.id} className="group relative overflow-hidden rounded-xl hover:shadow-xl transition-all duration-500">
                <div className="aspect-[3/4] relative">
                  <Image 
                    src={col.image} 
                    alt={col.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent">
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
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/collections">
              <Button variant="outline" size="lg" className="font-serif text-[#C19B7C] hover:text-[#D4B098] border-[#C19B7C] hover:border-[#D4B098]">
                View All Collections
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
              <p className="text-xl text-muted-foreground">Hear from our beautiful brides about their experience with FAUNi Bridals.</p>
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
                    &quot;I felt like a princess in my FAUNi Bridals gown. The attention to detail and personalized service made my dress shopping experience unforgettable.&quot;
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
                    &quot;The team at FAUNi Bridals helped me find the perfect dress that matched my style perfectly. I couldn&#39;t be happier with my choice!&quot;
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

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}


