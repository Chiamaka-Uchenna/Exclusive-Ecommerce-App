import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import ReduxProvider from "@/components/providers/redux-provider"
import ThemeProvider from "@/components/providers/theme-provider"
import AuthProvider from "@/components/providers/auth-provider"
import TopBanner from "@/components/layout/top-banner"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Exclusive - Your Premium Shopping Destination",
  description:
    "Discover exclusive products at unbeatable prices. Shop electronics, fashion, and more with fast delivery and excellent customer service."
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider>
            <AuthProvider>
              <div className="min-h-screen flex flex-col">
                <TopBanner />
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <Toaster />
            </AuthProvider>
          </ThemeProvider>
        </ReduxProvider>
        <Script src="https://checkout.flutterwave.com/v3.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
