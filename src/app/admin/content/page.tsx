import { ContentManager } from '@/components/admin/ContentManager';
import { adminDb } from '@/lib/firebase-admin';

async function getHeroContent() {
    const doc = await adminDb.collection('content_blocks').doc('hero').get();
    return doc.exists ? doc.data() as { title: string, subtitle: string, imageUrl: string } : undefined;
}

async function getValuePropositions() {
    const snapshot = await adminDb.collection('value_propositions').orderBy('order', 'asc').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as {
        id: string;
        icon: 'Leaf' | 'Gem' | 'Bird';
        title: string;
        description: string;
        order: number;
    }[];
}


export default async function AdminContentPage() {
  const heroContent = await getHeroContent();
  const valuePropositions = await getValuePropositions();

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-2">Content Blokken Beheren</h1>
      <p className="mb-8 text-muted-foreground">Pas hier de teksten en afbeeldingen van de belangrijkste content blokken aan.</p>
      <ContentManager heroContent={heroContent} valuePropositions={valuePropositions} />
    </div>
  );
}
