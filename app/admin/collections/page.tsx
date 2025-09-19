import Link from "next/link"

export default function CollectionsPage() {
  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Collections (Admin Disabled)</h1>
        <p className="text-muted-foreground">Admin collection management has been disabled for this static deployment. To manage collections, enable a backend or re-enable Supabase integration.</p>
        <div className="mt-6">
          <Link href="/admin">
            <button className="px-4 py-2 bg-primary text-white rounded">Back to Admin</button>
          </Link>
        </div>
      </div>
    </div>
  )
}