import { CalendarDays } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const openHouseDates = [
  { month: 'November 2025', days: 'Vrijdag 1 & Zaterdag 2' },
  { month: 'December 2025', days: 'Vrijdag 6 & Zaterdag 7' },
  { month: 'Januari 2026', days: 'Vrijdag 3 & Zaterdag 4' },
  { month: 'Februari 2026', days: 'Vrijdag 7 & Zaterdag 8' },
  { month: 'Maart 2026', days: 'Vrijdag 7 & Zaterdag 8' },
  { month: 'April 2026', days: 'Vrijdag 4 & Zaterdag 5' },
];

export function OpenHouseSection() {
  return (
    <section id="kijkdagen" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
            Kijkdagen
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Kom langs en ervaar Bosz Houses zelf. Wees welkom op de volgende data.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {openHouseDates.map((date) => (
            <Card key={date.month} className="text-center bg-card border-primary/20 transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-foreground">{date.month}</CardTitle>
              </CardHeader>
              <CardContent className="pb-6">
                <div className="flex items-center justify-center gap-2">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <p className="text-lg font-medium text-muted-foreground">{date.days}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
