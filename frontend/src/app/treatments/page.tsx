import type { Metadata } from 'next';
import TreatmentsClient from '@/components/TreatmentsClient';

export const metadata: Metadata = {
  title: 'Dental Treatments & Services | Dr. Saachi Shingrani',
  description: 'Explore our range of premium dental treatments in Bandra, Mumbai: smile design, root canals, dental implants, teeth whitening, veneers, and pediatric care.',
  alternates: {
    canonical: '/treatments',
  },
};

export const dynamic = 'force-dynamic';


export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
