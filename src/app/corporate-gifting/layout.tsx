import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Corporate and Wedding Gifting',
  description: "Custom pickle hampers and bulk gift orders from VM Pickle Pantry for weddings, festivals, teams and clients.",
  path: '/corporate-gifting',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
