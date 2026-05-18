import { ProjectTabs } from "@/components/project-tabs";
import { getProjectSummaries } from "@/lib/projects";

export function WorksIndex() {
  const projects = getProjectSummaries();

  return (
    <main className="min-h-screen bg-black pt-28">
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 border-b border-[#27272a] pb-12 md:grid-cols-[0.9fr_1.1fr]">
          <h1 className="font-serif text-6xl text-white md:text-8xl">
            Selected Works
          </h1>
          <p className="max-w-2xl self-end text-base leading-7 text-zinc-400 md:text-lg">
            A focused index of product systems, game mechanics, and interfaces
            shaped around the same operating principle: build the structure,
            test it in motion, and refine from contact with reality.
          </p>
        </div>

        <div className="mt-8">
          <ProjectTabs projects={projects} />
        </div>
      </section>
    </main>
  );
}
