import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { verifyAdmin } from './actions';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This server component will verify the user on every navigation within the admin panel.
  await verifyAdmin();

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
