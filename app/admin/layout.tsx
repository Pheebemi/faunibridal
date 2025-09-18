'use client'

import { ReactNode } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/supabase/auth"
import { useAuth } from "@/lib/context/auth-context"
import AdminSidebar from "@/components/ui/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push("/login")
    return null
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      router.push("/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
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