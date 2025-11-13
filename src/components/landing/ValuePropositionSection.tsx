"use client";

import { Leaf, Gem, Bird } from 'lucide-react';
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, query, orderBy } from "firebase/firestore";
import { firestore } from "@/firebase/config";
import { Skeleton } from "@/components/ui/skeleton";

type Feature = {
  id: string;
  icon: 'Leaf' | 'Gem' | 'Bird';
  title: string;
  description: string;
};

const iconMap = {
  Leaf: <Leaf className="h-8 w-8 text-primary" />,
  Gem: <Gem className="h-8 w-8 text-primary" />,
  Bird: <Bird className="h-8 w-8 text-primary" />,
};

export function ValuePropositionSection() {
  const [value, loading, error] = useCollection(
    firestore ? query(collection(firestore, 'value_propositions'), orderBy('order', 'asc')) : null
  );

  const features: Feature[] = value ? value.docs.map(doc => ({ id: doc.id, ...doc.data() } as Feature)) : [];

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
            Waarom Bosz Houses?
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            De perfecte balans tussen duurzaamheid, luxe en vrijheid.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {loading && Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="text-center">
              <Skeleton className="h-16 w-16 rounded-full mx-auto mb-6" />
              <Skeleton className="h-7 w-32 mx-auto" />
              <Skeleton className="h-20 w-full mt-2" />
            </div>
          ))}
          {error && <p className="text-destructive col-span-3 text-center">Failed to load features.</p>}
          {!loading && features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-6">
                {iconMap[feature.icon] || <Gem className="h-8 w-8 text-primary" />}
              </div>
              <h3 className="text-xl font-headline font-semibold leading-7">{feature.title}</h3>
              <p className="mt-2 text-base leading-7 text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
