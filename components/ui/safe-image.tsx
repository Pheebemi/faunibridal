'use client'

import { useState } from 'react'
import Image from 'next/image'

interface SafeImageProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
  fallbackSrc?: string
}

export function SafeImage({ src, alt, fill = false, className, fallbackSrc = '/dresses/1.jpg' }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src)
  const [hasError, setHasError] = useState(false)

  const handleError = () => {
    if (!hasError) {
      setHasError(true)
      setImgSrc(fallbackSrc)
    }
  }

  if (fill) {
    return (
      <Image
        src={imgSrc}
        alt={alt}
        fill
        className={className}
        onError={handleError}
      />
    )
  }

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  )
}
