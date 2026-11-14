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

export function parseContactSubmission(value: unknown): ContactSubmission | null {
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
        (input[field] as string).length > (field === 'challenge' ? 5000 : 320),
    )
  )
    return null;
  const data = Object.fromEntries(
    fields.map((field) => [field, (input[field] as string).trim()]),
  ) as unknown as Omit<ContactSubmission, 'agreed'>;
  if (
    !data.name ||
    !data.org ||
    !data.company ||
    !data.orgType ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.emailId) ||
    typeof input.agreed !== 'boolean'
  )
    return null;
  return { ...data, agreed: input.agreed };
}
