import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";

export const metadata: Metadata = {
  title: "Dr. Saachi Shingrani's Dental Care | Dentist in Bandra, Mumbai",
  description: "Visit Dr. Saachi Shingrani's Dental Care in Bandra West, Mumbai for world-class, painless dental care. Smile design, implants, root canals, and invisible aligners.",
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return <HomeClient />;
}
