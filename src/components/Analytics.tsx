'use client';

import { useEffect } from 'react';
import { analytics } from '@/firebase/client';

export function Analytics() {
  useEffect(() => {
    // This effect will run once on the client, which is enough to initialize Analytics
    // The 'analytics' promise will resolve and Analytics will be enabled.
  }, []);

  return null;
}
