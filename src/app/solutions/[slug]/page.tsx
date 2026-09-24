import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import DynamicSolutionPage from '@/components/solutions/dynamic-solution-page';
import { fetchAllSolutionSlugs, fetchSolutionBySlug } from '@/sanity/lib/solutions';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await fetchAllSolutionSlugs();
  return slugs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = await fetchSolutionBySlug(slug);

  if (!solution) {
    return {
      title: 'Solution Not Found | Waterlabs AI',
      description: 'The requested solution could not be found.',
    };
  }

  return {
    title: solution.seo?.metaTitle || `Solutions — ${solution.title} | Waterlabs AI`,
    description: solution.seo?.metaDescription || solution.hero.description,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const solution = await fetchSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <DynamicSolutionPage data={solution} />;
}
