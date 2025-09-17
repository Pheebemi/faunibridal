'use client'

import { ReactNode } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/supabase/auth"
import { useAuth } from "@/lib/context/auth-context"

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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            <Link href="/admin" className="font-semibold">
              Admin Dashboard
            </Link>
            <nav className="flex items-center gap-4 md:gap-6">
              <Link
                href="/admin/collections"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Collections
              </Link>
              <Link
                href="/admin/dresses"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dresses
              </Link>
            </nav>
          </div>
          <Button variant="ghost" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}