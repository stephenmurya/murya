import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/works", label: "Works" },
];

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[#27272a] bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl text-white transition-colors duration-300 hover:text-zinc-300"
          aria-label="Smiz home"
        >
          Smiz
        </Link>
        <nav
          className="hidden items-center gap-8 text-xs uppercase text-zinc-400 md:flex"
          aria-label="Primary navigation"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <a
          href="mailto:stephenmurya@gmail.com"
          className="inline-flex items-center gap-2 border border-[#27272a] px-3 py-2 text-xs uppercase text-zinc-300 transition-colors duration-300 hover:border-white/60 hover:text-white"
        >
          Contact
          <ArrowUpRight aria-hidden="true" className="size-3" />
        </a>
      </div>
    </header>
  );
}
