import type { VercelRequest, VercelResponse } from '@vercel/node';

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
  browserContext?: {
    timezone?: unknown;
    language?: unknown;
  };
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readText(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    };

    return entities[character];
  });
}

function readHeader(request: VercelRequest, name: string) {
  const value = request.headers[name];
  return readText(Array.isArray(value) ? value[0] : value);
}

function decodeHeader(value: string) {
  if (!value) return '';

  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function readCoordinate(value: string, min: number, max: number) {
  if (!value) return '';
  const coordinate = Number(value);
  return Number.isFinite(coordinate) && coordinate >= min && coordinate <= max
    ? String(coordinate)
    : '';
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
  const timezone = readText(payload?.browserContext?.timezone).slice(0, 100);
  const language = readText(payload?.browserContext?.language).slice(0, 35);

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
  const emailSubject = `New project inquiry – ${safeSubjectName}`;
  const normalizedMessage = message
    .replace(/\r\n/g, '\n')
    .replace(/\\r\\n|\\n|\\r/g, '\n');
  // Vercel derives these values from the request IP without prompting the visitor.
  // They are approximate and may reflect a VPN or mobile-network exit point.
  const city = decodeHeader(readHeader(request, 'x-vercel-ip-city')).slice(0, 120);
  const region = decodeHeader(readHeader(request, 'x-vercel-ip-country-region')).slice(0, 120);
  const postalCode = decodeHeader(readHeader(request, 'x-vercel-ip-postal-code')).slice(0, 24);
  const countryHeader = readHeader(request, 'x-vercel-ip-country').toUpperCase();
  const country = /^[A-Z]{2}$/.test(countryHeader) ? countryHeader : '';
  const ipTimezone = decodeHeader(readHeader(request, 'x-vercel-ip-timezone')).slice(0, 100);
  const latitude = readCoordinate(readHeader(request, 'x-vercel-ip-latitude'), -90, 90);
  const longitude = readCoordinate(readHeader(request, 'x-vercel-ip-longitude'), -180, 180);
  const locationParts = [city, region, postalCode, country].filter(Boolean);
  const location = locationParts.length ? locationParts.join(', ') : 'Unavailable';
  const coordinates = latitude && longitude ? `${latitude}, ${longitude}` : 'Unavailable';
  const emailText = [
    'New project inquiry from mikolajpiech.com',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || 'Not provided'}`,
    `Approximate location: ${location}`,
    `Approximate coordinates: ${coordinates}`,
    `IP-derived timezone: ${ipTimezone || 'Unavailable'}`,
    `Browser timezone: ${timezone || 'Unavailable'}`,
    `Browser language: ${language || 'Unavailable'}`,
    '',
    'Message:',
    normalizedMessage,
  ].join('\n');
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeCompany = escapeHtml(company || 'Not provided');
  const safeMessage = escapeHtml(normalizedMessage).replace(/\n/g, '<br>');
  const safeLocation = escapeHtml(location);
  const safeCoordinates = escapeHtml(coordinates);
  const safeIpTimezone = escapeHtml(ipTimezone || 'Unavailable');
  const safeTimezone = escapeHtml(timezone || 'Unavailable');
  const safeLanguage = escapeHtml(language || 'Unavailable');
  const emailHtml = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New project inquiry</title>
  </head>
  <body style="margin:0;padding:0;background:#f2f0ec;color:#1c1917;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New project inquiry from ${safeName}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f2f0ec;">
      <tr>
        <td align="center" style="padding:40px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:620px;">
            <tr>
              <td style="padding:0 4px 18px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                  <tr>
                    <td style="font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#1c1917;">Mikołaj Piech</td>
                    <td align="right">
                      <span style="display:inline-block;border:1px solid #d6d3d1;border-radius:999px;padding:7px 11px;font-size:10px;font-weight:700;letter-spacing:1.4px;color:#78716c;">NEW INQUIRY</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#ffffff;border:1px solid #e7e5e4;border-radius:24px;padding:38px 40px;box-shadow:0 12px 40px rgba(28,25,23,.06);">
                <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#a8a29e;">NEW PROJECT INQUIRY</p>
                <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:36px;line-height:1.12;font-weight:400;color:#1c1917;">${safeName}</h1>
                <p style="margin:10px 0 30px;font-size:15px;line-height:1.6;color:#78716c;">Sent a message through mikolajpiech.com.</p>

                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse;">
                  <tr>
                    <td width="50%" valign="top" style="padding:17px 18px 17px 0;border-top:1px solid #e7e5e4;">
                      <p style="margin:0 0 7px;font-size:10px;font-weight:700;letter-spacing:1.25px;color:#a8a29e;">EMAIL</p>
                      <a href="mailto:${safeEmail}" style="font-size:14px;line-height:1.5;color:#1c1917;text-decoration:none;word-break:break-word;">${safeEmail}</a>
                    </td>
                    <td width="50%" valign="top" style="padding:17px 0 17px 18px;border-top:1px solid #e7e5e4;">
                      <p style="margin:0 0 7px;font-size:10px;font-weight:700;letter-spacing:1.25px;color:#a8a29e;">COMPANY</p>
                      <p style="margin:0;font-size:14px;line-height:1.5;color:#1c1917;">${safeCompany}</p>
                    </td>
                  </tr>
                </table>

                <div style="margin-top:8px;padding:18px 20px;border:1px solid #e7e5e4;border-radius:16px;">
                  <p style="margin:0 0 10px;font-size:10px;font-weight:700;letter-spacing:1.25px;color:#a8a29e;">APPROXIMATE LOCATION</p>
                  <p style="margin:0;font-size:14px;line-height:1.5;color:#1c1917;">${safeLocation}</p>
                  <p style="margin:5px 0 0;font-size:12px;line-height:1.5;color:#78716c;">Coordinates: ${safeCoordinates} &middot; IP timezone: ${safeIpTimezone}</p>
                  <p style="margin:3px 0 0;font-size:12px;line-height:1.5;color:#78716c;">Browser timezone: ${safeTimezone} &middot; Language: ${safeLanguage}</p>
                </div>

                <div style="margin-top:8px;padding:24px;border-radius:16px;background:#f7f6f3;">
                  <p style="margin:0 0 12px;font-size:10px;font-weight:700;letter-spacing:1.25px;color:#a8a29e;">MESSAGE</p>
                  <p style="margin:0;font-size:15px;line-height:1.75;color:#292524;">${safeMessage}</p>
                </div>

              </td>
            </tr>
            <tr>
              <td style="padding:18px 4px 0;font-size:11px;line-height:1.6;color:#a8a29e;">
                Sent securely from the contact form on mikolajpiech.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

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
        subject: emailSubject,
        text: emailText,
        html: emailHtml,
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
