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
      // EmailJS configuration - temporarily use contact template to test
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'your_service_id'
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'your_template_id' // Use contact template
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'your_public_key'

      // Debug logging
      console.log('EmailJS Config:', { serviceId, templateId, publicKey: publicKey ? 'Set' : 'Not set' })

      // Template parameters - format as appointment message for contact template
      const appointmentMessage = `
Appointment Request:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Date: ${formData.date}
Time: ${formData.time}
${formData.message ? `Message: ${formData.message}` : ''}
      `.trim()

      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: appointmentMessage,
        to_email: 'fauninigeria@gmail.com'
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
      console.error('Error status:', (error as any)?.status || 'No status')
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
