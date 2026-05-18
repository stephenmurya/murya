import { getProjectSummaries } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const projects = getProjectSummaries();
  const projectLines = projects.map(
    (project) =>
      `- ${project.title} (${project.category}): ${project.summary}`,
  );

  const body = [
    "# Stephen Murya (Smiz) - Product Designer & Systems Architect.",
    "",
    "Stephen Murya, also known as Smiz, is a product designer and systems architect crafting intuitive interfaces, scalable design systems, and clear software experiences for complex products.",
    "",
    "## Links",
    `- [GitHub](${siteConfig.githubUrl})`,
    `- [Email](mailto:${siteConfig.email})`,
    "- [Download CV](/cv.pdf)",
    "",
    "## Projects",
    ...projectLines,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
