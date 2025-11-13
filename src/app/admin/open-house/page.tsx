import { OpenHouseDateManager } from '@/components/admin/OpenHouseDateManager';

export default function AdminOpenHousePage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Kijkdagen Beheren</h1>
      <p className="mb-8 text-muted-foreground">Voeg nieuwe kijkdagen toe, bewerk of verwijder bestaande datums.</p>
      <OpenHouseDateManager />
    </div>
  );
}
