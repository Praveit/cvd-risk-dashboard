import type { Metadata, Viewport } from 'next'
import { Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

// System font for body text
const fontBody = {
  variable: '--font-body',
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://clinical-dashboard-woad.vercel.app'),
  title: {
    default: 'CVD Risk Assessment — SCORE2 Cardiovascular Risk Calculator',
    template: '%s | CVD Risk Assessment',
  },
  description: 'Calculate 10-year cardiovascular disease risk using the ESC/EAPC SCORE2 algorithm. Validated clinical risk prediction for adults aged 40–69. Free, private, no data stored.',
  keywords: [
    'cardiovascular risk calculator',
    'SCORE2 risk score',
    'heart disease risk assessment',
    'CVD risk prediction',
    'cardiovascular disease prevention',
    'ESC guidelines',
    'heart risk calculator',
    'blood pressure risk',
    'cholesterol risk',
    'smoking cardiovascular risk',
    '10-year CVD risk',
    'clinical decision support',
    'preventive cardiology',
  ],
  authors: [{ name: 'Praveit Suhas' }],
  creator: 'Praveit Suhas',
  publisher: 'CVD Risk Assessment',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'CVD Risk Assessment — SCORE2 Cardiovascular Risk Calculator',
    description: 'Calculate your 10-year cardiovascular disease risk using the validated ESC/EAPC SCORE2 algorithm. Free, private, evidence-based.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CVD Risk Assessment',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CVD Risk Assessment — SCORE2 Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVD Risk Assessment — SCORE2 Calculator',
    description: 'Calculate 10-year CVD risk with the ESC/EAPC SCORE2 algorithm. Validated, private, free.',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'QVbhkGAqSTEDJ3YSyGQhyaE_gzzxt_XEMKeR6KOCkRQ',
  },
  other: {
    'theme-color': '#faf7f2',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf7f2' },
    { media: '(prefers-color-scheme: dark)', color: '#141414' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jost.variable} ${fontBody.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://vitals.vercel-insights.com" />
      </head>
      <body className="font-body antialiased">
        {/* Ambient radial orbs */}
        <div className="orb-top" aria-hidden="true" />
        <div className="orb-bottom" aria-hidden="true" />

        {/* Skip to main content - accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Page content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {children}
        </div>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}