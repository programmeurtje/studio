"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { Skeleton } from '../ui/skeleton';

export function HeroSection() {
    const [value, loading, error] = useDocument(
        firestore ? doc(firestore, 'content_blocks', 'hero') : null
    );

    const heroContent = value?.data();

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-primary-foreground">
      {loading && <Skeleton className="absolute inset-0" />}
      {!loading && heroContent && (
        <Image
          src={heroContent.imageUrl}
          alt={heroContent.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="tiny house exterior"
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 max-w-4xl">
        {loading ? (
            <>
                <Skeleton className="h-16 md:h-24 lg:h-28 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </>
        ) : heroContent ? (
            <>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-white">
                    {heroContent.title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 font-body">
                    {heroContent.subtitle}
                </p>
            </>
        ): (
            <p className="text-destructive">Hero content could not be loaded.</p>
        )}
        <div className="mt-8 flex justify-center gap-4">
           <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90">
            <a href="#kijkdagen">
              Bezoek Onze Kijkdagen
            </a>
          </Button>
           <Button asChild size="lg" variant="outline" className="font-bold border-white text-white hover:bg-white/10">
            <a href="#contact">
              Start Uw Project
            </a>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
        <ArrowDown className="h-8 w-8 text-white animate-bounce" />
      </div>
    </section>
  );
}
