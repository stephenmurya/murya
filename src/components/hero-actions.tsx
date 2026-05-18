"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="inline-flex h-12 items-center justify-center border border-[#27272a] px-8 text-sm text-white transition-colors duration-300 hover:border-white/60 hover:bg-white hover:text-black"
        onClick={() => router.push("/works")}
      >
        <span className="inline-flex items-center gap-2">
          View Works
          <ArrowRight aria-hidden="true" />
        </span>
      </button>
      <a
        href="mailto:stephenmurya@gmail.com"
        className="inline-flex h-12 items-center justify-center border border-[#27272a] px-6 text-sm text-zinc-300 transition-colors duration-300 hover:border-white/60 hover:text-white"
      >
        Professional Inquiry
      </a>
    </div>
  );
}
