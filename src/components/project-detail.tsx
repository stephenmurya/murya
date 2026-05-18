import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { mdxComponents } from "@/components/mdx-components";
import { ProjectMediaSlider } from "@/components/project-media-slider";
import type { Project } from "@/lib/project-types";

type ProjectDetailProps = {
  project: Project;
};

type MdxSection = {
  heading: string;
  body: string;
};

function splitMdxSections(content: string): MdxSection[] {
  const normalizedContent = content.trim();

  if (!normalizedContent) {
    return [
      {
        heading: "The Brief",
        body: "UNKNOWN",
      },
    ];
  }

  const sections = normalizedContent
    .split(/^## /gm)
    .filter(Boolean)
    .map((section) => {
      const [heading = "The Brief", ...body] = section.split("\n");

      return {
        heading: heading.trim(),
        body: body.join("\n").trim(),
      };
    });

  return sections.length
    ? sections
    : [
        {
          heading: "The Brief",
          body: normalizedContent,
        },
      ];
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const sections = splitMdxSections(project.content);

  return (
    <main className="min-h-screen bg-black pt-24">
      <article className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <Link
          href="/works"
          className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back to Works
        </Link>

        <header className="border-b border-[#27272a] py-16 md:py-24">
          <h1 className="font-serif text-6xl leading-none text-white md:text-9xl">
            {project.title}
          </h1>
          <dl className="mt-8 grid gap-4 text-xs uppercase text-zinc-400 sm:grid-cols-2 lg:grid-cols-4">
            {project.client ? (
              <div>
                <dt className="text-zinc-600">Client</dt>
                <dd className="mt-2 text-white">{project.client}</dd>
              </div>
            ) : null}
            <div>
              <dt className="text-zinc-600">Year</dt>
              <dd className="mt-2 text-white">{project.year}</dd>
            </div>
            <div>
              <dt className="text-zinc-600">Category</dt>
              <dd className="mt-2 text-white">
                {project.metadataCategory || project.category}
              </dd>
            </div>
            <div>
              <dt className="text-zinc-600">Status</dt>
              <dd className="mt-2 text-white">{project.status}</dd>
            </div>
          </dl>
        </header>

        <figure className="py-12 md:py-16">
          <ProjectMediaSlider
            title={project.title}
            images={project.images}
            imageAlts={project.imageAlts}
          />
        </figure>

        <div className="grid gap-16 pb-16">
          {sections.map((section) => (
            <section
              key={section.heading}
              className="grid gap-8 md:grid-cols-[240px_1fr]"
            >
              <div>
                <h2 className="font-serif text-3xl text-white md:sticky md:top-24">
                  {section.heading}
                </h2>
              </div>
              <div className="flex max-w-4xl flex-col gap-6">
                <MDXRemote source={section.body} components={mdxComponents} />
              </div>
            </section>
          ))}
        </div>

        <footer className="mt-16 border-t border-[#27272a] pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="border border-[#27272a] px-3 py-2 text-xs text-zinc-300"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/works"
              className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors duration-300 hover:text-white"
            >
              Works Index
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
