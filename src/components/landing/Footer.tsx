"use client";

import * as React from 'react';
import Link from 'next/link';

export function Footer() {
    // This effect ensures the year is correct on client-side render
    const [year, setYear] = React.useState(new Date().getFullYear());
    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

  return (
    <footer className="py-8 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 md:px-6 flex flex-col sm:flex-row justify-center items-center text-center text-muted-foreground gap-2 sm:gap-4">
        <p className="font-body">&copy; {year} Bosz Houses. Alle rechten voorbehouden.</p>
        <div className="hidden sm:block border-l h-4 border-muted-foreground/50"></div>
        <Link href="/privacy" className="font-body hover:text-foreground transition-colors">
            Privacybeleid
        </Link>
      </div>
    </footer>
  );
}
