import "server-only";

import fs from "node:fs";
import path from "node:path";

const validImageExtensions = new Set([".png", ".jpg", ".jpeg", ".svg", ".webp"]);

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
    .sort((a, b) => a.localeCompare(b))
    .map((filename) => `/${path.posix.join(...segments, filename)}`);
}
