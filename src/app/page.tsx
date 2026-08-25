import { type HeroData } from '@/components/home/hero';
import HomePage from '@/components/home/page';
import { sanityFetch } from '@/sanity/lib/fetch';
import { homepageQuery } from '@/sanity/lib/queries';

export default async function Page() {
  const homepageData = await sanityFetch<HeroData>({
    query: homepageQuery,
    tags: ['homepage'],
  });

  return <HomePage data={homepageData} />;
}
