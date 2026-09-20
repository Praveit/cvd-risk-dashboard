import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'CVD Risk Assessment | AI-Powered Cardiovascular Risk Prediction Tool',
  description:
    'Predict cardiovascular disease risk over 2, 5, and 10-year horizons using DeepSurv survival analysis and explainable AI. SHAP-powered clinical decision support for healthcare professionals.',
  keywords: [
    'cardiovascular risk calculator',
    'heart disease risk assessment',
    'CVD risk prediction',
    'AI health tool',
    'SHAP explainability',
    'clinical decision support',
    'DeepSurv',
    'cardiovascular disease',
    'heart risk score',
    'medical AI',
    'explainable AI healthcare',
    'cardiovascular risk factors',
    'blood pressure risk',
    'cholesterol risk calculator',
  ],
  authors: [{ name: 'Praveit Suhas' }],
  openGraph: {
    title: 'CVD Risk Assessment - AI-Powered Cardiovascular Prediction',
    description:
      'Predict cardiovascular disease risk with explainable AI. Multi-horizon survival analysis with SHAP explanations for clinical decision support.',
    type: 'website',
    locale: 'en_US',
    siteName: 'CVD Risk Assessment',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CVD Risk Assessment - AI-Powered Cardiovascular Prediction',
    description:
      'Predict cardiovascular disease risk with explainable AI. Multi-horizon survival analysis with SHAP explanations.',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'QVbhkGAqSTEDJ3YSyGQhyaE_gzzxt_XEMKeR6KOCkRQ',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jost.variable}>
      <body className="font-sans relative">
        {/* Ambient radial orb (bottom-left) */}
        <div className="orb-bottom" aria-hidden="true" />

        {/* Skip to main content - accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Page content */}
        <div className="relative z-10">{children}</div>

        {/* Vercel Analytics */}
        <Analytics />
      </body>
    </html>
  )
}