import 'server-only'

import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'

import { client } from '../client'

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
  revalidate?: number | false
}) {
  const isDraftMode = (await draftMode()).isEnabled
  if (isDraftMode && !process.env.SANITY_API_READ_TOKEN) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.'
    )
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  return client
    .withConfig({
      useCdn: false,
    })
    .fetch<QueryResponse>(query, params, {
      ...(isDraftMode && {
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: 'previewDrafts',
      }),
      next: {
        revalidate: isDevelopment || isDraftMode ? 0 : revalidate,
        tags,
      },
    })
}
