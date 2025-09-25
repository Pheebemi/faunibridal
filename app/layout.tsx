import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import WhatsAppButton from "@/components/ui/whatsapp-button"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FAUNi Bridals — Luxury Wedding Dresses",
  description: "Luxury handcrafted wedding dresses and bridal services.",
  icons: {
    icon: '/logo-dark.png',
    shortcut: '/logo-dark.png',
    apple: '/logo-dark.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-site-verification" content="Fj3-2ajVW-mY4oDtFX486CCmuj1wtNEs5jnTP5X2_eg" />
        <link rel="icon" href="/logo-dark.png" type="image/png" />
        <link rel="shortcut icon" href="/logo-dark.png" type="image/png" />
        <link rel="apple-touch-icon" href="/logo-dark.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="algadaff-theme">
          {children}
          <Toaster />
          <WhatsAppButton phone="2348066337880" />
        </ThemeProvider>
      </body>
    </html>
  );
}
