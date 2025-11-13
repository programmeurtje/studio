import { GalleryManager } from '@/components/admin/GalleryManager';

export default function AdminGalleryPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Galerij Beheren</h1>
      <p className="mb-8 text-muted-foreground">Beheer de afbeeldingen die op de website worden getoond.</p>
      <GalleryManager />
    </div>
  );
}
