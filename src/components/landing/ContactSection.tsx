"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "../ui/label";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? "Verzenden..." : "Verstuur Bericht"}
    </Button>
  );
}

export function ContactSection() {
  const { toast } = useToast();
  const [pending, setPending] = useState(false);
  const [errors, setErrors] = useState<{name?: string, email?: string, message?: string}>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const message = formData.get('message') as string;

    const newErrors: {name?: string, email?: string, message?: string} = {};
    if (!name || name.length < 2) newErrors.name = "Naam moet minimaal 2 karakters lang zijn.";
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Voer een geldig e-mailadres in.";
    if (!message || message.length < 10) newErrors.message = "Bericht moet minimaal 10 karakters lang zijn.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setPending(false);
      return;
    }
    
    // **BELANGRIJK**: Vervang de URL hieronder met uw eigen Formspree endpoint URL.
    // U kunt deze vinden in de 'Integration' tab van uw Formspree formulier dashboard.
    const formspreeEndpoint = "https://formspree.io/f/YOUR_FORM_ID";

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
          title: "Bericht verzonden!",
          description: "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.",
        });
        (event.target as HTMLFormElement).reset();
      } else {
        throw new Error('Er is een probleem opgetreden bij het verzenden van het formulier.');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Oeps! Er is iets misgegaan.",
        description: "Het formulier kon niet worden verzonden. Probeer het later opnieuw.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="py-20 sm:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-headline font-bold tracking-tight text-primary sm:text-4xl">
            Neem Contact Op
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Heeft u vragen of wilt u meer informatie? Vul het formulier in en we helpen u graag verder.
          </p>
        </div>
        <div className="mt-16 max-w-xl mx-auto">
          <Card className="border-primary/20">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="name">Naam</Label>
                    <Input id="name" name="name" placeholder="Uw naam" />
                    {errors.name && <p className="text-sm font-medium text-destructive">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Uw e-mailadres" />
                    {errors.email && <p className="text-sm font-medium text-destructive">{errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="message">Bericht</Label>
                    <Textarea id="message" name="message" placeholder="Uw vraag of opmerking" rows={6} />
                    {errors.message && <p className="text-sm font-medium text-destructive">{errors.message}</p>}
                </div>
                
                <SubmitButton pending={pending} />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
