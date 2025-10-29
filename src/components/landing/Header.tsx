"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../ui/button';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="mx-auto flex h-20 max-w-none items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="Bosz Houses Logo" 
            width={72} 
            height={72}
            className="h-[72px] w-[72px]"
            priority
          />
          <span className="text-2xl font-headline font-bold text-primary">Bosz Houses</span>
        </Link>
        <nav className="flex items-center gap-4 md:gap-6">
          <span 
            className="font-headline font-bold text-lg text-muted-foreground transition-opacity cursor-not-allowed"
            title="Brochure binnenkort beschikbaar"
          >
            Brochure
          </span>
          <Link href="#contact" className="font-headline font-bold text-lg text-primary transition-opacity hover:opacity-80">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
