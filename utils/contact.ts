export const emptyContactForm = { name: '', email: '', company: '', message: '', website: '' };
export type ContactFields = typeof emptyContactForm;

/** Shared by the static homepage and the React contact form. */
export async function submitContact(fields: ContactFields, errorMessage: string) {
  const response = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...fields,
      browserContext: {
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || '',
        language: navigator.language || '',
      },
    }),
  });
  const result = await response.json().catch(() => null) as { message?: string } | null;
  if (!response.ok || !result) throw new Error(errorMessage);
}
