import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';

const linkClass = 'text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4';

export default function DosoPrivacy() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 text-stone-600 dark:text-stone-300">
      <PageMeta
        title="Doso Privacy Policy"
        description="How Doso handles medication routines, Connected Family data, reminders, purchases, and optional AI features."
        path="/doso/privacy"
      />
      <SiteNav />
      <main className="pt-12 sm:pt-16 md:pt-20 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <article className="prose prose-stone dark:prose-invert prose-lg max-w-none font-light">
          <h1 className="text-4xl md:text-5xl font-serif text-ink dark:text-stone-50 mb-4">Doso Privacy Policy</h1>
          <p className="text-stone-500 dark:text-stone-400 mb-10">Effective September 8, 2026</p>

          <p>Doso is a medication-routine app operated by Mikołaj Piech. You can use its core medication schedule without creating an account. This policy explains what Doso processes when you use local medication tools, optional Connected Family, purchases, notifications, voice entry, and optional AI features.</p>

          <h2>Information stored on your device</h2>
          <p>Doso stores medication names, dosage and timing instructions, schedules, dose history, inventory information, local family profiles, app preferences, and reminder identifiers on your device. Device reminder identifiers are not uploaded to Connected Family.</p>

          <h2>Connected Family</h2>
          <p>If you enable Connected Family, Doso stores the account information supplied by Apple or Google, which can include your name and email address, a service-generated user identifier, household membership and role, shared profiles, medication plans and dose history, invitations, caregiver follow-up preferences and delivery records, and synchronization timestamps in Supabase.</p>
          <p>Accepted household members can view or update shared medication information according to their role. Owners manage medication plans and invitations. Caregivers can record doses and may choose private follow-up notifications. A notification says only that a shared dose has not been logged; it does not include a profile or medication name on the lock screen and does not claim the dose was missed.</p>

          <h2>Optional services</h2>
          <ul>
            <li><strong>Purchases:</strong> Apple and RevenueCat process product identifiers, transaction status, and an app-specific purchaser identifier to provide and restore Doso Plus. Doso does not receive your payment-card details.</li>
            <li><strong>Authentication and sync:</strong> Apple or Google authenticates your account. Supabase provides authentication, household storage, synchronization, and family-update delivery.</li>
            <li><strong>Notifications:</strong> If enabled, Expo may process a push token, device platform, account identifier, and household identifier to deliver Connected Family updates.</li>
            <li><strong>Voice entry:</strong> Dictating a medication routine uses the device microphone and platform speech-recognition service. You can enter every medication manually instead.</li>
            <li><strong>AI features:</strong> Only after separate consent, relevant medication names, a dictated medication transcript, and optional age or biological sex may be sent through Doso's server to xAI in the United States for medication parsing or interaction information. xAI states that API content is not used to train its foundation models and may retain API content for up to 30 days unless zero-data retention applies.</li>
          </ul>

          <h2>Retention and deletion</h2>
          <p>Local medication information remains until you delete it, uninstall Doso, or replace a profile with a backup. Doso includes controls to delete a profile's medication data.</p>
          <p>Connected Family information remains until the household owner deletes the connected account and household. Deleting an owner account deletes the household's shared profiles, medications, dose history, invitations, memberships, registered devices, and follow-up settings. Deleting a caregiver account removes that caregiver without deleting the owner's household. Subscription cancellation is managed separately through Apple.</p>

          <h2>Security and transfers</h2>
          <p>Doso uses encrypted HTTPS connections for Connected Family and authenticated row-level database policies. Health records use the app's private local storage and iOS complete file protection. Supabase, Expo, RevenueCat, Apple, Google, and xAI may process data outside your country. No security method can guarantee absolute protection.</p>

          <h2>Your choices</h2>
          <p>You may use Doso without Connected Family, deny microphone or notification access, enter medications manually, disable reminders or family notifications on a device, disable caregiver follow-ups, decline optional AI processing, export or delete local medication data, and delete a Connected Family account in the app.</p>

          <h2>Children and medical information</h2>
          <p>Doso is intended for adults managing their own medication routine or helping another person with appropriate authority and consent. It is not directed to children for independent use. Doso supports medication routines but does not diagnose, prescribe, or replace advice from a doctor or pharmacist.</p>

          <h2>Contact</h2>
          <p>For privacy questions or access and deletion requests, email <a className={linkClass} href="mailto:support@mikolajpiech.com">support@mikolajpiech.com</a>.</p>
          <p><Link className={linkClass} to="/doso/support">Doso support and account-deletion instructions</Link></p>
        </article>
      </main>
    </div>
  );
}
