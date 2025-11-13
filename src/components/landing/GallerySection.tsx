"use client";

import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { Skeleton } from '@/components/ui/skeleton';

export interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

export function GallerySection() {
  const [value, loading, error] = useCollection(
    firestore ? query(collection(firestore, 'gallery_images'), orderBy('order', 'asc')) : null
  );

  const galleryImages: GalleryImage[] = value ? value.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage)) : [];
  
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const handleImageClick = (image: GalleryImage) => {
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
          <div className="mt-16 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
             {loading && Array.from({length: 8}).map((_, i) => (
              <Skeleton key={i} className="h-64 w-full" />
            ))}
            {error && <p className="text-destructive col-span-full text-center">Failed to load images.</p>}
            {galleryImages.map((image) => (
              <div
                key={image.id}
                className="break-inside-avoid cursor-pointer"
                onClick={() => handleImageClick(image)}
              >
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

        {selectedImage && (
          <DialogContent className="max-w-4xl p-2 bg-transparent border-none">
            <Image
              src={selectedImage.imageUrl}
              alt={selectedImage.description}
              width={1200}
              height={800}
              className="w-full h-auto object-contain rounded-lg"
              data-ai-hint={selectedImage.imageHint}
            />
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}
