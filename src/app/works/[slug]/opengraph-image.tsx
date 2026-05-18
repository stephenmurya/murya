import { ImageResponse } from "next/og";

import { getOgFonts } from "@/lib/og-fonts";
import { getProject, getProjectSummaries } from "@/lib/projects";
import { siteConfig } from "@/lib/site";

type ProjectOpenGraphImageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const size = {
  width: 1200,
  height: 630,
};

export const alt = "Stephen Murya project case study";
export const contentType = "image/png";
export const runtime = "nodejs";
export const dynamicParams = false;

export function generateStaticParams() {
  return getProjectSummaries().map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectOpenGraphImage({
  params,
}: ProjectOpenGraphImageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  const fonts = await getOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Geist, Arial, sans-serif",
          height: "100%",
          justifyContent: "space-between",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            borderBottom: "1px solid #27272a",
            color: "#a1a1aa",
            display: "flex",
            fontSize: 22,
            justifyContent: "space-between",
            letterSpacing: "0.18em",
            paddingBottom: 28,
            textTransform: "uppercase",
          }}
        >
          <span>Case Study</span>
          <span>Stephen Murya</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          <div
            style={{
              color: "#a1a1aa",
              fontSize: 28,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            {project?.category ?? "Selected Work"}
          </div>
          <div
            style={{
              fontFamily: "Instrument Serif, Georgia, serif",
              fontSize: 132,
              letterSpacing: "-0.02em",
              lineHeight: 0.9,
              maxWidth: 980,
            }}
          >
            {project?.title ?? "Selected Work"}
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid #27272a",
            color: "#a1a1aa",
            display: "flex",
            fontSize: 24,
            justifyContent: "space-between",
            lineHeight: 1.4,
            paddingTop: 28,
          }}
        >
          <span>{siteConfig.role}</span>
          <span>{project?.year ?? "Portfolio"}</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  );
}
