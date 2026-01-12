'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Don't show header/footer on Keystatic admin pages
  const isKeystatic = pathname?.startsWith('/keystatic') || pathname?.startsWith('/api/keystatic');

  if (isKeystatic) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
