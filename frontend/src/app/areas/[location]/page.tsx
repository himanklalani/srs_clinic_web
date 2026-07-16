import { Metadata } from "next";
import HomeClient from "@/components/HomeClient";
import { notFound } from "next/navigation";

// Define the targeted high-value local areas
const VALID_LOCATIONS = [
  "bandra-west",
  "bandra-east",
  "pali-hill",
  "khar-west",
  "santacruz-west",
  "mahim",
  "juhu"
];

function formatLocationName(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: { params: { location: string } }): Promise<Metadata> {
  const { location } = await params;
  
  if (!VALID_LOCATIONS.includes(location)) {
    return {};
  }

  const formattedName = formatLocationName(location);

  return {
    title: `[2026] Best Dentist near ${formattedName} | Dr. Saachi Shingrani`,
    description: `Looking for an expert dentist near ${formattedName}? Experience painless treatments, invisible aligners, and dental implants at SRS Dental Care. 5-Star Rated. Book your free consultation today!`,
    alternates: {
      canonical: `/areas/${location}`,
    },
    openGraph: {
      title: `Best Dentist near ${formattedName} | Dr. Saachi Shingrani`,
      description: `Expert dental clinic serving ${formattedName}, Mumbai. Painless care and 5-star rated treatments.`,
      url: `https://www.srsdentalcare.in/areas/${location}`,
    }
  };
}

export async function generateStaticParams() {
  return VALID_LOCATIONS.map((location) => ({
    location,
  }));
}

export default async function AreaPage({ params }: { params: { location: string } }) {
  const { location } = await params;

  if (!VALID_LOCATIONS.includes(location)) {
    notFound();
  }

  const formattedName = formatLocationName(location);

  // Generate hyper-local schema specifically for this landing page
  const localSchema = {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": `SRS Dental Care - Serving ${formattedName}`,
    "image": "https://res.cloudinary.com/dswvmoboh/image/upload/q_auto/f_auto/v1775975864/03b2bf11-e510-43ef-96cd-872fde8826b1_yhsftd.png",
    "url": `https://www.srsdentalcare.in/areas/${location}`,
    "telephone": "+919004402797",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-1 Nutan Nagar Society, Gurunanak Rd, opposite Bandra Talao",
      "addressLocality": "Bandra West, Mumbai", 
      "postalCode": "400050",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.0563638,
      "longitude": 72.8362814
    },
    "areaServed": {
      "@type": "City",
      "name": formattedName
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "121"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }}
      />
      {/* We reuse the HomeClient so the user gets the premium experience, but the metadata and schema are hyper-localized */}
      <HomeClient />
    </>
  );
}
