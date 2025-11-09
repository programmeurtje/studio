import { Leaf, Gem, Bird } from 'lucide-react';

const features = [
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: 'Duurzaam Leven',
    description: 'Elke Bosz Residence wordt gebouwd met hoogwaardige, milieuvriendelijke materialen en een minimale ecologische voetafdruk. Ontworpen voor de toekomst, met respect voor mens en natuur.',
  },
  {
    icon: <Gem className="h-8 w-8 text-primary" />,
    title: 'Luxe & Design',
    description: 'Onze residences combineren architecturaal vakmanschap met pure elegantie. Compact van formaat, groots in afwerking — perfectie in elk detail.',
    
  },
  {
    icon: <Bird className="h-8 w-8 text-primary" />,
    title: 'Vrijheid Zonder Grenzen',
    description: 'Met onze efficiënte prefab-productie en plaatsing zijn we operationeel in heel Nederland, België en Duitsland. De impact op de omgeving is minimaal en de nieuwe stikstofregels hebben géén invloed op de realisatie.',
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
