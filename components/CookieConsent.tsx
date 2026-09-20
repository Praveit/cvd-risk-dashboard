'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  if (!mounted || !visible) return null

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      <motion.div
        role="dialog"
        aria-label="Cookie consent"
        aria-modal="false"
        className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 cookie-banner"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-2xl mx-auto glass-card-elevated p-5 sm:p-6">
          <p className="text-sm text-stone leading-relaxed mb-5">
            We use privacy-respecting analytics to understand how you interact with this tool
            and to improve the experience. No patient data is stored or transmitted. See our{' '}
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
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-3">
            <motion.button
              onClick={handleAccept}
              className="btn-primary text-sm py-2.5 px-6 w-full sm:w-auto"
              aria-label="Accept analytics cookies"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Accept
            </motion.button>
            <motion.button
              onClick={handleDecline}
              className="btn-secondary text-sm py-2.5 px-6 w-full sm:w-auto"
              aria-label="Decline optional cookies"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Decline
            </motion.button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}