"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type ProjectMediaSliderProps = {
  title: string;
  images: string[];
  imageAlts: string[];
};

export function ProjectMediaSlider({
  title,
  images,
  imageAlts,
}: ProjectMediaSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const hasImages = images.length > 0;

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % images.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [images.length, resetKey]);

  function selectImage(index: number) {
    setActiveIndex(index);
    setResetKey((currentKey) => currentKey + 1);
  }

  if (!hasImages) {
    return (
      <div className="aspect-video border border-[#27272a] bg-[#09090b]">
        <div className="flex h-full items-center justify-center">
          <span className="text-xs uppercase tracking-[0.24em] text-zinc-600">
            Media Pending
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="relative aspect-video overflow-hidden border border-[#27272a] bg-[#09090b]">
        <Image
          src={images[activeIndex]}
          alt={imageAlts[activeIndex] ?? `${title} project image`}
          fill
          priority
          sizes="(min-width: 1280px) 1280px, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 ? (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1" aria-label="Project media">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image}
                type="button"
                aria-label={`Show ${title} image ${index + 1}`}
                aria-current={isActive}
                className={cn(
                  "relative aspect-video w-24 shrink-0 overflow-hidden border border-[#27272a] bg-[#09090b] transition-colors duration-300 hover:border-zinc-400 md:w-32",
                  isActive && "border-white",
                )}
                onClick={() => selectImage(index)}
              >
                <Image
                  src={image}
                  alt={imageAlts[index] ?? `${title} thumbnail ${index + 1}`}
                  fill
                  sizes="128px"
                  className={cn(
                    "object-cover opacity-60 transition-opacity duration-300",
                    isActive && "opacity-100",
                  )}
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
