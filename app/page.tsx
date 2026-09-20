'use client'

import { useState, Suspense } from 'react'
import dynamic from 'next/dynamic'
import PatientForm from '@/components/PatientForm'
import RiskDisplay from '@/components/RiskDisplay'
import ExplanationPanel from '@/components/ExplanationPanel'
import { SkeletonForm, SkeletonRiskDisplay, SkeletonExplanation } from '@/components/SkeletonLoader'

const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  ssr: false,
  loading: () => null,
})

interface RiskResult {
  immediateRisk: number
  risk1Year: number
  risk2Year: number
  risk5Year: number
  risk10Year: number
  featureContributions: Record<string, number>
  riskCategory: 'Low' | 'Moderate' | 'High' | 'Very High'
  recommendation: string
}

export default function Home() {
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCalculate = async (patientData: any) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/risk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Risk calculation failed')
      }

      const result = await response.json()
      setRiskResult(result)
    } catch (error) {
      console.error('Error:', error)
      setRiskResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 glass-card border-x-0 border-t-0 rounded-none border-b border-champagne/50" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-18">
            <div className="flex items-center gap-3">
              {/* Brand mark - minimal diamond */}
              <div className="relative flex items-center justify-center w-7 h-7" aria-hidden="true">
                <div className="w-3 h-3 bg-gold rotate-45 rounded-sm opacity-90" />
              </div>
              <div>
                <h1 className="text-sm sm:text-base font-medium tracking-widest text-charcoal uppercase">
                  CVD Risk Assessment
                </h1>
                <p className="text-xs text-stone-light tracking-widest uppercase mt-0.5 font-body">
                  SCORE2 Algorithm
                </p>
              </div>
            </div>
            <nav aria-label="Primary navigation" className="hidden sm:block">
              <span className="text-xs font-medium text-stone tracking-widest uppercase">
                Clinical Decision Support
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main id="main-content" className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Patient Form - left column */}
          <div className="lg:col-span-2 animate-fade-in">
            <Suspense fallback={<SkeletonForm />}>
              <PatientForm onCalculate={handleCalculate} isLoading={isLoading} />
            </Suspense>
          </div>

          {/* Results - right column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-fade-in-delay-1">
              <Suspense fallback={<SkeletonRiskDisplay />}>
                <RiskDisplay result={riskResult} />
              </Suspense>
            </div>
            <div className="animate-fade-in-delay-2">
              <Suspense fallback={<SkeletonExplanation />}>
                <ExplanationPanel featureContributions={riskResult?.featureContributions || null} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* ─── Feature Summary ─── */}
        <section
          className="mt-16 sm:mt-20 animate-fade-in-delay-3"
          aria-label="Platform features"
        >
          <h2 className="text-xl font-medium tracking-widest uppercase text-charcoal mb-8 text-center">
            Clinical Evidence Base
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <article className="glass-card feature-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="feature-card-number" aria-hidden="true">01</span>
                <h3 className="text-sm font-medium tracking-widest uppercase text-charcoal">
                  SCORE2 Algorithm
                </h3>
              </div>
              <p className="text-sm text-stone tracking-wide leading-relaxed">
                2021 ESC/EAPC validated algorithm for 10-year fatal & non-fatal CVD risk in adults 40–69.
              </p>
              <span className="inline-block mt-4 text-gold text-xs tracking-widest uppercase">
                View methodology <span className="arrow-right" aria-hidden="true">&rarr;</span>
              </span>
            </article>

            {/* Feature 2 */}
            <article className="glass-card feature-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="feature-card-number" aria-hidden="true">02</span>
                <h3 className="text-sm font-medium tracking-widest uppercase text-charcoal">
                  Regional Calibration
                </h3>
              </div>
              <p className="text-sm text-stone tracking-wide leading-relaxed">
                Four risk region calibrations (low, moderate, high, very high) per ESC guidelines.
              </p>
              <span className="inline-block mt-4 text-gold text-xs tracking-widest uppercase">
                Learn more <span className="arrow-right" aria-hidden="true">&rarr;</span>
              </span>
            </article>

            {/* Feature 3 */}
            <article className="glass-card feature-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="feature-card-number" aria-hidden="true">03</span>
                <h3 className="text-sm font-medium tracking-widest uppercase text-charcoal">
                  Explainable Results
                </h3>
              </div>
              <p className="text-sm text-stone tracking-wide leading-relaxed">
                Feature contribution analysis showing how each factor influences your risk estimate.
              </p>
              <span className="inline-block mt-4 text-gold text-xs tracking-widest uppercase">
                View example <span className="arrow-right" aria-hidden="true">&rarr;</span>
              </span>
            </article>
          </div>
        </section>

        {/* ─── Disclaimer ─── */}
        <section className="mt-12 sm:mt-16 animate-fade-in-delay-4" aria-label="Medical disclaimer">
          <div className="glass-card-subtle p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-charcoal uppercase tracking-wider mb-1">
                    For Clinical Decision Support Only
                  </p>
                  <p className="text-sm text-stone tracking-wide">
                    This tool implements the SCORE2 algorithm for risk estimation. It is not a medical device
                    and does not replace clinical judgment. Always consult a healthcare professional for
                    medical decisions.
                  </p>
                </div>
              </div>
              <a
                href="/terms"
                className="btn-secondary text-sm py-2 px-4 whitespace-nowrap"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-champagne/50 mt-12" role="contentinfo">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-stone tracking-wide">
                CVD Risk Assessment Tool
              </p>
              <p className="text-xs text-stone-light mt-1 tracking-wider">
                SCORE2 Algorithm &mdash; ESC/EAPC 2021 Guidelines
              </p>
              <p className="text-xs text-stone-light mt-1 tracking-wider">
                Developed by Praveit Suhas 2023&ndash;2026
              </p>
            </div>
            <nav aria-label="Footer navigation" className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase"
              >
                Cookie Policy
              </a>
            </nav>
          </div>
        </div>
      </footer>

      {/* ─── Cookie Consent Banner ─── */}
      <CookieConsent />
    </div>
  )
}