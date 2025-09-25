'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'

export function HeroCarousel() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] h-[calc(100vh-64px)] overflow-hidden">
      <Carousel className="w-full h-full" opts={{ loop: true }} autoplayInterval={4000}>
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
                  <Link href="/dresses?collection=bridal-dresses-for-sale">
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
                  <Link href="/dresses?collection=made-in-naija-customs">
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
                  <Link href="/dresses?collection=luxury-cathedral-veils">
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
  )
}
