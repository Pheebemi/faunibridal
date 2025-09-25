# EmailJS Setup Guide

## 🚀 Quick Setup

### 1. Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email

### 2. Add Email Service
1. Go to **Email Services** in your dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID**

### 3. Create Email Templates

#### Contact Form Template
1. Go to **Email Templates**
2. Click **Create New Template**
3. Use this template:

```
Subject: New Contact Form Message from {{from_name}}

From: {{from_name}} ({{from_email}})
Message: {{message}}

Reply to: {{from_email}}
```

4. **Copy your Template ID**

#### Appointment Template
1. Create another template for appointments:

```
Subject: New Appointment Request from {{from_name}}

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Date: {{appointment_date}}
Time: {{appointment_time}}
Message: {{message}}

Reply to: {{from_email}}
```

5. **Copy your Appointment Template ID**

### 4. Get Public Key
1. Go to **Account** → **General**
2. **Copy your Public Key**

### 5. Add Environment Variables
Create a `.env.local` file in your project root:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_APPOINTMENT_TEMPLATE_ID=your_appointment_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### 6. Deploy to Vercel
1. Add the same environment variables in Vercel dashboard
2. Go to your project → Settings → Environment Variables
3. Add each variable with the same names

## 📧 Template Variables

### Contact Form Template Variables:
- `{{from_name}}` - Full name (First + Last)
- `{{from_email}}` - Email address
- `{{message}}` - Message content
- `{{to_email}}` - Your email (fauninigeria@gmail.com)

### Appointment Template Variables:
- `{{from_name}}` - Full name
- `{{from_email}}` - Email address
- `{{phone}}` - Phone number
- `{{appointment_date}}` - Selected date
- `{{appointment_time}}` - Selected time
- `{{message}}` - Additional message
- `{{to_email}}` - Your email (fauninigeria@gmail.com)

## 🎯 Features

✅ **Contact Form** - Home page contact section
✅ **Appointment Form** - Dedicated appointments page
✅ **Toast Notifications** - Success/error feedback
✅ **Form Validation** - Required fields
✅ **Loading States** - Submit button shows "Sending..."
✅ **Auto Reset** - Forms clear after successful submission

## 🔧 Testing

1. Fill out the contact form on your home page
2. Check your email for the message
3. Test the appointment form
4. Verify all fields are working correctly

## 💡 Pro Tips

- **Free Plan**: 200 emails/month
- **Templates**: Can be customized with HTML
- **Auto-reply**: Set up auto-reply in your email service
- **Spam Protection**: EmailJS has built-in spam protection

## 🆘 Troubleshooting

**Form not sending?**
- Check environment variables are set correctly
- Verify template IDs match your EmailJS templates
- Check browser console for errors

**Emails not received?**
- Check spam folder
- Verify email service is connected
- Test with a different email address

**Template variables not working?**
- Make sure variable names match exactly
- Check template syntax: `{{variable_name}}`
- Test with simple text first
