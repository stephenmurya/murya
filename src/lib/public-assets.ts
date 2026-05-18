import "server-only";

import fs from "node:fs";
import path from "node:path";

const validImageExtensions = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

function getImageSortWeight(filename: string) {
  const normalizedFilename = filename.toLowerCase();

  if (normalizedFilename.includes("header")) return 0;
  if (normalizedFilename.startsWith("cover")) return 1;

  return 2;
}

export function getPublicImagePaths(...segments: string[]) {
  const directory = path.join(process.cwd(), "public", ...segments);

  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory)
    .filter((filename) =>
      validImageExtensions.has(path.extname(filename).toLowerCase()),
    )
    .sort((a, b) => {
      const weightDifference = getImageSortWeight(a) - getImageSortWeight(b);

      if (weightDifference !== 0) return weightDifference;

      return a.localeCompare(b);
    })
    .map((filename) => `/${path.posix.join(...segments, filename)}`);
}
