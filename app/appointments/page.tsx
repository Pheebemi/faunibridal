"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import AppointmentForm from "@/components/ui/appointment-form"

export default function AppointmentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="container mx-auto py-12 px-4 flex-1">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-semibold text-center">Book An Appointment</h1>
          <p className="text-center text-muted-foreground mt-2">Schedule a fitting or consultation with our bridal experts.</p>

          <div className="mt-8">
            <AppointmentForm />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
