import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Contact VM Pickle Pantry',
  description: "Contact VM Pickle Pantry on WhatsApp or by email, or find MKS Cooking in Marol, Mumbai.",
  path: '/contact',
  absoluteTitle: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
