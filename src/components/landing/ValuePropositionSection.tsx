import { Leaf, Gem, Bird } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Duurzaam Leven',
    description: 'Onze tiny houses zijn gebouwd met milieuvriendelijke materialen en ontworpen voor een minimale ecologische voetafdruk.',
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: 'Betaalbare Luxe',
    description: 'Geniet van hoogwaardige afwerkingen en slim design dat luxe en comfort combineert zonder het hoge prijskaartje.',
  },
  {
    icon: <Bird className="h-8 w-8 text-primary" />,
    title: 'Ultieme Vrijheid',
    description: 'Leef waar je wilt, wanneer je wilt. Onze tiny houses bieden de flexibiliteit om je leven op jouw voorwaarden in te richten.',
  },
];

export function ValuePropositionSection() {
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
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto mb-6">
                {feature.icon}
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
