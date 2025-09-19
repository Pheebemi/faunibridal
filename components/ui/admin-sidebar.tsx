'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Shirt } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Dresses', href: '/admin/dresses', icon: Shirt },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/10">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span>Bridal Admin</span>
        </Link>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          )
        })}
      </nav>
      <div className="border-t p-4">
        <p className="text-xs text-muted-foreground">
          Signed in as Admin
        </p>
      </div>
    </div>
  )
}