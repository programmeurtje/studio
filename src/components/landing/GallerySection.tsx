import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { adminDb } from '@/lib/firebase-admin';
import { cache } from 'react';
import { GalleryClient } from './GalleryClient';

export interface GalleryImage {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
}

const getGalleryImages = cache(async (): Promise<GalleryImage[]> => {
    try {
        const snapshot = await adminDb.collection('gallery_images').orderBy('order', 'asc').get();
        if (snapshot.empty) return [];
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as GalleryImage));
    } catch (error) {
        console.error("Error fetching gallery images:", error);
        return [];
    }
});


export async function GallerySection() {
  const galleryImages = await getGalleryImages();

  return (
    <section className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
              Een Kijkje Binnen
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ontdek het vakmanschap en de sfeer van Bosz Houses.
            </p>
          </div>
         <GalleryClient galleryImages={galleryImages} />
        </div>
    </section>
  );
}
