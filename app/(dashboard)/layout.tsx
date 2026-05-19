import { getAuthSession } from '@/lib/session';
import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { redirect } from 'next/navigation';

export default async function DashboardLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    redirect('/sign-in');
  }

  return (
    <DashboardShell name={session?.user?.name} email={session?.user?.email}>
      {children}
    </DashboardShell>
  );
}
