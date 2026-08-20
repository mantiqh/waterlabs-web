import HomePage from '@/components/home/page';
import { sanityFetch } from '@/sanity/lib/fetch';
import { homepageQuery } from '@/sanity/lib/queries';

export default async function Page() {
  const homepageData = await sanityFetch({ query: homepageQuery, tags: ['homepage'] });

  return <HomePage data={homepageData} />;
}
