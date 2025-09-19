'use client'

import Link from 'next/link'

export default function NewDressPage() {
  return (
    <div className="container py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New Dress (Disabled)</h1>
        <p className="text-muted-foreground">Adding dresses is disabled for this static site. To enable adding dresses, re-enable the backend and Supabase integration.</p>
        <div className="mt-6">
          <Link href="/admin/dresses">
            <button className="px-4 py-2 bg-primary text-white rounded">Back to Dresses</button>
          </Link>
        </div>
      </div>
    </div>
  )
}