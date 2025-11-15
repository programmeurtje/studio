'use client';

import { useState } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { collection, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { firestore, storage } from '@/firebase/config';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { addMediaItem, deleteMediaItem } from '@/app/admin/actions';
import { Upload, Copy, Trash2, Check } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from '../ui/skeleton';

interface MediaItem {
  id: string;
  fileName: string;
  downloadUrl: string;
  contentType: string;
  size: number;
  createdAt: { toDate: () => Date };
}

export function MediaManager() {
  const { toast } = useToast();
  const [value, loading, error] = useCollection(
    firestore ? query(collection(firestore, 'media'), orderBy('createdAt', 'desc')) : null
  );

  const mediaItems: MediaItem[] = value ? value.docs.map(doc => ({ id: doc.id, ...doc.data() } as MediaItem)) : [];

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFileToUpload(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!fileToUpload) return;

    setUploading(true);
    setProgress(0);
    const storageRef = ref(storage, `uploads/${Date.now()}-${fileToUpload.name}`);
    const uploadTask = uploadBytesResumable(storageRef, fileToUpload);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(prog);
      },
      (error) => {
        console.error("Upload error:", error);
        toast({
          variant: 'destructive',
          title: 'Upload Mislukt',
          description: 'Er is iets misgegaan bij het uploaden van het bestand.',
        });
        setUploading(false);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const { metadata } = uploadTask.snapshot;

          const result = await addMediaItem({
            fileName: fileToUpload.name,
            fullPath: metadata.fullPath,
            downloadUrl,
            contentType: metadata.contentType || 'application/octet-stream',
            size: metadata.size,
          });

          if (result.error) throw new Error(result.error);
          
          toast({
            title: 'Upload Succesvol',
            description: `${fileToUpload.name} is geüpload.`,
          });
        } catch (e: any) {
             toast({
              variant: 'destructive',
              title: 'Opslaan Mislukt',
              description: 'De media metadata kon niet worden opgeslagen: ' + e.message,
            });
        } finally {
            setFileToUpload(null);
            setUploading(false);
            setProgress(0);
            if (document.getElementById('file-input')) {
              (document.getElementById('file-input') as HTMLInputElement).value = '';
            }
        }
      }
    );
  };

  const handleDelete = async (item: MediaItem) => {
      try {
        // Delete file from Storage
        const fileRef = ref(storage, item.fullPath);
        await deleteObject(fileRef);

        // Delete metadata from Firestore
        const result = await deleteMediaItem(item.id);
        if (result.error) throw new Error(result.error);

        toast({
            title: 'Afbeelding verwijderd',
            description: 'De afbeelding is succesvol verwijderd.',
        });
      } catch(e: any) {
           toast({
            variant: 'destructive',
            title: 'Verwijderen mislukt',
            description: e.message || "Kon de afbeelding niet verwijderen.",
        });
      }
  };
  
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    toast({ title: 'URL Gekopieerd!'});
    setTimeout(() => setCopiedUrl(null), 2000);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Media Manager</CardTitle>
        <CardDescription>Upload nieuwe afbeeldingen en kopieer de URL om ze in de content te gebruiken.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-8 p-4 border-2 border-dashed rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Input id="file-input" type="file" onChange={handleFileChange} className="flex-grow" accept="image/*" />
            <Button onClick={handleUpload} disabled={!fileToUpload || uploading} className="w-full sm:w-auto">
              <Upload className="mr-2 h-4 w-4" />
              {uploading ? `Uploaden... ${Math.round(progress)}%` : 'Upload Bestand'}
            </Button>
          </div>
          {uploading && <Progress value={progress} className="w-full mt-4" />}
        </div>
        
        {loading && <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({length: 12}).map((_, i) => <Skeleton key={i} className="aspect-square w-full" />)}
        </div>}
        {error && <p className="text-center text-destructive">Kon de media niet laden.</p>}
        {!loading && mediaItems.length === 0 && <p className="text-center text-muted-foreground">Nog geen media geüpload.</p>}

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {mediaItems.map((item) => (
            <Card key={item.id} className="group relative overflow-hidden">
                <Image
                    src={item.downloadUrl}
                    alt={item.fileName}
                    width={200}
                    height={200}
                    className="object-cover w-full h-full aspect-square"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-2">
                        <Button size="icon" variant="secondary" onClick={() => copyToClipboard(item.downloadUrl)}>
                           {copiedUrl === item.downloadUrl ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                        </Button>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button size="icon" variant="destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Weet u het zeker?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Deze actie kan niet ongedaan worden gemaakt. Dit zal de afbeelding permanent verwijderen van de server.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Annuleren</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDelete(item)} className="bg-destructive hover:bg-destructive/90">
                                        Ja, verwijder
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                    <div className="absolute bottom-1 left-1 right-1 text-[10px] text-white/80 truncate font-mono">
                        {item.fileName}
                    </div>
                </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
