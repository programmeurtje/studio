"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { sendEmail } from "@/app/actions";
import { Label } from "../ui/label";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={pending}>
      {pending ? "Verzenden..." : "Verstuur Bericht"}
    </Button>
  );
}

export function ContactSection() {
  const { toast } = useToast();
  
  const initialState = { message: null, errors: {}, success: false };
  const [state, dispatch] = useFormState(sendEmail, initialState);

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Bericht verzonden!",
        description: "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.",
      });
    } else if (state.message) {
      toast({
        variant: "destructive",
        title: "Oeps! Er is iets misgegaan.",
        description: state.message,
      });
    }
  }, [state, toast]);


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
              <form action={dispatch} className="space-y-6">
                 <div className="space-y-2">
                    <Label htmlFor="name">Naam</Label>
                    <Input id="name" name="name" placeholder="Uw naam" />
                    {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" placeholder="Uw e-mailadres" />
                    {state.errors?.email && <p className="text-sm font-medium text-destructive">{state.errors.email}</p>}
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="message">Bericht</Label>
                    <Textarea id="message" name="message" placeholder="Uw vraag of opmerking" rows={6} />
                    {state.errors?.message && <p className="text-sm font-medium text-destructive">{state.errors.message}</p>}
                </div>
                
                <SubmitButton />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
