import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata({
  title: 'Track Your Order',
  description: "Ask for the status of your VM Pickle Pantry order on WhatsApp.",
  path: '/track-order',
  noindex: true,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
