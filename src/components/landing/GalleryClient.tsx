'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import type { GalleryImage } from './GallerySection';

export function GalleryClient({ galleryImages }: { galleryImages: GalleryImage[] }) {
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
    <Dialog open={!!selectedImage} onOpenChange={handleOpenChange}>
      <div className="mt-16 columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {galleryImages.length === 0 && Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-64 w-full" />
        ))}
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
  );
}
