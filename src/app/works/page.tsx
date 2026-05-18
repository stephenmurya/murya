import type { Metadata } from "next";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WorksIndex } from "@/components/works-index";

export const metadata: Metadata = {
  title: "Selected Works",
  description:
    "Selected product design, software, and game projects by Stephen Murya, also known as Smiz.",
  alternates: {
    canonical: "/works",
  },
  openGraph: {
    title: "Selected Works | Stephen Murya",
    description:
      "Selected product design, software, and game projects by Stephen Murya, also known as Smiz.",
    url: "/works",
    siteName: "Stephen Murya",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Selected works by Stephen Murya",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Selected Works | Stephen Murya",
    description:
      "Selected product design, software, and game projects by Stephen Murya, also known as Smiz.",
    images: ["/opengraph-image"],
  },
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
