"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"

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
              <input name="name" value={form.name} onChange={handleChange} required placeholder="Full name" className="input bg-background rounded-md p-3" />
              <input name="email" value={form.email} onChange={handleChange} required type="email" placeholder="Email" className="input bg-background rounded-md p-3" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input name="phone" value={form.phone} onChange={handleChange} required placeholder="Phone" className="input bg-background rounded-md p-3" />
              <div className="flex gap-4">
                <input name="date" value={form.date} onChange={handleChange} required type="date" className="input bg-background rounded-md p-3" />
                <input name="time" value={form.time} onChange={handleChange} required type="time" className="input bg-background rounded-md p-3" />
              </div>
            </div>

            <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="Message (optional)" className="input bg-background rounded-md p-3" />

            <div className="flex items-center justify-between">
              <button type="submit" disabled={status === "sending"} className="btn btn-primary">
                {status === "sending" ? "Sending..." : "Request Appointment"}
              </button>
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
