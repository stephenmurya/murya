import { readFile } from "node:fs/promises";
import path from "node:path";

const geistRegularPath = path.join(
  process.cwd(),
  "node_modules",
  "next",
  "dist",
  "compiled",
  "@vercel",
  "og",
  "Geist-Regular.ttf",
);

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400;
  style: "normal";
};

async function loadBundledFont(): Promise<ArrayBuffer | null> {
  try {
    const fontBuffer = await readFile(geistRegularPath);
    const fontResponse = await fetch(
      `data:font/ttf;base64,${fontBuffer.toString("base64")}`,
    );

    if (!fontResponse.ok) return null;

    return fontResponse.arrayBuffer();
  } catch {
    return null;
  }
}

export async function getOgFonts() {
  const geistRegular = await loadBundledFont();

  if (!geistRegular) return [];

  return [
    {
      name: "Geist",
      data: geistRegular,
      weight: 400,
      style: "normal",
    },
  ] satisfies OgFont[];
}
