import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of service for CVD Risk Assessment Tool.',
}

export default function TermsPage() {
  const lastUpdated = 'September 20, 2026'

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 glass-card border-x-0 border-t-0 rounded-none border-b border-champagne/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-7 h-7" aria-hidden="true">
                <div className="w-3 h-3 bg-gold rotate-45 rounded-sm opacity-90" />
              </div>
              <div>
                <h1 className="text-sm font-medium tracking-widest text-charcoal uppercase">
                  CVD Risk Assessment
                </h1>
                <p className="text-xs text-stone-light tracking-widest uppercase mt-0.5">
                  Terms of Service
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="legal-content animate-fade-in">
          <header className="mb-10 pb-6 border-b border-champagne">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-widest text-charcoal uppercase mb-4">
              Terms of Service
            </h1>
            <p className="text-sm text-stone tracking-wide">
              Last updated: {lastUpdated}
            </p>
          </header>

          <section aria-labelledby="section-acceptance">
            <h2 id="section-acceptance">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the CVD Risk Assessment Tool ("the Service"), you agree to be bound by these 
              Terms of Service ("Terms"). If you disagree with any part, you may not use the Service.
            </p>
          </section>

          <section aria-labelledby="section-purpose">
            <h2 id="section-purpose">2. Purpose and Scope</h2>
            <p>
              The Service implements the SCORE2 algorithm (ESC/EAPC 2021 Guidelines) to estimate 10-year risk 
              of fatal and non-fatal cardiovascular disease in adults aged 40&ndash;69 without established CVD, 
              diabetes, or severe chronic kidney disease.
            </p>
            <p>
              The Service is provided for <strong>clinical decision support and educational purposes only</strong>. 
              It is not a medical device, does not provide medical advice, and does not replace professional 
              clinical judgment.
            </p>
          </section>

          <section aria-labelledby="section-medical-disclaimer">
            <h2 id="section-medical-disclaimer">3. Medical Disclaimer</h2>
            <div className="glass-card-subtle p-4 my-4 border-l-4 border-gold">
              <p className="font-medium text-charcoal mb-2">
                <strong>Important:</strong> This tool is not a substitute for professional medical advice, 
                diagnosis, or treatment.
              </p>
              <ul className="space-y-1 text-stone">
                <li>&bull; Always consult a qualified healthcare provider for medical decisions</li>
                <li>&bull; The SCORE2 algorithm has specific validation populations (ages 40&ndash;69, no prior CVD)</li>
                <li>&bull; Risk estimates are population-level probabilities, not individual predictions</li>
                <li>&bull; Clinical context, comorbidities, and patient preferences must guide management</li>
                <li>&bull; The developer assumes no liability for clinical decisions based on this tool</li>
              </ul>
            </div>
          </section>

          <section aria-labelledby="section-emergency">
            <h2 id="section-emergency">4. Emergency Situations</h2>
            <p className="text-risk-high font-medium">
              The Service must never be used in emergency medical situations, acute coronary events, 
              or life-threatening circumstances.
            </p>
            <p>
              In the event of acute cardiac symptoms (such as sudden chest pain, shortness of breath, 
              palpitations, or syncope), emergency medical services must be contacted immediately.
            </p>
          </section>

          <section aria-labelledby="section-accuracy">
            <h2 id="section-accuracy">5. Accuracy and Limitations</h2>
            <p>
              While the SCORE2 algorithm is validated in large European cohorts, all risk models have limitations:
            </p>
            <ul>
              <li>Calibration may vary in populations not represented in the original cohorts</li>
              <li>Risk factors not included in SCORE2 (e.g., family history, inflammatory conditions, Lp(a)) may modify risk</li>
              <li>Input errors will produce incorrect estimates</li>
              <li>The algorithm assumes proportional hazards over the 10-year period</li>
            </ul>
            <p>
              Results should be interpreted in conjunction with clinical judgment and applicable guidelines.
            </p>
          </section>

          <section aria-labelledby="section-data">
            <h2 id="section-data">6. Data Processing</h2>
            <p>
              Clinical parameters entered are processed temporarily to compute the risk score. 
              No patient data is stored, logged, or transmitted to third parties. See our 
              <Link href="/privacy" className="text-gold hover:text-gold-muted underline">Privacy Policy</Link> 
              for details.
            </p>
          </section>

          <section aria-labelledby="section-intellectual-property">
            <h2 id="section-intellectual-property">7. Intellectual Property</h2>
            <ul>
              <li>The SCORE2 algorithm and coefficients are published by the ESC/EAPC</li>
              <li>The software implementation, UI, and design are copyright &copy; 2023&ndash;2026 Praveit Suhas</li>
              <li>You may not copy, redistribute, or reverse-engineer the Service for commercial purposes</li>
            </ul>
          </section>

          <section aria-labelledby="section-warranty">
            <h2 id="section-warranty">8. No Warranty</h2>
            <p>
              The Service is provided "as is" and "as available" without warranties of any kind, 
              express or implied, including but not limited to merchantability, fitness for a 
              particular purpose, accuracy, reliability, or non-infringement.
            </p>
          </section>

          <section aria-labelledby="section-liability">
            <h2 id="section-liability">9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, the developer shall not be liable for any 
              direct, indirect, incidental, special, consequential, or punitive damages arising from 
              or related to your use of the Service, including but not limited to clinical decisions, 
              patient outcomes, or data loss.
            </p>
          </section>

          <section aria-labelledby="section-contact-terms">
            <h2 id="section-contact-terms">10. Contact and Inquiries</h2>
            <p>
              For legal inquiries, academic citations, or technical feedback concerning these Terms of 
              Service, please direct correspondence to:
            </p>
            <p className="text-stone mt-2">
              <strong>Praveit Suhas</strong> (Developer, 2023&ndash;2026)<br />
              Email: <a href="mailto:praveitgs@gmail.com" className="text-gold hover:text-gold-muted underline">praveitgs@gmail.com</a><br />
              Project URL: <a href="https://clinical-dashboard-woad.vercel.app/" className="text-gold hover:text-gold-muted underline" target="_blank" rel="noopener noreferrer">https://clinical-dashboard-woad.vercel.app/</a>
            </p>
          </section>

          <section aria-labelledby="section-governing-law">
            <h2 id="section-governing-law">11. Governing Law</h2>
            <p>
              These Terms shall be governed by the laws of the jurisdiction in which the developer resides, 
              without regard to conflict of law principles.
            </p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">12. Modifications</h2>
            <p>
              We reserve the right to modify these Terms at any time. The "Last updated" date will reflect 
              the most recent revision. Continued use after changes constitutes acceptance.
            </p>
          </section>
        </article>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-champagne">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gold hover:text-gold-muted transition-colors text-sm tracking-widest uppercase"
          >
            <span className="arrow-right" aria-hidden="true">&larr;</span>
            Back to Risk Calculator
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-champagne/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-stone tracking-wide">CVD Risk Assessment Tool</p>
              <p className="text-xs text-stone-light mt-1 tracking-wider">SCORE2 Algorithm &mdash; ESC/EAPC 2021 Guidelines</p>
              <p className="text-xs text-stone-light mt-1 tracking-wider">Developed by Praveit Suhas 2023&ndash;2026</p>
            </div>
            <nav aria-label="Footer navigation" className="flex items-center gap-6">
              <Link href="/" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Home</Link>
              <Link href="/privacy" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Privacy Policy</Link>
              <Link href="/cookies" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Cookie Policy</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}