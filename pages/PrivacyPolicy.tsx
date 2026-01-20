import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github } from 'lucide-react';
import { Button } from '../components/Button';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
  </svg>
);

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-off-white selection:bg-stone-200">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 transition-all duration-300">
        <Link to="/" className="font-serif italic text-xl tracking-tight text-ink hover:opacity-80 transition-opacity">
          Mikołaj Piech
        </Link>
        <div className="flex gap-4">
          <Button href="/#contact" variant="outline" className="!px-5 !py-2 !text-xs tracking-wide">
            Get in touch
          </Button>
        </div>
      </nav>

      {/* Content Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-5xl font-serif text-ink mb-10 leading-tight">Privacy Policy</h1>
          
          <div className="prose prose-stone prose-lg max-w-none font-light">
            <p className="text-stone-500 mb-8">Last updated: November 25, 2025</p>

            <p className="mb-6">
              Mikołaj Piech ("I", "me", or "my") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how I collect, use, store, and protect information when you use my website (<a href="https://mikolajpiech.com" className="text-ink underline decoration-stone-300 underline-offset-4 hover:decoration-ink transition-all">https://mikolajpiech.com</a>) and any mobile applications I publish on Google Play or the Apple App Store (collectively "the Services").
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">1. Information I Collect</h3>
            
            <h4 className="text-xl font-medium text-ink mt-6 mb-3">A. Information You Provide Directly</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li>Email address and password (when you create an account)</li>
              <li>Display name or nickname</li>
              <li>Photos of homework/exercises you take within certain apps (stored securely on your device and in the cloud only for your personal use)</li>
              <li>Billing information processed through RevenueCat and the Google Play / Apple App Store payment systems (I never see or store your full payment card details)</li>
            </ul>

            <h4 className="text-xl font-medium text-ink mt-6 mb-3">B. Automatically Collected Information</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li>Device information (device model, operating system version, unique device identifiers)</li>
              <li>Approximate location (derived from IP address)</li>
              <li>Usage data and crash reports (via Expo and related tools)</li>
              <li>Push notification token (to send you notifications if you enable them)</li>
              <li>In the future, if I add advertising: Advertising ID (IDFA on iOS, AAID on Android) – resettable by you</li>
            </ul>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">2. How I Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li>To create and manage your account</li>
              <li>To provide and improve the Services</li>
              <li>To process subscriptions and payments via RevenueCat and the app stores</li>
              <li>To send push notifications (only if you allow them)</li>
              <li>To store your homework photos securely so you can access them across your devices</li>
              <li>For analytics and crash reporting (to fix bugs and improve the apps)</li>
              <li>In the future, if I display ads via Google AdMob: to serve and measure personalized or non-personalized ads</li>
            </ul>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">3. Legal Basis (EEA/UK users – GDPR)</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li><strong>Contract:</strong> to provide the account, subscription, and core app features</li>
              <li><strong>Consent:</strong> push notifications, future personalized advertising</li>
              <li><strong>Legitimate interests:</strong> analytics, crash reporting, fraud prevention</li>
            </ul>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">4. Sharing of Information</h3>
            <p className="mb-4">I do not sell your personal data.</p>
            <p className="mb-4">Your data may be shared with the following trusted partners:</p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200">
                    <th className="py-2 pr-4 font-medium text-ink">Partner</th>
                    <th className="py-2 pr-4 font-medium text-ink">Purpose</th>
                    <th className="py-2 pr-4 font-medium text-ink">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  <tr>
                    <td className="py-2 pr-4">RevenueCat</td>
                    <td className="py-2 pr-4">Subscription billing</td>
                    <td className="py-2 pr-4"><a href="https://revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">revenuecat.com/privacy</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Apple App Store / Google Play</td>
                    <td className="py-2 pr-4">Payment processing & app distribution</td>
                    <td className="py-2 pr-4">
                      <a href="https://apple.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">apple.com</a> / <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">google.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Expo / EAS</td>
                    <td className="py-2 pr-4">App building, updates, analytics</td>
                    <td className="py-2 pr-4"><a href="https://expo.dev/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">expo.dev/privacy</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Firebase / Google Cloud</td>
                    <td className="py-2 pr-4">Crash reporting, cloud storage for homework photos</td>
                    <td className="py-2 pr-4"><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">firebase.google.com</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Google AdMob (future)</td>
                    <td className="py-2 pr-4">Advertising (if implemented)</td>
                    <td className="py-2 pr-4"><a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">support.google.com</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-6">Data is primarily stored in the United States and the European Union.</p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">5. Data Retention</h3>
            <p className="mb-6">
              I keep your data only as long as your account exists or as needed to provide the Services. You can delete your account (and all associated data including homework photos) at any time from within the app settings.
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">6. Your Rights & Choices</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent (e.g., for push notifications or personalized ads)</li>
              <li>Opt out of future personalized advertising (via device settings)</li>
              <li>Request export of your data</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="mb-6">
              California residents: You have additional rights under CCPA/CPRA. I do not sell or share your personal information for cross-context behavioral advertising.
              <br/>
              To exercise any right, contact me at <a href="mailto:contact@mikolajpiech.com" className="text-ink underline decoration-stone-300 underline-offset-4 hover:decoration-ink transition-all">contact@mikolajpiech.com</a>.
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">7. Children’s Privacy</h3>
            <p className="mb-6">
              My apps are not directed to children under 13 (or 16 in the EEA). I do not knowingly collect personal information from children. If I learn that a child has provided personal information, I will delete it immediately.
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">8. Security</h3>
            <p className="mb-6">
              I use industry-standard technical and organizational measures (encryption, secure cloud providers, access controls) to protect your data.
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">9. International Transfers</h3>
            <p className="mb-6">
              Your data may be transferred to — and stored in — the United States or other countries outside your residence. I use appropriate safeguards (EU Standard Contractual Clauses, etc.) when required.
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">10. Changes to This Policy</h3>
            <p className="mb-6">
              I may update this Privacy Policy from time to time. The new version will be posted on this page with an updated "Last updated" date. Significant changes will be notified inside the apps.
            </p>

            <h3 className="text-2xl font-serif text-ink mt-10 mb-4">11. Contact Me</h3>
            <p className="mb-2">Mikołaj Piech</p>
            <p className="mb-2">Email: <a href="mailto:contact@mikolajpiech.com" className="text-ink underline decoration-stone-300 underline-offset-4 hover:decoration-ink transition-all">contact@mikolajpiech.com</a></p>
            <p className="mb-6">Website: <a href="https://mikolajpiech.com" className="text-ink underline decoration-stone-300 underline-offset-4 hover:decoration-ink transition-all">https://mikolajpiech.com</a></p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-ink text-off-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Mikołaj Piech. All rights reserved.</p>
            <div className="flex gap-8 items-center">
              <a href="mailto:hello@mikolajpiech.com" className="hover:text-off-white transition-colors">hello@mikolajpiech.com</a>
              <a href="https://x.com/mikolajpiech" className="hover:text-off-white transition-colors flex items-center gap-2">
                 <XLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/mikolajpiech/" className="hover:text-off-white transition-colors">LinkedIn</a>
              <a href="https://github.com/realmikolajpiech" className="hover:text-off-white transition-colors">GitHub</a>
              <Link to="/privacy-policy" className="text-off-white transition-colors">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
