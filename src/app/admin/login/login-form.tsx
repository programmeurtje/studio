'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export function LoginForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. First, sign in with Firebase on the client
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Get the ID token from the signed-in user
      const idToken = await user.getIdToken();

      // 3. Send the ID token to our API route to create a session cookie
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      if (!response.ok) {
        throw new Error('Kon geen server-side sessie aanmaken.');
      }

      // 4. If session is created, show success and redirect
      toast({
        title: "Login Succesvol",
        description: "U wordt doorgestuurd naar het dashboard.",
      });
      router.push('/admin');

    } catch (err: any) {
      let errorMessage = 'E-mail of wachtwoord onjuist. Probeer het opnieuw.';
      if (err.code === 'auth/invalid-credential') {
        errorMessage = 'Ongeldige inloggegevens. Controleer uw e-mailadres en wachtwoord.';
      } else if (err.message.includes('server-side')) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Login Mislukt",
        description: errorMessage,
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email">E-mailadres</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@boszhouses.nl"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Wachtwoord</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
       {error && <p className="text-sm font-medium text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Inloggen...' : 'Login'}
      </Button>
    </form>
  );
}
