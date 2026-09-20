import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Cookie Policy | CVD Risk Assessment',
  description:
    'Cookie Policy for the CVD Risk Assessment web application. Understand how we utilize minimal technical cookies and privacy-first Vercel Analytics telemetry.',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-ivory text-stone py-10 px-4 sm:px-6 lg:px-8">
      <main id="main-content" className="max-w-4xl mx-auto" aria-labelledby="cookies-heading">
        <nav aria-label="Breadcrumb navigation" className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gold hover:text-gold-muted transition-colors"
            aria-label="Back to Dashboard"
          >
            Back to Dashboard
          </Link>
        </nav>

        <article className="glass-card legal-content p-6 sm:p-10 lg:p-12 border border-champagne rounded-luxury-lg">
          <header className="border-b border-champagne pb-6 mb-8">
            <h1
              id="cookies-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal tracking-tight"
            >
              Cookie Policy
            </h1>
            <p className="text-sm text-stone mt-2">
              Cardiovascular Disease (CVD) Risk Assessment Platform
            </p>
            <p className="text-xs text-stone-light mt-1">
              Last updated: September 2026
            </p>
          </header>

          <div
            className="p-5 rounded-luxury border border-champagne bg-champagne-light/60 my-6"
            role="region"
            aria-label="Privacy Summary"
          >
            <h2 className="text-base font-semibold text-charcoal mt-0 mb-2">
              Privacy-First Telemetry: No Commercial Tracking
            </h2>
            <p className="text-sm text-stone mb-0">
              The CVD Risk Assessment platform implements a minimal, privacy-centric approach to browser
              storage. We do not use third-party marketing cookies, cross-site trackers, or commercial
              profiling scripts. Patient health data is never associated with cookies or persistent identifiers.
            </p>
          </div>

          <section aria-labelledby="section-what-are-cookies">
            <h2 id="section-what-are-cookies">1. What Are Cookies?</h2>
            <p>
              Cookies are compact text files placed on your computer or mobile device by websites that you
              visit. They are widely used to facilitate web page operation, enhance navigation efficiency,
              remember local preferences, and report high-level usage metrics to website administrators.
            </p>
            <p>
              In addition to traditional HTTP cookies, modern web applications may utilize browser-based
              storage technologies such as LocalStorage and SessionStorage to retain interface states across
              page views without sending information back to external ad networks.
            </p>
          </section>

          <section aria-labelledby="section-cookies-used">
            <h2 id="section-cookies-used">2. What Cookies and Storage We Use</h2>
            <p>
              Our application at https://clinical-dashboard-woad.vercel.app/, developed by Praveit Suhas
              (2023-2026), uses only strictly necessary functional tokens and privacy-preserving analytics:
            </p>
            <h3>A. Essential and Functional Storage</h3>
            <p>
              These tokens are technically required to deliver core website functions, maintain layout
              stability, and preserve client-side session state during active clinical evaluations:
            </p>
            <ul>
              <li>
                <strong>Session State:</strong> Retains active form data during navigation within the browser
                session so inputs are not lost while reviewing model explanations.
              </li>
              <li>
                <strong>Preference Memory:</strong> Remembers user preferences (such as unit conventions or
                interface display modes) if configured.
              </li>
            </ul>
            <h3>B. Performance and Analytics Telemetry (Vercel Analytics)</h3>
            <p>
              We integrate Vercel Analytics to understand how visitors interact with the platform, evaluate
              computational response times, and diagnose edge routing errors. Key attributes include:
            </p>
            <ul>
              <li>
                <strong>Cookieless or Minimal Identifiers:</strong> Vercel Analytics is designed to capture
                performance metrics without building persistent cross-site behavioral profiles.
              </li>
              <li>
                <strong>Anonymized Telemetry:</strong> Metrics such as page load speed, geographic country/region,
                and browser platform are gathered in aggregate form.
              </li>
              <li>
                <strong>Zero Health Data Ingestion:</strong> Telemetry monitors system health and page views
                only. Patient physiological data, blood pressure values, lab biomarkers, and risk scores are
                never accessible to or recorded by analytics services.
              </li>
            </ul>
          </section>

          <section aria-labelledby="section-cookie-types">
            <h2 id="section-cookie-types">3. Summary Table of Browser Storage</h2>
            <p>
              The following table summarizes the purpose, category, and retention lifespan of technologies
              employed on this site:
            </p>
            <div className="overflow-x-auto my-4">
              <table className="w-full text-left text-sm border-collapse border border-champagne">
                <caption className="sr-only">Summary of browser storage and cookies utilized on this platform</caption>
                <thead>
                  <tr className="border-b border-champagne bg-champagne-light/40">
                    <th scope="col" className="p-3 font-semibold text-charcoal">Identifier / Service</th>
                    <th scope="col" className="p-3 font-semibold text-charcoal">Category</th>
                    <th scope="col" className="p-3 font-semibold text-charcoal">Purpose</th>
                    <th scope="col" className="p-3 font-semibold text-charcoal">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-champagne">
                  <tr>
                    <td className="p-3 font-mono text-xs text-charcoal">va_analytics</td>
                    <td className="p-3">Performance / Analytics</td>
                    <td className="p-3">Vercel Analytics telemetry for aggregate traffic and page load performance.</td>
                    <td className="p-3">Session to 12 months</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-mono text-xs text-charcoal">sessionStorage</td>
                    <td className="p-3">Strictly Necessary</td>
                    <td className="p-3">Maintains temporary risk calculation parameters during an active session.</td>
                    <td className="p-3">Browser session only</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="section-third-party">
            <h2 id="section-third-party">4. Third-Party Services and Cookies</h2>
            <p>
              The Application does not permit third-party advertising networks, marketing platforms, or social
              media widgets to place cookies on your device. The sole third-party operational service is:
            </p>
            <ul>
              <li>
                <strong>Vercel Inc.:</strong> Powers hosting, edge execution, and performance telemetry.
                Vercel complies with international data privacy standards and acts as a processor under
                strict security criteria.
              </li>
            </ul>
            <p>
              We do not sell, license, or monetize any telemetry data derived from user visits.
            </p>
          </section>

          <section aria-labelledby="section-manage-cookies">
            <h2 id="section-manage-cookies">5. How to Manage and Disable Cookies</h2>
            <p>
              You possess complete control over the storage of cookies on your browser. Most browsers allow
              you to view, delete, or block cookies through their privacy settings:
            </p>
            <ul>
              <li>
                <strong>Google Chrome:</strong> Settings &gt; Privacy and Security &gt; Cookies and other site data
              </li>
              <li>
                <strong>Mozilla Firefox:</strong> Options &gt; Privacy &amp; Security &gt; Cookies and Site Data
              </li>
              <li>
                <strong>Apple Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data
              </li>
              <li>
                <strong>Microsoft Edge:</strong> Settings &gt; Cookies and site permissions &gt; Manage and delete cookies
              </li>
            </ul>
            <p>
              Because our clinical calculations operate via direct API requests, blocking or clearing
              optional cookies will not prevent you from using the CVD Risk Assessment tool.
            </p>
          </section>

          <section aria-labelledby="section-policy-updates">
            <h2 id="section-policy-updates">6. Policy Updates</h2>
            <p>
              We may periodically revise this Cookie Policy to reflect technical enhancements, infrastructure
              adjustments, or legal requirements. Any modifications will be published directly on this page
              with an updated &quot;Last updated&quot; timestamp.
            </p>
          </section>

          <section aria-labelledby="section-cookies-contact">
            <h2 id="section-cookies-contact">7. Contact Information</h2>
            <p>
              For questions concerning our cookie handling practices or privacy infrastructure, please contact:
            </p>
            <p className="text-stone">
              <strong>Praveit Suhas</strong> (Developer, 2023-2026)
              <br />
              Project URL: https://clinical-dashboard-woad.vercel.app/
            </p>
          </section>

          <footer className="mt-12 pt-6 border-t border-champagne flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-stone">
            <div>Developed by Praveit Suhas (2023-2026)</div>
            <nav aria-label="Legal documents" className="flex flex-wrap gap-4">
              <Link href="/privacy" className="text-gold hover:text-gold-muted transition-colors">
                Privacy Policy
              </Link>
              <span className="text-sand" aria-hidden="true">|</span>
              <Link href="/terms" className="text-gold hover:text-gold-muted transition-colors">
                Terms of Service
              </Link>
              <span className="text-sand" aria-hidden="true">|</span>
              <Link href="/cookies" className="text-gold hover:text-gold-muted transition-colors">
                Cookie Policy
              </Link>
            </nav>
          </footer>
        </article>
      </main>
    </div>
  )
}
