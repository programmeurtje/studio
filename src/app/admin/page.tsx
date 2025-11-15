import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Images, Calendar, Edit3, Library } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-headline font-bold text-primary mb-8">Admin Dashboard</h1>
      <p className="mb-8 text-lg text-muted-foreground">
        Welkom bij de beheeromgeving. Vanaf hier kunt u de content van de website aanpassen.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/media">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Library className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Media Beheren</CardTitle>
                  <CardDescription>Upload en beheer uw afbeeldingen.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/open-house">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Calendar className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Kijkdagen Beheren</CardTitle>
                  <CardDescription>Voeg nieuwe kijkdagen toe of verwijder oude.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/gallery">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Images className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Galerij Beheren</CardTitle>
                  <CardDescription>Beheer de afbeeldingen in de fotogalerij.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
        <Link href="/admin/content">
          <Card className="hover:border-primary transition-colors">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Edit3 className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle>Content Blokken</CardTitle>
                  <CardDescription>Pas de teksten en afbeeldingen aan.</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
