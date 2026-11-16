export interface ContactSubmission {
  name: string;
  org: string;
  emailId: string;
  phoneNumber: string;
  company: string;
  orgType: string;
  challenge: string;
  agreed: boolean;
}

export type ContactField = keyof ContactSubmission;

export const CONTACT_TEXT_LIMIT = 320;
export const CONTACT_MESSAGE_LIMIT = 5000;
export const CONTACT_PHONE_LIMIT = 40;

const FIELD_LABELS: Record<ContactField, string> = {
  name: 'your name',
  org: 'your organization',
  emailId: 'your email address',
  phoneNumber: 'your phone number',
  company: 'your company',
  orgType: 'an organization type',
  challenge: 'your message',
  agreed: 'communications consent',
};

// Match the HTML email syntax, with a public domain required for this contact form.
const EMAIL_PATTERN =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function getContactFieldError(
  field: ContactField,
  value: unknown,
  orgTypeOptions?: readonly string[],
): string {
  if (field === 'agreed')
    return value === true ? '' : 'Please agree to receive communications before submitting.';
  if (typeof value !== 'string') return `Please enter ${FIELD_LABELS[field]}.`;

  const limit =
    field === 'challenge'
      ? CONTACT_MESSAGE_LIMIT
      : field === 'phoneNumber'
        ? CONTACT_PHONE_LIMIT
        : CONTACT_TEXT_LIMIT;
  if (value.length > limit) return `Please use ${limit} characters or fewer.`;

  // Single-line values cannot inject new lines into the plain-text email.
  // Free-text messages may contain tabs and line breaks, but no other controls.
  const controls = field === 'challenge' ? value.replace(/[\t\r\n]/g, '') : value;
  if (/\p{Cc}/u.test(controls)) return 'Please remove unsupported control characters.';

  const text = value.trim();
  if (!text && field !== 'phoneNumber' && field !== 'challenge')
    return `Please enter ${FIELD_LABELS[field]}.`;

  if (field === 'phoneNumber' && text) {
    const digits = text.replace(/\D/g, '');
    // Formatting is accepted, not proof that the number is assigned or reachable.
    if (
      !/^\+?[\d ()-]+$/.test(text) ||
      digits.length < 7 ||
      digits.length > 15 ||
      !/^([^()]*\(\d[\d ]*\))*[^()]*$/.test(text)
    )
      return 'Please enter a valid phone number.';
  }
  if (field === 'emailId' && !EMAIL_PATTERN.test(text))
    return 'Please enter an email address in the format you@example.com.';
  if (field === 'name' || field === 'org' || field === 'company') {
    if (/[<>]/.test(text)) return 'Please remove angle brackets or HTML markup.';
    if (!(field === 'name' ? /\p{L}/u : /[\p{L}\p{N}]/u).test(text))
      return `Please enter ${FIELD_LABELS[field]}, including ${field === 'name' ? 'a letter' : 'a letter or number'}.`;
  }
  if (field === 'orgType' && orgTypeOptions && !orgTypeOptions.includes(text))
    return 'Please select an organization type from the list.';
  return '';
}

export function parseContactSubmission(
  value: unknown,
  orgTypeOptions?: readonly string[],
): ContactSubmission | null {
  if (!value || typeof value !== 'object') return null;
  const input = value as Record<string, unknown>;
  const fields = [
    'name',
    'org',
    'emailId',
    'phoneNumber',
    'company',
    'orgType',
    'challenge',
  ] as const;
  if (
    fields.some(
      (field) =>
        typeof input[field] !== 'string' ||
        getContactFieldError(field, input[field], orgTypeOptions) !== '',
    )
  )
    return null;
  const data = Object.fromEntries(
    fields.map((field) => [field, (input[field] as string).trim()]),
  ) as unknown as Omit<ContactSubmission, 'agreed'>;
  if (getContactFieldError('agreed', input.agreed)) return null;
  return { ...data, agreed: true };
}
