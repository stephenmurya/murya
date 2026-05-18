"use client";

import dynamic from "next/dynamic";

export const HeroShader = dynamic(
  () =>
    import("@/components/ui/web-gl-shader").then((module) => module.WebGLShader),
  {
    ssr: false,
  },
);
