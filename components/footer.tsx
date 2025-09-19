export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50 mt-12">
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-sm">&copy; {year} Fauni Bridal. All rights reserved.</p>
        <p className="text-sm mt-2">Contact: <a href="mailto:hello@faunibridal.com" className="underline">hello@faunibridal.com</a> • WhatsApp: <a href="https://wa.me/2348066337880" className="underline">+234 806 633 7880</a></p>
      </div>
    </footer>
  )
}
