'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Images, Calendar, Edit3, LogOut, ExternalLink } from 'lucide-react';
import { auth } from '@/firebase/config';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/open-house', label: 'Kijkdagen', icon: Calendar },
  { href: '/admin/gallery', label: 'Galerij', icon: Images },
  { href: '/admin/content', label: 'Content', icon: Edit3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Instead of relying on middleware, we can directly post to our logout API route
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
       toast({
        title: "Uitgelogd",
        description: "U bent succesvol uitgelogd.",
      });
    } catch (error) {
       toast({
        variant: "destructive",
        title: "Fout bij uitloggen",
        description: "Er is iets misgegaan. Probeer het opnieuw.",
      });
    }
  };

  return (
    <div className="w-64 bg-secondary flex-shrink-0 border-r p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/">
             <span className="text-xl font-headline font-bold text-primary">Bosz Houses Admin</span>
        </Link>
      </div>
      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} legacyBehavior passHref>
              <a
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
                  isActive && 'bg-primary/10 text-primary'
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </a>
            </Link>
          );
        })}
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        <Button variant="outline" asChild>
            <Link href="/" target="_blank">
                <ExternalLink className="mr-2 h-4 w-4" />
                Bekijk Website
            </Link>
        </Button>
        <Button variant="ghost" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Uitloggen
        </Button>
      </div>
    </div>
  );
}
