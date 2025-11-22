import { GalleryManager } from '@/components/admin/GalleryManager';
import { adminDb } from '@/lib/firebase-admin';

async function getGalleryImages() {
    const snapshot = await adminDb.collection('gallery_images').orderBy('order', 'asc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as {
        id: string;
        imageUrl: string;
        description: string;
        imageHint: string;
        order: number;
    }[];
}

export default async function AdminGalleryPage() {
  const initialData = await getGalleryImages();
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Galerij Beheren</h1>
      <p className="mb-8 text-muted-foreground">Beheer de afbeeldingen die op de website worden getoond.</p>
      <GalleryManager initialData={initialData} />
    </div>
  );
}
