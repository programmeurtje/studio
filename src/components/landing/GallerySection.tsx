"use client";

import Image from 'next/image';
import { PlaceHolderImages, type ImagePlaceholder } from '@/lib/placeholder-images';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

export function GallerySection() {
  const galleryImages = PlaceHolderImages.filter(p => p.id.startsWith('gallery-'));
  const [selectedImage, setSelectedImage] = useState<ImagePlaceholder | null>(null);

  const handleImageClick = (image: ImagePlaceholder) => {
    setSelectedImage(image);
  };

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedImage(null);
    }
  };

  return (
    <section className="py-20 sm:py-32 bg-primary/5">
      <Dialog open={!!selectedImage} onOpenChange={handleOpenChange}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
              Een Kijkje Binnen
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ontdek het vakmanschap en de sfeer van Bosz Houses.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {galleryImages.map((image) => {
               const ratio =
                image.ratio === "landscape"
                  ? "aspect-[4/3]"
                  : image.ratio === "square"
                  ? "aspect-square"
                  : "aspect-[3/4]"; // portrait default

              return (
                <div
                  key={image.id}
                  className="group cursor-pointer"
                  onClick={() => handleImageClick(image)}
                >
                  <Card className="overflow-hidden border-2 border-transparent group-hover:border-primary transition-all duration-300">
                    <div className={cn("relative w-full", ratio)}>
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={image.imageHint}
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {selectedImage && (
          <DialogContent className="max-w-4xl p-2 bg-transparent border-none">
             <div className="relative w-full max-h-[85vh] h-[85vh]">
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.description}
                  fill
                  className="object-contain rounded-lg"
                  data-ai-hint={selectedImage.imageHint}
                />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
