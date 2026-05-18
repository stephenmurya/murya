import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/project-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicImagePaths } from "@/lib/public-assets";
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

  const socialImage = project.coverImage.endsWith(".svg")
    ? "/opengraph-image"
    : project.coverImage;

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
          url: socialImage,
          width: 1200,
          height: 630,
          alt: `${project.title} case study`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Smiz`,
      description: project.summary,
      images: [socialImage],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const galleryImages = getPublicImagePaths("projects", project.slug, "gallery");

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <ProjectDetail project={project} galleryImages={galleryImages} />
      <SiteFooter />
    </div>
  );
}
