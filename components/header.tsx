"use client"

import Link from "next/link"
import { MainNav } from "./ui/main-nav"
import { ThemeToggle } from "./theme-toggle"

export default function Header() {
  return (
    <header className="border-b bg-muted/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <Link href="/" className="text-xl font-bold">Fauni Bridal</Link>
        <nav className="flex items-center gap-4">
          <MainNav />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}
