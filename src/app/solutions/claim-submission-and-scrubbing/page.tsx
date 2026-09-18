import type { Metadata } from 'next';

import ClaimSubmissionPage from '@/components/solutions/claim-submission-and-scrubbing/page';

export const metadata: Metadata = {
  title: 'Solutions — Claim Submission and Scrubbing | Waterlabs AI',
  description:
    'Claims that go out clean the first time. Our agents review each claim against payer rules before submission, preventing delays caused by requests for information you have already provided.',
};

export default function Page() {
  return <ClaimSubmissionPage />;
}
