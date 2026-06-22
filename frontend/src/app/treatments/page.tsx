import type { Metadata } from 'next';
import TreatmentsClient from '@/components/TreatmentsClient';

export const metadata: Metadata = {
  title: 'Our Treatments | Dr. Saachi Shingranis Dental Clinic',
  description: 'Explore the range of dental treatments we offer, from whitening to implants.',
};

export const dynamic = 'force-dynamic';


export default function TreatmentsPage() {
  return <TreatmentsClient />;
}
