'use client';

import { LoginForm } from './login-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';

// De middleware handelt de redirect voor reeds ingelogde gebruikers af,
// dus de useEffect hier kan simpeler of zelfs weg. We laten een simpele
// loading state voor de UI.

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(true);

    // We kunnen een loading state aanhouden om te voorkomen dat de form kort flitst
    // terwijl de middleware zijn werk doet op de server.
    useEffect(() => {
        // Na een korte vertraging tonen we de content. De middleware heeft dan al
        // een redirect gedaan als dat nodig was.
        const timer = setTimeout(() => setIsLoading(false), 250);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return (
             <div className="flex min-h-screen items-center justify-center bg-secondary">
                <Card className="w-full max-w-md mx-4">
                    <CardHeader className="text-center">
                         <Skeleton className="h-8 w-3/4 mx-auto" />
                         <Skeleton className="h-4 w-1/2 mx-auto mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            </div>
        )
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline text-primary">Admin Login</CardTitle>
          <CardDescription>Log in om de website te beheren</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
