import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ExperienceSection } from "@/components/experience-section";
import { HeroActions } from "@/components/hero-actions";
import { HeroShader } from "@/components/hero-shader";
import { LogoMarquee } from "@/components/logo-marquee";
import { ProjectTabs } from "@/components/project-tabs";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicImagePaths } from "@/lib/public-assets";
import { getProjectSummaries } from "@/lib/projects";

export default function Home() {
  const projects = getProjectSummaries();
  const logos = getPublicImagePaths("logos");

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main>
        <section className="relative isolate overflow-hidden border-b border-[#27272a]">
          <HeroShader />
          <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
          <div className="relative z-10 mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 lg:px-8">
            <div className="max-w-5xl">
              <p className="mb-6 text-sm text-zinc-400">Smiz</p>
              <h1 className="font-serif text-7xl leading-none text-white md:text-9xl">
                Stephen Murya
              </h1>
              <p className="mt-6 max-w-3xl text-2xl leading-9 text-white md:text-4xl md:leading-10">
                Product Designer & Systems Architect.
              </p>
              <p className="mt-8 max-w-3xl text-base leading-7 text-zinc-300 md:text-xl md:leading-8">
                I design for complexity: regulated fintech workflows, white-label banking infrastructure, 
                B2B platforms where the hard part is never the interface. I also build games, 
                because games are where systems get stress-tested fastest. <br></br><br></br>
                The operating principle across both: plan the structure, then let contact with 
                the real world do the refining.
              </p>
              <div className="mt-10">
                <HeroActions />
              </div>
            </div>
          </div>
        </section>

        <LogoMarquee logos={logos} />

        <section className="border-y border-[#27272a] bg-[#09090b]/70">
          <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="font-serif text-5xl text-white md:text-7xl">
                  Selected Works
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-400">
                  Interfaces, design systems, and product flows shaped for
                  clarity, adoption, and long-term use. 
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

        <ExperienceSection />
      </main>
      <SiteFooter />
    </div>
  );
}
