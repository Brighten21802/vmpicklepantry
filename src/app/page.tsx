import HomeClient from '@/components/HomeClient';
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: DEFAULT_TITLE,
  absoluteTitle: true,
  description: DEFAULT_DESCRIPTION,
  path: '/',
});

export default function HomePage() {
  return <HomeClient />;
}
