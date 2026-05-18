import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/project-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getProject, getProjectSummaries } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSummaries().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Smiz",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: `${project.title} | Smiz`,
      description: project.summary,
      url: `/works/${project.slug}`,
      siteName: siteConfig.name,
      type: "article",
      images: [
        {
          url: project.images[0] ?? "/opengraph-image",
          width: 1200,
          height: 630,
          alt: project.imageAlts[0] ?? `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Smiz`,
      description: project.summary,
      images: [project.images[0] ?? "/opengraph-image"],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <ProjectDetail project={project} />
      <SiteFooter />
    </div>
  );
}
