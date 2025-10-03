import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';

export function GallerySection() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));

  return (
    <section className="py-20 sm:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
            Een Kijkje Binnen
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Ontdek het vakmanschap en de sfeer van Tiny Luxe.
          </p>
        </div>
        <div className="mt-16 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="break-inside-avoid">
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary transition-all duration-300">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  width={400}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-300 hover:scale-105"
                  data-ai-hint={image.imageHint}
                />
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
