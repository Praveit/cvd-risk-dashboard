import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie policy for CVD Risk Assessment Tool.',
}

export default function CookiesPage() {
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
                  Cookie Policy
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
              Cookie Policy
            </h1>
            <p className="text-sm text-stone tracking-wide">
              Last updated: {lastUpdated}
            </p>
          </header>

          <section aria-labelledby="section-what">
            <h2 id="section-what">1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device (computer, tablet, or mobile) when you visit 
              a website. They help the site function properly, remember preferences, and understand how visitors 
              interact with the site.
            </p>
          </section>

          <section aria-labelledby="section-types">
            <h2 id="section-types">2. Cookies We Use</h2>
            
            <h3>Essential (Strictly Necessary)</h3>
            <p>These are required for the Service to function and cannot be disabled.</p>
            <table className="w-full text-sm mb-6" role="table">
              <thead>
                <tr className="text-left border-b border-champagne">
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Name</th>
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Type</th>
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Purpose</th>
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-champagne/50">
                  <td className="py-2 font-mono text-xs">cookie-consent</td>
                  <td className="py-2">localStorage</td>
                  <td className="py-2 text-stone">Stores your cookie preference (accepted/declined)</td>
                  <td className="py-2 text-stone">Until cleared</td>
                </tr>
              </tbody>
            </table>

            <h3>Analytics (Optional)</h3>
            <p>Only set with your explicit consent via the cookie banner.</p>
            <table className="w-full text-sm mb-6" role="table">
              <thead>
                <tr className="text-left border-b border-champagne">
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Provider</th>
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Purpose</th>
                  <th className="pb-2 font-medium text-charcoal uppercase tracking-wider">Data Collected</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-champagne/50">
                  <td className="py-2 font-medium">Vercel Analytics</td>
                  <td className="py-2 text-stone">Anonymous usage statistics</td>
                  <td className="py-2 text-stone">Page views, device type, browser, country (no IP, no PII)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-stone">
              Vercel Analytics does not use cookies by default; it uses a lightweight beacon. If cookies are used, 
              they are first-party, anonymized, and contain no clinical or personal data.
            </p>
          </section>

          <section aria-labelledby="section-consent">
            <h2 id="section-consent">3. Consent Management</h2>
            <p>
              On your first visit, a cookie banner appears requesting consent for analytics. You may:
            </p>
            <ul>
              <li><strong>Accept:</strong> Allows Vercel Analytics to collect anonymous usage data</li>
              <li><strong>Decline:</strong> Only the essential <code>cookie-consent</code> localStorage item is set</li>
            </ul>
            <p>
              You can change your preference at any time by clearing the <code>cookie-consent</code> item from 
              your browser&apos;s localStorage (Developer Tools &rarr; Application &rarr; Local Storage) and 
              reloading the page.
            </p>
          </section>

          <section aria-labelledby="section-control">
            <h2 id="section-control">4. Controlling Cookies</h2>
            <p>You can control cookies through your browser settings:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings &rarr; Privacy and security &rarr; Cookies and other site data</li>
              <li><strong>Firefox:</strong> Settings &rarr; Privacy & Security &rarr; Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data</li>
              <li><strong>Edge:</strong> Settings &rarr; Cookies and site permissions</li>
            </ul>
            <p>
              Blocking essential localStorage items may prevent the cookie banner from remembering your choice.
            </p>
          </section>

          <section aria-labelledby="section-data-protection">
            <h2 id="section-data-protection">5. Data Protection</h2>
            <p>
              No clinical parameters, patient identifiers, IP addresses, or personal data are stored in cookies 
              or localStorage. The <code>cookie-consent</code> value contains only "accepted" or "declined".
            </p>
            <p>
              Analytics data is processed by Vercel under their Data Processing Agreement and Privacy Policy. 
              See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-gold hover:text-gold-muted underline">Vercel Privacy Policy</a>.
            </p>
          </section>

          <section aria-labelledby="section-third-party">
            <h2 id="section-third-party">6. Third-Party Cookies</h2>
            <p>
              We do not use third-party advertising cookies, tracking pixels, social media widgets, or any 
              cookies from external domains other than Vercel (our hosting and analytics provider).
            </p>
          </section>

          <section aria-labelledby="section-changes">
            <h2 id="section-changes">7. Changes to This Policy</h2>
            <p>
              We may update this policy to reflect changes in our practices or legal requirements. The 
              "Last updated" date will reflect the most recent revision.
            </p>
          </section>

          <section aria-labelledby="section-cookies-contact">
            <h2 id="section-cookies-contact">8. Contact Information</h2>
            <p>
              For questions concerning our cookie handling practices or privacy infrastructure, please contact:
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
              <Link href="/privacy" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-stone hover:text-gold transition-colors tracking-wider uppercase">Terms of Service</Link>
            </nav>
          </div>
        </div>
      </footer>
    </main>
  )
}