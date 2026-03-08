import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Github } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/Button';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/ThemeToggle';

const XLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 300 271" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="m236 0h46l-101 115 118 156h-92.6l-72.5-94.8-83 94.8h-46l107-123-113-148h94.9l65.5 86.6zm-16.1 244h25.5l-165-218h-27.4z"/>
  </svg>
);

export default function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 selection:bg-stone-200 dark:selection:bg-stone-700 transition-colors duration-300">
      
      {/* Navigation / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center bg-off-white/80 dark:bg-stone-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-off-white/50 dark:supports-[backdrop-filter]:bg-stone-900/50 transition-all duration-300">
        <Link to="/" className="font-serif italic text-xl tracking-tight text-ink dark:text-stone-50 hover:opacity-80 transition-opacity">
          Mikołaj Piech
        </Link>
        <div className="flex gap-4 items-center">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button href="/#contact" variant="outline" className="!px-5 !py-2 !text-xs tracking-wide hidden sm:inline-flex">
            {t('common.get_in_touch')}
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
          <h1 className="text-4xl md:text-5xl font-serif text-ink dark:text-stone-50 mb-10 leading-tight">Privacy Policy</h1>
          
          <div className="prose prose-stone dark:prose-invert prose-lg max-w-none font-light text-stone-600 dark:text-stone-300">
            <p className="text-stone-500 dark:text-stone-400 mb-8">Last updated: January 26, 2026</p>

            <p className="mb-6">
              Mikołaj Piech ("I", "me", or "my") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how I collect, use, store, and protect information when you use my website (<a href="https://mikolajpiech.com" className="text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all">https://mikolajpiech.com</a>) and any mobile applications I publish on Google Play or the Apple App Store (collectively "the Services").
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">1. Information I Collect</h3>
            
            <h4 className="text-xl font-medium text-ink dark:text-stone-50 mt-6 mb-3">A. Information You Provide Directly</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              <li className="text-stone-600 dark:text-stone-300">Email address and password (when you create an account)</li>
              <li className="text-stone-600 dark:text-stone-300">Display name or nickname</li>
              <li className="text-stone-600 dark:text-stone-300">Photos of homework/exercises you take within certain apps (stored securely on your device and in the cloud only for your personal use)</li>
              <li className="text-stone-600 dark:text-stone-300">User-provided images in the Meant app (which may contain faces or other personal depictions) – these are stored exclusively locally on your device and never uploaded to my servers</li>
              <li className="text-stone-600 dark:text-stone-300">Billing information processed through RevenueCat and the Google Play / Apple App Store payment systems (I never see or store your full payment card details)</li>
            </ul>

            <h4 className="text-xl font-medium text-ink dark:text-stone-50 mt-6 mb-3">B. Automatically Collected Information</h4>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              <li>Device information (device model, operating system version, unique device identifiers)</li>
              <li>Approximate location (derived from IP address)</li>
              <li>Usage data and crash reports (via Expo and related tools)</li>
              <li>Push notification token (to send you notifications if you enable them)</li>
              <li>In the future, if I display ads: Advertising ID (IDFA on iOS, AAID on Android) – resettable by you</li>
            </ul>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">2. How I Use Your Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              <li>To create and manage your account</li>
              <li>To provide and improve the Services</li>
              <li>To process subscriptions and payments via RevenueCat and the app stores</li>
              <li>To send push notifications (only if you allow them)</li>
              <li>To store your homework photos securely so you can access them across your devices</li>
              <li>In the Meant app: To enable user-requested AI image editing and generation by transmitting images to Google's Gemini API</li>
              <li>For analytics and crash reporting (to fix bugs and improve the apps)</li>
              <li>In the future, if I display ads via Google AdMob: to serve and measure personalized or non-personalized ads</li>
            </ul>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">3. Legal Basis (EEA/UK users – GDPR)</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              <li><strong>Contract:</strong> to provide the account, subscription, and core app features</li>
              <li><strong>Consent:</strong> push notifications, future personalized advertising</li>
              <li><strong>Legitimate interests:</strong> analytics, crash reporting, fraud prevention</li>
            </ul>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">4. Sharing of Information</h3>
            <p className="mb-4">I do not sell your personal data.</p>
            <p className="mb-4">Your data may be shared with the following trusted partners:</p>
            
            <div className="overflow-x-auto mb-8">
              <table className="min-w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-stone-200 dark:border-stone-700">
                    <th className="py-2 pr-4 font-medium text-ink dark:text-stone-50">Partner</th>
                    <th className="py-2 pr-4 font-medium text-ink dark:text-stone-50">Purpose</th>
                    <th className="py-2 pr-4 font-medium text-ink dark:text-stone-50">Privacy Policy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  <tr>
                    <td className="py-2 pr-4">RevenueCat</td>
                    <td className="py-2 pr-4">Subscription billing</td>
                    <td className="py-2 pr-4"><a href="https://revenuecat.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">revenuecat.com/privacy</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Apple App Store / Google Play</td>
                    <td className="py-2 pr-4">Payment processing & app distribution</td>
                    <td className="py-2 pr-4">
                      <a href="https://apple.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">apple.com</a> / <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">google.com</a>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Expo / EAS</td>
                    <td className="py-2 pr-4">App building, updates, analytics</td>
                    <td className="py-2 pr-4"><a href="https://expo.dev/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">expo.dev/privacy</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Firebase / Google Cloud</td>
                    <td className="py-2 pr-4">Crash reporting, cloud storage for homework photos</td>
                    <td className="py-2 pr-4"><a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">firebase.google.com</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Google LLC (Gemini API)</td>
                    <td className="py-2 pr-4">AI image generation and editing in the Meant app</td>
                    <td className="py-2 pr-4"><a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">ai.google.dev/gemini-api/terms</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Google AdMob (future)</td>
                    <td className="py-2 pr-4">Advertising (if implemented)</td>
                    <td className="py-2 pr-4"><a href="https://support.google.com/admob/answer/6128543" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink dark:hover:text-stone-200">support.google.com</a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mb-6">Data is primarily stored in the United States and the European Union.</p>

            {/* New dedicated section for Meant app image/face data – this makes it easy for Apple to find */}
            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">5. Image Data and Face Data in the Meant App</h3>
            <p className="mb-4">
              In the Meant app, you may provide images (via camera or photo library) that contain human faces for AI-based editing and generation. These images constitute pixel data and may include sensitive face depictions.
            </p>
            <p className="mb-4">
              <strong>Collection and Storage:</strong> Images are stored exclusively locally on your device in the app's private storage. I do not collect, upload, or store any images on my servers or in any database.
            </p>
            <p className="mb-4">
              <strong>Use:</strong> Images are processed locally and sent to Google's Gemini API solely to perform the user-requested AI image generation or editing. The app performs no facial recognition, biometric extraction, identification, tracking, or profiling.
            </p>
            <p className="mb-4">
              <strong>Disclosure and Sharing:</strong> Images are shared only with Google LLC (as the Gemini API provider) for temporary processing. The Meant app uses the paid tier of the Gemini API, where your inputs (including images) and outputs are <strong>not used to train or improve Google's models</strong>.
            </p>
            <p className="mb-4">
              <strong>Retention:</strong> Images are retained only on your device until you delete them or uninstall the app. Google processes images transiently and retains them only as necessary for API service provision (typically briefly; no long-term storage for training).
            </p>
            <p className="mb-6">
              For full details on Google's data handling, please see the <a href="https://ai.google.dev/gemini-api/terms" target="_blank" rel="noopener noreferrer" className="text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all">Gemini API Terms of Service</a> and <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all">Google Privacy Policy</a>.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">6. Data Retention</h3>
            <p className="mb-6">
              I keep your data only as long as your account exists or as needed to provide the Services. You can delete your account (and all associated data including homework photos) at any time from within the app settings. For images in the Meant app, retention is local to your device only.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">7. Your Rights & Choices</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6 text-stone-600 dark:text-stone-300">
              <li>Access, correct, or delete your personal data</li>
              <li>Withdraw consent (e.g., for push notifications or personalized ads)</li>
              <li>Opt out of future personalized advertising (via device settings)</li>
              <li>Request export of your data</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="mb-6">
              California residents: You have additional rights under CCPA/CPRA. I do not sell or share your personal information for cross-context behavioral advertising.
              <br/>
              To exercise any right, contact me at <a href="mailto:contact@mikolajpiech.com" className="text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all">contact@mikolajpiech.com</a>.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">8. Children’s Privacy</h3>
            <p className="mb-6">
              My apps are not directed to children under 13 (or 16 in the EEA). I do not knowingly collect personal information from children. If I learn that a child has provided personal information, I will delete it immediately.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">9. Security</h3>
            <p className="mb-6">
              I use industry-standard technical and organizational measures (encryption, secure cloud providers, access controls) to protect your data.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">10. International Transfers</h3>
            <p className="mb-6">
              Your data may be transferred to — and stored in — the United States or other countries outside your residence. I use appropriate safeguards (EU Standard Contractual Clauses, etc.) when required.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">11. Changes to This Policy</h3>
            <p className="mb-6">
              I may update this Privacy Policy from time to time. The new version will be posted on this page with an updated "Last updated" date. Significant changes will be notified inside the apps.
            </p>

            <h3 className="text-2xl font-serif text-ink dark:text-stone-50 mt-10 mb-4">12. Contact Me</h3>
            <p className="mb-2">Mikołaj Piech</p>
            <p className="mb-2">Email: <a href="mailto:contact@mikolajpiech.com" className="text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all">contact@mikolajpiech.com</a></p>
            <p className="mb-6">Website: <a href="https://mikolajpiech.com" className="text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4 hover:decoration-ink dark:hover:decoration-stone-50 transition-all">https://mikolajpiech.com</a></p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-ink text-off-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-stone-500">
            <p className="mb-4 md:mb-0">{t('common.all_rights_reserved', { year: new Date().getFullYear() })}</p>
            <div className="flex gap-8 items-center">
              <a href="mailto:hello@mikolajpiech.com" className="hover:text-off-white transition-colors">hello@mikolajpiech.com</a>
              <a href="https://x.com/mikolajpiech" className="hover:text-off-white transition-colors flex items-center gap-2">
                 <XLogo className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/in/mikolajpiech/" className="hover:text-off-white transition-colors">{t('common.linkedin')}</a>
              <a href="https://github.com/realmikolajpiech" className="hover:text-off-white transition-colors">GitHub</a>
              <Link to="/privacy-policy" className="text-off-white transition-colors">{t('common.privacy_policy')}</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
