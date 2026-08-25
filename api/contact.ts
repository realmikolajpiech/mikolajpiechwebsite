import type { VercelRequest, VercelResponse } from '@vercel/node';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function respond(response: VercelResponse, status: number, message: string) {
  return response.status(status).json({ message });
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return respond(response, 405, 'Method not allowed.');
  }

  let payload: ContactPayload | undefined;

  try {
    payload = (typeof request.body === 'string'
      ? JSON.parse(request.body)
      : request.body) as ContactPayload | undefined;
  } catch {
    return respond(response, 400, 'Invalid request.');
  }

  const name = readText(payload?.name);
  const email = readText(payload?.email).toLowerCase();
  const company = readText(payload?.company);
  const message = readText(payload?.message);
  const website = readText(payload?.website);

  // Honeypot: bots often fill hidden fields. Return success without sending.
  if (website) {
    return respond(response, 200, 'Message sent.');
  }

  if (!name || name.length > 120) {
    return respond(response, 400, 'Please enter your name.');
  }

  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return respond(response, 400, 'Please enter a valid email address.');
  }

  if (company.length > 160) {
    return respond(response, 400, 'Company name is too long.');
  }

  if (message.length < 20 || message.length > 5000) {
    return respond(response, 400, 'Please write a message between 20 and 5,000 characters.');
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL || 'hello@mikolajpiech.com';
  const fromEmail = process.env.CONTACT_FROM_EMAIL || 'Mikołaj Piech Portfolio <contact@mikolajpiech.com>';

  if (!apiKey) {
    return respond(response, 500, 'The contact form is not configured yet. Please email me directly.');
  }

  const safeSubjectName = name.replace(/[\r\n]+/g, ' ').slice(0, 80);
  const emailText = [
    'New project inquiry from mikolajpiech.com',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'Not provided'}`,
    '',
    'Message:',
    message,
  ].join('\n');

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New project inquiry — ${safeSubjectName}`,
        text: emailText,
      }),
    });

    if (!resendResponse.ok) {
      return respond(response, 502, 'I couldn’t send your message. Please email me directly.');
    }

    return respond(response, 200, 'Message sent.');
  } catch {
    return respond(response, 502, 'I couldn’t send your message. Please email me directly.');
  }
}
