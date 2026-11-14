import { NextResponse } from 'next/server';
import { Resend } from 'resend';

import { checkContactRateLimit } from '@/lib/contact-rate-limit';
import { parseContactSubmission } from '@/lib/contact-submission';

export async function POST(request: Request) {
  // Vercel supplies this header; group requests without a trusted IP together.
  const ip = process.env.VERCEL
    ? request.headers.get('x-vercel-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    : 'unknown';
  const limit = checkContactRateLimit(ip);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfter) } },
    );
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (contentLength > 16_384)
    return NextResponse.json({ error: 'Submission is too large.' }, { status: 413 });

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  }
  const data = parseContactSubmission(input);
  if (!data)
    return NextResponse.json(
      { error: 'Please check the form fields and try again.' },
      { status: 400 },
    );

  const { RESEND_API_KEY, CONTACT_EMAIL_FROM, CONTACT_EMAIL_TO } = process.env;
  if (!RESEND_API_KEY || !CONTACT_EMAIL_FROM || !CONTACT_EMAIL_TO) {
    console.error('Contact email is not configured.');
    return NextResponse.json(
      { error: 'Unable to send your message. Please try again later.' },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_EMAIL_FROM,
      to: CONTACT_EMAIL_TO,
      replyTo: data.emailId,
      subject: 'New Waterlabs website contact request',
      text: `Name: ${data.name}\nOrganization: ${data.org}\nEmail: ${data.emailId}\nPhone: ${data.phoneNumber || 'Not provided'}\nCompany: ${data.company}\nOrganization type: ${data.orgType}\nChallenge: ${data.challenge || 'Not provided'}\nCommunications consent: ${data.agreed ? 'Yes' : 'No'}`,
    });
    if (error) {
      console.error('Contact email delivery failed:', error.name);
      return NextResponse.json(
        { error: 'Unable to send your message. Please try again later.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ success: true });
  } catch {
    console.error('Contact email request failed.');
    return NextResponse.json(
      { error: 'Unable to send your message. Please try again later.' },
      { status: 502 },
    );
  }
}
