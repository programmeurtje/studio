'use client';

import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { firestore } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { addOpenHouseDate, updateOpenHouseDate, deleteOpenHouseDate } from '@/app/admin/actions';
import { PlusCircle, Edit, Trash2, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from '../ui/skeleton';

interface OpenHouseDate {
  id: string;
  month: string;
  days: string;
  createdAt?: any;
}

export function OpenHouseDateManager() {
  const { toast } = useToast();
  const [value, loading, error] = useCollection(
    firestore ? query(collection(firestore, 'open_house_dates'), orderBy('createdAt', 'asc')) : null
  );

  const openHouseDates: OpenHouseDate[] = value ? value.docs.map(doc => ({ id: doc.id, ...doc.data() } as OpenHouseDate)) : [];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<OpenHouseDate | null>(null);
  const [isPending, setIsPending] = useState(false);

  const openDialog = (date: OpenHouseDate | null = null) => {
    setCurrentDate(date);
    setIsDialogOpen(true);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    const formData = new FormData(event.currentTarget);
    
    try {
      let result;
      if (currentDate) {
        result = await updateOpenHouseDate(currentDate.id, formData);
      } else {
        result = await addOpenHouseDate(formData);
      }

      if (result.error) {
        throw new Error(result.error);
      }
      
      toast({
        title: `Datum ${currentDate ? 'bijgewerkt' : 'toegevoegd'}`,
        description: "De kijkdagen zijn succesvol opgeslagen.",
      });
      setIsDialogOpen(false);
    } catch (e: any) {
      toast({
        variant: 'destructive',
        title: 'Oh nee! Er is iets misgegaan.',
        description: e.message || 'Kon de datum niet opslaan.',
      });
    } finally {
        setIsPending(false);
    }
  };

  const handleDelete = async (id: string) => {
      try {
        const result = await deleteOpenHouseDate(id);
        if (result.error) throw new Error(result.error);
        toast({
            title: 'Datum verwijderd',
            description: 'De kijkdag is succesvol verwijderd.',
        });
      } catch(e: any) {
           toast({
            variant: 'destructive',
            title: 'Verwijderen mislukt',
            description: e.message || "Kon de datum niet verwijderen.",
        });
      }
  };


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Kijkdagen</CardTitle>
            <CardDescription>Beheer hier de geplande kijkdagen.</CardDescription>
          </div>
          <Button onClick={() => openDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nieuwe Datum
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Maand</TableHead>
              <TableHead>Dagen</TableHead>
              <TableHead className="text-right">Acties</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading && Array.from({length: 3}).map((_, i) => (
                <TableRow key={i}>
                    <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-5 w-48" /></TableCell>
                    <TableCell className="text-right"><Skeleton className="h-8 w-8 ml-auto" /></TableCell>
                </TableRow>
            ))}
            {error && <TableRow><TableCell colSpan={3} className="text-center text-destructive">Kon de datums niet laden.</TableCell></TableRow>}
            {!loading && openHouseDates.length === 0 && <TableRow><TableCell colSpan={3} className="text-center">Nog geen kijkdagen toegevoegd.</TableCell></TableRow>}
            {openHouseDates.map((date) => (
              <TableRow key={date.id}>
                <TableCell className="font-medium">{date.month}</TableCell>
                <TableCell>{date.days}</TableCell>
                <TableCell className="text-right">
                    <AlertDialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => openDialog(date)}>
                                    <Edit className="mr-2 h-4 w-4" /> Bewerken
                                </DropdownMenuItem>
                                <AlertDialogTrigger asChild>
                                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                                        <Trash2 className="mr-2 h-4 w-4" /> Verwijderen
                                    </DropdownMenuItem>
                                </AlertDialogTrigger>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Deze actie kan niet ongedaan worden gemaakt. Dit zal de kijkdag permanent verwijderen.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(date.id)} className="bg-destructive hover:bg-destructive/90">
                                    Ja, verwijder
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{currentDate ? 'Bewerk Datum' : 'Nieuwe Datum Toevoegen'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div>
              <Label htmlFor="month">Maand</Label>
              <Input id="month" name="month" defaultValue={currentDate?.month} placeholder="bv. November 2025" required />
            </div>
            <div>
              <Label htmlFor="days">Dagen</Label>
              <Input id="days" name="days" defaultValue={currentDate?.days} placeholder="bv. Vrijdag 1 & Zaterdag 2" required />
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Annuleren</Button>
                </DialogClose>
                <Button type="submit" disabled={isPending}>{isPending ? 'Opslaan...' : 'Opslaan'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
