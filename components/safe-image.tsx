"use client";

import Image from "next/image";
import { useState } from "react";

type SafeImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
  /**
   * When true, Next.js will not proxy the request through the image optimizer.
   * This avoids optimizer errors when the source URL 404s (e.g. placeholder paths during development).
   */
  unoptimized?: boolean;
};

export function SafeImage({
  src,
  alt,
  sizes,
  className,
  unoptimized = true,
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <>
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-navy-900/40 to-navy-950/50"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white/20 text-sm font-semibold tracking-[0.2em]">
              ODALIS
            </span>
          </div>
        </div>
        <span className="sr-only">{alt}</span>
      </>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      unoptimized={unoptimized}
      onError={() => setHasError(true)}
    />
  );
}

