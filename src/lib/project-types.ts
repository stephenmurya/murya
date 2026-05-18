export const projectCategories = [
  "Product Design",
  "Software Products",
  "Game Development",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export type ProjectSummary = {
  slug: string;
  title: string;
  category: ProjectCategory;
  year: string;
  status: string;
  summary: string;
  stack: string[];
  coverImage: string;
  client?: string;
  metadataCategory?: string;
  images: string[];
  imageAlts: string[];
  order: number;
};

export type Project = ProjectSummary & {
  content: string;
};
