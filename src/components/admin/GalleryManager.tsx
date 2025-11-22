'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';
import { addGalleryImage, updateGalleryImage, deleteGalleryImage } from '@/app/admin/actions';
import { PlusCircle, Edit, Trash2, Library } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { adminDb } from '@/lib/firebase-admin';

type GalleryImage = {
  id: string;
  imageUrl: string;
  description: string;
  imageHint: string;
  order: number;
};

async function getGalleryImages() {
    const snapshot = await adminDb.collection('gallery_images').orderBy('order', 'asc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as GalleryImage[];
}


export function GalleryManager({ initialData }: { initialData: GalleryImage[] }) {
  const { toast } = useToast();
  const [galleryImages, setGalleryImages] = useState(initialData);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState<GalleryImage | null>(null);
  const [isPending, setIsPending] = useState(false);

  const refreshData = async () => {
    // This function can no longer be used as server functions can't be called from client
    // Instead we rely on revalidating the path and letting Next.js refetch
  };

  const openDialog = (image: GalleryImage | null = null) => {
    setCurrentImage(image);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    
    try {
      let result;
      if (currentImage) {
        result = await updateGalleryImage(currentImage.id, formData);
      } else {
        result = await addGalleryImage(formData);
      }

      if (result.error) throw new Error(result.error);
      
      toast({
        title: `Afbeelding ${currentImage ? 'bijgewerkt' : 'toegevoegd'}`,
        description: "De galerij is succesvol bijgewerkt.",
      });
      setIsDialogOpen(false);
      // Data will be refreshed by Next.js revalidation
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Oh nee! Er is iets misgegaan.',
        description: e.message || 'Kon de afbeelding niet opslaan.',
      });
    } finally {
        setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
      try {
        const result = await deleteGalleryImage(id);
        if (result.error) throw new Error(result.error);
        toast({
            title: 'Afbeelding verwijderd',
            description: 'De afbeelding is succesvol uit de galerij verwijderd.',
        });
        // Data will be refreshed by Next.js revalidation
      } catch(e: any) {
           toast({
            variant: 'destructive',
            title: 'Verwijderen mislukt',
            description: e.message || "Kon de afbeelding niet verwijderen.",
        });
      }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Galerij Afbeeldingen</CardTitle>
            <CardDescription>Beheer de afbeeldingen in de fotogalerij. U kunt URLs plakken of afbeeldingen uploaden via de <Link href="/admin/media" className="underline hover:text-primary">Media</Link> pagina.</CardDescription>
          </div>
          <Button onClick={() => openDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nieuwe Afbeelding
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {galleryImages.length === 0 && <p className="text-center text-muted-foreground">Nog geen afbeeldingen toegevoegd.</p>}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image) => (
            <Card key={image.id} className="group relative overflow-hidden">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={300}
                height={300}
                className="object-cover w-full h-full aspect-square"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                    <Button size="icon" variant="secondary" onClick={() => openDialog(image)}>
                        <Edit className="h-4 w-4" />
                    </Button>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button size="icon" variant="destructive">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </AlertDialogTrigger>
                         <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deze actie kan niet ongedaan worden gemaakt. Dit zal de afbeelding permanent verwijderen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(image.id)} className="bg-destructive hover:bg-destructive/90">
                                    Ja, verwijder
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentImage ? 'Bewerk Afbeelding' : 'Nieuwe Afbeelding Toevoegen'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="imageUrl">Afbeelding URL</Label>
              <Input id="imageUrl" name="imageUrl" defaultValue={currentImage?.imageUrl} placeholder="https://..." required />
            </div>
            <div>
              <Label htmlFor="description">Beschrijving</Label>
              <Input id="description" name="description" defaultValue={currentImage?.description} placeholder="Een korte beschrijving" required />
            </div>
            <div>
              <Label htmlFor="imageHint">AI Hint</Label>
              <Input id="imageHint" name="imageHint" defaultValue={currentImage?.imageHint} placeholder="bv. tiny house interior" />
            </div>
            <div>
              <Label htmlFor="order">Volgorde</Label>
              <Input id="order" name="order" type="number" defaultValue={currentImage?.order ?? galleryImages.length} required />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Annuleren</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>{isPending ? 'Opslaan...' : 'Opslaan'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
