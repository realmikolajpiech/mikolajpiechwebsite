import React from 'react';
import { Link } from 'react-router-dom';
import { PageMeta } from '../components/PageMeta';
import { SiteNav } from '../components/SiteNav';

const linkClass = 'text-ink dark:text-stone-50 underline decoration-stone-300 dark:decoration-stone-600 underline-offset-4';

export default function DosoSupport() {
  return (
    <div className="min-h-screen bg-off-white dark:bg-stone-900 text-stone-600 dark:text-stone-300">
      <PageMeta
        title="Doso Support"
        description="Get help with Doso medication reminders, Connected Family, subscriptions, backups, and account deletion."
        path="/doso/support"
      />
      <SiteNav />
      <main className="pt-12 sm:pt-16 md:pt-20 pb-24 px-6 md:px-12 max-w-4xl mx-auto">
        <article className="prose prose-stone dark:prose-invert prose-lg max-w-none font-light">
          <h1 className="text-4xl md:text-5xl font-serif text-ink dark:text-stone-50 mb-4">Doso Support</h1>
          <p className="text-xl mb-10">Help with medication reminders, family sharing, purchases, and your data.</p>

          <h2>Contact support</h2>
          <p>Email <a className={linkClass} href="mailto:support@mikolajpiech.com?subject=Doso%20support">support@mikolajpiech.com</a>. Include your device model, iOS version, and what you expected to happen. Do not email medication details unless they are necessary to understand the issue.</p>

          <h2>Medication reminders</h2>
          <p>Open Doso → Settings and confirm Dose reminders is enabled for the selected profile. iPhone notifications must also be enabled in Settings → Notifications → Doso. Persistent follow-ups require the additional permissions requested by iOS.</p>

          <h2>Connected Family</h2>
          <p>Core medication reminders work without an account. Connected Family is optional and lets accepted household members synchronize selected medication profiles. Sign in from the Family tab, create a household or enter an invitation, and choose family-update or caregiver follow-up notifications separately.</p>

          <h2>Backups and reports</h2>
          <p>Settings includes a restorable JSON backup and a doctor-ready PDF report. Restoring a backup replaces the selected profile's medication data, so review the confirmation carefully.</p>

          <h2>Subscriptions</h2>
          <p>Open Doso → Settings → Doso Plus to purchase or restore access. Apple manages billing and cancellation in your Apple Account subscription settings. Deleting Doso data does not cancel an Apple subscription.</p>

          <h2>Delete local medication data</h2>
          <p>Open Doso → Settings → Delete medication data. This removes the selected profile's medications, dose history, and scheduled reminders from that device.</p>

          <h2>Delete a Connected Family account</h2>
          <p>Open Doso → Family → Connected Family account settings → Delete connected account and data. An owner deletion removes the household and its shared profiles, medication records, invitations, memberships, registered devices, and follow-up settings. A caregiver deletion removes that caregiver's access without deleting the owner's household.</p>
          <p>If you cannot access the app, email <a className={linkClass} href="mailto:support@mikolajpiech.com?subject=Doso%20account%20deletion">support@mikolajpiech.com</a> from the address associated with the account and request deletion.</p>

          <h2>Privacy</h2>
          <p>Read the <Link className={linkClass} to="/doso/privacy">Doso Privacy Policy</Link>.</p>
        </article>
      </main>
    </div>
  );
}
