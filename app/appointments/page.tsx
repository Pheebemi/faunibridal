"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AppointmentsPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", time: "", message: "" })
  const [status, setStatus] = useState<null | "idle" | "sending" | "sent" | "error">("idle")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("sending")

    try {
      // UI-only: POST to API if/when available
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      setStatus("sent")
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold text-center">Book An Appointment</h1>
          <p className="text-center text-muted-foreground mt-2">Schedule a fitting or consultation with our bridal experts.</p>

          <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" />
              <Input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" />
              <div className="flex gap-4">
                <Input name="date" value={form.date} onChange={handleChange} required type="date" />
                <Input name="time" value={form.time} onChange={handleChange} required type="time" />
              </div>
            </div>

            <Textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Message (optional)" />

            <div className="flex items-center justify-between">
              <Button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Request Appointment"}
              </Button>
              {status === "sent" && <span className="text-success">Request sent — we will contact you shortly.</span>}
              {status === "error" && <span className="text-destructive">Failed to send. Please try again later.</span>}
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  )
}
