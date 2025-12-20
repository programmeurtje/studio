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
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Label } from '../ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '../ui/textarea';
import { CheckCircle } from 'lucide-react';

export function BrochureRequestDialog() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'initial' | 'success'>('initial');

  // State for optional fields
  const [interestCount, setInterestCount] = useState<string>();
  const [hasLocation, setHasLocation] = useState<string>();
  const [timeline, setTimeline] = useState<string>();
  const [additionalWishes, setAdditionalWishes] = useState('');

  const { toast } = useToast();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when dialog is closed with a delay to allow animation
      setTimeout(() => {
        setStep('initial');
        setEmail('');
        setError('');
        setInterestCount(undefined);
        setHasLocation(undefined);
        setTimeline(undefined);
        setAdditionalWishes('');
      }, 300);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (step === 'initial') {
      if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
        setError('Voer een geldig e-mailadres in.');
        return;
      }
    }

    setPending(true);
    const formspreeEndpoint = "https://formspree.io/f/xzzklldg";
    const formData = new FormData();
    
    formData.append('email', email);
    formData.append('_subject', step === 'initial' ? 'Nieuwe brochure aanvraag' : 'Brochure aanvraag met extra info');

    if (step === 'success') {
        formData.append('Aantal huisjes interesse', interestCount || 'Niet ingevuld');
        formData.append('Al een locatie', hasLocation || 'Niet ingevuld');
        formData.append('Realisatie termijn', timeline || 'Niet ingevuld');
        formData.append('Aanvullende wensen', additionalWishes || 'Niet ingevuld');
    }

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        if (step === 'initial') {
          setStep('success');
        } else {
          toast({
            title: "Bedankt!",
            description: "Uw aanvullende informatie is succesvol verzonden.",
          });
          handleOpenChange(false);
        }
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
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="font-headline font-bold text-lg text-primary transition-opacity hover:opacity-80">
          Brochure
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">
            {step === 'initial' ? 'Ontvang de Brochure' : 'Aanvraag succesvol!'}
          </DialogTitle>
          <DialogDescription>
            {step === 'initial' 
              ? 'Laat uw e-mailadres achter en wij sturen u de brochure per e-mail toe.'
              : 'De brochure is naar uw e-mailadres verzonden. U kunt dit venster sluiten.'
            }
          </DialogDescription>
        </DialogHeader>

        {step === 'initial' ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
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
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Verzenden..." : "Verstuur naar mijn e-mail"}
            </Button>
          </form>
        ) : (
          <div className="pt-4">
            <div className="flex items-center justify-center text-center p-4 rounded-lg bg-green-50 dark:bg-green-900/20 mb-6">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 mr-3" />
                <p className="text-green-800 dark:text-green-300">Brochure verzonden naar <strong>{email}</strong></p>
            </div>
          
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className='text-base'>Help ons u beter te helpen (optioneel)</AccordionTrigger>
                <AccordionContent>
                  <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                    <div className='space-y-3'>
                        <Label>Voor hoeveel huisjes heeft u interesse?</Label>
                        <RadioGroup value={interestCount} onValueChange={setInterestCount} className='gap-1'>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="1" id="r1-1" /><Label htmlFor="r1-1">1</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="2-5" id="r1-2" /><Label htmlFor="r1-2">2–5</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="5+" id="r1-3" /><Label htmlFor="r1-3">5+</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Nog niet zeker" id="r1-4" /><Label htmlFor="r1-4">Nog niet zeker</Label></div>
                        </RadioGroup>
                    </div>
                    <div className='space-y-3'>
                        <Label>Heeft u al een locatie waar het huisje/de huisjes geplaatst kunnen worden?</Label>
                        <RadioGroup value={hasLocation} onValueChange={setHasLocation} className='gap-1'>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Ja" id="r2-1" /><Label htmlFor="r2-1">Ja</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Nee" id="r2-2" /><Label htmlFor="r2-2">Nee</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Ik ben mij nog aan het oriënteren" id="r2-3" /><Label htmlFor="r2-3">Ik ben mij nog aan het oriënteren</Label></div>
                        </RadioGroup>
                    </div>
                    <div className='space-y-3'>
                        <Label>Wanneer zou u het huisje idealiter willen realiseren?</Label>
                        <RadioGroup value={timeline} onValueChange={setTimeline} className='gap-1'>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Zo snel mogelijk" id="r3-1" /><Label htmlFor="r3-1">Zo snel mogelijk</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Binnen 3-6 maanden" id="r3-2" /><Label htmlFor="r3-2">Binnen 3–6 maanden</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Binnen 6-12 maanden" id="r3-3" /><Label htmlFor="r3-3">Binnen 6–12 maanden</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Tijdslijn nog onbekend" id="r3-4" /><Label htmlFor="r3-4">Tijdslijn nog onbekend</Label></div>
                        </RadioGroup>
                    </div>
                     <div className='space-y-3'>
                        <Label htmlFor="wishes">Heeft u aanvullende wensen of vragen?</Label>
                        <Textarea id="wishes" placeholder="Laat hier uw bericht achter..." value={additionalWishes} onChange={(e) => setAdditionalWishes(e.target.value)} />
                    </div>
                    <p className="text-xs text-muted-foreground">Wij gebruiken deze informatie uitsluitend om u zo goed mogelijk te informeren. Uw gegevens worden niet gedeeld met derden.</p>
                    <Button type="submit" disabled={pending} className="w-full">
                      {pending ? "Verzenden..." : "Verstuur extra informatie"}
                    </Button>
                  </form>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
