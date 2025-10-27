"use client";

import { useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';

type OpenHouseDate = {
  month: string;
  days: string;
};

const openHouseDates: OpenHouseDate[] = [
  { month: 'November 2025', days: 'Vrijdag 1 & Zaterdag 2' },
  { month: 'December 2025', days: 'Vrijdag 6 & Zaterdag 7' },
  { month: 'Januari 2026', days: 'Vrijdag 3 & Zaterdag 4' },
  { month: 'Februari 2026', days: 'Vrijdag 7 & Zaterdag 8' },
  { month: 'Maart 2026', days: 'Vrijdag 7 & Zaterdag 8' },
  { month: 'April 2026', days: 'Vrijdag 4 & Zaterdag 5' },
];

const location = {
  address: "Daniël Goedkoopstraat 30, 1349 GJ Almere, Nederland",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Daniël+Goedkoopstraat+30,+1349+GJ+Almere,+Nederland"
};

export function OpenHouseSection() {
  const [selectedDate, setSelectedDate] = useState<OpenHouseDate | null>(null);

  return (
    <section id="kijkdagen" className="py-20 sm:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
            Kijkdagen
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Kom langs en ervaar Bosz Houses zelf. Klik op een datum voor de locatie.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {openHouseDates.map((date) => (
            <Card 
              key={date.month} 
              className="text-center bg-card border-primary/20 transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
              onClick={() => setSelectedDate(date)}
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
      </div>
      
      <Dialog open={!!selectedDate} onOpenChange={(isOpen) => !isOpen && setSelectedDate(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">{selectedDate?.month}</DialogTitle>
            <DialogDescription className="pt-2">
              U bent van harte welkom op onze kijklocatie.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex items-start gap-4">
              <MapPin className="h-6 w-6 text-primary mt-1" />
              <div>
                <p className="font-semibold text-foreground">Locatie:</p>
                <p className="text-muted-foreground">{location.address}</p>
              </div>
            </div>
            <Button asChild className="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Google Maps
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </section>
  );
}
