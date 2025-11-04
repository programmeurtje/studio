"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';

export function BrochureRequestDialog() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { toast } = useToast();

  const handleDirectDownload = () => {
    // Create a temporary link element and click it to trigger the download
    const link = document.createElement('a');
    link.href = '/brochure.pdf';
    link.setAttribute('download', 'Brochure-Bosz-Houses.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setOpen(false); // Close the dialog after download starts
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Voer een geldig e-mailadres in.');
      return;
    }

    setPending(true);

    // **BELANGRIJK**: Maak een nieuw Formspree formulier aan voor de brochure
    // en vervang de URL hieronder met uw eigen Formspree endpoint URL.
    const formspreeEndpoint = "https://formspree.io/f/YOUR_NEW_FORM_ID_FOR_BROCHURE";

    const formData = new FormData();
    formData.append('email', email);
    formData.append('_subject', 'Nieuwe brochure aanvraag');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        toast({
          title: "Aanvraag verzonden!",
          description: "Bedankt! U ontvangt de brochure binnen enkele minuten in uw mailbox.",
        });
        setEmail('');
        setOpen(false); // Close the dialog on success
      } else {
        throw new Error('Er is een probleem opgetreden bij het verzenden.');
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Oeps! Er is iets misgegaan.",
        description: "De aanvraag kon niet worden verzonden. Probeer het later opnieuw.",
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="font-headline font-bold text-lg text-primary transition-opacity hover:opacity-80">
          Brochure
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Ontvang de Brochure</DialogTitle>
          <DialogDescription>
            Laat uw e-mailadres achter en ontvang de brochure direct in uw mailbox.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="uw.email@adres.nl"
              className="col-span-3"
            />
          </div>
          {error && <p className="col-span-4 text-sm font-medium text-destructive text-center">{error}</p>}
          <Button type="submit" disabled={pending}>
            {pending ? "Verzenden..." : "Verstuur naar mijn e-mail"}
          </Button>
        </form>
        <DialogFooter className="sm:justify-center">
            <Button variant="link" size="sm" className="text-xs text-muted-foreground h-auto" onClick={handleDirectDownload}>
                Nee bedankt, direct downloaden
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
