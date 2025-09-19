"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"

type Slide = {
  src: string
  alt?: string
}

export default function Gallery({ images }: { images: Slide[] }) {
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)

  const openAt = useCallback((i: number) => {
    setIndex(i)
    setOpen(true)
  }, [])

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close()
      if (e.key === "ArrowRight") setIndex((s) => Math.min(s + 1, images.length - 1))
      if (e.key === "ArrowLeft") setIndex((s) => Math.max(s - 1, 0))
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, images.length, close])

  // Map some items to span more columns/rows for a masonry feel
  const spanMap = images.map((_, i) => {
    if (i % 7 === 0) return "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2"
    if (i % 5 === 0) return "col-span-2 row-span-1 lg:col-span-2 lg:row-span-1"
    return "col-span-1 row-span-1"
  })

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-fr gap-3">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => openAt(i)}
            className={`relative overflow-hidden rounded-lg group h-48 w-full ${spanMap[i]}`}
            aria-label={`Open image ${i + 1}`}
          >
            <Image src={img.src} alt={img.alt ?? `Dress ${i + 1}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        ))}
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/70" onClick={close} />
          <div className="relative max-w-5xl w-full p-4">
            <button onClick={close} className="absolute top-2 right-2 z-50 rounded bg-white/90 px-3 py-1 text-sm">Close</button>

            <button
              onClick={() => setIndex((s) => Math.max(0, s - 1))}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-50 rounded bg-white/90 p-2"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={() => setIndex((s) => Math.min(images.length - 1, s + 1))}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-50 rounded bg-white/90 p-2"
              aria-label="Next"
            >
              ›
            </button>

            <div className="aspect-[4/3] w-full relative rounded overflow-hidden">
              <Image src={images[index].src} alt={images[index].alt ?? `Dress ${index + 1}`} fill sizes="(max-width: 1024px) 90vw, 800px" className="object-contain bg-black/0" />
            </div>

            <div className="mt-3 flex items-center justify-between text-sm text-white">
              <div>{images[index].alt ?? `Dress ${index + 1}`}</div>
              <div className="opacity-90">{index + 1} / {images.length}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
