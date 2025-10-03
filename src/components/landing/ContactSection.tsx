"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Naam moet minimaal 2 karakters lang zijn.",
  }),
  email: z.string().email({
    message: "Voer een geldig e-mailadres in.",
  }),
  message: z.string().min(10, {
    message: "Bericht moet minimaal 10 karakters lang zijn.",
  }),
});

export function ContactSection() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Bericht verzonden!",
      description: "Bedankt voor uw bericht. We nemen zo snel mogelijk contact met u op.",
    });
    form.reset();
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
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Naam</FormLabel>
                        <FormControl>
                          <Input placeholder="Uw naam" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Uw e-mailadres" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bericht</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Uw vraag of opmerking" {...field} rows={6} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="lg" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Verstuur Bericht
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
