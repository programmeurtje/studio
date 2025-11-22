import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { verifyAdmin } from './actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Deze server component zal de gebruiker verifiëren bij elke navigatie binnen het admin-paneel.
  // Dit is de veilige plek om firebase-admin te gebruiken.
  await verifyAdmin();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
