"use client"

import React from 'react'

const DEFAULT_PHONE = "2348027289376" // Replace with owner phone in international format, e.g. 15551234567

export default function WhatsAppButton({ phone = DEFAULT_PHONE }: { phone?: string }) {
  const href = `https://wa.me/${phone}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed right-4 bottom-6 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105 transform-gpu transition-transform"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.373 0 .02 5.354.02 12c0 2.116.553 4.197 1.603 6.02L0 24l6.22-1.617A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.92-.457-3.74-1.48-5.22z" fill="#fff" opacity="0.06"/>
        <path d="M20.52 3.48A11.95 11.95 0 0 0 12 0C5.373 0 .02 5.354.02 12c0 2.116.553 4.197 1.603 6.02L0 24l6.22-1.617A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12 0-1.92-.457-3.74-1.48-5.22z" fill="white"/>
        <path d="M17.472 14.382c-.297-.15-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.966-.942 1.164-.173.198-.347.223-.644.074-.297-.15-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.15-.174.2-.298.3-.497.099-.198.05-.372-.025-.522-.075-.149-.672-1.62-.922-2.22-.242-.582-.487-.503-.672-.512l-.573-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.48 1.064 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487 2.98 1.287 2.98.858 3.52.806.542-.052 1.758-.72 2.006-1.415.248-.695.248-1.29.173-1.415-.074-.124-.272-.198-.57-.347z" fill="#25D366"/>
      </svg>
    </a>
  )
}
