import type { Metadata } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Olympic Jafy Gym — Train Hard. Become Stronger.",
  description:
    "Olympic Jafy Gym — Musculation & Arts Martiaux. Premium fitness facility with strength training, cardio, and martial arts programs in Layayda, Salé.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} bg-background`}>
      <link rel="icon" href="/icone.png" type="image/png" />
      <body className="font-sans antialiased selection:bg-primary/15 selection:text-white">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}