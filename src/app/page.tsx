import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { HeroActions } from "@/components/hero-actions";
import { HeroShader } from "@/components/hero-shader";
import { ProjectTabs } from "@/components/project-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProjectSummaries } from "@/lib/projects";
import { stackGroups } from "@/lib/project-types";

export default function Home() {
  const projects = getProjectSummaries();

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-[#27272a]">
          <HeroShader />
          <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 lg:px-8">
            <div className="max-w-5xl">
              <p className="mb-6 text-sm text-zinc-400">Stephen Murya</p>
              <h1 className="font-serif text-7xl leading-none text-white md:text-9xl">
                Smiz
              </h1>
              <p className="mt-6 max-w-3xl text-2xl leading-9 text-white md:text-4xl md:leading-10">
                Game Developer & Product Designer.
              </p>
              <p className="mt-8 max-w-3xl text-base leading-7 text-zinc-300 md:text-xl md:leading-8">
                Building{" "}
                <em className="font-serif text-2xl italic text-white md:text-3xl">
                  durable
                </em>
                , self-improving systems at the intersection of kinetic action
                and modular architecture.
              </p>
              <div className="mt-10">
                <HeroActions />
              </div>
            </div>
          </div>
        </section>

        <section
          id="philosophy"
          className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-[0.8fr_1.2fr] lg:px-8"
        >
          <div>
            <h2 className="font-serif text-5xl text-white md:text-7xl">
              Kinetic Architect
            </h2>
          </div>
          <div className="max-w-3xl">
            <p className="text-lg leading-8 text-zinc-300 md:text-xl md:leading-9">
              My work moves from theoretical planning to active execution
              through systems-led thinking. I design structures that can be
              tested in motion: products with clear data models, games with
              legible kinetic loops, and interfaces where every boundary earns
              its place.
            </p>
            <blockquote className="mt-8 border-l border-[#27272a] pl-6 font-serif text-3xl italic leading-10 text-white">
              Plan the system, then let contact with motion refine it.
            </blockquote>
          </div>
        </section>

        <section className="border-y border-[#27272a] bg-[#09090b]/70">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-5xl text-white md:text-7xl">
                  Selected Works
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                  A strict grid of systems, products, and game work built around
                  durable architecture.
                </p>
              </div>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 text-sm text-zinc-300 transition-colors duration-300 hover:text-white"
              >
                View All Works
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
            <div className="mt-10">
              <ProjectTabs projects={projects} />
            </div>
          </div>
        </section>

        <section
          id="stack"
          className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <h2 className="font-serif text-5xl text-white md:text-7xl">
            Technical Stack
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stackGroups.map((group) => (
              <div
                key={group.title}
                className="border border-[#27272a] bg-[#09090b] p-6"
              >
                <h3 className="text-xs uppercase text-zinc-500">
                  {group.title}
                </h3>
                <ul className="mt-8 flex flex-col gap-4">
                  {group.items.map((item) => (
                    <li key={item} className="text-lg text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
