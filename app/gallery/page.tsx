import Gallery from "@/components/ui/gallery"

export const metadata = {
  title: "Gallery — Fauni Bridal",
  description: "Browse our curated selection of bridal gowns.",
}

export default function GalleryPage() {
  const images = [
    { src: "/dresses/1.jpg", alt: "Silhouette A-line gown" },
    { src: "/dresses/2.jpg", alt: "Lace mermaid dress" },
    { src: "/dresses/3.jpg", alt: "Beaded ball gown" },
    { src: "/dresses/4.jpg", alt: "Vintage-inspired sheath" },
    { src: "/dresses/5.jpg", alt: "Minimalist crepe dress" },
  ]

  return (
    <main className="container mx-auto py-12 px-4">
      <header className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-semibold">Our Gallery</h1>
        <p className="mt-3 text-muted-foreground">A hand-picked selection of gowns photographed in-studio.</p>
      </header>

      <Gallery images={images} />

      <section className="mt-10 max-w-3xl mx-auto text-center">
        <p className="text-lg">Love what you see? <a className="underline" href="/appointment">Book an appointment</a> or <a className="underline" href="/contact">contact us</a> for custom requests.</p>
      </section>
    </main>
  )
}
