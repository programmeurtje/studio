import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowDown } from 'lucide-react';

export function HeroSection() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <section className="relative h-screen flex items-center justify-center text-center text-primary-foreground">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 p-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tight text-white">
        Built by hands. Shaped by nature.
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-neutral-200 font-body">
          Ervaar de ultieme vrijheid met onze luxe, duurzame Bosz houses. Perfectie in elk detail.
        </p>
        <div className="mt-8 flex justify-center">
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
