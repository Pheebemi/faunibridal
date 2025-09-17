export default function AdminPage() {
  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Quick Stats</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">Collections</div>
              <p className="text-sm text-muted-foreground">
                Manage your bridal collections
              </p>
            </div>
            <div className="rounded-lg border p-4">
              <div className="text-2xl font-bold">Dresses</div>
              <p className="text-sm text-muted-foreground">
                Manage your wedding dresses
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}