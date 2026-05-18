import "server-only";

import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

import {
  projectCategories,
  stackGroups,
  type Project,
  type ProjectSummary,
} from "@/lib/project-types";

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export const projectFrontmatterSchema = z
  .object({
    title: z.string().min(1),
    category: z.enum(projectCategories),
    year: z.string().min(1),
    status: z.string().min(1),
    summary: z.string().min(1),
    stack: z.array(z.string().min(1)).min(1),
    coverImage: z.string().min(1).startsWith("/projects/"),
    client: z.string().min(1).optional(),
    metadataCategory: z.string().min(1).optional(),
    images: z.array(z.string().min(1).startsWith("/projects/")).default([]),
    imageAlts: z.array(z.string().min(1)).default([]),
    order: z.number().int().positive().default(999),
  })
  .strict();

export { projectCategories, stackGroups };
export type { Project, ProjectCategory, ProjectSummary } from "@/lib/project-types";

function getProjectSlugs() {
  return fs
    .readdirSync(projectsDirectory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename) => filename.replace(/\.mdx$/, ""));
}

function readProject(slug: string): Project {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);
  const frontmatter = projectFrontmatterSchema.parse(data);

  return {
    slug,
    ...frontmatter,
    content,
  };
}

function sortProjects(projects: Project[]) {
  return projects.sort((a, b) => {
    if (a.order !== b.order) return a.order - b.order;
    return a.title.localeCompare(b.title);
  });
}

export function getAllProjects() {
  return sortProjects(getProjectSlugs().map(readProject));
}

export function getProjectSummaries(): ProjectSummary[] {
  return getAllProjects().map((project) => {
    const { content, ...summary } = project;
    void content;

    return summary;
  });
}

export function getProject(slug: string) {
  if (!getProjectSlugs().includes(slug)) {
    return undefined;
  }

  return readProject(slug);
}
