'use server'

import { z } from 'zod';

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

export type State = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string | null;
  success: boolean;
};


export async function sendEmail(prevState: State, formData: FormData): Promise<State> {
    const validatedFields = formSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Validatie mislukt. Controleer de velden.',
            success: false,
        };
    }

    const { name, email, message } = validatedFields.data;

    try {
        console.log("--- Contact Form Submission ---");
        console.log("Name:", name);
        console.log("Email:", email);
        console.log("Message:", message);
        console.log("-----------------------------");
        
        // Hier zou de logica komen om een e-mail te sturen.
        // Omdat er nog geen e-mailservice is geconfigureerd,
        // loggen we de data alleen op de server.

        return { success: true, message: 'Bericht succesvol verzonden!' };

    } catch (e) {
        return { success: false, message: 'Er is een onverwachte fout opgetreden.' };
    }
}
