import { NextResponse } from 'next/server';

import { fetchSolutionNavItems } from '@/sanity/lib/solutions';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const items = await fetchSolutionNavItems();
    return NextResponse.json(items);
  } catch (error) {
    console.error('Failed to fetch solution nav items:', error);
    return NextResponse.json([], { status: 500 });
  }
}
