import 'server-only'

import { draftMode } from 'next/headers'
import type { QueryParams } from 'next-sanity'

import { client } from '../client'

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  tags,
}: {
  query: string
  params?: QueryParams
  tags?: string[]
}) {
  const isDraftMode = (await draftMode()).isEnabled
  if (isDraftMode && !process.env.SANITY_API_READ_TOKEN) {
    throw new Error(
      'The `SANITY_API_READ_TOKEN` environment variable is required.'
    )
  }

  const isDevelopment = process.env.NODE_ENV === 'development'

  return client
    .withConfig({ useCdn: true })
    .fetch<QueryResponse>(query, params, {
      cache: isDevelopment || isDraftMode ? undefined : 'force-cache',
      ...(isDraftMode && {
        token: process.env.SANITY_API_READ_TOKEN,
        perspective: 'previewDrafts',
      }),
      next: {
        ...(isDraftMode && { revalidate: 0 }),
        tags,
      },
    })
}
