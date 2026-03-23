import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import ClickSpark from "@/components/click-spark"
import "./globals.css"

const _inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "KIPP AI | Automatize seu atendimento com IA",
  description: "Automação inteligente de atendimento. CRM integrado. Respostas em tempo real.",
  keywords: ["IA", "automação", "atendimento", "chatbot", "CRM", "KIPP AI"],
  icons: {
    icon: "/images/kipp-logo.png",
    shortcut: "/images/kipp-logo.png",
    apple: "/images/kipp-logo.png",
  },
  generator: "v0.app",
}

export const viewport: Viewport = {
  themeColor: "#2563EB",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ClickSpark
          sparkColor="#2563EB"
          sparkSize={12}
          sparkRadius={20}
          sparkCount={8}
          duration={400}
          easing="ease-out"
        >
          <LenisProvider>{children}</LenisProvider>
        </ClickSpark>
        <Analytics />
      </body>
    </html>
  )
}
