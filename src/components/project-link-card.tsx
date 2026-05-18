import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import type { ProjectSummary } from "@/lib/project-types";

type ProjectLinkCardProps = {
  project: ProjectSummary;
};

export function ProjectLinkCard({ project }: ProjectLinkCardProps) {
  const hasMedia = project.images.length > 0;

  return (
    <Link
      href={`/works/${project.slug}`}
      className="group flex min-h-96 flex-col overflow-hidden border border-[#27272a] bg-[#09090b]/90 transition-colors duration-300 hover:border-white/60"
    >
      <div className="relative aspect-video border-b border-[#27272a] bg-black">
        {hasMedia ? (
          <Image
            src={project.coverImage}
            alt={project.imageAlts[0] ?? `${project.title} project image`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-100"
          />
        ) : (
          <div className="flex h-full items-center justify-center border border-[#27272a] bg-[#09090b]">
            <span className="text-xs uppercase text-zinc-600">
              Image Pending
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col justify-between p-6">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-xs uppercase text-zinc-500">
              {project.category}
            </p>
            <h3 className="mt-4 font-serif text-4xl text-white md:text-5xl">
              {project.title}
            </h3>
          </div>
          <ArrowRight
            aria-hidden="true"
            className="mt-1 size-5 text-zinc-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white"
          />
        </div>
        <p className="mt-8 max-w-xl text-sm leading-6 text-zinc-400">
          {project.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.slice(0, 3).map((item) => (
            <span
              key={item}
              className="border border-[#27272a] px-3 py-1 text-xs text-zinc-400"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
