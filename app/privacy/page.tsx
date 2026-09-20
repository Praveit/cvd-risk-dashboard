import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for CVD Risk Assessment Tool. Learn how we handle your data.',
}

export default function PrivacyPage() {
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
                  Privacy Policy
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
              Privacy Policy
            </h1>
            <p className="text-sm text-stone tracking-wide">
              Last updated: {lastUpdated}
            </p>
          </header>

          <section aria-labelledby="section-intro">
            <h2 id="section-intro">1. Introduction</h2>
            <p>
              This Privacy Policy describes how the CVD Risk Assessment Tool ("we", "our", or "the Service") 
              handles information when you use our cardiovascular risk calculation service.
            </p>
            <p>
              We are committed to protecting your privacy. This tool is designed to process clinical parameters 
              locally in your browser and does not store, transmit, or retain any patient-identifiable information.
            </p>
          </section>

          <section aria-labelledby="section-data-collection">
            <h2 id="section-data-collection">2. Information We Process</h2>
            <h3>Clinical Parameters (Processed Locally)</h3>
            <p>
              When you use the risk calculator, the following clinical values are processed entirely within your browser:
            </p>
            <ul>
              <li>Age (40&ndash;69 years)</li>
              <li>Sex (male/female)</li>
              <li>Systolic blood pressure (mmHg)</li>
              <li>Total cholesterol and HDL cholesterol (mmol/L or categorical)</li>
              <li>Smoking status (current smoker yes/no)</li>
              <li>Risk region calibration preference</li>
            </ul>
            <p>
              <strong>These values never leave your device.</strong> The SCORE2 calculation is performed via a serverless 
              API endpoint that receives the parameters, computes the risk score, and returns the result. No data is 
              logged, stored, or associated with any identifier.
            </p>

            <h3>Analytics Data (Anonymous)</h3>
            <p>
              With your consent, we use Vercel Analytics to collect anonymous usage statistics:
            </p>
            <ul>
              <li>Page views and navigation patterns</li>
              <li>Device type, browser, and country (approximate)</li>
              <li>Referrer source</li>
            </ul>
            <p>
              This data contains no clinical information, no IP addresses, and no personally identifiable information. 
              It is used solely to understand aggregate usage and improve the tool.
            </p>
          </section>

          <section aria-labelledby="section-purpose">
            <h2 id="section-purpose">3. Purpose of Processing</h2>
            <ul>
              <li><strong>Risk Calculation:</strong> To compute the 10-year CVD risk using the SCORE2 algorithm</li>
              <li><strong>Service Improvement:</strong> Anonymous analytics to understand usage patterns</li>
              <li><strong>Legal Compliance:</strong> To fulfill obligations under applicable law</li>
            </ul>
          </section>

          <section aria-labelledby="section-legal-basis">
            <h2 id="section-legal-basis">4. Legal Basis (GDPR)</h2>
            <ul>
              <li><strong>Legitimate Interest (Art. 6(1)(f)):</strong> Providing the risk calculation service you request</li>
              <li><strong>Consent (Art. 6(1)(a)):</strong> Analytics cookies (optional, revocable)</li>
            </ul>
          </section>

          <section aria-labelledby="section-data-retention">
            <h2 id="section-data-retention">5. Data Retention</h2>
            <ul>
              <li><strong>Clinical Parameters:</strong> Not retained. Processed in memory only during calculation.</li>
              <li><strong>Analytics Events:</strong> Retained by Vercel per their data retention policy (typically 30 days for raw events)</li>
              <li><strong>Cookie Consent Preference:</strong> Stored in your browser&apos;s localStorage until cleared</li>
            </ul>
          </section>

          <section aria-labelledby="section-third-parties">
            <h2 id="section-third-parties">6. Third-Party Processors</h2>
            <p>We use the following subprocessors:</p>
            <ul>
              <li><strong>Vercel Inc.</strong> &mdash; Hosting, serverless functions, and analytics (San Francisco, CA, USA)</li>
              <li><strong>Google Fonts (self-hosted via next/font)</strong> &mdash; Typography (no requests to Google at runtime)</li>
            </ul>
            <p>
              No clinical data is shared with any third party. Analytics data is processed by Vercel under their 
              Data Processing Agreement.
            </p>
          </section>

          <section aria-labelledby="section-user-rights">
            <h2 id="section-user-rights">7. Your Rights</h2>
            <p>Under GDPR and similar regulations, you have the right to:</p>
            <ul>
              <li>Access any personal data we hold (we hold none from clinical calculations)</li>
              <li>Request deletion of analytics data (contact Vercel directly)</li>
              <li>Withdraw consent for analytics at any time via the cookie banner</li>
              <li>Object to processing based on legitimate interest</li>
              <li>Lodge a complaint with a supervisory authority</li>
            </ul>
          </section>

          <section aria-labelledby="section-cookies">
            <h2 id="section-cookies">8. Cookies and Local Storage</h2>
            <ul>
              <li><strong>cookie-consent (localStorage):</strong> Stores your cookie preference (accepted/declined)</li>
              <li><strong>Vercel Analytics cookies:</strong> Only set if you accept; anonymized, no personal data</li>
            </ul>
            <p>See our <Link href="/cookies" className="text-gold hover:text-gold-muted underline">Cookie Policy</Link> for details.</p>
          </section>

          <section aria-labelledby="section-security">
            <h2 id="section-security">9. Security</h2>
            <p>
              All communication uses HTTPS/TLS 1.2+. The API endpoint is stateless and does not persist data. 
              No database is used. Content Security Policy headers are enforced.
            </p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">10. Children&apos;s Privacy</h2>
            <p>
              This tool is intended for use by healthcare professionals and adults aged 40&ndash;69 for clinical 
              decision support. We do not knowingly collect data from children under 16.
            </p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">11. Changes to This Policy</h2>
            <p>
              We may update this policy occasionally. The "Last updated" date at the top will reflect 
              the most recent revision. Continued use constitutes acceptance.
            </p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">12. Contact Information</h2>
            <p>
              For questions, feedback, or inquiries regarding this Privacy Policy or our data protection 
              practices, please contact the developer:
            </p>
            <p className="text-stone mt-2">
              <strong>Praveit Suhas</strong> (Developer, 2023&ndash;2026)<br />
              Email: <a href="mailto:praveitgs@gmail.com" className="text-gold hover:text-gold-muted underline">praveitgs@gmail.com</a><br />
              Project URL: <a href="https://clinical-dashboard-woad.vercel.app/" className="text-gold hover:text-gold-muted underline" target="_blank" rel="noopener noreferrer">https://clinical-dashboard-woad.vercel.app/</a>
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
              <Link href="/terms" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Terms of Service</Link>
              <Link href="/cookies" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Cookie Policy</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}