import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service | CVD Risk Assessment',
  description:
    'Terms of Service for the AI-powered Cardiovascular Disease (CVD) Risk Assessment tool. Review medical disclaimers, user obligations, and clinical decision support terms.',
}

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-ivory text-stone py-10 px-4 sm:px-6 lg:px-8">
      <main id="main-content" className="max-w-4xl mx-auto" aria-labelledby="terms-heading">
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
              id="terms-heading"
              className="text-2xl sm:text-3xl lg:text-4xl font-serif text-charcoal tracking-tight"
            >
              Terms of Service
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
            aria-label="Critical Medical Disclaimer"
          >
            <h2 className="text-base font-semibold text-charcoal mt-0 mb-2">
              Important Medical Disclaimer: Not a Medical Device
            </h2>
            <p className="text-sm text-stone mb-0">
              The Cardiovascular Disease (CVD) Risk Assessment web application is strictly an educational
              and clinical decision support tool. It is not a certified medical device, does not provide
              diagnostic medical determinations, and must never substitute for individualized clinical
              judgment or professional healthcare evaluation.
            </p>
          </div>

          <section aria-labelledby="section-acceptance">
            <h2 id="section-acceptance">1. Acceptance of Terms</h2>
            <p>
              By accessing, browsing, or using the CVD Risk Assessment web application located at
              https://clinical-dashboard-woad.vercel.app/ (the &quot;Service&quot;), developed by Praveit Suhas
              (2023-2026), you acknowledge that you have read, understood, and agree to be legally bound
              by these Terms of Service (the &quot;Terms&quot;).
            </p>
            <p>
              If you do not agree to all provisions of these Terms, you must immediately discontinue
              use of the Service. Continued interaction with the Service signifies your ongoing agreement
              with these Terms.
            </p>
          </section>

          <section aria-labelledby="section-description">
            <h2 id="section-description">2. Description of the Service</h2>
            <p>
              The Service is an interactive, web-based clinical decision support platform designed to assist
              medical professionals, researchers, and students in exploring cardiovascular disease risk
              trajectories. Key technical capabilities include:
            </p>
            <ul>
              <li>
                Multi-horizon survival risk estimation (2-year, 5-year, and 10-year forecasts) generated
                via deep neural network survival analysis (DeepSurv).
              </li>
              <li>
                Explainable artificial intelligence (XAI) feature attribution using SHAP (SHapley Additive
                exPlanations) to interpret individual variable contributions to calculated risk scores.
              </li>
              <li>
                Stateless, real-time evaluation of physiological, biomarker, and lifestyle parameters
                without persistent retention of patient records.
              </li>
            </ul>
          </section>

          <section aria-labelledby="section-medical-disclaimer">
            <h2 id="section-medical-disclaimer">3. Comprehensive Medical Disclaimers</h2>
            <h3>A. Regulatory Status and Non-Device Classification</h3>
            <p>
              The Service is <strong>not</strong> a certified medical device under the United States Food,
              Drug, and Cosmetic Act (FD&amp;C Act), the European Union Medical Device Regulation (EU MDR
              2017/745), or equivalent worldwide regulatory frameworks. It has not been approved, cleared,
              or certified by the US FDA, the European Medicines Agency (EMA), or any national health authority.
            </p>
            <h3>B. Not a Substitute for Professional Judgment</h3>
            <p>
              Outputs produced by the Service (including risk percentages, trajectory curves, and SHAP
              attributions) represent statistical model estimates derived from historical survival datasets.
              They do not constitute medical diagnoses, clinical prognoses, treatment plans, or therapeutic
              prescriptions.
            </p>
            <p>
              Licensed healthcare professionals retain sole and exclusive responsibility for patient care,
              clinical evaluation, physical examinations, laboratory diagnostics, and therapeutic decisions.
              Non-clinical users must consult qualified physicians for any medical concerns or symptoms.
            </p>
            <h3>C. Emergency Care Prohibition</h3>
            <p>
              The Service must never be utilized in emergency medical situations, acute coronary events,
              or life-threatening circumstances. In the event of acute cardiac symptoms (such as sudden
              chest pain, shortness of breath, or palpitations), emergency medical services must be contacted
              immediately.
            </p>
          </section>

          <section aria-labelledby="section-user-responsibilities">
            <h2 id="section-user-responsibilities">4. User Responsibilities and Acceptable Use</h2>
            <p>As a condition of accessing the Service, you agree to the following commitments:</p>
            <ul>
              <li>
                <strong>Data Accuracy:</strong> You are responsible for ensuring that all clinical variables
                entered into the interface are accurately transcribed and represented.
              </li>
              <li>
                <strong>Patient Confidentiality:</strong> Healthcare providers must ensure compliance with
                applicable patient privacy regulations, including the Health Insurance Portability and
                Accountability Act (HIPAA), the General Data Protection Regulation (GDPR), and local medical
                privacy standards. You agree not to input direct personal identifiers.
              </li>
              <li>
                <strong>Professional Scope:</strong> Clinicians using the Service agree to apply model outputs
                strictly within their legitimate scope of medical licensure and practice.
              </li>
              <li>
                <strong>System Integrity:</strong> You agree not to disrupt, compromise, or overload the
                underlying infrastructure through automated scripting, denial-of-service attacks, reverse
                engineering, or unauthorized penetration testing.
              </li>
            </ul>
          </section>

          <section aria-labelledby="section-intellectual-property">
            <h2 id="section-intellectual-property">5. Intellectual Property Rights</h2>
            <p>
              All components of the Service - including software architecture, user interface designs, visual
              styling, algorithms, DeepSurv model integrations, SHAP explanation components, documentation,
              and brand designations - are the intellectual property of Praveit Suhas (Copyright 2023-2026),
              unless otherwise credited to third-party open-source libraries.
            </p>
            <p>
              You are granted a non-exclusive, non-transferable, revocable license to access and utilize the
              Service for non-commercial educational, clinical decision support, and research purposes in
              accordance with these Terms. You may not reproduce, redistribute, sell, or create derivative
              works without explicit written authorization.
            </p>
          </section>

          <section aria-labelledby="section-liability">
            <h2 id="section-liability">6. Limitation of Liability and Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT
              WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, CLINICAL ACCURACY, RELIABILITY, OR
              NON-INFRINGEMENT.
            </p>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT SHALL THE DEVELOPER (PRAVEIT SUHAS),
              CONTRIBUTORS, OR HOSTING PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
              CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES - INCLUDING DAMAGES FOR ADVERSE PATIENT OUTCOMES,
              MISDIAGNOSIS, LOSS OF USE, DATA LOSS, OR BUSINESS INTERRUPTION - ARISING OUT OF OR IN CONNECTION
              WITH THE USE OR INABILITY TO USE THE SERVICE.
            </p>
          </section>

          <section aria-labelledby="section-modifications">
            <h2 id="section-modifications">7. Modifications to the Service and Terms</h2>
            <p>
              We reserve the right to revise, modify, suspend, or discontinue any aspect of the Service or
              these Terms at any time without prior liability. When changes are made, the revised date at the
              top of this page will be updated. Your continued use of the Service after modifications have
              been posted constitutes your acceptance of the amended Terms.
            </p>
          </section>

          <section aria-labelledby="section-governing-law">
            <h2 id="section-governing-law">8. Governing Law and Severability</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable laws,
              without regard to conflict of law principles. If any provision of these Terms is deemed unlawful,
              void, or unenforceable by a court of competent jurisdiction, that provision shall be severable
              from these Terms and shall not affect the validity and enforceability of remaining provisions.
            </p>
          </section>

          <section aria-labelledby="section-privacy-link">
            <h2 id="section-privacy-link">9. Relationship to Privacy and Cookie Policies</h2>
            <p>
              Our handling of technical metadata and ephemeral clinical inputs is governed by our{' '}
              <Link href="/privacy" className="text-gold hover:text-gold-muted transition-colors">
                Privacy Policy
              </Link>{' '}
              and{' '}
              <Link href="/cookies" className="text-gold hover:text-gold-muted transition-colors">
                Cookie Policy
              </Link>
              . By using the Service, you acknowledge and agree to the operational safeguards detailed in those
              documents.
            </p>
          </section>

          <section aria-labelledby="section-contact-terms">
            <h2 id="section-contact-terms">10. Contact and Inquiries</h2>
            <p>
              For legal inquiries, academic citations, or technical feedback concerning these Terms of
              Service, please direct correspondence to:
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
