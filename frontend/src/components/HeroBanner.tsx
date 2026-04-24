import Image from 'next/image';
import { ReactNode } from 'react';

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  imageUrl?: string;
}

export default function HeroBanner({ title, subtitle, imageUrl }: HeroBannerProps) {
  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] flex items-center justify-center overflow-hidden">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center opacity-70"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-primary to-primaryLight opacity-80" />
      <div className="relative text-center px-4 max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg sm:text-xl text-white drop-shadow-md">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
