"use client";

import { useMemo, useState } from "react";

import { ProjectLinkCard } from "@/components/project-link-card";
import {
  projectCategories,
  type ProjectCategory,
  type ProjectSummary,
} from "@/lib/project-types";
import { cn } from "@/lib/utils";

type ProjectTabsProps = {
  projects: ProjectSummary[];
};

export function ProjectTabs({ projects }: ProjectTabsProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProjectCategory>("Product Design");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory, projects]);

  return (
    <div>
      <div
        className="flex gap-8 overflow-x-auto border-b border-[#27272a]"
        role="tablist"
        aria-label="Project categories"
      >
        {projectCategories.map((category) => {
          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={cn(
                "shrink-0 border-b border-transparent pb-3 text-sm text-[#71717a] transition-colors duration-300 hover:text-white",
                isActive && "border-white text-white",
              )}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {filteredProjects.map((project) => (
          <ProjectLinkCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
