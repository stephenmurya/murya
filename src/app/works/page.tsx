import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorksIndex } from "@/components/works-index";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "Selected product design, software, and game projects by Stephen Murya, also known as Smiz.",
};

export default function WorksPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <WorksIndex />
      <SiteFooter />
    </div>
  );
}
