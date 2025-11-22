import { MediaManager } from '@/components/admin/MediaManager';
import { adminDb } from '@/lib/firebase-admin';

async function getMediaItems() {
    const snapshot = await adminDb.collection('media').orderBy('createdAt', 'desc').get();
    if (snapshot.empty) {
        return [];
    }
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            fileName: data.fileName,
            fullPath: data.fullPath,
            downloadUrl: data.downloadUrl,
            contentType: data.contentType,
            size: data.size,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        }
    });
}


export default async function AdminMediaPage() {
  const initialData = await getMediaItems();

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Media Bibliotheek</h1>
      <p className="mb-8 text-muted-foreground">Upload en beheer hier alle afbeeldingen voor de website.</p>
      <MediaManager initialData={initialData} />
    </div>
  );
}
