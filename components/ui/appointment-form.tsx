'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/toaster'
import emailjs from '@emailjs/browser'

interface AppointmentFormData {
  name: string
  email: string
  phone: string
  date: string
  time: string
  message: string
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // EmailJS configuration
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_APPOINTMENT_TEMPLATE_ID || 'your_appointment_template_id'
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

      // Debug logging
      console.log('EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? 'Set' : 'Not set' })

      // Template parameters - try common variable names
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        date: formData.date,
        time: formData.time,
        message: formData.message,
        to_email: 'fauninigeria@gmail.com',
        // Alternative variable names that might be expected
        user_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        appointment_date: formData.date,
        appointment_time: formData.time,
        user_message: formData.message
      }

      // Send email
      console.log('Sending email with params:', templateParams)
      const result = await emailjs.send(serviceId, templateId, templateParams, publicKey)
      console.log('EmailJS result:', result)

      // Success
      toast.success("Appointment Request Sent!", {
        description: "Thank you for your appointment request. We'll contact you soon to confirm.",
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
      })

    } catch (error) {
      console.error('EmailJS Error Details:', error)
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error')
      console.error('Error status:', error instanceof Error ? error.status : 'No status')
      toast.error("Error", {
        description: "Failed to send appointment request. Please try again or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 gap-4">
        <Input 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="Full name" 
        />
        <Input 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          type="email" 
          placeholder="Email" 
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          required 
          placeholder="Phone" 
        />
        <div className="flex gap-4">
          <Input 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            required 
            type="date" 
          />
          <Input 
            name="time" 
            value={formData.time} 
            onChange={handleChange} 
            required 
            type="time" 
          />
        </div>
      </div>

      <Textarea 
        name="message" 
        value={formData.message} 
        onChange={handleChange} 
        rows={5} 
        placeholder="Message (optional)" 
      />

      <div className="flex items-center justify-between">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Request Appointment"}
        </Button>
      </div>
    </form>
  )
}
