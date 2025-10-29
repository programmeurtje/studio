"use client";

import { CalendarDays, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '../ui/button';

type OpenHouseDate = {
  month: string;
  days: string;
};

const openHouseDates: OpenHouseDate[] = [
  { month: 'Oktober / November 2025', days: 'Vrijdag 31 & Zaterdag 1' },
  { month: 'December 2025', days: 'Vrijdag 5 & Zaterdag 6' },
  { month: 'Januari 2026', days: 'Vrijdag 2 & Zaterdag 3' },
  { month: 'Februari 2026', days: 'Vrijdag 6 & Zaterdag 7' },
  { month: 'Maart 2026', days: 'Vrijdag 6 & Zaterdag 7' },
  { month: 'April 2026', days: 'Vrijdag 3 & Zaterdag 4' },
];

const location = {
  address: "Daniël Goedkoopstraat 30, 1349 GJ Almere, Nederland",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Daniël+Goedkoopstraat+30,+1349+GJ+Almere,+Nederland"
};

export function OpenHouseSection() {

  return (
    <section id="kijkdagen" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
            Kijkdagen
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Kom langs en ervaar Bosz Houses zelf. Hieronder vindt u de geplande data en onze bezoeklocatie.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {openHouseDates.map((date) => (
            <Card 
              key={date.month} 
              className="text-center bg-card border-primary/20"
            >
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
        <div className="mt-16 max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-headline font-bold text-primary">Bezoeklocatie</h3>
            <div className="flex flex-col items-center gap-4 py-4 mt-4">
                <div className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-primary mt-1" />
                <div>
                    <p className="font-semibold text-foreground">Adres:</p>
                    <p className="text-muted-foreground">{location.address}</p>
                </div>
                </div>
                <Button asChild className="w-full max-w-xs mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
                <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                    Open in Google Maps
                </a>
                </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
