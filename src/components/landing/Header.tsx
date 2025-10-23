"use client";

import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo.png" 
            alt="Bosz Houses Logo" 
            width={48} 
            height={48}
            className="h-12 w-12"
            priority
          />
          <span className="text-2xl font-headline font-bold text-primary">Bosz Houses</span>
        </Link>
        <nav>
          <Link href="#contact" className="font-headline font-bold text-lg text-primary transition-opacity hover:opacity-80">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
