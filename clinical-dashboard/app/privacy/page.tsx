import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | CVD Risk Assessment',
  description:
    'Privacy Policy for the AI-powered Cardiovascular Disease (CVD) Risk Assessment clinical decision support application. Learn how clinical data is processed with zero persistent storage.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory text-stone py-10 px-4 sm:px-6 lg:px-8">
      <main id="main-content" className="max-w-4xl mx-auto" aria-labelledby="privacy-heading">
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
              id="privacy-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal tracking-tight"
            >
              Privacy Policy
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
            aria-label="Data Architecture Notice"
          >
            <h2 className="text-base font-semibold text-charcoal mt-0 mb-2">
              Architecture Highlight: Zero Persistent Storage
            </h2>
            <p className="text-sm text-stone mb-0">
              This application operates on an ephemeral, stateless architecture. Clinical health
              parameters submitted for cardiovascular disease risk calculation are processed in volatile
              memory exclusively for the real-time inference request. No patient records, clinical variables,
              or assessment outputs are persistently stored on our servers or databases.
            </p>
          </div>

          <section aria-labelledby="section-overview">
            <h2 id="section-overview">1. Overview and Scope</h2>
            <p>
              This Privacy Policy applies to the Cardiovascular Disease (CVD) Risk Assessment web
              application accessible at https://clinical-dashboard-woad.vercel.app/ (the &quot;Application&quot;),
              developed by Praveit Suhas (2023-2026). The Application is an AI-powered clinical decision
              support tool designed to assist healthcare professionals in evaluating multi-horizon
              cardiovascular disease risk.
            </p>
            <p>
              We are committed to maintaining the highest standards of data privacy, confidentiality, and
              transparency. This policy outlines the categories of data processed, the technical mechanisms
              of calculation, data protection practices, and your rights as a user.
            </p>
          </section>

          <section aria-labelledby="section-data-collected">
            <h2 id="section-data-collected">2. What Data Is Collected</h2>
            <p>
              To perform survival risk predictions and generate explainability attributions, the Application
              processes two discrete categories of information:
            </p>
            <h3>A. Clinical Parameters (Patient Health Data)</h3>
            <p>
              Users may input specific physiological and lifestyle indicators for analysis:
            </p>
            <ul>
              <li>Demographics: Age and biological sex</li>
              <li>Anthropometrics: Height and weight (used to derive Body Mass Index)</li>
              <li>Vital Signs: Systolic and diastolic blood pressure levels</li>
              <li>Laboratory Biomarkers: Total cholesterol and blood glucose classifications</li>
              <li>Lifestyle Factors: Smoking history, alcohol consumption habits, and physical activity status</li>
            </ul>
            <p>
              No direct patient identifiers (such as patient full name, government identification number,
              medical record number, home address, or telephone number) are requested or required.
            </p>
            <h3>B. Technical and Usage Telemetry</h3>
            <p>
              When accessing the web application, basic technical metadata is transmitted through standard
              HTTP requests, including browser user-agent strings, general regional location derived from
              IP address, and interface interactions.
            </p>
          </section>

          <section aria-labelledby="section-how-used">
            <h2 id="section-how-used">3. How Information Is Used</h2>
            <p>The information submitted through the Application is utilized strictly for:</p>
            <ul>
              <li>
                Predicting multi-horizon cardiovascular disease risk across 2-year, 5-year, and 10-year
                timeframes using a DeepSurv survival analysis deep learning model.
              </li>
              <li>
                Calculating SHAP (SHapley Additive exPlanations) values to illustrate feature attribution
                and explain the relative impact of each clinical parameter on the overall risk score.
              </li>
              <li>
                Monitoring technical performance, network latency, and interface stability to ensure high
                availability for clinical decision support workflows.
              </li>
            </ul>
            <p>
              Patient data is never utilized for commercial advertising, cross-contextual tracking, model
              retraining on individual identifiable inputs, or user profiling.
            </p>
          </section>

          <section aria-labelledby="section-processing">
            <h2 id="section-processing">4. Data Processing (Client-Side and API)</h2>
            <p>The Application employs a hybrid computational pipeline:</p>
            <ul>
              <li>
                <strong>Client-Side Handling:</strong> Clinical parameters are captured through an interactive
                web interface. Form validations and pre-processing transformations occur locally within your
                web browser session.
              </li>
              <li>
                <strong>API Transmission and Inference:</strong> To run the DeepSurv neural network and
                SHAP explanation algorithms, parameters are transmitted via encrypted HTTPS requests to our
                secure backend API endpoints. The inference service computes survival curves and attribution
                weights in real time.
              </li>
              <li>
                <strong>Immediate Response:</strong> Once inference finishes, output scores are transmitted
                back to your browser for visual rendering. The request terminates and all payload variables
                are immediately released from execution memory.
              </li>
            </ul>
          </section>

          <section aria-labelledby="section-no-storage">
            <h2 id="section-no-storage">5. Zero Persistent Storage Commitment</h2>
            <p>
              We adhere strictly to the principle of data minimization and ephemeral processing. Specifically:
            </p>
            <ul>
              <li>
                <strong>No Database Storage:</strong> The Application does not maintain any persistent relational
                or document database containing patient inputs or calculated risk profiles.
              </li>
              <li>
                <strong>No Server Logging of Health Data:</strong> Web application access logs and error
                traces do not record clinical variables or health payloads.
              </li>
              <li>
                <strong>Local Browser Discard:</strong> When you reload the browser tab, navigate to another
                page, or close the window, all local session state is erased.
              </li>
            </ul>
          </section>

          <section aria-labelledby="section-analytics">
            <h2 id="section-analytics">6. Analytics and Cookies (Vercel Analytics)</h2>
            <p>
              We utilize Vercel Analytics to monitor aggregate website traffic, page responsiveness, and
              system availability. Vercel Analytics is designed with privacy at the forefront:
            </p>
            <ul>
              <li>Telemetry is aggregated, anonymized, and stripped of personal identifiers.</li>
              <li>Vercel Analytics does not log or inspect health parameters submitted in clinical forms.</li>
              <li>
                No invasive third-party cross-site cookies or advertising pixels are injected into your browser.
              </li>
            </ul>
            <p>
              For further details regarding tracking mechanisms and technical telemetry, please consult our
              dedicated{' '}
              <Link href="/cookies" className="text-gold hover:text-gold-muted transition-colors">
                Cookie Policy
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="section-third-party">
            <h2 id="section-third-party">7. Third-Party Services and Infrastructure</h2>
            <p>
              The Application relies on trusted cloud infrastructure to deliver secure and reliable web hosting:
            </p>
            <ul>
              <li>
                <strong>Vercel Inc.:</strong> Provides serverless hosting, edge network routing, and
                infrastructure telemetry. Vercel operates under stringent industry data processing agreements
                and security frameworks.
              </li>
            </ul>
            <p>
              We do not sell, rent, monetize, or disclose health data to data aggregators, pharmaceutical
              entities, insurers, or commercial third parties.
            </p>
          </section>

          <section aria-labelledby="section-security">
            <h2 id="section-security">8. Data Security Safeguards</h2>
            <p>
              We employ comprehensive technical and operational security controls to protect information during
              transmission:
            </p>
            <ul>
              <li>
                <strong>Transport Encryption:</strong> All communications between your browser and our servers
                are secured using modern Transport Layer Security (TLS 1.3 / HTTPS), preventing interception or
                eavesdropping.
              </li>
              <li>
                <strong>Stateless Server Architecture:</strong> By executing model inference in ephemeral
                serverless execution blocks, the risk of data compromise at rest is systematically eliminated.
              </li>
              <li>
                <strong>Code Integrity:</strong> Application codebases undergo regular security auditing,
                vulnerability scanning, and strict dependency verification.
              </li>
            </ul>
          </section>

          <section aria-labelledby="section-user-rights">
            <h2 id="section-user-rights">9. User Rights and Controls</h2>
            <p>
              Depending on your jurisdiction (such as under the European General Data Protection Regulation
              - GDPR, or the California Consumer Privacy Act - CCPA/CPRA), you possess specific legal rights
              concerning your data:
            </p>
            <ul>
              <li>Right to know what information is processed and how it is used.</li>
              <li>Right to object to or restrict processing.</li>
              <li>
                Right to erasure: Because we do not store health data persistently, there is no historical
                patient record to delete from our systems once an active session terminates.
              </li>
            </ul>
            <p>
              Users maintain absolute autonomy over clinical inputs: clearing the input fields or resetting
              the form immediately removes all data from the active client session.
            </p>
          </section>

          <section aria-labelledby="section-children">
            <h2 id="section-children">10. Children&apos;s Privacy</h2>
            <p>
              The CVD Risk Assessment tool is developed solely for adult cardiovascular risk stratification and
              educational clinical decision support. The underlying DeepSurv survival model is validated on adult
              cohorts and is not calibrated for pediatric use. We do not intentionally process or evaluate data
              from individuals under the age of 18.
            </p>
          </section>

          <section aria-labelledby="section-disclaimer-note">
            <h2 id="section-disclaimer-note">11. Clinical Decision Support Clarification</h2>
            <p>
              This Application is not a medical device and does not deliver primary medical diagnoses or
              independent treatment prescriptions. All generated scores are intended solely for clinical
              decision support by licensed medical practitioners. For complete terms regarding liability and
              clinical scope, please refer to our{' '}
              <Link href="/terms" className="text-gold hover:text-gold-muted transition-colors">
                Terms of Service
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="section-contact">
            <h2 id="section-contact">12. Contact Information</h2>
            <p>
              If you have questions, feedback, or inquiries regarding this Privacy Policy or our data protection
              practices, please contact the developer:
            </p>
            <p className="text-stone">
              <strong>Praveit Suhas</strong> (Developer, 2023-2026)
              <br />
              Email: <a href="mailto:praveitgs@gmail.com" className="text-gold hover:text-gold-muted transition-colors">praveitgs@gmail.com</a>
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
