import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Skeleton } from '../ui/skeleton';
import { adminDb } from '@/lib/firebase-admin';
import { cache } from 'react';

// Use React.cache to memoize the fetch request across server components
const getHeroContent = cache(async () => {
    try {
        const doc = await adminDb.collection('content_blocks').doc('hero').get();
        if (!doc.exists) {
            return null;
        }
        return doc.data() as { title: string; subtitle: string; imageUrl: string };
    } catch (error) {
        console.error("Error fetching hero content:", error);
        return null;
    }
});


export async function HeroSection() {
    const heroContent = await getHeroContent();

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-primary-foreground">
      {!heroContent && <Skeleton className="absolute inset-0" />}
      {heroContent && (
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
        {!heroContent ? (
            <>
                <Skeleton className="h-16 md:h-24 lg:h-28 w-3/4 mx-auto" />
                <Skeleton className="h-6 w-1/2 mx-auto mt-4" />
            </>
        ) : (
            <>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-white">
                    {heroContent.title}
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 font-body">
                    {heroContent.subtitle}
                </p>
            </>
        )}
        <div className="mt-8 flex justify-center gap-4">
           <Button asChild size="lg" className="bg-primary text-primary-foreground font-bold hover:bg-primary/90">
            <a href="#kijkdagen">
              Bezoek Onze Kijkdagen
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
