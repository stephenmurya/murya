import { experience } from "@/lib/experience";

export function ExperienceSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-10 border-b border-[#27272a] pb-12 md:grid-cols-[0.8fr_1.2fr]">
        <h2 className="font-serif text-5xl text-white md:text-7xl">
          Experience
        </h2>
        <p className="max-w-2xl self-end text-base leading-7 text-zinc-400 md:text-lg">
          Product design roles across B2B SaaS, fintech, enterprise platforms,
          and education technology, focused on complex workflows, clear systems,
          and measurable product impact.
        </p>
      </div>

      <div className="divide-y divide-[#27272a]">
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.period}`}
            className="grid gap-6 py-8 md:grid-cols-[0.8fr_1.2fr]"
          >
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                {item.period}
              </p>
              <h3 className="mt-3 text-2xl text-white">{item.company}</h3>
              <p className="mt-2 text-sm text-zinc-500">
                {item.location} / {item.category}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-white">
                {item.role}
              </p>
              <ul className="mt-5 flex flex-col gap-3 text-base leading-7 text-zinc-400">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
