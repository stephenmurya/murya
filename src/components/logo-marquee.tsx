"use client";

import Image from "next/image";

type LogoMarqueeProps = {
  logos: string[];
};

export function LogoMarquee({ logos }: LogoMarqueeProps) {
  if (!logos.length) return null;

  const repeatedLogos = [...logos, ...logos];

  return (
    <div className="overflow-hidden border-y border-[#27272a] bg-black">
      <div className="marquee-track flex w-max items-center gap-12 py-8">
        {repeatedLogos.map((logo, index) => (
          <div
            key={`${logo}-${index}`}
            className="relative flex h-12 w-36 shrink-0 items-center justify-center border border-[#27272a] bg-[#09090b] px-6 opacity-70 transition-opacity duration-300 hover:opacity-100"
          >
            <Image
              src={logo}
              alt=""
              width={144}
              height={48}
              loading="eager"
              unoptimized
              className="h-full w-full object-contain py-3"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
