"use client";

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export function GoogleAnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || process.env.NODE_ENV !== 'production') {
      return;
    }
    
    const url = pathname + searchParams.toString();

    if (window.gtag) {
        window.gtag('config', GA_ID, {
          page_path: url,
        });
    }
  }, [pathname, searchParams]);

  return null;
}
