'use client';

import { useState } from 'react';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore';
import { doc, collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { updateHeroContent, updateValueProposition } from '@/app/admin/actions';
import { Skeleton } from '../ui/skeleton';

interface HeroContent {
  title: string;
  subtitle: string;
  imageUrl: string;
}

interface ValueProposition {
  id: string;
  icon: 'Leaf' | 'Gem' | 'Bird';
  title: string;
  description: string;
  order: number;
}

export function ContentManager() {
  const { toast } = useToast();
  
  // Hero Content
  const [heroValue, heroLoading, heroError] = useDocument(
    firestore ? doc(firestore, 'content_blocks', 'hero') : null
  );
  const heroContent = heroValue?.data() as HeroContent;
  const [isHeroPending, setIsHeroPending] = useState(false);

  // Value Propositions
  const [vpValue, vpLoading, vpError] = useCollection(
    firestore ? query(collection(firestore, 'value_propositions'), orderBy('order', 'asc')) : null
  );
  const valuePropositions = vpValue?.docs.map(doc => ({ id: doc.id, ...doc.data() } as ValueProposition)) ?? [];
  const [isVpPending, setIsVpPending] = useState(false);

  const handleHeroSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsHeroPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await updateHeroContent(formData);
      if (result.error) throw new Error(result.error);
      toast({ title: 'Hero sectie bijgewerkt!' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fout bij bijwerken', description: e.message });
    } finally {
      setIsHeroPending(false);
    }
  };

  const handleValuePropositionSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsVpPending(true);
    const formData = new FormData(event.currentTarget);
    const id = formData.get('id') as string;
    try {
      const result = await updateValueProposition(id, formData);
      if (result.error) throw new Error(result.error);
      toast({ title: 'Waardepropositie bijgewerkt!' });
    } catch (e: any) {
      toast({ variant: 'destructive', title: 'Fout bij bijwerken', description: e.message });
    } finally {
      setIsVpPending(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section Management */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Sectie</CardTitle>
          <CardDescription>Pas de hoofdtitel, subtitel en achtergrondafbeelding aan.</CardDescription>
        </CardHeader>
        <CardContent>
          {heroLoading && <div className="space-y-4"><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-full" /><Skeleton className="h-10 w-24 ml-auto" /></div>}
          {heroError && <p className="text-destructive">Kon de hero content niet laden.</p>}
          {heroContent && (
            <form onSubmit={handleHeroSubmit} className="space-y-4">
              <div>
                <Label htmlFor="heroTitle">Titel</Label>
                <Input id="heroTitle" name="title" defaultValue={heroContent.title} required />
              </div>
              <div>
                <Label htmlFor="heroSubtitle">Subtitel</Label>
                <Input id="heroSubtitle" name="subtitle" defaultValue={heroContent.subtitle} required />
              </div>
              <div>
                <Label htmlFor="heroImageUrl">Afbeelding URL</Label>
                <Input id="heroImageUrl" name="imageUrl" defaultValue={heroContent.imageUrl} required />
              </div>
              <div className="flex justify-end">
                <Button type="submit" disabled={isHeroPending}>{isHeroPending ? 'Opslaan...' : 'Opslaan'}</Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>

      {/* Value Proposition Management */}
      <Card>
        <CardHeader>
          <CardTitle>Waardeproposities</CardTitle>
          <CardDescription>Beheer de drie "Waarom Bosz Houses?" blokken.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {vpLoading && <div className="space-y-4"><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /><Skeleton className="h-40 w-full" /></div>}
            {vpError && <p className="text-destructive">Kon de waardeproposities niet laden.</p>}
            {valuePropositions.map((vp, index) => (
                <Card key={vp.id} className="bg-secondary/50 p-4">
                    <form onSubmit={handleValuePropositionSubmit} className="space-y-4">
                        <input type="hidden" name="id" value={vp.id} />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor={`vpTitle-${index}`}>Titel</Label>
                                <Input id={`vpTitle-${index}`} name="title" defaultValue={vp.title} required />
                            </div>
                            <div>
                                <Label htmlFor={`vpIcon-${index}`}>Icoon</Label>
                                <Select name="icon" defaultValue={vp.icon}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Kies een icoon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Leaf">Leaf</SelectItem>
                                        <SelectItem value="Gem">Gem</SelectItem>
                                        <SelectItem value="Bird">Bird</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor={`vpDesc-${index}`}>Beschrijving</Label>
                            <Input id={`vpDesc-${index}`} name="description" defaultValue={vp.description} required />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit" disabled={isVpPending} size="sm">{isVpPending ? 'Opslaan...' : 'Opslaan'}</Button>
                        </div>
                    </form>
                </Card>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
