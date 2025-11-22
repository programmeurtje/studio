import { OpenHouseDateManager } from '@/components/admin/OpenHouseDateManager';
import { adminDb } from '@/lib/firebase-admin';

async function getOpenHouseDates() {
    const snapshot = await adminDb.collection('open_house_dates').orderBy('createdAt', 'asc').get();
    if (snapshot.empty) {
        return [];
    }
    // We need to serialize the data because Server Components can't pass complex objects like Timestamps
    return snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            id: doc.id,
            month: data.month,
            days: data.days,
            // Convert Timestamp to a serializable format (e.g., ISO string)
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
        }
    });
}

export default async function AdminOpenHousePage() {
  const initialData = await getOpenHouseDates();

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Kijkdagen Beheren</h1>
      <p className="mb-8 text-muted-foreground">Voeg nieuwe kijkdagen toe, bewerk of verwijder bestaande datums.</p>
      <OpenHouseDateManager initialData={initialData} />
    </div>
  );
}
