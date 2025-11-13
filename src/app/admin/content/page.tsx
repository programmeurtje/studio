import { ContentManager } from '@/components/admin/ContentManager';

export default function AdminContentPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Content Blokken Beheren</h1>
      <p className="mb-8 text-muted-foreground">Pas hier de teksten en afbeeldingen van de belangrijkste content blokken aan.</p>
      <ContentManager />
    </div>
  );
}
