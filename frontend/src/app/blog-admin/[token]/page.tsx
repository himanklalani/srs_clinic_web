import { notFound } from 'next/navigation';
import DashboardClient from '@/components/forms/DashboardClient';

interface Props {
  params: Promise<{ token: string }>;
}

export default async function BlogAdminPage({ params }: Props) {
  const { token } = await params;
  const secret = process.env.BLOG_SECRET_TOKEN;

  // Server-side verification
  if (!secret || token !== secret) {
    // If token mismatch, return 404
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <DashboardClient token={token} />
    </main>
  );
}
