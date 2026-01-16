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
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '../ui/scroll-area';

export function BrochureRequestDialog() {
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [language, setLanguage] = useState('Nederlands');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // State for optional fields
  const [interestCount, setInterestCount] = useState<string>();
  const [hasLocation, setHasLocation] = useState<string>();
  const [additionalWishes, setAdditionalWishes] = useState('');

  const { toast } = useToast();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when dialog is closed
      setTimeout(() => {
        setLanguage('Nederlands');
        setEmail('');
        setError('');
        setInterestCount(undefined);
        setHasLocation(undefined);
        setAdditionalWishes('');
      }, 300);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Voer een geldig e-mailadres in.');
      return;
    }

    setPending(true);
    const formspreeEndpoint = "https://formspree.io/f/xzzklldg";
    const formData = new FormData();
    
    formData.append('language', language);
    formData.append('email', email);
    formData.append('_subject', 'Nieuwe brochure aanvraag');
    formData.append('Aantal huisjes interesse', interestCount || 'Niet ingevuld');
    formData.append('Al een locatie', hasLocation || 'Niet ingevuld');
    formData.append('Aanvullende wensen', additionalWishes || 'Niet ingevuld');

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        toast({
          title: "Aanvraag verzonden!",
          description: `De brochure is verstuurd naar ${email}. Bedankt!`,
        });
        handleOpenChange(false);
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
      <DialogContent className="sm:max-w-md h-[90vh] max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 shrink-0">
          <DialogTitle className="font-headline text-2xl text-primary">
            Ontvang de Brochure
          </DialogTitle>
          <DialogDescription>
            Laat uw e-mailadres achter en wij sturen u de brochure direct toe. Vul eventueel de extra vragen in om ons te helpen u beter te adviseren.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 min-h-0 px-6">
            <div className="pb-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-3">
                        <Label>Taal / Language *</Label>
                        <RadioGroup value={language} onValueChange={setLanguage} className='flex gap-4'>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="Nederlands" id="lang-nl" /><Label htmlFor="lang-nl" className="font-normal">Nederlands</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="English" id="lang-en" /><Label htmlFor="lang-en" className="font-normal">English</Label></div>
                        </RadioGroup>
                    </div>
                
                    <div className="space-y-2">
                      <Label htmlFor="email">
                          E-mail *
                      </Label>
                      <Input
                          id="email"
                          name="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="uw.email@adres.nl"
                          required
                      />
                    </div>
                    {error && <p className="text-sm font-medium text-destructive text-center">{error}</p>}
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                          <AccordionTrigger className='text-base'>Uw wensen (optioneel)</AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-6 pt-4">
                                <div className='space-y-3'>
                                    <Label>Voor hoeveel huisjes heeft u interesse?</Label>
                                    <RadioGroup value={interestCount} onValueChange={setInterestCount} className='gap-2'>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="1" id="r1-1" /><Label htmlFor="r1-1" className="font-normal">1</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="2-5" id="r1-2" /><Label htmlFor="r1-2" className="font-normal">2–5</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="5+" id="r1-3" /><Label htmlFor="r1-3" className="font-normal">5+</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="Nog niet zeker" id="r1-4" /><Label htmlFor="r1-4" className="font-normal">Nog niet zeker</Label></div>
                                    </RadioGroup>
                                </div>
                                <div className='space-y-3'>
                                    <Label>Heeft u al een locatie waar het huisje/de huisjes geplaatst kunnen worden?</Label>
                                    <RadioGroup value={hasLocation} onValueChange={setHasLocation} className='gap-2'>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="Ja" id="r2-1" /><Label htmlFor="r2-1" className="font-normal">Ja</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="Nee" id="r2-2" /><Label htmlFor="r2-2" className="font-normal">Nee</Label></div>
                                        <div className="flex items-center space-x-2"><RadioGroupItem value="Ik ben mij nog aan het oriënteren" id="r2-3" /><Label htmlFor="r2-3" className="font-normal">Ik ben mij nog aan het oriënteren</Label></div>
                                    </RadioGroup>
                                </div>
                                <div className='space-y-3'>
                                    <Label htmlFor="wishes">Heeft u aanvullende wensen of vragen?</Label>
                                    <Textarea id="wishes" placeholder="Laat hier uw bericht achter..." value={additionalWishes} onChange={(e) => setAdditionalWishes(e.target.value)} />
                                </div>
                                <p className="text-xs text-muted-foreground">Wij gebruiken deze informatie uitsluitend om u zo goed mogelijk te informeren. Uw gegevens worden niet gedeeld met derden.</p>
                            </div>
                          </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                    <div className="pt-2">
                        <Button type="submit" disabled={pending} className="w-full">
                        {pending ? "Verzenden..." : "Verstuur en ontvang brochure"}
                        </Button>
                    </div>
                </form>
            </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
