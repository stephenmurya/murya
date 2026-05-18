import { BriefcaseBusiness, Code2, Mail } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:hello@smiz.dev",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/stephenmurya",
    icon: BriefcaseBusiness,
  },
  {
    label: "GitHub",
    href: "https://github.com/smiz",
    icon: Code2,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[#27272a] bg-black">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div className="max-w-xl">
          <h2 className="font-serif text-4xl text-white">Contact</h2>
          <p className="mt-4 text-sm leading-6 text-zinc-400">
            Available for product design, frontend systems, game development,
            and high-fidelity interface work.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:items-end">
          {contactLinks.map((link) => {
            const Icon = link.icon;
            const isExternal = link.href.startsWith("http");

            return (
              <a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noreferrer" : undefined}
                className="inline-flex items-center justify-center gap-2 border border-[#27272a] px-4 py-3 text-sm text-zinc-300 transition-colors duration-300 hover:border-white/60 hover:text-white"
              >
                <Icon aria-hidden="true" className="size-4" />
                {link.label}
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
