'use client'

import { ReactNode } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
// Admin auth disabled (Supabase removed)
import { useAuth } from "@/lib/context/auth-context"
import AdminSidebar from "@/components/ui/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  // Auth is a no-op in static mode; keep admin accessible in dev only
  const handleSignOut = async () => {
    router.push("/login")
  }

  return (
    <div className="flex h-screen">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b px-4 flex items-center justify-end">
          <Button variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}