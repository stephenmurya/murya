import type { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

function MdxImage({
  src,
  alt,
  width,
  height,
}: ComponentPropsWithoutRef<"img">) {
  if (!src) return null;

  return (
    <Image
      src={String(src)}
      alt={alt ?? ""}
      width={Number(width ?? 1600)}
      height={Number(height ?? 900)}
      className="my-10 aspect-video w-full border border-[#27272a] object-cover"
    />
  );
}

export const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<"h1">) => (
    <h1 className="font-serif text-5xl leading-none text-white md:text-7xl" {...props} />
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className="mt-12 font-serif text-4xl text-white md:text-5xl" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3 className="mt-8 text-sm uppercase tracking-[0.2em] text-zinc-500" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className="text-lg leading-8 text-zinc-300 md:text-xl md:leading-9" {...props} />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a className="text-white underline decoration-[#71717a] underline-offset-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul className="flex list-disc flex-col gap-3 pl-5 text-lg leading-8 text-zinc-300 md:text-xl md:leading-9" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol className="flex list-decimal flex-col gap-3 pl-5 text-lg leading-8 text-zinc-300 md:text-xl md:leading-9" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => <li {...props} />,
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      className="border-l border-[#27272a] pl-6 font-serif text-3xl italic leading-10 text-white"
      {...props}
    />
  ),
  img: MdxImage,
};
