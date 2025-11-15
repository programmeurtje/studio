import { MediaManager } from '@/components/admin/MediaManager';

export default function AdminMediaPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Media Bibliotheek</h1>
      <p className="mb-8 text-muted-foreground">Upload en beheer hier alle afbeeldingen voor de website.</p>
      <MediaManager />
    </div>
  );
}
