'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is not set. Email not sent.");
        return { 
            success: false, 
            message: 'De e-mailconfiguratie is nog niet voltooid. Neem rechtstreeks contact op.' 
        };
    }

    try {
        await resend.emails.send({
            from: 'contact@boszhouses.nl', // This must be a verified domain in Resend
            to: 'info@rwzijlstra.nl',
            subject: `Nieuw bericht van ${name} via Bosz Houses website`,
            reply_to: email,
            html: `
              <p><strong>Naam:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Bericht:</strong></p>
              <p>${message}</p>
            `,
        });

        return { success: true, message: 'Bericht succesvol verzonden!' };

    } catch (e) {
        console.error(e);
        return { success: false, message: 'Er is een onverwachte fout opgetreden bij het versturen van de e-mail.' };
    }
}
