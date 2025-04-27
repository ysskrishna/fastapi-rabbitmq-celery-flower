import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import config from "@/common/config"
import Header from "@/components/header"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: config.productName,
  description: "Manage and organize your SMS and email templates efficiently",
  keywords: ["templatehub", "template", "email", "sms", "templatehub", "notification", "messaging", "communication", "fastapi", "rabbitmq", "celery", "flower", "nextjs"],
  authors: [{ name: config.creator.fullName, url: config.creator.github }],
  creator: config.creator.fullName,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="min-h-screen bg-background font-sans antialiased">
            <Header />
            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 bg-red">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
