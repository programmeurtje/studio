"use client";

import * as React from 'react';

export function Footer() {
    // This effect ensures the year is correct on client-side render
    const [year, setYear] = React.useState(new Date().getFullYear());
    React.useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

  return (
    <footer className="py-8 border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 md:px-6 text-center text-muted-foreground">
        <p className="font-body">&copy; {year} Bosz Houses. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}
