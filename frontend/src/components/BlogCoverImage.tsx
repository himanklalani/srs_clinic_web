"use client";

import Image from 'next/image';
import { CldImage } from 'next-cloudinary';

interface BlogCoverImageProps {
  src: string;
  alt: string;
}

export default function BlogCoverImage({ src, alt }: BlogCoverImageProps) {
  if (src.includes('cloudinary.com')) {
    return (
      <CldImage
        src={src}
        alt={alt}
        fill
        crop="fill"
        format="avif"
        className="object-cover"
        priority
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover"
      priority
    />
  );
}
