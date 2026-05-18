import type { Project } from "@/lib/project-types";
import { siteConfig } from "@/lib/site";

const personSchema = {
  "@type": "Person",
  name: "Stephen Murya",
  alternateName: "Smiz",
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  sameAs: [siteConfig.githubUrl],
};

export function stringifyJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function getRootJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      ...personSchema,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Stephen Murya Portfolio",
      alternateName: "Smiz Portfolio",
      url: siteConfig.url,
      description: siteConfig.description,
      inLanguage: "en-US",
      author: personSchema,
    },
  ];
}

export function getProjectJsonLd(project: Project) {
  const schemaType =
    project.category === "Software Products"
      ? "SoftwareApplication"
      : "CreativeWork";
  const coverImage = project.coverImage.endsWith(".svg")
    ? undefined
    : `${siteConfig.url}${project.coverImage}`;

  return {
    "@context": "https://schema.org",
    "@type": schemaType,
    name: project.title,
    abstract: project.summary,
    description: project.summary,
    dateCreated: project.year === "UNKNOWN" ? undefined : project.year,
    url: `${siteConfig.url}/works/${project.slug}`,
    image: coverImage,
    author: personSchema,
    creator: personSchema,
    applicationCategory:
      schemaType === "SoftwareApplication" ? project.category : undefined,
  };
}
