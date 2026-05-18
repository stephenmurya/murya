import {
  copyFile,
  mkdir,
  readdir,
  stat,
  unlink,
  writeFile,
} from "node:fs/promises";
import path from "node:path";

type RemoteAsset = {
  url: string;
  filename: string;
};

type LocalAsset = {
  source: string;
  filename: string;
};

type ProjectAssetManifest = {
  slug: string;
  cover?: RemoteAsset;
  localCover?: LocalAsset;
  galleryRemoteAssets?: RemoteAsset[];
  galleryLocalAssets?: LocalAsset[];
  placeholder?: boolean;
};

type FramerModule = {
  url: string;
  source: string;
};

type FramerProjectAsset = {
  liveSlug: string;
  localSlug: string;
  images: string[];
};

const framerSiteUrl = "https://murya.framer.website/";
const framerProjectCollectionId = "MDbE5oYbR";

const liveProjectSlugMap: Record<string, string> = {
  "fct-mfb": "fct-microfinance-bank",
  "fullrange-mfb": "fullrange-microfinance-bank",
  moneta: "moneta-mobile",
};

const placeholderProjectSlugs = [
  "uniseller",
  "vantage",
  "tethrai",
  "revoke",
  "tether-cold-light",
  "grenade-architect",
  "recoil-shooter",
  "transaction-point",
];

const localProjectAssets: ProjectAssetManifest[] = [
  {
    slug: "size-matters",
    localCover: {
      source: "public/projects/size-matters/gallery/Header Image.png",
      filename: "cover.png",
    },
  },
  {
    slug: "tactical-farmer",
    localCover: {
      source: "public/projects/tactical-farmer/gallery/Header Image.png",
      filename: "cover.png",
    },
  },
  {
    slug: "bagis",
    galleryLocalAssets: [
      {
        source: "public/projects/bagis/cover.png",
        filename: "01-cover.png",
      },
    ],
  },
  {
    slug: "uber-one-banking",
    localCover: {
      source: "public/projects/uber-banking/image 53.png",
      filename: "cover.png",
    },
    galleryLocalAssets: [
      {
        source: "public/projects/uber-banking/image 53.png",
        filename: "01-image-53.png",
      },
      {
        source: "public/projects/uber-banking/image 54.png",
        filename: "02-image-54.png",
      },
      {
        source: "public/projects/uber-banking/scene 35.jpg",
        filename: "03-scene-35.jpg",
      },
      {
        source: "public/projects/uber-banking/scene 37.jpg",
        filename: "04-scene-37.jpg",
      },
    ],
  },
  ...placeholderProjectSlugs.map((slug) => ({ slug, placeholder: true })),
];

const logoAssets: RemoteAsset[] = [
  {
    url: "https://framerusercontent.com/images/Drol798I0K3LOJNAJzCA4HwwSI.svg",
    filename: "bose.svg",
  },
  {
    url: "https://framerusercontent.com/images/BcaaPvA1Xy2D6Fbhllv6V5xOk.svg",
    filename: "activision.svg",
  },
  {
    url: "https://framerusercontent.com/images/l6WbF7iTAEFKmJDABapPuRcfpMk.png",
    filename: "apple-pay.png",
  },
  {
    url: "https://framerusercontent.com/images/WG6CqBKrlEh6fVlhu87p9lT0Y.svg",
    filename: "airbus.svg",
  },
  {
    url: "https://framerusercontent.com/images/aM4OTla9xtt5XT0cRhtdMxzZ0c.png",
    filename: "hbo.png",
  },
  {
    url: "https://framerusercontent.com/images/AQJsXn6K8j2vzVNV3IQxAW3eetM.svg",
    filename: "amd.svg",
  },
  {
    url: "https://framerusercontent.com/images/rpHtKas6eTKNMzqzOqjNhr63oVs.svg",
    filename: "xbox.svg",
  },
];

const validImageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".svg",
  ".webp",
]);

const publicProjectsDirectory = path.join(process.cwd(), "public", "projects");
const publicLogosDirectory = path.join(process.cwd(), "public", "logos");

function resolveFramerModuleUrl(baseUrl: string, modulePath: string) {
  return new URL(modulePath, baseUrl).toString();
}

function extractFramerModuleUrls(source: string, baseUrl: string) {
  const moduleUrls = new Set<string>();
  const patterns = [
    /(?:href|src)="(https:\/\/framerusercontent\.com\/sites\/[^"]+?\.mjs)"/g,
    /import\("([^"]+?\.mjs)"\)/g,
    /from"\.\/([^"]+?\.mjs)"/g,
    /import"\.\/([^"]+?\.mjs)"/g,
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const modulePath = match[1];
      moduleUrls.add(resolveFramerModuleUrl(baseUrl, modulePath));
    }
  }

  return moduleUrls;
}

async function fetchFramerModules() {
  const homeHtml = await fetch(framerSiteUrl).then((response) =>
    response.text(),
  );
  const pending = [...extractFramerModuleUrls(homeHtml, framerSiteUrl)];
  const visited = new Set<string>();
  const modules: FramerModule[] = [];

  while (pending.length) {
    const moduleUrl = pending.pop();

    if (!moduleUrl || visited.has(moduleUrl)) continue;
    visited.add(moduleUrl);

    const source = await fetch(moduleUrl).then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch ${moduleUrl}: ${response.status}`);
      }

      return response.text();
    });

    modules.push({ url: moduleUrl, source });

    for (const childUrl of extractFramerModuleUrls(source, moduleUrl)) {
      if (!visited.has(childUrl)) pending.push(childUrl);
    }
  }

  return modules;
}

function baseAssetUrl(url: string) {
  return url.replace(/\\u0026/g, "&").split("?")[0].trim();
}

function getExtensionFromUrl(url: string) {
  const extension = path.extname(new URL(url).pathname).toLowerCase();

  if (!validImageExtensions.has(extension)) {
    throw new Error(`Unsupported image extension for ${url}`);
  }

  return extension;
}

function slugifyFilename(url: string) {
  return path.basename(new URL(url).pathname).replace(/[^a-zA-Z0-9.-]/g, "-");
}

function galleryFilename(index: number, url: string) {
  const extension = getExtensionFromUrl(url);
  const label = index === 0 ? "cover" : slugifyFilename(url).replace(extension, "");

  return `${String(index + 1).padStart(2, "0")}-${label}${extension}`;
}

function assertWithinDirectory(parentDirectory: string, targetPath: string) {
  const relativePath = path.relative(parentDirectory, targetPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error(`Refusing to write outside ${parentDirectory}: ${targetPath}`);
  }
}

async function cleanManagedProjectAssets(projectDirectory: string) {
  assertWithinDirectory(publicProjectsDirectory, projectDirectory);

  try {
    const files = await readdir(projectDirectory);

    await Promise.all(
      files
        .filter((filename) => /^cover\.(jpe?g|png|webp)$/i.test(filename))
        .map((filename) => unlink(path.join(projectDirectory, filename))),
    );
  } catch {
    return;
  }
}

async function cleanManagedGallery(galleryDirectory: string) {
  assertWithinDirectory(publicProjectsDirectory, galleryDirectory);

  try {
    const files = await readdir(galleryDirectory);

    await Promise.all(
      files
        .filter((filename) =>
          validImageExtensions.has(path.extname(filename).toLowerCase()),
        )
        .map((filename) => unlink(path.join(galleryDirectory, filename))),
    );
  } catch {
    return;
  }
}

function parseFramerCollectionAssets(modules: FramerModule[]) {
  const collectionModule = modules.find((module) =>
    module.source.includes(`framerCollectionId:"${framerProjectCollectionId}"`),
  );

  if (!collectionModule) {
    throw new Error(`Could not find Framer collection ${framerProjectCollectionId}`);
  }

  const recordsStart = collectionModule.source.indexOf("H=[{");
  const recordsEnd = collectionModule.source.indexOf(
    "];for(let a of H)",
    recordsStart,
  );

  if (recordsStart === -1 || recordsEnd === -1) {
    throw new Error("Could not parse Framer project records");
  }

  const recordsText = collectionModule.source.slice(recordsStart + 3, recordsEnd);
  const recordSources = recordsText
    .slice(1, -1)
    .split(/\},\{index:/)
    .map((record, index, records) => {
      const withStart = index === 0 ? record : `{index:${record}`;
      return index === records.length - 1 ? `${withStart}}` : `${withStart}}`;
    });

  return recordSources.map((recordSource) => {
    const liveSlug = recordSource.match(/\[o\]:"([^"]+)"/)?.[1];
    const imageUrls = ["h", "u", "f", "w"]
      .map((fieldName) =>
        recordSource.match(
          new RegExp(`\\[${fieldName}\\]:t\\(\\{src:"([^"]+)"`),
        )?.[1],
      )
      .filter((url): url is string => Boolean(url))
      .map(baseAssetUrl);

    if (!liveSlug || !imageUrls.length) {
      throw new Error("Encountered an incomplete Framer project record");
    }

    return {
      liveSlug,
      localSlug: liveProjectSlugMap[liveSlug] ?? liveSlug,
      images: imageUrls,
    };
  });
}

function assertScrapedAsset(url: string, scrapedUrls: Set<string>) {
  const baseUrl = baseAssetUrl(url);

  if (!scrapedUrls.has(baseUrl)) {
    throw new Error(`Expected ${baseUrl} to exist on ${framerSiteUrl}`);
  }
}

async function fileExists(filePath: string) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadAsset(url: string, destination: string) {
  const response = await fetch(url);

  if (!response.ok || !response.body) {
    throw new Error(`Failed to download ${url}: ${response.status}`);
  }

  const asset = Buffer.from(await response.arrayBuffer());
  await writeFile(destination, asset);

  console.log(`downloaded ${url}`);
}

function placeholderSvg(slug: string) {
  const title = slug
    .split("-")
    .map((word) => word[0]?.toUpperCase() + word.slice(1))
    .join(" ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900" role="img" aria-label="${title} project media placeholder">
  <rect width="1600" height="900" fill="#09090b"/>
  <rect x="0.5" y="0.5" width="1599" height="899" fill="none" stroke="#27272a"/>
  <path d="M96 96H1504V804H96V96Z" fill="none" stroke="#27272a" stroke-width="1"/>
  <text x="800" y="456" fill="#71717a" font-family="Inter, Geist, Arial, sans-serif" font-size="22" text-anchor="middle" letter-spacing="3">MEDIA PENDING</text>
</svg>`;
}

async function migrateFramerProjectAssets(project: FramerProjectAsset) {
  const projectDirectory = path.join(publicProjectsDirectory, project.localSlug);
  const galleryDirectory = path.join(projectDirectory, "gallery");

  await mkdir(projectDirectory, { recursive: true });
  await mkdir(galleryDirectory, { recursive: true });
  await cleanManagedProjectAssets(projectDirectory);
  await cleanManagedGallery(galleryDirectory);

  const [coverImage] = project.images;

  if (!coverImage) return;

  const coverExtension = getExtensionFromUrl(coverImage);
  await downloadAsset(coverImage, path.join(projectDirectory, `cover${coverExtension}`));

  for (const [index, image] of project.images.entries()) {
    await downloadAsset(image, path.join(galleryDirectory, galleryFilename(index, image)));
  }
}

async function migrateLocalAndPlaceholderAssets(project: ProjectAssetManifest) {
  const projectDirectory = path.join(publicProjectsDirectory, project.slug);
  const galleryDirectory = path.join(projectDirectory, "gallery");

  await mkdir(projectDirectory, { recursive: true });
  await mkdir(galleryDirectory, { recursive: true });

  if (project.cover) {
    await downloadAsset(
      project.cover.url,
      path.join(projectDirectory, project.cover.filename),
    );
  }

  if (project.localCover) {
    const source = path.join(process.cwd(), project.localCover.source);
    const destination = path.join(projectDirectory, project.localCover.filename);

    await copyFile(source, destination);
    console.log(`copied ${project.localCover.source}`);
  }

  for (const asset of project.galleryRemoteAssets ?? []) {
    await downloadAsset(asset.url, path.join(galleryDirectory, asset.filename));
  }

  for (const asset of project.galleryLocalAssets ?? []) {
    const source = path.join(process.cwd(), asset.source);
    const destination = path.join(galleryDirectory, asset.filename);

    await copyFile(source, destination);
    console.log(`copied ${asset.source}`);
  }

  if (project.placeholder) {
    const destination = path.join(projectDirectory, "cover.svg");

    if (await fileExists(destination)) {
      console.log(`skip ${path.relative(process.cwd(), destination)}`);
      return;
    }

    await writeFile(destination, placeholderSvg(project.slug), "utf8");
    console.log(`created ${path.relative(process.cwd(), destination)}`);
  }
}

async function migrateAssets() {
  const framerModules = await fetchFramerModules();
  const scrapedFramerUrls = new Set<string>();

  for (const framerModule of framerModules) {
    for (const match of framerModule.source.matchAll(
      /https:\/\/framerusercontent\.com\/images\/[^"'`)\\\s]+/g,
    )) {
      scrapedFramerUrls.add(baseAssetUrl(match[0]));
    }
  }

  await mkdir(publicLogosDirectory, { recursive: true });

  for (const logo of logoAssets) {
    assertScrapedAsset(logo.url, scrapedFramerUrls);
    await downloadAsset(logo.url, path.join(publicLogosDirectory, logo.filename));
  }

  const framerProjects = parseFramerCollectionAssets(framerModules);

  for (const project of framerProjects) {
    for (const imageUrl of project.images) {
      assertScrapedAsset(imageUrl, scrapedFramerUrls);
    }

    await migrateFramerProjectAssets(project);
  }

  for (const project of localProjectAssets) {
    await migrateLocalAndPlaceholderAssets(project);
  }
}

migrateAssets().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
