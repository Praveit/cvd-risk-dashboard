'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import PatientForm from '@/components/PatientForm'
import RiskDisplay from '@/components/RiskDisplay'
import ExplanationPanel from '@/components/ExplanationPanel'

const CookieConsent = dynamic(() => import('@/components/CookieConsent'), {
  ssr: false,
})

interface RiskResult {
  immediateRisk: number
  risk2Year: number
  risk5Year: number
  risk10Year: number
  shapImportance: { feature: string; value: number }[]
}

export default function Home() {
  const [riskResult, setRiskResult] = useState<RiskResult | null>(null)

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── Header ─── */}
      <header className="sticky top-0 z-40 glass-card border-x-0 border-t-0 rounded-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              {/* Minimal static diamond indicator */}
              <div className="relative flex items-center justify-center w-6 h-6" aria-hidden="true">
                <div className="w-2.5 h-2.5 bg-gold rotate-45 rounded-sm opacity-80" />
              </div>
              <div>
                <h1 className="text-base font-medium tracking-widest text-charcoal uppercase">
                  CVD Risk Assessment
                </h1>
                <p className="text-xs text-stone-light tracking-widest uppercase mt-0.5">
                  Explainable AI
                </p>
              </div>
            </div>
            <nav aria-label="Primary navigation">
              <span className="text-xs font-medium text-stone tracking-widest uppercase">
                Clinician Portal
              </span>
            </nav>
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main id="main-content" className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Patient Form - left column */}
          <div className="lg:col-span-2 animate-fade-in">
            <PatientForm onResult={setRiskResult} />
          </div>

          {/* Results - right column */}
          <div className="lg:col-span-3 space-y-6">
            <div className="animate-fade-in-delay-1">
              <RiskDisplay result={riskResult} />
            </div>
            <div className="animate-fade-in-delay-2">
              <ExplanationPanel shapImportance={riskResult?.shapImportance || null} />
            </div>
          </div>
        </div>

        {/* ─── Feature Summary ─── */}
        <section
          className="mt-16 sm:mt-20 animate-fade-in-delay-3"
          aria-label="Platform features"
        >
          <h2 className="text-xl font-medium tracking-widest uppercase text-charcoal mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <article className="glass-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold text-sm tracking-widest uppercase" aria-hidden="true">01</span>
                <h3 className="text-sm font-medium tracking-widest uppercase text-charcoal">
                  Risk Trajectories
                </h3>
              </div>
              <p className="text-sm text-stone tracking-wide leading-relaxed">
                Predict CVD risk over 2, 5, and 10-year horizons using DeepSurv survival analysis.
              </p>
              <span className="inline-block mt-4 text-gold text-xs tracking-widest uppercase">
                Learn more <span className="arrow-right" aria-hidden="true">&rarr;</span>
              </span>
            </article>

            {/* Feature 2 */}
            <article className="glass-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold text-sm tracking-widest uppercase" aria-hidden="true">02</span>
                <h3 className="text-sm font-medium tracking-widest uppercase text-charcoal">
                  SHAP Explanations
                </h3>
              </div>
              <p className="text-sm text-stone tracking-wide leading-relaxed">
                Understand why the model predicts each risk level using SHapley Additive explanations.
              </p>
              <span className="inline-block mt-4 text-gold text-xs tracking-widest uppercase">
                Learn more <span className="arrow-right" aria-hidden="true">&rarr;</span>
              </span>
            </article>

            {/* Feature 3 */}
            <article className="glass-card p-6 group">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-gold text-sm tracking-widest uppercase" aria-hidden="true">03</span>
                <h3 className="text-sm font-medium tracking-widest uppercase text-charcoal">
                  Clinical Support
                </h3>
              </div>
              <p className="text-sm text-stone tracking-wide leading-relaxed">
                Evidence-based risk assessment to support clinical decision-making workflows.
              </p>
              <span className="inline-block mt-4 text-gold text-xs tracking-widest uppercase">
                Learn more <span className="arrow-right" aria-hidden="true">&rarr;</span>
              </span>
            </article>
          </div>
        </section>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-champagne mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-stone">
                CVD Risk Assessment Tool - For Clinical Decision Support Only - Not a Medical Device
              </p>
              <p className="text-xs text-stone-light mt-1">
                Developed by Praveit Suhas 2023-2026
              </p>
            </div>
            <nav aria-label="Footer navigation" className="flex items-center gap-6">
              <a
                href="/privacy"
                className="text-xs text-stone hover:text-gold transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-xs text-stone hover:text-gold transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="/cookies"
                className="text-xs text-stone hover:text-gold transition-colors"
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