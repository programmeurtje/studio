"use client";

import { useState } from 'react';
import Image from 'next/image';
import { models, type Model } from '@/lib/models';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Separator } from '@/components/ui/separator';
import { BrochureRequestDialog } from './BrochureRequestDialog';

export function ModelsSection() {
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);

  const handleContactClick = () => {
    setSelectedModel(null);
    // Timeout to allow the dialog to close before scrolling
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <section id="modellen" className="py-20 sm:py-32 bg-primary/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
              Kies Jouw Tiny House
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted-foreground">
              Ontdek de drie unieke smaken van Bosz Houses, elk met een eigen karakter en luxe.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {models.map((model) => (
              <Card key={model.id} className="flex flex-col overflow-hidden border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={model.images[0].imageUrl}
                    alt={model.images[0].description}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-2xl text-foreground">{model.name}</CardTitle>
                  <p className="text-muted-foreground pt-1">{model.positioning}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2 text-muted-foreground">
                    {model.specs.map((spec) => (
                      <li key={spec} className="flex items-start">
                        <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                        <span>{spec}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col items-start p-6 pt-4">
                    <div className="w-full text-left mb-4">
                        <p className="text-lg font-bold text-foreground">{model.price}</p>
                        {model.priceSubtext && <p className="text-xs text-muted-foreground">{model.priceSubtext}</p>}
                    </div>
                    <Button onClick={() => setSelectedModel(model)} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Bekijk details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedModel} onOpenChange={(isOpen) => !isOpen && setSelectedModel(null)}>
        <DialogContent className="max-w-5xl w-[95vw] h-[90vh] flex flex-col p-0">
          {selectedModel && (
            <>
              <DialogHeader className="p-6 pb-2 shrink-0">
                <DialogTitle className="font-headline text-3xl text-primary">{selectedModel.name}</DialogTitle>
                <DialogDescription>{selectedModel.positioning}</DialogDescription>
              </DialogHeader>
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 overflow-y-auto px-6 pb-6 min-h-0">
                 <div className="flex flex-col">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {selectedModel.images.map((img) => (
                          <CarouselItem key={img.id}>
                            <div className="relative aspect-video">
                              <Image src={img.imageUrl} alt={img.description} fill className="object-cover rounded-md" sizes="(max-width: 1280px) 45vw, 95vw"/>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="-left-2" />
                      <CarouselNext className="-right-2" />
                    </Carousel>
                 </div>
                 <div className="flex flex-col">
                    <div>
                        <h3 className="font-headline text-xl text-foreground">Specificaties</h3>
                        <ul className="space-y-2 text-muted-foreground mt-4">
                            {selectedModel.specs.map((spec) => (
                              <li key={spec} className="flex items-start">
                                <Check className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                                <span>{spec}</span>
                              </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-auto space-y-4 pt-6">
                        <Separator />
                        <div className="w-full text-left">
                            <p className="text-xl font-bold text-foreground">{selectedModel.price}</p>
                            {selectedModel.priceSubtext && <p className="text-sm text-muted-foreground">{selectedModel.priceSubtext}</p>}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <Button size="lg" className="flex-1" onClick={handleContactClick}>Contact opnemen</Button>
                            <BrochureRequestDialog>
                              <Button variant="outline" size="lg" className="flex-1">Brochure</Button>
                            </BrochureRequestDialog>
                        </div>
                    </div>
                 </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
