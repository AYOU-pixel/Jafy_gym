import type { Metadata, Viewport } from "next"
import { Poppins, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
})

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#050505" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  title: "Olympic Jafy Gym — Train Hard. Become Stronger.",
  description:
    "Olympic Jafy Gym — Musculation & Arts Martiaux. Premium fitness facility with strength training, cardio, and martial arts programs in Layayda, Salé. Two clubs, one membership.",
  keywords: ["gym", "fitness", "musculation", "martial arts", "Salé", "Morocco", "personal training", "women only gym", "cardio", "strength training"],
  authors: [{ name: "Olympic Jafy Gym" }],
  creator: "Olympic Jafy Gym",
  publisher: "Olympic Jafy Gym",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Olympic Jafy Gym — Train Hard. Become Stronger.",
    description: "Premium fitness facility with strength training, cardio, and martial arts programs. Two clubs in Salé, one membership.",
    type: "website",
    locale: "fr_FR",
    siteName: "Olympic Jafy Gym",
  },
  twitter: {
    card: "summary_large_image",
    title: "Olympic Jafy Gym — Train Hard. Become Stronger.",
    description: "Premium fitness facility with strength training, cardio, and martial arts programs in Salé, Morocco.",
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable} bg-background scroll-smooth`}>
      <head>
        <link rel="icon" href="/icone.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icone.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className="font-sans antialiased selection:bg-primary/20 selection:text-white">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}