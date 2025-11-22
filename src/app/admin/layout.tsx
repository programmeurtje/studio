'use client';

import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

async function verifySession(): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/verify');
    if (!response.ok) {
      return false;
    }
    const data = await response.json();
    return data.isAdmin === true;
  } catch (error) {
    return false;
  }
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // De login pagina heeft geen verificatie nodig.
    if (pathname === '/admin/login') {
      setIsVerified(true); // Technically not verified, but we allow access
      setIsLoading(false);
      return;
    }

    verifySession().then((verified) => {
      if (verified) {
        setIsVerified(true);
      } else {
        router.push('/admin/login');
      }
      setIsLoading(false);
    });
  }, [pathname, router]);

  // De login pagina heeft geen sidebar layout nodig.
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
        <div className="flex min-h-screen">
            <div className="w-64 bg-secondary flex-shrink-0 border-r p-4 hidden md:flex flex-col gap-2">
                <Skeleton className="h-8 w-3/4 mb-8" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <main className="flex-1 p-4 md:p-8">
                <Skeleton className="h-12 w-1/3 mb-8" />
                <Skeleton className="h-64 w-full" />
            </main>
        </div>
    );
  }

  if (!isVerified) {
      // Dit wordt getoond terwijl de redirect naar /admin/login plaatsvindt.
      return null;
  }

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
