'use client'

import { useState, useEffect } from 'react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="false"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-in"
    >
      <div className="max-w-2xl mx-auto glass-card p-5 sm:p-6">
        <p className="text-sm text-stone leading-relaxed mb-4">
          We use analytics cookies to understand how you interact with this tool
          and to improve the experience. No patient data is stored. See our{' '}
          <a
            href="/cookies"
            className="text-gold hover:text-gold-muted underline underline-offset-2 transition-colors"
          >
            Cookie Policy
          </a>{' '}
          and{' '}
          <a
            href="/privacy"
            className="text-gold hover:text-gold-muted underline underline-offset-2 transition-colors"
          >
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={handleAccept}
            className="btn-primary text-sm py-2 px-5"
            aria-label="Accept cookies"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="text-sm text-stone hover:text-charcoal py-2 px-4 transition-colors rounded-luxury border border-sand hover:border-stone-light"
            aria-label="Decline optional cookies"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
