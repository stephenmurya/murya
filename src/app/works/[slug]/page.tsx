import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetail } from "@/components/project-detail";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getPublicImagePaths } from "@/lib/public-assets";
import { getProject, getProjectSummaries } from "@/lib/projects";
import { getProjectJsonLd, stringifyJsonLd } from "@/lib/seo";
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
      title: "Project Not Found | Stephen Murya",
    };
  }

  const socialImage = `/works/${project.slug}/opengraph-image`;

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/works/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | Stephen Murya`,
      description: project.summary,
      url: `/works/${project.slug}`,
      siteName: siteConfig.name,
      locale: "en_US",
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
      title: `${project.title} | Stephen Murya`,
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
  const jsonLd = getProjectJsonLd(project);

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: stringifyJsonLd(jsonLd) }}
      />
      <ProjectDetail project={project} galleryImages={galleryImages} />
      <SiteFooter />
    </div>
  );
}
